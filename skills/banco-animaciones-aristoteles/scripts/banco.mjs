// Lee, filtra y resume las fichas del banco. Solo usa la biblioteca estándar de Node.
import fs from "node:fs";
import path from "node:path";

// Los valores admitidos por faceta. references/taxonomia.md explica cada uno.
export const VOCABULARIO = {
  formato: ["motion", "3d", "explicativo", "interactivo"],
  tema: [
    "logo-marca",
    "producto-saas",
    "tipografia",
    "datos",
    "ciencia-mates",
    "tecnologia-ia",
    "historia-cultura",
    "naturaleza-espacio",
    "ciudad-arquitectura",
    "personajes-narrativa",
    "juego",
    "musica-audio",
    "abstracto-generativo",
    "ui-web",
    "sistema-flujo"
  ],
  estilo: [
    "minimal",
    "cinematico",
    "retro-pixel",
    "dibujado",
    "neon-futurista",
    "low-poly",
    "realista",
    "isometrico",
    "cartoon",
    "glitch",
    "editorial",
    "corporativo"
  ],
  tecnica: [
    "canvas",
    "svg",
    "threejs",
    "shader",
    "webgl",
    "webgpu",
    "gsap",
    "css",
    "audio",
    "voz",
    "particulas",
    "fisica",
    "pixel",
    "p5",
    "d3",
    "lottie",
    "react",
    "imagen-ia"
  ],
  salida: ["html", "remotion", "hyperframes", "blender", "manim", "video", "otro", "sin-especificar"],
  estado: ["completo", "plantilla", "parcial", "solo-descripcion"]
};

export const FACETAS = [...Object.keys(VOCABULARIO), "idioma"];
const FACETAS_LISTA = new Set(["tema", "estilo", "tecnica"]);
const ORDEN_ESTADO = { completo: 0, plantilla: 1, parcial: 2, "solo-descripcion": 3 };

// La cabecera usa un valor por línea en notación JSON, que también es YAML válido.
export function parsearFicha(texto) {
  const bloque = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!bloque) {
    throw new Error("La ficha no tiene cabecera.");
  }

  const ficha = {};
  for (const linea of bloque[1].split(/\r?\n/)) {
    const campo = linea.match(/^([a-z_]+):\s*(.*)$/);
    if (campo) {
      ficha[campo[1]] = leerValor(campo[2]);
    }
  }

  const cuerpo = texto.slice(bloque[0].length);
  const prompt = cuerpo.match(/^## Prompt\r?\n\r?\n(`{3,})text\r?\n([\s\S]*?)\r?\n\1\s*$/m);
  ficha.prompt = prompt ? prompt[2] : "";
  return ficha;
}

function leerValor(crudo) {
  if (/^["[]/.test(crudo) || crudo === "null" || /^-?\d+(?:\.\d+)?$/.test(crudo)) {
    return JSON.parse(crudo);
  }
  return crudo;
}

export function escribirFicha(ficha) {
  const { prompt, ...cabecera } = ficha;
  const lineas = Object.entries(cabecera)
    .filter(([, valor]) => valor !== undefined)
    .map(([clave, valor]) => `${clave}: ${JSON.stringify(valor)}`);
  // La valla debe ser más larga que cualquier racha de comillas invertidas del prompt.
  const racha = Math.max(2, ...(prompt.match(/`+/g) ?? []).map((r) => r.length));
  const valla = "`".repeat(racha + 1);

  return [
    "---",
    ...lineas,
    "---",
    "",
    `# ${ficha.titulo}`,
    "",
    ficha.resumen,
    "",
    `Autoría: [${ficha.autor}](${ficha.autor_url}) · [post original](${ficha.post})` +
      (ficha.remake ? ` · [remake en vivo](${ficha.remake})` : ""),
    "",
    "## Prompt",
    "",
    `${valla}text`,
    prompt,
    valla,
    ""
  ].join("\n");
}

export function validarFicha(ficha) {
  const problemas = [];
  for (const campo of ["id", "titulo", "resumen", "autor", "post"]) {
    if (!ficha[campo]) {
      problemas.push(`falta ${campo}`);
    }
  }

  for (const [faceta, admitidos] of Object.entries(VOCABULARIO)) {
    const valores = FACETAS_LISTA.has(faceta) ? ficha[faceta] : [ficha[faceta]];
    if (!Array.isArray(valores)) {
      problemas.push(`${faceta} debe ser una lista`);
      continue;
    }
    for (const valor of valores) {
      if (!admitidos.includes(valor)) {
        problemas.push(`${faceta} desconocido: ${valor}`);
      }
    }
  }

  if (!ficha.tema?.length) {
    problemas.push("hace falta al menos un tema");
  }
  if (!ficha.prompt) {
    problemas.push("falta el bloque ## Prompt");
  }
  return problemas;
}

export function leerBanco(dirBanco) {
  const fichas = [];
  for (const tema of fs.readdirSync(dirBanco, { withFileTypes: true })) {
    if (!tema.isDirectory()) {
      continue;
    }
    for (const archivo of fs.readdirSync(path.join(dirBanco, tema.name))) {
      if (!archivo.endsWith(".md") || archivo === "README.md") {
        continue;
      }
      const ruta = path.join(dirBanco, tema.name, archivo);
      fichas.push({ ...parsearFicha(fs.readFileSync(ruta, "utf8")), ruta });
    }
  }
  return fichas.sort((a, b) => a.id.localeCompare(b.id));
}

export function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[-_]/g, " ")
    .toLowerCase();
}

// Cada criterio admite varios valores separados por comas: basta con que coincida uno.
// Las palabras del texto libre deben aparecer todas, y «a|b» acepta cualquiera de las dos.
// Un guion cuenta como espacio, así que «hand-drawn» y «hand drawn» buscan lo mismo.
// Las palabras puntúan más en título y resumen.
// A igualdad, van antes los prompts usables y los que tienen remake, que prueba que funcionaron.
export function buscar(fichas, { texto = "", duracionMax, incluirDuplicados = false, ...criterios } = {}) {
  const palabras = normalizar(texto)
    .split(/\s+/)
    .map((grupo) => grupo.split("|").filter(Boolean))
    .filter((opciones) => opciones.length > 0);
  const resultados = [];

  for (const ficha of fichas) {
    if (ficha.duplicado_de && !incluirDuplicados) {
      continue;
    }
    if (duracionMax !== undefined && (ficha.duracion_s === null || ficha.duracion_s > duracionMax)) {
      continue;
    }

    const encaja = Object.entries(criterios).every(([faceta, valor]) => {
      if (!valor) {
        return true;
      }
      const buscados = String(valor).split(",").map((v) => v.trim());
      const propios = [ficha[faceta]].flat();
      return buscados.some((v) => propios.includes(v));
    });
    if (!encaja) {
      continue;
    }

    const destacado = normalizar(`${ficha.id} ${ficha.titulo} ${ficha.resumen}`);
    const completo = `${destacado} ${normalizar(ficha.prompt)}`;
    if (!palabras.every((opciones) => opciones.some((o) => completo.includes(o)))) {
      continue;
    }

    const puntos = palabras.reduce(
      (suma, opciones) => suma + (opciones.some((o) => destacado.includes(o)) ? 3 : 1),
      0
    );
    resultados.push({ ficha, puntos });
  }

  return resultados
    .sort(
      (a, b) =>
        b.puntos - a.puntos ||
        ORDEN_ESTADO[a.ficha.estado] - ORDEN_ESTADO[b.ficha.estado] ||
        Boolean(b.ficha.remake) - Boolean(a.ficha.remake) ||
        a.ficha.id.localeCompare(b.ficha.id)
    )
    .map((r) => r.ficha);
}

export function contarFacetas(fichas) {
  const cuentas = {};
  for (const faceta of FACETAS) {
    cuentas[faceta] = {};
    for (const ficha of fichas) {
      for (const valor of [ficha[faceta]].flat()) {
        cuentas[faceta][valor] = (cuentas[faceta][valor] ?? 0) + 1;
      }
    }
  }
  return cuentas;
}

function fila(ficha) {
  const duracion = ficha.duracion_s ? `${ficha.duracion_s} s` : "";
  return `| [${ficha.titulo.replaceAll("|", "/")}](${path.basename(ficha.ruta)}) | ${ficha.formato} | ${ficha.salida} | ${ficha.estado} | ${ficha.tecnica.join(", ")} | ${duracion} |`;
}

// Devuelve el contenido de banco/README.md y de cada banco/<tema>/README.md.
export function generarIndices(fichas) {
  const unicas = fichas.filter((f) => !f.duplicado_de);
  const porTema = Object.groupBy(unicas, (f) => path.basename(path.dirname(f.ruta)));
  const cuentas = contarFacetas(unicas);
  const indices = {};

  const resumen = (faceta) =>
    Object.entries(cuentas[faceta])
      .sort((a, b) => b[1] - a[1])
      .map(([valor, n]) => `\`${valor}\` ${n}`)
      .join(" · ");

  indices["README.md"] = [
    "# Banco de animaciones",
    "",
    `${unicas.length} prompts distintos (${fichas.length - unicas.length} duplicados más quedan fuera de los índices). Cada carpeta agrupa las fichas por su tema principal; una ficha puede tener otros temas secundarios, así que para cruzar facetas usa \`node scripts/buscar.mjs\`.`,
    "",
    "| Tema principal | Prompts | Usables tal cual |",
    "| --- | --- | --- |",
    ...VOCABULARIO.tema
      .filter((tema) => porTema[tema])
      .map((tema) => {
        const lista = porTema[tema];
        const usables = lista.filter((f) => ["completo", "plantilla"].includes(f.estado)).length;
        return `| [${tema}](${tema}/README.md) | ${lista.length} | ${usables} |`;
      }),
    "",
    "## Facetas",
    "",
    ...FACETAS.map((faceta) => `- **${faceta}**: ${resumen(faceta)}`),
    "",
    "Origen, licencia y créditos: [ORIGEN.md](ORIGEN.md).",
    ""
  ].join("\n");

  for (const [tema, lista] of Object.entries(porTema)) {
    const ordenadas = lista.toSorted(
      (a, b) => ORDEN_ESTADO[a.estado] - ORDEN_ESTADO[b.estado] || a.titulo.localeCompare(b.titulo, "es")
    );
    indices[`${tema}/README.md`] = [
      `# ${tema}`,
      "",
      `${lista.length} prompts cuyo tema principal es \`${tema}\`, primero los usables tal cual. [Volver al banco](../README.md).`,
      "",
      "| Título | Formato | Salida | Estado | Técnica | Duración |",
      "| --- | --- | --- | --- | --- | --- |",
      ...ordenadas.map(fila),
      ""
    ].join("\n");
  }

  return indices;
}

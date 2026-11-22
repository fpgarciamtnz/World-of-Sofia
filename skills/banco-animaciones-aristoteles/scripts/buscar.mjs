#!/usr/bin/env node
// Busca prompts en el banco por facetas y texto, y muestra uno completo. Solo lee.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { FACETAS, buscar, contarFacetas, leerBanco } from "./banco.mjs";

const AYUDA = `Uso: node buscar.mjs [palabras…] [filtros]
  palabras               deben aparecer todas; «cocina|recipe|food» acepta cualquiera
  --tema, --formato, --estilo, --tecnica, --salida, --estado, --idioma <v1,v2>
                         filtra por faceta; varios valores separados por comas
  --usable               solo prompts completos o plantillas
  --max-duracion <s>     solo prompts que fijan una duración de hasta <s> segundos;
                         descarta los dos tercios que no la fijan
  --limite <n>           resultados mostrados (20)
  --duplicados           incluye los prompts repetidos
  --json                 salida en JSON
  --facetas              cuenta los valores de cada faceta
  --ver <id>             muestra la ficha completa
  --solo-prompt          con --ver, imprime solo el prompt para pegarlo`;

const dirBanco = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "banco");

function leerArgumentos() {
  try {
    return parseArgs({
      allowPositionals: true,
      options: {
        ...Object.fromEntries(FACETAS.map((f) => [f, { type: "string" }])),
        usable: { type: "boolean" },
        "max-duracion": { type: "string" },
        limite: { type: "string", default: "20" },
        duplicados: { type: "boolean" },
        json: { type: "boolean" },
        facetas: { type: "boolean" },
        ver: { type: "string" },
        "solo-prompt": { type: "boolean" },
        ayuda: { type: "boolean", short: "h" },
        help: { type: "boolean" }
      }
    });
  } catch (error) {
    console.error(`${error.message}\n\n${AYUDA}`);
    process.exit(1);
  }
}

const { values: op, positionals } = leerArgumentos();

if (op.ayuda || op.help) {
  console.log(AYUDA);
  process.exit(0);
}

const fichas = leerBanco(dirBanco);

if (op.ver) {
  const ficha = fichas.find((f) => f.id === op.ver);
  if (!ficha) {
    console.error(`No hay ninguna ficha con id ${op.ver}.`);
    process.exit(1);
  }
  if (op["solo-prompt"]) {
    console.log(ficha.prompt);
  } else {
    const { prompt, ruta, ...datos } = ficha;
    const enlaces = [`autoría: ${datos.autor_url}`, `post: ${datos.post}`, datos.remake && `remake: ${datos.remake}`];
    console.log(
      op.json
        ? JSON.stringify({ ...datos, prompt }, null, 2)
        : `${formatear({ ...datos, prompt })}\n  ${enlaces.filter(Boolean).join("\n  ")}\n  archivo: ${ruta}\n\n${prompt}`
    );
  }
  process.exit(0);
}

if (op.facetas) {
  const cuentas = contarFacetas(fichas.filter((f) => !f.duplicado_de));
  if (op.json) {
    console.log(JSON.stringify(cuentas, null, 2));
  } else {
    for (const [faceta, valores] of Object.entries(cuentas)) {
      const lista = Object.entries(valores).sort((a, b) => b[1] - a[1]);
      console.log(`${faceta}: ${lista.map(([v, n]) => `${v} (${n})`).join(", ")}`);
    }
  }
  process.exit(0);
}

const criterios = Object.fromEntries(FACETAS.map((f) => [f, op[f]]));
if (op.usable) {
  criterios.estado = criterios.estado ?? "completo,plantilla";
}

const resultados = buscar(fichas, {
  ...criterios,
  texto: positionals.join(" "),
  duracionMax: op["max-duracion"] === undefined ? undefined : Number(op["max-duracion"]),
  incluirDuplicados: op.duplicados
});
const mostrados = resultados.slice(0, Number(op.limite));

if (op.json) {
  console.log(JSON.stringify(mostrados, (clave, valor) => (clave === "prompt" ? undefined : valor), 2));
} else {
  console.log(`${resultados.length} resultados${resultados.length > mostrados.length ? `, se muestran ${mostrados.length}` : ""}.\n`);
  for (const ficha of mostrados) {
    console.log(`${formatear(ficha)}\n`);
  }
}

function formatear(ficha) {
  const duracion = (ficha.duracion_s ? ` · ${ficha.duracion_s} s` : "") + (ficha.remake ? " · con remake" : "");
  return [
    `${ficha.id} · ${ficha.titulo}`,
    `  ${ficha.resumen}`,
    `  ${ficha.formato} · ${ficha.tema.join(", ")} · salida ${ficha.salida} · ${ficha.estado}${duracion}`,
    `  técnica: ${ficha.tecnica.join(", ") || "—"} · estilo: ${ficha.estilo.join(", ") || "—"} · idioma: ${ficha.idioma} · prompt de ${ficha.prompt.split(/\s+/).length} palabras · ${ficha.autor}`
  ].join("\n");
}

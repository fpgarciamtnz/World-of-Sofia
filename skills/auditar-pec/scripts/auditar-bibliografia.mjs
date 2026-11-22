#!/usr/bin/env node
// Audita la bibliografía en uso, y el borrador si se indica. Solo lee: no modifica el proyecto.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import {
  compararMetadatos,
  cruzarCitas,
  cruzarLista,
  evaluarActualidad,
  evaluarTipos,
  extraerCitas,
  mapaDePaginas,
  marcasDeEstilo,
  nivelDeAcceso,
  separarReferencias,
  textoDeDocx
} from "./auditoria-core.mjs";

const AYUDA = `Uso: node auditar-bibliografia.mjs --proyecto <carpeta> [opciones]
  --borrador <archivo>   pdf, docx, txt, md o html. Solo lo lee.
  --minimo <n>           porcentaje mínimo de fuentes recientes (70)
  --ventana <n>          años que cuentan como recientes (5)
  --anio <n>             año de referencia (el actual)
  --tipos <a,b>          tipos admitidos (articulo,libro,capitulo)
  --paginas <n>          páginas máximas del borrador (7)
  --sin-red              no consulta Crossref ni OpenAlex`;

function leerOpciones(argv) {
  const opciones = {
    minimo: 70,
    ventana: 5,
    anio: new Date().getFullYear(),
    tipos: ["articulo", "libro", "capitulo"],
    paginas: 7,
    red: true
  };
  for (let i = 0; i < argv.length; i += 1) {
    const clave = argv[i];
    if (clave === "--sin-red") {
      opciones.red = false;
    } else if (clave === "--help" || clave === "-h") {
      console.log(AYUDA);
      process.exit(0);
    } else if (["--proyecto", "--borrador", "--minimo", "--ventana", "--anio", "--tipos", "--paginas"].includes(clave) && argv[i + 1]) {
      const valor = argv[(i += 1)];
      const nombre = clave.slice(2);
      if (nombre === "tipos") {
        opciones.tipos = valor.split(",").map((tipo) => tipo.trim());
      } else if (["minimo", "ventana", "anio", "paginas"].includes(nombre)) {
        opciones[nombre] = Number(valor);
      } else {
        opciones[nombre] = valor;
      }
    } else {
      throw new Error(`Opción no válida: ${clave}\n${AYUDA}`);
    }
  }
  if (!opciones.proyecto) {
    throw new Error(`Falta --proyecto.\n${AYUDA}`);
  }
  return opciones;
}

async function pedirJson(url) {
  const respuesta = await fetch(url, { headers: { "User-Agent": "auditar-pec/0.1" }, signal: AbortSignal.timeout(20000) });
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}`);
  }
  return respuesta.json();
}

async function comprobarEnLinea(fuente) {
  const { message: registro } = await pedirJson(`https://api.crossref.org/works/${encodeURIComponent(fuente.doi)}`);
  const resultado = compararMetadatos(fuente, registro);

  // Sin volumen en Crossref suele tratarse del registro previo a la publicación: OpenAlex da una segunda opinión.
  if (!registro.volume && fuente.vol) {
    try {
      const obra = await pedirJson(`https://api.openalex.org/works/doi:${encodeURIComponent(fuente.doi)}?select=biblio`);
      const { volume, first_page: inicio } = obra.biblio ?? {};
      const inicioFicha = String(fuente.pags ?? "").split(/[–-]/)[0];
      if (String(volume) === String(fuente.vol) && (!inicio || !inicioFicha || String(inicio) === inicioFicha)) {
        resultado.informacion.push(`OpenAlex confirma el volumen ${volume}${inicio ? ` y la página inicial ${inicio}` : ""}`);
      } else {
        resultado.revisar.push(`OpenAlex registra volumen ${volume ?? "?"}, página inicial ${inicio ?? "?"}`);
      }
    } catch (error) {
      resultado.revisar.push(`no se pudo consultar OpenAlex (${error.message})`);
    }
  }
  return resultado;
}

function leerDeZip(archivo, nombre) {
  const zip = fs.readFileSync(archivo);
  const fin = zip.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (fin < 0) {
    throw new Error("El .docx no es un ZIP válido.");
  }
  let posicion = zip.readUInt32LE(fin + 16);
  for (let i = 0; i < zip.readUInt16LE(fin + 10); i += 1) {
    const largoNombre = zip.readUInt16LE(posicion + 28);
    if (zip.toString("utf8", posicion + 46, posicion + 46 + largoNombre) === nombre) {
      const local = zip.readUInt32LE(posicion + 42);
      const inicio = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
      const datos = zip.subarray(inicio, inicio + zip.readUInt32LE(posicion + 20));
      return (zip.readUInt16LE(posicion + 10) === 8 ? zlib.inflateRawSync(datos) : datos).toString("utf8");
    }
    posicion += 46 + largoNombre + zip.readUInt16LE(posicion + 30) + zip.readUInt16LE(posicion + 32);
  }
  throw new Error(`No se encontró ${nombre} en el .docx.`);
}

function leerBorrador(archivo) {
  const extension = path.extname(archivo).toLowerCase();
  if (extension === ".pdf") {
    const salida = spawnSync("pdftotext", ["-enc", "UTF-8", archivo, "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    if (salida.error || salida.status !== 0) {
      throw new Error(`No se pudo leer el PDF con pdftotext: ${salida.error?.message ?? salida.stderr}. Exporta el borrador a texto.`);
    }
    return { texto: salida.stdout, paginas: (salida.stdout.match(/\f/g) ?? []).length };
  }
  if (extension === ".docx") {
    const texto = textoDeDocx(leerDeZip(archivo, "word/document.xml"));
    const paginas = leerDeZip(archivo, "docProps/app.xml").match(/<Pages>(\d+)<\/Pages>/)?.[1];
    return { texto, paginas: paginas ? Number(paginas) : null, aproximado: true };
  }
  if (extension === ".doc") {
    throw new Error("Guarda el borrador como .docx o PDF antes de auditarlo.");
  }
  const crudo = fs.readFileSync(archivo, "utf8");
  return { texto: extension === ".html" || extension === ".htm" ? crudo.replace(/<[^>]+>/g, " ") : crudo, paginas: null };
}

function lista(titulo, elementos) {
  if (elementos.length > 0) {
    console.log(`\n${titulo}`);
    elementos.forEach((elemento) => console.log(`- ${elemento}`));
  }
}

async function main() {
  const opciones = leerOpciones(process.argv.slice(2));
  const raiz = path.resolve(opciones.proyecto);
  const todas = JSON.parse(fs.readFileSync(path.join(raiz, "datos", "fuentes.json"), "utf8"));
  const fuentes = todas.filter((fuente) => fuente.actual === "en-uso");

  console.log(`# Auditoría de ${path.basename(raiz)}`);
  console.log(`${fuentes.length} referencias en uso de ${todas.length} registradas.`);

  console.log("\n## Actualidad");
  const actualidad = evaluarActualidad(fuentes, { anioRef: opciones.anio, ventana: opciones.ventana, minimo: opciones.minimo });
  console.log(`${actualidad.recientes} de ${actualidad.total} son de ${actualidad.desde} o posteriores (${actualidad.porcentaje} %; mínimo ${opciones.minimo} %): ${actualidad.cumple ? "cumple" : "NO CUMPLE"}.`);
  console.log(`Contando solo desde ${actualidad.desde + 1}: ${actualidad.estrictas} de ${actualidad.total} (${actualidad.porcentajeEstricto} %): ${actualidad.cumpleEstricto ? "cumple" : "NO CUMPLE"}.`);
  if (actualidad.antiguas.length > 0) {
    console.log(`Anteriores a ${actualidad.desde}: ${actualidad.antiguas.join(", ")}.`);
  }

  console.log("\n## Tipos de fuente");
  const tipos = evaluarTipos(fuentes, opciones.tipos);
  if (tipos.length === 0) {
    console.log(`Todas son de los tipos admitidos (${opciones.tipos.join(", ")}).`);
  }
  tipos.forEach(({ fuente, motivo }) => console.log(`- REVISAR ${fuente.id} (${fuente.anio}): ${motivo}.${fuente.nota ? ` Nota previa: ${fuente.nota}` : ""}`));

  console.log("\n## Acceso a las fuentes");
  console.log("Indica qué material tiene el proyecto, no si alguien leyó la fuente.");
  const niveles = { texto: [], resumen: [], metadatos: [] };
  for (const fuente of fuentes) {
    const existe = Boolean(fuente.local) && fs.existsSync(path.resolve(raiz, fuente.local));
    if (fuente.local && !existe) {
      console.log(`- REVISAR ${fuente.id}: la copia local indicada no existe (${fuente.local}).`);
    }
    niveles[nivelDeAcceso(fuente, existe)].push(fuente.prioridad ? `${fuente.id} [${fuente.prioridad}]` : fuente.id);
  }
  console.log(`Texto completo (${niveles.texto.length}): ${niveles.texto.join(", ") || "ninguna"}.`);
  console.log(`Solo resumen (${niveles.resumen.length}): ${niveles.resumen.join(", ") || "ninguna"}.`);
  console.log(`Solo metadatos (${niveles.metadatos.length}): ${niveles.metadatos.join(", ") || "ninguna"}.`);

  console.log("\n## Referencias");
  const sinPaginas = fuentes.filter((fuente) => fuente.tipo === "articulo" && !fuente.pags && !fuente.art);
  sinPaginas.forEach((fuente) => console.log(`- ALERTA ${fuente.id}: artículo sin páginas ni número de artículo.`));
  fuentes.filter((fuente) => fuente.tipo === "articulo" && !fuente.doi).forEach((fuente) => console.log(`- SIN COMPROBAR ${fuente.id}: artículo sin DOI.`));

  if (opciones.red) {
    const conDoi = fuentes.filter((fuente) => fuente.doi);
    let limpias = 0;
    let fallidas = 0;
    for (const fuente of conDoi) {
      try {
        const { alertas, revisar, informacion } = await comprobarEnLinea(fuente);
        alertas.forEach((texto) => console.log(`- ALERTA ${fuente.id}: ${texto}.`));
        revisar.forEach((texto) => console.log(`- REVISAR ${fuente.id}: ${texto}.`));
        informacion.forEach((texto) => console.log(`- Nota ${fuente.id}: ${texto}.`));
        if (alertas.length === 0 && revisar.length === 0) {
          limpias += 1;
        }
      } catch (error) {
        fallidas += 1;
        console.log(`- SIN COMPROBAR ${fuente.id}: ${error.message}.`);
      }
      await new Promise((resolver) => setTimeout(resolver, 150));
    }
    console.log(`${conDoi.length} DOI consultados: ${limpias} sin discrepancias, ${fallidas} sin respuesta. Confirma existencia y metadatos, no el contenido.`);
  } else {
    console.log("Sin consulta en línea: los DOI quedan SIN COMPROBAR.");
  }

  const comprobador = path.join(raiz, "herramientas", "comprobar.mjs");
  if (fs.existsSync(comprobador)) {
    const salida = spawnSync(process.execPath, [comprobador], { cwd: raiz, encoding: "utf8" });
    console.log(`\nFormato según herramientas/comprobar.mjs: ${salida.stdout.trim().split("\n").at(-1)}`);
  }

  console.log("\n## Borrador");
  if (!opciones.borrador) {
    console.log("No indicado: citas, lista de referencias, páginas y estilo quedan SIN COMPROBAR.");
    return;
  }
  const { texto, paginas, aproximado } = leerBorrador(opciones.borrador);
  if (paginas === null) {
    console.log("Páginas: SIN COMPROBAR (hace falta el PDF).");
  } else {
    const fiabilidad = aproximado ? ", según Word al guardar; incluye portada y plantilla" : "";
    console.log(`Páginas: ${paginas}${fiabilidad} (máximo ${opciones.paginas}): ${paginas <= opciones.paginas ? "cumple" : aproximado ? "REVISAR en el PDF" : "NO CUMPLE"}.`);
  }
  if (aproximado) {
    mapaDePaginas(texto, [/^[\f\s]*Justificaci[oó]n\b.*$/imu, /^[\f\s]*Objetivos? general.*$/imu, /^[\f\s]*Marco te[oó]rico\s*(?:\(.*)?$/imu, /^[\f\s]*Referencias bibliogr[aá]ficas.*$/imu, /^[\f\s]*Autorr?evisi[oó]n de la PEC.*$/imu])
      .forEach(({ rotulo, pagina }) => console.log(`- «${rotulo}»: página ${pagina} aprox., sin contar la portada.`));
  }
  const { cuerpo, lista: referencias } = separarReferencias(texto);
  const citas = extraerCitas(cuerpo);
  const cruce = cruzarCitas(citas, fuentes);
  console.log(`${citas.length} citas detectadas en el texto.`);
  lista("Citas sin referencia en uso:", cruce.sinReferencia);
  lista("Citas con otro año:", cruce.anioDistinto);
  lista("Formato de cita:", cruce.formato);
  lista("Referencias en uso sin cita en el texto:", cruce.sinCitar.map((fuente) => `${fuente.id} (${fuente.autores?.[0]?.family ?? fuente.autores?.[0]?.name}, ${fuente.anio})`));

  if (referencias) {
    const cruceLista = cruzarLista(referencias, fuentes);
    console.log(`\nLista del borrador: ${cruceLista.total} entradas reconocidas; revisa a mano si no coinciden con las que ves.`);
    lista("En la lista del borrador, pero no en uso:", cruceLista.ajenas);
    lista("En uso, pero no reconocidas en la lista del borrador:", cruceLista.ausentes.map((fuente) => fuente.id));
  } else {
    console.log("\nNo se encontró un apartado de referencias en el borrador.");
  }

  const estilo = marcasDeEstilo(cuerpo);
  lista("Posible primera persona (el enunciado pide impersonal; revisar):", estilo.personales);
  console.log(`\nCitas literales largas detectadas: ${estilo.citasLiterales}. Fuentes secundarias («citado en»): ${estilo.fuentesSecundarias}.`);
  console.log("La detección de citas es heurística: lo que no encuentre puede no estar bien formateado.");
}

try {
  await main();
} catch (error) {
  console.error(`[ERROR] ${error.message}`);
  process.exit(1);
}

#!/usr/bin/env node
// Comprueba todas las fichas y regenera los README del banco. Ejecútalo tras editar una ficha.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generarIndices, leerBanco, validarFicha } from "./banco.mjs";

const dirBanco = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "banco");
const fichas = leerBanco(dirBanco);

const errores = fichas.flatMap((ficha) => {
  const problemas = validarFicha(ficha);
  if (path.basename(path.dirname(ficha.ruta)) !== ficha.tema[0]) {
    problemas.push(`está fuera de la carpeta de su tema principal (${ficha.tema[0]})`);
  }
  return problemas.map((p) => `${ficha.id}: ${p}`);
});

if (errores.length > 0) {
  console.error(errores.join("\n"));
  process.exit(1);
}

for (const [relativa, contenido] of Object.entries(generarIndices(fichas))) {
  fs.writeFileSync(path.join(dirBanco, relativa), contenido);
}
console.log(`${fichas.length} fichas comprobadas; índices regenerados.`);

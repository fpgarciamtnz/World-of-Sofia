import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { buscar, escribirFicha, generarIndices, leerBanco, parsearFicha, validarFicha } from "../scripts/banco.mjs";

const dirBanco = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "banco");

const base = {
  id: "ana-000001",
  titulo: "Reloj mecánico: engranajes",
  resumen: "Un reloj que se desmonta.",
  formato: "3d",
  tema: ["ciudad-arquitectura"],
  estilo: [],
  tecnica: ["threejs"],
  salida: "html",
  estado: "completo",
  idioma: "en",
  duracion_s: null,
  autor: "@ana",
  autor_url: "https://x.com/ana",
  post: "https://x.com/ana/status/1",
  prompt: "Build a watch."
};

const ficha = (cambios) => ({ ...base, ...cambios });

describe("fichas", () => {
  it("sobreviven a escribir y leer, incluso con vallas de código en el prompt", () => {
    const original = ficha({ prompt: "Use this:\n```js\nconst a = 1;\n```\nThen ````more````." });
    expect(parsearFicha(escribirFicha(original))).toEqual(original);
  });

  it("señalan valores fuera del vocabulario", () => {
    expect(validarFicha(ficha({ tema: ["cocina"], salida: "unity" }))).toEqual([
      "tema desconocido: cocina",
      "salida desconocido: unity"
    ]);
  });
});

describe("buscar", () => {
  const fichas = [
    ficha({ id: "a", estado: "parcial", tecnica: ["svg"] }),
    ficha({ id: "b", titulo: "Galaxia", tema: ["naturaleza-espacio"], duracion_s: 20, remake: "https://x" }),
    ficha({ id: "c", titulo: "Galaxia", tema: ["naturaleza-espacio"], duracion_s: 60 }),
    ficha({ id: "d", duplicado_de: "a" })
  ];
  const ids = (criterios) => buscar(fichas, criterios).map((f) => f.id);

  it("acepta varios valores por faceta y omite duplicados", () => {
    expect(ids({ tecnica: "svg,threejs" })).toEqual(["b", "c", "a"]);
    expect(ids({ incluirDuplicados: true })).toContain("d");
  });

  it("ignora tildes y mayúsculas en el texto, y ordena por estado y remake", () => {
    expect(ids({ texto: "MECANICO" })).toEqual(["a"]);
    expect(ids({ texto: "galaxia" })).toEqual(["b", "c"]);
  });

  it("acepta alternativas con | y trata el guion como espacio", () => {
    expect(ids({ texto: "nebulosa|galaxia" })).toEqual(["b", "c"]);
    expect(ids({ texto: "reloj-mecanico" })).toEqual(ids({ texto: "reloj mecanico" }));
  });

  it("descarta lo que no fija duración o la supera", () => {
    expect(ids({ duracionMax: 30 })).toEqual(["b"]);
  });
});

describe("el banco", () => {
  const fichas = leerBanco(dirBanco);

  it("solo usa el vocabulario y guarda cada ficha en la carpeta de su tema principal", () => {
    const errores = fichas.flatMap((f) =>
      [...validarFicha(f), ...(path.basename(path.dirname(f.ruta)) === f.tema[0] ? [] : ["carpeta"])].map(
        (p) => `${f.id}: ${p}`
      )
    );
    expect(errores).toEqual([]);
  });

  it("tiene los índices al día", () => {
    for (const [relativa, contenido] of Object.entries(generarIndices(fichas))) {
      expect(fs.readFileSync(path.join(dirBanco, relativa), "utf8"), relativa).toBe(contenido);
    }
  });
});

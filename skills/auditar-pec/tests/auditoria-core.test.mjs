import { describe, expect, it } from "vitest";

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
} from "../scripts/auditoria-core.mjs";

const autor = (family) => ({ family, given: "Ana" });
const fuentes = [
  { id: "A", anio: 2024, tipo: "articulo", titulo: "Identity construction", autores: [autor("Chen")] },
  { id: "B", anio: 2021, tipo: "articulo", titulo: "Dignity", autores: [autor("Sainz"), autor("Lobato"), autor("Porras-Caballero")] },
  { id: "C", anio: 2023, tipo: "articulo", titulo: "Otro", autores: [autor("Sainz"), autor("Mora")] },
  { id: "D", anio: 2022, tipo: "informe", titulo: "Informe", autores: [{ name: "Organización Mundial de la Salud" }] },
  { id: "E", anio: 2022, tipo: "articulo", titulo: "Pilot", autores: [autor("Gavriel-Fried"), autor("Vana")] }
];

describe("extraerCitas", () => {
  it("reconoce citas agrupadas, narrativas, siglas y páginas", () => {
    const citas = extraerCitas("Se afirma (Chen, 2024; Sainz et al., 2021, p. 66). Según Gavriel-Fried y Vana (2022), sí. La OMS lo recoge (OMS, 2022).");
    expect(citas.map((cita) => cita.primerAutor)).toEqual(["Chen", "Sainz", "OMS", "Gavriel-Fried"]);
    expect(citas[1].etAl).toBe(true);
  });

  it("no confunde otros paréntesis con citas", () => {
    expect(extraerCitas("La muestra (n = 30) y el periodo (de 2020 a 2022) y el año (2020).")).toEqual([]);
  });
});

describe("cruzarCitas", () => {
  it("separa citas sin referencia, con otro año, con formato dudoso y fuentes sin citar", () => {
    const citas = extraerCitas("A (Chen, 2019). B (Pérez, 2020). C (Sainz, Lobato y Porras-Caballero, 2021). D (Sainz y Mora, 2023). E (Gavriel-Fried & Vana, 2022).");
    const cruce = cruzarCitas(citas, fuentes);
    expect(cruce.anioDistinto.join()).toContain("Chen, 2019");
    expect(cruce.sinReferencia.join()).toContain("Pérez, 2020");
    expect(cruce.formato.join()).toContain("debería usar et al.");
    expect(cruce.formato.join()).toContain("«&»");
    expect(cruce.sinCitar.map((fuente) => fuente.id)).toEqual(["A", "D"]);
  });

  it("casa una institución por su sigla y distingue obras del mismo autor por el año", () => {
    const cruce = cruzarCitas(extraerCitas("(OMS, 2022). (Sainz et al., 2021)."), fuentes);
    expect(cruce.sinReferencia).toEqual([]);
    expect(cruce.sinCitar.map((fuente) => fuente.id)).toEqual(["A", "C", "E"]);
  });
});

describe("separarReferencias y cruzarLista", () => {
  it("corta por el último apartado de referencias y compara las entradas", () => {
    const { cuerpo, lista } = separarReferencias("Texto (Chen, 2024).\nReferencias\nChen, A. [Ana]. (2024). Identity. Revista.\nPérez, L. (2020). Ajena. Revista.\n");
    expect(cuerpo).not.toContain("Pérez");
    const cruce = cruzarLista(lista, fuentes);
    expect(cruce.total).toBe(2);
    expect(cruce.ajenas.join()).toContain("Pérez");
    expect(cruce.ausentes.map((fuente) => fuente.id)).not.toContain("A");
  });
});

describe("regresiones con una plantilla real", () => {
  it("elige la lista con entradas aunque la plantilla repita el rótulo después", () => {
    const texto = [
      "Texto (Chen, 2024).",
      "-2539988900Referencias bibliográficas (mín. 1 pág)",
      "Chen, A. [Ana]. (2024). Identity. Revista.",
      "Sainz, A. [Ana]. (2021). Dignity. Revista.",
      "Autoevaluación",
      "Referencias bibliográficas",
      "El apartado SÓLO incluye las referencias citadas en el texto."
    ].join("\n");
    const { cuerpo, lista } = separarReferencias(texto);
    expect(cuerpo.trim()).toBe("Texto (Chen, 2024).");
    expect(cruzarLista(lista, fuentes).total).toBe(2);
  });

  it("no da por citada una fuente que solo aparece en la lista", () => {
    const { cuerpo } = separarReferencias("Texto (Chen, 2024).\nReferencias\nSainz, A. (2021). Dignity. Revista.\n");
    expect(cruzarCitas(extraerCitas(cuerpo), fuentes).sinCitar.map((fuente) => fuente.id)).toContain("B");
  });

  it("extrae de un .docx solo el texto visible y marca los saltos de página", () => {
    const xml = '<w:p><wp:posOffset>-2539988900</wp:posOffset><w:r><w:t>Marco &amp; teoría</w:t></w:r></w:p>' +
      '<mc:AlternateContent><mc:Fallback><w:p><w:r><w:t>copia</w:t></w:r></w:p></mc:Fallback></mc:AlternateContent>' +
      '<w:p><w:r><w:lastRenderedPageBreak/><w:t xml:space="preserve">Referencias </w:t></w:r></w:p>';
    const texto = textoDeDocx(xml);
    expect(texto).toBe("Marco & teoría\n\fReferencias \n");
    expect(mapaDePaginas(texto, [/^[\f\s]*Referencias.*$/mu])).toEqual([{ rotulo: "Referencias", pagina: 2 }]);
  });
});

describe("evaluarActualidad", () => {
  it("cuenta el año límite en la lectura amplia y no en la estricta", () => {
    const resultado = evaluarActualidad(fuentes, { anioRef: 2026, ventana: 5, minimo: 70 });
    expect(resultado.recientes).toBe(5);
    expect(resultado.estrictas).toBe(4);
    expect(resultado.cumple).toBe(true);
    expect(evaluarActualidad([], { anioRef: 2026, ventana: 5, minimo: 70 }).cumple).toBe(false);
  });
});

describe("evaluarTipos y nivelDeAcceso", () => {
  it("avisa de tipos fuera del enunciado y de trabajos no publicados", () => {
    const avisos = evaluarTipos([...fuentes, { id: "F", tipo: "articulo", titulo: "Trabajo de fin de grado sobre X" }], ["articulo", "libro"]);
    expect(avisos.map((aviso) => aviso.fuente.id)).toEqual(["D", "F"]);
  });

  it("no da por texto completo una copia local que no existe", () => {
    expect(nivelDeAcceso({ local: "x.pdf", abstract: "..." }, false)).toBe("resumen");
    expect(nivelDeAcceso({ local: "x.pdf" }, true)).toBe("texto");
    expect(nivelDeAcceso({}, false)).toBe("metadatos");
  });
});

describe("compararMetadatos", () => {
  const base = { anio: 2024, titulo: "Identity construction in recovery", autores: [autor("Chen")], vol: "56", num: "1", pags: "109–116" };
  const fecha = (anio) => ({ "date-parts": [[anio]] });

  it("no alerta cuando el año coincide con la edición impresa y el online es anterior", () => {
    const registro = { title: ["Identity Construction in Recovery"], issued: fecha(2022), "published-print": fecha(2024), volume: "56", issue: "1", page: "109-116", author: [{ family: "Chen" }] };
    expect(compararMetadatos(base, registro)).toEqual({ alertas: [], revisar: [], informacion: [] });
  });

  it("ignora afiliaciones registradas como autores y no alerta por un registro incompleto", () => {
    const ficha = { ...base, autores: [autor("Chen"), autor("Mora")] };
    const conAfiliacion = { title: [base.titulo], issued: fecha(2024), author: [{ family: "Chen" }, { family: "Mora" }, { name: "School of Psychology, University of Monterrey" }] };
    expect(compararMetadatos(ficha, conAfiliacion).alertas).toEqual([]);
    const incompleto = compararMetadatos(ficha, { title: [base.titulo], issued: fecha(2024), author: [{ family: "Chen" }] });
    expect(incompleto.alertas).toEqual([]);
    expect(incompleto.informacion.join()).toContain("incompleto");
  });

  it("deja para revisar un registro previo sin volumen y alerta si el año choca con un registro completo", () => {
    const previo = { title: [base.titulo], issued: fecha(2020), author: [{ family: "Chen" }] };
    expect(compararMetadatos(base, previo).revisar.join()).toContain("no confirmado");
    expect(compararMetadatos(base, { ...previo, volume: "56" }).alertas.join()).toContain("no confirmado");
  });

  it("alerta de errores reales: autor, volumen, páginas, autores omitidos y retractación", () => {
    const registro = { title: ["Algo completamente diferente"], issued: fecha(2024), volume: "57", page: "200-210", author: [{ family: "Lee" }, { family: "Kim" }], relation: { "is-retracted-by": [{}] } };
    const { alertas } = compararMetadatos(base, registro);
    for (const texto of ["título distinto", "primer autor", "faltan autores", "volumen", "páginas", "retractación"]) {
      expect(alertas.join()).toContain(texto);
    }
  });
});

describe("marcasDeEstilo", () => {
  it("detecta primera persona, citas literales y fuentes secundarias sin marcar el impersonal", () => {
    const marcas = marcasDeEstilo("Se analiza el trabajo.\nHe revisado mi investigación.\n«Una frase literal bastante larga copiada de un artículo cualquiera» (citado en Chen, 2024).");
    expect(marcas.personales).toHaveLength(1);
    expect(marcas.citasLiterales).toBe(1);
    expect(marcas.fuentesSecundarias).toBe(1);
  });
});

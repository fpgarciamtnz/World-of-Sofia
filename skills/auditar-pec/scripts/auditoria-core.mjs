// Comprobaciones puras de una entrega académica: no leen disco ni red.

export function normalizar(texto) {
  return String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function similitudTitulo(a, b) {
  const A = new Set(normalizar(a).split(" "));
  const B = new Set(normalizar(b).split(" "));
  const comunes = [...A].filter((palabra) => B.has(palabra)).length;
  return comunes / (A.size + B.size - comunes || 1);
}

export function apellidoPrincipal(fuente) {
  const primero = fuente.autores?.[0];
  return primero?.family ?? primero?.name ?? "";
}

// «Organización Mundial de la Salud» -> «oms»; permite casar citas por sigla.
export function sigla(nombre) {
  return String(nombre ?? "")
    .split(/\s+/)
    .filter((palabra) => /^\p{Lu}/u.test(palabra))
    .map((palabra) => palabra[0])
    .join("")
    .toLowerCase();
}

// Una plantilla puede repetir el rótulo en otro apartado, como la autoevaluación:
// la lista verdadera es la que tiene más entradas tras el rótulo.
export function separarReferencias(texto) {
  const rotulos = [...texto.matchAll(/^[^\n]{0,20}?(?:Referencias(?: bibliogr[aá]ficas)?|Bibliograf[ií]a)[ \t]*(?:\([^)\n]*\))?[ \t]*:?[ \t]*$/gimu)];
  if (rotulos.length === 0) {
    return { cuerpo: texto, lista: "" };
  }
  let elegido = rotulos[rotulos.length - 1];
  let elegidoFin = texto.length;
  let mejor = -1;
  rotulos.forEach((rotulo, indice) => {
    const fin = rotulos[indice + 1]?.index ?? texto.length;
    const entradas = entradasDeLista(texto.slice(rotulo.index + rotulo[0].length, fin)).length;
    if (entradas > mejor) {
      mejor = entradas;
      elegido = rotulo;
      elegidoFin = fin;
    }
  });
  return { cuerpo: texto.slice(0, elegido.index), lista: texto.slice(elegido.index + elegido[0].length, elegidoFin) };
}

// Solo el texto visible: sin las posiciones de los cuadros de texto ni su copia de compatibilidad.
export function textoDeDocx(xml) {
  const decodificar = (texto) =>
    texto
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&");
  const limpio = xml.replace(/<mc:Fallback>[\s\S]*?<\/mc:Fallback>/g, "");
  let salida = "";
  for (const pieza of limpio.matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>|<\/w:p>|<w:tab\/>|<w:lastRenderedPageBreak\/>|<w:br w:type="page"[^>]*\/>/g)) {
    if (pieza[1] !== undefined) {
      salida += decodificar(pieza[1]);
    } else if (pieza[0] === "</w:p>") {
      salida += "\n";
    } else if (pieza[0] === "<w:tab/>") {
      salida += " ";
    } else {
      salida += "\f";
    }
  }
  return salida;
}

export function mapaDePaginas(texto, rotulos) {
  const mapa = [];
  for (const rotulo of rotulos) {
    const coincidencia = rotulo.exec(texto);
    if (coincidencia) {
      const inicio = coincidencia.index + coincidencia[0].search(/\S/);
      mapa.push({ rotulo: texto.slice(inicio).split("\n")[0].trim().slice(0, 60), pagina: (texto.slice(0, inicio).match(/\f/g) ?? []).length + 1 });
    }
  }
  return mapa;
}

function lineaDe(texto, indice) {
  return texto.slice(0, indice).split("\n").length;
}

function crearCita(bruto, autoresTexto, aniosTexto, linea) {
  const texto = autoresTexto.trim().replace(/\s+/g, " ");
  const primerAutor = texto.split(/,|\s+y\s+|\s+e\s+|\s*&\s*|\s+et\s+al\b/u)[0].trim();
  return {
    bruto: bruto.trim().replace(/\s+/g, " "),
    primerAutor,
    anios: aniosTexto.match(/(?:19|20)\d{2}/g) ?? [],
    etAl: /\bet\s+al\b/u.test(texto),
    conAmpersand: /&/.test(texto),
    varios: /,|\s+y\s+|\s+e\s+|&/u.test(texto) && !/\bet\s+al\b/u.test(texto),
    nombrados: texto.split(/,|\s+y\s+|\s+e\s+|\s*&\s*/u).filter((parte) => parte.trim()).length,
    linea
  };
}

export function extraerCitas(cuerpo) {
  const citas = [];
  const prefijo = /^(?:v[ée]anse?(?:\s+tambi[ée]n)?|cf\.|p\.\s*ej\.,?|por ejemplo,?|como se cit[oó] en|citad[oa] en)\s+/iu;
  const entreParentesis = /^(\p{Lu}.*?),\s*((?:19|20)\d{2}[a-z]?(?:\s*,\s*(?:19|20)\d{2}[a-z]?)*)(?:\s*,\s*(?:pp?\.|p[áa]gs?\.)\s*[\d–-]+)?$/u;

  for (const grupo of cuerpo.matchAll(/\(([^()]{3,300})\)/gu)) {
    for (const parte of grupo[1].split(";")) {
      const limpia = parte.trim().replace(/\s+/g, " ").replace(prefijo, "");
      const coincide = limpia.match(entreParentesis);
      if (coincide) {
        citas.push(crearCita(limpia, coincide[1], coincide[2], lineaDe(cuerpo, grupo.index)));
      }
    }
  }

  const nombre = String.raw`\p{Lu}[\p{L}'’-]+`;
  const particula = String.raw`(?:(?:De|Del|Van|Von)\s+)?`;
  const narrativa = new RegExp(
    String.raw`(${particula}${nombre}(?:(?:,\s*${particula}${nombre})*\s+(?:y|e|&)\s+${particula}${nombre}|\s+et\s+al\.)?)\s+\(((?:19|20)\d{2}[a-z]?)(?:,\s*(?:pp?\.|p[áa]gs?\.)[^)]*)?\)`,
    "gu"
  );
  for (const coincide of cuerpo.matchAll(narrativa)) {
    citas.push(crearCita(coincide[0], coincide[1], coincide[2], lineaDe(cuerpo, coincide.index)));
  }
  return citas;
}

export function citaCoincideCon(cita, fuente) {
  const buscado = normalizar(cita.primerAutor);
  const apellido = normalizar(apellidoPrincipal(fuente));
  if (!buscado || !apellido) {
    return false;
  }
  if (buscado === apellido || sigla(apellidoPrincipal(fuente)) === buscado) {
    return true;
  }
  const palabras = apellido.split(" ");
  const buscadas = buscado.split(" ");
  return buscadas.every((palabra) => palabras.includes(palabra)) || palabras.every((palabra) => buscadas.includes(palabra));
}

export function cruzarCitas(citas, fuentes) {
  const citadas = new Set();
  const sinReferencia = [];
  const anioDistinto = [];
  const formato = [];

  for (const cita of citas) {
    const delAutor = fuentes.filter((fuente) => citaCoincideCon(cita, fuente));
    for (const anio of cita.anios) {
      const exacta = delAutor.filter((fuente) => String(fuente.anio) === anio);
      if (exacta.length > 0) {
        exacta.forEach((fuente) => citadas.add(fuente.id));
        for (const fuente of exacta) {
          const total = fuente.autores?.length ?? 0;
          if (cita.etAl && total <= 2) {
            formato.push(`línea ${cita.linea}: «${cita.bruto}» usa et al. con ${total} autoría(s)`);
          }
          if (!cita.etAl && total >= 3 && cita.nombrados >= 2) {
            formato.push(`línea ${cita.linea}: «${cita.bruto}» debería usar et al. (${total} autores)`);
          }
          if (!cita.etAl && total === 2 && cita.nombrados === 1) {
            formato.push(`línea ${cita.linea}: «${cita.bruto}» omite a la segunda persona autora`);
          }
          if (!cita.etAl && total >= 3 && cita.nombrados === 1) {
            formato.push(`línea ${cita.linea}: «${cita.bruto}» debería usar et al. (${total} autores)`);
          }
        }
      } else if (delAutor.length > 0) {
        anioDistinto.push(`línea ${cita.linea}: «${cita.bruto}» y en la bibliografía consta ${delAutor.map((fuente) => fuente.anio).join(", ")}`);
      } else {
        sinReferencia.push(`línea ${cita.linea}: «${cita.bruto}»`);
      }
    }
    if (cita.conAmpersand) {
      formato.push(`línea ${cita.linea}: «${cita.bruto}» usa «&»; la adaptación UOC usa «y»`);
    }
  }

  return {
    sinReferencia: [...new Set(sinReferencia)],
    anioDistinto: [...new Set(anioDistinto)],
    formato: [...new Set(formato)],
    sinCitar: fuentes.filter((fuente) => !citadas.has(fuente.id))
  };
}

export function entradasDeLista(lista) {
  const entradas = [];
  for (const linea of lista.split(/\r?\n/)) {
    const coincide = linea.match(/^\s*(\p{Lu}.*?)\s*\((\d{4})[a-z]?\)\./u);
    if (coincide) {
      entradas.push({ primerAutor: coincide[1].split(",")[0].trim(), anios: [coincide[2]], bruto: linea.trim().slice(0, 90) });
    }
  }
  return entradas;
}

export function cruzarLista(lista, fuentes) {
  const entradas = entradasDeLista(lista);
  const halladas = new Set();
  const ajenas = [];
  for (const entrada of entradas) {
    const fuente = fuentes.find((candidata) => citaCoincideCon(entrada, candidata) && String(candidata.anio) === entrada.anios[0]);
    if (fuente) {
      halladas.add(fuente.id);
    } else {
      ajenas.push(entrada.bruto);
    }
  }
  return { total: entradas.length, ajenas, ausentes: fuentes.filter((fuente) => !halladas.has(fuente.id)) };
}

export function evaluarActualidad(fuentes, { anioRef, ventana, minimo }) {
  const desde = anioRef - ventana;
  const total = fuentes.length;
  const recientes = fuentes.filter((fuente) => Number(fuente.anio) >= desde).length;
  const estrictas = fuentes.filter((fuente) => Number(fuente.anio) > desde).length;
  const porcentaje = (valor) => (total ? Math.round((100 * valor) / total) : 0);
  return {
    desde,
    total,
    recientes,
    porcentaje: porcentaje(recientes),
    estrictas,
    porcentajeEstricto: porcentaje(estrictas),
    cumple: total > 0 && (100 * recientes) / total >= minimo,
    cumpleEstricto: total > 0 && (100 * estrictas) / total >= minimo,
    antiguas: fuentes.filter((fuente) => Number(fuente.anio) < desde).map((fuente) => fuente.id)
  };
}

export function evaluarTipos(fuentes, permitidos) {
  const prohibido = /trabajo\s+(?:de\s+)?fin\s+de|\bTFG\b|\bTFM\b|tesis\s+doctoral|\bblog\b/iu;
  const avisos = [];
  for (const fuente of fuentes) {
    if (!permitidos.includes(fuente.tipo)) {
      avisos.push({ fuente, motivo: `tipo «${fuente.tipo}» fuera de los admitidos` });
    } else if (prohibido.test(`${fuente.titulo ?? ""} ${fuente.revista ?? ""}`)) {
      avisos.push({ fuente, motivo: "parece un trabajo académico no publicado o un blog" });
    }
  }
  return avisos;
}

export function nivelDeAcceso(fuente, existeLocal) {
  if (fuente.local && existeLocal) {
    return "texto";
  }
  if (fuente.abstract) {
    return "resumen";
  }
  return "metadatos";
}

const AFILIACION = /university|universidad|school|faculty|facultad|department|institute|escuela|hospital|fundaci|foundation/iu;

export function compararMetadatos(fuente, registro) {
  const alertas = [];
  const revisar = [];
  const informacion = [];

  const titulo = registro.title?.[0] ?? "";
  const parecido = similitudTitulo(fuente.titulo, titulo);
  if (parecido < 0.7) {
    alertas.push(`título distinto (parecido ${parecido.toFixed(2)}): «${titulo.slice(0, 90)}»`);
  }

  // Las revistas publican antes online: basta con que el año coincida con alguna fecha del registro.
  const fechas = ["issued", "published-print", "published-online", "published"]
    .map((clave) => registro[clave]?.["date-parts"]?.[0]?.[0])
    .concat(registro["journal-issue"]?.["published-print"]?.["date-parts"]?.[0]?.[0])
    .filter(Boolean)
    .map(Number);
  const anioConfirmado = fechas.length === 0 || fechas.includes(Number(fuente.anio));
  if (!anioConfirmado) {
    (registro.volume ? alertas : revisar).push(`año ${fuente.anio} no confirmado; Crossref registra ${[...new Set(fechas)].join(", ")}`);
  }

  // Algunos registros guardan afiliaciones como si fueran autores: no cuentan.
  const autores = (registro.author ?? []).filter((autor) => autor.family || (autor.name && !AFILIACION.test(autor.name)));
  const locales = fuente.autores?.length ?? 0;
  if (autores.length > 0) {
    const primero = normalizar(autores[0].family ?? autores[0].name);
    const apellido = normalizar(apellidoPrincipal(fuente));
    if (!primero.includes(apellido) && !apellido.includes(primero)) {
      alertas.push(`primer autor distinto: Crossref registra «${autores[0].family ?? autores[0].name}»`);
    }
    if (autores.length > locales) {
      alertas.push(`faltan autores: ${locales} en la ficha, ${autores.length} en Crossref`);
    } else if (autores.length < locales) {
      informacion.push(`Crossref solo registra ${autores.length} de ${locales} autores; el registro parece incompleto`);
    }
  }

  if (registro.volume && fuente.vol && String(registro.volume) !== String(fuente.vol)) {
    alertas.push(`volumen ${fuente.vol} frente a ${registro.volume}`);
  }
  if (registro.issue && fuente.num && String(registro.issue) !== String(fuente.num)) {
    alertas.push(`número ${fuente.num} frente a ${registro.issue}`);
  }
  if (registro.page && fuente.pags) {
    const [inicioCrossref, finCrossref] = normalizar(registro.page).split(" ");
    const [inicioFicha, finFicha] = normalizar(fuente.pags).split(" ");
    if (inicioCrossref !== inicioFicha || (finCrossref && finFicha && finCrossref !== finFicha)) {
      alertas.push(`páginas ${fuente.pags} frente a ${registro.page}`);
    }
  }

  const actualizaciones = [...(registro["updated-by"] ?? []), ...(registro["update-to"] ?? [])];
  if (registro.relation?.["is-retracted-by"] || /^retract/iu.test(titulo) || actualizaciones.some((nota) => /retract|withdraw/iu.test(nota.type ?? ""))) {
    alertas.push("posible retractación: compruébalo en la revista");
  } else if (actualizaciones.length > 0) {
    revisar.push(`hay una corrección publicada: compruébala (${actualizaciones.map((nota) => `${nota.type}, https://doi.org/${nota.DOI}`).join("; ")})`);
  }

  return { alertas, revisar, informacion };
}

export function marcasDeEstilo(cuerpo) {
  const primeraPersona = /\b(?:creo|pienso|opino|considero|quiero|pretendo|hemos|nuestr[oa]s?|yo|mis?\s+(?:investigaci[oó]n|trabajo|estudio|propuesta|objetivo|inter[eé]s|experiencia|opini[oó]n))\b|\bhe\s+\p{L}+(?:ado|ido|to|cho)\b/iu;
  const lineas = cuerpo.split(/\r?\n/);
  const personales = lineas
    .map((texto, indice) => ({ texto: texto.trim(), linea: indice + 1 }))
    .filter(({ texto }) => primeraPersona.test(texto))
    .map(({ texto, linea }) => `línea ${linea}: «${texto.slice(0, 100)}»`);
  const citasLiterales = [...cuerpo.matchAll(/[“"«]([^”"»]{40,}?)[”"»]/gu)].length;
  const fuentesSecundarias = [...cuerpo.matchAll(/como se cit[oó] en|citad[oa] en/giu)].length;
  return { personales, citasLiterales, fuentesSecundarias };
}

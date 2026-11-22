# Auditar PEC

Philosopher idea: la duda metódica de Descartes aplicada a una entrega académica, después de fijar con Aquinas qué pide la entrega: separa lo observado, lo exigido, lo supuesto y lo que falta antes de dar nada por bueno.

Practical use: audita una PEC frente a su enunciado y su rúbrica, y se detiene a pedir la rúbrica si no la encuentra. Solo se inicia con `/auditar-pec`. Comprueba actualidad, tipos de fuente, DOI, citas frente a lista, páginas y estilo, valora si las fuentes sostienen las afirmaciones centrales y abre el informe con los conceptos de Aquinas y Descartes que ha revisado.

## Por qué solo con /auditar-pec

Claude no la inicia por su cuenta. Quien entrega necesita saber que la auditoría se ha hecho y qué conceptos se han revisado, así que la inicia esa persona, y el informe nombra cada concepto, con lo que encontró o por qué no aplicaba.

## Qué combina

- `grill-me-aquinas`, cargada siempre al empezar: qué se pide de verdad, los términos del enunciado, lo esencial frente a lo accidental y qué es ley, hábito o excepción.
- `audit-plan-descartes`, cargada siempre después: el libro de evidencias, los límites y recortes del alcance y la auditoría de supuestos.
- `scientific-critical-thinking` (K-Dense, MIT), si está instalada: el flujo de valoración de la evidencia.
- Las herramientas del proyecto: `datos/fuentes.json` y `herramientas/comprobar.mjs`.

Si Aquinas o Descartes no están instaladas, la auditoría aplica sus conceptos con la tabla de `SKILL.md` y lo dice en el informe.

## Comprobación mecánica

```bash
node scripts/auditar-bibliografia.mjs --proyecto <carpeta> --borrador <pdf|docx|txt|md|html>
```

Solo usa Node 24. Para un PDF hace falta `pdftotext`; un `.docx` se lee sin dependencias, y su número de páginas es el que guardó Word. Consulta Crossref y OpenAlex por DOI; `--sin-red` lo evita.

## Límites

La detección de citas es heurística. El script confirma que una referencia existe y que sus datos coinciden, no que diga lo que se le atribuye: eso se valora leyendo la fuente.

## Límite de distribución

Esta carpeta es autónoma. Solo depende del formato de `datos/fuentes.json` del proyecto auditado; Aquinas y Descartes mejoran la auditoría, pero sin ellas sigue funcionando.

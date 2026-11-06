# Auditar PEC

Philosopher idea: la duda metódica de Descartes aplicada a una entrega académica: separa lo observado, lo exigido, lo supuesto y lo que falta antes de dar nada por bueno.

Practical use: audita una PEC frente a su enunciado. Comprueba actualidad, tipos de fuente, DOI, citas frente a lista, páginas y estilo, y después valora si las fuentes sostienen las afirmaciones centrales.

## Qué combina

- `audit-plan-descartes`: el libro de evidencias y la separación entre hechos y supuestos.
- `scientific-critical-thinking` (K-Dense, MIT), si está instalada: el flujo de valoración de la evidencia.
- Las herramientas del proyecto: `datos/fuentes.json` y `herramientas/comprobar.mjs`.

## Comprobación mecánica

```bash
node scripts/auditar-bibliografia.mjs --proyecto <carpeta> --borrador <pdf|docx|txt|md|html>
```

Solo usa Node 24. Para un PDF hace falta `pdftotext`; un `.docx` se lee sin dependencias, y su número de páginas es el que guardó Word. Consulta Crossref y OpenAlex por DOI; `--sin-red` lo evita.

## Límites

La detección de citas es heurística. El script confirma que una referencia existe y que sus datos coinciden, no que diga lo que se le atribuye: eso se valora leyendo la fuente.

## Límite de distribución

Esta carpeta es autónoma. Solo depende del formato de `datos/fuentes.json` del proyecto auditado.

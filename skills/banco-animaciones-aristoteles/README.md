# Banco Animaciones Aristoteles

Philosopher idea: las categorías de Aristóteles aplicadas a un montón de prompts: de cada uno se pregunta qué es, de qué trata, cómo se ve, con qué se hace y en qué estado está, para que 703 prompts se puedan encontrar por clases y no por suerte.

Practical use: úsala cuando quieras crear una animación en código con Opus 5.5 (motion graphic, explicativo, escena 3D, juego, fondo web) o buscar un prompt de referencia. Filtra el banco por facetas y texto, propone candidatas, adapta el prompt elegido y, si se pide, genera y comprueba la animación como HTML autocontenido.

## Facetas

| Faceta | Responde a | Ejemplos |
| --- | --- | --- |
| `formato` | ¿Qué es? | `motion`, `3d`, `explicativo`, `interactivo` |
| `tema` | ¿De qué trata? | `logo-marca`, `datos`, `ciencia-mates`, `juego`, `ui-web`… (15) |
| `estilo` | ¿Cómo se ve? | `minimal`, `retro-pixel`, `dibujado`, `neon-futurista`… (12) |
| `tecnica` | ¿Con qué se hace? | `canvas`, `svg`, `threejs`, `shader`, `gsap`… |
| `salida` | ¿Qué produce? | `html`, `remotion`, `blender`, `video`… |
| `estado` | ¿Se puede usar tal cual? | `completo`, `plantilla`, `parcial`, `solo-descripcion` |

[references/taxonomia.md](references/taxonomia.md) define cada valor y cómo traducir una petición a filtros.

## Probarlo a mano

Navega por temas desde `banco/README.md`, o busca desde la carpeta de la skill:

```bash
node scripts/buscar.mjs --facetas
node scripts/buscar.mjs fractal --usable --salida html
node scripts/buscar.mjs --tema logo-marca --estado plantilla --limite 5
node scripts/buscar.mjs --ver <id> --solo-prompt | xclip -selection clipboard
```

Pega el prompt en Claude Code con Opus 5.5 y pide un único HTML. Solo hace falta Node 24.

## Estructura

- `banco/<tema>/<id>.md`: una ficha por prompt, en la carpeta de su tema principal, con la clasificación, la autoría y el prompt original.
- `banco/README.md` y `banco/<tema>/README.md`: índices generados por `scripts/indexar.mjs`.
- `banco/ORIGEN.md`: repositorio de origen, versión importada, licencia y créditos.

## Créditos

Los prompts proceden de [awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) (MIT) y pertenecen a sus autores; cada ficha enlaza a su post original. La clasificación, los títulos y los resúmenes en castellano son de este banco.

## Distribution boundary

This folder must stay self-contained. Do not reference private files in another skill directory.

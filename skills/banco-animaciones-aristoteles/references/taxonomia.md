# Taxonomía del banco

Cada ficha responde a las mismas preguntas: qué es (`formato`), de qué trata (`tema`), cómo se ve (`estilo`), con qué se hace (`tecnica`, `salida`) y en qué estado está el prompt (`estado`). Lee este archivo cuando la petición no use estas palabras y haya que traducirla a filtros.

## formato

Viene del repositorio de origen.

- `motion`: motion graphics, piezas de vídeo animadas, anuncios, intros.
- `3d`: escenas y objetos en 3D.
- `explicativo`: vídeos que explican algo paso a paso.
- `interactivo`: juegos, simuladores y piezas que responden al usuario.

## tema

De uno a tres por ficha. El primero es el principal y decide la carpeta.

| Valor | Abarca | Peticiones típicas |
| --- | --- | --- |
| `logo-marca` | Revelado de logo, intro o film de marca, aniversarios | "intro con mi logo", "intro para mi canal", "brand reveal", "ident" |
| `producto-saas` | Lanzamientos, demos de interfaz, anuncios, promos | "vídeo de lanzamiento", "demo de mi app", "anuncio para redes" |
| `tipografia` | Tipografía cinética, citas, texto protagonista | "frase animada", "kinetic type", "lyric video" |
| `datos` | Gráficos, estadísticas, dashboards | "animar estos datos", "gráfico de barras que crece" |
| `ciencia-mates` | Física, química, biología, matemáticas, ingeniería | "explicar la fotosíntesis", "demostración visual" |
| `tecnologia-ia` | Ordenadores, chips, redes, IA, software | "cómo funciona un LLM", "dentro de una GPU" |
| `historia-cultura` | Historia, geografía, arte, sociedad y vida cotidiana, incluidas comida y recetas | "historia de Roma", "receta animada", "cocina" |
| `naturaleza-espacio` | Paisajes, clima, océano, animales, cosmos | "sistema solar", "bosque al amanecer" |
| `ciudad-arquitectura` | Ciudades, edificios, interiores, vehículos, objetos detallados | "ciudad isométrica", "reloj mecánico" |
| `personajes-narrativa` | Personajes, cuentos, sketches, videoclips | "corto con un personaje", "stickman" |
| `juego` | Juegos jugables, simuladores, mecánicas | "minijuego", "juego de navegador" |
| `musica-audio` | Visualizadores, actuaciones, piezas guiadas por sonido | "visualizador de música", "audio-reactive" |
| `abstracto-generativo` | Arte generativo, fractales, partículas, shaders, loops | "fondo animado", "algo hipnótico", "screensaver" |
| `ui-web` | Microinteracciones, loaders, hero sections, webs animadas | "hero para mi landing", "loader", "transición entre pantallas" |
| `sistema-flujo` | Sistemas, flujos o plantillas de producción reutilizables | "un sistema para hacer muchos vídeos", "pipeline de motion" |

## estilo

De cero a dos; vacío cuando el prompt no marca uno. `minimal`, `cinematico`, `retro-pixel`, `dibujado` (a mano, crayón, papel, acuarela, collage), `neon-futurista`, `low-poly`, `realista`, `isometrico`, `cartoon`, `glitch`, `editorial` (revista, estilo suizo) y `corporativo`.

## tecnica

Une las etiquetas de la remake del repositorio de origen con lo que el prompt pide expresamente: `canvas`, `svg`, `threejs`, `shader`, `webgl`, `webgpu`, `gsap`, `css`, `audio`, `voz`, `particulas`, `fisica`, `pixel`, `p5`, `d3`, `lottie`, `react`, `imagen-ia`. Las etiquetas de la remake indican cómo se rehízo, no cómo lo pidió el autor, así que sirven como pista y no como requisito.

## salida

Qué produce el prompt, y por tanto qué hace falta para ejecutarlo.

- `html`: una página autocontenida que se abre en el navegador. Es la salida más fácil de probar.
- `remotion`, `hyperframes`, `manim`, `blender`: necesitan esa herramienta instalada.
- `video`: pide un archivo de vídeo renderizado por código, por ejemplo con ffmpeg o Playwright.
- `otro`: otra herramienta concreta, como un motor propio o Unity.
- `sin-especificar`: el prompt no lo dice; normalmente se resuelve como `html`.

## estado

- `completo`: se puede usar tal cual.
- `plantilla`: se puede usar, pero hay que rellenar huecos como marca, URL o datos.
- `parcial`: fragmento; la idea se entiende, pero falta parte del prompt.
- `solo-descripcion`: no es un prompt, sino el post que presume del resultado. Solo sirve como inspiración, y un prompt nuevo debe escribirse a partir de él.

## Otros campos

`idioma` es el del prompt (`en`, `zh`, `ja`, `es`…). `duracion_s` es la duración que fija el prompt, o `null`. `duplicado_de` marca un prompt idéntico a otro; el buscador y los índices lo omiten. `titulo` y `resumen` están escritos en castellano para buscar en castellano aunque el prompt esté en otro idioma.

## De la petición a los filtros

| Petición | Filtros de partida |
| --- | --- |
| "Una intro con mi logo para YouTube" | `--tema logo-marca --usable` |
| "Explicar cómo funciona un transformer en 30 s" | `--tema tecnologia-ia --formato explicativo --max-duracion 30` |
| "Un fondo animado para la web, sin librerías" | `--tema abstracto-generativo,ui-web --salida html --tecnica canvas,css,svg` |
| "Algo en 3D que impresione" | `--formato 3d --usable`, y pregunta por el tema si salen demasiados |
| "Un minijuego retro" | `--tema juego --estilo retro-pixel` |
| "Anuncio de mi SaaS, que pueda rellenar con mis datos" | `--tema producto-saas --estado plantilla` |
| "Intro de 10 s para mi canal de recetas, dibujada a mano" | Dos búsquedas que luego se combinan: `"receta\|recipe\|cocina\|food" --usable` para la idea, y `--estilo dibujado --usable` para el estilo |

`estilo` y `tecnica` son las facetas más escasas: solo cuatro de cada diez fichas marcan estilo. Si la persona pide un estilo concreto, consérvalo y relaja el tema. Si no lo pide, quítalo antes que nada. Cuando ningún prompt reúne todo lo pedido, buscar cada rasgo por separado y combinar fichas suele dar mejor resultado que encadenar filtros.

---
id: "xanares-738984"
titulo: "Demo de demoscene con fractal Mandelbox de 37 s"
resumen: "Plano único donde una esfera cromada gana niveles de Mandelbox al ritmo del tema, se convierte en paisaje y acaba en letras de oro, con raymarching en WebGL2."
formato: "3d"
tema: ["abstracto-generativo","musica-audio"]
estilo: ["cinematico","neon-futurista"]
tecnica: ["webgl","shader","audio"]
salida: "html"
estado: "plantilla"
idioma: "en"
duracion_s: 37
autor: "@Xanares"
autor_url: "https://x.com/Xanares"
post: "https://x.com/Xanares/status/2105770390924738984"
anadido: "2026-10-12"
---

# Demo de demoscene con fractal Mandelbox de 37 s

Plano único donde una esfera cromada gana niveles de Mandelbox al ritmo del tema, se convierte en paisaje y acaba en letras de oro, con raymarching en WebGL2.

Autoría: [@Xanares](https://x.com/Xanares) · [post original](https://x.com/Xanares/status/2105770390924738984)

## Prompt

```text
Make a 37-second demoscene tech demo for the track ~/Downloads/(filename).mp3.
The goal is graphics nobody has seen before. Like it's a statement for a new AI demoscene.

Story, in one continuous shot with no cuts:
- A chrome sphere floats in dark fog. On each hit in the track, it gains one Mandelbox fractal level.
- In the drop, the object grows until its top face is a landscape. Fly low over it at sunset, then dive off its edge.
- At the end, the fractal collapses into 3D gold letters of the title. Carve the letters from the same fractal and light them with the same light.

Look: path-traced quality. Soft shadows, ambient occlusion, glossy reflections, fog with light shafts, depth of field, motion blur, bloom.

Sync: analyse the track first. Save a JSON beat map with hits, breaks, and kick, snare and hat onsets. Kicks pulse the light. Hats add surface detail.

Tech:
- One WebGL2 fragment-shader raymarcher. One HTML page is both the live player and the render source.
- Live: 60 fps in Chrome.
- Offline: 1920x1080 at 60 fps with 16 samples per pixel. Render it in headless Chrome on the Mac GPU, pipe the PNG frames to ffmpeg, and use the MP3 as the audio.
- Do not use AI image or video generators.
- Check contact sheets of stills before the full render.
```

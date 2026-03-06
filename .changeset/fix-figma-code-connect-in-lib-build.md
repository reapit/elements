---
'@reapit/elements': patch
---

Fix: exclude `.figma.tsx` files from the Vite library build's icon entry point glob. The `src/icons/*.tsx` pattern previously matched Figma Code Connect files alongside regular icon components, causing `@figma/code-connect` and its transitive dependencies (including `undici`, `jsdom`, and other Node.js-oriented packages) to be bundled into the build output. This produced Vite warnings about externalised Node.js imports and added a ~741 kB shared chunk to the artefact. This is an internal build fix and does not affect the published package API.

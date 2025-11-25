# Instrucciones para crear el PDF de documentación

## Opción 1: Usar un conversor online

1. Abre el archivo `DOCUMENTACION_PROYECTO.md` con un editor de texto
2. Copia todo el contenido
3. Ve a uno de estos conversores online:
   - https://www.markdowntopdf.com/
   - https://md2pdf.netlify.app/
   - https://www.browserling.com/tools/markdown-to-pdf
4. Pega el contenido
5. Descarga el PDF generado

## Opción 2: Usar VS Code

1. Instala la extensión "Markdown PDF" en VS Code
2. Abre `DOCUMENTACION_PROYECTO.md`
3. Presiona Ctrl+Shift+P (o Cmd+Shift+P en Mac)
4. Escribe "Markdown PDF: Export (pdf)"
5. Presiona Enter
6. El PDF se generará automáticamente

## Opción 3: Usar Pandoc (más profesional)

1. Instala Pandoc: https://pandoc.org/installing.html
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta:
```bash
pandoc DOCUMENTACION_PROYECTO.md -o GOALDEMY_Documentacion.pdf --pdf-engine=xelatex
```

## Capturas de Pantalla

Para agregar capturas de pantalla al documento:

1. Crea una carpeta llamada `capturas` en la raíz del proyecto
2. Ejecuta la aplicación (backend y frontend)
3. Toma capturas de pantalla de:
   - Página de login
   - Página de registro
   - Home con lista de teams
   - Detalle de un team
   - Lista de jugadores
   - Detalle de un jugador
4. Guarda las imágenes en la carpeta `capturas` con estos nombres:
   - login.png
   - registro.png
   - teams.png
   - team-detail.png
   - players.png
   - player-detail.png
5. Las imágenes ya están referenciadas en el documento

## Recomendación Final

Para un PDF más profesional, puedes usar **Microsoft Word** o **Google Docs**:

1. Copia el contenido del archivo .md
2. Pega en Word/Docs
3. Aplica formato:
   - Títulos con estilos H1, H2, H3
   - Código con fuente monoespaciada
   - Tablas formateadas
   - Agrega las capturas de pantalla
4. Exporta a PDF

El archivo quedará mucho más profesional y listo para entregar.

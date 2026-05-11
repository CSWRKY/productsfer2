# Buscador de productos

Web estatica de consulta generada desde `PRECIOS LISTA 2.xlsx`.

## Publicar en GitHub Pages

1. Sube estos archivos al repositorio: `index.html`, `styles.css`, `app.js` y `productos.js`.
2. En GitHub, entra a **Settings > Pages**.
3. Selecciona la rama principal y la carpeta raiz del repositorio.
4. Guarda la configuracion y abre la URL que GitHub Pages genere.

No requiere servidor, base de datos ni instalacion de dependencias.

## Imagenes de productos

Coloca las fotos en la carpeta `imagenes` usando el codigo del producto como nombre.

Ejemplo:

- `imagenes/05001.jpg`
- `imagenes/01972.jpg`
- `imagenes/5002.jpg.webp`

Formatos aceptados: `.jpg.webp`, `.webp`, `.jpg`, `.jpeg` y `.png`.

La web busca primero el codigo completo y despues el codigo sin ceros iniciales. Por ejemplo, para el producto `05002`, tambien reconoce `5002.jpg.webp`.

Si una imagen no existe, la tarjeta muestra un espacio reservado con el codigo del producto.

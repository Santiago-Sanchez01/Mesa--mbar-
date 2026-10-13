# Gastro Editorial v1.0

Plantilla estática gastronómica con HTML, CSS y JavaScript vanilla. Etapas 1 a 3 implementadas; sistema de imágenes preparado en la etapa 4, sin fotografías incorporadas. Mesa Ámbar es un negocio ficticio; carta, precios, horarios y dirección son ilustrativos.

## Probar desde VS Code

1. Abrir esta carpeta con **Archivo → Abrir carpeta**.
2. Abrir `index.html` en un navegador desde el explorador de archivos. No hace falta instalar extensiones ni iniciar un servidor.
3. Comprobar las ocho partes: header, hero, historia, menú, galería, horarios y ubicación, contacto y footer.
4. Usar Tab y Enter para recorrer enlaces, incluidos «Saltar al contenido» y «Conocer el menú».
5. Abrir las herramientas de desarrollador del navegador y revisar la consola.
6. Editar un texto en `data/negocio.js`, guardar y recargar. Para probar respaldos, vaciar temporalmente historia, categorías del menú, horarios o dirección. Restaurar luego los datos.

## Arquitectura

- `index.html`: estructura y títulos de secciones; no contiene datos comerciales duplicados. Sus textos iniciales son respaldos genéricos.
- `data/negocio.js`: expone `window.NEGOCIO`, con identidad, SEO, historia, menú, horarios, dirección, imágenes y contactos.
- `app.js`: lee la configuración y crea contenido con métodos del DOM y `textContent`.
- `styles.css`: diseño editorial mobile-first, navegación adaptable, filtros, foco visible y marcos fotográficos estables.
- `assets/images/`: reservado para imágenes locales con licencia verificada. Su README registra los créditos.

Los scripts clásicos usan `defer` y se ejecutan en orden después de analizar el HTML: primero la configuración y luego el renderizado. No hay módulos, peticiones `fetch`, dependencias ni compilación. Todas las rutas de archivos son relativas, compatibles con apertura local y con un repositorio de GitHub Pages.

## Personalización

Editar los datos comerciales exclusivamente en `data/negocio.js`. Los precios son números (no cadenas), y cada categoría contiene un array `platos`. Los datos opcionales ausentes se ocultan o se reemplazan por mensajes explícitos. No se muestran precios inválidos ni categorías vacías.

Las imágenes requieren `src`, `alt`, `ancho` y `alto`; usar rutas como `assets/images/plato.webp`. La ruta válida no certifica la licencia: verificarla y documentarla antes de añadir el archivo. La imagen principal tiene carga prioritaria; la galería usa carga diferida. Un error de carga muestra un respaldo.

## Incorporar y reemplazar fotografías

Esta intervención no autoriza descargar o agregar fotografías. Los siguientes ejemplos son instrucciones para cuando se apruebe el material; los archivos citados todavía no existen.

1. Obtener autorización, comprobar las condiciones de uso y registrar la procedencia en `assets/images/README.md`. Incluir crédito público si la licencia lo exige.
2. Optimizar el archivo como WebP o AVIF. Como punto de partida, evaluar un hero de 1200–1600 px de ancho y una galería de 800–1200 px; ajustar según el tamaño de presentación y la densidad de pantalla. Comparar calidad y peso: no basta con cambiar la extensión.
3. Guardarlo en `assets/images/` con un nombre sencillo como `mesa-estacion.webp`. Respetar mayúsculas y minúsculas: GitHub Pages distingue ambas.
4. Medir el ancho y alto reales del archivo exportado y configurar el objeto. No usar las dimensiones del original si fue redimensionado.

Para el hero, reemplazar únicamente `imagenes.hero`:

```js
hero: {
  src: "assets/images/mesa-estacion.webp",
  alt: "Mesa servida con verduras asadas y pan de campo",
  ancho: 1200,
  alto: 1500,
  posicion: { x: 50, y: 45 }
}
```

Para la galería, agregar un objeto por archivo dentro de `imagenes.galeria`:

```js
galeria: [
  {
    src: "assets/images/plato-estacion.webp",
    alt: "Calabaza asada con semillas sobre un plato de cerámica",
    ancho: 1200,
    alto: 900
  }
]
```

Adaptar el texto alternativo a la fotografía real. Describir su contenido relevante, sin inventar detalles ni usar el nombre de archivo. Este sistema trata las fotografías como informativas y exige `alt` no vacío.

`posicion` es opcional: `x` e `y` son números entre 0 y 100 que ajustan `object-position`; por defecto se usa el centro. Los marcos usan `object-fit: cover`: llenan el espacio sin deformar la imagen, aunque recortan parte de ella. El hero tiene marco 4:5; la galería 4:3 y algunos marcos verticales 3:4 en escritorio. Las alturas mínimas pueden modificar la proporción efectiva, especialmente a 320 px. Revisar el encuadre en móvil y escritorio y ajustar el punto focal si el plato queda cortado.

Para reemplazar una fotografía, actualizar ruta, dimensiones, texto alternativo, punto focal y registro de procedencia. Para retirarla, usar `hero: null` o quitar su objeto de la galería. Una configuración sin dimensiones enteras positivas, sin texto alternativo o con ruta inválida se omite; si no quedan imágenes válidas aparece el respaldo de la sección. Un archivo inexistente muestra «Imagen no disponible» dentro de su marco.

## Verificar imágenes, rendimiento y accesibilidad

- Abrir `index.html`, recargar y recorrer la galería. Inspeccionar las imágenes: `width` y `height` deben coincidir con el archivo, y `alt` describirlo.
- El hero usa `loading="eager"`, `fetchpriority="high"` y `decoding="async"`; las secundarias usan `loading="lazy"` y `decoding="async"`. La carga diferida es una indicación al navegador: puede cargar imágenes cercanas antes de llegar a ellas.
- Revisar Red/Network para detectar archivos ausentes y medir peso y tiempo de carga. Con caché desactivada y conexión lenta, comprobar que los marcos reservan espacio y no hay saltos importantes. Las mediciones HTTP de rendimiento pueden requerir un servidor local disponible, pero la apertura directa sigue funcionando.
- Probar 320, 375, 768, 1024 y 1440 px y zoom al 200 %: encuadre, ausencia de deformaciones/desbordamiento, separación de filtros y botón móvil, foco visible y legibilidad.
- Comprobar el texto alternativo con lector de pantalla y la navegación por teclado. Revisar consola, filtros y Escape después de incorporar material.
- Probar temporalmente una ruta inexistente y volver a `hero: null` y `galeria: []` para revisar respaldos. Restaurar luego la configuración.

Las pruebas con fotografías reales, mediciones de carga y encuadres en navegador quedan pendientes hasta incorporar material autorizado. No hay generación automática de variantes `srcset` ni compresión: preparar los archivos antes de agregarlos.

La demo bloquea todos los enlaces de contacto. Para un cliente real, establecer `demo: false`, reemplazar todos los textos ficticios y configurar contactos propios verificados. WhatsApp debe contener únicamente dígitos con código de país, sin `+` ni espacios. La validación de formato no verifica la propiedad de un número o correo.

El título y la descripción SEO se actualizan desde la configuración mediante JavaScript. Antes de publicar un sitio real, actualizar también el título y la descripción iniciales del HTML para rastreadores que no ejecutan JavaScript. Son la única copia estática necesaria para ese caso.

## Alcance y pendientes

Menú con filtros y navegación móvil accesible con mejora progresiva; diseño editorial implementado. Sistema de fotografías preparado, con dimensiones obligatorias, carga prioritaria/diferida y respaldos. Pendientes: material autorizado, verificación visual con fotografías y revisión final de etapa 5. Sin formulario, backend, carrito ni pagos.

Esta entrega no incluye commits, push ni despliegue. Sin JavaScript se conserva la estructura y se informa que debe activarse para consultar el contenido.

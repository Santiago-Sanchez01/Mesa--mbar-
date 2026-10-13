# Gastro Editorial v1.0

Plantilla estática gastronómica con HTML, CSS y JavaScript vanilla. Cinco fotografías locales integradas en la etapa 4. Licencias del risotto y pan confirmadas manualmente por el usuario el 13/10/2026; procedencia de las restantes conservada. Mesa Ámbar es un negocio ficticio.

## Probar desde VS Code

1. Abrir esta carpeta con **Archivo → Abrir carpeta**.
2. Abrir `index.html` en un navegador desde el explorador de archivos. No hace falta instalar extensiones ni iniciar un servidor.
3. Comprobar las ocho partes: header, hero, historia, menú, galería, horarios y ubicación, contacto y footer.
4. Usar Tab y Enter para recorrer enlaces, incluidos «Saltar al contenido» y «Conocer el menú».
5. Abrir las herramientas de desarrollador del navegador y revisar la consola.
6. Editar un texto en `data/negocio.js`, guardar y recargar. Para probar respaldos, vaciar temporalmente historia, categorías del menú, horarios o dirección. Restaurar luego los datos.

## Arquitectura

Tecnologías: HTML5 semántico, CSS3 (variables, Flexbox y Grid) y JavaScript vanilla con scripts clásicos. Sin dependencias, backend ni paso de compilación.

```text
gastro-editorial/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── negocio.js
├── assets/
│   └── images/
│       ├── README.md
│       └── *.webp
├── README.md
└── .gitignore
```

- `index.html`: estructura y títulos de secciones; no contiene datos comerciales duplicados. Sus textos iniciales son respaldos genéricos.
- `data/negocio.js`: expone `window.NEGOCIO`, con identidad, SEO, historia, menú, horarios, dirección, imágenes y contactos.
- `app.js`: lee la configuración y crea contenido con métodos del DOM y `textContent`.
- `styles.css`: diseño editorial mobile-first, navegación adaptable, filtros, foco visible y marcos fotográficos estables.
- `assets/images/`: reservado para imágenes locales con licencia verificada. Su README registra los créditos.

Los scripts clásicos usan `defer` y se ejecutan en orden después de analizar el HTML: primero la configuración y luego el renderizado. No hay módulos, peticiones `fetch`, dependencias ni compilación. Todas las rutas de archivos son relativas, compatibles con apertura local y con un repositorio de GitHub Pages.

## Personalización

Editar los datos comerciales exclusivamente en `data/negocio.js`. Los precios son números (no cadenas), y cada categoría contiene un array `platos`. Los datos opcionales ausentes se ocultan o se reemplazan por mensajes explícitos. No se muestran precios inválidos ni categorías vacías.

| Información | Propiedad |
| --- | --- |
| Nombre, eslogan, descripción | `nombre`, `eslogan`, `descripcion` |
| Historia | `historia` (array de párrafos) |
| Carta, precios, moneda y aclaración | `menu.categorias`, `menu.moneda`, `menu.locale`, `menu.nota` |
| Horarios y dirección | `horarios`, `direccion.texto` |
| Fotografías | `imagenes.hero`, `imagenes.galeria` |
| Contactos y mensaje de WhatsApp | `contactos` |
| SEO | `seo.titulo`, `seo.descripcion` |
| Aviso de demo y pie | `demo`, `avisoDemo`, `pie` |

Los títulos de sección, botones y mensajes de respaldo son textos genéricos de interfaz en HTML/JavaScript, no datos comerciales. Si un cliente requiere otras etiquetas o idioma, deben editarse allí. El título y la descripción iniciales del HTML son una copia estática de SEO: sincronizarlos con `seo` antes de entregar; el sitio no genera esa copia automáticamente.

Las imágenes requieren `src`, `alt`, `ancho` y `alto`; usar rutas como `assets/images/plato.webp`. La ruta válida no certifica la licencia: verificarla y documentarla antes de añadir el archivo. La imagen principal tiene carga prioritaria; la galería usa carga diferida. Un error de carga muestra un respaldo.

## Incorporar y reemplazar fotografías

El usuario autorizó integrar los cinco archivos locales seleccionados; no se descargaron fotografías adicionales. Los ejemplos siguientes son orientativos: sus nombres de archivo no corresponden a los archivos actuales.

Configuración activa: hero-ambiente.webp en el hero; plato-editorial.webp (risotto), pan-artesanal.webp, limonada.webp y peras.webp en la galería. Los cinco archivos existen y se abrieron correctamente. Procedencia, dimensiones, pesos y método de verificación de licencias en assets/images/README.md.

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

Los archivos y sus dimensiones se comprobaron localmente; las mediciones de carga y los encuadres responsive en navegador quedan pendientes de validación manual. Las imágenes verticales de 687 px de ancho pueden perder nitidez en pantallas de alta densidad: revisar antes de solicitar variantes mayores. No hay generación automática de variantes `srcset` ni compresión: preparar los archivos antes de agregarlos.

La demo bloquea todos los enlaces de contacto. Para un cliente real, establecer `demo: false`, reemplazar todos los textos ficticios y configurar contactos propios verificados. WhatsApp debe contener únicamente dígitos con código de país, sin `+` ni espacios. La validación de formato no verifica la propiedad de un número o correo.

El título y la descripción SEO se actualizan desde la configuración mediante JavaScript. Antes de publicar un sitio real, actualizar también el título y la descripción iniciales del HTML para rastreadores que no ejecutan JavaScript. Son la única copia estática necesaria para ese caso.

## Alcance y pendientes

Etapa 4 aprobada por el usuario. Etapa 5, parte 1: auditoría de código y documentación realizada. Pendientes: pruebas en navegador real enumeradas abajo y aprobación antes de continuar con la parte 2. No se certifica todavía una entrega comercial final.

## Modo demo

`demo: true` muestra el aviso de negocio ficticio y bloquea los enlaces de contacto aunque se completen sus valores. Si la configuración no está disponible, se mantiene el comportamiento de demo por defecto. Para un cliente real, reemplazar nombre, contenido, precios, dirección, fotografías, SEO y pie; comprobar que los canales pertenecen al cliente y recién entonces usar `demo: false`. Quitar el aviso no convierte los datos ficticios en datos reales.

## Recorrido de pruebas manuales

1. Probar 320, 375, 768, 1024 y 1440 px. Revisar header, hero, filtros, precios, galería, horarios y footer. En consola, `document.documentElement.scrollWidth <= document.documentElement.clientWidth` debe devolver `true`. Revisar además que no haya texto recortado.
2. Usar zoom del navegador al 200 % sin reducirlo para compensar. Comprobar reflujo, lectura, encuadres y controles. El ancho efectivo puede activar la navegación móvil.
3. Con Tab, comprobar el enlace para saltar al contenido y el foco visible. En móvil abrir con Enter y Espacio, recorrer enlaces y cerrar con Escape incluso tras salir del header: el foco debe volver al botón. Seleccionar un enlace debe cerrar el menú y enfocar la sección. En escritorio la navegación debe permanecer visible.
4. Recorrer los filtros con Tab y activarlos con Enter/Espacio: una sola opción tiene `aria-pressed="true"`; «Todos» restaura las categorías. Con lector de pantalla, comprobar etiquetas y anuncio del cambio.
5. Deshabilitar JavaScript y recargar: navegación visible, botón móvil y filtros ocultos, mensaje explicativo disponible. No se promete carta comercial completa sin JavaScript.
6. Activar movimiento reducido en el sistema o la emulación del navegador: el desplazamiento debe ser inmediato. No hay animaciones adicionales ni header sticky que tape títulos.
7. En una copia temporal de los datos, probar categorías vacías, platos sin precio, historia/horarios ausentes, imágenes inválidas y contactos vacíos. Restaurar los datos al finalizar. No deben aparecer `undefined` ni controles inoperantes.
8. Recargar con caché desactivada y conexión lenta: verificar las cinco imágenes, consola sin errores, espacio reservado y ausencia de saltos importantes. Revisar el contenido de los textos alternativos con lector de pantalla.

Estas pruebas requieren navegador real. La revisión estática y el DOM simulado no verifican layout, orden efectivo de Tab, anuncios del lector de pantalla ni métricas de rendimiento.

## Preparación para GitHub Pages (sin publicación realizada)

- Mantener `index.html` en la raíz junto con CSS, scripts, `data/` y `assets/`. Conservar nombres y mayúsculas de los archivos.
- El sitio funciona sin compilación, módulos ni `fetch`. Las rutas no comienzan con `/`, por lo que pueden resolverse bajo el subdirectorio del repositorio.
- Antes de publicar, aprobar las pruebas manuales, sincronizar metadatos estáticos y configuración, revisar licencias y decidir si se publica la demo identificada o una personalización real.
- Cuando exista autorización de publicación, preparar el repositorio con estos archivos y seleccionar su raíz como origen del sitio estático. La creación de repositorio, commits, push y activación de Pages son acciones posteriores, no ejecutadas en esta entrega.
- La URL definitiva aún no existe: no se añadieron enlaces canónicos, sitemap con dominio inventado ni datos estructurados de un restaurante real. Evaluarlos cuando se conozca el destino y la identidad final.
- Tras publicar con autorización, repetir enlaces, carga de archivos y consola en la URL alojada, incluyendo el subdirectorio de Pages.

## Resultado de auditoría — 13/10/2026

Se corrigió Escape fuera del header y se sincronizaron los metadatos iniciales con la demo. Jerarquía: un `h1`, secciones `h2`, categorías y bloques de ubicación `h3`, platos `h4`. Se conservaron rutas relativas, `hidden` para controles cerrados, estados ARIA, carga prioritaria/diferida y registro de licencias. El contraste de las combinaciones de texto principales se comprueba por cálculo; los bordes oliva son decorativos y no constituyen el único indicador de estado.

Esta entrega no incluye commits, push ni despliegue. Sin JavaScript se conserva la estructura y se informa que debe activarse para consultar el contenido.

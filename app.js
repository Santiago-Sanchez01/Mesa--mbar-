/* Renderizado seguro de texto: no insertamos contenido comercial mediante innerHTML. */
(() => {
  "use strict";
  const negocio = window.NEGOCIO || {};
  const texto = (valor, respaldo = "") => typeof valor === "string" && valor.trim() ? valor.trim() : respaldo;
  const lista = valor => Array.isArray(valor) ? valor : [];
  const crear = (etiqueta, contenido, clase) => {
    const elemento = document.createElement(etiqueta);
    elemento.textContent = contenido;
    if (clase) elemento.className = clase;
    return elemento;
  };
  const completar = (id, elementos, respaldo) => {
    document.getElementById(id).replaceChildren(...(elementos.length ? elementos : [crear("p", respaldo)]));
  };

  document.querySelectorAll("[data-field]").forEach(elemento => {
    const campo = elemento.dataset.field;
    const contenido = texto(negocio[campo], campo === "nombre" ? "Demo gastronómica" : "");
    elemento.textContent = contenido;
    elemento.hidden = !contenido;
  });
  // Solo una configuración explícitamente marcada como real habilita contactos.
  const esDemo = negocio.demo !== false;
  const aviso = document.getElementById("demo-notice");
  aviso.hidden = !esDemo;
  aviso.textContent = texto(negocio.avisoDemo, "Demostración: negocio y datos ficticios.");
  document.title = texto(negocio.seo?.titulo, texto(negocio.nombre, "Demo gastronómica"));
  const descripcionSEO = texto(negocio.seo?.descripcion, texto(negocio.descripcion));
  if (descripcionSEO) document.querySelector('meta[name="description"]').content = descripcionSEO;
  document.getElementById("footer-copy").textContent = texto(negocio.pie, "Información del negocio.");

  completar("history-content", lista(negocio.historia).map(parrafo => texto(parrafo)).filter(Boolean).map(parrafo => crear("p", parrafo)), "La historia estará disponible próximamente.");

  const menu = negocio.menu || {};
  let formato;
  try { 
    formato = new Intl.NumberFormat(texto(menu.locale, "es-AR"), { style: "currency", currency: texto(menu.moneda, "ARS") });
  } catch {
    formato = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });
  }
  document.getElementById("menu-note").textContent = texto(menu.nota, esDemo ? "Carta de demostración." : "Consultá disponibilidad y precios.");
  const categorias = lista(menu.categorias).filter(Boolean).map(categoria => {
    const platos = lista(categoria.platos).filter(plato => plato && texto(plato.nombre));
    if (!platos.length) return null;
    const bloque = crear("div", "", "menu-category");
    bloque.append(crear("h3", texto(categoria.nombre, "Platos")));
    const items = crear("ul", "", "menu-list");
    platos.forEach(plato => {
      const item = crear("li", "", "menu-item");
      item.append(crear("h4", texto(plato.nombre)));
      if (texto(plato.descripcion)) item.append(crear("p", texto(plato.descripcion)));
      const precioValido = typeof plato.precio === "number" && Number.isFinite(plato.precio) && plato.precio >= 0;
      item.append(crear("p", precioValido ? formato.format(plato.precio) : "Precio a consultar"));
      items.append(item);
    });
    bloque.append(items);
    return bloque;
  }).filter(Boolean);
  completar("menu-content", categorias, "El menú estará disponible próximamente.");

  // Los controles se crean a partir de categorías ya validadas, sin duplicar platos.
  const filtros = document.getElementById("menu-filters");
  const estadoMenu = document.getElementById("menu-status");
  if (categorias.length) {
    const opciones = ["Todos", ...categorias.map(bloque => bloque.querySelector("h3").textContent)];
    const botones = opciones.map((nombre, indice) => {
      const boton = crear("button", nombre);
      boton.type = "button";
      boton.setAttribute("aria-pressed", String(indice === 0));
      boton.setAttribute("aria-controls", "menu-content");
      boton.addEventListener("click", () => {
        botones.forEach((otro, posicion) => otro.setAttribute("aria-pressed", String(posicion === indice)));
        categorias.forEach((bloque, posicion) => { bloque.hidden = indice !== 0 && posicion !== indice - 1; });
        document.getElementById("menu-content").classList.toggle("is-filtered", indice !== 0);
        estadoMenu.textContent = indice === 0 ? "Se muestran todas las categorías." : `Se muestra la categoría ${nombre}.`;
      });
      return boton;
    });
    filtros.replaceChildren(...botones);
    filtros.hidden = false;
  }

  const imagen = (datos, principal = false) => {
    // Texto alternativo y dimensiones intrínsecas obligatorias; solo archivos locales.
    if (!datos || !/^assets\/images\/[a-zA-Z0-9_/-]+\.(webp|avif|png|jpe?g)$/i.test(texto(datos.src)) || !texto(datos.alt)
      || !Number.isInteger(datos.ancho) || datos.ancho <= 0
      || !Number.isInteger(datos.alto) || datos.alto <= 0) return null;
    const figura = crear("figure", "");
    const foto = document.createElement("img");
    foto.alt = texto(datos.alt);
    foto.loading = principal ? "eager" : "lazy";
    foto.decoding = "async";
    if (principal) foto.setAttribute("fetchpriority", "high");
    foto.width = datos.ancho;
    foto.height = datos.alto;
    // Punto focal opcional en porcentajes: se usa el centro si no es válido.
    const posicion = datos.posicion;
    if (posicion && Number.isFinite(posicion.x) && posicion.x >= 0 && posicion.x <= 100
      && Number.isFinite(posicion.y) && posicion.y >= 0 && posicion.y <= 100) {
      foto.style.objectPosition = `${posicion.x}% ${posicion.y}%`;
    }
    foto.addEventListener("error", () => figura.replaceChildren(crear("p", "Imagen no disponible.")), { once: true });
    foto.src = datos.src;
    figura.append(foto);
    return figura;
  };
  const hero = imagen(negocio.imagenes?.hero, true);
  completar("hero-image", hero ? [hero] : [], "Imagen principal pendiente de incorporación con licencia verificada.");
  completar("gallery-content", lista(negocio.imagenes?.galeria).map(datos => imagen(datos)).filter(Boolean), "Fotografías pendientes de incorporación con licencia verificada.");

  const horarios = lista(negocio.horarios).filter(horario => horario && texto(horario.dias) && texto(horario.horas));
  const listadoHorarios = crear("dl", "");
  horarios.forEach(horario => listadoHorarios.append(crear("dt", texto(horario.dias)), crear("dd", texto(horario.horas))));
  completar("hours-content", horarios.length ? [listadoHorarios] : [], "Horarios por confirmar.");
  document.getElementById("address-content").textContent = texto(negocio.direccion?.texto, "Ubicación por confirmar.");

  const contactos = negocio.contactos || {};
  const enlaces = [];
  const agregarContacto = (etiqueta, destino) => {
    const parrafo = crear("p", "");
    const enlace = crear("a", etiqueta);
    enlace.href = destino;
    parrafo.append(enlace);
    enlaces.push(parrafo);
  };
  if (!esDemo) {
    const email = texto(contactos.email);
    const telefono = texto(contactos.telefono);
    const whatsapp = texto(contactos.whatsapp);
    if (/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)) agregarContacto(`Escribinos a ${email}`, `mailto:${email}`);
    if (/^\+?[0-9 ()-]{7,25}$/.test(telefono) && telefono.replace(/\D/g, "").length >= 7) agregarContacto(`Llamanos: ${telefono}`, `tel:${telefono.replace(/[^+\d]/g, "")}`);
    if (/^[1-9]\d{6,14}$/.test(whatsapp)) agregarContacto("Consultar por WhatsApp", `https://wa.me/${whatsapp}?text=${encodeURIComponent(texto(contactos.mensajeWhatsApp))}`);
  }
  completar("contact-content", enlaces, esDemo ? "Demo: contacto y WhatsApp sin habilitar. No se reciben reservas ni consultas." : "Canales de contacto pendientes de configuración.");

  // Mejora progresiva: solo se oculta la navegación después de registrar sus eventos.
  const cabecera = document.querySelector(".site-header");
  const botonNavegacion = document.getElementById("navigation-toggle");
  const navegacion = document.getElementById("primary-navigation");
  const escritorio = window.matchMedia("(min-width: 64rem)");
  let abierto = false;
  const actualizarNavegacion = () => {
    botonNavegacion.hidden = escritorio.matches;
    navegacion.hidden = !escritorio.matches && !abierto;
    botonNavegacion.setAttribute("aria-expanded", String(!escritorio.matches && abierto));
    botonNavegacion.querySelector(".navigation-label").textContent = abierto ? "Cerrar menú" : "Abrir menú";
  };
  botonNavegacion.addEventListener("click", () => {
    abierto = !abierto;
    actualizarNavegacion();
  });
  document.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && abierto && !escritorio.matches) {
      abierto = false;
      actualizarNavegacion();
      botonNavegacion.focus();
    }
  });
  escritorio.addEventListener("change", () => {
    const focoEnNavegacion = navegacion.contains(document.activeElement);
    const focoEnBoton = document.activeElement === botonNavegacion;
    abierto = false;
    actualizarNavegacion();
    if (!escritorio.matches && focoEnNavegacion) botonNavegacion.focus();
    if (escritorio.matches && focoEnBoton) navegacion.querySelector("a").focus();
  });
  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener("click", evento => {
      // Conservar el comportamiento nativo de clics modificados.
      if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey || evento.button > 0) return;
      const destino = document.getElementById(enlace.getAttribute("href").slice(1));
      if (!destino) return;
      if (navegacion.contains(enlace)) {
        abierto = false;
        actualizarNavegacion();
      }
      // El enlace conserva el hash y el scroll nativos; el foco pasa al contenido.
      destino.setAttribute("tabindex", "-1");
      destino.focus({ preventScroll: true });
    });
  });
  cabecera.classList.add("navigation-ready");
  actualizarNavegacion();
})();

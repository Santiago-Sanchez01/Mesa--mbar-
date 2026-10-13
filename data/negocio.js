/* Configuración comercial. Script clásico: no requiere módulos ni servidor. */
window.NEGOCIO = {
  demo: true,
  avisoDemo: "Demostración: Mesa Ámbar es un restaurante ficticio. Carta, precios, horarios y dirección son ilustrativos.",
  nombre: "Mesa Ámbar",
  eslogan: "La estación marca el ritmo. La mesa reúne.",
  descripcion: "Una propuesta ficticia de cocina de estación, platos para compartir y sobremesas sin apuro.",
  seo: {
    titulo: "Mesa Ámbar | Cocina de estación · Demo",
    descripcion: "Conocé Mesa Ámbar, un restaurante ficticio de cocina de estación. Plantilla gastronómica de demostración."
  },
  historia: [
    "En esta historia de demostración, Mesa Ámbar nace de una idea sencilla: cocinar con lo que ofrece cada estación y darle tiempo al encuentro.",
    "Nuestra carta ficticia combina verduras, panes y preparaciones caseras en una mesa pensada para compartir."
  ],
  menu: {
    moneda: "ARS",
    locale: "es-AR",
    nota: "Carta y precios ficticios, expresados en pesos argentinos. No se realizan pedidos ni pagos online.",
    categorias: [
      { nombre: "Para comenzar", platos: [
        { nombre: "Pan de campo y manteca de hierbas", descripcion: "Pan tibio, manteca batida y hierbas de estación.", precio: 4500 },
        { nombre: "Verduras asadas", descripcion: "Vegetales de estación con crema de garbanzos.", precio: 7200 }
      ] },
      { nombre: "Platos de estación", platos: [
        { nombre: "Risotto de calabaza", descripcion: "Arroz cremoso, calabaza asada y semillas tostadas.", precio: 12500 },
        { nombre: "Pesca con papas al horno", descripcion: "Pesca del día, papas y salsa de limón.", precio: 15800 }
      ] },
      { nombre: "Algo dulce y bebidas", platos: [
        { nombre: "Peras al horno", descripcion: "Peras especiadas con crema de vainilla.", precio: 5800 },
        { nombre: "Limonada de la casa", descripcion: "Limón, agua y hierbas frescas.", precio: 3200 }
      ] }
    ]
  },
  horarios: [
    { dias: "Martes a viernes", horas: "12:00 a 15:00 y 19:30 a 23:00" },
    { dias: "Sábados y domingos", horas: "12:00 a 23:00" },
    { dias: "Lunes", horas: "Cerrado" }
  ],
  direccion: {
    texto: "Pasaje de la Cosecha 123, Ciudad de Ejemplo. Dirección ficticia; no corresponde a un local visitable."
  },
  // Incorporar solo archivos locales con licencia verificada. Ejemplo de estructura:
  // { src: "assets/images/archivo.webp", alt: "Descripción de la imagen", ancho: 1200, alto: 800 }
  imagenes: { hero: null, galeria: [] },
  // La demo bloquea enlaces de contacto. Al personalizar, usar datos reales y demo: false.
  contactos: { email: "", telefono: "", whatsapp: "", mensajeWhatsApp: "Hola, quisiera consultar por una reserva." },
  pie: "Gastro Editorial v1.0 · Negocio ficticio de demostración."
};

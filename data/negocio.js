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
  // Procedencia y confirmaciones de licencia registradas en assets/images/README.md.
  imagenes: {
    hero: {
      src: "assets/images/hero-ambiente.webp",
      alt: "Mesa de restaurante con platos y copas iluminados por el sol, con comensales al fondo",
      ancho: 687,
      alto: 1031,
      posicion: { x: 50, y: 55 }
    },
    galeria: [
      {
        src: "assets/images/plato-editorial.webp",
        alt: "Risotto de color anaranjado con pequeñas hojas verdes en un plato blanco sobre una mesa de madera",
        ancho: 693,
        alto: 1023,
        posicion: { x: 50, y: 55 }
      },
      {
        src: "assets/images/pan-artesanal.webp",
        alt: "Panes redondos de corteza dorada y enharinada sobre tela de yute",
        ancho: 700,
        alto: 1050,
        posicion: { x: 50, y: 45 }
      },
      {
        src: "assets/images/limonada.webp",
        alt: "Jarra y dos copas con bebida de limón, junto a mitades de limón y ramas sobre una tela rosada",
        ancho: 834,
        alto: 581,
        posicion: { x: 50, y: 50 }
      },
      {
        src: "assets/images/peras.webp",
        alt: "Peras enteras amarillas y moteadas en una bandeja de cartón sobre una mesa de madera",
        ancho: 687,
        alto: 1031,
        posicion: { x: 50, y: 70 }
      }
    ]
  },
  // La demo bloquea enlaces de contacto. Al personalizar, usar datos reales y demo: false.
  contactos: { email: "", telefono: "", whatsapp: "", mensajeWhatsApp: "Hola, quisiera consultar por una reserva." },
  pie: "Gastro Editorial v1.0 · Negocio ficticio de demostración."
};

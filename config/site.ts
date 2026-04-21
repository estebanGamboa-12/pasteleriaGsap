export const SITE = {
  name: "Maison Dulce",
  tagline: "Pastelería artesanal parisina",
  description:
    "Tortas, macarons y bocados finos, horneados a mano con ingredientes de estación. Pedidos por WhatsApp.",
  whatsappPhone: "+54 9 11 0000-0000",
  email: "hola@maisondulce.ar",
  address: "Av. Libertador 2450, Palermo, Buenos Aires",
  hours: [
    { day: "Martes a viernes", value: "09:00 – 20:00" },
    { day: "Sábados", value: "10:00 – 21:00" },
    { day: "Domingos", value: "10:00 – 18:00" },
    { day: "Lunes", value: "Cerrado" },
  ],
  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
  },
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
} as const;

export type SiteConfig = typeof SITE;

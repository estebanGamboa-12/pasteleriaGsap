export const SITE = {
  name: "Tu Pastelería",
  shortName: "Tu Pastelería",
  tagline: "Pastelería artesanal de tu ciudad",
  description:
    "Tartas, macarons y bocados finos, horneados a mano con ingredientes de temporada. Pedidos directos por WhatsApp.",
  // Demo: el cliente reemplaza estos valores al contratar.
  whatsappPhone: "+34 600 000 000",
  email: "hola@tupasteleria.com",
  address: "Tu calle 123, tu ciudad",
  city: "tu ciudad",
  neighborhood: "el centro",
  country: "España",
  foundedYear: 1999,
  founder: "tu maestra pastelera",
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
  // Locale & moneda — cámbialo si tu cliente factura en otra divisa.
  locale: "es-ES",
  currency: "EUR",
  // Dominio / URL canónica del demo. Cuando se despliegue un subdominio
  // por cliente, este valor se sobrescribe vía variable de entorno.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tupasteleria.demo",
} as const;

export type SiteConfig = typeof SITE;

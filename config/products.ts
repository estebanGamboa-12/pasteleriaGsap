export type ProductCategory =
  | "tortas"
  | "macarons"
  | "tartas"
  | "bocados"
  | "panaderia";

export type ProductSize = {
  id: string;
  label: string;
  serves: string;
  priceDelta: number;
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  basePrice: number;
  heroImage: string;
  gallery: string[];
  description: string;
  ingredients: string[];
  flavors: string[];
  sizes: ProductSize[];
  featured?: boolean;
  signature?: boolean;
};

const UNSPLASH = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "tortas", label: "Tartas" },
  { id: "macarons", label: "Macarons" },
  { id: "tartas", label: "Pasteles" },
  { id: "bocados", label: "Bocados" },
  { id: "panaderia", label: "Panadería" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "tarta-fresas-rose",
    name: "Fresas Rosé",
    subtitle: "Tarta insignia de fresas frescas",
    category: "tortas",
    basePrice: 35,
    heroImage: UNSPLASH("photo-1578985545062-69928b1d9587"),
    gallery: [
      UNSPLASH("photo-1578985545062-69928b1d9587"),
      UNSPLASH("photo-1551404973-761c83cd8339"),
      UNSPLASH("photo-1565958011703-44f9829ba187"),
    ],
    description:
      "Bizcocho génoise de vainilla Bourbon, nata chantilly montada a mano y fresas frescas de temporada. Un clásico artesanal reinterpretado.",
    ingredients: ["Génoise vainilla", "Chantilly", "Fresas", "Confitura rosé"],
    flavors: ["Vainilla & Fresa", "Vainilla & Frambuesa", "Vainilla & Melocotón"],
    sizes: [
      { id: "sm", label: "Pequeña", serves: "6 a 8 raciones", priceDelta: 0 },
      { id: "md", label: "Mediana", serves: "10 a 12 raciones", priceDelta: 12 },
      { id: "lg", label: "Grande", serves: "16 a 20 raciones", priceDelta: 26 },
    ],
    featured: true,
    signature: true,
  },
  {
    slug: "opera-dorada",
    name: "Ópera Dorada",
    subtitle: "Almendras, café y chocolate",
    category: "tortas",
    basePrice: 40,
    heroImage: UNSPLASH("photo-1551024506-0bccd828d307"),
    gallery: [
      UNSPLASH("photo-1551024506-0bccd828d307"),
      UNSPLASH("photo-1565808229224-264b6cafe06c"),
      UNSPLASH("photo-1519915028121-7d3463d20b13"),
    ],
    description:
      "Joconde de almendras, ganache de chocolate semiamargo y crema al café. Terminada con pan de oro comestible.",
    ingredients: ["Joconde almendras", "Ganache 70%", "Crema café", "Pan de oro"],
    flavors: ["Café clásico", "Avellana", "Pistacho"],
    sizes: [
      { id: "sm", label: "Individual", serves: "1 ración", priceDelta: -32 },
      { id: "md", label: "Mediana", serves: "8 a 10 raciones", priceDelta: 0 },
      { id: "lg", label: "Grande", serves: "14 a 16 raciones", priceDelta: 18 },
    ],
    featured: true,
    signature: true,
  },
  {
    slug: "mille-feuille",
    name: "Mille-Feuille",
    subtitle: "Hojaldre caramelizado y crema diplomática",
    category: "tortas",
    basePrice: 28,
    heroImage: UNSPLASH("photo-1486427944299-d1955d23e34d"),
    gallery: [
      UNSPLASH("photo-1486427944299-d1955d23e34d"),
      UNSPLASH("photo-1563805042-7684c019e1cb"),
    ],
    description:
      "Tres capas de hojaldre invertido caramelizado con crema diplomática de vainilla de Madagascar.",
    ingredients: ["Hojaldre invertido", "Crema diplomática", "Vainilla Madagascar"],
    flavors: ["Vainilla", "Chocolate", "Frambuesa"],
    sizes: [
      { id: "ind", label: "Individual", serves: "1 ración", priceDelta: -22 },
      { id: "fam", label: "Familiar", serves: "6 a 8 raciones", priceDelta: 0 },
    ],
    signature: true,
  },
  {
    slug: "macarons-caja-12",
    name: "Caja de 12 Macarons",
    subtitle: "Surtido degustación",
    category: "macarons",
    basePrice: 22,
    heroImage: UNSPLASH("photo-1558326567-98ae2405596b"),
    gallery: [
      UNSPLASH("photo-1558326567-98ae2405596b"),
      UNSPLASH("photo-1569864358642-9d1684040f43"),
    ],
    description:
      "Doce macarons artesanales en caja de regalo. Elige la selección de sabores al hacer el pedido.",
    ingredients: ["Almendra", "Azúcar glas", "Claras", "Rellenos de temporada"],
    flavors: ["Surtido clásico", "Surtido frutal", "Surtido chocolate"],
    sizes: [
      { id: "6", label: "Caja x 6", serves: "6 unidades", priceDelta: -10 },
      { id: "12", label: "Caja x 12", serves: "12 unidades", priceDelta: 0 },
      { id: "24", label: "Caja x 24", serves: "24 unidades", priceDelta: 18 },
    ],
    featured: true,
  },
  {
    slug: "tarta-limon-merengue",
    name: "Tarta Limón Merengue",
    subtitle: "Curd de limón y merengue italiano",
    category: "tartas",
    basePrice: 24,
    heroImage: UNSPLASH("photo-1464195244916-405fa0a82545"),
    gallery: [
      UNSPLASH("photo-1464195244916-405fa0a82545"),
      UNSPLASH("photo-1519915028121-7d3463d20b13"),
    ],
    description:
      "Masa sablée de almendras, curd intenso de limón y merengue italiano tostado a la llama.",
    ingredients: ["Sablée almendras", "Curd limón", "Merengue italiano"],
    flavors: ["Limón clásico", "Lima & albahaca"],
    sizes: [
      { id: "ind", label: "Individual", serves: "1 ración", priceDelta: -18 },
      { id: "fam", label: "Familiar", serves: "8 raciones", priceDelta: 0 },
    ],
  },
  {
    slug: "tarta-chocolate-avellana",
    name: "Chocolate Noisette",
    subtitle: "Chocolate belga y avellanas piamontesas",
    category: "tartas",
    basePrice: 28,
    heroImage: UNSPLASH("photo-1606313564200-e75d5e30476c"),
    gallery: [
      UNSPLASH("photo-1606313564200-e75d5e30476c"),
      UNSPLASH("photo-1600326145368-51844b0ebd9b"),
    ],
    description:
      "Ganache de chocolate belga 66% sobre base crujiente de avellanas caramelizadas y cacao puro.",
    ingredients: ["Chocolate 66%", "Avellanas Piamonte", "Praliné"],
    flavors: ["Amargo intenso", "Avellana caramelo"],
    sizes: [
      { id: "fam", label: "Familiar", serves: "8 a 10 raciones", priceDelta: 0 },
      { id: "xl", label: "Grande", serves: "14 raciones", priceDelta: 14 },
    ],
  },
  {
    slug: "canele-bordelais",
    name: "Canelé Bordelais",
    subtitle: "Corazón tierno, caramelo crujiente",
    category: "bocados",
    basePrice: 3,
    heroImage: UNSPLASH("photo-1568051243858-533a607809a5"),
    gallery: [UNSPLASH("photo-1568051243858-533a607809a5")],
    description:
      "Clásico de Burdeos con masa líquida de vainilla y ron, caramelizada en moldes de cobre.",
    ingredients: ["Vainilla", "Ron", "Mantequilla", "Azúcar moreno"],
    flavors: ["Clásico"],
    sizes: [
      { id: "4", label: "x 4", serves: "4 unidades", priceDelta: 0 },
      { id: "8", label: "x 8", serves: "8 unidades", priceDelta: 8 },
    ],
  },
  {
    slug: "eclair-vainilla",
    name: "Éclair Vainilla",
    subtitle: "Pâte à choux y crema de vainilla",
    category: "bocados",
    basePrice: 4,
    heroImage: UNSPLASH("photo-1488477181946-6428a0291777"),
    gallery: [UNSPLASH("photo-1488477181946-6428a0291777")],
    description:
      "Éclair crujiente con crema pastelera de vainilla y fondant brillante. Se hornea dos veces al día.",
    ingredients: ["Pâte à choux", "Crema pastelera", "Fondant"],
    flavors: ["Vainilla", "Chocolate", "Café", "Frambuesa"],
    sizes: [
      { id: "1", label: "Individual", serves: "1 unidad", priceDelta: 0 },
      { id: "6", label: "x 6", serves: "6 unidades", priceDelta: 16 },
    ],
  },
  {
    slug: "croissant-mantequilla",
    name: "Croissant de Mantequilla",
    subtitle: "72 horas de fermentación",
    category: "panaderia",
    basePrice: 3,
    heroImage: UNSPLASH("photo-1555507036-ab1f4038808a"),
    gallery: [
      UNSPLASH("photo-1555507036-ab1f4038808a"),
      UNSPLASH("photo-1509440159596-0249088772ff"),
    ],
    description:
      "Masa laminada con mantequilla francesa, fermentada 72 horas en frío. Alveolado irregular y capas bien marcadas.",
    ingredients: ["Harina", "Mantequilla francesa", "Masa madre"],
    flavors: ["Clásico", "Almendras", "Chocolate"],
    sizes: [
      { id: "1", label: "Individual", serves: "1 unidad", priceDelta: 0 },
      { id: "4", label: "x 4", serves: "4 unidades", priceDelta: 9 },
    ],
  },
  {
    slug: "pain-au-chocolat",
    name: "Pain au Chocolat",
    subtitle: "Chocolate belga en masa laminada",
    category: "panaderia",
    basePrice: 3,
    heroImage: UNSPLASH("photo-1623334044303-241021148842"),
    gallery: [UNSPLASH("photo-1623334044303-241021148842")],
    description:
      "Dos barras de chocolate belga 64% envueltas en nuestra masa de croissant de 72 horas.",
    ingredients: ["Masa de croissant", "Chocolate 64%"],
    flavors: ["Clásico"],
    sizes: [
      { id: "1", label: "Individual", serves: "1 unidad", priceDelta: 0 },
      { id: "4", label: "x 4", serves: "4 unidades", priceDelta: 10 },
    ],
  },
  {
    slug: "paris-brest",
    name: "Paris-Brest",
    subtitle: "Choux con praliné de avellanas",
    category: "tartas",
    basePrice: 26,
    heroImage: UNSPLASH("photo-1571115177098-24ec42ed204d"),
    gallery: [UNSPLASH("photo-1571115177098-24ec42ed204d")],
    description:
      "Corona de pâte à choux con crema mousseline de praliné de avellanas del Piamonte.",
    ingredients: ["Pâte à choux", "Praliné", "Mousseline"],
    flavors: ["Avellana", "Pistacho"],
    sizes: [{ id: "fam", label: "Familiar", serves: "6 raciones", priceDelta: 0 }],
    featured: true,
  },
  {
    slug: "tarta-frutos-rojos",
    name: "Tarta Frutos Rojos",
    subtitle: "Frutos rojos de temporada",
    category: "tartas",
    basePrice: 26,
    heroImage: UNSPLASH("photo-1519915028121-7d3463d20b13"),
    gallery: [UNSPLASH("photo-1519915028121-7d3463d20b13")],
    description:
      "Sablée de vainilla, crema de almendras y una cascada de frutos rojos frescos con brillo natural.",
    ingredients: ["Sablée", "Crema frangipane", "Fresas", "Arándanos", "Frambuesas"],
    flavors: ["Clásica", "Con lavanda"],
    sizes: [{ id: "fam", label: "Familiar", serves: "8 raciones", priceDelta: 0 }],
  },
];

export function findProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productPrice(product: Product, sizeId: string) {
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  return product.basePrice + size.priceDelta;
}

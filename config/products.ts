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
  { id: "tortas", label: "Tortas" },
  { id: "macarons", label: "Macarons" },
  { id: "tartas", label: "Tartas" },
  { id: "bocados", label: "Bocados" },
  { id: "panaderia", label: "Panadería" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "tarta-fresas-rose",
    name: "Fresas Rosé",
    subtitle: "Torta insignia de frutillas frescas",
    category: "tortas",
    basePrice: 18500,
    heroImage: UNSPLASH("photo-1578985545062-69928b1d9587"),
    gallery: [
      UNSPLASH("photo-1578985545062-69928b1d9587"),
      UNSPLASH("photo-1551404973-761c83cd8339"),
      UNSPLASH("photo-1565958011703-44f9829ba187"),
    ],
    description:
      "Bizcocho génoise de vainilla Bourbon, crema chantilly montada a mano y frutillas argentinas de estación. Un clásico parisino reinterpretado.",
    ingredients: ["Génoise vainilla", "Chantilly", "Frutillas", "Jalea rosé"],
    flavors: ["Vainilla & Frutilla", "Vainilla & Frambuesa", "Vainilla & Durazno"],
    sizes: [
      { id: "sm", label: "Pequeña", serves: "6 a 8 porciones", priceDelta: 0 },
      { id: "md", label: "Mediana", serves: "10 a 12 porciones", priceDelta: 6500 },
      { id: "lg", label: "Grande", serves: "16 a 20 porciones", priceDelta: 14000 },
    ],
    featured: true,
    signature: true,
  },
  {
    slug: "opera-dorada",
    name: "Ópera Dorada",
    subtitle: "Almendras, café y chocolate",
    category: "tortas",
    basePrice: 21500,
    heroImage: UNSPLASH("photo-1551024506-0bccd828d307"),
    gallery: [
      UNSPLASH("photo-1551024506-0bccd828d307"),
      UNSPLASH("photo-1565808229224-264b6cafe06c"),
      UNSPLASH("photo-1519915028121-7d3463d20b13"),
    ],
    description:
      "Joconde de almendras, ganache de chocolate semiamargo y crema al café. Terminada con hoja de oro comestible.",
    ingredients: ["Joconde almendras", "Ganache 70%", "Crema café", "Hoja de oro"],
    flavors: ["Café clásico", "Avellana", "Pistacho"],
    sizes: [
      { id: "sm", label: "Individual", serves: "1 porción", priceDelta: -16000 },
      { id: "md", label: "Mediana", serves: "8 a 10 porciones", priceDelta: 0 },
      { id: "lg", label: "Grande", serves: "14 a 16 porciones", priceDelta: 9500 },
    ],
    featured: true,
    signature: true,
  },
  {
    slug: "mille-feuille",
    name: "Mille-Feuille",
    subtitle: "Hojaldre caramelizado y crema diplomat",
    category: "tortas",
    basePrice: 15800,
    heroImage: UNSPLASH("photo-1486427944299-d1955d23e34d"),
    gallery: [
      UNSPLASH("photo-1486427944299-d1955d23e34d"),
      UNSPLASH("photo-1563805042-7684c019e1cb"),
    ],
    description:
      "Tres capas de hojaldre invertido caramelizado con crema diplomat de vainilla Madagascar.",
    ingredients: ["Hojaldre invertido", "Crema diplomat", "Vainilla Madagascar"],
    flavors: ["Vainilla", "Chocolate", "Frambuesa"],
    sizes: [
      { id: "ind", label: "Individual", serves: "1 porción", priceDelta: -11000 },
      { id: "fam", label: "Familiar", serves: "6 a 8 porciones", priceDelta: 0 },
    ],
    signature: true,
  },
  {
    slug: "macarons-caja-12",
    name: "Caja de 12 Macarons",
    subtitle: "Surtido degustación",
    category: "macarons",
    basePrice: 9800,
    heroImage: UNSPLASH("photo-1558326567-98ae2405596b"),
    gallery: [
      UNSPLASH("photo-1558326567-98ae2405596b"),
      UNSPLASH("photo-1569864358642-9d1684040f43"),
    ],
    description:
      "Doce macarons artesanales en caja de regalo. Elegí la selección de sabores al hacer el pedido.",
    ingredients: ["Almendra", "Azúcar glas", "Claras", "Rellenos de temporada"],
    flavors: ["Surtido clásico", "Surtido frutal", "Surtido chocolate"],
    sizes: [
      { id: "6", label: "Caja x 6", serves: "6 unidades", priceDelta: -4500 },
      { id: "12", label: "Caja x 12", serves: "12 unidades", priceDelta: 0 },
      { id: "24", label: "Caja x 24", serves: "24 unidades", priceDelta: 8500 },
    ],
    featured: true,
  },
  {
    slug: "tarta-limon-merengue",
    name: "Tarta Limón Merengue",
    subtitle: "Curd de limón y merengue italiano",
    category: "tartas",
    basePrice: 12900,
    heroImage: UNSPLASH("photo-1464195244916-405fa0a82545"),
    gallery: [
      UNSPLASH("photo-1464195244916-405fa0a82545"),
      UNSPLASH("photo-1519915028121-7d3463d20b13"),
    ],
    description:
      "Masa sablée de almendras, curd intenso de limón Eureka y merengue italiano tostado a la llama.",
    ingredients: ["Sablée almendras", "Curd limón", "Merengue italiano"],
    flavors: ["Limón clásico", "Lima & albahaca"],
    sizes: [
      { id: "ind", label: "Individual", serves: "1 porción", priceDelta: -8500 },
      { id: "fam", label: "Familiar", serves: "8 porciones", priceDelta: 0 },
    ],
  },
  {
    slug: "tarta-chocolate-avellana",
    name: "Chocolate Noisette",
    subtitle: "Chocolate belga y avellanas piamontesas",
    category: "tartas",
    basePrice: 14500,
    heroImage: UNSPLASH("photo-1606313564200-e75d5e30476c"),
    gallery: [
      UNSPLASH("photo-1606313564200-e75d5e30476c"),
      UNSPLASH("photo-1600326145368-51844b0ebd9b"),
    ],
    description:
      "Ganache de chocolate belga 66% sobre base crocante de avellanas caramelizadas y cacao puro.",
    ingredients: ["Chocolate 66%", "Avellanas Piemonte", "Praliné"],
    flavors: ["Amargo intenso", "Avellana caramelo"],
    sizes: [
      { id: "fam", label: "Familiar", serves: "8 a 10 porciones", priceDelta: 0 },
      { id: "xl", label: "Grande", serves: "14 porciones", priceDelta: 7500 },
    ],
  },
  {
    slug: "canele-bordelais",
    name: "Canelé Bordelais",
    subtitle: "Corazón tierno, caramelo crocante",
    category: "bocados",
    basePrice: 1600,
    heroImage: UNSPLASH("photo-1568051243858-533a607809a5"),
    gallery: [
      UNSPLASH("photo-1568051243858-533a607809a5"),
    ],
    description:
      "Clásico de Burdeos con masa líquida de vainilla y ron, caramelizada en moldes de cobre.",
    ingredients: ["Vainilla", "Ron", "Manteca", "Azúcar mascabo"],
    flavors: ["Clásico"],
    sizes: [
      { id: "4", label: "x 4", serves: "4 unidades", priceDelta: 0 },
      { id: "8", label: "x 8", serves: "8 unidades", priceDelta: 4200 },
    ],
  },
  {
    slug: "eclair-vainilla",
    name: "Éclair Vainilla",
    subtitle: "Pâte à choux y crema de vainilla",
    category: "bocados",
    basePrice: 1900,
    heroImage: UNSPLASH("photo-1488477181946-6428a0291777"),
    gallery: [
      UNSPLASH("photo-1488477181946-6428a0291777"),
    ],
    description:
      "Éclair crocante con crema pastelera de vainilla y fondant brillante. Se hornea dos veces al día.",
    ingredients: ["Pâte à choux", "Crema pastelera", "Fondant"],
    flavors: ["Vainilla", "Chocolate", "Café", "Frambuesa"],
    sizes: [
      { id: "1", label: "Individual", serves: "1 unidad", priceDelta: 0 },
      { id: "6", label: "x 6", serves: "6 unidades", priceDelta: 8000 },
    ],
  },
  {
    slug: "croissant-mantequilla",
    name: "Croissant de Manteca",
    subtitle: "72 horas de fermentación",
    category: "panaderia",
    basePrice: 1500,
    heroImage: UNSPLASH("photo-1555507036-ab1f4038808a"),
    gallery: [
      UNSPLASH("photo-1555507036-ab1f4038808a"),
      UNSPLASH("photo-1509440159596-0249088772ff"),
    ],
    description:
      "Masa laminada con manteca francesa, fermentada 72 horas en frío. Alveolado irregular y capas bien marcadas.",
    ingredients: ["Harina", "Manteca francesa", "Masa madre"],
    flavors: ["Clásico", "Almendras", "Chocolate"],
    sizes: [
      { id: "1", label: "Individual", serves: "1 unidad", priceDelta: 0 },
      { id: "4", label: "x 4", serves: "4 unidades", priceDelta: 4200 },
    ],
  },
  {
    slug: "pain-au-chocolat",
    name: "Pain au Chocolat",
    subtitle: "Chocolate belga en masa laminada",
    category: "panaderia",
    basePrice: 1700,
    heroImage: UNSPLASH("photo-1623334044303-241021148842"),
    gallery: [
      UNSPLASH("photo-1623334044303-241021148842"),
    ],
    description:
      "Dos barras de chocolate belga 64% envueltas en nuestra masa de croissant de 72 horas.",
    ingredients: ["Masa de croissant", "Chocolate 64%"],
    flavors: ["Clásico"],
    sizes: [
      { id: "1", label: "Individual", serves: "1 unidad", priceDelta: 0 },
      { id: "4", label: "x 4", serves: "4 unidades", priceDelta: 4800 },
    ],
  },
  {
    slug: "paris-brest",
    name: "Paris-Brest",
    subtitle: "Choux con praliné de avellanas",
    category: "tartas",
    basePrice: 13500,
    heroImage: UNSPLASH("photo-1571115177098-24ec42ed204d"),
    gallery: [
      UNSPLASH("photo-1571115177098-24ec42ed204d"),
    ],
    description:
      "Corona de pâte à choux con crema mousseline de praliné de avellanas del Piemonte.",
    ingredients: ["Pâte à choux", "Praliné", "Mousseline"],
    flavors: ["Avellana", "Pistacho"],
    sizes: [
      { id: "fam", label: "Familiar", serves: "6 porciones", priceDelta: 0 },
    ],
    featured: true,
  },
  {
    slug: "tarta-frutos-rojos",
    name: "Tarta Frutos Rojos",
    subtitle: "Frutos rojos de estación",
    category: "tartas",
    basePrice: 13800,
    heroImage: UNSPLASH("photo-1519915028121-7d3463d20b13"),
    gallery: [
      UNSPLASH("photo-1519915028121-7d3463d20b13"),
    ],
    description:
      "Sablée de vainilla, crema de almendras y una cascada de frutos rojos frescos con brillo natural.",
    ingredients: ["Sablée", "Crema frangipane", "Frutillas", "Arándanos", "Frambuesas"],
    flavors: ["Clásica", "Con lavanda"],
    sizes: [
      { id: "fam", label: "Familiar", serves: "8 porciones", priceDelta: 0 },
    ],
  },
];

export function findProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productPrice(product: Product, sizeId: string) {
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  return product.basePrice + size.priceDelta;
}

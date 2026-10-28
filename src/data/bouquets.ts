export interface BouquetItem {
  id: string;
  name: string;
  subtitle: string;
  category: "romántico" | "aniversario" | "cumpleaños" | "condolencias" | "autor";
  price: number;
  stems: number;
  image: string;
  curvedBadge?: string; // "Más Vendido" | "Más Buscado"
  description: string;
  freshnessDays: number;
}

export interface BentoFlowerItem {
  id: string;
  name: string;
  tag: string;
  price: number;
  image: string;
  archStyle: "right" | "top" | "tall-center" | "left" | "bottom-right";
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  pickupPoint: string;
  dropOffZone: string;
  address: string;
  eta: string;
  x: number;
  y: number;
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatarBg: string;
  initials: string;
}

export const MAIN_BOUQUETS: BouquetItem[] = [
  {
    id: "claveles-aurora",
    name: "Ramo Aurora Imperial",
    subtitle: "Claveles pastel rosa y blanco de tallo largo",
    category: "romántico",
    price: 48,
    stems: 28,
    image: "/images/flowers/bouquet-carnations.png",
    curvedBadge: "Más Vendido",
    description:
      "Delicada composición de claveles bicolores cortados al alba, envueltos en lino botánico con aroma natural.",
    freshnessDays: 12,
  },
  {
    id: "rosas-carmesi",
    name: "Pasión de Terciopelo",
    subtitle: "Rosas rojas gran reserva de invernadero",
    category: "aniversario",
    price: 64,
    stems: 18,
    image: "/images/flowers/bouquet-red-roses.png",
    curvedBadge: "Más Buscado",
    description:
      "Rosas carmesí de pétalo profundo seleccionadas a mano para expresar amor eterno con elegancia clásica.",
    freshnessDays: 10,
  },
  {
    id: "tulipanes-brisa",
    name: "Suspiro de Tulipanes",
    subtitle: "Tulipanes holandeses rosa empolvado y marfil",
    category: "cumpleaños",
    price: 56,
    stems: 24,
    image: "/images/flowers/bouquet-pink-tulips.png",
    description:
      "Tulipanes frescos de bulbo importado que continúan abriéndose suavemente día tras día en tu jarrón.",
    freshnessDays: 9,
  },
  {
    id: "rosas-blancas-atelier",
    name: "Pureza de Jardín",
    subtitle: "Rosas blancas inglesas de colección",
    category: "autor",
    price: 72,
    stems: 22,
    image: "/images/flowers/hero-white-roses.png",
    curvedBadge: "Edición Especial",
    description:
      "Nuestro ramo insignia del Atelier: rosas blancas de jardín con follaje esmeralda profundo y fragancia sutil.",
    freshnessDays: 11,
  },
  {
    id: "claveles-rubor",
    name: "Nube de Rubor Rosado",
    subtitle: "Claveles rizados en tono durazno y cuarzo",
    category: "romántico",
    price: 52,
    stems: 32,
    image: "/images/flowers/bouquet-blush-tall.png",
    description:
      "Abundante ramillete vertical de pétalos rizados en tono rubor con acabado arquitectónico y lazo de yute.",
    freshnessDays: 14,
  },
  {
    id: "girasoles-solsticio",
    name: "Solsticio Dorado",
    subtitle: "Girasoles imperiales de campo soleado",
    category: "cumpleaños",
    price: 45,
    stems: 12,
    image: "/images/flowers/bento-sunflowers.png",
    description:
      "Energía luminosa en cada pétalo dorado, ideal para celebrar logros, cumpleaños y momentos inolvidables.",
    freshnessDays: 10,
  },
];

export const WEEKLY_BENTO_BOUQUETS: {
  leftTop: BentoFlowerItem;
  leftBottom: BentoFlowerItem;
  centerTall: BentoFlowerItem;
  rightTop: BentoFlowerItem;
  rightBottom: BentoFlowerItem;
} = {
  leftTop: {
    id: "bento-amarillo",
    name: "Rama de Azahar Dorado",
    tag: "Cosecha Matutina",
    price: 42,
    image: "/images/flowers/bento-yellow-flowers.png",
    archStyle: "right",
  },
  leftBottom: {
    id: "bento-hortensia",
    name: "Hortensia Cielo Azul",
    tag: "Cultivo de Altura",
    price: 54,
    image: "/images/flowers/bento-blue-hydrangea.png",
    archStyle: "top",
  },
  centerTall: {
    id: "bento-central",
    name: "Gran Ramo Rubor Imperial",
    tag: "Favorito de la Semana",
    price: 68,
    image: "/images/flowers/bouquet-blush-tall.png",
    archStyle: "tall-center",
  },
  rightTop: {
    id: "bento-coral",
    name: "Rosas Coral de Fuego",
    tag: "Edición Limitada",
    price: 59,
    image: "/images/flowers/bento-coral-roses.png",
    archStyle: "left",
  },
  rightBottom: {
    id: "bento-girasol",
    name: "Trío de Girasoles Reales",
    tag: "Alegría Natural",
    price: 46,
    image: "/images/flowers/bento-sunflowers.png",
    archStyle: "bottom-right",
  },
};

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "atelier-central",
    name: "Atelier Botánico Central",
    city: "Distrito Centro",
    pickupPoint: "Av. Las Rosas 420, Galería Floral",
    dropOffZone: "Toda la zona metropolitana en 30 min",
    address: "Av. Las Rosas 420, Esquina Paseo Real",
    eta: "30 Min",
    x: 348,
    y: 268,
    featured: true,
  },
  {
    id: "sucursal-norte",
    name: "Boutique Jardín del Norte",
    city: "Zona Norte",
    pickupPoint: "Paseo Botánico 118, Local 4",
    dropOffZone: "Residencial del Norte y Bosques",
    address: "Paseo Botánico 118",
    eta: "25 Min",
    x: 215,
    y: 95,
  },
  {
    id: "sucursal-oeste",
    name: "Estudio Floral Villa Jardín",
    city: "Zona Poniente",
    pickupPoint: "Boulevard Villa Jardín 890",
    dropOffZone: "Lomas, Mirador y Santa Fe",
    address: "Boulevard Villa Jardín 890",
    eta: "28 Min",
    x: 118,
    y: 230,
  },
  {
    id: "sucursal-sur",
    name: "Invernadero San Ángel",
    city: "Zona Sur",
    pickupPoint: "Gran Vía Central 502, San Ángel",
    dropOffZone: "Pedregal, Coyoacán y Del Valle",
    address: "Gran Vía Central 502",
    eta: "30 Min",
    x: 492,
    y: 310,
  },
  {
    id: "sucursal-este",
    name: "Galería Floral Reforma",
    city: "Corredor Financiero",
    pickupPoint: "Calle Flores 305, Torre Jardín",
    dropOffZone: "Polanco, Reforma y Roma",
    address: "Calle Flores 305",
    eta: "22 Min",
    x: 205,
    y: 345,
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "raquel",
    name: "Raquel Mendoza",
    role: "Pedido Express de Aniversario",
    rating: 5,
    comment:
      "Llegaron en exactamente 26 minutos con los pétalos frescos como recién cortados. El empaque en papel de lino y la dedicatoria caligrafiada hicieron llorar de emoción a mi mamá.",
    avatarBg: "linear-gradient(135deg, #4A5D4E 0%, #2C3A2F 100%)",
    initials: "RM",
  },
  {
    id: "valeria",
    name: "Valeria Castellanos",
    role: "Suscriptora Floral Semanal",
    rating: 5,
    comment:
      "La calidad de las rosas blancas y los tulipanes supera a cualquier florería tradicional. Cada semana mi sala huele a jardín recién florecido gracias a su servicio a domicilio.",
    avatarBg: "linear-gradient(135deg, #7A5438 0%, #463020 100%)",
    initials: "VC",
  },
];

export const DELIVERY_STEPS = [
  {
    step: "01",
    title: "Corte al Amanecer",
    subtitle: "Cosecha diaria a las 5:00 AM",
    description:
      "Seleccionamos tallos frescos directamente de invernaderos locales de altura para garantizar hasta 14 días de vida en jarrón.",
  },
  {
    step: "02",
    title: "Diseño de Autor",
    subtitle: "Arte floral hecho a mano",
    description:
      "Nuestros maestros floristas equilibran color, altura y fragancia envolviendo cada ramo en papel de lino orgánico y cinta de seda.",
  },
  {
    step: "03",
    title: "Cápsula de Hidratación",
    subtitle: "Frescura intacta en ruta",
    description:
      "Cada tallo viaja con una reserva nutritiva de agua purificada para que las flores lleguen radiantes sin importar la temperatura.",
  },
  {
    step: "04",
    title: "Entrega en 30 Minutos",
    subtitle: "Mensajería floral climatizada",
    description:
      "Repartidores especializados entregan tu ramo en mano con seguimiento en tiempo real y tarjeta de dedicatoria personalizada.",
  },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: "plan-esencial",
    name: "Detalle Botánico",
    tagline: "Para iluminar escritorios y rincones especiales",
    price: 39,
    period: "por envío",
    stems: "15 a 18 tallos selectos",
    badge: "Ideal para Regalo",
    features: [
      "Flores frescas de temporada cortadas el mismo día",
      "Envoltura artesanal en papel de lino crema",
      "Tarjeta con mensaje personalizado en caligrafía",
      "Entrega programada o express en 30 minutos",
    ],
    highlighted: false,
  },
  {
    id: "plan-imperial",
    name: "Colección Imperial",
    tagline: "Nuestra experiencia más pedida de rosas y tulipanes",
    price: 62,
    period: "por envío",
    stems: "26 a 32 tallos premium",
    badge: "Más Elegido",
    features: [
      "Rosas inglesas, tulipanes holandeses o peonías",
      "Jarrón de cristal soplado incluido en tu primer pedido",
      "Cápsula de hidratación + nutrientes para 14 días",
      "Delivery prioritario gratis en menos de 30 minutos",
    ],
    highlighted: true,
  },
  {
    id: "plan-atelier",
    name: "Suscripción Atelier",
    tagline: "Flores frescas cada semana en tu hogar u oficina",
    price: 185,
    period: "al mes (4 entregas)",
    stems: "30+ tallos de autor cada semana",
    badge: "Ahorra 25%",
    features: [
      "4 ramos de autor diferentes cada mes diseñados a medida",
      "Cambio de fecha o dirección sin costo desde tu cuenta",
      "Atención directa de un curador floral personal",
      "Envíos express ilimitados sin cargo adicional",
    ],
    highlighted: false,
  },
];

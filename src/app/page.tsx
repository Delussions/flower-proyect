"use client";

import React, { useEffect, useState } from "react";
import SplitBotanicalHero from "@/components/SplitBotanicalHero";
import FastOrderEditorialHero from "@/components/FastOrderEditorialHero";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CatalogProduct {
  id: string;
  name: string;
  subtitle: string;
  category: "kraft" | "lavanda" | "pistacho" | "florero";
  price: number;
  oldPrice: number;
  bgCard: string;
  accentTag: string;
  tagColor: string;
  image: string;
  deliveryMinutes: number;
}

const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "prod-kraft-white",
    name: "Ramo Taze Kraft & Canela",
    subtitle: "Rosas blancas, crisantemos lima y eucalipto",
    category: "kraft",
    price: 42,
    oldPrice: 52,
    bgCard: "#FFF083",
    accentTag: "20% Dto. Express",
    tagColor: "#355E4B",
    image: "/images/kraft-white-roses.png",
    deliveryMinutes: 18,
  },
  {
    id: "prod-lavender-dream",
    name: "Sinfonía Lavanda Imperial",
    subtitle: "Rosas lilas, lisianthus púrpura y lazo de seda",
    category: "lavanda",
    price: 48,
    oldPrice: 60,
    bgCard: "#E6D2F7",
    accentTag: "Favorito Artístico",
    tagColor: "#6B3FA0",
    image: "/images/bouquet-lavender.png",
    deliveryMinutes: 22,
  },
  {
    id: "prod-citrus-spring",
    name: "Brisa Pistacho & Tulipanes",
    subtitle: "Tulipanes crema, hortensias verdes y manzanilla",
    category: "pistacho",
    price: 45,
    oldPrice: 56,
    bgCard: "#DCEB9E",
    accentTag: "Cosecha del Día",
    tagColor: "#4D6B14",
    image: "/images/bouquet-citrus.png",
    deliveryMinutes: 20,
  },
  {
    id: "prod-vase-orchids",
    name: "Florero Orquídea Real",
    subtitle: "Rosas rojas, orquídeas blancas y espigas coral",
    category: "florero",
    price: 25,
    oldPrice: 32,
    bgCard: "#DCE7D6",
    accentTag: "Incluye Florero",
    tagColor: "#355E4B",
    image: "/images/vase-red-orchids.png",
    deliveryMinutes: 19,
  },
  {
    id: "prod-vase-bronze",
    name: "Florero Bronce Rosé",
    subtitle: "Domo de rosas rubor y durazno en vaso martillado",
    category: "florero",
    price: 25,
    oldPrice: 32,
    bgCard: "#F6E4C8",
    accentTag: "Más Regalado",
    tagColor: "#F28B30",
    image: "/images/vase-blush-roses.png",
    deliveryMinutes: 21,
  },
  {
    id: "prod-scabiosa-atelier",
    name: "Edición Escabiosa Púrpura",
    subtitle: "Arreglo botánico de autor con follaje estrella",
    category: "lavanda",
    price: 39,
    oldPrice: 49,
    bgCard: "#F5D9EC",
    accentTag: "Nueva Colección",
    tagColor: "#12131A",
    image: "/images/scabiosa-macro.png",
    deliveryMinutes: 24,
  },
];

const DELIVERY_FEATURES = [
  {
    num: "01",
    title: "Corte Matutino a las 5:00 AM",
    desc: "Seleccionamos cada tallo directamente de invernaderos locales para garantizar 14 días de frescura.",
    color: "#FFF083",
  },
  {
    num: "02",
    title: "Empaque Kraft, Lino o Cristal",
    desc: "Envoltura artesanal con rafia natural, ramas de canela aromática o floreros de colección.",
    color: "#DCE7D6",
  },
  {
    num: "03",
    title: "Despacho Ultrarrápido en 20 Min",
    desc: "Nuestra flota climatizada entrega tu ramo en tiempo récord con seguimiento GPS en vivo.",
    color: "#E6D2F7",
  },
  {
    num: "04",
    title: "20% Descuento por Puntualidad",
    desc: "Beneficio exclusivo automático en todos tus pedidos programados o de entrega inmediata.",
    color: "#F6E4C8",
  },
];

export default function DualFloralLandingPage() {
  // Parallax state
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Allows the user to toggle which of the 2 reference heroes appears first at the very top
  const [primaryDesign, setPrimaryDesign] = useState<"editorial" | "split">(
    "editorial"
  );

  // Catalog filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  // Custom Bouquet Builder & Express Delivery Calculator state
  const [builderStyle, setBuilderStyle] = useState("Rosas Blancas & Kraft");
  const [builderSize, setBuilderSize] = useState(24);
  const [builderAroma, setBuilderAroma] = useState("Canela & Eucalipto Fresco");
  const [deliveryPostal, setDeliveryPostal] = useState(
    "Av. Paseo de la Reforma 350"
  );

  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dedicationNote, setDedicationNote] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setToastMsg(`"${item.name}" agregado con 20% de descuento puntual`);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const rawSubtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * 0.2);
  const finalTotal = rawSubtotal - discountAmount;

  const filteredProducts =
    selectedCategory === "todos"
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter((p) => p.category === selectedCategory);

  const catalogParallax = Math.max(0, Math.min(scrollY - 900, 700));

  return (
    <main className="min-h-screen bg-[#F7F6F2] text-[#12131A] relative">
      {/* =====================================================================
          FLOATING DUAL-DESIGN SWITCHER PILL
          Lets user switch which of the two reference Heroes is at the very top,
          while both remain seamlessly connected in the scroll flow!
      ===================================================================== */}
      <div className="fixed bottom-5 left-5 z-40 bg-[#12131A]/95 backdrop-blur-md text-white p-1.5 rounded-full shadow-2xl border border-white/15 flex items-center gap-1 text-[11px]">
        <button
          onClick={() => {
            setPrimaryDesign("editorial");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
            primaryDesign === "editorial"
              ? "bg-[#FFF083] text-[#12131A] font-bold"
              : "text-white/75 hover:text-white"
          }`}
        >
          1. Hero Editorial Rápido
        </button>
        <button
          onClick={() => {
            setPrimaryDesign("split");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
            primaryDesign === "split"
              ? "bg-gradient-to-r from-[#D3B5ED] to-[#ABC94C] text-[#12131A] font-bold"
              : "text-white/75 hover:text-white"
          }`}
        >
          2. Hero Split Botánico
        </button>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0F111A] text-white px-5 py-3.5 shadow-2xl border-l-4 border-[#F28B30] flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ABC94C]" />
          <span className="text-xs font-medium">{toastMsg}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[11px] uppercase tracking-wider text-[#FFF083] underline ml-2 cursor-pointer"
          >
            Ver Carrito
          </button>
        </div>
      )}

      {/* =====================================================================
          RENDER BOTH EXACT REFERENCE DESIGNS (ADAPTIVE ORDER)
      ===================================================================== */}
      {primaryDesign === "editorial" ? (
        <>
          <FastOrderEditorialHero
            scrollY={scrollY}
            mousePos={mousePos}
            cartCount={totalCartItems}
            onOpenCart={() => setIsCartOpen(true)}
            onAddToCart={handleAddToCart}
          />
          <SplitBotanicalHero
            scrollY={Math.max(0, scrollY - 750)}
            mousePos={mousePos}
            cartCount={totalCartItems}
            onOpenCart={() => setIsCartOpen(true)}
            onExploreClick={() => {
              document
                .getElementById("catalogo-floral")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </>
      ) : (
        <>
          <SplitBotanicalHero
            scrollY={scrollY}
            mousePos={mousePos}
            cartCount={totalCartItems}
            onOpenCart={() => setIsCartOpen(true)}
            onExploreClick={() => {
              document
                .getElementById("catalogo-floral")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <FastOrderEditorialHero
            scrollY={Math.max(0, scrollY - 750)}
            mousePos={mousePos}
            cartCount={totalCartItems}
            onOpenCart={() => setIsCartOpen(true)}
            onAddToCart={handleAddToCart}
          />
        </>
      )}

      {/* =====================================================================
          CONTINUATION SECTION 1: CATÁLOGO DE RAMOS POP-OUT CON ENTREGA EN 20 MIN
          Combines Design 2's Wireframe Grid, Pink Headline Highlight & Pop-Out Pastel Cards
          with Design 1's Lavender (#D3B5ED) and Pistachio-Lime (#ABC94C) Palette
      ===================================================================== */}
      <section
        id="catalogo-floral"
        className="py-24 lg:py-32 bg-[#F7F6F2] relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-wireframe-grid opacity-85"
        />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white shadow-xs mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#355E4B]">
                <span>✳</span>
                <span>COLECCIÓN DE ENTREGA INMEDIATA</span>
              </div>
              <h2 className="text-[42px] sm:text-[56px] leading-[1.08] tracking-[-0.02em] text-[#12131A]">
                <span className="inline-block relative font-display-serif font-bold mr-3">
                  <span
                    aria-hidden="true"
                    className="pink-word-highlight absolute right-[-4px] top-[15%] bottom-[10%] w-[72%] -z-10"
                  />
                  Ramos
                </span>
                <span className="font-thin-serif font-light text-[46px] sm:text-[62px]">
                  Frescos
                </span>
                <br />
                <span className="font-display-serif font-bold">
                  Listos Para Enviar.
                </span>
              </h2>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { id: "todos", label: "Todos los Ramos" },
                { id: "kraft", label: "Línea Kraft & Canela" },
                { id: "lavanda", label: "Colección Lavanda" },
                { id: "pistacho", label: "Colección Pistacho" },
                { id: "florero", label: "Con Florero" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-3 text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#0F111A] text-white shadow-lg"
                      : "bg-white text-[#3F4048] hover:bg-[#FFF083] hover:text-[#12131A]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Pop-Out Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 pt-10">
            {filteredProducts.map((product, idx) => {
              const offset =
                idx % 2 === 0
                  ? catalogParallax * -0.03
                  : catalogParallax * 0.03;

              return (
                <article
                  key={product.id}
                  style={{
                    backgroundColor: product.bgCard,
                    transform: `translate3d(0, ${offset}px, 0)`,
                  }}
                  className="relative p-7 pt-44 flex flex-col justify-between transition-transform duration-300 ease-out group shadow-[0_14px_35px_rgba(18,19,26,0.04)]"
                >
                  {/* Pop-Out Bouquet Cutout breaking above the top border of the pastel card */}
                  <div className="absolute -top-16 inset-x-0 h-56 flex items-center justify-center pointer-events-none">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-auto object-contain drop-shadow-[0_18px_24px_rgba(18,19,26,0.16)] transition-transform duration-500 group-hover:scale-108 group-hover:-translate-y-2"
                    />
                  </div>

                  {/* Top-Right Express Badge */}
                  <span
                    style={{ backgroundColor: product.tagColor }}
                    className="absolute top-4 right-4 text-white text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1"
                  >
                    {product.accentTag}
                  </span>

                  {/* Card Details */}
                  <div className="bg-white/90 backdrop-blur-xs p-5 mt-2 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#5B5C66]">
                      <span>⚡ Entrega en {product.deliveryMinutes} min</span>
                      <span className="text-[#F16B58] font-bold">★ 4.9</span>
                    </div>
                    <h3 className="font-display-serif text-xl font-bold text-[#12131A]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#5B5C66] leading-relaxed">
                      {product.subtitle}
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-[#ECEAE4]">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-[#12131A]">
                          ${product.price}.00
                        </span>
                        <span className="text-xs text-[#8E8F99] line-through">
                          ${product.oldPrice}.00
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleAddToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          })
                        }
                        className="bg-[#0F111A] text-white text-xs font-medium px-5 py-2.5 flex items-center gap-2 hover:bg-[#F28B30] transition-colors cursor-pointer"
                      >
                        <span>Comprar</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CONTINUATION SECTION 2: FUSIÓN DUAL 50/50 — ATELIER PERSONALIZADO & DELIVERY EXPRESS
          Left Half: Lavender (#D3B5ED) Custom Bouquet Builder
          Right Half: Pistachio-Lime (#ABC94C) Express Delivery Route & 20% On-Time Guarantee
      ===================================================================== */}
      <section
        id="experiencia-dual"
        className="relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      >
        {/* LEFT HALF: Lavender (#D3B5ED) Personalizador de Ramos */}
        <div className="relative bg-[#D3B5ED] p-8 sm:p-14 lg:p-20 flex flex-col justify-between overflow-hidden">
          {/* Watermark Typography */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none font-thin-serif text-[160px] text-white/20 absolute -bottom-10 -left-6 leading-none"
          >
            atelier
          </span>

          <div className="relative z-10 space-y-6 max-w-xl">
            <span className="inline-block text-[10.5px] uppercase tracking-[0.26em] bg-white/35 text-[#12131A] font-bold px-3.5 py-1.5">
              DISEÑA TU RAMO A MEDIDA
            </span>
            <h2 className="font-thin-serif text-[44px] sm:text-[56px] leading-[1.05] text-white">
              Crea una combinación{" "}
              <span className="font-display-serif font-bold text-[#12131A]">
                única para regalar.
              </span>
            </h2>
            <p className="text-sm text-[#2A2333] leading-relaxed">
              Selecciona tus flores favoritas, el número de tallos y el aroma
              botánico. Nuestros maestros floristas lo envuelven al instante.
            </p>

            {/* Builder Controls */}
            <div className="bg-white p-6 sm:p-8 shadow-xl space-y-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B5C66] mb-2">
                  1. Selección Botánica Principal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    "Rosas Blancas & Kraft",
                    "Escabiosa & Lavanda",
                    "Tulipanes & Pistacho",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBuilderStyle(opt)}
                      className={`py-2.5 px-3 text-xs font-semibold border text-left transition-all cursor-pointer ${
                        builderStyle === opt
                          ? "bg-[#0F111A] text-white border-[#0F111A]"
                          : "bg-[#F7F6F2] text-[#12131A] border-[#E5E4DC]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B5C66] mb-2">
                    2. Tamaño del Ramo (Tallos)
                  </label>
                  <div className="flex gap-2">
                    {[12, 24, 36].map((stems) => (
                      <button
                        key={stems}
                        type="button"
                        onClick={() => setBuilderSize(stems)}
                        className={`flex-1 py-2.5 text-xs font-bold border transition-all cursor-pointer ${
                          builderSize === stems
                            ? "bg-[#CE9FFC] text-[#12131A] border-[#12131A]"
                            : "bg-[#F7F6F2] text-[#12131A] border-[#E5E4DC]"
                        }`}
                      >
                        {stems} tallos
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B5C66] mb-2">
                    3. Nota Aromática
                  </label>
                  <select
                    value={builderAroma}
                    onChange={(e) => setBuilderAroma(e.target.value)}
                    className="w-full py-2.5 px-3 text-xs font-medium bg-[#F7F6F2] border border-[#E5E4DC] focus:outline-none"
                  >
                    <option value="Canela & Eucalipto Fresco">
                      Canela & Eucalipto Fresco
                    </option>
                    <option value="Esencia de Lavanda Francesa">
                      Esencia de Lavanda Francesa
                    </option>
                    <option value="Azahar & Cítricos Verdes">
                      Azahar & Cítricos Verdes
                    </option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ECEAE4] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#7A7B85] block">
                    Total con 20% Descuento Aplicado:
                  </span>
                  <span className="text-2xl font-extrabold text-[#12131A]">
                    ${builderSize * 1.5 + 10}.00 USD
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleAddToCart({
                      id: `custom-${builderStyle}-${builderSize}`,
                      name: `Ramo Autor: ${builderStyle} (${builderSize} tallos)`,
                      price: builderSize * 1.5 + 10,
                      image: builderStyle.includes("Escabiosa")
                        ? "/images/bouquet-lavender.png"
                        : builderStyle.includes("Tulipanes")
                        ? "/images/bouquet-citrus.png"
                        : "/images/kraft-white-roses.png",
                    })
                  }
                  className="bg-[#0F111A] text-white text-xs font-semibold px-7 py-3.5 hover:bg-[#F28B30] transition-colors cursor-pointer"
                >
                  Añadir Ramo Personalizado ↗
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT HALF: Pistachio-Lime (#ABC94C) Calculadora de Delivery en 20 Minutos */}
        <div
          id="envios-express"
          className="relative bg-[#ABC94C] p-8 sm:p-14 lg:p-20 flex flex-col justify-between overflow-hidden"
        >
          {/* Watermark Typography */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none font-thin-serif text-[160px] text-white/20 absolute -bottom-10 right-0 leading-none"
          >
            rápido
          </span>

          <div className="relative z-10 space-y-6 max-w-xl">
            <span className="inline-block text-[10.5px] uppercase tracking-[0.26em] bg-[#12131A] text-[#FFF083] font-bold px-3.5 py-1.5">
              GARANTÍA PUNTUAL • 20% DESCUENTO
            </span>
            <h2 className="font-display-serif text-[40px] sm:text-[52px] font-bold leading-[1.08] text-[#12131A]">
              Del invernadero a tu puerta en{" "}
              <span className="underline decoration-[#FFF083] decoration-4">
                20 minutos.
              </span>
            </h2>
            <p className="text-sm text-[#1F2909] leading-relaxed">
              Verifica tu dirección de entrega inmediata y recibe un{" "}
              <strong>20% de descuento automático</strong> en tu orden hoy
              mismo.
            </p>

            {/* Interactive Express Address Checker */}
            <div className="bg-[#0F111A] text-white p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#FFF083] font-semibold uppercase tracking-wider">
                  ⚡ Cobertura Express Activa
                </span>
                <span className="bg-[#F16B58] text-white text-[10px] font-bold px-2.5 py-1">
                  18 - 22 MIN
                </span>
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1.5">
                  Ingresa tu calle o zona de entrega:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={deliveryPostal}
                    onChange={(e) => setDeliveryPostal(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFF083]"
                  />
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="bg-[#F28B30] text-white text-xs font-bold px-5 py-3 hover:bg-[#FFF083] hover:text-[#12131A] transition-colors cursor-pointer shrink-0"
                  >
                    Pedir Ahora
                  </button>
                </div>
              </div>
              <p className="text-[11.5px] text-[#ABC94C]">
                ✓ Repartidor floral climatizado disponible a 1.4 km de{" "}
                <span className="underline">{deliveryPostal}</span>
              </p>
            </div>

            {/* 4 Step Mini Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {DELIVERY_FEATURES.map((feat) => (
                <div
                  key={feat.num}
                  className="bg-white/95 p-4 shadow-sm flex items-start gap-3.5"
                >
                  <span
                    style={{ backgroundColor: feat.color }}
                    className="w-8 h-8 font-display-serif font-bold text-sm text-[#12131A] flex items-center justify-center shrink-0"
                  >
                    {feat.num}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#12131A]">
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-[#5B5C66] mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CONTINUATION SECTION 3: FOOTER EDITORIAL COMPLETO
      ===================================================================== */}
      <footer className="bg-[#0F111A] text-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-6 h-6 text-[#FFF083]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 18 C6 10 11 5 19 5 C19 13 14 18 6 18 Z" />
                  <path d="M5 19 L19 5" strokeLinecap="round" />
                </svg>
                <span className="font-display-serif text-2xl tracking-[0.04em] font-medium uppercase">
                  FLORA
                </span>
              </div>
              <p className="text-xs text-white/65 max-w-sm leading-relaxed">
                La belleza alrededor nuestro convertida en ramos inolvidables.
                Diseño floral de autor y entrega ultrarrápida a domicilio con
                20% de descuento en pedidos a tiempo.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-xs">
              <p className="text-[#FFF083] font-bold uppercase tracking-[0.2em] mb-3">
                Navegación Rápida
              </p>
              <ul className="space-y-2 text-white/75">
                <li>
                  <a href="#inicio-rapido" className="hover:text-white">
                    Inicio — Pide Flores Muy Rápido
                  </a>
                </li>
                <li>
                  <a href="#coleccion-botanica" className="hover:text-white">
                    Colección Split — La Belleza Alrededor Nuestro
                  </a>
                </li>
                <li>
                  <a href="#catalogo-floral" className="hover:text-white">
                    Catálogo Pop-Out de Ramos y Floreros
                  </a>
                </li>
                <li>
                  <a href="#experiencia-dual" className="hover:text-white">
                    Atelier Personalizado & Envío en 20 Minutos
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2.5 text-xs">
              <p className="text-[#D3B5ED] font-bold uppercase tracking-[0.2em] mb-3">
                Atención & Horarios
              </p>
              <p className="text-white/75">Lunes a Domingo: 6:00 AM – 11:00 PM</p>
              <p className="text-white/75">Entrega Express Garantizada</p>
              <p className="text-[#ABC94C] font-semibold pt-2">
                ★ 4.9 / 5.0 (2M+ Reseñas de Clientes)
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© 2026 FLORA Atelier Botánico. Todos los derechos reservados.</p>
            <p>Diseño adaptable Dual (Editorial Express + Split Artístico)</p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          SLIDE-OVER EXPRESS SHOPPING CART DRAWER (With 20% On-Time Discount)
      ===================================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-[#0F111A]/60 backdrop-blur-xs"
            onClick={() => {
              setOrderSuccess(false);
              setIsCartOpen(false);
            }}
          />
          <aside className="relative z-10 w-full max-w-md bg-[#F7F6F2] text-[#12131A] h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-6 bg-white border-b border-[#E5E4DC] flex items-center justify-between sticky top-0 z-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F28B30] block">
                  20% DESCUENTO APLICADO
                </span>
                <h3 className="font-display-serif text-2xl font-bold">
                  Tu Pedido Express
                </h3>
              </div>
              <button
                onClick={() => {
                  setOrderSuccess(false);
                  setIsCartOpen(false);
                }}
                className="w-9 h-9 bg-[#F7F6F2] text-[#12131A] font-bold flex items-center justify-center hover:bg-[#0F111A] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex-1 space-y-5">
              {orderSuccess ? (
                <div className="bg-white p-8 text-center space-y-4 border-2 border-[#ABC94C] my-8">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#ABC94C] text-white flex items-center justify-center text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-display-serif text-2xl font-bold">
                    ¡Tu Ramo Va en Camino!
                  </h4>
                  <p className="text-xs text-[#5B5C66] leading-relaxed">
                    Hemos activado tu{" "}
                    <strong className="text-[#12131A]">
                      20% de Descuento en Pedidos a Tiempo
                    </strong>
                    . Tu repartidor llegará en aproximadamente{" "}
                    <strong className="text-[#12131A]">19 minutos</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setOrderSuccess(false);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3.5 bg-[#0F111A] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Seguir Explorando
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#FFF083] flex items-center justify-center text-2xl">
                    ✿
                  </div>
                  <p className="font-display-serif text-2xl font-bold">
                    Tu bolsa está vacía
                  </p>
                  <p className="text-xs text-[#5B5C66] max-w-xs mx-auto">
                    Agrega cualquier ramo o florero y recibe automáticamente un
                    20% de descuento en tu orden a tiempo.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-3.5 flex items-center gap-4 border border-[#E5E4DC]"
                      >
                        <div className="w-16 h-16 bg-[#FFF083] flex items-center justify-center shrink-0 p-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#12131A] truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#F28B30] font-bold">
                            ${item.price}.00
                          </p>
                          <div className="flex items-center gap-2.5 mt-1.5">
                            <button
                              onClick={() => handleUpdateQty(item.id, -1)}
                              className="w-6 h-6 bg-[#F7F6F2] text-xs font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQty(item.id, 1)}
                              className="w-6 h-6 bg-[#F7F6F2] text-xs font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="font-bold text-sm">
                          ${item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    id="express-order-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOrderSuccess(true);
                      setTimeout(() => setCart([]), 400);
                    }}
                    className="bg-white p-5 border border-[#E5E4DC] space-y-3.5"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#355E4B]">
                      Datos de Entrega Express
                    </p>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Nombre de quien recibe las flores"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F6F2] border border-[#E5E4DC] focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={deliveryPostal}
                      onChange={(e) => setDeliveryPostal(e.target.value)}
                      placeholder="Dirección exacta de entrega"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F6F2] border border-[#E5E4DC] focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      value={dedicationNote}
                      onChange={(e) => setDedicationNote(e.target.value)}
                      placeholder="Dedicatoria especial para la tarjeta (Gratis)"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F6F2] border border-[#E5E4DC] focus:outline-none"
                    />
                  </form>
                </>
              )}
            </div>

            {cart.length > 0 && !orderSuccess && (
              <div className="p-6 bg-white border-t border-[#E5E4DC] space-y-3">
                <div className="flex justify-between text-xs text-[#5B5C66]">
                  <span>Subtotal</span>
                  <span>${rawSubtotal}.00 USD</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#F28B30]">
                  <span>20% Descuento (En Pedidos a Tiempo)</span>
                  <span>-${discountAmount}.00 USD</span>
                </div>
                <div className="flex justify-between text-lg font-extrabold text-[#12131A] pt-2 border-t border-[#ECEAE4]">
                  <span>Total Final</span>
                  <span>${finalTotal}.00 USD</span>
                </div>
                <button
                  type="submit"
                  form="express-order-form"
                  className="w-full py-4 bg-[#0F111A] text-white text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#F28B30] transition-colors cursor-pointer"
                >
                  Confirmar Pedido Muy Rápido ↗
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

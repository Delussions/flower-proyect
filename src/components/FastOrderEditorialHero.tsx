"use client";

import React, { useState } from "react";

interface FastOrderEditorialHeroProps {
  scrollY: number;
  mousePos: { x: number; y: number };
  cartCount: number;
  onOpenCart: () => void;
  onAddToCart: (item: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
}

const HERO_REVIEWS = [
  {
    num: "01",
    title: "¡Luce increíble, se siente increíble!",
    text: "Mi florería favorita por fin, me encanta muchísimo, aquí da verdadero gusto pedir ramos frescos a domicilio.",
  },
  {
    num: "02",
    title: "¡Entrega en 18 minutos exactos!",
    text: "Pedí el ramo de rosas blancas en papel kraft con canela y llegó impecable, con un aroma botánico espectacular.",
  },
  {
    num: "03",
    title: "¡Calidad de atelier en cada pétalo!",
    text: "Las orquídeas y rosas duraron más de dos semanas frescas en su jarrón de cristal. Servicio insuperable.",
  },
];

/**
 * Exact 1:1 recreation of Reference Image 2 ("Order Flower Very Fast." -> "Pide Flores Muy Rápido.").
 */
export default function FastOrderEditorialHero({
  scrollY,
  mousePos,
  cartCount,
  onOpenCart,
  onAddToCart,
}: FastOrderEditorialHeroProps) {
  const [reviewIdx, setReviewIdx] = useState(0);
  const activeReview = HERO_REVIEWS[reviewIdx];
  const clampedScroll = Math.min(Math.max(scrollY, 0), 800);

  return (
    <section
      id="inicio-rapido"
      className="relative bg-[#F7F6F2] text-[#12131A] pt-6 pb-16 lg:pb-24 overflow-hidden"
    >
      {/* Architectural Wireframe Grid on Center-Right (Matching Reference Image 2) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-full lg:w-[64%] h-[78%] bg-wireframe-grid opacity-95"
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* ===============================================================
            TOP NAVBAR: Leaf Emblem + "FLORA" | Links | Search, User & Orange Bag Circle
        =============================================================== */}
        <header className="flex items-center justify-between py-4 mb-8 lg:mb-12">
          {/* Left Brand Logo ("Ø FLOWER" -> "Ø FLORA") */}
          <a
            href="#inicio-rapido"
            className="flex items-center gap-2.5 text-[#12131A] group"
          >
            {/* Diagonal Leaf-in-Circle Emblem */}
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 18 C6 10 11 5 19 5 C19 13 14 18 6 18 Z" />
              <path d="M5 19 L19 5" strokeLinecap="round" />
            </svg>
            <span className="font-display-serif text-[22px] tracking-[0.04em] font-medium uppercase">
              FLORA
            </span>
          </a>

          {/* Center Navigation Links ("Home", "Products", "Shop", "About") */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11 text-[13.5px] font-medium text-[#1E1F26]">
            <a
              href="#inicio-rapido"
              className="hover:text-[#F28B30] transition-colors"
            >
              Inicio
            </a>
            <a
              href="#catalogo-floral"
              className="hover:text-[#F28B30] transition-colors"
            >
              Productos
            </a>
            <a
              href="#coleccion-botanica"
              className="hover:text-[#F28B30] transition-colors"
            >
              Tienda
            </a>
            <a
              href="#envios-express"
              className="hover:text-[#F28B30] transition-colors"
            >
              Nosotros
            </a>
          </nav>

          {/* Right Icons: Search, User, and Vibrant Orange Circle Bag (#F28B30) */}
          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href="#catalogo-floral"
              aria-label="Buscar ramos"
              className="text-[#12131A] hover:text-[#F28B30] transition-colors"
            >
              <svg
                className="w-[19px] h-[19px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.8-3.8" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="#envios-express"
              aria-label="Cuenta de cliente"
              className="text-[#12131A] hover:text-[#F28B30] transition-colors"
            >
              <svg
                className="w-[19px] h-[19px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path
                  d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            {/* Solid Vibrant Orange Circle (#F28B30) with White Shopping Bag */}
            <button
              onClick={onOpenCart}
              aria-label="Abrir carrito"
              className="relative w-11 h-11 rounded-full bg-[#F28B30] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(242,139,48,0.35)] hover:bg-[#e0791e] hover:scale-105 transition-all cursor-pointer"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                viewBox="0 0 24 24"
              >
                <path d="M6 8h12l1 12H5L6 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#12131A] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* ===============================================================
            MAIN HERO 2-COLUMN GRID
        =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* ---------------- LEFT COLUMN ---------------- */}
          <div
            style={{
              transform: `translate3d(${mousePos.x * 6}px, ${
                clampedScroll * -0.04
              }px, 0)`,
            }}
            className="lg:col-span-6 space-y-7 transition-transform duration-300 ease-out"
          >
            {/* Mixed Weight Display Serif Headline with Pastel Pink Highlight on "Pide" */}
            <h1 className="text-[54px] sm:text-[72px] xl:text-[80px] leading-[1.06] tracking-[-0.02em] text-[#12131A]">
              <span className="inline-block relative font-display-serif font-bold mr-3 sm:mr-4">
                {/* Pastel Pink Highlight Box behind second half of first word */}
                <span
                  aria-hidden="true"
                  className="pink-word-highlight absolute right-[-6px] top-[14%] bottom-[10%] w-[68%] -z-10"
                />
                Pide
              </span>
              <span className="font-thin-serif font-light text-[58px] sm:text-[78px] xl:text-[86px] tracking-[-0.01em]">
                Flores
              </span>
              <br />
              <span className="font-display-serif font-bold">Muy Rápido.</span>
            </h1>

            {/* 2-Line Subtitle */}
            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#3F4048] max-w-[460px]">
              Envía magníficos ramos de flores diseñados para toda ocasión.
              <br />
              Arreglos hermosos, hechos con amor.
            </p>

            {/* CTA Buttons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-7 sm:gap-9">
              {/* Primary Dark Midnight Button ("Shop Now ↗" -> "Comprar Ahora ↗") */}
              <button
                onClick={() =>
                  onAddToCart({
                    id: "ramo-kraft-principal",
                    name: "Ramo Taze Rosas Blancas & Kraft",
                    price: 42,
                    image: "/images/kraft-white-roses.png",
                  })
                }
                className="bg-[#0F111A] text-white text-[13.5px] font-medium px-8 py-4 flex items-center gap-3 shadow-[0_14px_30px_rgba(15,17,26,0.18)] hover:bg-[#F28B30] transition-colors cursor-pointer group"
              >
                <span>Comprar Ahora</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </button>

              {/* Secondary Underlined Link with Circular Arrow ("View Product (↗)") */}
              <a
                href="#catalogo-floral"
                className="inline-flex items-center gap-4 pb-2.5 border-b border-[#12131A] text-[13.5px] font-medium text-[#12131A] hover:text-[#F28B30] hover:border-[#F28B30] transition-colors group"
              >
                <span>Ver Productos</span>
                <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-[11px] transition-transform duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </a>
            </div>

            {/* Social Proof Stats Row: 200k+ & 2M+ */}
            <div className="pt-6 flex flex-wrap items-center gap-10 sm:gap-14">
              {/* Stat 1: Overlapping Avatars + 200k+ Clientes Felices */}
              <div className="flex items-center gap-3.5">
                <img
                  src="/images/avatars-200k.png"
                  alt="Clientes felices"
                  className="h-11 w-auto object-contain select-none"
                />
                <div>
                  <p className="text-[21px] font-extrabold leading-none text-[#12131A]">
                    200k+
                  </p>
                  <p className="text-[12px] text-[#5B5C66] mt-1">
                    Clientes Felices
                  </p>
                </div>
              </div>

              {/* Stat 2: Lilac Circle (#CE9FFC) + 2M+ Reseñas de Clientes */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#CE9FFC] text-white flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(206,159,252,0.4)]">
                  {/* Thumbs Up Outline Icon */}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3zm0 0l4.2-6.3A1.5 1.5 0 0 1 13.7 6v3.5h4.6a2 2 0 0 1 1.9 2.4l-1.3 6.5a2 2 0 0 1-2 1.6H7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[21px] font-extrabold leading-none text-[#12131A]">
                    2M+
                  </p>
                  <p className="text-[12px] text-[#5B5C66] mt-1">
                    Reseñas de Clientes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN: GEOMETRIC YELLOW BOX + KRAFT BOUQUET ---------------- */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end pt-6 lg:pt-2">
            {/* Decorative 8-Point Asterisk Star on Top-Left of Grid */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * -10}px, ${
                  mousePos.y * -10
                }px, 0) rotate(${clampedScroll * 0.2}deg)`,
              }}
              className="hidden sm:block absolute -top-2 left-2 lg:left-6 text-[#12131A] z-20 transition-transform duration-300 ease-out"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" />
                <line x1="19.1" y1="4.9" x2="4.9" y2="19.1" />
              </svg>
            </div>

            {/* Decorative 4-Point Diamond Sparkle above Discount Card */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * 12}px, ${
                  mousePos.y * 12
                }px, 0)`,
              }}
              className="hidden sm:block absolute bottom-28 left-8 lg:left-14 text-[#12131A] z-20 transition-transform duration-300 ease-out"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 L14.8 9.2 L22 12 L14.8 14.8 L12 22 L9.2 14.8 L2 12 L9.2 9.2 Z" />
              </svg>
            </div>

            {/* Main Collage Wrapper */}
            <div className="relative w-full max-w-[445px] aspect-square">
              {/* Top-Left Deep Forest Green Accent Block (#355E4B) */}
              <div
                style={{
                  transform: `translate3d(${mousePos.x * -8}px, ${
                    clampedScroll * -0.03
                  }px, 0)`,
                }}
                className="absolute -top-6 left-[21%] w-[24%] h-10 bg-[#355E4B] z-0 transition-transform duration-300 ease-out"
              />

              {/* Bottom-Right Coral-Red Accent L-Block (#F16B58) */}
              <div
                style={{
                  transform: `translate3d(${mousePos.x * 10}px, ${
                    clampedScroll * 0.04
                  }px, 0)`,
                }}
                className="absolute -bottom-6 -right-6 w-[25%] h-[55%] bg-[#F16B58] z-0 transition-transform duration-300 ease-out"
              />

              {/* Butter-Yellow Main Square (#FFF083) */}
              <div
                style={{
                  transform: `translate3d(${mousePos.x * -6}px, ${
                    clampedScroll * 0.02
                  }px, 0)`,
                }}
                className="relative z-10 w-full h-full bg-[#FFF083] flex items-end justify-center overflow-visible transition-transform duration-300 ease-out"
              >
                {/* White Roses & Lime Chrysanthemums in Kraft Paper with Raffia & Cinnamon */}
                <img
                  src="/images/kraft-white-roses.png"
                  alt="Ramo de rosas blancas y crisantemos verdes en papel kraft"
                  style={{
                    transform: `translate3d(${mousePos.x * -14}px, ${
                      mousePos.y * -12
                    }px, 0) scale(1.07)`,
                  }}
                  className="w-[96%] h-[106%] -mt-6 object-contain object-bottom drop-shadow-[0_22px_30px_rgba(40,34,15,0.16)] transition-transform duration-300 ease-out select-none pointer-events-none"
                />
              </div>

              {/* Floating White Discount Card ("20% Discount / On Time Order" -> "20% Descuento / En Pedidos a Tiempo") */}
              <div
                style={{
                  transform: `translate3d(${mousePos.x * 14}px, ${
                    mousePos.y * 10
                  }px, 0)`,
                }}
                className="absolute bottom-7 -left-5 sm:-left-16 z-30 bg-white px-4 py-3.5 shadow-[0_20px_45px_rgba(18,19,26,0.10)] flex items-center gap-3.5 transition-transform duration-300 ease-out"
              >
                <div className="w-9 h-9 bg-[#FFF0E5] text-[#F28B30] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l2.4 1.8 3-.4 1.1 2.8 2.8 1.1-.4 3L22.7 12l-1.8 2.4.4 3-2.8 1.1-1.1 2.8-3-.4L12 22.7l-2.4-1.8-3 .4-1.1-2.8-2.8-1.1.4-3L1.3 12l1.8-2.4-.4-3 2.8-1.1 1.1-2.8 3 .4L12 2z" />
                    <path d="M9 15l6-6" strokeLinecap="round" />
                    <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
                    <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div className="pr-2">
                  <p className="text-[13px] font-extrabold text-[#12131A] leading-tight">
                    20% Descuento
                  </p>
                  <p className="text-[11px] text-[#7A7B85] mt-0.5">
                    En Pedidos a Tiempo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===============================================================
            BOTTOM BAR: 2 POP-OUT PASTEL CARDS + 4.9 CUSTOMER REVIEW SLIDER
        =============================================================== */}
        <div className="mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* Left 2 Pop-Out Mini Bouquet Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
            {/* Card 1: Soft Sage Green (#DCE7D6) + Red Roses & White Orchids Vase */}
            <div className="relative bg-[#DCE7D6] p-5 min-h-[142px] flex items-center justify-end group">
              <img
                src="/images/vase-red-orchids.png"
                alt="Florero de rosas rojas y orquídeas blancas"
                className="w-[155px] sm:w-[165px] h-[185px] object-contain absolute -left-1 bottom-2 drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1 pointer-events-none"
              />
              <div className="w-[52%] pl-2 space-y-1.5">
                <h3 className="text-[14px] font-medium text-[#1E1F26]">
                  Ramo Orquídea Real
                </h3>
                <p className="text-[15px] font-bold text-[#12131A]">$25.00</p>
                <button
                  onClick={() =>
                    onAddToCart({
                      id: "florero-orquidea-roja",
                      name: "Ramo Orquídea Real en Florero",
                      price: 25,
                      image: "/images/vase-red-orchids.png",
                    })
                  }
                  className="mt-1 bg-[#0F111A] text-white text-[10.5px] font-medium px-4 py-2 hover:bg-[#F28B30] transition-colors cursor-pointer"
                >
                  Comprar
                </button>
              </div>
            </div>

            {/* Card 2: Soft Peach Sand (#F6E4C8) + Blush Roses in Bronze Vase */}
            <div className="relative bg-[#F6E4C8] p-5 min-h-[142px] flex items-center justify-end group">
              <img
                src="/images/vase-blush-roses.png"
                alt="Florero bronce con rosas rubor y coral"
                className="w-[148px] sm:w-[158px] h-[180px] object-contain absolute left-1 bottom-2 drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1 pointer-events-none"
              />
              <div className="w-[52%] pl-2 space-y-1.5">
                <h3 className="text-[14px] font-medium text-[#1E1F26]">
                  Ramo Bronce Rosé
                </h3>
                <p className="text-[15px] font-bold text-[#12131A]">$25.00</p>
                <button
                  onClick={() =>
                    onAddToCart({
                      id: "florero-bronce-rose",
                      name: "Ramo Bronce Rosé Imperial",
                      price: 25,
                      image: "/images/vase-blush-roses.png",
                    })
                  }
                  className="mt-1 bg-[#0F111A] text-white text-[10.5px] font-medium px-4 py-2 hover:bg-[#F28B30] transition-colors cursor-pointer"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>

          {/* Right Editorial Review Block ("★★★★★ 4.9  01 ——————— 07") */}
          <div className="lg:col-span-5 lg:pl-6 space-y-3">
            {/* Stars + 4.9 + Progress Line 01 ———— 07 */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-[#F16B58] text-sm">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span className="font-extrabold text-[13px] text-[#12131A]">
                4.9
              </span>
              <span className="text-[11.5px] text-[#5B5C66] ml-2">
                {activeReview.num}
              </span>
              <div className="flex-1 h-[1px] bg-[#D6D5CE] relative overflow-hidden">
                <div
                  style={{
                    width: `${((reviewIdx + 1) / HERO_REVIEWS.length) * 100}%`,
                  }}
                  className="absolute inset-y-0 left-0 bg-[#12131A] transition-all duration-300"
                />
              </div>
              <button
                onClick={() =>
                  setReviewIdx((prev) => (prev + 1) % HERO_REVIEWS.length)
                }
                title="Siguiente reseña"
                className="text-[11.5px] text-[#8E8F99] hover:text-[#12131A] transition-colors cursor-pointer"
              >
                07 →
              </button>
            </div>

            {/* Quote Icon + Bold Heading */}
            <div className="flex items-center gap-3 pt-1">
              {/* Double Quote Outline SVG matching reference */}
              <svg
                className="w-6 h-6 text-[#12131A] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7c0 2.2-1.8 4-4 4" />
                <path d="M20 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7c0 2.2-1.8 4-4 4" />
              </svg>
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#12131A] tracking-[-0.01em]">
                {activeReview.title}
              </h3>
            </div>

            {/* Review Paragraph */}
            <p className="text-[13px] leading-[1.7] text-[#4E4F59] max-w-md">
              {activeReview.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

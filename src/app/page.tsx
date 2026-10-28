"use client";

import React, { useEffect, useState } from "react";
import CurvedArchText from "@/components/CurvedArchText";
import InteractiveMap from "@/components/InteractiveMap";
import CartDrawer, { CartEntry } from "@/components/CartDrawer";
import {
  MAIN_BOUQUETS,
  WEEKLY_BENTO_BOUQUETS,
  STORE_LOCATIONS,
  TESTIMONIALS,
  DELIVERY_STEPS,
  SUBSCRIPTION_PLANS,
  BouquetItem,
} from "@/data/bouquets";

export default function FloraliaLandingPage() {
  // Parallax state (scroll + mouse 3D tilt)
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Search & Catalog filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllBouquets, setShowAllBouquets] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  // Store locator state
  const [selectedStoreId, setSelectedStoreId] = useState<string>(
    STORE_LOCATIONS[0].id
  );
  const [pickupInput, setPickupInput] = useState<string>(
    STORE_LOCATIONS[0].pickupPoint
  );
  const [dropoffInput, setDropoffInput] = useState<string>(
    "Av. Paseo de la Reforma 240, Depto 8B"
  );

  // Custom Bouquet Builder state (Continuation section)
  const [customFlower, setCustomFlower] = useState("Rosas Blancas de Jardín");
  const [customStems, setCustomStems] = useState(24);
  const [customWrap, setCustomWrap] = useState("Lino Champán Natural");

  // Cart state
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll & mouse parallax listeners
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Sync store selector with pickup input
  const handleSelectStore = (id: string) => {
    setSelectedStoreId(id);
    const found = STORE_LOCATIONS.find((s) => s.id === id);
    if (found) {
      setPickupInput(found.pickupPoint);
    }
  };

  // Add item to cart with toast feedback
  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setToastMessage(`"${item.name}" añadido a tu cesta floral`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
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

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter bouquets by search and category
  const filteredBouquets: BouquetItem[] = MAIN_BOUQUETS.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      activeCategory === "todos" || b.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const displayedBouquets =
    showAllBouquets || searchQuery.trim() !== "" || activeCategory !== "todos"
      ? filteredBouquets
      : filteredBouquets.slice(0, 3);

  // Clamped parallax offsets so layout remains crisp at all scroll depths
  const heroScrollOffset = Math.min(scrollY, 700);
  const catalogScrollOffset = Math.max(0, Math.min(scrollY - 350, 700));
  const bentoScrollOffset = Math.max(0, Math.min(scrollY - 1050, 700));

  return (
    <div className="min-h-screen bg-white text-[#2E2A27] relative">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2E2A27] text-[#F6EFE2] px-5 py-3.5 shadow-2xl border-l-4 border-[#A8762A] flex items-center gap-3 animate-bounce">
          <span className="text-[#D5A362]">✿</span>
          <span className="text-xs tracking-wide">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[11px] uppercase tracking-[0.18em] text-[#D5A362] underline ml-2 cursor-pointer"
          >
            Ver Cesta
          </button>
        </div>
      )}

      {/* =====================================================================
          1. HERO + HEADER SECTION (EXACT RECREATION OF REFERENCE TOP-LEFT)
          Background: Warm Champagne Cream (#F6EFE2)
      ===================================================================== */}
      <section
        id="inicio"
        className="relative bg-[#F6EFE2] overflow-hidden pt-6 pb-20 lg:pb-28 transition-colors"
      >
        {/* Subtle Decorative Parallax Botanical Particles in Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            style={{
              transform: `translate3d(${mousePos.x * -18}px, ${
                heroScrollOffset * 0.18 + mousePos.y * -18
              }px, 0)`,
            }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#EDE3D2]/60 blur-3xl transition-transform duration-300 ease-out"
          />
          <div
            style={{
              transform: `translate3d(${mousePos.x * 22}px, ${
                heroScrollOffset * -0.12 + mousePos.y * 22
              }px, 0)`,
            }}
            className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#E8DEC8]/50 blur-3xl transition-transform duration-300 ease-out"
          />
        </div>

        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          {/* ---------------- NAVBAR ---------------- */}
          <header className="flex items-center justify-between py-3 mb-10 lg:mb-14">
            {/* Brand Logo ("Flowery" -> "Floralia") */}
            <a
              href="#inicio"
              className="text-[22px] font-medium tracking-[-0.02em] text-[#2E2A27] hover:opacity-80 transition-opacity"
            >
              Floralia
            </a>

            {/* Center Navigation Links (5 links matching reference) */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[13px] text-[#8C857B]">
              <a
                href="#inicio"
                className="relative text-[#2E2A27] font-medium py-1"
              >
                Inicio
                {/* Exact short active indicator bar under first link */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[1.5px] bg-[#2E2A27]" />
              </a>
              <a
                href="#servicios"
                className="hover:text-[#2E2A27] transition-colors py-1"
              >
                Servicios
              </a>
              <a
                href="#catalogo"
                className="hover:text-[#2E2A27] transition-colors py-1"
              >
                Listos para comprar
              </a>
              <a
                href="#precios"
                className="hover:text-[#2E2A27] transition-colors py-1"
              >
                Precios
              </a>
              <a
                href="#nosotros"
                className="hover:text-[#2E2A27] transition-colors py-1"
              >
                Nosotros
              </a>
            </nav>

            {/* Right Search Box + Divider + Shopping Bag with Gold Badge */}
            <div className="flex items-center gap-3">
              <div className="bg-white flex items-center h-11 px-3.5 shadow-[0_2px_15px_rgba(46,42,39,0.04)]">
                {/* Search Icon */}
                <svg
                  className="w-3.5 h-3.5 text-[#9A9389] mr-2.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  aria-label="Buscar ramos de flores"
                  className="w-28 sm:w-36 lg:w-40 text-[12px] text-[#2E2A27] placeholder-[#B0A99F] bg-transparent focus:outline-none"
                />
                {/* Vertical Divider inside White Box */}
                <span className="h-5 w-[1px] bg-[#EBE6DF] mx-3" />
                {/* Shopping Bag Button with Gold Badge */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1 text-[#4A443F] hover:text-[#A8762A] transition-colors cursor-pointer"
                  aria-label="Abrir cesta de compras"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 7h12l1 13H5L6 7z" />
                    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                  </svg>
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#A8762A] text-white text-[9px] font-semibold flex items-center justify-center leading-none">
                    {totalCartItems}
                  </span>
                </button>
              </div>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-11 h-11 bg-white text-[#2E2A27] flex items-center justify-center"
                aria-label="Abrir menú"
              >
                ☰
              </button>
            </div>
          </header>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white p-5 mb-8 border border-[#E5DEC9] flex flex-col gap-3 text-sm">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium text-[#2E2A27]"
              >
                Inicio
              </a>
              <a
                href="#servicios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8C857B]"
              >
                Servicios
              </a>
              <a
                href="#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8C857B]"
              >
                Listos para comprar
              </a>
              <a
                href="#precios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8C857B]"
              >
                Precios
              </a>
              <a
                href="#nosotros"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8C857B]"
              >
                Nosotros
              </a>
            </div>
          )}

          {/* ---------------- 3-COLUMN HERO GRID ---------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-4 pt-2">
            {/* LEFT COLUMN: Editorial Heading, Subtitle & CTAs */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * 6}px, ${
                  heroScrollOffset * -0.08
                }px, 0)`,
              }}
              className="lg:col-span-5 z-20 transition-transform duration-300 ease-out"
            >
              <h1 className="font-editorial text-[54px] sm:text-[68px] xl:text-[76px] leading-[1.02] tracking-[-0.02em] text-[#2E2A27] font-normal lg:-mr-16 relative z-20">
                Regalos perfectos
                <br />
                para ti
              </h1>

              <p className="mt-6 text-[13.5px] sm:text-[14px] leading-[1.7] text-[#8C857B] max-w-[305px]">
                Envía a tu persona favorita las mejores flores frescas,
                seleccionadas para tu persona favorita.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  href="#catalogo"
                  className="bg-[#4A443F] text-[#F6EFE2] text-[12.5px] font-normal px-7 py-3.5 shadow-[0_10px_25px_rgba(74,68,63,0.18)] hover:bg-[#2E2A27] transition-all duration-300"
                >
                  Comenzar Ahora
                </a>
                <a
                  href="#servicios"
                  className="text-[12.5px] text-[#2E2A27] font-medium flex items-center gap-1.5 hover:text-[#A8762A] transition-colors group"
                >
                  <span>Cómo funciona</span>
                  <span className="text-[13px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>

            {/* CENTER COLUMN: Curved "Demuestra tu amor" + Warm Greige Arch + White Roses Cutout + "DESDE 2021" */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative z-10">
              {/* Curved SVG Text following the top of the Arch */}
              <div
                style={{
                  transform: `translate3d(${mousePos.x * -8}px, ${
                    heroScrollOffset * -0.05 + mousePos.y * -6
                  }px, 0)`,
                }}
                className="w-[290px] sm:w-[330px] -mb-11 z-20 transition-transform duration-300 ease-out"
              >
                <CurvedArchText
                  id="hero-love"
                  text="Demuestra tu amor"
                  variant="top-center"
                />
              </div>

              {/* Central Botanical Arch Container */}
              <div
                style={{
                  transform: `translate3d(${mousePos.x * -10}px, ${
                    heroScrollOffset * 0.06 + mousePos.y * -8
                  }px, 0)`,
                }}
                className="relative w-[290px] sm:w-[335px] h-[380px] sm:h-[430px] flex items-end justify-center transition-transform duration-300 ease-out"
              >
                {/* The solid #DDD7D0 Arch Backdrop */}
                <div className="absolute inset-x-2 top-3 bottom-0 bg-[#DDD7D0] arch-top shadow-[inset_0_2px_20px_rgba(0,0,0,0.03)]" />

                {/* White Roses Studio Cutout with independent deeper parallax so petals slightly overflow the arch */}
                <img
                  src="/images/flowers/hero-white-roses.png"
                  alt="Ramo de rosas blancas frescas sostenido a mano"
                  style={{
                    transform: `translate3d(${mousePos.x * -16}px, ${
                      mousePos.y * -12
                    }px, 0) scale(1.09)`,
                  }}
                  className="relative z-10 w-full h-[106%] object-contain object-bottom drop-shadow-[0_18px_28px_rgba(46,42,39,0.14)] transition-transform duration-300 ease-out select-none pointer-events-none"
                />
              </div>

              {/* Bottom Spaced Label: "SINCE 2021" -> "DESDE 2021" */}
              <p className="mt-5 text-[10.5px] uppercase tracking-[0.34em] text-[#7D766D] font-medium">
                DESDE 2021
              </p>
            </div>

            {/* RIGHT COLUMN: 3 Vertical Metrics with White Icon Squares & Gold Icons */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * 10}px, ${
                  heroScrollOffset * -0.06
                }px, 0)`,
              }}
              className="lg:col-span-3 flex flex-row lg:flex-col justify-center lg:pl-10 gap-6 sm:gap-9 flex-wrap transition-transform duration-300 ease-out"
            >
              {/* Stat 1: 290 Tipos de flores */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white shadow-[0_6px_20px_rgba(46,42,39,0.05)] flex items-center justify-center shrink-0">
                  {/* Gold Eye Icon */}
                  <svg
                    className="w-5 h-5 text-[#A8762A]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" />
                    <circle
                      cx="12"
                      cy="12"
                      r="2.5"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-editorial text-[31px] leading-none text-[#2E2A27] font-normal">
                    290
                  </p>
                  <p className="text-[11.5px] text-[#8C857B] mt-1">
                    Tipos de flores
                  </p>
                </div>
              </div>

              {/* Stat 2: 500+ Estilos únicos */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white shadow-[0_6px_20px_rgba(46,42,39,0.05)] flex items-center justify-center shrink-0">
                  {/* Gold Sparkle / Botanical Style Icon */}
                  <svg
                    className="w-5 h-5 text-[#A8762A]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zm6.5 12l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1zM5.5 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-editorial text-[31px] leading-none text-[#2E2A27] font-normal">
                    500<span className="text-[22px] text-[#8C857B]">+</span>
                  </p>
                  <p className="text-[11.5px] text-[#8C857B] mt-1">
                    Estilos únicos
                  </p>
                </div>
              </div>

              {/* Stat 3: 1M Clientes felices */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white shadow-[0_6px_20px_rgba(46,42,39,0.05)] flex items-center justify-center shrink-0">
                  {/* Gold Star Icon */}
                  <svg
                    className="w-5 h-5 text-[#A8762A]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-editorial text-[31px] leading-none text-[#2E2A27] font-normal">
                    1M
                  </p>
                  <p className="text-[11.5px] text-[#8C857B] mt-1">
                    Clientes felices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. "ENCUENTRA TU RAMO DE FLORES PERFECTO" ("Find your perfect bouquet flower")
          Exact 2-Column Editorial Split Header + 3 Arches with Curved Gold Badges
      ===================================================================== */}
      <section
        id="catalogo"
        className="py-20 lg:py-28 bg-white relative overflow-hidden"
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Top 2-Column Split Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14 lg:mb-16">
            {/* Left Heading */}
            <div className="lg:col-span-6">
              <span className="text-[10.5px] uppercase tracking-[0.3em] text-[#8C857B] font-medium block mb-3">
                TIPO DE RAMO
              </span>
              <h2 className="font-editorial text-[42px] sm:text-[52px] leading-[1.08] tracking-[-0.015em] text-[#2E2A27] font-normal">
                Encuentra tu ramo
                <br />
                de flores perfecto
              </h2>
            </div>

            {/* Right Description + "Ver Todos" Button */}
            <div className="lg:col-span-6 lg:pl-8 pt-2 lg:pt-6">
              <p className="text-[13.5px] sm:text-[14px] leading-[1.75] text-[#7E776E] max-w-[430px]">
                Cada mañana seleccionamos flores frescas de invernadero para
                crear arreglos botánicos irrepetibles, listos para entregarse en
                la puerta de esa persona especial en 30 minutos.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setShowAllBouquets(!showAllBouquets)}
                  className="bg-[#4A443F] text-[#F6EFE2] text-[12px] px-8 py-3 hover:bg-[#2E2A27] transition-colors cursor-pointer"
                >
                  {showAllBouquets ? "Ver Destacados" : "Ver Todos"}
                </button>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: "todos", label: "Todos" },
                    { id: "romántico", label: "Románticos" },
                    { id: "aniversario", label: "Aniversario" },
                    { id: "cumpleaños", label: "Cumpleaños" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`text-[11px] px-3 py-1.5 border transition-colors cursor-pointer ${
                        activeCategory === cat.id
                          ? "border-[#A8762A] bg-[#F6EFE2] text-[#2E2A27] font-medium"
                          : "border-[#EAE5DD] text-[#8C857B] hover:border-[#C48F3A]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3-Arch Product Grid (Matches exact proportions & curved gold badges) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {displayedBouquets.map((bouquet, index) => {
              // Subtle differential scroll parallax per column
              const colParallax =
                index % 3 === 1
                  ? catalogScrollOffset * -0.04
                  : catalogScrollOffset * 0.025;

              return (
                <article
                  key={bouquet.id}
                  style={{
                    transform: `translate3d(0, ${colParallax}px, 0)`,
                  }}
                  className="group flex flex-col items-center transition-transform duration-300 ease-out"
                >
                  <div className="relative w-full max-w-[330px] aspect-[1/1.08] flex items-end justify-center">
                    {/* Curved Gold SVG Badge ("Más Vendido" / "Más Buscado") along Top-Left Arc */}
                    {bouquet.curvedBadge && (
                      <div className="absolute -top-3.5 -left-3.5 w-[260px] h-[260px] z-20 pointer-events-none">
                        <CurvedArchText
                          id={`badge-${bouquet.id}`}
                          text={bouquet.curvedBadge}
                          variant="top-left-gold"
                        />
                      </div>
                    )}

                    {/* Price Pill on Top-Right Hover */}
                    <div className="absolute top-5 right-5 z-20 bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-editorial font-semibold text-[#2E2A27] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ${bouquet.price} USD
                    </div>

                    {/* Light Alabaster Gray Arch (#F4F4F4) */}
                    <div className="w-full h-full bg-[#F4F4F4] arch-top overflow-hidden flex items-end justify-center relative pt-8 px-4 transition-colors duration-500 group-hover:bg-[#EFECE6]">
                      <img
                        src={bouquet.image}
                        alt={bouquet.name}
                        className="w-[88%] h-[92%] object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                    </div>
                  </div>

                  {/* Subtle Bouquet Name & Price on Hover / Subtitle */}
                  <div className="mt-5 text-center">
                    <p className="font-editorial text-xl text-[#2E2A27] opacity-85 group-hover:opacity-100 transition-opacity">
                      {bouquet.name}
                    </p>
                    <p className="text-[11px] text-[#8C857B] mt-0.5">
                      {bouquet.stems} tallos frescos • ${bouquet.price} USD
                    </p>
                  </div>

                  {/* Exact "SHOP NOW ->" ("COMPRAR AHORA ->") Spaced Link */}
                  <button
                    onClick={() => handleAddToCart(bouquet)}
                    className="mt-3.5 text-[10.5px] uppercase tracking-[0.28em] text-[#4A443F] hover:text-[#A8762A] font-medium flex items-center gap-3 transition-colors cursor-pointer group/btn"
                  >
                    <span>COMPRAR AHORA</span>
                    <span className="text-xs tracking-normal transition-transform duration-300 group-hover/btn:translate-x-1.5">
                      →
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. "LOS MEJORES RAMOS DE ESTA SEMANA" ("Top bouquet on this week")
          Exact 3-Column Asymmetric Bento Grid of 5 Directional Arches
      ===================================================================== */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Centered Header */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10.5px] uppercase tracking-[0.3em] text-[#8C857B] font-medium block mb-2.5">
              TIPO DE RAMO
            </span>
            <h2 className="font-editorial text-[40px] sm:text-[48px] leading-[1.1] text-[#2E2A27] font-normal">
              Los mejores ramos de esta semana
            </h2>
            <p className="mt-3 text-[13px] text-[#8C857B]">
              Selección semanal curada por nuestros floristas según la floración
              más fresca de cada jardín.
            </p>
          </div>

          {/* 3-Column Bento Grid matching exact directional curves of reference */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* LEFT COLUMN: 2 Stacked Cards */}
            <div className="md:col-span-4 flex flex-col gap-6 lg:gap-8 justify-between">
              {/* Top-Left Card: Rounded on the RIGHT side (arch-right) */}
              <div
                onClick={() =>
                  handleAddToCart({
                    id: WEEKLY_BENTO_BOUQUETS.leftTop.id,
                    name: WEEKLY_BENTO_BOUQUETS.leftTop.name,
                    price: WEEKLY_BENTO_BOUQUETS.leftTop.price,
                    image: WEEKLY_BENTO_BOUQUETS.leftTop.image,
                  })
                }
                className="group relative bg-[#F4F4F4] arch-right h-[210px] sm:h-[225px] overflow-hidden flex items-center justify-start cursor-pointer hover:bg-[#EFECE6] transition-colors"
              >
                <img
                  src={WEEKLY_BENTO_BOUQUETS.leftTop.image}
                  alt={WEEKLY_BENTO_BOUQUETS.leftTop.name}
                  className="w-[82%] h-[92%] object-contain object-left transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-editorial text-sm text-[#2E2A27]">
                    {WEEKLY_BENTO_BOUQUETS.leftTop.name} • $
                    {WEEKLY_BENTO_BOUQUETS.leftTop.price}
                  </p>
                </div>
              </div>

              {/* Bottom-Left Card: Rounded on TOP / Arch */}
              <div
                onClick={() =>
                  handleAddToCart({
                    id: WEEKLY_BENTO_BOUQUETS.leftBottom.id,
                    name: WEEKLY_BENTO_BOUQUETS.leftBottom.name,
                    price: WEEKLY_BENTO_BOUQUETS.leftBottom.price,
                    image: WEEKLY_BENTO_BOUQUETS.leftBottom.image,
                  })
                }
                className="group relative bg-[#F4F4F4] rounded-tr-[110px] h-[210px] sm:h-[225px] overflow-hidden flex items-end justify-start cursor-pointer hover:bg-[#EFECE6] transition-colors"
              >
                <img
                  src={WEEKLY_BENTO_BOUQUETS.leftBottom.image}
                  alt={WEEKLY_BENTO_BOUQUETS.leftBottom.name}
                  className="w-[80%] h-[92%] object-contain object-left-bottom transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-editorial text-sm text-[#2E2A27]">
                    {WEEKLY_BENTO_BOUQUETS.leftBottom.name} • $
                    {WEEKLY_BENTO_BOUQUETS.leftBottom.price}
                  </p>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: 1 Tall Full-Height Arch */}
            <div className="md:col-span-4 flex">
              <div
                onClick={() =>
                  handleAddToCart({
                    id: WEEKLY_BENTO_BOUQUETS.centerTall.id,
                    name: WEEKLY_BENTO_BOUQUETS.centerTall.name,
                    price: WEEKLY_BENTO_BOUQUETS.centerTall.price,
                    image: WEEKLY_BENTO_BOUQUETS.centerTall.image,
                  })
                }
                style={{
                  transform: `translate3d(0, ${bentoScrollOffset * -0.04}px, 0)`,
                }}
                className="group relative w-full bg-[#F4F4F4] arch-top min-h-[430px] sm:min-h-[475px] overflow-hidden flex items-end justify-center pt-8 px-4 cursor-pointer hover:bg-[#EFECE6] transition-all"
              >
                <img
                  src={WEEKLY_BENTO_BOUQUETS.centerTall.image}
                  alt={WEEKLY_BENTO_BOUQUETS.centerTall.name}
                  className="w-[92%] h-[95%] object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 inset-x-6 bg-white/95 backdrop-blur-xs py-2.5 px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <p className="font-editorial text-lg text-[#2E2A27]">
                    {WEEKLY_BENTO_BOUQUETS.centerTall.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#A8762A] font-semibold">
                    Añadir a la cesta • ${WEEKLY_BENTO_BOUQUETS.centerTall.price} USD
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 2 Stacked Directional Arch Cards */}
            <div className="md:col-span-4 flex flex-col gap-6 lg:gap-8 justify-between">
              {/* Top-Right Card: Rounded on the LEFT side (arch-left) */}
              <div
                onClick={() =>
                  handleAddToCart({
                    id: WEEKLY_BENTO_BOUQUETS.rightTop.id,
                    name: WEEKLY_BENTO_BOUQUETS.rightTop.name,
                    price: WEEKLY_BENTO_BOUQUETS.rightTop.price,
                    image: WEEKLY_BENTO_BOUQUETS.rightTop.image,
                  })
                }
                className="group relative bg-[#F4F4F4] arch-left h-[210px] sm:h-[225px] overflow-hidden flex items-center justify-center cursor-pointer hover:bg-[#EFECE6] transition-colors"
              >
                <img
                  src={WEEKLY_BENTO_BOUQUETS.rightTop.image}
                  alt={WEEKLY_BENTO_BOUQUETS.rightTop.name}
                  className="w-[78%] h-[88%] object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-editorial text-sm text-[#2E2A27]">
                    {WEEKLY_BENTO_BOUQUETS.rightTop.name} • $
                    {WEEKLY_BENTO_BOUQUETS.rightTop.price}
                  </p>
                </div>
              </div>

              {/* Bottom-Right Card: Rounded on the RIGHT side (arch-right) */}
              <div
                onClick={() =>
                  handleAddToCart({
                    id: WEEKLY_BENTO_BOUQUETS.rightBottom.id,
                    name: WEEKLY_BENTO_BOUQUETS.rightBottom.name,
                    price: WEEKLY_BENTO_BOUQUETS.rightBottom.price,
                    image: WEEKLY_BENTO_BOUQUETS.rightBottom.image,
                  })
                }
                className="group relative bg-[#F4F4F4] arch-right h-[210px] sm:h-[225px] overflow-hidden flex items-end justify-center cursor-pointer hover:bg-[#EFECE6] transition-colors"
              >
                <img
                  src={WEEKLY_BENTO_BOUQUETS.rightBottom.image}
                  alt={WEEKLY_BENTO_BOUQUETS.rightBottom.name}
                  className="w-[82%] h-[92%] object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-editorial text-sm text-[#2E2A27]">
                    {WEEKLY_BENTO_BOUQUETS.rightBottom.name} • $
                    {WEEKLY_BENTO_BOUQUETS.rightBottom.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CONTINUATION SECTION: "EL ARTE DEL DELIVERY FLORAL & ATELIER A MEDIDA"
          Coherent Editorial Continuation in Warm Champagne Cream (#F6EFE2)
      ===================================================================== */}
      <section
        id="servicios"
        className="py-20 lg:py-28 bg-[#F6EFE2] relative overflow-hidden"
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <span className="text-[10.5px] uppercase tracking-[0.3em] text-[#A8762A] font-semibold block mb-3">
                DEL JARDÍN A TU PUERTA EN 30 MINUTOS
              </span>
              <h2 className="font-editorial text-[40px] sm:text-[50px] leading-[1.08] text-[#2E2A27] font-normal">
                Cómo cuidamos cada pétalo en nuestro servicio de entrega
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[13.5px] leading-[1.75] text-[#7E776E]">
                Combinamos floristería artesanal de autor con logística express
                climatizada para que tu ramo llegue tan fresco como en el
                instante en que fue cortado.
              </p>
            </div>
          </div>

          {/* 4 Arch Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {DELIVERY_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-white/85 backdrop-blur-xs p-7 border border-[#E6DEC8] hover:border-[#A8762A] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-14 bg-[#DDD7D0] arch-top flex items-center justify-center font-editorial text-2xl text-[#2E2A27] mb-6 group-hover:bg-[#A8762A] group-hover:text-white transition-colors">
                    {item.step}
                  </div>
                  <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#A8762A] font-medium">
                    {item.subtitle}
                  </p>
                  <h3 className="font-editorial text-2xl text-[#2E2A27] mt-1 mb-3">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[13px] leading-[1.7] text-[#7E776E]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Custom Bouquet Builder ("Diseña tu Ramo a Medida") */}
          <div className="bg-white p-8 sm:p-12 border border-[#E5DEC9] shadow-[0_20px_50px_rgba(46,42,39,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#A8762A] font-semibold">
                  ATELIER INTERACTIVO
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#2E2A27] mt-1">
                  Personaliza tu ramo ideal en 3 pasos
                </h3>
                <p className="text-[13px] text-[#8C857B] mt-2">
                  Elige la flor principal, el número de tallos y el acabado del
                  empaque. Nuestros floristas lo armarán al instante.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Step 1: Flower Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[#6E675F] mb-2">
                    1. Flor Principal
                  </label>
                  <select
                    value={customFlower}
                    onChange={(e) => setCustomFlower(e.target.value)}
                    className="w-full p-3 text-xs bg-[#F6EFE2] text-[#2E2A27] border border-[#DDD7D0] focus:outline-none focus:border-[#A8762A]"
                  >
                    <option value="Rosas Blancas de Jardín">
                      Rosas Blancas de Jardín
                    </option>
                    <option value="Rosas Rojas Terciopelo">
                      Rosas Rojas Terciopelo
                    </option>
                    <option value="Tulipanes Rosa Pastel">
                      Tulipanes Rosa Pastel
                    </option>
                    <option value="Claveles Bicolores Aurora">
                      Claveles Bicolores Aurora
                    </option>
                    <option value="Girasoles Dorados">Girasoles Dorados</option>
                  </select>
                </div>

                {/* Step 2: Stem Count */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[#6E675F] mb-2">
                    2. Cantidad de Tallos
                  </label>
                  <div className="flex gap-2">
                    {[12, 24, 36].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setCustomStems(count)}
                        className={`flex-1 py-2.5 text-xs border transition-colors cursor-pointer ${
                          customStems === count
                            ? "bg-[#4A443F] text-[#F6EFE2] border-[#4A443F]"
                            : "bg-[#F6EFE2] text-[#2E2A27] border-[#DDD7D0]"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Wrap Style */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[#6E675F] mb-2">
                    3. Envoltura
                  </label>
                  <select
                    value={customWrap}
                    onChange={(e) => setCustomWrap(e.target.value)}
                    className="w-full p-3 text-xs bg-[#F6EFE2] text-[#2E2A27] border border-[#DDD7D0] focus:outline-none focus:border-[#A8762A]"
                  >
                    <option value="Lino Champán Natural">
                      Lino Champán Natural
                    </option>
                    <option value="Papel Seda Negro Obsidiana">
                      Papel Seda Negro Obsidiana
                    </option>
                    <option value="Yute Botánico con Cinta Dorada">
                      Yute con Cinta Dorada
                    </option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#F0EAE0]">
                <div>
                  <span className="text-xs text-[#8C857B] block">
                    Precio de tu creación personalizada:
                  </span>
                  <span className="font-editorial text-3xl text-[#2E2A27] font-semibold">
                    ${customStems * 2 + 12}.00 USD
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleAddToCart({
                      id: `custom-${customFlower}-${customStems}`,
                      name: `Ramo a Medida: ${customFlower} (${customStems} tallos)`,
                      price: customStems * 2 + 12,
                      image: "/images/flowers/hero-white-roses.png",
                    })
                  }
                  className="bg-[#4A443F] text-[#F6EFE2] text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#A8762A] transition-colors cursor-pointer"
                >
                  Encargar Mi Ramo Personalizado →
                </button>
              </div>
            </div>

            {/* Preview Arch on Right */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-56 h-68 bg-[#F6EFE2] arch-top flex items-end justify-center p-4 relative">
                <img
                  src={
                    customFlower.includes("Rojas")
                      ? "/images/flowers/bouquet-red-roses.png"
                      : customFlower.includes("Tulipanes")
                      ? "/images/flowers/bouquet-pink-tulips.png"
                      : customFlower.includes("Claveles")
                      ? "/images/flowers/bouquet-carnations.png"
                      : customFlower.includes("Girasoles")
                      ? "/images/flowers/bento-sunflowers.png"
                      : "/images/flowers/hero-white-roses.png"
                  }
                  alt="Vista previa de tu ramo personalizado"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
              <p className="mt-3 text-xs text-[#8C857B] text-center">
                {customFlower} • {customStems} tallos • {customWrap}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. "ENCUÉNTRANOS CERCA DE TU CIUDAD" ("Find us near your citys")
          Exact Dark Obsidian Section (#110E0C) + 30 Min Badge + Pickup/Dropoff Inputs + Map
      ===================================================================== */}
      <section
        id="nosotros"
        className="bg-[#110E0C] text-[#F6EFE2] pt-20 pb-36 lg:pt-24 lg:pb-44 relative"
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Centered Header */}
          <div className="text-center max-w-xl mx-auto mb-14 lg:mb-16">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#8E8274] font-medium block mb-2.5">
              NUESTRA TIENDA
            </span>
            <h2 className="font-editorial text-[40px] sm:text-[48px] leading-[1.1] text-[#D5A362] font-normal">
              Encuéntranos cerca de tu ciudad
            </h2>
          </div>

          {/* 2-Column Content: Left Delivery Controls / Right Architectural Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* LEFT COLUMN: 30 Min Badge + Pickup Point + Drop off Location */}
            <div className="lg:col-span-5 space-y-9 lg:pr-6">
              {/* Top Row: "Tiempo de entrega" + White Rounded-Square Badge "30 Min" */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs text-[#9C9286]">
                    Tiempo estimado de entrega
                  </p>
                  <p className="text-[11px] text-[#D5A362] mt-0.5">
                    Cobertura express garantizada
                  </p>
                </div>
                {/* Exact White Rounded Pill/Square with "30 / Min" */}
                <div className="w-12 h-12 rounded-xl bg-[#F4F4F4] text-[#110E0C] flex flex-col items-center justify-center shadow-lg shrink-0">
                  <span className="text-[13px] font-bold leading-none">30</span>
                  <span className="text-[9px] text-[#6E675F] font-medium mt-0.5">
                    Min
                  </span>
                </div>
              </div>

              {/* Input Group 1: "Pickup point" -> "Punto de recogida" */}
              <div className="space-y-2">
                <label className="block font-editorial text-[22px] text-[#D5A362]">
                  Punto de recogida
                </label>
                <div className="relative flex items-center border-b border-white/15 pb-2.5">
                  <input
                    type="text"
                    value={pickupInput}
                    onChange={(e) => setPickupInput(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#D8D0C5] placeholder-[#6E675F] focus:outline-none pr-7"
                  />
                  {/* Small Pin Icon at Right End of Line */}
                  <svg
                    className="w-4 h-4 text-[#8E8274] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                </div>
              </div>

              {/* Input Group 2: "Drop off location" -> "Ubicación de entrega" */}
              <div className="space-y-2">
                <label className="block font-editorial text-[22px] text-[#D5A362]">
                  Ubicación de entrega
                </label>
                <div className="relative flex items-center border-b border-white/15 pb-2.5">
                  <input
                    type="text"
                    value={dropoffInput}
                    onChange={(e) => setDropoffInput(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#D8D0C5] placeholder-[#6E675F] focus:outline-none pr-7"
                  />
                  {/* Small Pin Icon at Right End of Line */}
                  <svg
                    className="w-4 h-4 text-[#8E8274] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                </div>
              </div>

              {/* Interactive Store Branch Selector Pills */}
              <div className="pt-1">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#8E8274] mb-2.5">
                  SELECCIONA UNA SUCURSAL EN EL MAPA:
                </p>
                <div className="flex flex-wrap gap-2">
                  {STORE_LOCATIONS.map((store) => (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => handleSelectStore(store.id)}
                      className={`text-[11px] px-3 py-1.5 transition-colors cursor-pointer ${
                        selectedStoreId === store.id
                          ? "bg-[#A8762A] text-white font-medium"
                          : "bg-white/5 text-[#B8AFA6] hover:bg-white/10"
                      }`}
                    >
                      {store.city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Custom Minimalist Light Architectural Street Map */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <InteractiveMap
                selectedStoreId={selectedStoreId}
                onSelectStore={handleSelectStore}
                stores={STORE_LOCATIONS}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. "LO QUE DICEN NUESTROS CLIENTES" ("What they are saying")
          Exact Overlapping Warm Golden-Ochre Banner (#9E6E28) with Concentric Arcs
          and 2 Staggered Floating White Testimonial Cards
      ===================================================================== */}
      <section className="relative z-20 -mt-20 lg:-mt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="relative bg-[#9E6E28] text-white px-8 py-12 sm:px-12 lg:px-16 lg:py-14 overflow-visible shadow-xl">
            {/* Decorative Concentric Semi-Circular Line Rings inside the Ochre Banner (matching reference) */}
            <svg
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 w-full h-full overflow-hidden opacity-25"
              viewBox="0 0 900 320"
              fill="none"
            >
              <circle
                cx="430"
                cy="320"
                r="130"
                stroke="#F6EFE2"
                strokeWidth="3"
              />
              <circle
                cx="430"
                cy="320"
                r="175"
                stroke="#F6EFE2"
                strokeWidth="2"
              />
              <circle
                cx="430"
                cy="320"
                r="220"
                stroke="#F6EFE2"
                strokeWidth="1.5"
              />
            </svg>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Text & Dark Button */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="font-editorial text-[36px] sm:text-[42px] leading-[1.1] text-[#F6EFE2] font-normal">
                  Lo que dicen de nosotros
                </h2>
                <p className="text-[13px] leading-[1.7] text-[#F6EFE2]/80 max-w-xs">
                  Más de un millón de entregas puntuales respaldan el cariño y
                  la dedicación que ponemos en cada ramo.
                </p>
                <div className="pt-2">
                  <a
                    href="#catalogo"
                    className="inline-block bg-[#4A443F] text-[#F6EFE2] text-[11.5px] px-7 py-3 hover:bg-[#2E2A27] transition-colors"
                  >
                    Pedir un Ramo
                  </a>
                </div>
              </div>

              {/* Right Staggered Floating White Cards (Overlapping Top & Bottom Edges!) */}
              <div className="lg:col-span-7 relative flex flex-col gap-7 lg:-my-20">
                {/* Top Card (Shifted to the right on desktop, just like reference) */}
                <div className="relative bg-white text-[#2E2A27] p-6 sm:p-7 shadow-[0_18px_45px_rgba(17,14,12,0.16)] max-w-[420px] lg:ml-auto">
                  {/* Overlapping Circular Avatar on Top-Left Edge */}
                  <div
                    style={{ background: TESTIMONIALS[0].avatarBg }}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-editorial text-lg font-semibold absolute -top-6 left-6"
                  >
                    {TESTIMONIALS[0].initials}
                  </div>

                  <div className="flex items-center justify-between pt-2 mb-2.5">
                    <div>
                      <h3 className="font-editorial text-xl font-semibold text-[#2E2A27] leading-none">
                        {TESTIMONIALS[0].name}
                      </h3>
                      <span className="text-[10.5px] text-[#8C857B]">
                        {TESTIMONIALS[0].role}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-0.5 text-[#C48F3A] text-xs"
                      aria-label="5 de 5 estrellas"
                    >
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                  <p className="text-[12.5px] leading-[1.65] text-[#6E675F]">
                    {TESTIMONIALS[0].comment}
                  </p>
                </div>

                {/* Bottom Card (Shifted to the left on desktop, overlapping bottom of ochre block) */}
                <div className="relative bg-white text-[#2E2A27] p-6 sm:p-7 shadow-[0_18px_45px_rgba(17,14,12,0.14)] max-w-[420px] lg:mr-auto lg:ml-6">
                  {/* Overlapping Circular Avatar on Top-Left Edge */}
                  <div
                    style={{ background: TESTIMONIALS[1].avatarBg }}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-editorial text-lg font-semibold absolute -top-6 left-6"
                  >
                    {TESTIMONIALS[1].initials}
                  </div>

                  <div className="flex items-center justify-between pt-2 mb-2.5">
                    <div>
                      <h3 className="font-editorial text-xl font-semibold text-[#2E2A27] leading-none">
                        {TESTIMONIALS[1].name}
                      </h3>
                      <span className="text-[10.5px] text-[#8C857B]">
                        {TESTIMONIALS[1].role}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-0.5 text-[#C48F3A] text-xs"
                      aria-label="5 de 5 estrellas"
                    >
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                  <p className="text-[12.5px] leading-[1.65] text-[#6E675F]">
                    {TESTIMONIALS[1].comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. CONTINUATION SECTION: PLANES DE PRECIOS Y SUSCRIPCIÓN FLORAL (#precios)
      ===================================================================== */}
      <section id="precios" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10.5px] uppercase tracking-[0.3em] text-[#8C857B] font-medium block mb-2.5">
              MEMBRESÍAS Y COLECCIONES
            </span>
            <h2 className="font-editorial text-[40px] sm:text-[48px] leading-[1.1] text-[#2E2A27] font-normal">
              Planes pensados para cada ocasión especial
            </h2>
            <p className="mt-3 text-[13.5px] text-[#8C857B]">
              Envía un detalle único hoy mismo o suscríbete para recibir flores
              frescas de autor cada semana con envío prioritario sin costo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`p-8 sm:p-10 flex flex-col justify-between border transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-[#F6EFE2] border-[#A8762A] shadow-[0_20px_50px_rgba(168,118,42,0.1)] lg:-translate-y-3"
                    : "bg-white border-[#EAE5DD] hover:border-[#C48F3A]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] uppercase tracking-[0.24em] px-3 py-1 bg-white text-[#A8762A] font-semibold border border-[#E5DEC9]">
                      {plan.badge}
                    </span>
                    <span className="text-xs text-[#8C857B]">{plan.stems}</span>
                  </div>

                  <h3 className="font-editorial text-3xl text-[#2E2A27]">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#7E776E] mt-1.5">
                    {plan.tagline}
                  </p>

                  <div className="my-7 pb-6 border-b border-[#E5DEC9] flex items-baseline gap-2">
                    <span className="font-editorial text-5xl text-[#2E2A27] font-semibold">
                      ${plan.price}
                    </span>
                    <span className="text-xs text-[#8C857B]">
                      USD / {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-[13px] text-[#5E5850]">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#A8762A] mt-0.5">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    handleAddToCart({
                      id: plan.id,
                      name: plan.name,
                      price: plan.price,
                      image: "/images/flowers/bouquet-blush-tall.png",
                    })
                  }
                  className={`mt-9 w-full py-3.5 text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                    plan.highlighted
                      ? "bg-[#4A443F] text-[#F6EFE2] hover:bg-[#2E2A27]"
                      : "bg-[#F4F4F4] text-[#2E2A27] hover:bg-[#4A443F] hover:text-[#F6EFE2]"
                  }`}
                >
                  Elegir Este Plan →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. MINIMALIST EDITORIAL FOOTER (Matching Bottom of Reference Sheet 2)
      ===================================================================== */}
      <footer className="bg-white border-t border-[#F0EAE0] py-12">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <a
            href="#inicio"
            className="text-xl font-medium tracking-[-0.02em] text-[#2E2A27]"
          >
            Floralia
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-7 text-[12px] text-[#8C857B]">
            <a href="#inicio" className="hover:text-[#2E2A27] transition-colors">
              Inicio
            </a>
            <a
              href="#servicios"
              className="hover:text-[#2E2A27] transition-colors"
            >
              Servicios
            </a>
            <a
              href="#catalogo"
              className="hover:text-[#2E2A27] transition-colors"
            >
              Listos para comprar
            </a>
            <a
              href="#precios"
              className="hover:text-[#2E2A27] transition-colors"
            >
              Precios
            </a>
            <a
              href="#nosotros"
              className="hover:text-[#2E2A27] transition-colors"
            >
              Nosotros
            </a>
          </nav>

          <p className="text-[11.5px] text-[#9A9389]">
            © 2026 Floralia Atelier. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>

      {/* Interactive Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}

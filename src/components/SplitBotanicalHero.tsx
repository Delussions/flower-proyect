"use client";

import React from "react";

interface SplitBotanicalHeroProps {
  scrollY: number;
  mousePos: { x: number; y: number };
  cartCount: number;
  onOpenCart: () => void;
  onExploreClick: () => void;
}

/**
 * Exact 1:1 recreation of Reference Image 1 ("the beauty around us" -> "la belleza alrededor nuestro").
 * Features the 50/50 Lavender (#D3B5ED) and Pistachio-Lime (#ABC94C) split screen,
 * central swirling floral line-art pattern strip, giant watermark serif typography,
 * macro top-down purple scabiosa flower with realistic directional drop-shadow,
 * bottom-left scroll mouse indicator with vertical stem, and bottom-right social stack.
 */
export default function SplitBotanicalHero({
  scrollY,
  mousePos,
  cartCount,
  onOpenCart,
  onExploreClick,
}: SplitBotanicalHeroProps) {
  const clampedScroll = Math.min(Math.max(scrollY, 0), 900);

  return (
    <section
      id="coleccion-botanica"
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(125deg, #F6DCF2 0%, #EAD2F5 45%, #E5F2B8 55%, #DCEB9E 100%)",
      }}
    >
      {/* Main Split-Screen Canvas (Full-bleed on mobile, framed or full-screen adaptive on desktop) */}
      <div className="relative w-full min-h-[92vh] lg:min-h-[88vh] lg:max-w-[1380px] lg:mx-6 lg:my-6 lg:rounded-[18px] overflow-hidden shadow-[0_35px_90px_rgba(58,45,76,0.22)] flex flex-col justify-between">
        {/* ===============================================================
            50 / 50 SPLIT BACKGROUND + CENTRAL SWIRLING FLORAL PATTERN BAND
        =============================================================== */}
        <div className="absolute inset-0 grid grid-cols-2 pointer-events-none">
          {/* Left Half: Pastel Lavender (#D3B5ED) */}
          <div className="relative bg-[#D3B5ED] h-full overflow-hidden">
            {/* Giant Background Watermark Word ("belleza") */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * -24}px, ${
                  clampedScroll * 0.14 + mousePos.y * -14
                }px, 0)`,
              }}
              className="font-thin-serif text-[150px] sm:text-[230px] lg:text-[290px] leading-[0.78] text-white/16 absolute top-1/2 -translate-y-1/2 -left-8 tracking-tight whitespace-nowrap transition-transform duration-300 ease-out"
            >
              belleza
              <br />
              <span className="ml-12">pura</span>
            </div>

            {/* Right-Edge Swirling Botanical Arabesque Strip (Left Half of Center Band) */}
            <div className="absolute top-0 bottom-0 right-0 w-[85px] sm:w-[135px] lg:w-[165px] opacity-55">
              <svg
                className="w-full h-full"
                viewBox="0 0 160 800"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="swirl-purple"
                    x="0"
                    y="0"
                    width="160"
                    height="200"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M160 20 C110 20, 95 65, 130 95 C155 115, 115 160, 70 140 C30 120, 45 60, 95 45 C135 32, 145 80, 115 105 M160 110 C120 125, 85 170, 135 195 M80 5 C35 30, 15 85, 55 130 C85 165, 35 195, 10 185 M145 150 C110 165, 105 195, 155 198"
                      fill="none"
                      stroke="#E5CEF8"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M120 10 C75 35, 65 85, 105 115 C140 140, 90 185, 45 165 M35 45 C10 75, 15 125, 48 152"
                      fill="none"
                      stroke="#DFC4F6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </pattern>
                </defs>
                <rect width="160" height="800" fill="url(#swirl-purple)" />
              </svg>
            </div>
          </div>

          {/* Right Half: Vibrant Pistachio-Lime Green (#ABC94C) */}
          <div className="relative bg-[#ABC94C] h-full overflow-hidden">
            {/* Giant Background Watermark Word ("alrededor") */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * 24}px, ${
                  clampedScroll * -0.12 + mousePos.y * 14
                }px, 0)`,
              }}
              className="font-thin-serif text-[150px] sm:text-[230px] lg:text-[290px] leading-[0.78] text-white/16 absolute top-1/2 -translate-y-1/2 left-10 tracking-tight whitespace-nowrap transition-transform duration-300 ease-out"
            >
              alrededor
              <br />
              <span className="ml-8">nuestro</span>
            </div>

            {/* Left-Edge Swirling Botanical Arabesque Strip (Right Half of Center Band) */}
            <div className="absolute top-0 bottom-0 left-0 w-[85px] sm:w-[135px] lg:w-[165px] opacity-55">
              <svg
                className="w-full h-full"
                viewBox="0 0 160 800"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="swirl-green"
                    x="0"
                    y="0"
                    width="160"
                    height="200"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 20 C50 20, 65 65, 30 95 C5 115, 45 160, 90 140 C130 120, 115 60, 65 45 C25 32, 15 80, 45 105 M0 110 C40 125, 75 170, 25 195 M80 5 C125 30, 145 85, 105 130 C75 165, 125 195, 150 185 M15 150 C50 165, 55 195, 5 198"
                      fill="none"
                      stroke="#BCE05B"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M40 10 C85 35, 95 85, 55 115 C20 140, 70 185, 115 165 M125 45 C150 75, 145 125, 112 152"
                      fill="none"
                      stroke="#B6DA54"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </pattern>
                </defs>
                <rect width="160" height="800" fill="url(#swirl-green)" />
              </svg>
            </div>
          </div>
        </div>

        {/* ===============================================================
            TOP NAVIGATION BAR (Exact White Tulip Icon + 4 Links + 3 Icons)
        =============================================================== */}
        <header className="relative z-30 flex items-center justify-between px-7 sm:px-14 lg:px-20 pt-8 sm:pt-11">
          {/* Top-Left: White Line-Art Tulip Bud Emblem */}
          <a
            href="#inicio-rapido"
            className="text-white hover:scale-105 transition-transform"
            aria-label="Flora Inicio"
          >
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9"
              viewBox="0 0 36 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 31 C10 27 6 19 8 9 C11 11 15 15 18 20 C21 15 25 11 28 9 C30 19 26 27 18 31 Z" />
              <path d="M18 31 C14 25 14 16 18 10 C22 16 22 25 18 31 Z" />
              <path d="M14 12 C15.5 9.5 17 8 18 7 C19 8 20.5 9.5 22 12" />
            </svg>
          </a>

          {/* Top-Center: 4 Spaced Uppercase Links ("SHOP", "FLOWERS", "ABOUT US", "DELIVERY") */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-16 text-[10.5px] uppercase tracking-[0.26em] text-white font-semibold">
            <a
              href="#catalogo-floral"
              className="hover:opacity-75 transition-opacity"
            >
              TIENDA
            </a>
            <a
              href="#coleccion-botanica"
              className="hover:opacity-75 transition-opacity"
            >
              FLORES
            </a>
            <a
              href="#experiencia-dual"
              className="hover:opacity-75 transition-opacity"
            >
              NOSOTROS
            </a>
            <a
              href="#envios-express"
              className="hover:opacity-75 transition-opacity"
            >
              ENVÍOS
            </a>
          </nav>

          {/* Top-Right: Search, User, and Bag Outline Icons */}
          <div className="flex items-center gap-5 sm:gap-6 text-white">
            <button
              onClick={onExploreClick}
              className="hover:scale-110 transition-transform cursor-pointer"
              aria-label="Buscar flores"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.8-3.8" strokeLinecap="round" />
              </svg>
            </button>
            <a
              href="#envios-express"
              className="hover:scale-110 transition-transform"
              aria-label="Perfil de usuario"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path
                  d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <button
              onClick={onOpenCart}
              className="relative hover:scale-110 transition-transform cursor-pointer"
              aria-label="Abrir bolsa de compras"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                viewBox="0 0 24 24"
              >
                <path d="M6 8h12l1 12H5L6 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white text-[#12131A] text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* ===============================================================
            CENTER HERO STAGE: "la belleza" + MACRO SCABIOSA FLOWER + "alrededor nuestro"
        =============================================================== */}
        <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center justify-center px-6 py-10">
          {/* Left Text: "the beauty" -> "la belleza" */}
          <div
            style={{
              transform: `translate3d(${mousePos.x * -12}px, ${
                clampedScroll * -0.06
              }px, 0)`,
            }}
            className="text-white flex items-baseline lg:mr-[-36px] z-20 mb-4 lg:mb-0 transition-transform duration-300 ease-out"
          >
            <span className="font-thin-serif text-[24px] sm:text-[32px] lg:text-[36px] font-light mr-2 sm:mr-3 opacity-95">
              la
            </span>
            <span className="font-thin-serif text-[64px] sm:text-[90px] xl:text-[108px] font-normal leading-none tracking-[-0.015em]">
              belleza
            </span>
          </div>

          {/* Center Macro Scabiosa Flower with Parallax Rotation & Realistic Directional Shadow */}
          <div
            style={{
              transform: `translate3d(${mousePos.x * 16}px, ${
                clampedScroll * 0.05 + mousePos.y * 16
              }px, 0) rotate(${clampedScroll * 0.035 + mousePos.x * 4}deg)`,
            }}
            onClick={onExploreClick}
            title="Explorar colección botánica"
            className="relative z-10 w-[290px] sm:w-[390px] lg:w-[460px] aspect-square flex items-center justify-center transition-transform duration-300 ease-out cursor-pointer group"
          >
            <img
              src="/images/scabiosa-macro.png"
              alt="Flor escabiosa púrpura macro vista superior"
              className="w-full h-full object-contain drop-shadow-[22px_28px_26px_rgba(48,62,14,0.38)] transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Right Text: "around us" -> "alrededor nuestro" */}
          <div
            style={{
              transform: `translate3d(${mousePos.x * 12}px, ${
                clampedScroll * 0.06
              }px, 0)`,
            }}
            className="text-white flex items-baseline lg:ml-[-28px] z-20 mt-4 lg:mt-0 transition-transform duration-300 ease-out"
          >
            <span className="font-thin-serif text-[64px] sm:text-[90px] xl:text-[108px] font-normal leading-none tracking-[-0.015em]">
              alrededor
            </span>
            <span className="font-thin-serif text-[24px] sm:text-[32px] lg:text-[36px] font-light ml-2.5 sm:ml-3.5 opacity-95">
              nuestro
            </span>
          </div>
        </div>

        {/* ===============================================================
            BOTTOM CORNERS: Scroll Mouse + "NUEVA COLECCIÓN" & Vertical Socials
        =============================================================== */}
        <div className="relative z-30 flex items-end justify-between px-7 sm:px-14 lg:px-20 pb-0">
          {/* Bottom-Left: Mouse Icon with Vertical Stem Line reaching the bottom edge + "NUEVA COLECCIÓN" */}
          <a
            href="#catalogo-floral"
            className="flex items-start gap-3.5 text-white group pb-7"
          >
            <div className="flex flex-col items-center -mb-7">
              {/* Mouse Pill Outline */}
              <div className="w-[17px] h-[26px] rounded-full border-[1.6px] border-white flex justify-center pt-1.5">
                <span className="w-[1.6px] h-[5px] bg-white rounded-full animate-bounce" />
              </div>
              {/* Vertical Line extending to the bottom edge of the frame */}
              <span className="w-[1.2px] h-9 bg-white/85 mt-1" />
            </div>
            <div className="text-[9.5px] uppercase tracking-[0.22em] leading-[1.55] font-semibold pt-0.5 group-hover:translate-x-1 transition-transform">
              <span className="block">NUEVA</span>
              <span className="block">COLECCIÓN</span>
            </div>
          </a>

          {/* Bottom-Right: Vertical Column of 3 White Social Icons (Facebook, Instagram, Twitter) */}
          <div className="flex flex-col items-center gap-4 pb-8 text-white">
            {/* Facebook Square Icon */}
            <a
              href="#coleccion-botanica"
              aria-label="Facebook"
              className="w-4 h-4 bg-white text-[#ABC94C] rounded-[2px] flex items-center justify-center font-bold text-[11px] leading-none hover:scale-110 transition-transform"
            >
              f
            </a>
            {/* Instagram Outline Icon */}
            <a
              href="#coleccion-botanica"
              aria-label="Instagram"
              className="hover:scale-110 transition-transform"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            {/* Twitter Bird Icon */}
            <a
              href="#coleccion-botanica"
              aria-label="Twitter"
              className="hover:scale-110 transition-transform"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.6.8-2.5 1-.7-.8-1.8-1.3-3-1.3-2.3 0-4.1 1.8-4.1 4.1 0 .3 0 .6.1.9-3.4-.2-6.4-1.8-8.4-4.3-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2 2.8 3.8 2.8-1.4 1.1-3.2 1.8-5.1 1.8-.3 0-.7 0-1-.1 1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.7-6.2 11.7-11.7v-.5c.8-.6 1.5-1.3 2.1-2.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

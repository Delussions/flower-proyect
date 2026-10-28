"use client";

import React from "react";

interface StorePin {
  id: string;
  name: string;
  address: string;
  eta: string;
  x: number;
  y: number;
  featured?: boolean;
}

interface InteractiveMapProps {
  selectedStoreId: string;
  onSelectStore: (id: string) => void;
  stores: StorePin[];
}

/**
 * Recreates the exact minimalist silver-white architectural map from the reference image
 * ("Find us near your citys"), complete with city blocks, avenues, street names,
 * outline pins, and the highlighted solid warm-gold marker (#A8762A).
 */
export default function InteractiveMap({
  selectedStoreId,
  onSelectStore,
  stores,
}: InteractiveMapProps) {
  const activeStore =
    stores.find((s) => s.id === selectedStoreId) ||
    stores.find((s) => s.featured) ||
    stores[0];

  return (
    <div className="relative w-full aspect-[4/3] max-w-[540px] bg-[#E8E8E8] overflow-hidden shadow-2xl border border-white/10 select-none group">
      {/* Architectural Street Grid SVG matching the exact reference aesthetic */}
      <svg
        viewBox="0 0 600 450"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      >
        {/* Base Map Land */}
        <rect width="600" height="450" fill="#ECECEC" />

        {/* Subtle Neighborhood Blocks */}
        <g fill="#E2E2E2">
          <polygon points="0,0 145,0 120,110 0,95" />
          <polygon points="165,0 320,0 305,95 140,108" />
          <polygon points="340,0 475,0 470,130 325,115" />
          <polygon points="495,0 600,0 600,140 490,132" />

          <polygon points="0,115 118,128 95,255 0,240" />
          <polygon points="138,128 302,115 288,245 115,255" />
          <polygon points="322,135 468,148 455,280 308,265" />
          <polygon points="488,152 600,160 600,295 475,285" />

          <polygon points="0,260 92,275 70,390 0,375" />
          <polygon points="112,275 285,265 268,385 92,395" />
          <polygon points="305,285 452,300 438,415 288,395" />
          <polygon points="472,305 600,315 600,450 458,430" />
        </g>

        {/* Secondary Inner Block Subdivisions */}
        <g stroke="#ECECEC" strokeWidth="4" fill="none">
          <line x1="215" y1="0" x2="195" y2="250" />
          <line x1="395" y1="0" x2="375" y2="420" />
          <line x1="120" y1="190" x2="465" y2="215" />
          <line x1="100" y1="330" x2="450" y2="355" />
          <path d="M 155,130 Q 210,185 180,255" />
        </g>

        {/* Major White Avenues & Arterial Roads */}
        <g stroke="#FAFAFA" strokeLinecap="round" fill="none">
          {/* Diagonal Left Main Highway */}
          <path d="M 160,-10 L 80,460" strokeWidth="14" />
          {/* Central Diagonal Boulevard */}
          <path d="M 332,-10 L 275,460" strokeWidth="12" />
          {/* Right Vertical-Diagonal Avenue */}
          <path d="M 485,-10 L 448,460" strokeWidth="16" />
          {/* Horizontal Cross Avenues */}
          <path d="M -10,102 L 610,150" strokeWidth="11" />
          <path d="M -10,252 L 610,302" strokeWidth="13" />
          <path d="M -10,382 L 610,438" strokeWidth="15" />
          {/* Curved Park Loop */}
          <path
            d="M 135,130 C 195,140 205,215 130,235"
            strokeWidth="8"
          />
        </g>

        {/* Active Delivery Route Dashed Line */}
        <path
          d={`M 235,165 Q 315,210 ${activeStore.x},${activeStore.y}`}
          stroke="#A8762A"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          fill="none"
          opacity="0.75"
        />

        {/* Street Typography (Matching the tiny architectural labels in reference) */}
        <g
          fill="#9B9690"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="0.14em"
        >
          <text
            x="195"
            y="102"
            transform="rotate(4 195 102)"
          >
            AV. BOTÁNICA
          </text>
          <text
            x="355"
            y="115"
            transform="rotate(4 355 115)"
          >
            PASEO REAL
          </text>
          <text
            x="92"
            y="335"
            transform="rotate(5 92 335)"
          >
            VILLA JARDÍN
          </text>
          <text
            x="145"
            y="402"
            transform="rotate(5 145 402)"
          >
            AV. LAS ROSAS
          </text>
          <text
            x="480"
            y="250"
            transform="rotate(-85 480 250)"
          >
            GRAN VÍA CENTRAL
          </text>
          <text
            x="323"
            y="225"
            transform="rotate(-82 323 225)"
          >
            CALLE FLORES
          </text>
          <text
            x="512"
            y="368"
            transform="rotate(5 512 368)"
          >
            SAN ÁNGEL
          </text>
        </g>

        {/* Store Location Markers */}
        {stores.map((store) => {
          const isSelected = store.id === activeStore.id;
          return (
            <g
              key={store.id}
              transform={`translate(${store.x}, ${store.y})`}
              onClick={() => onSelectStore(store.id)}
              className="cursor-pointer"
            >
              {isSelected ? (
                <>
                  {/* Soft Gold Halo Pulse */}
                  <circle
                    cx="0"
                    cy="-12"
                    r="22"
                    fill="#A8762A"
                    opacity="0.18"
                  />
                  <ellipse
                    cx="0"
                    cy="2"
                    rx="7"
                    ry="3"
                    fill="#000000"
                    opacity="0.22"
                  />
                  {/* Solid Warm Gold Pin Marker (#A8762A) matching reference */}
                  <path
                    d="M0 -28 C-9 -28 -16 -21 -16 -12 C-16 -2 0 2 0 2 C0 2 16 -2 16 -12 C16 -21 9 -28 0 -28 Z"
                    fill="#A8762A"
                  />
                  <circle cx="0" cy="-13" r="5.5" fill="#ECECEC" />
                </>
              ) : (
                <>
                  {/* Minimal Dark Outline Pin Markers matching reference */}
                  <path
                    d="M0 -18 C-5.5 -18 -10 -13.5 -10 -8 C-10 -1.5 0 1 0 1 C0 1 10 -1.5 10 -8 C10 -13.5 5.5 -18 0 -18 Z"
                    fill="#ECECEC"
                    stroke="#3E3A36"
                    strokeWidth="1.6"
                  />
                  <circle cx="0" cy="-8.5" r="2.8" fill="#3E3A36" />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating Info Pill on Bottom-Left of Map */}
      <div className="absolute bottom-3 left-3 bg-[#110E0C]/90 backdrop-blur-md text-[#F6EFE2] px-3.5 py-2 text-xs flex items-center gap-2.5 border border-[#D5A362]/30">
        <span className="w-2 h-2 rounded-full bg-[#D5A362] animate-pulse" />
        <div>
          <p className="font-medium text-[#D5A362] leading-tight">
            {activeStore.name}
          </p>
          <p className="text-[11px] text-[#B8AFA6]">
            {activeStore.address} • Envío {activeStore.eta}
          </p>
        </div>
      </div>
    </div>
  );
}

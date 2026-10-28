"use client";

import React from "react";

interface CurvedArchTextProps {
  text: string;
  variant: "top-center" | "top-left-gold";
  className?: string;
  id: string;
}

/**
 * Renders curved SVG text following the circular contour of a botanical arch.
 * - "top-center": Used in the Hero ("Demuestra tu amor") right above the arch apex.
 * - "top-left-gold": Used on product cards ("Más Vendido", "Más Buscado") along the top-left curve.
 */
export default function CurvedArchText({
  text,
  variant,
  className = "",
  id,
}: CurvedArchTextProps) {
  if (variant === "top-center") {
    return (
      <svg
        viewBox="0 0 360 95"
        className={`pointer-events-none select-none overflow-visible ${className}`}
        aria-hidden="true"
      >
        <defs>
          {/* Circular arc matching the top crest of the Hero arch */}
          <path
            id={`curve-${id}`}
            d="M 35,88 A 155,155 0 0,1 325,88"
            fill="transparent"
          />
        </defs>
        <text
          fill="#4A443F"
          fontSize="13.5"
          fontWeight="500"
          letterSpacing="0.06em"
        >
          <textPath
            href={`#curve-${id}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {text}
          </textPath>
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 300"
      className={`pointer-events-none select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Arc hugging the upper-left curve of the product arch */}
        <path
          id={`curve-${id}`}
          d="M 16,158 A 136,136 0 0,1 152,22"
          fill="transparent"
        />
      </defs>
      <text
        fill="#C48F3A"
        fontSize="12.5"
        fontWeight="500"
        letterSpacing="0.04em"
      >
        <textPath
          href={`#curve-${id}`}
          startOffset="32%"
          textAnchor="middle"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Floralia | Delivery de Ramos de Flores Frescas en 30 Minutos",
  description:
    "Envía a tu persona favorita las mejores flores frescas cortadas al amanecer. Diseño floral de autor y entrega express garantizada en 30 minutos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-white text-[#2E2A27] selection:bg-[#A8762A]/20 selection:text-[#2E2A27] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

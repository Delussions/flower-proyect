# Floralia Atelier — Landing Page de Delivery de Ramos de Flores (Next.js)

Recreación pixel-perfect y expansión editorial de la landing page de delivery de ramos de flores en **Next.js 16**, **TypeScript** y **Tailwind CSS**, completamente en español, responsive y con sistema de animaciones **Parallax multicapa**.

## Análisis de Diseño y Técnicas Aplicadas

1. **Paleta de Colores Exacta:**
   - **Fondo Hero (`#F6EFE2`):** Tono crema champán cálido.
   - **Arco Principal (`#DDD7D0`):** Piedra greige suave con borde superior arqueado (`border-radius: 9999px 9999px 0 0`).
   - **Arcos de Catálogo (`#F4F4F4`):** Gris alabastro sobre lienzo blanco puro (`#FFFFFF`).
   - **Acento Dorado Antiguo (`#A8762A` / `#C48F3A`):** Empleados en insignias curvas SVG, íconos de métricas, contador del carrito y marcador principal del mapa.
   - **Sección Sucursales (`#110E0C` y `#D5A362`):** Contraste nocturno obsidiana con tipografía serif en dorado champán.
   - **Banner de Testimonios (`#9E6E28`):** Bloque ocre cálido con anillos concéntricos y tarjetas blancas flotantes en superposición asimétrica.

2. **Tipografía Editorial:**
   - **Titulares (`Cormorant Garamond`):** Serif de alto contraste caligráfico que replica la morfología exacta de las letras (`g`, `f`, `y`) del diseño original.
   - **Interfaz y Cuerpo (`Plus Jakarta Sans`):** Sans-serif limpia con espaciado extendido (`tracking-[0.28em]`) para etiquetas y botones de acción (`COMPRAR AHORA →`).

3. **Técnicas Especiales:**
   - **Texto Curvo en Arco (`SVG <textPath>`):** Implementado en `"Demuestra tu amor"` sobre la cúpula del Hero y en las etiquetas doradas `"Más Vendido"` y `"Más Buscado"`.
   - **Bento Grid de Arcos Direccionales:** 5 contenedores con curvaturas orientadas (`arch-right`, `arch-top`, `arch-left`) en la sección *"Los mejores ramos de esta semana"*.
   - **Parallax Multicapa (Scroll + Mouse 3D Tilt):** Desplazamiento diferencial suave con `requestAnimationFrame` en el ramo principal, arcos, textos curvos y tarjetas de métricas.
   - **Secciones de Continuación Coherentes:**
     - Proceso de cosecha y delivery express en 30 minutos (4 pasos).
     - Configurador interactivo *"Personaliza tu ramo ideal en 3 pasos"*.
     - Planes de suscripción floral y carrito lateral interactivo con dedicatoria caligrafiada.

## Ejecución Local

```bash
npm install
npm run dev
```

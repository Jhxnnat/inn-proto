# Biblioteca UTB - App Móvil

Proyecto de Innovación para la Biblioteca UTB: Estrategia Móvil Institucional e Inteligencia Artificial Guiada por la Ética Académica

React + Vite + Tailwind CSS reading and research app.

## Development

```sh
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

- `npm run build` — production build into `dist/`
- `npm run preview` — serve the production build at http://localhost:4173
- `npm run typecheck` — run the TypeScript compiler without emitting files
- `npm run format` — format sources with oxfmt

## Project Structure

- `src/main.tsx` — React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into `#root`
- `src/App.tsx` — primary application component and the usual starting point for UI work
- `src/index.css` — global CSS entrypoint and Tailwind CSS v4 import
- `index.html` — Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` — project dependencies and scripts
- `vite.config.ts` — Vite configuration with React, Tailwind CSS v4, and the `@` alias for `src`

## Dependencies

- Runtime: React 19 and React DOM 19, icons from lucide-react
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.9, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in
`vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. The app's own
styles live in `src/index.css` as plain CSS. Use Tailwind utility classes directly in JSX and put
global CSS or Tailwind v4 theme customization in `src/index.css`. No Tailwind config file or
PostCSS config is needed.

Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults.
`src/main.tsx` imports `src/index.css`, so global font wiring belongs there.

Tailwind emits utility classes in `@layer utilities`, and CSS outside any cascade layer overrides
every layer regardless of specificity. Put global element styles, such as resets and defaults for
`body`, headings, `button`, or `input`, inside `@layer base { ... }` so utility classes on those
elements still apply. Tailwind's Preflight already applies `box-sizing: border-box`, removes default
margins, and sets `font: inherit` on form controls, so do not repeat those rules.


# Guía de UI institucional UTB (genérica)

Sistema de diseño portable basado en la identidad visual UTB. No depende de un
framework ni de una aplicación concreta: describe tokens, superficies,
componentes y movimiento para reutilizar en cualquier proyecto (React, Vue,
Laravel, Angular…). Los ejemplos de clases usan una sintaxis tipo Tailwind, pero
cada regla se traduce a CSS plano.

---

## Principios

1. **Un solo azul manda.** El azul institucional es el primario. Las superficies
   oscuras (menús laterales, heros, paneles) usan el azul profundo; las barras
   superiores/claras usan el color de tarjeta.
2. **Tokens antes que hex sueltos.** Ningún componente escribe `#0a41f5`; todo
   color viene de una variable/token.
3. **Pantallas simétricas.** Toda sección se abre con el mismo encabezado
   (categoría + título + acento). Solo cambian esos tres datos.
4. **Sin librería de animación.** Transiciones y keyframes nativos, respetando
   `prefers-reduced-motion`.

---

# 1. Paleta de color

## 1.1 Azules de marca

| Token | Valor | Uso |
| --- | --- | --- |
| `brand-deep` | `#05174a` | Sidebar, base de heros, superficies oscuras |
| `brand-navy` | `#071f5a` | Paso intermedio de degradados |
| `brand-blue` | `#0a41f5` | **Primario**: botones, ítem activo, acentos |
| `brand-blue-dark` | `#0835c8` | Hover / pressed del primario |
| `brand-blue-light` | `#547af8` | Degradados, texto destacado sobre claro |
| `brand-blue-pale` | `#93b4ff` | Texto secundario sobre fondo oscuro |

## 1.2 Colores de estado

| Token | Valor | Uso |
| --- | --- | --- |
| `accent-amber` | `#f59e0b` | Advertencia / pendiente |
| `accent-emerald` | `#10b981` | Éxito / aprobado |
| `accent-red` | `#ef4444` | Error / rechazado |

## 1.3 Tokens semánticos (claro / oscuro)

Se redefinen con **matiz frío** (hue 264) para que cualquier componente herede
la identidad sin tocarlo.

| Token | Claro | Oscuro |
| --- | --- | --- |
| `background` | `#ffffff` | `oklch(0.16 0.03 264)` |
| `foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `card` | `#ffffff` | `oklch(0.2 0.035 264)` |
| `primary` | `oklch(0.5 0.24 264)` ≈ `#0a41f5` | `oklch(0.62 0.21 264)` |
| `primary-foreground` | `#ffffff` | `#ffffff` |
| `secondary` | `oklch(0.92 0.04 264)` | `oklch(0.27 0.04 264)` |
| `muted` | `oklch(0.95 0.02 264)` ≈ `#eef0f7` | `oklch(0.27 0.04 264)` |
| `muted-foreground` | `oklch(0.5 0.035 264)` ≈ `#68708a` | `oklch(0.72 0.04 264)` |
| `accent` | `oklch(0.88 0.06 264)` | `oklch(0.3 0.05 264)` |
| `border` | `oklch(0.92 0.04 264)` ≈ `#e2e7f5` | `rgb(255 255 255 / 12%)` |
| `input` | `oklch(0.95 0.02 264)` | `rgb(255 255 255 / 15%)` |
| `ring` | `oklch(0.5 0.24 264)` | `oklch(0.62 0.21 264)` |
| `success` | `oklch(0.696 0.149 162.48)` | `oklch(0.723 0.192 149.579)` |
| `destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |

**Modo oscuro azulado, no gris neutro.** Todos los grises llevan croma bajo en
azul.

> **Ajuste importante:** `muted-foreground` debe ir con croma bajo (~`0.035`).
> Con cromas altos (`0.10`) el texto secundario se percibe como enlace azul
> sobre contenido real.

## 1.4 Superficies de plataforma

| Uso | Valor |
| --- | --- |
| Sidebar (claro y oscuro) | `#05174a` |
| Hover de ítem del sidebar | `rgb(255 255 255 / 10%)` |
| Divisor del sidebar | `rgb(255 255 255 / 10%)` (12% en oscuro) |
| Fondo de página | `muted` al 40% sobre el blanco |
| Barra superior | color de tarjeta (`card`), sticky |

## 1.5 Reglas de color

- Usa **modificadores de opacidad** en vez de crear tonos nuevos:
  `brand-blue/10` para anillos, `brand-blue/[0.04]` para hover de filas,
  `brand-blue-pale/70` para texto secundario en oscuro.
- **No** pongas `brand-blue` como texto sobre `brand-deep` (contraste
  insuficiente). Sobre oscuro: blanco para principal, `brand-blue-pale` para
  secundario.
- El azul saturado es **exclusivo** de: botón primario, ítem activo de
  navegación y acento de sección. No lo uses como fondo de bloques grandes.
- Máximo **un** acento de sección por pantalla, y siempre de la familia fría.

## 1.6 Acentos de sección (opcionales)

Se aplican a una barra/indicador del encabezado, no al fondo:

| Sección | Acento |
| --- | --- |
| General / por defecto | azul de marca |
| Sección A | `rgba(56,189,248,0.34)` — cian |
| Sección B | `rgba(45,212,191,0.32)` — verde azulado |
| Sección C | `rgba(16,185,129,0.28)` — esmeralda |
| Sección D | `rgba(129,140,248,0.38)` — índigo |

## 1.7 Bloque CSS para copiar

```css
:root {
  /* Marca */
  --brand-deep: #05174a;
  --brand-navy: #071f5a;
  --brand-blue: #0a41f5;
  --brand-blue-dark: #0835c8;
  --brand-blue-light: #547af8;
  --brand-blue-pale: #93b4ff;
  --accent-amber: #f59e0b;
  --accent-emerald: #10b981;
  --accent-red: #ef4444;

  /* Semánticos */
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);
  --primary: oklch(0.5 0.24 264);
  --primary-foreground: #ffffff;
  --secondary: oklch(0.92 0.04 264);
  --muted: oklch(0.95 0.02 264);
  --muted-foreground: oklch(0.5 0.035 264);
  --accent: oklch(0.88 0.06 264);
  --border: oklch(0.92 0.04 264);
  --input: oklch(0.95 0.02 264);
  --ring: oklch(0.5 0.24 264);
  --success: oklch(0.696 0.149 162.48);
  --destructive: oklch(0.577 0.245 27.325);

  /* Superficies de plataforma */
  --sidebar: #05174a;
  --sidebar-hover: rgb(255 255 255 / 10%);
  --sidebar-border: rgb(255 255 255 / 10%);

  /* Forma */
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.16 0.03 264);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.2 0.035 264);
  --primary: oklch(0.62 0.21 264);
  --secondary: oklch(0.27 0.04 264);
  --muted: oklch(0.27 0.04 264);
  --muted-foreground: oklch(0.72 0.04 264);
  --accent: oklch(0.3 0.05 264);
  --border: rgb(255 255 255 / 12%);
  --input: rgb(255 255 255 / 15%);
  --ring: oklch(0.62 0.21 264);
  --success: oklch(0.723 0.192 149.579);
  --destructive: oklch(0.704 0.191 22.216);
  --sidebar-border: rgb(255 255 255 / 12%);
}
```

> Si el proyecto no soporta `oklch` (navegadores antiguos), sustituye por hex
> equivalentes: `primary #0a41f5`, `muted #eef0f7`, `border #e2e7f5`,
> `muted-foreground #68708a`.

---

# 2. Estilos

## 2.1 Tipografía

- **Sans geométrica** para toda la UI (referencia: Geist Sans / Inter /
  system-ui): títulos, cuerpo y etiquetas.
- **Mono** solo para código, IDs y datos técnicos.
- Rendimiento de texto: `-webkit-font-smoothing: antialiased`,
  `text-rendering: optimizeLegibility`.
- Jerarquía por peso y tamaño (no por color): 600–700 títulos, 400–500 cuerpo,
  500 etiquetas pequeñas en mayúsculas con `letter-spacing` leve para el
  "eyebrow".
- Cuerpo mínimo 14 px; texto secundario en `muted-foreground`, nunca en azul.

## 2.2 Forma, espacio y elevación

| Elemento | Valor |
| --- | --- |
| Radio base | `--radius: 0.625rem` |
| Escala | `sm ≈ 0.6×`, `md ≈ 0.8×`, `lg = 1×`, `xl ≈ 1.4×`, `2xl ≈ 1.8×`, `3xl ≈ 2.2×`, `4xl ≈ 2.6×` |
| Botones e inputs | `radius-xl` |
| Tarjetas / modales | `radius-2xl` |
| Ritmo de espaciado | múltiplos de 4 px (8, 12, 16, 20, 24, 32) |
| Padding de tarjeta | 20 px |

Elevación discreta, siempre azulada:

- Reposo: `shadow-sm` + `ring 1px primary/10`.
- Hover de tarjeta/interactivo: `shadow-md`
  (o `0 20px 40px -12px rgb(10 65 245 / 0.15)`).
- **Sin** sombras grises duras ni bordes negros.

## 2.3 Superficies y jerarquía

1. **Fondo de app**: blanco ligeramente gris-azulado (`muted/40`). Lo define el
   `<body>`/layout raíz.
2. **Superficie**: tarjetas blancas (`card`) con anillo azul tenue.
3. **Superficie oscura**: azul profundo, con textura de ruido opcional y rejilla
   tenue.
4. Nunca apiles fondo sobre fondo: si el contenedor ya tiene fondo, el hijo va
   transparente o en `card`.

## 2.4 Componentes

**Encabezado de sección (obligatorio y único)**

- Barra de acento vertical/horizontal + *eyebrow* (categoría) + título.
- Opcional: contador o metadato a la derecha.
- Se renderiza una sola vez por pantalla, en la barra superior, no duplicado en
  el cuerpo.

**Botones**

- Primario: fondo `primary`, texto blanco, `radius-xl`, hover
  `brand-blue-dark`.
- Secundario: fondo transparente, borde `border`, texto `foreground`.
- Sobre zonas claras de un degradado: **blanco sólido + texto azul profundo**,
  nunca `white/10`.
- Foco visible siempre: `ring-2 ring-primary/40`.

**Tarjetas**

- `radius-2xl`, fondo `card`, `shadow-sm`, `ring-1 ring-primary/10`, hover a
  `shadow-md`.
- Opcional `hover-lift` para tarjetas clicables.

**Tablas**

- Envuelta en tarjeta.
- Cabecera `muted/50` sin cambio de fondo al hover.
- Filas con `transition-colors` y hover `primary/[0.04]`.
- Números alineados a la derecha y con mono si son datos.

**Formularios**

- Inputs con `radius-xl`, borde `border`, fondo `card`, foco `ring-primary/40`.
- Etiqueta arriba, texto de ayuda en `muted-foreground`, error en
  `destructive`.
- Un solo botón primario por formulario.

**Badges / estados**

- Fondo del color de estado al 10 %, texto del color al 100 %, `radius-full`.
- Usa siempre la misma pareja color↔significado en toda la app.

**Navegación**

- Barra lateral oscura (`brand-deep`), fija en desktop y drawer por debajo del
  breakpoint `lg`.
- Ítem activo: píldora `brand-blue` con texto blanco; **es el único elemento con
  ese relleno**.
- Hover: blanco al 10 %.
- Barra superior clara y sticky con el encabezado de sección + sesión de usuario.

**Layout de página**

- Ancho máximo estándar y centrado; variantes: ancho normal, ancho amplio
  (detalle) y ancho de formulario.
- El padding lateral lo aporta el contenedor de página, no cada bloque.

## 2.5 Movimiento

| Uso | Especificación |
| --- | --- |
| Entrada de contenido | `translateY(12px) → 0` + fade, 500 ms, `cubic-bezier(0.22, 1, 0.36, 1)` |
| Escalonado de listas | retardo de 80 ms por ítem vía variable (`--delay`) |
| Hover de tarjeta | 350 ms, `cubic-bezier(0.34, 1.56, 0.64, 1)`, 5 px |
| Spinner | rotación 700 ms lineal |
| Skeleton | barrido 1.4–1.8 s |
| Elementos ambientales (orbes) | 8–12 s, suave, infinito |

- Solo `transform` y `opacity` (nada de animar `width`, `top` o `box-shadow` en
  bucles).
- Keyframes CSS, sin dependencias.

## 2.6 Texturas y fondos

- **Rejilla tenue** (32–40 px) en heros y cabeceras: azul al 4 % sobre claro,
  azul pálido al 5 % sobre oscuro.
- **Ruido** al 2–3 % de opacidad solo sobre superficies oscuras.
- **Degradado de texto** para cifras/títulos destacados:
  `brand-blue → brand-blue-light → azul medio`, 135°.
- **Borde con brillo** para tarjetas destacadas: anillo azul al 20 % + halo al
  8 %.

## 2.7 Accesibilidad e interacción

- Contraste mínimo 4.5:1 en texto normal. El par crítico es texto secundario
  sobre claro: usa `muted-foreground` con croma bajo.
- Foco visible en **todo** lo interactivo (`ring` de 2 px, offset 2 px). Nunca
  `outline: none` sin sustituto.
- Cursores: `pointer` en botones/enlaces/labels, `text` en campos, `not-allowed`
  en deshabilitados.
- `prefers-reduced-motion`: desactivar bucles, escalonados y desplazamientos;
  dejar solo cambios de opacidad o instantáneos.
- Áreas táctiles ≥ 40×40 px; el sidebar colapsa a drawer antes de encoger el
  contenido.
- Estados nunca solo por color: acompaña con texto o icono.

## 2.8 Checklist de pantalla nueva

- [ ] Usa solo tokens, ningún hex en el marcado.
- [ ] Un encabezado de sección con *eyebrow*, título y acento (uno solo).
- [ ] Un único botón primario visible por zona.
- [ ] Tarjetas con `radius-2xl` + anillo azul tenue; tablas dentro de tarjeta.
- [ ] Ancho máximo y padding vienen del contenedor de página.
- [ ] Foco visible y navegación por teclado probados.
- [ ] Verificado en claro, oscuro y con movimiento reducido.
- [ ] Responsive: drawer de navegación y tablas con scroll horizontal.

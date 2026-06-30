# GROUND-TRUTH — Teatro Hidalgo · Bloque 0
> Generado 2026-06-29. Fuente: curl vivo, REST DB, git, repo. NO heredado del handoff.
> Stale corregido marcado con 🔴 STALE. Verificado con 🟢.

---

## 1. Sitemap Real (teatrohidalgo.mx)

### Páginas (wp-sitemap-posts-page-1.xml)
| URL | Tipo | Estado |
|-----|------|--------|
| `/` | Home | Real — secciones `#cartelera` + `#el-teatro` |
| `/tienda/` | WooCommerce shop | Existe pero tickets vía SOLDOUT widget |
| `/carrito/` | WooCommerce cart | WooCommerce page |
| `/finalizar-compra/` | WooCommerce checkout | WooCommerce page |
| `/mi-cuenta/` | WooCommerce account | WooCommerce page |
| `/confirmacion/` | Confirmación de compra | WooCommerce page |
| `/politica-de-privacidad/` | Info estática | Real |
| `/terminos-y-condiciones/` | Info estática | Real |
| `/new-home-page/` | Borrador/draft | Basura — NO clonar |
| `/sample-page/` | Sample WP | Basura — NO clonar |

### Productos/Shows (wp-sitemap-posts-product-1.xml) — 9 URLs, 8 reales
| URL | Título inferido | Género (vivo) | En DB |
|-----|-----------------|---------------|-------|
| `/producto/el-diario-de-un-loco/` | El Diario de un Loco | Drama/Monólogo | 🟢 SÍ |
| `/producto/papi-piernas-largas/` | Papi Piernas Largas | N/A | ❌ NO |
| `/producto/old/` | Descubriendo a Crí Crí (slug viejo) | Infantil | ❌ NO |
| `/producto/timido-y-furioso/` | Tímido y Furioso | N/A | ❌ NO |
| `/producto/una-navidad-espectacular-en-broadway/` | Una Navidad Espectacular | N/A | ❌ NO |
| `/producto/ringolingus/` | Ringolingus | N/A | ❌ NO |
| `/producto/sorpresas-amen/` | Sorpresas A-men | Comedia musical | ❌ NO |
| `/producto/descubriendo-a-cri-cri/` | Descubriendo a Crí Crí | Infantil | ❌ NO |
| `/producto/test/` | test | — | BASURA — ignorar |

🔴 STALE: handoff decía "6 eventos" → live tiene 8 reales (sin `test`). DB tiene **solo 1**.

### Cartelera home (lazy-load capturado parcialmente — solo 3 visibles)
- El Diario de un Loco
- Cri Cri (= Descubriendo a Crí Crí)
- Sorpresas A-men
> ⚠ Puede haber más ocultos por lazy-load. Confirmar con scroll-trigger o Puppeteer.

### Nav del vivo
- Cartelera (`#cartelera`), El Teatro (`#el-teatro`)
- Redes: Facebook, Instagram
- Footer: Ver shows, Política de privacidad, Términos y condiciones

---

## 2. Stack Vivo

| Capa | Tecnología |
|------|-----------|
| CMS | WordPress 6.9.4 |
| E-commerce | WooCommerce 10.4.3 (instalado, pero tickets via SOLDOUT widget) |
| Builder | Elementor 3.30.3 |
| Theme | Hello Elementor (hello-theme-child-master) |
| Cache/CSS | Breeze minification |
| CDN | Cloudflare |
| Ticket widget | soldoutpromotions.com (`#surgical-widget-mount`) |

🔴 STALE CRÍTICO: El flujo de compra NO es WooCommerce checkout — es el widget de **SOLDOUT Promotions** embebido. El repo implementa WhatsApp CTAs por categoría. Decision de Angel pendiente (gate).

---

## 3. Tokens Reales del Vivo (del CSS de Breeze — fuente confirmada)

### Tipografías reales
| Fuente | Pesos | Uso | Fuente en vivo |
|--------|-------|-----|----------------|
| **Roobert** | 400, 600, 700 | Body/UI principal | Self-hosted `/wp-content/uploads/2024/02/` |
| **Bebas Neue** | 400–900 | Display/headlines | Elementor Google Fonts |
| **Hanken Grotesk** | 400–900 | UI secundario | Elementor Google Fonts |
| JetBrains Mono | variable | Acento/código | Elementor |

### Token drift repo vs vivo
| Token | Vivo | Repo (globals.css) | Estado |
|-------|------|--------------------|--------|
| Font display | Bebas Neue | `Barlow Condensed` (Google Fonts) | 🔴 DRIFT |
| Font body | Roobert | `var(--font-inter)` = Inter | 🔴 DRIFT |
| Font UI | Hanken Grotesk | `Barlow Condensed` | 🔴 DRIFT |
| `--gold` | no confirmado exacto | `#c9a227` | ⚠ pendiente confirmar |
| `--bg-deep` | no confirmado exacto | `#0c1a1f` | ⚠ pendiente confirmar |
| Design system | Glassmorphism (`.glass-card`, `.glass-nav_h`, `ambient-section`) | Dark custom CSS | 🔴 DRIFT |

> Roobert NO está en next/font Google — es self-hosted. Para el clon hay que hostear el WOFF2 o encontrar equivalente libre. Hanken Grotesk SÍ está en Google Fonts.
> La variable `--font-bebas` existe en layout.tsx (Bebas_Neue via next/font) pero ShowHero.tsx la usa — esos cambios están uncommited (`M layout.tsx`, `M ShowHero.tsx`).

### CSS en repo (globals.css) — tokens actuales
```css
--bg-deep:    #0c1a1f
--bg-card:    #0f2028
--gold:       #c9a227
--gold-hover: #e0b82e
--cream:      #f0ead8
--muted:      #8a9ea6
--border:     rgba(255,255,255,0.08)
```

---

## 4. Inventario de Componentes

### Vivo — secciones de `/producto/el-diario-de-un-loco/`
1. Nav (sticky glass)
2. Hero (imagen + título + badge fecha/venue + CTA COMPRAR BOLETOS)
3. Glass strip / Info strip (fecha, lugar, puertas, duración)
4. "SELECCIONA TUS ASIENTOS" → **SOLDOUT widget** (`#surgical-widget-mount`)
5. "Una Puesta en Escena de Clase Mundial" (ShowDescription)
6. "EL ESCENARIO" (VenueSection: mapa + dirección + Google Maps)
7. FAQ accordion
8. Footer

### Repo — rutas existentes
| Ruta | Componentes presentes |
|------|-----------------------|
| `/[slug]` (show) | ShowNav, ShowHero, InfoStrip, TrustBadges, ShowDescription, ShowDetails, VenueSection, FaqAccordion, ShowFooter, WhatsAppFloat, StickyCtaBar |
| `/[slug]/boletos` | BoletosNav, TicketGrid (categorías WhatsApp) |
| `/` | SOLO `redirect('/el-diario-de-un-loco')` |

### Huecos de rutas (NO existen en repo)
- Home (`/`) — solo redirect
- Cartelera/listado
- Tienda / filtros
- Carrito / checkout
- Cuenta / login
- Confirmación
- Política de privacidad / términos
- Otras páginas estáticas

---

## 5. SVG del Recinto

**Fuente:** `venues.svg_map` en DB (TEXT, 2074 chars aproximado).
**viewBox:** `0 0 300 220`  
**Tipo:** DECORATIVO por zona — NO tiene per-seat IDs.

### Estructura SVG (verificada del DB vivo)
```
<rect> ESCENARIO (fondo oscuro, borde dorado)
<rect> + <text> VIP — "30 asientos · $2,800" — fill #d4af37
<rect> + <text> PREFERENTE — "30 asientos · $1,800" — fill #c0c0c0
<rect> + <text> LUNETA — "45 asientos · $1,200" — fill #cd7f32
<rect> + <text> MEZANINE — "45 asientos · $900" — fill #4a9eff
```

**Total declarado en SVG:** VIP:30 + Preferente:30 + Luneta:45 + Mezanine:45 = **150 asientos**

🔴 STALE: handoff decía "1500 seats" → DB tiene 150 filas en `seats`. SVG confirma 150. CORRECCIÓN CONFIRMADA.

**GAP B4:** SVG es decorativo (4 rects de zona, sin IDs por butaca). Para interactividad 1:1 asiento↔DB se debe GENERAR el SVG desde la tabla `seats` (row_label + seat_number) — es construcción, no auditoría.

---

## 6. Modelo de Datos — Estado Actual

### Tablas en DB (verificado via swagger + REST)

```
faqs:          id, show_id, question, answer, sort_order
funciones:     id, show_id, venue_id, fecha, hora, puertas, estado
order_items:   id, order_id, seat_id, price_mxn
orders:        id, user_id, funcion_id, email, total_mxn, status, payment_intent_id, paid_at, created_at
price_sections: id, show_id, name, price_mxn, color_hex, sort_order
seats:         id, funcion_id, section_id, row_label, seat_number, status, held_until, held_by
shows:         id, slug, title, subtitle, artist, genre, description, age_min, duration_min, image_hero_url, is_active, created_at
tickets:       id, order_item_id, qr_payload, delivery_email, delivered_at, scanned_at, created_at
venues:        id, name, address, metro, parking, svg_map, capacity, created_at
```

**NO existe tabla `seat_holds` separada.** Los holds están inline en `seats` (`held_until`, `held_by`).

### Counts reales (2026-06-29)
| Tabla | Count | Nota |
|-------|-------|------|
| shows | 1 | solo el-diario-de-un-loco |
| venues | 1 | Teatro Hidalgo Ignacio Retes |
| funciones | 1 | 2026-10-15 20:00, on_sale |
| price_sections | 4 | VIP/Preferente/Luneta/Mezanine |
| seats | 150 | all status=available |
| faqs | 3 | |
| orders | 0 | |
| order_items | 0 | |
| tickets | 0 | |
| Storage | 1 asset | el-diario-de-un-loco-hero.jpg (245KB) |

### Drift types.ts vs DB real
| Tabla | En DB | En types.ts | GAP |
|-------|-------|-------------|-----|
| venues | capacity, created_at | ausentes | 🔴 tipos incompletos |
| seats | completa (8 cols) | NO tipada | 🔴 usada sin tipo |
| orders | 9 cols | NO tipada | 🔴 ausente |
| order_items | 4 cols | NO tipada | 🔴 ausente |
| tickets | 7 cols | NO tipada | 🔴 ausente |
| funciones | 7 cols | tiene 6 (falta created_at) | ⚠ parcial |
| shows | 12 cols | cubre todos | 🟢 ok |
| venues | 8 cols | cubre 6 | 🔴 falta capacity, created_at |
| price_sections | 6 cols | cubre todos | 🟢 ok |
| faqs | 5 cols | cubre todos | 🟢 ok |

### RLS
- Estado: DESCONOCIDO via REST (no hay función RPC expuesta para pg_tables).
- Se debe verificar con `supabase db inspect` o query directa en SQL editor de Supabase dashboard.
- PENDIENTE: confirmar qué tablas tienen RLS habilitado y qué policies existen.

---

## 7. Infraestructura Repo

### Repo (`/Users/angelkn/Desktop/teatro-hidalgo-work`)
| Item | Estado |
|------|--------|
| Branch | main |
| Uncommitted changes | `M src/app/[slug]/components/ShowHero.tsx` (Bebas), `M src/app/layout.tsx` (Bebas import) |
| supabase/ folder | ❌ NO existe |
| Migrations | ❌ NINGUNA como código |
| package.json deps | `@supabase/ssr`, `@supabase/supabase-js`, `next`, `react`, `react-dom` |
| devDeps | `@tailwindcss/postcss`, `tailwindcss`, `typescript`, `eslint-config-next` |
| Tailwind version | v4 (CSS-first `@theme` en globals.css, NO tailwind.config.js) |
| Stack | Next.js (aprox 16.2.9), React 19.2.4 |

### Deploy
- Vercel project: `prj_Y8ASJkLwuJyY27PewtsznXdVgQhL`
- URL prod: `https://teatro-hidalgo-work.vercel.app`
- Live slug: `/el-diario-de-un-loco` (PROD STATUS: 200)

---

## 8. VIVO → REPO/SUPABASE — Tabla de Estado (CONTRATO para bloques siguientes)

| Pieza | Vivo | Repo | DB | Estado |
|-------|------|------|----|--------|
| Home (`/`) | Secciones: hero, #cartelera, #el-teatro, footer | Solo `redirect('/el-diario-de-un-loco')` | N/A | 🔴 HUECO |
| Cartelera/listado | Sección en home con N shows (lazy-load) | ❌ NO existe | N/A | 🔴 HUECO |
| Nav (desktop+mobile) | glass-nav, hamburguesa | ShowNav (básico, sin hamburguesa) | N/A | ⚠ PARCIAL |
| Footer | links + social | ShowFooter (básico) | N/A | ⚠ PARCIAL |
| Página de show `/[slug]` | 8 secciones (ver §4) | Implementada completa para 1 show | 1 show | ⚠ PARCIAL (1 show, no 8) |
| Ticket widget | SOLDOUT widget | ❌ WhatsApp CTAs (flow diferente) | N/A | 🔴 HUECO / DECISION |
| `/[slug]/boletos` | N/A (el widget está en show page) | Implementada (WhatsApp por categoría) | seats 150 | ⚠ DECISION PENDIENTE |
| SVG recinto | Decorativo zonas | Decorativo via `dangerouslySetInnerHTML` | 🟢 en venues.svg_map | ✅ EXISTE (no-interactivo) |
| SVG interactivo per-seat | SOLDOUT widget maneja esto | ❌ NO existe | seats tiene row_label+seat_number | 🔴 HUECO → GAP B4 |
| Disponibilidad live | SOLDOUT widget | via seats.status='available' en /boletos | 🟢 funciona | ⚠ PARCIAL (solo en /boletos) |
| Carrito | WooCommerce cart | ❌ NO existe | orders=0 | 🔴 HUECO |
| Checkout | WooCommerce / SOLDOUT | ❌ NO existe | orders=0 | 🔴 HUECO / DECISION |
| Mi cuenta / auth | WooCommerce account | ❌ NO existe | auth=? | 🔴 HUECO |
| Confirmación | WooCommerce confirm | ❌ NO existe | N/A | 🔴 HUECO |
| Pol. privacidad / términos | Páginas estáticas | ❌ NO existen | N/A | 🔴 HUECO |
| Tienda/búsqueda/filtros | WooCommerce shop | ❌ NO existe | N/A | 🔴 HUECO |
| Fuentes: Roobert | Self-hosted vivo | ❌ NO en repo (Barlow Condensed en su lugar) | N/A | 🔴 TOKEN DRIFT |
| Fuentes: Hanken Grotesk | Google Fonts via Elementor | ❌ NO en repo | N/A | 🔴 TOKEN DRIFT |
| Fuentes: Bebas Neue | Google Fonts via Elementor | 🟢 importada (uncommitted) | N/A | ⚠ PENDING COMMIT |
| Shows en DB | 8 reales en vivo | 1 (el-diario-de-un-loco) | 1 | 🔴 STALE (7 shows faltantes) |
| Migraciones como código | N/A | ❌ NO existe supabase/ | DB sin versionado | 🔴 HUECO crítico |
| RLS | Desconocido | N/A | Desconocido | ❌ SIN VERIFICAR |
| types.ts completo | N/A | Incompleto (seats/orders/tickets/venues parciales) | DB tiene más | 🔴 DRIFT |

---

## 9. STALE CORRECTIONS (claude-smart)

| # | Handoff / prompt decía | Fuente viva dice | Impacto |
|---|------------------------|------------------|---------|
| 1 | "1500 seats" | **150 seats** (DB count + SVG labels) | Afecta estimaciones de capacidad y generation del SVG per-seat |
| 2 | "6 eventos" | 8 productos reales en sitemap + 1 en DB | B2 (cartelera) y B5 (seed) deben considerar los 8 |
| 3 | Flow = WooCommerce checkout | Flow = **SOLDOUT Promotions widget** embebido | Cambia completamente la arquitectura de B6 |
| 4 | Bebas Neue = cambio pendiente sin commit | CONFIRMADO uncommitted en ShowHero.tsx + layout.tsx | Presentar render antes de commit (gate solo para push) |
| 5 | venues.svg_map = "~2074 chars" | CONFIRMADO decorativo (4 rects zona, sin IDs per-seat) | B4 = CONSTRUCCIÓN desde seats, no auditoría de IDs |
| 6 | types.ts drift = seats/holds/zones/orders | venues también tiene drift (capacity, created_at ausentes) | B5 debe regenerar tipos completos |

---

## 10. Decisiones de Angel pendientes (gates antes de mutar DB/deploy)

| # | Decisión | Bloques afectados | Gate |
|---|----------|-------------------|------|
| D1 | ¿Bebas Neue commit? (render local ya capturado — solo git commit/push) | B1 | commit + push |
| D2 | ¿Flow de compra: SOLDOUT widget / WhatsApp CTAs / checkout propio? | B6 | arquitectura |
| D3 | ¿Asientos inline en show page o ruta `/boletos` separada? | B3, B4 | UX |
| D4 | ¿Aplicar migraciones a DB live? (prep en `supabase/migrations/*.sql`) | B5 | `apply_migration` |
| D5 | ¿Escalar/seed 7 shows faltantes a DB? | B5 | mutación masiva |

---

## 11. Plan de Bloques (post-ground-truth)

| Bloque | Nombre | Desbloqueado por | Decisiones necesarias |
|--------|--------|------------------|-----------------------|
| B1 | Sistema de diseño: tokens reales (Roobert, Hanken, Bebas) + chrome global | Nada | D1 (Bebas commit) |
| B2 | Home + cartelera (todos los shows) | B1 | — |
| B3 | Template de show completo (multi-slug) | B1, B5 (data) | D3 |
| B4 | SVG recinto interactivo | B3 | D3 |
| B5 | Schema Supabase completo + migraciones + seed | ground-truth | D4, D5 |
| B6 | Flujo de compra | B4/B3, B5 | D2 |
| B7 | Cuenta + páginas estáticas + idioma | B6 | — |
| B8 | Elevación UX/UI (por-slice post-clon) | cada slice cerrado | — |

---
*Generado por Querubín 🪽 — fuente viva, no handoff.*

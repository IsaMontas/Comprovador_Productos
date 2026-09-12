---
name: MercadoClaro RD
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3d4a42'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7a72'
  outline-variant: '#bccac0'
  surface-tint: '#006c4a'
  primary: '#006948'
  on-primary: '#ffffff'
  primary-container: '#00855d'
  on-primary-container: '#f5fff7'
  inverse-primary: '#68dba9'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#85f8c4'
  primary-fixed-dim: '#68dba9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  price-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 28px
    letterSpacing: -0.02em
  price-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.015em
  price-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.03em
  label-code:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  spacing-2xs: 0.25rem
  spacing-xs: 0.5rem
  spacing-sm: 0.75rem
  spacing-md: 1rem
  spacing-lg: 1.25rem
  spacing-xl: 1.5rem
  spacing-2xl: 2rem
  spacing-3xl: 3rem
  touch-target-min: 3rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  gutter-mobile: 0.75rem
  gutter-desktop: 1.5rem
---

## Brand & Style

This design system drives a consumer-first grocery intelligence platform tailored for the Dominican market. The brand personality blends hyper-efficiency, daily thriftiness, and institutional transparency. It empowers families and smart shoppers to compare grocery baskets across major Dominican chains (Sirena, Supermercados Nacional, Bravo, Jumbo, and PriceSmart) without cognitive overload or visual clutter.

The visual direction marries Modern Tactical Utility with energetic consumer clarity. Rather than feeling like a stark spreadsheet or an aggressive clearance catalog, the interface feels clean, organized, and motivating. Visual momentum is achieved through luminous emerald greens, crisp surfaces, and tactile, high-contrast price tags. Shoppers encounter clear, immediate data: where an item is cheapest, how much they save per basket in Dominican Pesos (`RD$`), and immediate verification of unit prices (per pound, kilo, or package).

Every element prioritizes instant scanning, trustworthy computation, and effortless one-handed mobile navigation under harsh tropical glare or busy supermarket aisle conditions.

## Colors

The color palette centers on fiscal smartness and energetic clarity:

- **Primary Emerald (`#059669`):** Represents certified savings, best-price confirmations, active navigation anchors, and primary conversion triggers. It conveys authority and financial relief.
- **Secondary Amber/Discount (`#F59E0B`):** Reserved for promo alerts, limited-time supermarket specials, percentage drop badges, and comparison deltas (e.g., "-24%").
- **Tertiary Mint/Savings Accent (`#10B981`):** Applied to subtle positive indicator pills, active toggle tracks, and highlighted delta metrics against card backgrounds.
- **Neutral & Slate Base:**
  - `neutral-900` (`#0F172A`): Primary headings, high-visibility pricing text, and stark tabular metrics.
  - `neutral-600` (`#475569`): Secondary descriptions, store metadata, and unit pricing qualifiers (e.g., `/ lb`).
  - `neutral-400` (`#94A3B8`): Inactive iconography, placeholder strings, and muted dividers.
  - `neutral-100` (`#F1F5F9`): Structural borders, segmented pill tracks, and secondary button backgrounds.
  - `neutral-50` (`#F8FAFC`): Global app canvas, drawer underlays, and soft background panels.
  - `surface-white` (`#FFFFFF`): Elevated comparison cards, interactive modals, and floating navigation bars.

### Functional Supermarket Color System
To identify retailer origin without diluting the system's clarity, retail indicators are applied strictly as discrete 12px pill badges or 2px card spine accents rather than full-surface colors.

## Typography

Typography relies entirely on **Plus Jakarta Sans**, selected for its friendly geometric geometry, open counters, and legible figure set in numerical data tables.

### Numerical Hierarchy & Currency Format
- Dominican Peso notation always adheres to `RD$` followed by a non-breaking space and the integer amount: `RD$ 245.95`.
- In price displays (`price-lg`, `price-md`), the `RD$` prefix and decimals are visually stepped down in weight (`fontWeight: 600`) or size (`0.75em`) relative to the primary integer group (`fontWeight: 800`), allowing shoppers to instantly scan whole dollar values.
- Crossed-out baseline prices use `neutral-400` with strict strikethrough styling and reduced scale to emphasize relative deals.

## Layout & Spacing

This design system uses an **8pt progressive base grid** (scaled down to 4pt for micro-alignments like tags and price superscripts).

### Viewport Breakpoints
- **Mobile (< 640px):** 4-column fluid layout with `16px` outer margins and `12px` gutters. Primary shopping interaction occurs here: full-width search input, sticky bottom comparison basket bar, and dual-column product cards. Minimum touch targets are locked to 48px (`touch-target-min`) across all tappable surfaces.
- **Tablet (640px - 1024px):** 8-column layout with `24px` outer margins and `16px` gutters. Category filters transition from horizontal scroll carousels into a sticky sidebar panel.
- **Desktop (> 1024px):** 12-column grid capped at a maximum width of `1240px` centered, with `32px` margins and `24px` gutters. Grid allows side-by-side multi-store column matching (Nacional vs. Sirena vs. Bravo).

## Elevation & Depth

To avoid murky, heavy shadows that degrade legibility on mobile screens, depth relies on **surface tiering paired with crisp boundary lines** and subtle emerald-tinted contact shadows.

- **Level 0 (Flat Canvas):** `#F8FAFC` — Base background surface for screens, sections, and structural rails.
- **Level 1 (Card Default):** `#FFFFFF` surface with a `1px` crisp border using `#E2E8F0` and an ambient tinted drop: `0px 1px 3px rgba(15, 23, 42, 0.04), 0px 1px 2px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hover / Active Deal Card):** `#FFFFFF` surface accompanied by a dynamic dual layer: `0px 4px 12px -2px rgba(5, 150, 105, 0.08), 0px 2px 6px -1px rgba(15, 23, 42, 0.04)`. Border shifts dynamically to `#CBD5E1`.
- **Level 3 (Sticky Basket / Bottom Modals):** `#FFFFFF` base with a soft elevation lift: `0px -4px 16px -2px rgba(15, 23, 42, 0.06), 0px -1px 4px rgba(15, 23, 42, 0.03)` and a top edge highlight line of `1px solid #F1F5F9`.
- **Level 4 (Floating Modals / Store Selector Sheets):** Elevated above the canvas with a 24px blurred backdrop scrim (`rgba(15, 23, 42, 0.4)`), bounded by `0px 12px 32px -4px rgba(15, 23, 42, 0.12)`.

## Shapes

The geometric identity is friendly yet structured, using standard rounded values (`roundedness: 2`) for balance:

- **Cards & Modals:** `16px` border-radius (`rounded-xl`), creating comfortable, friendly groupings for dense item specs.
- **Form Controls & Inputs:** `12px` border-radius (`rounded-lg`), establishing comfortable tap perimeters.
- **Pills, Badges & Chips:** Fully rounded circular curves (`9999px`), reserving true pill forms exclusively for transient tags: store tags, percentage discount marks, and status flags.
- **Inner Asset Containers:** Product imagery containers inside cards inherit `10px` radius to maintain concentricity with the parent card's `16px` outer boundary.

## Components

### Buttons
- **Primary CTA:** Background `#059669`, text `#FFFFFF`, font-weight 700. Height 48px on mobile, radius 12px. Active press state reduces scale to `0.98` with background tint `#047857`.
- **Secondary Action:** Background `#F1F5F9`, text `#0F172A`, hover background `#E2E8F0`.
- **Savings / Offer Button:** Background `#F59E0B`, text `#FFFFFF`, with prominent bold weight for high-urgency notifications.

### Chips & Pill Badges
- **Best Price Badge:** Background `#ECFDF5`, text `#047857`, border `1px solid #A7F3D0`, font size `11px`, all caps, tracking `0.03em`.
- **Discount Percentage Badge:** Background `#FEF3C7`, text `#B45309`, border `1px solid #FDE68A`.
- **Supermarket Tag:** Height 24px, pill-shaped, neutral grey background `#F8FAFC`, border `#E2E8F0`, paired with an 8px circular brand dot representing the respective supermarket chain.

### Cards (Product & Price Comparison)
- **Structure:** Vertical mobile format with a clean square (1:1) white image area, followed by brand/category label in `body-sm`, product title in `headline-sm`, and a dedicated comparison tray at the bottom.
- **Comparison Tray:** Embedded list layout featuring top 3 supermarkets. The lowest price row is highlighted with a soft `#ECFDF5` background strip and an explicit `RD$ XXX.XX` green metric, while competing higher rates display their numeric variance (e.g., `+RD$ 45.00`) in `neutral-600`.

### Form Controls & Inputs
- **Global Search Bar:** Prominent 52px height, pure `#FFFFFF` fill with `1.5px` border `#E2E8F0`. Prefix icon with clean stroke search glass, suffix with an instant "Filtrar" or barcode scanning trigger. Focus ring creates a crisp 3px outer glow: `0px 0px 0px 3px rgba(5, 150, 105, 0.18)`.
- **Quantity Pickers:** Stepper format (`-`, count, `+`) with minimum touch boundaries of 44px x 44px to allow rapid cart adjustments.

### Floating Cart / Basket Difference Anchor
- Fixed bottom sticky card spanning screen width minus 32px margins on mobile.
- Left zone displays total accumulated savings (`Ahorras RD$ 1,240.00`) in `#059669`.
- Right zone holds the primary checkout or detailed store split button ("Ver Distribución").
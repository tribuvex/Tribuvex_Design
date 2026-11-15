# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/tribuvex/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Tribuvex  
**Generated:** 2026-11-14  
**Source:** ui-ux-pro-max + PRD Tribuvex  
**Category:** E-signature / Document Workflow (tax audit console)  
**Stack:** React + Tailwind CSS  
**Design Dials:** Variance 4/10 | Motion 4/10 | Density 8/10 (Dense / Dashboard)

**Preview:** open `design-system/tribuvex/ui-kit-preview.html` in a browser (aligned with mockup polish: shell, PC modal, toast, error summary, no emoji icons).

**Tokens (implementable):**
- `design-system/tribuvex/tokens.css` — primitive → semantic → component + Tailwind v4 `@theme inline`
- `design-system/tribuvex/tokens.json` — handoff / inventory of the same layers

**Page overrides** (rules here win over this Master when building that page):

| Page file | Surface |
|-----------|---------|
| `pages/dashboard.md` | Lista de expedientes / cola de riesgo |
| `pages/expediente.md` | Workspace: pipeline + trazabilidad |
| `pages/checkpoint.md` | PC1–PC5 aprobar / editar / rechazar |
| `pages/checkpoint-preview.html` | HTML vivo de PC2 (tokens + dark mode) |
| `pages/portal-contribuyente.md` | Portal del contribuyente |

**Components:** `components.md` — estados (default/hover/focus/active/disabled/loading) para Button, Badge, Field, Card, Table, Modal, Toast, Tabs, Skeleton, Checkpoint.

**UX deliverables (progresivo / PRD):** `ux/ENTREGABLES_UX.md` · Sitemap · Flows · Content · Wireframes · Prototype · **Mockup completo HTML+TW:** `mockup/index.html`

**React + Tailwind v4 usage:**
```css
@import "./design-system/tribuvex/tokens.css";
```
Then use complete utilities: `bg-primary`, `text-muted-foreground`, `bg-accent`, `border-border`, `font-sans`, `rounded-md`.  
Dark mode: add class `dark` on `<html>`. Do not interpolate class names (`bg-${color}`).

---

## Global Rules

### Pattern

**Name:** Workflow Audit Console (adapted from Enterprise Gateway)

| Surface | Behavior |
|---------|----------|
| Accountant / reviewer app | Dense shell: expediente list → pipeline stages → casilla traceability → human checkpoints (approve / edit / reject) |
| Taxpayer portal | Same palette, lower density: upload supports, missing-items status, accept draft |
| Primary CTAs | Advance / Approve (accent green) |
| Secondary CTAs | Edit / View trace (secondary blue or outline primary) |
| Destructive | Reject only |

Do **not** expose “Present in MUISCA” as an automatic product action.

### Color Palette

| Role | Hex | CSS Variable | Tailwind token |
|------|-----|--------------|----------------|
| Primary | `#1E3A5F` | `--color-primary` | `primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` | `on-primary` |
| Secondary | `#2563EB` | `--color-secondary` | `secondary` |
| On Secondary | `#FFFFFF` | `--color-on-secondary` | `on-secondary` |
| Accent / success | `#16A34A` | `--color-accent` | `accent` |
| On Accent | `#FFFFFF` | `--color-on-accent` | `on-accent` |
| Warning | `#D97706` | `--color-warning` | `warning` |
| On Warning | `#FFFFFF` | `--color-on-warning` | `on-warning` |
| Background | `#F8FAFC` | `--color-background` | `background` |
| Foreground | `#0F172A` | `--color-foreground` | `foreground` |
| Card | `#FFFFFF` | `--color-card` | `card` |
| Card Foreground | `#0F172A` | `--color-card-foreground` | `card-foreground` |
| Muted | `#E9EEF5` | `--color-muted` | `muted` |
| Muted Foreground | `#475569` | `--color-muted-foreground` | `muted-foreground` |
| Border | `#CBD5E1` | `--color-border` | `border` |
| Destructive | `#DC2626` | `--color-destructive` | `destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` | `on-destructive` |
| Ring | `#1E3A5F` | `--color-ring` | `ring` |

**Color Notes:** Trust navy + signature green + audit trail. Warning is Tribuvex-specific for exogenous mismatches and risk queue.

Use semantic tokens only (`bg-primary`, not raw hex in components). Keep Tailwind class names statically complete (no `bg-${color}-500` interpolation).

### Typography

- **Heading / Body:** IBM Plex Sans (300–700)
- **Figures / UVT / casillas:** IBM Plex Mono (optional, tabular nums)
- **Mood:** financial, trustworthy, professional
- **Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
```

| Step | Size | Use |
|------|------|-----|
| Label | 12px | Meta, badges, table headers |
| Body | 14px | App body (dense) |
| Emphasis | 16px | Portal body, form labels |
| Section | 18–20px | Panel titles |
| Page | 24px | Expediente title |

Line-height: ~1.5 prose, ~1.25 table cells. Long copy measure ≤ 65ch.

### Spacing Variables

*Density: 8/10 — Dense / Dashboard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Chip gaps |
| `--space-2` | `8px` | Adjacent controls (min gap) |
| `--space-3` | `12px` | Compact input padding |
| `--space-4` | `16px` | Card / table row padding |
| `--space-6` | `24px` | Block gaps in expediente |
| `--space-8` | `32px` | Pipeline stage separation |
| `--space-12` | `48px` | Portal / marketing only |

Accountant app gutters: 16–24px. Taxpayer portal gutters: 24–48px.

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(15,23,42,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(15,23,42,0.08)` | Cards |
| `--shadow-lg` | `0 10px 15px rgba(15,23,42,0.10)` | Modals, dropdowns |

Prefer borders over heavy elevation in dense tables.

---

## Component Specs

### Buttons

- **Primary (approve / advance):** `bg-accent` `#16A34A`, text white, padding 8×16 (dense) or 12×24 (portal)
- **Secondary (edit / outline):** transparent, border 1–2px primary, text primary
- **Info / trace:** `bg-secondary` `#2563EB`
- **Destructive (reject):** `bg-destructive` `#DC2626`
- Radius: 6–8px. Transition 150–250ms. No layout-shifting hover scale on table actions.
- Focus: `outline` / ring 2px `--color-ring` with 2px offset

### Status badges

| State | Color |
|-------|-------|
| Approved / reconciled | Accent green |
| Pending review / mismatch | Warning amber |
| Rejected / error | Destructive red |
| Info / in progress | Secondary blue |
| Neutral / draft | Muted |

### Cards & panels

White card on `#F8FAFC` canvas, 1px border `#CBD5E1`, radius 8–12px, padding `--space-4` to `--space-6`. Do not make every surface a card; use cards for interactive expediente units.

### Inputs

Label always visible (never placeholder-only). Border `#CBD5E1`, focus ring primary. Dense padding 10–12px vertical.

### Icons

**Phosphor regular** (`@phosphor-icons/react` in product; mockup: `mockup/assets/icons.js`).
- One family only; `currentColor`; sizes 14 / 16 / 20 / 24.
- Decorative beside text: `aria-hidden` / `data-icon` auto-decorative.
- Icon-only controls: accessible name (`aria-label` or `data-icon-label`).
- No emoji as structural icons. Brand logos (Microsoft/Google) stay official SVGs.

---

## Style Guidelines

**Style:** Minimalism & Swiss Style  
**Keywords:** Clean, functional, high contrast, geometric, grid-based, essential  
**Key Effects:** Subtle hover 200–250ms, clear type hierarchy, fast loading  
**Modes:** Light first; dark supported with same semantic tokens remapped

---

## Motion

- App: opacity/color transitions 150–250ms only
- Landing grids may use short stagger; **never** `back.out` overshoot on data tables
- Honor `prefers-reduced-motion: reduce` (instant final state)

---

## Anti-Patterns (Do NOT Use)

- ❌ Confusing signing / approval flow
- ❌ Weak audit trail
- ❌ Hidden consent
- ❌ Neon / cyberpunk / purple-glow SaaS clichés
- ❌ Emojis as icons
- ❌ Invisible focus states
- ❌ Low-contrast muted body text (< 4.5:1)

---

## Pre-Delivery Checklist

- [ ] Semantic color tokens only
- [ ] No emojis as icons (Phosphor / Lucide)
- [ ] `cursor-pointer` on clickable elements
- [ ] Hover 150–300ms without layout shift
- [ ] Text contrast ≥ 4.5:1 (light and dark)
- [ ] Visible keyboard focus; sticky chrome does not fully obscure focus
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Checkpoint actions: Approve / Edit / Reject clearly labeled

# Tribuvex — Component Specs & States

Source of truth for interactive states. Tokens: `tokens.css`. Pages may override layout, not these state rules unless noted.

**State priority (highest → lowest):** disabled → loading → active → focus → hover → default

**Transitions:** color / background / border / opacity `150–200ms`; no layout-shifting scale on table actions.  
**Focus:** `outline 2px solid var(--ring); outline-offset 2px` (`:focus-visible`).  
**Disabled:** opacity ~0.45, `cursor-not-allowed`, no pointer handlers.  
**Touch:** do not rely on hover alone for primary actions.

---

## Button

**Variants:** `primary` (approve/advance) · `secondary` (edit/outline) · `info` (trace) · `destructive` (reject) · `ghost`  
**Sizes:** `sm` (table) · `md` (default)

| Property | default | hover | focus-visible | active | disabled | loading |
|----------|---------|-------|---------------|--------|----------|---------|
| primary bg | `--button-primary-bg` | `--button-primary-bg-hover` | + ring | slightly darker | muted @ 0.45 | same + spinner, `aria-busy` |
| primary fg | `--button-primary-fg` | same | same | same | muted-fg | same |
| secondary | transparent + border `--primary` | bg muted 40% | + ring | border stronger | 0.45 | spinner |
| info | `--secondary` | `--secondary-hover` | + ring | darker | 0.45 | spinner |
| destructive | `--destructive` | `--destructive-hover` | + ring | darker | 0.45 | spinner |
| ghost | `--muted` | slightly darker muted | + ring | pressed muted | 0.45 | spinner |

**Rules:** `cursor-pointer` when enabled. Loading disables double-submit. Icon decorative → `aria-hidden`; icon-only → accessible name.

**Checkpoint order:** Aprobar (primary) → Editar (secondary) → Rechazar (destructive).

---

## Badge / Status

| Variant | bg | fg | Use |
|---------|----|----|-----|
| success | `--success-subtle` | `--success-foreground` | Conciliado, aprobado |
| warning | `--warning-subtle` | `--warning-foreground` | Diferencia, PC pendiente |
| danger | `--destructive-subtle` | destructive text | Rechazado, error |
| info | `--info-subtle` | `--info-foreground` | En proceso, omitido PC |
| neutral | `--muted` | `--muted-foreground` | Borrador |

States: static (default). Not focusable unless inside a button. Never color-only — include text (and optional Phosphor icon).

Live counts: one contextual `role="status"` message, not a bare number.

---

## Field (Input / Select / Textarea)

| Property | default | hover | focus | error | disabled |
|----------|---------|-------|-------|-------|----------|
| border | `--field-border` | slightly stronger | `--ring` + `--field-focus-ring` | `--destructive` | muted |
| bg | `--field-bg` | same | same | same | muted |
| label | always visible | — | — | — | — |
| message | hint muted | — | — | `role="alert"` / `aria-describedby` | — |

**Rules:** never placeholder-only. Multi-error forms: focusable error summary at top after submit + inline errors. `aria-invalid="true"` when error.

---

## Card / Panel

| Property | default | hover (interactive only) | focus-within |
|----------|---------|--------------------------|--------------|
| bg | `--card-bg` | elevation-md optional | ring or border `--ring` |
| border | `--card-border` | same | stronger |
| padding | `--card-padding` (`--space-6`) | — | — |

Non-interactive cards: no hover lift, no `cursor-pointer`.

---

## Table

| Part | Spec |
|------|------|
| header | `--table-header-bg`, 11–12px uppercase muted |
| cell | padding `--table-cell-*`, border `--table-border` |
| numbers | `font-mono` tabular |
| row hover | muted wash; no layout shift |
| row selected | info-subtle bg |
| actions | ghost `sm` buttons |

Empty: one empty state message + CTA, not a blank grid.

---

## Modal / Dialog (checkpoint can use this chrome)

| Part | Spec |
|------|------|
| overlay | `--modal-overlay`, z `--z-overlay` |
| panel | `--modal-bg`, radius `--modal-radius`, shadow `--elevation-lg`, z `--z-modal` |
| focus | trap inside; initial focus on title or first action; restore on close |
| escape | allowed only if interrupt state already persisted |
| sticky footer | actions not obscured; `scroll-padding` so focus stays visible |

---

## Toast / Inline alert

| Variant | Use |
|---------|-----|
| success | Approval saved |
| warning | Diff remaining |
| danger | Reject / validation |
| info | Agent progress |

Prefer **inline** `role="alert"` for form/checkpoint errors. Toasts for non-blocking confirmations; don’t replace required error summary.

---

## Skeleton / Loading region

- Stable skeleton matching final layout; `aria-busy="true"` on region  
- No flicker for near-instant work  
- SSE expediente progress: progress text + skeleton, not a spinning full-page block

---

## Tabs (dashboard filters / revisor queue)

| State | Visual |
|-------|--------|
| inactive | muted fg |
| hover | foreground |
| selected | primary underline or border-b-2 + `aria-selected` |
| focus-visible | ring |

---

## Checkpoint panel (composite)

Composes: Card + Badge + Table/List + Button row + optional Field (reject reason).

| Element | Rule |
|---------|------|
| Accent bar | 4px left `warning` (or `destructive` if blocked) |
| Disclaimer | always visible (RNF-17) |
| Actions | sticky; order Aprobar → Editar → Rechazar |
| Reject | reason field required; error summary on fail |
| Omitido | info badge only — not a fake dialog |

See `pages/checkpoint.md` and `pages/checkpoint-preview.html`.

---

## Banner (system status)

| Variant | Use | Role |
|---------|-----|------|
| `danger` | Auth error, blocking | `role="alert"` + focus when shown after submit |
| `warning` | Session expired, package blocked, derived | `role="status"` |
| `info` | Paused + Resume CTA | `role="status"` |
| `muted` | Model degradation (RNF-10) | `role="status"` |

Do not use toast for these — stay on-page until resolved.

## Empty state

Centered dashed panel: icon (SVG) · title · one short sentence · primary or secondary CTA.  
Copy from `ux/CONTENT_MODEL.md` (never invent empty copy). Variants: no data · filter no results · no permission (403) · not found (404).

Live catalog: `mockup/estados.html`. Preview: `ui-kit-preview.html#estados-sistema`.

## Iconography

Library: Phosphor outline. Sizes: 16 (inline), 20 (default), 24 (empty states).  
Stroke consistency within a view. No emoji as icons.

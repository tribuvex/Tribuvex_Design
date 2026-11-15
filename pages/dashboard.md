# Page Override: dashboard

> Overrides `MASTER.md` for the accountant / reviewer home: expediente list and risk queue.

**Route ideas:** `/app`, `/expedientes`  
**Users:** Contador preparador, Revisor/socio  
**Density:** Master dense (8) — keep gutters 16–24px  
**Tokens:** use `tokens.css` as-is (`bg-background`, `bg-sidebar`, badges)

---

## Layout

| Zone | Spec |
|------|------|
| Shell | Left `bg-sidebar` nav (fixed) + main `bg-background` |
| Header | Page title 24px + primary CTA **Nuevo expediente** (`bg-accent`) |
| Filters | Compact row: año gravable, estado, riesgo, búsqueda — labels always visible |
| Body | Data table (default) or list rows; prefer table on ≥1024px |
| Risk queue (revisor) | Separate tab or pinned section above table; sort by risk desc |

Do **not** put marketing hero, KPI strip of vanity metrics, or card grid of every expediente on first paint.

---

## Table columns (minimum)

1. Cliente / documento  
2. Año gravable  
3. Etapa actual (1–7)  
4. Estado (badge)  
5. Riesgo (badge warning/danger or muted)  
6. Pendiente de (PC / persona)  
7. Actualizado  
8. Acciones (`Ver` ghost sm)

Numbers and NIT: `font-mono` tabular.

---

## Status badges

| Estado | Token / class |
|--------|----------------|
| Borrador | `badge-neutral` / muted |
| En proceso | `badge-info` / secondary |
| Esperando aprobación | `badge-warning` |
| Diferencia exógena | `badge-warning` |
| Listo para paquete | `badge-success` |
| Rechazado / derivado | `badge-danger` |

Icons (Phosphor): `ListBullets` (lista), `Warning` / `CheckCircle` / `XCircle` by status. Decorative beside label → `aria-hidden`.

Live counts (cola de riesgo): one `role="status"` atomic message, e.g. «3 expedientes de alto riesgo» — never a bare number live region.

---

## Interactions

- Row click → expediente detail  
- CTA feedback: loading → success/error (no silent submit)  
- Sticky header must not fully obscure focused filters (`scroll-padding-top`)

---

## Anti-patterns (page)

- ❌ Cards for every expediente in season peak  
- ❌ Auto-refresh that steals focus  
- ❌ Color-only risk without text/badge label  

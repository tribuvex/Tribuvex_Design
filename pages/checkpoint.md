# Page Override: checkpoint

> Overrides `MASTER.md` for human control points Control 1–Control 5 (approve / edit / reject).

**Surfaces:** modal, full-width panel, or route interrupt inside expediente  
**Users:** Contador preparador; Revisor on high-risk / Control 5  
**Density:** Slightly airier than tables — padding `--space-6`, actions always visible  
**PRD mapping:** Control 1 ruta · Control 2 exógena · Control 3 depuración · Control 4 patrimonio · Control 5 borrador

---

## Layout

| Zone | Spec |
|------|------|
| Chrome | Left border 4px `warning` (or `destructive` if blocked); title = PC name |
| Summary | What changed / why paused — plain language + key facts |
| Detail | Lists, cédula table, or patrimonio comparison — scrollable |
| Disclaimer | RNF-17: system assists; professional responsibility is the accountant’s |
| Actions | Sticky footer: **Aprobar** · **Editar** · **Rechazar** (order fixed) |

Control 2/Control 4 may auto-skip with audit note when there is nothing to decide — show read-only “Omitido — sin diferencias” badge info, not a fake approval dialog.

---

## Actions (non-negotiable)

| Action | Style | Meaning |
|--------|-------|---------|
| Aprobar | `btn-primary` / `bg-accent` | Resume graph; write approval to audit log |
| Editar | `btn-secondary` outline primary | Stay interrupted; open edit path |
| Rechazar | `btn-destructive` | Stop path; require reason (label + error if empty) |

Focus order: summary → detail links → Aprobar → Editar → Rechazar.  
After failed validation (e.g. reject without reason): focus error summary (`role="alert" tabindex="-1"`) + inline field errors — not toast-only.

---

## Per-PC content hints

| PC | Emphasize |
|----|-----------|
| Control 1 | Residencia, obligación, out-of-scope derivation |
| Control 2 | Difference list: soporte vs exógena + proposed action |
| Control 3 | Cédula grid, capped deductions, exclusive options |
| Control 4 | YoY patrimonio; written risk acceptance if proceeding |
| Control 5 | Full 210 preview, saldo, verifier findings before package |

---

## Icons (Phosphor)

`CheckCircle` approve · `PencilSimple` edit · `XCircle` reject · `Warning` Control 4 risk · `ShieldCheck` audit

---

## Anti-patterns (page)

- ❌ One-click approve with no summary of what changed  
- ❌ Soft-colored reject that looks like secondary  
- ❌ Closing overlay without persisting interrupt state  
- ❌ Hidden consent / silent “accept risk” on Control 4  

## Preview

Open `checkpoint-preview.html` (Control 2 demo: approve / edit / reject with error summary). Component states: `../components.md`.

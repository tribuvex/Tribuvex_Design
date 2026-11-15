# Page Override: checkpoint

> Overrides `MASTER.md` for human control points PC1–PC5 (approve / edit / reject).

**Surfaces:** modal, full-width panel, or route interrupt inside expediente  
**Users:** Contador preparador; Revisor on high-risk / PC5  
**Density:** Slightly airier than tables — padding `--space-6`, actions always visible  
**PRD mapping:** PC1 ruta · PC2 exógena · PC3 depuración · PC4 patrimonio · PC5 borrador

---

## Layout

| Zone | Spec |
|------|------|
| Chrome | Left border 4px `warning` (or `destructive` if blocked); title = PC name |
| Summary | What changed / why paused — plain language + key facts |
| Detail | Lists, cédula table, or patrimonio comparison — scrollable |
| Disclaimer | RNF-17: system assists; professional responsibility is the accountant’s |
| Actions | Sticky footer: **Aprobar** · **Editar** · **Rechazar** (order fixed) |

PC2/PC4 may auto-skip with audit note when there is nothing to decide — show read-only “Omitido — sin diferencias” badge info, not a fake approval dialog.

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
| PC1 | Residencia, obligación, out-of-scope derivation |
| PC2 | Difference list: soporte vs exógena + proposed action |
| PC3 | Cédula grid, capped deductions, exclusive options |
| PC4 | YoY patrimonio; written risk acceptance if proceeding |
| PC5 | Full 210 preview, saldo, verifier findings before package |

---

## Icons (Phosphor)

`CheckCircle` approve · `PencilSimple` edit · `XCircle` reject · `Warning` PC4 risk · `ShieldCheck` audit

---

## Anti-patterns (page)

- ❌ One-click approve with no summary of what changed  
- ❌ Soft-colored reject that looks like secondary  
- ❌ Closing overlay without persisting interrupt state  
- ❌ Hidden consent / silent “accept risk” on PC4  

## Preview

Open `checkpoint-preview.html` (PC2 demo: approve / edit / reject with error summary). Component states: `../components.md`.

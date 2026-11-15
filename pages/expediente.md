# Page Override: expediente

> Overrides `MASTER.md` for the expediente workspace: pipeline, agent stream, casilla traceability.

**Route ideas:** `/expedientes/:id`  
**Users:** Contador preparador (primary), Revisor (read + PC5)  
**Density:** Dense; split panes on ≥1280px  
**Related:** checkpoints use `pages/checkpoint.md` when interrupted

---

## Layout

| Zone | Spec |
|------|------|
| Top bar | Cliente + AG + badge estado + actions (Pausar, Ver bitácora) |
| Pipeline | 7 stages horizontal (or compact stepper on mobile): Residencia → Obligación → Soportes → Cédulas → Liquidación → Patrimonio → Paquete |
| Main | Left/center: stage content (soportes, cédulas, liquidación) |
| Trace panel | Right drawer or column: casilla → soporte → regla → artículo |
| Agent | SSE progress: stable skeleton / progress, `aria-busy` on region; no flicker spinners for &lt;300ms work |

Stage states: `done` (success subtle), `current` (info subtle), `risk` (warning), idle (muted).

---

## Traceability panel (must)

Every selected amount shows:
1. Casilla / concepto  
2. Valor (`font-mono`)  
3. Soporte enlazado  
4. Regla / versión UVT  
5. Artículo (ET / DUR)  
6. CTA **Ver traza** → `bg-secondary` or ghost

Never show LLM-invented figures as editable tax amounts; figures come from the rules engine only.

---

## Typography & measure

- Body 14px in panes  
- Casilla labels 12px uppercase muted  
- Long explanations ≤65ch in the agent/message column

---

## Icons (Phosphor)

| Action | Icon |
|--------|------|
| Pipeline done | `CheckCircle` |
| Current stage | `Circle` / `Spinner` (busy) |
| Trace | `Path` / `Link` |
| Documents | `FileText` |
| Pause | `Pause` |

---

## Motion

- Stage transitions: opacity/color 150–200ms only  
- No stagger / overshoot on tables or casilla grids  
- Honor `prefers-reduced-motion`

---

## Anti-patterns (page)

- ❌ Chat-only UI without pipeline and table of casillas  
- ❌ “Presentar en MUISCA” button  
- ❌ Hiding which rule produced a number  

# Tribuvex — Entregables UX (progresivo, anclado al PRD)

Plan de entregables UX alineado a `01_PRD/PRD_Tribuvex.md` (fases 0–4, roles, 7 etapas, Control 1–Control 5) y al design system en `Tribuvex_Design/`.

## Cómo leer prioridades

| Código | Significado |
|--------|-------------|
| **P / M / G** | Pequeño / Mediano / Grande (alcance del cambio o del producto en ese momento) |
| **N / E** | Nuevo / Evolutivo |
| **I / O** | Incluir / Opcional |

**Clasificación Tribuvex:** producto **Grande Nuevo (GN)** en conjunto. Se entrega por **rebanadas MN→GN**: fase 1 = mediano nuevo (asalariado + Control 1/Control 3/Control 5); fase 2–3 amplían a grande; portal y cola de riesgo entran en fase 3 (decisión §16 aún abierta).

---

## Matriz para Tribuvex

| Entregable | Objetivo y contenido mínimo (Tribuvex) | Responsables típicos | Ejemplo / plantilla | Prioridad Tribuvex |
|------------|----------------------------------------|----------------------|---------------------|-------------------|
| **Information architecture / sitemap** | Estructura de la app contador + portal. Nodos mínimos: Login · Dashboard expedientes · Expediente (7 etapas) · Control 1–Control 5 · Bitácora · Paquete · Admin entidad (users/roles) · (F3) Portal contribuyente · (F3) Cola riesgo revisor. Niveles, navegación primary/secondary, excepciones (derivado a manual, PC omitido, fuera de alcance). | UX/IA + Content (+ PM) | `ux/templates/sitemap.md` · NN/g sitemap | **GN I** · Empezar **MN I** en fase 0–1 (sin portal si §16 lo aplaza) |
| **Task flow / user flow** | Un flujo por tarea crítica. Campos: trigger, pasos, decisiones humanas, sistema (grafo/SSE), errores, alternativas, estado final. Mínimo fase 1: (1) Expediente asalariado soportes→paquete, (2) Control 1, (3) Control 3, (4) Control 5. Fase 2: Control 2, Control 4, fuera de alcance. Fase 3: portal upload+aceptar borrador, cola riesgo. | UX + PM + Tech | `ux/templates/user-flow.md` · Miro User Flow · NN/g | **I en todos** (obligatorio) |
| **Wireflow** | Mapa visual wire + flechas; cada nodo URL del mockup. No duplica reglas (las tiene el task flow). Catálogo WF-01…16. | UX + Designer | [`ux/wireflows/index.html`](./wireflows/index.html) | **MN I** · puente task flow ↔ prototype |
| **Wireframes** | Jerarquía y estados sin pixel-perfect. Contenido realista (casillas, UVT, diferencias exógena). Estados: vacío, loading SSE, PC interrupt, error validación, omitido Control 2/Control 4. Pantallas fase 1: dashboard lista, expediente, Control 1/Control 3/Control 5, paquete. | Product Designer | `ux/templates/wireframe-checklist.md` · NN/g | **MN I** fase 1 · **GN I** al cerrar cobertura · PE O solo para tweaks triviales post-piloto |
| **Content model / UX writing spec** | Labels, títulos, CTA (Aprobar/Editar/Rechazar), errores, ayudas, vacíos, RNF-17 disclaimer, tono portal sin jerga vs app contador, ownership (quién edita copy). Glosario: casilla, UVT, exógena, cédula, Control N, bitácora. | Content / UX Writer + UX | `ux/templates/content-spec.md` · USWDS content guidance | **MN I** (producto content-heavy + normativo) · Portal **I** en F3 · PN/PE O no aplica: no es feature trivial |
| **Exploraciones / design alternatives** | ≥2 alternativas en decisiones de alto impacto antes de converger. Registrar criterio y decisión. Temas: shell densidad vs wizard; PC como modal vs ruta; portal incluido F3 vs solo contador (§16); traza en drawer vs página. | Designer + squad | `ux/templates/design-alternatives.md` · NN/g explore-then-converge | **MN I / GN I** en fase 0–1 · **ME O** para pulido menor |
| **Prototype** | Simular lo que se va a evaluar. Doc: alcance, fidelidad, escenario, datos ficticios, límites, versión. Fase 1: prototipo clickable o HTML de PC + expediente asalariado. Fase 3: portal upload. Código (HTML/React) preferible para PC y SSE percibido (GOV.UK). | Product Designer; Front para proto en código | Ya: `pages/checkpoint-preview.html`, `ui-kit-preview.html` · `ux/templates/prototype-brief.md` | **I en todos** |
| **UI specification / annotated design** | Antes de dev de cada superficie: estados, breakpoints, validación, loading, empty/error/success, teclado, focus, motion, reglas de negocio UI (sin efecto sin aprobación). Reutilizar `components.md` + page overrides. | Product Designer + Engineer | `components.md`, `pages/*.md`, `tokens.css` · USWDS component pattern | **MN I / ME I / GN I** · PN O solo si squad ya integrado y la superficie es trivial |
| **Design-system contribution** | Tokens, componentes, anatomy, variants, states, do/don’t, a11y, content, código. No reinventar por pantalla. | DS owner / Designer + Front | `MASTER.md`, `tokens.css`, `tokens.json`, `components.md`, `pages/*` · USWDS | **MN O→I**: base ya existe · **ME I / GN I** al añadir Table, Upload, Toast, Checkpoint compuestos |
| **Design decision log** | Decisiones difíciles: fecha, problema, alternativas, evidencia (PRD/RNF/piloto), decisión, responsable, condición de revisión. Semilla: MUISCA manual; no credenciales DIAN; PC omitidos con bitácora; portal pendiente §16; accent=aprobar no “pagar”. | Designer / PM / Tech | `ux/DESIGN_DECISIONS.md` · ADR o product log | **MN I / ME I / GN I** |

---

## Progresión por fase PRD

### Fase 0 — Descubrimiento (ahora → dic 2026)

| # | Entregable | Salida mínima |
|---|------------|---------------|
| 1 | Design decision log (abrir) | Semilla de decisiones UX/producto ligadas a §16 |
| 2 | Exploraciones | 2–3 forks: portal sí/no F3; PC modal vs página; densidad dashboard |
| 3 | IA / sitemap (MN) | Mapa app contador MVP **sin** asumir portal |
| 4 | Task flows (core) | Asalariado E2E + Control 1 + Control 3 + Control 5 |
| 5 | Content model (borrador) | Glosario + CTAs de checkpoint + RNF-17 |
| — | Design system | **Hecho (base):** tokens, MASTER, components, page overrides |

### Fase 1 — MVP (ene–mar 2027)

| # | Entregable | Salida mínima |
|---|------------|---------------|
| 6 | Wireframes | Dashboard, expediente 7 etapas (camino asalariado), Control 1/Control 3/Control 5, paquete |
| 7 | Prototype | HTML/React: expediente + al menos un PC evaluable con usuarios internos |
| 8 | UI spec | Anotar wireframes/proto con estados de `components.md` |
| 9 | DS contribution | Subir Upload, Table row actions, Checkpoint compuesto si faltan en código |

### Fase 2 — Cobertura (abr–jun 2027)

| # | Entregable | Salida mínima |
|---|------------|---------------|
| 10 | Task flows | Control 2, Control 4, fuera de alcance, doble aprobación riesgo |
| 11 | Wireframes + UI spec | Conciliación exógena, patrimonio, verificador |
| 12 | Content spec | Mensajes de diferencia exógena y aceptación de riesgo escrita (Control 4) |
| 13 | Decision log | Actualizar con hallazgos de usabilidad MVP |

### Fase 3 — Piloto (jul–oct 2027)

| # | Entregable | Salida mínima |
|---|------------|---------------|
| 14 | IA / sitemap (ampliar) | Portal + cola riesgo + lotes (si §16 confirma portal) |
| 15 | Flows + wireframes + proto portal | Upload, faltantes, aceptar borrador (sin jerga) |
| 16 | Content spec portal | Tono contribuyente; never MUISCA credentials |
| 17 | Prototype alta fidelidad | Escenarios de temporada (revisor prioriza riesgo) |

### Fase 4 — Escala

| # | Entregable | Salida mínima |
|---|------------|---------------|
| 18 | Evolutivo (ME/GE) | Simulador escenarios, integraciones: flows + specs solo de lo nuevo |
| 19 | DS maduro | Contribuciones normalizadas; deprecar one-offs del piloto |

---

## Dependencias (no saltar)

```text
Decision log + Exploraciones (forks §16)
        ↓
IA / sitemap (MN)
        ↓
Task flows (I)  →  Wireframes  →  Prototype  →  UI spec
        ↓                           ↓
Content model (en paralelo desde flows)
        ↓
Design-system contribution (continuo; ya hay base)
```

---

## Estado actual (inventario)

| Entregable | Estado |
|------------|--------|
| Design-system contribution | **Parcial** — MASTER, tokens, components, pages, previews |
| Prototype | **Hecho v0.1** — `ux/prototype/` (dashboard + expediente + Control 3) |
| IA / sitemap | **Hecho (MN)** — `ux/SITEMAP.md` |
| Task flows | **Hecho (MVP)** — `ux/flows/` F-01…F-04 |
| Wireframes | **Hecho (MVP lo-fi)** — `ux/wireframes/` W-01…W-04 |
| Content model | **Hecho (mapa completo)** — `ux/CONTENT_MODEL.md` |
| Exploraciones formalizadas | Pendiente |
| UI specification completa | Pendiente (components.md = base) |
| Design decision log | Pendiente |

---

## Checklist de arranque (fase 0)

- [ ] Abrir `DESIGN_DECISIONS.md` con semilla PRD §16
- [ ] Cerrar o acotar exploración portal F3 vs solo contador
- [x] Sitemap MN (app contador MVP) — `ux/SITEMAP.md`
- [x] User flows: asalariado + Control 1 + Control 3 + Control 5 — `ux/flows/`
- [x] Content model mapeado — `ux/CONTENT_MODEL.md`

## Next step

Design decision log semilla (§16) o UI spec anotada sobre el prototipo.

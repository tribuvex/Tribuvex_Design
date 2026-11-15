# W-02 — Expediente workspace (A6)

**Copy:** `CONTENT_MODEL` §5–9 · **IA:** `SITEMAP` A6/E1–E7 · **UI:** `pages/expediente.md` · **Flow:** `flows/01-asalariado-e2e.md`

## Objetivo

Trabajar las 7 etapas, ver avance SSE, abrir traza y recibir interrupciones PC.

## Estructura (lo-fi)

```
┌─ Sidebar ───┬─ Expediente ──────────────────────────────────────────────┐
│ Tribuvex    │ Crumb: Expedientes / Juan Pérez / AG 2026 / Soportes      │
│             │ Título: Juan Pérez · AG 2026     [Pausar] [Ver bitácora]  │
│             │                                                           │
│             │ [1✓][2✓][3●][4 ][5 ][6 ][7 ]   ← stepper E1–E7          │
│             │                                                           │
│             │ Tabs: Resumen | Soportes* | Cédulas | Liquidación |       │
│             │       Bitácora | Paquete                                  │
│             ├────────────────────────────┬──────────────────────────────┤
│             │ MAIN                       │ TRAZA (A8)                   │
│             │ Lista faltantes / upload   │ Casilla · Valor · Soporte    │
│             │ o contenido de etapa       │ Regla · Artículo             │
│             │ [Subir documentos]         │ [Ver traza]                  │
│             │ región aria-busy si SSE    │                              │
└─────────────┴────────────────────────────┴──────────────────────────────┘
```

## Zonas

| Zona | Contenido |
|------|-----------|
| Top | Breadcrumb + título patrón + Pausar / Bitácora |
| Stepper | Labels cortos E1–E7; estados done/current/locked/risk |
| Tabs | secondary in-page |
| Main | Contenido de etapa activa (ver §9 content model) |
| Traza | Panel derecho ≥1280px; drawer &lt;1280px |

## Estados

| Estado | UI |
|--------|-----|
| Default | Etapa actual editable (preparador) |
| Loading SSE | Skeleton estable + “Procesando soportes…” / `aria-busy` |
| Pausado | Banner: “Expediente pausado…” + CTA Reanudar |
| Degradación modelo | Banner RNF-10 copy content model |
| PC abierto | Overlay/panel encima (W-03); fondo A6 `aria-hidden` |
| Revisor RO | Sin edición de cifras; puede abrir Control 5 |

## Breakpoints

- ≥1280: main + traza side-by-side  
- &lt;1280: traza drawer  
- &lt;768: stepper 2 columnas; tabs scroll horizontal  

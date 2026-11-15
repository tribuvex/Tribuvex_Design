# W-03 — Control (Control 1–Control 5)

**Copy:** `CONTENT_MODEL` §4 + §8 · **UI:** `pages/checkpoint.md` · **Diagramas:** `flows/PUNTOS_DE_CONTROL.md`  
**HTML de referencia:** `pages/checkpoint-preview.html` (Control 2 chrome = mismo para todos)

## Objetivo

Decidir sin perder contexto: ver resumen, detalle, disclaimer; Aprobar · Editar · Rechazar.

## Estructura (lo-fi)

```
████████████████ overlay ████████████████
║  ┌─ Checkpoint ──────────────────────────┐ ║
║  │ [PC{n} · {nombre}]  [badge estado]    │ ║
║  │ Título (content model por PC)         │ ║
║  │ Summary (1–3 líneas)                  │ ║
║  ├───────────────────────────────────────┤ ║
║  │ (scroll)                              │ ║
║  │ Detalle: tabla / cuadro / hallazgos   │ ║
║  │ [Motivo de rechazo] textarea          │ ║
║  │ Disclaimer RNF-17                     │ ║
║  ├───────────────────────────────────────┤ ║
║  │ sticky: [Aprobar][Editar][Rechazar]   │ ║
║  └───────────────────────────────────────┘ ║
████████████████████████████████████████████
```

Orden de botones **fijo**. Focus inicial: Aprobar (o título).

## Variantes de cuerpo por PC

| PC | Cuerpo wireframe |
|----|------------------|
| Control 1 | Lista conclusión residencia / alcance + CTA Derivar |
| Control 2 | Tabla diferencias (columnas §12) |
| Control 3 | Tabla cédula + selector excluyente si aplica |
| Control 4 | Comparación YoY + checkbox ACK riesgo |
| Control 5 | Resumen 210 + saldo + hallazgos + ACK + Devolver a etapa |

## Estados

| Estado | UI |
|--------|-----|
| Default | Dialog abierto, interrupt activo |
| Error rechazo | Error summary arriba + campo motivo en error |
| Omitido (Control 2/Control 4) | **No** este chrome; badge “Omitido — sin diferencias” en A6/bitácora |
| Loading decisión | Botones disabled + spinner en CTA pulsado |
| Solo lectura revisor | Control 5: Aprobar/Rechazar/Devolver; sin editar cifras |

## No mostrar

- Presentar / Firmar / Pagar MUISCA  
- PC como ítem de sidebar  

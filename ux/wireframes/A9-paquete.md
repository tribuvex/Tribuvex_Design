# W-04 — Paquete de presentación (A9)

**Copy:** `CONTENT_MODEL` §4 + A9 · **Flow:** F-04 tras Control 5 · **IA:** `SITEMAP` A9

## Objetivo

Descargar el paquete post-aprobación; dejar claro que MUISCA es manual.

## Estructura (lo-fi)

```
┌─ (shell A6 o página) ─────────────────────────────────────┐
│ Crumb: … / Paquete                                        │
│ Título: Paquete de presentación                           │
│ Intro: Descarga los archivos para presentar en MUISCA…    │
│                                                           │
│ ┌─ Archivos ────────────────────────────────────────────┐ │
│ │ ☐ Valores por casilla (210)                           │ │
│ │ ☐ Memoria de cálculo                                  │ │
│ │ ☐ Soportes enlazados                                  │ │
│ │ ☐ Instrucciones MUISCA / recibo 490                   │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ [Descargar paquete]     Disclaimer RNF-17                 │
│                                                           │
│ (opcional F+) Subir acuse / recibo de pago — RF-19        │
└───────────────────────────────────────────────────────────┘
```

## Estados

| Estado | UI |
|--------|-----|
| Listo | CTA Descargar habilitado |
| Bloqueado | CTA disabled + “El paquete estará disponible cuando apruebes el borrador final (Control 5).” |
| Downloading | Loading en botón; no navegar fuera sin aviso |
| Error | “No pudimos generar la descarga. Intenta de nuevo.” |

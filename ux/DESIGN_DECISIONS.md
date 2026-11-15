# Design decisions — Tribuvex

## 2026-11-15 · UI kit como sistema de marca

| Campo | Valor |
|-------|-------|
| **Problema** | El kit era sobre todo un catálogo de componentes, sin narrativa de marca. |
| **Decisión** | `ui-kit-preview.html` documenta Principios → Guía de estilo → Patrones → Componentes con tokens y voz Tribuvex. |
| **Añadido** | Principios (práctico / humano decide / unificado / iterativo), escalas de estado, tipografía con usos, patrones de búsqueda / notificación / KPI, tamaños de icono. |
| **Revisar si** | Brand book formal sustituye o amplía esta capa |

## 2026-11-15 · Renombrar PC → Control N (UI)

| Campo | Valor |
|-------|-------|
| **Problema** | “PC” se lee como computadora; no comunica la pausa de decisión. |
| **Decisión** | En **UI visible**: **Control 1…5** (+ nombre). IDs técnicos (`pc1.html`, keys `pc.*`, query `?pc=`) se mantienen. |
| **Portal** | No mostrar “Control N” ni el acrónimo antiguo. |
| **Dónde** | `CONTENT_MODEL`, mockup, wireflows labels, hub |
| **Revisar si** | Capacitación interna sigue usando “PC” en voz; alinear glosario oral |

## 2026-11-15 · Copy portal sin jerga MUISCA

| Campo | Valor |
|-------|-------|
| **Problema** | El portal del contribuyente usaba “MUISCA” y un disclaimer de tono contador. |
| **Alternativas** | (1) Mantener MUISCA en portal · (2) Sustituir por “la DIAN” / “no envía nada a la DIAN” |
| **Evidencia** | `CONTENT_MODEL` glosario + §11; RNF-17 variante portal |
| **Decisión** | En portal: nunca MUISCA/UVT/cédula/PC. Disclaimer canónico portal. |
| **Responsable** | UX / Content |
| **Revisar si** | Legal exige citar MUISCA por nombre en el portal |

## 2026-11-15 · Opciones excluyentes A/B (Control 3 · SIM)

| Campo | Valor |
|-------|-------|
| **Problema** | Control 3 y SIM invertían A/B (25 % vs costos). |
| **Decisión** | **A · Costos y gastos** · **B · Exención 25 %** (alineado a `CONTENT_MODEL` §Control 3). |
| **Dónde** | `pc/pc3.html`, `simulador.html`, `CONTENT_MODEL` §SIM, `stages.js` |
| **Revisar si** | Normativa o piloto pide otro orden por defecto |

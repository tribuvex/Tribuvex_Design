# Design decisions — Tribuvex

## 2026-11-15 · Copy portal sin jerga MUISCA

| Campo | Valor |
|-------|-------|
| **Problema** | El portal del contribuyente usaba “MUISCA” y un disclaimer de tono contador. |
| **Alternativas** | (1) Mantener MUISCA en portal · (2) Sustituir por “la DIAN” / “no envía nada a la DIAN” |
| **Evidencia** | `CONTENT_MODEL` glosario + §11; RNF-17 variante portal |
| **Decisión** | En portal: nunca MUISCA/UVT/cédula/PC. Disclaimer canónico portal. |
| **Responsable** | UX / Content |
| **Revisar si** | Legal exige citar MUISCA por nombre en el portal |

## 2026-11-15 · Opciones excluyentes A/B (PC3 · SIM)

| Campo | Valor |
|-------|-------|
| **Problema** | PC3 y SIM invertían A/B (25 % vs costos). |
| **Decisión** | **A · Costos y gastos** · **B · Exención 25 %** (alineado a `CONTENT_MODEL` §PC3). |
| **Dónde** | `pc/pc3.html`, `simulador.html`, `CONTENT_MODEL` §SIM, `stages.js` |
| **Revisar si** | Normativa o piloto pide otro orden por defecto |

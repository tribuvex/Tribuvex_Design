# User flows — Tribuvex MVP (fase 1)

Plantilla de campos: **trigger · pasos · decisiones humanas · sistema · errores · alternativas · estado final**.

**Diagramas de todos los PC:** [`PUNTOS_DE_CONTROL.md`](./PUNTOS_DE_CONTROL.md) (Mermaid).  
**Wireflows (pantallas + flechas → mockup):** [`../wireflows/index.html`](../wireflows/index.html) · [README](../wireflows/README.md).

| ID | Flujo | Archivo | Nodos sitemap |
|----|-------|---------|---------------|
| F-01 | Asalariado típico E2E (soportes → paquete) | `01-asalariado-e2e.md` · [WF-01](../wireflows/WF-01-asalariado.html) | A5→A6 E1–E7, PC1/PC3/PC5, A9 |
| F-02 | PC1 Ruta y alcance | `02-pc1-ruta.md` · [WF-02](../wireflows/WF-02-pc1.html) | E1 → PC1 |
| F-03 | PC3 Depuración | `03-pc3-depuracion.md` · [WF-03](../wireflows/WF-03-pc3.html) | E4 → PC3 |
| F-04 | PC5 Borrador final | `04-pc5-borrador.md` · [WF-04](../wireflows/WF-04-pc5.html) | E7 → PC5 → A9 |

**Fuera de este corte (narrativa):** PC2, PC4, portal, cola riesgo — **sí diagramados** en `PUNTOS_DE_CONTROL.md`.

**Actor por defecto:** Contador preparador. Revisor solo en F-04 si hay riesgo alto (PRD §10).

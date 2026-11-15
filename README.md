# Tribuvex Design System

Repo vivo de **UI kit**, **mockup HTML** y **wireflows**. No incluye PRD ni arquitectura (eso queda en el repo de documentación).

## Quick path

1. Servir la raíz: `npx serve .` (o GitHub Pages).
2. Abrir [index.html](./index.html).
3. Elegir una de las tres entradas.

| Entrada | Quién | Path |
|---------|-------|------|
| UI Kit | Design + Dev | [ui-kit-preview.html](./ui-kit-preview.html) |
| Mockup | Producto / historias | [mockup/index.html](./mockup/index.html) |
| Wireflows | UX / demos | [ux/wireflows/index.html](./ux/wireflows/index.html) |

## Mapa del repo

```text
.
├── index.html           # Landing del equipo (Pages)
├── ui-kit-preview.html  # Kit vivo
├── MASTER.md            # Reglas DS + tokens
├── tokens.css|json
├── components.md
├── pages/               # Overrides por pantalla
├── mockup/              # Fuente de verdad HTML (producto)
└── ux/
    ├── wireflows/       # WF-01…16 (orquestan URLs del mockup)
    ├── flows/           # Specs de flujo (markdown)
    ├── CONTENT_MODEL.md · SITEMAP.md · ENTREGABLES_UX.md
    ├── wireframes/      # HISTÓRICO — no crecer
    └── prototype/       # HISTÓRICO — superseded by mockup/
```

## Mantenimiento

| Cambio | Dónde |
|--------|-------|
| Nueva pantalla / estado | `mockup/` + link en `mockup/index.html` |
| Nuevo componente / token | `ui-kit-preview.html` + `components.md` / `tokens.*` |
| Nuevo o cambio de flujo | `ux/flows/` (spec) + `ux/wireflows/` (board) |
| Copy / microcopy | `ux/CONTENT_MODEL.md` → reflejar en mockup |
| Sitemap / IA | `ux/SITEMAP.md` |

**Regla:** el wireflow no inventa UI; solo apunta al mockup.

## Publicación (GitHub Pages)

1. Esta carpeta es la **raíz** del repo GitHub `Tribuvex_Design` (vive en el workspace de Documentación; se publica aparte).
2. Settings → Pages → Deploy from branch `main` / root `/`.
3. URL esperada: `https://<org>.github.io/<repo>/` → `index.html`.

Local:

```bash
cd Tribuvex_Design
npx serve .
# abrir http://localhost:3000
```

## Fuera de alcance

- PRD, ADR, C4 → repo de documentación.
- App React de producción → repo de código (consume `tokens.css` + `MASTER.md`).

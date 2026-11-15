# Auditoría UX — Mockup Tribuvex

Fecha: 2026-11-14 · Fuente: ui-ux-pro-max (`ux`, `html-tailwind`) + MASTER Tribuvex

## Hallazgos (antes)

| Severidad | Hallazgo | Evidencia |
|-----------|----------|-----------|
| Alta | Focus ring débil / genérico | Controles sin `:focus-visible` consistente |
| Alta | Jerarquía tipográfica plana | Títulos y meta al mismo peso visual |
| Media | Chrome de “mockup” visible | Copy que restaba seriedad profesional |
| Media | Tablas genéricas | `thead` slate, CTA “Ver” poco jerárquico |
| Media | Nav sin agrupación | Lista plana sin secciones Trabajo / Entidad |
| Baja | PC modal básico | Sin borde de alerta, footer poco sticky-friendly |
| Baja | Login de una columna | Poco peso de marca en primer viewport |

## Mejoras aplicadas

1. **`assets/app.css`** — focus-visible WCAG, reduced-motion, tablas `.tvx-table`, dark surfaces, `.sr-only`.
2. **`assets/shell.js`** — sidebar con iconos SVG, secciones Trabajo/Entidad, chip de usuario, topbar con motor + CTA.
3. **`assets/pc-shell.js` / `pc.js`** — modal PC con borde warning, error summary enlazado, toast con `aria-live`.
4. **`login.html`** — split branding + checklist vectorial (sin emoji).
5. **`expedientes.html`** — filtros en grid, tabla profesional, footer de contexto, CTA “Abrir”.
6. **`expediente.html`** — breadcrumbs, botones y paneles redondeados alineados al DS.
7. **`index.html`** — hub con camino feliz ordenado y tarjetas de saltos.

## Oleada F2 / D2–D6 (2026-11-15)

- Multi-cédula: `expediente.html?etapa=4&perfil=multi` + `stages.js`
- SIM / CAL / IMP / MEM: `simulador.html`, `calendario.html`, `importacion.html`, `memoria.html`
- Hub, UI kit `#fase2`, CONTENT_MODEL, `PENDIENTES_UI.md` checklist cerrado

## Oleada iconografía Phosphor (2026-11-15)

- `assets/icons.js` — Phosphor regular (@phosphor-icons/core 2.1.1) + `data-icon` mount
- Shell, banners, empties, login, onboarding, stepper check usan el sistema
- CSS `.tvx-icon` / nav / banner / empty

## Oleada OAuth A1 (2026-11-15)

- `login.html`: Microsoft / Google Workspace / IdP firma · redirect simulado · `?oauth=error`
- Demo email/password marcado como solo mockup; CONTENT_MODEL + estados + PENDIENTES

## Oleada polish (2026-11-15)

- Densidad: `paquete.html`, `bitacora.html`, `portal/upload.html`, `portal/borrador.html` (eyebrow / lead / dropzone)
- Stepper: `.tvx-step--done|current|todo` + leyenda + `aria-current`
- Dark: pares semánticos en `app.css` alineados a `tokens.css` `.dark`
- `theme.js` documentado como espejo de `tokens.css` (CDN light + override dark)

## Checklist residual (siguiente pase)

- [x] UI kit (`ui-kit-preview.html`) alineado con shell / PC modal / toast / error summary
- [x] Multi-cédula + SIM + CAL + IMP + MEM (mockup)
- [x] Unificar densidad en `paquete.html`, `bitacora.html`, portal upload
- [x] Contrast check formal dark mode (pares semánticos)
- [x] Stepper del expediente: estados completed / current / upcoming más explícitos
- [x] Unificar tokens mockup (`theme.js`) ↔ `tokens.css` (evitar drift)

## Oleada copy audit (2026-11-15)

Fuente: ui-ux-pro-max (`ux` / `html-tailwind`) + `CONTENT_MODEL.md`.

| Sev | Hallazgo | Fix |
|-----|----------|-----|
| Alta | MUISCA en portal | `portal/index.html` · `portal/borrador.html` → variante DIAN |
| Alta | A/B PC3 ≠ SIM | Unificado **A costos · B 25 %** |
| Media | Hint aceptar borrador | Canónico + CTA disabled hasta docs listos |
| Media | “Copiloto” en login | → “Asistente” |
| Baja | Hub A9 label | “Paquete de presentación” |

Ver `ux/DESIGN_DECISIONS.md`.

## Anti-patrones evitados (MASTER)

- Sin emoji como iconos estructurales
- Sin “presentar / firmar / pagar” en MUISCA
- Portal sin jerga MUISCA/UVT/cédula/PC
- Disclaimer RNF-17 visible en PC; variante portal en P1–P3
- Color semántico: warning = decisión humana; destructive = rechazo / riesgo alto

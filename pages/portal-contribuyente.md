# Page Override: portal-contribuyente

> Overrides `MASTER.md` for the taxpayer portal (upload supports, missing items, accept draft).

**Route ideas:** `/portal/:token` (secure link)  
**Users:** Contribuyente (cliente del contador) — not the accountant shell  
**Density:** Lower than Master — gutters 24–48px (`--space-6` / `--space-8` / `--space-12`)  
**Tone:** No tax jargon; short sentences; show money plainly

---

## Layout

| Zone | Spec |
|------|------|
| Brand | Tribuvex as hero-level signal (not only nav text) |
| Hero | One headline + one supporting line + one CTA (**Subir documentos**) |
| Status | “Qué falta” checklist — success items with text + icon, not color alone |
| Draft | Summary: estimated tax / saldo in `font-mono`; CTA **Aceptar borrador** (secondary until complete) |
| Help | Contact firm / contador — no MUISCA credentials fields ever |

Do **not** reuse the dense sidebar shell of the accountant app. Single-column on mobile; max content width ~640–720px for forms.

Landing search for “hero upload” returned no verified dataset hit — this layout follows Master portal rules + PRD D1.

---

## Density & type overrides

| Token | Portal value |
|-------|----------------|
| Body | 16px (`text-emphasis`) |
| Title | 22–24px |
| Section gaps | `--space-8` to `--space-12` |
| Primary CTA padding | 12×24 (comfortable), not dense 8×16 |

Same palette and fonts (IBM Plex). Accent green only for completed checklist / success — not for “pay DIAN”.

---

## Upload UX

- Label visible (“Certificado 220”, etc.)  
- Progress: loading → success/error per file  
- Errors: `role="alert"` + keep files already uploaded  
- Multi-error: focusable error summary after submit  

Icons: `UploadSimple`, `FileText`, `CheckCircle`, `Warning` (Phosphor).

---

## Accept draft

- Disabled until required supports marked complete (explain why)  
- Confirmation copy: accountant remains responsible; portal acceptance ≠ DIAN filing  
- No payment / e-sign MUISCA flows

---

## Anti-patterns (page)

- ❌ Accountant table density or 7-stage pipeline jargon  
- ❌ Asking for MUISCA password or e-sign secrets  
- ❌ Placeholder-only inputs  
- ❌ Card spam / promo badges over the hero  

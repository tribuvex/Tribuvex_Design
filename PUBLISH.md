# Publish — repo aparte (dentro de Documentación)

Paquete listo en:

`Tribuvex_Documentacion/Tribuvex_Design`

Tiene su propio `.git` (rama `main`). Fuente de verdad única del design system vivo.

## Crear remoto y publicar

```bash
cd /Users/consultor/Documents/projects/Tribuvex_Documentacion/Tribuvex_Design
git commit -m "$(cat <<'EOF'
feat: initial Tribuvex design system package

UI kit, HTML mockup, and wireflows WF-01–16 for team review.
EOF
)"

# Crear repo vacío en GitHub, luego:
git remote add origin git@github.com:<ORG>/Tribuvex_Design.git
git push -u origin main
```

GitHub → **Settings → Pages** → Branch `main` → folder `/` (root).

Landing: `https://<org>.github.io/Tribuvex_Design/`

## Local

```bash
cd Tribuvex_Design
npx serve .
```

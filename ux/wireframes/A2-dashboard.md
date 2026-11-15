# W-01 — Dashboard / Lista de expedientes (A2·A4)

**Copy:** `CONTENT_MODEL` §5–7 · **IA:** `SITEMAP` A2/A4 · **UI:** `pages/dashboard.md`

## Objetivo

Escanear expedientes, filtrar por riesgo/estado, abrir o crear.

## Estructura (lo-fi)

```
┌─ Sidebar ─────────┬─ Main ─────────────────────────────────────────┐
│ Tribuvex          │ Título: Expedientes          [Nuevo expediente] │
│                   │                                                 │
│ · Expedientes *   │ [AG ▾] [Estado ▾] [Riesgo ▾] [Buscar………]       │
│ · Clientes        │                                                 │
│ · Administración  │ ┌─────────────────────────────────────────────┐ │
│                   │ │ Cliente│Doc│AG│Etapa│Estado│Riesgo│Pendiente│ │
│                   │ ├─────────────────────────────────────────────┤ │
│                   │ │ Juan P.│…│2026│3·Soportes│Esperando│—│PC3  │ │
│                   │ │ …                                           │ │
│                   │ └─────────────────────────────────────────────┘ │
└───────────────────┴─────────────────────────────────────────────────┘
```

## Zonas

| Zona | Contenido | Notas |
|------|-----------|-------|
| Sidebar | Nav primary | Item activo “Expedientes” |
| Header | `Expedientes` + CTA `Nuevo expediente` | |
| Filters | AG, Estado, Riesgo, búsqueda | Labels visibles |
| Table | Columnas canónicas content model §12 | mono en doc/valores |
| Row action | Ver / abrir fila | |

## Estados

| Estado | UI |
|--------|-----|
| Default | Tabla con filas |
| Vacío | “Aún no hay expedientes…” + CTA Nuevo |
| Loading | Skeleton filas; `aria-busy` en región tabla |
| Empty filter | “Ningún expediente coincide…” |
| Live riesgo (F3) | `Hay {n} expedientes de alto riesgo` |

## Breakpoints

- ≥1024: tabla completa  
- &lt;768: lista cards compactas (mismo contenido, menos columnas visibles: Cliente, Estado, Etapa)

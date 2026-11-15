# F-03 — Control 3 Depuración

**Objetivo:** Aprobar la clasificación y depuración de la cédula (MVP: rentas de trabajo) con límites UVT aplicados y opciones excluyentes visibles.  
**Actor:** Contador preparador.  
**PRD:** §10 Control 3, RF-08…RF-11 (MVP subset), motor depura.  
**Sitemap:** E4 → Control 3.  
**UI:** `checkpoint.md` + tabla/cédula en cuerpo.  
**Diagrama:** `PUNTOS_DE_CONTROL.md` → Control 3.  
**Wireflow:** [`../wireflows/WF-03-pc3.html`](../wireflows/WF-03-pc3.html).

---

## Diagrama

```mermaid
flowchart TD
  E4[E4: clasificar + depurar + topes UVT] --> Cuadro[Cuadro por cédula]
  Cuadro --> Excl{¿Opción excluyente honorarios?}
  Excl -->|Sí| Elige[Contador elige costos O 25%]
  Excl -->|No| Control 3
  Elige --> Control 3{Control 3}
  Control 3 -->|Aprobar| E5[E5 Liquidación]
  Control 3 -->|Reclasificar / editar| E4
  Control 3 -->|Rechazar| Stop[bloqueado_pc3]
```

---

## Trigger

Tras clasificar ingresos y aplicar depuración/límites (Art. 336 y afines), el grafo interrumpe en Control 3 **siempre** en MVP (hay cifras que fijar), aunque no haya “alerta”.

---

## Pasos

| # | Quién | Qué | UI |
|---|-------|-----|-----|
| 1 | Sistema | Muestra cuadro por cédula: brutos, INCRNGO, deducciones, exentas, topes aplicados | Tabla + badges |
| 2 | Sistema | Destaca recortes por tope (40 % / 1.340 UVT, 25 % / 790 UVT, …) | Warning rows |
| 3 | Sistema | Si aplica honorarios: opciones excluyentes costos vs 25 % | Selector explícito |
| 4 | Contador | Puede abrir traza por casilla (A8) | Panel traza |
| 5 | Contador | Aprobar / Editar (reclasificar o elegir opción) / Rechazar | Footer PC |

---

## Decisiones humanas

| Opción | Detalle | Efecto |
|--------|---------|--------|
| Aprobar | Acepta cuadro y opción elegida | Fija depuración; → E5 |
| Editar → reclasificar | Mueve ingreso dudoso de cédula | Motor RF-24 recalcula; nuevo Control 3 |
| Editar → opción excluyente | Elige costos **o** 25 % (RF-11) | Motor valida exclusión mutua |
| Rechazar | Motivo obligatorio | No cierra E4 |

---

## Sistema

- Solo motor calcula topes y renta líquida.  
- Agente explica en lenguaje claro citando regla/artículo (RF-21).  
- Traza: casilla → soporte → regla → artículo.  
- Aprobaciones previas (Control 1) se conservan si el recálculo no las invalida.

---

## Errores

| Error | UX |
|-------|-----|
| Intentar ambas opciones excluyentes | Bloqueo inline + mensaje RF-11 |
| Rechazo sin motivo | Error summary + foco |
| Cifra sin soporte | Badge peligro; no se puede aprobar hasta resolver o documentar (MVP: bloquear) |

---

## Alternativas

- MVP asalariado: una cédula dominante; flujos multi-cédula en fase 2.  
- Si el contador corrige un soporte en E3 después: cascada puede reabrir Control 3.

---

## Estado final

| Resultado | Siguiente |
|-----------|-----------|
| Aprobado | E5 Liquidación |
| Rechazado / editando | E4 + interrupt activo |

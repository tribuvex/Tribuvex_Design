# F-04 — Control 5 Borrador final

**Objetivo:** Aprobar el borrador completo del 210 (saldo, hallazgos del verificador) antes de generar el paquete.  
**Actores:** Contador preparador; **Revisor** si alertas altas (doble aprobación PRD §10).  
**PRD:** §10 Control 5, RF-18, D5 verificador, RNF-17.  
**Sitemap:** E7 → Control 5 → A9.  
**UI:** `checkpoint.md`; disclaimer RNF-17 siempre visible.  
**Diagrama:** `PUNTOS_DE_CONTROL.md` → Control 5 (el de abajo es el mismo flujo).  
**Wireflow:** [`../wireflows/WF-04-pc5.html`](../wireflows/WF-04-pc5.html).

---

## Trigger

Borrador armado + (en fase 2+) verificador independiente; grafo interrumpe antes de `generar_paquete`.

---

## Pasos

| # | Quién | Qué | UI |
|---|-------|-----|-----|
| 1 | Sistema | Muestra 210 resumido, saldo a pagar/favor, anticipo, alertas | Control 5 body |
| 2 | Sistema | Lista hallazgos del verificador (si hay) | Badges danger/warning |
| 3 | Contador | Revisa traza de casillas críticas | A8 |
| 4 | Contador | Aprobar / Devolver a etapa / Rechazar | Footer |
| 5a | Sistema | Si riesgo alto: estado “Pendiente revisor” | A2 cola (F3 UI; MVP: flag + notify) |
| 5b | Revisor | Segundo visto bueno en Control 5 | Misma UI RO + Aprobar/Rechazar |
| 6 | Sistema | Tras aprobaciones requeridas → genera paquete | A9 |

```mermaid
flowchart TD
  E7[E7 Borrador] --> Control 5[Control 5]
  Control 5 -->|Aprobar sin riesgo| A9[Paquete]
  Control 5 -->|Aprobar con riesgo alto| R[Pendiente revisor]
  R -->|Revisor aprueba| A9
  Control 5 -->|Devolver| Ex[Etapa elegida]
  Control 5 -->|Rechazar| Stop[Bloqueado]
```

---

## Decisiones humanas

| Opción | Actor | Efecto |
|--------|-------|--------|
| Aprobar | Preparador | Si no hay riesgo alto → paquete; si hay → espera revisor |
| Aprobar | Revisor | Cierra doble control → paquete |
| Devolver a etapa | Preparador/Revisor | Elige E3–E6; invalidación acotada + posible re-PC |
| Rechazar | Cualquiera autorizado | Motivo; sin A9 |

**Nunca:** botón de presentar/firmar/pagar en MUISCA.

---

## Sistema

- Paquete solo tras Control 5 satisfecho (y revisor si aplica).  
- Verificador no calcula impuesto; señala inconsistencias.  
- Disclaimer: el sistema asiste; responsabilidad profesional del contador.  
- Post-A9: contador puede subir acuse/recibo después (RF-19) — flujo aparte.

---

## Errores

| Error | UX |
|-------|-----|
| Aprobar con hallazgos bloqueantes sin ACK | Impedir o exigir checkbox “vi los hallazgos” |
| Rechazo/devolución sin motivo o sin etapa destino | Error summary |
| Revisor intenta editar cifras | RO; solo decisión o devolver |

---

## Alternativas

| Caso | Flujo |
|------|-------|
| Sin verificador en MVP temprano | Control 5 igual; lista de hallazgos vacía con nota |
| Riesgo bajo | Una sola aprobación preparador |
| Contador independiente | Misma persona preparador+revisor: una aprobación basta **o** auto-segundo paso explícito (decidir en decision log) |

---

## Estado final

| Resultado | Estado |
|-----------|--------|
| Aprobado completo | `paquete_listo` · A9 habilitado |
| Pendiente revisor | Visible en dashboard; E7 cerrado a edición de cifras |
| Devuelto | Etapa destino abierta; Control 5 pendiente de nuevo |
| Rechazado | Sin paquete; bitácora |

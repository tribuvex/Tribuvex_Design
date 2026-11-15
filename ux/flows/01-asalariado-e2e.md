# F-01 — Asalariado típico E2E

**Objetivo:** Llevar un expediente de rentas de trabajo desde alta hasta paquete listo para MUISCA (manual).  
**Actor:** Contador preparador.  
**PRD:** caso de uso §3.2, RF-01…RF-05 (camino feliz), RF-09…RF-14, RF-18, Control 1/Control 3/Control 5, fase 1.  
**Sitemap:** A5 → A6 (E1–E7) → A9.  
**Wireflow:** [`../wireflows/WF-01-asalariado.html`](../wireflows/WF-01-asalariado.html) (nodos → mockup).  
**Supuestos MVP:** residente obligado; solo cédula de trabajo; sin diferencias exógena que activen Control 2; patrimonio sin alerta Control 4; un certificado 220 + extractos básicos.

---

## Trigger

Contador en A2/A4 elige **Nuevo expediente** (o desde cliente en A3) para AG 2026, perfil asalariado.

---

## Pasos (camino feliz)

| # | Quién | Qué ocurre | UI / nodo |
|---|-------|------------|-----------|
| 1 | Contador | Crea expediente: cliente, AG, perfil | A5 |
| 2 | Sistema | Abre A6 en E1; agente pide datos Art. 10 | E1 |
| 3 | Contador + motor | Residencia = sí; sin fuera de alcance | → **F-02 Control 1** → Aprobar |
| 4 | Motor | Obligación por topes UVT = obligado | E2 |
| 5 | Agente | Lista de faltantes (220, extractos, …) | E3 |
| 6 | Contador | Sube soportes (sin portal F3) | E3 |
| 7 | Agente | Extracción con confianza; registra datos | E3 · SSE/`aria-busy` |
| 8 | Sistema | Sin diff Control 2 → bitácora “Control 2 omitido” | — |
| 9 | Agente + motor | Clasifica rentas de trabajo; depura topes | E4 |
| 10 | Contador | Revisa cuadro cédula / exención 25 % | → **F-03 Control 3** → Aprobar |
| 11 | Motor | Liquidación Art. 241 + saldo; anticipo suma | E5 |
| 12 | Motor | Patrimonio OK o sin alerta → Control 4 omitido | E6 |
| 13 | Agente | Arma borrador 210 + memoria | E7 |
| 14 | Contador | Revisa saldo y hallazgos | → **F-04 Control 5** → Aprobar |
| 15 | Sistema | Habilita paquete; contador descarga | A9 |

```mermaid
flowchart LR
  A5[Nuevo] --> E1 --> Control 1 --> E2 --> E3 --> E4 --> Control 3 --> E5 --> E6 --> E7 --> Control 5 --> A9[Paquete]
```

---

## Decisiones humanas (resumen)

| Momento | Opciones | Efecto |
|---------|----------|--------|
| Control 1 | Aprobar / Editar / Rechazar / Derivar | Sin aprobar no avanza E2 |
| Control 3 | Aprobar / Reclasificar / Elegir opción excluyente | Fija depuración |
| Control 5 | Aprobar / Devolver etapa / Rechazar | Aprobar → A9; nunca presenta en MUISCA |

---

## Sistema

- Grafo LangGraph + `interrupt()` en PC; checkpointer PostgreSQL (RF-23).  
- Cifras solo del motor (H2); agente explica con traza (RF-21).  
- SSE de avance en E3/E7; degradación si falla el modelo (RNF-10).  
- Bitácora inmutable de cada PC (quién, cuándo, versión de reglas).

---

## Errores

| Error | Manejo UX |
|-------|-----------|
| Soporte ilegible / baja confianza | Lista faltantes + pedir re-subida; no inventar cifra |
| Validación PC (rechazo sin motivo) | Error summary + foco (`checkpoint.md`) |
| Caída del worker | Expediente pausable; reanudar en misma etapa |
| Recalculo tras edición | RF-24: cascada; PCs no afectados se conservan |

---

## Alternativas

| Bifurcación | Flujo |
|-------------|-------|
| No residente / fuera de alcance | Control 1 → Derivado a manual (terminal suave; sin A9 automático) |
| No obligado | E2 informa; contador puede declaración voluntaria (RF-03) → sigue o cierra |
| Contador pausa | RF-23; vuelve a A6 después |
| Editar en un PC | Permanece interrupt; corrige; re-evaluación acotada |

---

## Estado final (éxito)

- Expediente en estado **Paquete listo**.  
- A9 disponible: casillas, memoria, soportes, instrucciones MUISCA/recibo 490.  
- Presentación/firma/pago **fuera del sistema**.  
- Bitácora con Control 1, Control 3, Control 5 aprobados (+ omisiones Control 2/Control 4 si aplicó).

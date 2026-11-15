# F-02 — Control 1 Ruta y alcance

**Objetivo:** Confirmar residencia, obligación preliminar y que el caso está en alcance (Formulario 210) antes de invertir en soportes.  
**Actor:** Contador preparador.  
**PRD:** §10 Control 1, RF-01, RF-02, RF-22.  
**Sitemap:** E1 → Control 1 (interrupt).  
**UI:** `pages/checkpoint.md` · preview pattern `checkpoint-preview.html`.  
**Diagrama:** ver también `PUNTOS_DE_CONTROL.md` → sección Control 1.  
**Wireflow:** [`../wireflows/WF-02-pc1.html`](../wireflows/WF-02-pc1.html).

---

## Diagrama

```mermaid
flowchart TD
  Start[E1: datos Art. 10 + flags alcance] --> Motor[Motor: residente? en alcance?]
  Motor --> Control 1{Control 1}
  Control 1 -->|Aprobar en alcance| E2[E2 Obligación]
  Control 1 -->|Editar datos| Start
  Control 1 -->|Derivar a manual| Der[Estado: derivado_manual]
  Control 1 -->|Rechazar + motivo| Stop[bloqueado_pc1]
```

---

## Trigger

El nodo Admisión termina de evaluar Art. 10 / obligación inicial / flags de fuera de alcance y el grafo llama `interrupt()` → se abre Control 1.

---

## Pasos

| # | Quién | Qué | UI |
|---|-------|-----|-----|
| 1 | Sistema | Congela escritura de ruta; muestra resumen | Dialog/panel Control 1 |
| 2 | Contador | Lee conclusión: residente sí/no, datos usados, alertas de alcance | Summary |
| 3 | Contador | Elige decisión | Footer Aprobar · Editar · Rechazar |
| 4a | Contador | **Aprobar** | Bitácora + resume → E2 |
| 4b | Contador | **Editar** | Form de datos Art. 10 / flags; motor reevalúa; vuelve a Control 1 |
| 4c | Contador | **Rechazar** (+ motivo) | Etapa no cierra; expediente en revisión / parado |
| 4d | Contador | **Derivar a manual** (si fuera de alcance) | Estado “Derivado”; sin pipeline completo |

---

## Decisiones humanas

| Opción | Cuándo | Estado final parcial |
|--------|--------|----------------------|
| Aprobar | Conclusión correcta y en alcance | Ruta fijada; E2 |
| Editar | Dato mal capturado (días, etc.) | Interrupt activo hasta nueva conclusión |
| Rechazar | No confía / quiere parar | Sin avance; motivo en bitácora |
| Derivar | 110, sucesión, régimen simple, contabilidad, exterior… | Terminal suave MVP |

---

## Sistema

- Motor concluye residencia/obligación; agente solo presenta y pregunta.  
- Sin aprobación = ningún dato de ruta persistido como definitivo.  
- Transacción: decisión + bitácora + estado + orden de resume.

---

## Errores

| Error | UX |
|-------|-----|
| Rechazar sin motivo | `role="alert"` summary + campo motivo |
| Modelo no disponible | Mostrar inputs + resultado motor si existe; banner degradación |
| Conflicto de versión | “Otro cambio en el expediente”; recargar resumen Control 1 |

---

## Alternativas

- Declaración voluntaria si no obligado: se decide en E2 tras Control 1 aprobado con flag “no obligado” (RF-03), no sustituye Control 1.  
- Contador independiente: misma UI.

---

## Estado final

| Resultado | Expediente |
|-----------|------------|
| Aprobado en alcance | E2 Obligación |
| Derivado | `derivado_manual` + bitácora |
| Rechazado | `bloqueado_pc1` hasta nueva acción |

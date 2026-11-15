# Puntos de control (PC) — diagramas

**PC** = interrupción humana: el grafo se detiene hasta **Aprobar**, **Editar** o **Rechazar**.  
No son pantallas del menú; se abren sobre el expediente (`pages/checkpoint.md`).

---

## Mapa: etapas vs puntos de control

```mermaid
flowchart TB
  subgraph pipeline [Pipeline de 7 etapas]
    E1[E1 Residencia]
    E2[E2 Obligación]
    E3[E3 Soportes]
    E4[E4 Cédulas]
    E5[E5 Liquidación]
    E6[E6 Patrimonio]
    E7[E7 Paquete]
    E1 --> E2 --> E3 --> E4 --> E5 --> E6 --> E7
  end

  E1 -.->|siempre MVP| PC1[PC1 Ruta y alcance]
  E3 -.->|si hay diferencias F2| PC2[PC2 Exógena]
  E4 -.->|siempre MVP| PC3[PC3 Depuración]
  E6 -.->|si alerta F2| PC4[PC4 Patrimonio]
  E7 -.->|siempre antes de A9| PC5[PC5 Borrador final]

  PC1 -->|Aprobar| E2
  PC2 -->|Aprobar / omitido| E4
  PC3 -->|Aprobar| E5
  PC4 -->|Aprobar / omitido| E7
  PC5 -->|Aprobar| A9[A9 Paquete listo]
```

| PC | Fase UI | ¿Obligatorio abrir? |
|----|---------|---------------------|
| PC1 | 1 | Sí, tras E1 |
| PC2 | 2 | Solo si hay diferencias; si no → omitido + bitácora |
| PC3 | 1 | Sí, tras E4 |
| PC4 | 2 | Solo si hay alerta patrimonial; si no → omitido |
| PC5 | 1 | Sí, antes del paquete |

---

## Decisión genérica en cualquier PC

```mermaid
stateDiagram-v2
  [*] --> Interrupt: grafo llama interrupt()
  Interrupt --> Resumen: contador ve qué cambió
  Resumen --> Aprobar
  Resumen --> Editar
  Resumen --> Rechazar

  Aprobar --> Bitacora: registra quién / cuándo / versión reglas
  Bitacora --> Resume: worker reanuda etapa siguiente

  Editar --> Correccion: datos o acción
  Correccion --> Interrupt: reevalúa y vuelve a mostrar PC

  Rechazar --> Motivo: motivo obligatorio
  Motivo --> Bloqueado: etapa no cierra

  note right of Aprobar
    Sin aprobación = sin efecto
    (no se fija dato ni se cierra etapa)
  end note
```

---

## PC1 — Ruta y alcance

```mermaid
flowchart TD
  Start[E1: datos Art. 10 + flags alcance] --> Motor[Motor: residente? en alcance?]
  Motor --> PC1{PC1}
  PC1 -->|Aprobar en alcance| E2[E2 Obligación]
  PC1 -->|Editar datos| Start
  PC1 -->|Derivar a manual| Der[Estado: derivado_manual]
  PC1 -->|Rechazar + motivo| Stop[bloqueado_pc1]
```

Detalle narrativo: `02-pc1-ruta.md`

---

## PC2 — Cruce con exógena (F2)

```mermaid
flowchart TD
  E3[E3: soportes + exógena] --> Cmp[Motor compara]
  Cmp --> Diff{¿Hay diferencias o baja confianza?}
  Diff -->|No| Omit[Omitido + bitácora]
  Omit --> E4[E4 Cédulas]
  Diff -->|Sí| PC2{PC2}
  PC2 -->|Aceptar acción propuesta| E4
  PC2 -->|Cambiar acción / pedir soporte| E3
  PC2 -->|Rechazar| Stop[bloqueado_pc2]
```

---

## PC3 — Depuración

```mermaid
flowchart TD
  E4[E4: clasificar + depurar + topes UVT] --> Cuadro[Cuadro por cédula]
  Cuadro --> Excl{¿Opción excluyente honorarios?}
  Excl -->|Sí| Elige[Contador elige costos O 25%]
  Excl -->|No| PC3
  Elige --> PC3{PC3}
  PC3 -->|Aprobar| E5[E5 Liquidación]
  PC3 -->|Reclasificar / editar| E4
  PC3 -->|Rechazar| Stop[bloqueado_pc3]
```

Detalle: `03-pc3-depuracion.md`

---

## PC4 — Patrimonio (F2)

```mermaid
flowchart TD
  E6[E6: comparar patrimonio YoY] --> Alert{¿Incremento sin justificar?}
  Alert -->|No| Omit[Omitido + bitácora]
  Omit --> E7[E7 Borrador]
  Alert -->|Sí| PC4{PC4}
  PC4 -->|Justificar / corregir bienes| E6
  PC4 -->|Aceptar riesgo por escrito| E7
  PC4 -->|Rechazar| Stop[bloqueado_pc4]
```

---

## PC5 — Borrador final

```mermaid
flowchart TD
  E7[E7: 210 + saldo + verificador] --> PC5{PC5}
  PC5 -->|Aprobar · riesgo bajo| A9[A9 Paquete]
  PC5 -->|Aprobar · riesgo alto| Rev[Pendiente revisor]
  Rev -->|Revisor aprueba| A9
  Rev -->|Revisor rechaza / devuelve| Back[Etapa o bloqueo]
  PC5 -->|Devolver a etapa| Etapa[E3–E6]
  PC5 -->|Rechazar| Stop[Sin paquete]
  A9 --> Nota[Presentar / firmar / pagar = fuera de Tribuvex]
```

Detalle: `04-pc5-borrador.md`

---

## Cómo verlos

En VS Code / Cursor / GitHub los bloques `mermaid` se renderizan en la vista previa Markdown.  
Si no se ven: extensión “Markdown Preview Mermaid Support” o pegar el código en [mermaid.live](https://mermaid.live).

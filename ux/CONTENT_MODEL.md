# Tribuvex — Content model / UX writing spec

Mapa de **qué se dice** en la UI. Fuente: PRD, `SITEMAP.md`, `flows/*`, `pages/*`, RNF-17.  
**Ownership:** Content / UX Writer propone; Product + contador normativo aprueban términos tributarios; Eng implementa keys i18n.

**Convención de keys (sugerida):** `tribuvex.{surface}.{elemento}` — ej. `tribuvex.pc.approve`.

---

## 1. Voces (tono por audiencia)

| Audiencia | Tono | Usar | Evitar |
|-----------|------|------|--------|
| Contador / revisor | Técnico, preciso, auditable | casilla, UVT, exógena, cédula, Art. ET | “mágico”, “IA decidió el impuesto” |
| Contribuyente (portal) | Claro, corto, calmado | “documentos”, “borrador”, “cuánto pagarías” | jerga (UVT, cédula, PC, exógena) |
| Admin entidad | Operativo | usuarios, permisos, retención | detalle de liquidación |
| Sistema (errores) | Accionable | qué pasó + qué hacer | culpa al usuario; stack traces |

**Principio de cifras:** la UI nunca dice que el modelo “calculó” el impuesto. Fórmulas: *“El motor de reglas calculó…”* / *“Tribuvex propone… Tú decides.”*

---

## 2. Glosario (canónico)

| Término UI (contador) | Definición corta | Portal (si aparece) |
|----------------------|------------------|---------------------|
| Expediente | Declaración de un cliente en un año gravable | “Tu declaración {año}” |
| Año gravable (AG) | Año de la renta | “Año {año}” |
| Casilla | Campo numerado del Formulario 210 | no usar; “línea del borrador” |
| UVT | Unidad de valor tributario del año | no usar; hablar en pesos |
| Exógena | Info que terceros reportaron a la DIAN | “lo que la DIAN ya tiene reportado” |
| Cédula | Grupo de rentas (trabajo, capital, …) | no usar |
| Soporte | Documento fuente (220, extracto, …) | “documento” |
| Traza | Soporte + regla + artículo detrás de una cifra | “de dónde sale este valor” (raro en portal) |
| Punto de control (PC) | Pausa para tu decisión | no mostrar el acrónimo al contribuyente |
| Bitácora | Quién aprobó qué y cuándo | no usar |
| Paquete | Archivos listos para presentar en MUISCA | “resumen para tu contador” |
| Motor de reglas | Calculadora determinista versionada | no usar |
| Agente | Asistente que lee/explica/coordina | “asistente” si hace falta |
| MUISCA | Portal DIAN (fuera de Tribuvex) | “la DIAN” / “presentación” (el contador la hace) |
| Derivado a manual | Caso fuera de alcance del producto | — |

---

## 3. CTAs globales (orden y copy fijo)

| Key | Label | Variante | Uso |
|-----|-------|----------|-----|
| `cta.approve` | Aprobar | primary / accent | Todo PC |
| `cta.edit` | Editar | secondary outline | Todo PC |
| `cta.reject` | Rechazar | destructive | Todo PC |
| `cta.view_trace` | Ver traza | info / ghost | Casillas, tablas |
| `cta.pause` | Pausar expediente | ghost | A6 |
| `cta.resume` | Reanudar | primary | Dashboard / A6 |
| `cta.new_case` | Nuevo expediente | primary | A2/A4 |
| `cta.save` | Guardar | secondary | Formularios |
| `cta.cancel` | Cancelar | ghost | Diálogos |
| `cta.download_package` | Descargar paquete | primary | A9 |
| `cta.upload` | Subir documentos | primary | E3 / portal |
| `cta.accept_draft` | Aceptar borrador | secondary→primary cuando listo | Portal |
| `cta.derive_manual` | Derivar a análisis manual | secondary o warning | PC1 |
| `cta.return_stage` | Devolver a una etapa | secondary | PC5 |
| `cta.ask_support` | Pedir soporte al cliente | secondary | PC2 |

**Prohibido como CTA de producto:** Presentar en MUISCA · Firmar · Pagar · Guardar clave DIAN.

---

## 4. Disclaimer legal (RNF-17) — texto canónico

**Key:** `legal.assistant_disclaimer`  
**Dónde:** todo PC (footer/cuerpo); A9 paquete; portal al aceptar borrador.

> Tribuvex asiste en la preparación de la declaración. La responsabilidad profesional es del contador. El sistema no presenta, firma ni paga en MUISCA.

**Portal (variante):**  
> Tu contador revisa y presenta la declaración. Tribuvex no envía nada a la DIAN por ti.

---

## 5. Navegación (labels)

| Key | Label |
|-----|-------|
| `nav.cases` | Expedientes |
| `nav.clients` | Clientes |
| `nav.admin` | Administración |
| `nav.risk_queue` | Cola de riesgo *(F3)* |
| `tab.summary` | Resumen |
| `tab.supports` | Soportes |
| `tab.schedules` | Cédulas |
| `tab.liquidation` | Liquidación |
| `tab.audit_log` | Bitácora |
| `tab.package` | Paquete |

**Stepper E1–E7**

| Etapa | Label corto | Label largo |
|-------|-------------|-------------|
| E1 | Residencia | Residencia y ruta |
| E2 | Obligación | Obligación de declarar |
| E3 | Soportes | Soportes e información |
| E4 | Cédulas | Clasificación y depuración |
| E5 | Liquidación | Liquidación y saldo |
| E6 | Patrimonio | Coherencia patrimonial |
| E7 | Paquete | Borrador y paquete |

---

## 6. Estados y badges (copy)

| Key | Label | Badge |
|-----|-------|-------|
| `status.draft` | Borrador | neutral |
| `status.in_progress` | En proceso | info |
| `status.awaiting_pc` | Esperando aprobación | warning |
| `status.exogenous_diff` | Diferencia exógena | warning |
| `status.ready_package` | Listo para paquete | success |
| `status.package_ready` | Paquete listo | success |
| `status.rejected` | Rechazado | danger |
| `status.derived` | Derivado a manual | danger / neutral |
| `status.paused` | Pausado | neutral |
| `status.awaiting_reviewer` | Pendiente revisor | warning |
| `status.pc_omitted` | Omitido — sin diferencias | info |
| `status.reconciled` | Conciliado | success |
| `status.applied` | Aplicado | info |

**Live region (cola):** `Hay {n} expedientes de alto riesgo` — nunca solo el número.

---

## 7. Por nodo de sitemap — títulos, vacíos, ayudas

### A1 Login
| Elemento | Copy |
|----------|------|
| Título | Inicia sesión en Tribuvex |
| Ayuda | Usa la cuenta de tu firma (OAuth 2.1 · RNF-02). |
| CTA IdP | Continuar con · Microsoft · Google Workspace · IdP de la firma (SAML / OIDC) |
| Redirect | Redirigiendo a {proveedor}… |
| Demo | Entrar (solo demo) |
| Error auth | No pudimos iniciar sesión. Revisa tus datos o contacta al administrador. |
| Error IdP | No pudimos autenticarte con el proveedor. Intenta de nuevo o contacta al administrador de tu firma. |
| Sesión expirada | Tu sesión expiró. Vuelve a iniciar sesión para continuar donde ibas. |

### A2 / A4 Dashboard · Expedientes
| Elemento | Copy |
|----------|------|
| Título | Expedientes |
| CTA | Nuevo expediente |
| Vacío | Aún no hay expedientes. Crea el primero para este año gravable. |
| Filtro riesgo | Riesgo |
| Columna pendiente | Pendiente de |
| Empty filtro | Ningún expediente coincide con los filtros. |

### A3 Clientes
| Elemento | Copy |
|----------|------|
| Título | Clientes |
| Vacío | No hay clientes. Agrega un cliente para abrir expedientes. |
| CTA | Nuevo cliente |

### A5 Nuevo expediente
| Elemento | Copy |
|----------|------|
| Título | Nuevo expediente |
| Labels | Cliente · Año gravable · Perfil *(ej. Asalariado)* |
| Submit | Crear expediente |
| Error | Completa los campos marcados. |

### A6 Expediente
| Elemento | Copy |
|----------|------|
| Título patrón | {Nombre cliente} · AG {año} |
| Banner degradación | El asistente no está disponible. Puedes seguir con el motor y los datos del expediente. |
| Pausado | Expediente pausado. Reanuda cuando quieras; no se pierde el avance. |

### A7 Bitácora
| Elemento | Copy |
|----------|------|
| Título | Bitácora |
| Vacío | Todavía no hay decisiones registradas. |
| Fila patrón | {Usuario} · {Acción} · {PC/etapa} · {fecha} · Reglas {versión} |

### A8 Traza
| Elemento | Copy |
|----------|------|
| Título | Traza de la casilla {n} |
| Secciones | Valor · Soporte · Regla · Artículo |
| Vacío | No hay traza para este valor. |

### A9 Paquete
| Elemento | Copy |
|----------|------|
| Título | Paquete de presentación |
| Intro | Descarga los archivos para presentar en MUISCA. Tribuvex no presenta por ti. |
| CTA | Descargar paquete |
| Bloqueado | El paquete estará disponible cuando apruebes el borrador final (PC5). |

### A10 Admin
| Elemento | Copy |
|----------|------|
| Título | Administración |
| Users | Usuarios y roles |
| Clients | Clientes y permisos |
| Retention | Retención y exportación |
| Vacío users | No hay usuarios además de ti. |

### A12 Extemporánea / corrección
| Elemento | Copy |
|----------|------|
| Título | Sanciones e intereses |
| Tab Extemporánea | Extemporánea |
| Tab Corrección | Corrección (Art. 644) |
| CTA calc | Calcular sanciones |
| CTA incorporar | Incorporar a liquidación |
| Amnistías vacío | Ninguna amnistía parametrizada |
| Amnistías ayuda | Solo se muestran si el responsable normativo las cargó y verificó para este año. Nunca se asumen. |
| Hint corrección | Corrección sobre expediente presentado. Se aplica sanción del Art. 644 ET además del recálculo del 210. |

### A13 Onboarding independiente
| Elemento | Copy |
|----------|------|
| Título | Crea tu entidad |
| Lede | Una sola persona: roles de administrador, preparador y revisor en la misma cuenta. |
| CTA continuar | Continuar |
| CTA crear | Crear entidad |
| Éxito | Entidad lista |
| Consentimiento | Acepto que Tribuvex asiste y que la responsabilidad profesional de las declaraciones es mía (RNF-17). |

### RN Parámetros AG
| Elemento | Copy |
|----------|------|
| Título | Parámetros por año gravable |
| CTA regresión | Correr regresión |
| CTA firmar | Firmar y habilitar AG |
| Gate | No se puede habilitar: la regresión debe estar en verde y la firma del responsable registrada (RNF-16). |

### OP Operador
| Elemento | Copy |
|----------|------|
| Título | Entidades |
| Banner | Esta consola no lista NIT de contribuyentes, casillas ni soportes. |
| CTA | Alta de entidad · Suspender · Reactivar |

### LOT Lotes
| Elemento | Copy |
|----------|------|
| Título | Lotes de temporada |
| CTA | Nuevo lote |
| Nota | Los lotes no saltan PC: cada expediente se detiene donde corresponda. |

### F2 Multi-cédula (E4)
| Elemento | Copy |
|----------|------|
| Badge | Perfil · varias cédulas |
| Nota | Límites cruzados y opciones excluyentes se confirman en PC3. Cifras solo del motor. |
| CTA | Simular escenarios · Abrir PC3 |

### SIM Simulador
| Elemento | Copy |
|----------|------|
| Título | Simulador de escenarios |
| Summary | Compara opciones excluyentes antes de fijarlas en PC3. El motor recalcula; no inventa cifras. |
| Opciones | A · Costos y gastos · B · Exención 25 % |
| CTA | Calcular ambos · Aplicar escenario elegido en PC3 |

### CAL Calendario NIT
| Elemento | Copy |
|----------|------|
| Título | Calendario de vencimientos |
| Summary | Plazos de presentación del Formulario 210 según últimos dígitos del NIT. |
| Nota | Alertas no reemplazan el criterio del contador. |

### IMP Importación / exportación
| Elemento | Copy |
|----------|------|
| Título | Importación y exportación |
| Summary | Trae datos desde software contable o exporta el paquete. Sin credenciales MUISCA. |
| Gate | La importación no omite puntos de control humanos. |

### MEM Memoria entre años
| Elemento | Copy |
|----------|------|
| Título | {Cliente} · memoria entre años |
| Summary | Declaración anterior, anticipo y saldo a favor alimentan AG actual. |
| Nota | Nunca datos de otros clientes en esta memoria. |

---

## 8. Puntos de control — copy por PC

### CTAs y errores comunes (todos)

| Key | Copy |
|-----|------|
| `pc.error_summary_title` | Hay un problema |
| `pc.reject_reason_label` | Motivo de rechazo |
| `pc.reject_reason_hint` | Obligatorio si eliges Rechazar. Queda en la bitácora. |
| `pc.reject_reason_error` | Indica el motivo del rechazo. |
| `pc.toast_approved` | Aprobación registrada. El flujo puede continuar. |
| `pc.toast_rejected` | Rechazo registrado. La etapa no se cerró. |
| `pc.toast_edit` | Modo edición. El punto de control sigue abierto. |

### PC1 — Ruta y alcance
| Elemento | Copy |
|----------|------|
| Badge | PC1 · Ruta y alcance |
| Título | Confirmación de ruta |
| Summary | Revisa residencia, obligación preliminar y si el caso está en el alcance del Formulario 210. |
| Derivar CTA | Derivar a análisis manual |
| Success path | Ruta confirmada. Sigue la obligación de declarar. |

### PC2 — Exógena (F2)
| Elemento | Copy |
|----------|------|
| Badge | PC2 · Cruce con exógena |
| Título | Conciliación con información exógena |
| Summary | Hay diferencias entre tus soportes y lo reportado a la DIAN. Elige qué hacer en cada una. |
| Columnas | Concepto · Soporte · Exógena · Diferencia · Acción propuesta |
| Omitido | Omitido — sin diferencias |

### PC3 — Depuración
| Elemento | Copy |
|----------|------|
| Badge | PC3 · Depuración |
| Título | Clasificación y límites de cédula |
| Summary | Revisa rentas, deducciones y topes aplicados (incluidos límites en UVT). |
| Excluyente | No puedes combinar costos/gastos de honorarios con la exención del 25 %. Elige una opción. |
| Opción A | Aplicar costos y gastos |
| Opción B | Aplicar exención del 25 % |

### PC4 — Patrimonio (F2)
| Elemento | Copy |
|----------|------|
| Badge | PC4 · Patrimonio |
| Título | Coherencia patrimonial |
| Summary | El incremento patrimonial no queda del todo justificado con las rentas e ingresos registrados. |
| ACK riesgo | Acepto el riesgo y dejo constancia escrita en la bitácora. |
| ACK error | Debes confirmar la aceptación del riesgo por escrito para continuar. |

### PC5 — Borrador final
| Elemento | Copy |
|----------|------|
| Badge | PC5 · Borrador final |
| Título | Aprobación del borrador |
| Summary | Revisa el Formulario 210, el saldo y los hallazgos antes de generar el paquete. |
| Hallazgos | Hallazgos del verificador |
| ACK hallazgos | Revisé los hallazgos listados. |
| Revisor | Este expediente requiere visto bueno del revisor por nivel de riesgo. |
| Devolver hint | Elige a qué etapa devolver el expediente. |

---

## 9. Etapas E1–E7 — microcopy de trabajo

| Etapa | Título panel | Vacío / ayuda |
|-------|--------------|---------------|
| E1 | Residencia fiscal | Indica días de permanencia y demás criterios del Art. 10 ET. |
| E2 | Obligación de declarar | Evaluamos patrimonio, ingresos, consumos, consignaciones e IVA en UVT del año. |
| E3 | Soportes | Sube los documentos de la lista. Marcamos lo que falta. |
| E3 faltantes | Qué falta | Vacío completo: “No faltan soportes para este perfil.” |
| E4 | Cédulas | Cada ingreso debe tener cédula. Los dudosos te los marcamos. |
| E5 | Liquidación | Impuesto, descuentos, anticipo y saldo los calcula el motor de reglas. |
| E6 | Patrimonio | Comparamos el patrimonio líquido con el año anterior. |
| E7 | Borrador | Vista previa del 210 antes del punto de control final. |

---

## 10. Errores y feedback de sistema

| Situación | Copy |
|-----------|------|
| Error summary genérico | Hay un problema |
| Campos inválidos | Completa o corrige los campos marcados. |
| Sin permiso | No tienes permiso para ver este cliente o expediente. |
| 404 expediente | No encontramos este expediente. |
| Conflicto de versión | El expediente cambió. Recarga para ver la versión actual. |
| Subida fallida | No pudimos subir {archivo}. Intenta de nuevo o usa otro formato. |
| Extracción baja confianza | Revisar: baja confianza en {campo}. |
| Toast éxito genérico | Guardado. |
| Toast red | Sin conexión. Revisa tu red e intenta de nuevo. |

---

## 11. Portal contribuyente (F3) — mapa de copy

| Pantalla | Elemento | Copy |
|----------|----------|------|
| Home | Headline | Sube tus documentos para tu declaración |
| Home | Support | Tu contador prepara el borrador. Tú solo cargas lo que piden. Tribuvex no envía nada a la DIAN por ti. |
| Home | CTA | Subir documentos |
| Faltantes | Título | Qué falta |
| Faltantes | Ítem hecho | (nombre documento) — recibido |
| Borrador | Título | Tu borrador |
| Borrador | Saldo | Saldo estimado: {monto} |
| Borrador | CTA disabled hint | Cuando estén todos los documentos, podrás aceptar el borrador. |
| Borrador | CTA | Aceptar borrador |
| Confirm | | Al aceptar, tu contador recibe la confirmación. La presentación a la DIAN la hace tu contador. |
| Legal portal | | Tu contador revisa y presenta la declaración. Tribuvex no envía nada a la DIAN por ti. |
| Help | | ¿Dudas? Escribe a tu contador o firma. |
| Nunca | | Campos de usuario/contraseña MUISCA · jerga MUISCA/UVT/cédula/PC · firma electrónica DIAN |

---

## 12. Tablas — encabezados canónicos

**Expedientes:** Cliente · Documento · AG · Etapa · Estado · Riesgo · Pendiente de · Actualizado · (acciones)

**Diferencias exógena:** Concepto · Soporte · Exógena · Diferencia · Acción propuesta · (acciones)

**Casillas / traza lista:** Casilla · Concepto · Valor · Soporte · Estado · (Ver traza)

**Cédula PC3:** Concepto · Valor · Tope aplicado · Nota

**Bitácora:** Fecha · Usuario · Rol · Acción · Detalle · Versión reglas

---

## 13. Ownership y cambio

| Dominio | Owner | Revisores |
|---------|-------|-----------|
| CTAs / nav / vacíos | UX Writer | Product Design |
| Términos ET / UVT / casillas | Responsable normativo + Writer | Contador piloto |
| Disclaimer RNF-17 | Product + Legal/ToS | — |
| Portal tono | Writer | Contador (validar claridad) |
| Keys i18n | Front-end | Writer |

Cambios a labels de PC o disclaimer → entrada en [`DESIGN_DECISIONS.md`](./DESIGN_DECISIONS.md).

---

## 14. Cobertura vs entregables

| Superficie | ¿Mapeada? |
|------------|-----------|
| Nav + stepper + badges | Sí |
| A1–A10 | Sí |
| E1–E7 | Sí |
| PC1–PC5 | Sí |
| Portal P1–P3 | Sí (F3) |
| Errores / legal | Sí |
| Glosario bilingüe contador/portal | Sí |

## Next step

Wireframes de A6 + PC usando **estas** strings (no inventar copy en el wireframe).

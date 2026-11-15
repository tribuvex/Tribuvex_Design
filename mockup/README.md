# Tribuvex mockup HTML + Tailwind

**Entrada:** abrir [`index.html`](./index.html) o [`login.html`](./login.html) en el navegador (requiere red para CDN Tailwind + fuentes).

**Iconos:** Phosphor regular vía [`assets/icons.js`](./assets/icons.js) (`data-icon="folders"` o `TribuvexIcon.svg("gear")`). Alineado a `MASTER.md`.

**Stack:** HTML estático · Tailwind CDN · tokens en `assets/theme.js` · copy de `../ux/CONTENT_MODEL.md` · IA de `../ux/SITEMAP.md`.  
**No incluye React** — se implementará cuando se asigne al desarrollador.

## Cómo recorrer el flujo completo (asalariado)

1. `login.html` → 2. `expedientes.html` → 3. `expedientes-nuevo.html` → 4. `expediente.html?etapa=1&pc=1` → 5. `pc/pc1.html` → 6. etapas 2–7 vía stepper → 7. `pc/pc3.html` / `pc/pc5.html` → 8. `paquete.html`.

Control 2/Control 4 y portal están en el hub para cobertura F2/F3.

---

## Mapa ruta → historia de usuario (candidatas)

| Ruta mockup | Nodo | Historia candidata (formato) |
|-------------|------|------------------------------|
| `login.html` | A1 | Como usuario de la firma, quiero autenticarme con OAuth 2.1 (IdP), para acceder solo a datos de mi entidad. |
| `expedientes.html` | A2/A4 | Como preparador, quiero listar y filtrar expedientes, para priorizar trabajo en temporada. |
| `clientes.html` | A3 | Como preparador/admin, quiero gestionar clientes, para abrir expedientes asociados. |
| `expedientes-nuevo.html` | A5 | Como preparador, quiero crear un expediente (cliente, AG, perfil), para iniciar el grafo. |
| `expediente.html?etapa=1` | E1 | Como preparador, quiero capturar datos de residencia, para que el motor concluya Art. 10. |
| `pc/pc1.html` | Control 1 | Como preparador, quiero aprobar/editar/rechazar/derivar la ruta, para fijar alcance 210. |
| `expediente.html?etapa=2` | E2 | Como preparador, quiero ver obligación de declarar en UVT, para continuar o declarar voluntario. |
| `expediente.html?etapa=3` | E3 | Como preparador, quiero ver faltantes y subir soportes, para alimentar la extracción. |
| `pc/pc2.html` | Control 2 | Como preparador, quiero resolver diferencias exógena vs soporte, para documentar cada discrepancia. |
| `expediente.html?etapa=4` | E4 | Como preparador, quiero ver cédulas y topes, para revisar la depuración del motor. |
| `pc/pc3.html` | Control 3 | Como preparador, quiero aprobar depuración y opciones excluyentes, para fijar renta líquida. |
| `expediente.html?etapa=5` | E5 | Como preparador, quiero ver liquidación y saldo (anticipo suma), para validar el motor. |
| `expediente.html?etapa=6` | E6 | Como preparador, quiero ver comparación patrimonial, para detectar incrementos. |
| `pc/pc4.html` | Control 4 | Como preparador, quiero justificar o aceptar riesgo patrimonial por escrito, para cerrar coherencia. |
| `expediente.html?etapa=7` | E7 | Como preparador, quiero revisar el borrador 210, antes del Control 5. |
| `pc/pc5.html` | Control 5 | Como preparador/revisor, quiero aprobar el borrador (doble si riesgo), para habilitar el paquete. |
| `bitacora.html` | A7 | Como preparador/revisor, quiero ver quién aprobó qué, para auditoría. |
| Traza en expediente | A8 | Como preparador, quiero ver soporte+regla+artículo de una casilla, para explicar cifras. |
| `paquete.html` | A9 | Como preparador, quiero descargar el paquete MUISCA, sin que el sistema presente/firme/pague. |
| `admin.html` | A10 | Como admin de entidad, quiero gestionar usuarios/roles/permisos, sin ver otras firmas. |
| `cola-riesgo.html` | A11 | Como revisor, quiero una cola priorizada por riesgo, para atender Control 4/Control 5 primero. |
| `extemporanea.html` | A12 | Como preparador, quiero calcular sanciones e intereses (o abrir corrección 644), sin asumir amnistías. |
| `onboarding.html` | A13 | Como contador independiente, quiero crear mi entidad en minutos, con los tres roles en una cuenta. |
| `parametros.html` | RN | Como responsable normativo, quiero firmar parámetros solo si la regresión está en verde. |
| `operador.html` | OP | Como operador, quiero alta/suspender entidades sin ver datos tributarios. |
| `lotes.html` | LOT | Como preparador en temporada, quiero encolar lotes por entidad sin saltar controles. |
| `expediente.html?etapa=4&perfil=multi` | F2 | Como preparador, quiero clasificar varias cédulas con límites cruzados visibles. |
| `simulador.html` | SIM | Como preparador, quiero comparar costos (A) vs 25 % (B) antes de fijar en Control 3. |
| `calendario.html` | CAL | Como preparador, quiero ver vencimientos por últimos dígitos del NIT. |
| `importacion.html` | IMP | Como preparador, quiero importar desde contabilidad y exportar el paquete sin MUISCA. |
| `memoria.html` | MEM | Como preparador, quiero ver anticipo y patrimonio del año anterior del cliente. |
| `portal/index.html` | P1 | Como contribuyente, quiero un enlace claro para subir documentos, sin jerga tributaria. |
| `portal/upload.html` | P2 | Como contribuyente, quiero ver qué falta y subir archivos, sin credenciales DIAN. |
| `portal/borrador.html` | P3 | Como contribuyente, quiero ver saldo estimado y aceptar borrador, sabiendo que el contador presenta. |

### Historias transversales

| Tema | Historia candidata |
|------|-------------------|
| Sin efecto sin PC | Como sistema, no debo fijar datos ni cerrar etapa sin Aprobar registrado. |
| RNF-17 | Como producto, debo mostrar disclaimer de responsabilidad en todo PC y paquete. |
| Pausar/reanudar | Como preparador, quiero pausar el expediente sin perder estado (RF-23). |
| Multitenencia | Como usuario, no debo ver expedientes de otra entidad (RNF-01). |
| Degradación modelo | Como preparador, quiero seguir con motor/expediente si falla el asistente (RNF-10). |

---

## Inventario de archivos

| Archivo | Spec |
|---------|------|
| `assets/theme.js` | Colores/tipografía Tailwind ≈ tokens |
| `assets/shell.js` | Sidebar app contador |
| `assets/pc.js` / `pc-shell.js` | CTAs PC + validación rechazo |
| `login.html` … `paquete.html` | App |
| `pc/pc1.html` … `pc5.html` | Checkpoints |
| `portal/*` | Contribuyente |
| `../ux/*` | Fuente UX |
| `PENDIENTES_UI.md` | Gap analysis mockup ↔ PRD (pantallas y estados) |
| `estados.html` | Catálogo de estados de sistema (empty, error, Control 5 dual…) |
| `AUDIT.md` | Auditoría visual / a11y del mockup |

## Criterio de salida (mockup)

- [x] A1–A10 + E1–E7 navegables  
- [x] Control 1–Control 5 con Aprobar/Editar/Rechazar + disclaimer  
- [x] Portal P1–P3  
- [x] Cola riesgo  
- [x] Mapa a historias de usuario  
- [ ] React app (fuera de alcance de este mockup)

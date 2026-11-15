# Pendientes UI — Mockup vs PRD

**Fuente:** `01_PRD/PRD_Tribuvex.md` · `ux/SITEMAP.md` · `ux/CONTENT_MODEL.md`  
**Inventario actual:** mockup A1–A13 + RN/OP/LOT + F2 + SIM/CAL/IMP/MEM + estados + portal + PC1–PC5.  
**Actualizado:** 2026-11-15 (OAuth A1 · mockup HTML cerrado vs PRD)

Leyenda de prioridad:

| Tag | Significado |
|-----|------------|
| **P0** | Hueco visible en MVP (fase 1 / MN) o estado de sistema que el PRD exige en UI |
| **P1** | Fase 2 (cobertura) — UI ya tipada en sitemap/content |
| **P2** | Fase 3–4 / deseables — no bloquea historias del asalariado |
| **Profundizar** | El nodo existe pero está superficial frente al RF |

---

## Ya cubierto (no rehacer)

- A1 Login · A2/A4 Expedientes · A3 Clientes · A5 Nuevo · A6 Expediente (stepper E1–E7)  
- PC1–PC5 (aprobar / editar / rechazar + disclaimer) · A7 Bitácora · A8 Traza (panel) · A9 Paquete  
- A10 Admin · A11 Cola · A12 Extemporánea · A13 Onboarding · RN · OP · LOT  
- F2 Multi-cédula · SIM · CAL · IMP · MEM · Portal P1–P3 · estados de sistema 

---

> **Estado:** mockup HTML vs PRD cerrado. Fuera de alcance: app React (`README.md`).

## 1. Pantallas / nodos que faltan (nuevos HTML)

| ID | Pantalla | PRD / sitemap | Prioridad | Notas UI |
|----|----------|---------------|-----------|----------|
| A12 | Extemporánea / corrección | RF-16, RF-17, RF-20 · sitemap F3 · caso de uso 5 | **P2** | ✅ `extemporanea.html` + tabs + empty amnistías |
| A13 | Alta / onboarding entidad (contador independiente) | §3 perfil independiente | **P1** | ✅ `onboarding.html` |
| OP | Operador de plataforma | §3 · sitemap post | **P2** | ✅ `operador.html` · cero datos tributarios |
| RN | Parámetros año gravable (responsable normativo) | RNF-16 · §3 | **P1** | ✅ `parametros.html` · gate firma+regresión |
| LOT | Lotes / cola de procesamiento | D3 · RNF-12 · caso uso 7 | **P2** | ✅ `lotes.html` · turnos · no salta PC |
| SIM | Simulador de escenarios | D2 · fase 4 | **P2** | ✅ `simulador.html` · A costos · B 25 % |
| CAL | Alertas calendario por NIT | D5 | **P2** | ✅ `calendario.html` · últimos dígitos |
| IMP | Importación contable / export paquete | D4 | **P2** | ✅ `importacion.html` · sin MUISCA |
| MEM | Memoria cliente entre años | D6 | **P2** | ✅ `memoria.html` · anticipo / AG-1 |

---

## 2. Estados y pantallas de sistema (faltan o casi)

| Estado | PRD / content model | Prioridad | Dónde |
|--------|---------------------|-----------|-------|
| Empty A2 (sin expedientes) | CONTENT_MODEL A2 | **P0** | ✅ `expedientes.html?empty=1` |
| Empty filtro | CONTENT_MODEL A2 | **P0** | ✅ `expedientes.html?filtro=vacio` |
| Empty A3 clientes | CONTENT_MODEL A3 | **P0** | ✅ `clientes.html?empty=1` |
| Empty bitácora | CONTENT_MODEL A7 | **P0** | ✅ `bitacora.html?empty=1` |
| Error auth A1 | CONTENT_MODEL A1 | **P0** | ✅ `login.html?error=1` |
| Banner degradación modelo | RNF-10 · CONTENT_MODEL A6 | **P0** | ✅ `expediente.html?degrade=1` |
| 403 / sin permiso de cliente | SITEMAP excepciones | **P0** | ✅ `sin-permiso.html` |
| Sesión expirada → login + returnUrl | SITEMAP | **P1** | ✅ `login.html?expired=1&returnUrl=…` |
| Expediente pausado (UI reanudar) | RF-23 · CONTENT_MODEL | **P0** | ✅ `expediente.html?pausado=1` |
| Paquete bloqueado sin PC5 | CONTENT_MODEL A9 | **P0** | ✅ `paquete.html?blocked=1` |
| Derivado a análisis manual (terminal suave) | RF-22 · PC1 · SITEMAP | **P0** | ✅ `derivado.html` (desde PC1) |
| No obligado → declaración voluntaria | RF-03 | **P0** | ✅ `expediente.html?etapa=2&voluntario=1` |
| PC2 / PC4 omitido (badge en bitácora, sin modal) | §10 PC · SITEMAP | **P1** | ✅ fila Omitido en bitácora |
| Doble aprobación revisor en PC5 | §10 riesgo | **P0** | ✅ `pc/pc5.html?revisor=1` |

---

## 3. Nodos existentes a profundizar (Profundizar)

| Nodo | Qué pide el PRD | Qué hay hoy | Prioridad |
|------|-----------------|-------------|-----------|
| E1 Residencia | RF-01 captura criterios Art. 10 | ✅ Formulario + conclusión motor · `stages.js` | **P0** |
| E2 Obligación | RF-02 cinco condiciones UVT | ✅ Tabla 5 condiciones + voluntaria | **P0** |
| E3 Soportes | RF-04–07 lista por perfil, extracción, confianza, faltantes | ✅ Checklist + baja confianza + dropzone | **P0** |
| E4 Cédulas | RF-08–12 seis cédulas, topes, opciones excluyentes | ✅ Asalariado + `?perfil=multi` (F2) | **P1** |
| E5 Liquidación | RF-13–14 tabla 241, anticipo | ✅ KPIs + desglose + traza | **P0** |
| E6 Patrimonio | RF-15 comparación YoY | ✅ Cards YoY + no justificado | **P1** |
| E7 Borrador | Preview 210 + verificador | ✅ Casillas preview + PC5 / paquete | **P0** |
| A8 Traza | RF-21 explicación clara | ✅ Panel + versión motor | **P0** |
| A9 + RF-19 | Subir acuse/recibo + conservación | ✅ Upload acuse/recibo + toast | **P1** |
| A10 Admin | Usuarios, permisos por cliente, retención | ✅ Tabla permisos + retención | **P1** |
| A11 Cola riesgo | Priorización temporada | ✅ Orden + PC5 revisor + alto | **P1** |
| PC2 | Pedir soporte al cliente como acción | ✅ Select decisión + CTA pedir soporte | **P1** |
| PC5 | Devolver a etapa + hallazgo verificador | ✅ Select + variante revisor | **P0** |
| Portal P2 | Confianza / tipos de archivo; sin credenciales DIAN | ✅ `portal/upload.html` · tipos + confianza | **P1** |
| Portal P3 | Saldo estimado + aceptar borrador | ✅ `portal/borrador.html` · KPI + aceptar | **P1** |
| Login | OAuth 2.1 (RNF-02) | ✅ IdP buttons + redirect + `?oauth=error` · demo password | **P1** |

---

## 4. Flujos de caso de uso PRD §3 sin mockup dedicado

| # | Caso | Gap en mockup |
|---|------|---------------|
| 1 | Expediente nuevo | Cubierto (A5→E3) |
| 2 | Asalariado típico | Cubierto (camino feliz) |
| 3 | Varias cédulas | ✅ `expediente.html?etapa=4&perfil=multi` + SIM |
| 4 | Diferencias exógena | ✅ PC2 + pedir soporte |
| 5 | Extemporánea / corrección | ✅ A12 |
| 6 | Fuera de alcance | ✅ PC1 derivar + `derivado.html` |
| 7 | Temporada alta / lotes | ✅ LOT + CAL + A11 |

---

## 5. Orden sugerido para el mockup (siguiente oleada)

1. **Estados P0:** empty lists, error login, degradación, pausado/reanudar, paquete bloqueado, voluntaria E2, derivado manual, doble OK PC5  
2. **Profundizar E1–E3–E5–E7 + traza** al nivel CONTENT_MODEL (formularios y tablas, no solo copy)  
3. **A12 extemporánea** + **estado RF-19** post-paquete  
4. **RN parámetros AG** + **A13 onboarding independiente**  
5. ~~**Multi-cédula / LOT / SIM / CAL / IMP / MEM**~~ ✅ mockup cerrado  

---

## Checklist rápido (para no perder de vista)

- [x] Empty + empty-filtro expedientes  
- [x] Empty clientes / bitácora  
- [x] Error auth login  
- [x] Banner RNF-10 degradación  
- [x] 403 sin permiso (+ 404)  
- [x] Pausado + Reanudar  
- [x] Paquete bloqueado pre-PC5  
- [x] E2 declaración voluntaria  
- [x] Estado «Derivado a manual»  
- [x] PC5 doble aprobación revisor  
- [x] UI kit `#estados-sistema` + catálogo `estados.html`  
- [x] E1–E7 formularios/tablas ricos (asalariado) + UI kit `#etapas`  
- [x] A12 Extemporánea / corrección + UI kit `#a12`  
- [x] RF-19 acuse/recibo usable  
- [x] Admin permisos por cliente  
- [x] PC2 pedir soporte al cliente  
- [x] returnUrl post-sesión expirada  
- [x] A13 onboarding independiente  
- [x] RN parámetros AG (RNF-16)  
- [x] OP operador plataforma  
- [x] LOT lotes temporada  
- [x] Multi-cédula (F2) · `?perfil=multi`  
- [x] Simulador · calendario NIT · import contable · memoria años  
- [x] Login OAuth 2.1 (IdP + error proveedor)  

Cuando se implemente un ítem: marcar `[x]` aquí y una línea en `AUDIT.md` o en el Log del ODD task.

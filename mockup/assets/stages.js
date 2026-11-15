/** Stage bodies for expediente.html (asalariado AG 2026). */
(function () {
  function traceBtn(casilla, valor, soporte, regla, art) {
    return (
      '<button type="button" class="trace inline-flex rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold hover:bg-muted" ' +
      'data-c="' + casilla + '" data-v="' + valor + '" data-s="' + soporte + '" data-r="' + regla + '" data-a="' + art + '">' +
      "Ver traza</button>"
    );
  }

  function field(id, label, value, hint) {
    return (
      '<label class="flex flex-col gap-1.5 text-xs font-semibold" for="' + id + '">' + label +
      (hint ? '<span class="font-normal text-muted-foreground">' + hint + "</span>" : "") +
      '<input id="' + id + '" class="rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-normal shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20" value="' + value + '" />' +
      "</label>"
    );
  }

  function render(etapa, opts) {
    opts = opts || {};
    var voluntario = !!opts.voluntario;
    var multi = !!opts.multi;
    var q = multi ? "&perfil=multi" : "";
    var html = { body: "", actions: "" };

    if (etapa === 1) {
      html.body =
        '<div class="grid gap-4 sm:grid-cols-2">' +
        field("dias", "Días de permanencia en Colombia", "320", "Art. 10 ET · criterio principal") +
        field("familia", "Núcleo familiar en Colombia", "Sí", "Cónyuge / hijos") +
        field("activos", "Activos principales en Colombia", "Sí", "") +
        field("intereses", "Centro de intereses vitales", "Colombia", "") +
        "</div>" +
        '<div class="mt-5 rounded-lg border border-border bg-muted/50 p-4 text-sm">' +
        '<p class="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Conclusión del motor</p>' +
        '<p class="mt-1 font-semibold text-foreground">Residente fiscal · Formulario 210 en alcance</p>' +
        '<p class="mt-1 text-xs text-muted-foreground">Reglas AG2026.1 · pendiente confirmación en PC1</p>' +
        "</div>";
      html.actions =
        '<button type="button" class="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted" onclick="TribuvexPc.toast(\'Guardado\',\'Criterios de residencia actualizados.\')">Guardar</button>' +
        '<a class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover" href="./pc/pc1.html">Abrir PC1</a>';
    } else if (etapa === 2) {
      if (voluntario) {
        html.body =
          '<div class="tvx-banner tvx-banner--info mb-4" role="status"><div><strong>No obligado a declarar</strong> según umbrales UVT del AG. Puedes cerrar el expediente o declarar de forma voluntaria.</div></div>' +
          '<div class="overflow-hidden rounded-xl border border-border">' +
          '<table class="tvx-table w-full text-left text-sm"><thead class="bg-muted/80 text-[11px] uppercase text-muted-foreground"><tr>' +
          "<th class='px-3 py-2.5'>Condición</th><th class='px-3 py-2.5'>Umbral</th><th class='px-3 py-2.5'>Valor</th><th class='px-3 py-2.5'>Resultado</th></tr></thead><tbody class='divide-y divide-border'>" +
          "<tr><td class='px-3 py-2.5'>Patrimonio bruto</td><td class='px-3 py-2.5 font-mono text-xs'>4.500 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>$ 48.000.000</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>Bajo</span></td></tr>" +
          "<tr><td class='px-3 py-2.5'>Ingresos brutos</td><td class='px-3 py-2.5 font-mono text-xs'>1.400 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>$ 22.000.000</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>Bajo</span></td></tr>" +
          "<tr><td class='px-3 py-2.5'>Consumos</td><td class='px-3 py-2.5 font-mono text-xs'>1.400 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>$ 18.500.000</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>Bajo</span></td></tr>" +
          "<tr><td class='px-3 py-2.5'>Consignaciones</td><td class='px-3 py-2.5 font-mono text-xs'>1.400 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>$ 19.200.000</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>Bajo</span></td></tr>" +
          "<tr><td class='px-3 py-2.5'>Responsable IVA</td><td class='px-3 py-2.5'>—</td><td class='px-3 py-2.5'>No</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>No aplica</span></td></tr>" +
          "</tbody></table></div>";
        html.actions =
          '<button type="button" id="btn-voluntario" class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover">Declarar voluntariamente</button>' +
          '<a class="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted" href="./expedientes.html">Cerrar sin declarar</a>' +
          '<a class="rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:underline" href="./expediente.html?etapa=2">Ver caso obligado</a>';
      } else {
        html.body =
          '<div class="overflow-hidden rounded-xl border border-border">' +
          '<table class="tvx-table w-full text-left text-sm"><thead class="bg-muted/80 text-[11px] uppercase text-muted-foreground"><tr>' +
          "<th class='px-3 py-2.5'>Condición</th><th class='px-3 py-2.5'>Umbral</th><th class='px-3 py-2.5'>Valor</th><th class='px-3 py-2.5'>Resultado</th></tr></thead><tbody class='divide-y divide-border'>" +
          "<tr><td class='px-3 py-2.5'>Patrimonio bruto</td><td class='px-3 py-2.5 font-mono text-xs'>4.500 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>$ 210.000.000</td><td class='px-3 py-2.5'><span class='rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-semibold text-warning-foreground'>Supera</span></td></tr>" +
          "<tr><td class='px-3 py-2.5'>Ingresos brutos</td><td class='px-3 py-2.5 font-mono text-xs'>1.400 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>$ 86.400.000</td><td class='px-3 py-2.5'><span class='rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-semibold text-warning-foreground'>Supera</span></td></tr>" +
          "<tr><td class='px-3 py-2.5'>Consumos</td><td class='px-3 py-2.5 font-mono text-xs'>1.400 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>$ 41.000.000</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>Bajo</span></td></tr>" +
          "<tr><td class='px-3 py-2.5'>Consignaciones</td><td class='px-3 py-2.5 font-mono text-xs'>1.400 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>$ 88.100.000</td><td class='px-3 py-2.5'><span class='rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-semibold text-warning-foreground'>Supera</span></td></tr>" +
          "<tr><td class='px-3 py-2.5'>Responsable IVA</td><td class='px-3 py-2.5'>—</td><td class='px-3 py-2.5'>No</td><td class='px-3 py-2.5'><span class='rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground'>No</span></td></tr>" +
          "</tbody></table></div>" +
          '<p class="mt-4 rounded-lg border border-border bg-muted/40 p-3 text-sm"><strong>Resultado:</strong> Obligado a declarar. ' +
          '<a class="font-semibold text-secondary underline" href="./expediente.html?etapa=2&voluntario=1">Demo no obligado</a></p>';
        html.actions =
          '<a class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover" href="./expediente.html?etapa=3">Continuar a soportes</a>';
      }
    } else if (etapa === 3) {
      html.body =
        '<div class="mb-4 flex flex-wrap items-center justify-between gap-2">' +
        '<h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Qué falta</h3>' +
        '<span class="text-xs text-muted-foreground">Perfil asalariado · 3 de 5 recibidos</span></div>' +
        '<ul class="space-y-2">' +
        '<li class="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm">' +
        "<span>RUT actualizado</span><span class=\"rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground\">Recibido</span></li>" +
        '<li class="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm">' +
        "<span>Cédula de ciudadanía</span><span class=\"rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground\">Recibido</span></li>" +
        '<li class="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-warning/40 bg-warning-subtle/40 px-3 py-2.5 text-sm">' +
        "<div><div>Certificado 220</div><p class=\"text-xs text-warning-foreground\">Revisar: baja confianza en retenciones</p></div>" +
        "<span class=\"rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-semibold text-warning-foreground\">Pendiente</span></li>" +
        '<li class="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm">' +
        "<span>Extractos bancarios (dic)</span><span class=\"rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-semibold text-warning-foreground\">Pendiente</span></li>" +
        '<li class="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm">' +
        "<span>Declaración AG anterior</span><span class=\"rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground\">Recibido</span></li>" +
        "</ul>" +
        '<div class="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center">' +
        '<p class="text-sm font-semibold">Sube soportes (PDF, imagen o hoja de cálculo)</p>' +
        '<p class="mt-1 text-xs text-muted-foreground">Sin credenciales DIAN ni firma electrónica</p>' +
        '<button type="button" class="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover" onclick="TribuvexPc.toast(\'Subida simulada\',\'En producción inicia extracción con confianza por campo.\')">Subir documentos</button>' +
        "</div>";
      html.actions =
        '<a class="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-muted" href="./pc/pc2.html">Abrir PC2 (si hay diferencias)</a>' +
        '<a class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover" href="./expediente.html?etapa=4' + q + '">Continuar a cédulas</a>';
    } else if (etapa === 4) {
      if (multi) {
        html.body =
          '<div class="mb-3 flex flex-wrap items-center gap-2">' +
          '<span class="rounded-full bg-info-subtle px-2.5 py-0.5 text-xs font-semibold text-info-foreground">Perfil · varias cédulas</span>' +
          '<a class="text-xs font-semibold text-secondary hover:underline" href="./simulador.html">Abrir simulador (costos vs 25 %)</a></div>' +
          '<div class="mb-3 flex flex-wrap gap-2 text-xs">' +
          '<span class="rounded-full bg-muted px-2.5 py-1 font-semibold">General</span>' +
          '<span class="rounded-full bg-muted px-2.5 py-1 font-semibold">Pensiones</span>' +
          '<span class="rounded-full bg-muted px-2.5 py-1 font-semibold">Dividendos</span>' +
          '<span class="rounded-full bg-muted px-2.5 py-1 font-semibold">Ganancias ocasionales</span></div>' +
          '<div class="overflow-x-auto rounded-xl border border-border">' +
          '<table class="tvx-table w-full min-w-[720px] text-left text-sm"><thead class="bg-muted/80 text-[11px] uppercase text-muted-foreground"><tr>' +
          "<th class='px-3 py-2.5'>Concepto</th><th class='px-3 py-2.5'>Cédula</th><th class='px-3 py-2.5'>Valor</th><th class='px-3 py-2.5'>Límite cruzado</th><th class='px-3 py-2.5'>Estado</th><th class='px-3 py-2.5'></th></tr></thead><tbody class='divide-y divide-border'>" +
          "<tr><td class='px-3 py-2.5'>Salario</td><td class='px-3 py-2.5'>General · trabajo</td><td class='px-3 py-2.5 font-mono'>$ 72.000.000</td><td class='px-3 py-2.5 text-xs'>—</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>OK</span></td><td class='px-3 py-2.5'>" +
          traceBtn("43", "$ 72.000.000", "Certificado 220", "Rentas de trabajo", "Art. 103 ET") + "</td></tr>" +
          "<tr><td class='px-3 py-2.5'>Honorarios</td><td class='px-3 py-2.5'>General · no laborales</td><td class='px-3 py-2.5 font-mono'>$ 28.000.000</td><td class='px-3 py-2.5 text-xs'>Excluye 25 % si costos</td><td class='px-3 py-2.5'><span class='rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-semibold text-warning-foreground'>Opción</span></td><td class='px-3 py-2.5'>" +
          traceBtn("Hon", "$ 28.000.000", "Facturas", "Opción excluyente", "Art. 336 ET") + "</td></tr>" +
          "<tr><td class='px-3 py-2.5'>Arrendamientos</td><td class='px-3 py-2.5'>Capital</td><td class='px-3 py-2.5 font-mono'>$ 18.000.000</td><td class='px-3 py-2.5 text-xs'>—</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>OK</span></td><td class='px-3 py-2.5'>" +
          traceBtn("Arr", "$ 18.000.000", "Contratos", "Rentas de capital", "Art. 303 ET") + "</td></tr>" +
          "<tr><td class='px-3 py-2.5'>Pensión</td><td class='px-3 py-2.5'>Pensiones</td><td class='px-3 py-2.5 font-mono'>$ 24.000.000</td><td class='px-3 py-2.5 font-mono text-xs'>1.000 UVT/mes</td><td class='px-3 py-2.5'><span class='rounded-full bg-info-subtle px-2 py-0.5 text-xs font-semibold text-info-foreground'>Tope</span></td><td class='px-3 py-2.5'>" +
          traceBtn("Pen", "$ 24.000.000", "Colpensiones", "Exención pensiones", "Art. 206 ET") + "</td></tr>" +
          "<tr><td class='px-3 py-2.5'>Dividendos</td><td class='px-3 py-2.5'>Dividendos</td><td class='px-3 py-2.5 font-mono'>$ 6.500.000</td><td class='px-3 py-2.5 text-xs'>Art. 254-1</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>OK</span></td><td class='px-3 py-2.5'>" +
          traceBtn("Div", "$ 6.500.000", "Certificado", "Gravados / no gravados", "Art. 254-1 ET") + "</td></tr>" +
          "<tr><td class='px-3 py-2.5'>Venta de activo</td><td class='px-3 py-2.5'>Ganancias ocasionales</td><td class='px-3 py-2.5 font-mono'>$ 12.000.000</td><td class='px-3 py-2.5 font-mono text-xs'>15 %</td><td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>OK</span></td><td class='px-3 py-2.5'>" +
          traceBtn("GO", "$ 12.000.000", "Escritura", "Ganancia ocasional", "Art. 300 ET") + "</td></tr>" +
          "</tbody></table></div>" +
          '<p class="mt-3 text-xs text-muted-foreground">Límites cruzados y opciones excluyentes se confirman en PC3. Cifras solo del motor.</p>';
        html.actions =
          '<a class="rounded-lg border border-secondary px-4 py-2 text-sm font-semibold text-secondary hover:bg-muted" href="./simulador.html">Simular escenarios</a>' +
          '<a class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover" href="./pc/pc3.html">Abrir PC3</a>';
      } else {
        html.body =
          '<div class="mb-3 text-xs text-muted-foreground">Demo multi-cédula: <a class="font-semibold text-secondary underline" href="./expediente.html?etapa=4&perfil=multi">abrir perfil varias cédulas</a></div>' +
          '<div class="overflow-x-auto rounded-xl border border-border">' +
          '<table class="tvx-table w-full min-w-[640px] text-left text-sm"><thead class="bg-muted/80 text-[11px] uppercase text-muted-foreground"><tr>' +
          "<th class='px-3 py-2.5'>Casilla</th><th class='px-3 py-2.5'>Concepto</th><th class='px-3 py-2.5'>Cédula</th><th class='px-3 py-2.5'>Valor</th><th class='px-3 py-2.5'>Tope</th><th class='px-3 py-2.5'>Estado</th><th class='px-3 py-2.5'></th></tr></thead><tbody class='divide-y divide-border'>" +
          "<tr><td class='px-3 py-2.5 font-mono text-xs'>43</td><td class='px-3 py-2.5'>Ingresos brutos trabajo</td><td class='px-3 py-2.5'>General</td><td class='px-3 py-2.5 font-mono'>$ 86.400.000</td><td class='px-3 py-2.5'>—</td>" +
          "<td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>OK</span></td><td class='px-3 py-2.5'>" +
          traceBtn("43", "$ 86.400.000", "Certificado 220", "Clasificación rentas de trabajo", "Art. 103 ET") +
          "</td></tr>" +
          "<tr><td class='px-3 py-2.5 font-mono text-xs'>—</td><td class='px-3 py-2.5'>Exención laboral 25 %</td><td class='px-3 py-2.5'>General</td><td class='px-3 py-2.5 font-mono'>$ 21.600.000</td><td class='px-3 py-2.5 font-mono text-xs'>790 UVT</td>" +
          "<td class='px-3 py-2.5'><span class='rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success-foreground'>Dentro tope</span></td><td class='px-3 py-2.5'>" +
          traceBtn("—", "$ 21.600.000", "Motor AG2026.1", "Exenta 25 % tope 790 UVT", "Art. 206 ET") +
          "</td></tr>" +
          "<tr><td class='px-3 py-2.5 font-mono text-xs'>—</td><td class='px-3 py-2.5'>Límite Art. 336</td><td class='px-3 py-2.5'>General</td><td class='px-3 py-2.5 font-mono'>1.340 UVT</td><td class='px-3 py-2.5 font-mono text-xs'>40 % / 1.340</td>" +
          "<td class='px-3 py-2.5'><span class='rounded-full bg-info-subtle px-2 py-0.5 text-xs font-semibold text-info-foreground'>Aplicado</span></td><td class='px-3 py-2.5'>" +
          traceBtn("336", "1.340 UVT", "Motor", "Tope cédula general", "Art. 336 ET") +
          "</td></tr>" +
          "<tr class='bg-warning-subtle/30'><td class='px-3 py-2.5 font-mono text-xs'>49</td><td class='px-3 py-2.5'>Honorarios (dudoso)</td><td class='px-3 py-2.5'>General</td><td class='px-3 py-2.5 font-mono'>$ 0</td><td class='px-3 py-2.5'>—</td>" +
          "<td class='px-3 py-2.5'><span class='rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-semibold text-warning-foreground'>Revisar</span></td><td class='px-3 py-2.5'>" +
          traceBtn("49", "$ 0", "Sin soporte", "Clasificación pendiente", "—") +
          "</td></tr>" +
          "</tbody></table></div>" +
          '<p class="mt-3 text-xs text-muted-foreground">Los dudosos se confirman en PC3. No hay cifras editables del modelo: solo del motor.</p>';
        html.actions =
          '<a class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover" href="./pc/pc3.html">Abrir PC3</a>';
      }
    } else if (etapa === 5) {
      html.body =
        '<dl class="mb-4 grid gap-3 sm:grid-cols-3">' +
        '<div class="rounded-xl border border-border bg-muted/40 p-3"><dt class="text-[11px] font-semibold uppercase text-muted-foreground">Impuesto</dt><dd class="mt-1 font-mono text-lg font-semibold">$ 4.250.000</dd></div>' +
        '<div class="rounded-xl border border-border bg-muted/40 p-3"><dt class="text-[11px] font-semibold uppercase text-muted-foreground">Retenciones</dt><dd class="mt-1 font-mono text-lg font-semibold">$ 3.070.000</dd></div>' +
        '<div class="rounded-xl border border-border bg-card p-3 shadow-sm"><dt class="text-[11px] font-semibold uppercase text-muted-foreground">Saldo a pagar</dt><dd class="mt-1 font-mono text-lg font-semibold text-primary">$ 1.180.000</dd></div>' +
        "</dl>" +
        '<div class="overflow-hidden rounded-xl border border-border">' +
        '<table class="tvx-table w-full text-left text-sm"><thead class="bg-muted/80 text-[11px] uppercase text-muted-foreground"><tr>' +
        "<th class='px-3 py-2.5'>Concepto</th><th class='px-3 py-2.5'>Valor</th><th class='px-3 py-2.5'></th></tr></thead><tbody class='divide-y divide-border'>" +
        "<tr><td class='px-3 py-2.5'>Renta líquida gravable</td><td class='px-3 py-2.5 font-mono'>$ 48.200.000</td><td class='px-3 py-2.5'>" +
        traceBtn("RLG", "$ 48.200.000", "Motor", "Depuración cédula general", "Art. 336 ET") +
        "</td></tr>" +
        "<tr><td class='px-3 py-2.5'>Impuesto Art. 241 (UVT→COP)</td><td class='px-3 py-2.5 font-mono'>$ 4.250.000</td><td class='px-3 py-2.5'>" +
        traceBtn("241", "$ 4.250.000", "Motor", "Tabla progresiva UVT", "Art. 241 ET") +
        "</td></tr>" +
        "<tr><td class='px-3 py-2.5'>Anticipo año siguiente (suma)</td><td class='px-3 py-2.5 font-mono'>$ 590.000</td><td class='px-3 py-2.5'>" +
        traceBtn("Ant", "$ 590.000", "Motor", "25/50/75 % o promedio − retenciones", "Art. 807 ET") +
        "</td></tr>" +
        "</tbody></table></div>";
      html.actions =
        '<a class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover" href="./expediente.html?etapa=6">Continuar a patrimonio</a>';
    } else if (etapa === 6) {
      html.body =
        '<div class="grid gap-3 sm:grid-cols-2">' +
        '<div class="rounded-xl border border-border bg-muted/40 p-4"><p class="text-[11px] font-semibold uppercase text-muted-foreground">Patrimonio líquido AG 2025</p><p class="mt-1 font-mono text-xl font-semibold">$ 180.000.000</p></div>' +
        '<div class="rounded-xl border border-border bg-muted/40 p-4"><p class="text-[11px] font-semibold uppercase text-muted-foreground">Patrimonio líquido AG 2026</p><p class="mt-1 font-mono text-xl font-semibold">$ 222.000.000</p></div>' +
        "</div>" +
        '<div class="mt-4 rounded-xl border border-warning/40 bg-warning-subtle p-4 text-sm text-warning-foreground">' +
        '<p class="font-semibold">Incremento $ 42.000.000</p>' +
        '<p class="mt-1 text-xs">Justificado por rentas: $ 29.600.000 · <strong>Sin justificar: $ 12.400.000</strong></p>' +
        "</div>" +
        '<p class="mt-3 text-xs text-muted-foreground">Si no hay alerta, PC4 se omite y queda constancia en bitácora.</p>';
      html.actions =
        '<a class="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-muted" href="./pc/pc4.html">Abrir PC4</a>' +
        '<a class="rounded-lg bg-muted px-4 py-2 text-sm font-semibold hover:bg-border" href="./expediente.html?etapa=7">Continuar (si omitido)</a>';
    } else {
      html.body =
        '<div class="mb-4 flex flex-wrap items-center gap-2">' +
        '<span class="rounded-full bg-success-subtle px-2.5 py-0.5 text-xs font-semibold text-success-foreground">Verificador: 0 bloqueantes</span>' +
        '<span class="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Borrador 210</span></div>' +
        '<p class="mb-3 font-mono text-2xl font-bold tracking-tight">Saldo a pagar: $ 1.180.000</p>' +
        '<div class="overflow-hidden rounded-xl border border-border">' +
        '<table class="tvx-table w-full text-left text-sm"><thead class="bg-muted/80 text-[11px] uppercase text-muted-foreground"><tr>' +
        "<th class='px-3 py-2.5'>Casilla</th><th class='px-3 py-2.5'>Concepto</th><th class='px-3 py-2.5'>Valor</th><th class='px-3 py-2.5'></th></tr></thead><tbody class='divide-y divide-border'>" +
        "<tr><td class='px-3 py-2.5 font-mono text-xs'>43</td><td class='px-3 py-2.5'>Ingresos brutos</td><td class='px-3 py-2.5 font-mono'>$ 86.400.000</td><td class='px-3 py-2.5'>" +
        traceBtn("43", "$ 86.400.000", "Certificado 220", "Rentas de trabajo", "Art. 103 ET") +
        "</td></tr>" +
        "<tr><td class='px-3 py-2.5 font-mono text-xs'>78</td><td class='px-3 py-2.5'>Impuesto neto</td><td class='px-3 py-2.5 font-mono'>$ 4.250.000</td><td class='px-3 py-2.5'>" +
        traceBtn("78", "$ 4.250.000", "Motor", "Art. 241", "Art. 241 ET") +
        "</td></tr>" +
        "<tr><td class='px-3 py-2.5 font-mono text-xs'>91</td><td class='px-3 py-2.5'>Saldo a pagar</td><td class='px-3 py-2.5 font-mono font-semibold'>$ 1.180.000</td><td class='px-3 py-2.5'>" +
        traceBtn("91", "$ 1.180.000", "Motor", "Impuesto − retenciones + anticipo", "Instructivo 210") +
        "</td></tr>" +
        "</tbody></table></div>";
      html.actions =
        '<a class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover" href="./pc/pc5.html">Abrir PC5</a>' +
        '<a class="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted" href="./paquete.html?blocked=1">Paquete (bloqueado)</a>' +
        '<a class="rounded-lg bg-muted px-4 py-2 text-sm font-semibold hover:bg-border" href="./paquete.html">Paquete (tras PC5)</a>' +
        '<a class="rounded-lg px-3 py-2 text-xs font-semibold text-secondary hover:underline" href="./extemporanea.html">A12 Extemporánea / corrección</a>';
    }

    return html;
  }

  window.TribuvexStages = { render: render, traceBtn: traceBtn };
})();

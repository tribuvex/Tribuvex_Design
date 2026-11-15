/** PC chrome. window.PC_PAGE = { badge, title, summary, next, back, bodyHtml, extraFooter? } */
(function () {
  var p = window.PC_PAGE;
  if (!p) return;

  if (!document.querySelector('link[href*="app.css"]')) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../assets/app.css";
    document.head.appendChild(link);
  }

  document.title = p.badge + " — Tribuvex";
  document.body.className = "min-h-screen bg-background font-sans text-foreground antialiased";
  document.body.innerHTML =
    '<div class="fixed inset-0 z-50 flex items-end justify-center bg-foreground/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6">' +
    '<div class="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-border border-l-[4px] border-l-warning bg-card shadow-tribuvex-lg sm:rounded-2xl" role="dialog" aria-modal="true" aria-labelledby="pc-title">' +
    '<div class="border-b border-border px-6 py-5">' +
    '<div class="mb-3 flex flex-wrap items-center gap-2">' +
    '<span class="inline-flex items-center gap-1.5 rounded-full bg-warning-subtle px-2.5 py-1 text-xs font-semibold text-warning-foreground">' +
    '<span class="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true"></span>' +
    p.badge +
    "</span>" +
    '<span class="text-[11px] font-medium text-muted-foreground">Decisión humana requerida</span>' +
    "</div>" +
    '<h1 id="pc-title" class="text-xl font-bold tracking-tight text-foreground">' +
    p.title +
    "</h1>" +
    '<p class="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">' +
    p.summary +
    "</p></div>" +
    '<div class="flex-1 overflow-auto px-6 py-5">' +
    '<div id="error-summary" class="mb-4 hidden rounded-lg border border-destructive bg-destructive-subtle p-4 focus:outline-none" role="alert" tabindex="-1">' +
    '<h2 class="text-sm font-semibold text-destructive">Hay un problema</h2>' +
    '<a class="mt-1 inline-block text-sm font-semibold text-destructive underline underline-offset-2" href="#reject-reason">Indica el motivo del rechazo</a></div>' +
    p.bodyHtml +
    '<div id="reject-field" class="mt-5">' +
    '<label for="reject-reason" class="block text-sm font-semibold text-foreground">Motivo de rechazo</label>' +
    '<p class="mt-0.5 text-xs text-muted-foreground">Obligatorio si eliges Rechazar. Queda en la bitácora.</p>' +
    '<textarea id="reject-reason" class="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" rows="3"></textarea>' +
    '<p id="reject-error" class="mt-1.5 hidden text-xs font-medium text-destructive">Indica el motivo del rechazo.</p></div>' +
    '<p class="mt-5 rounded-lg border border-border bg-muted/80 p-3.5 text-xs leading-relaxed text-muted-foreground">Tribuvex asiste en la preparación de la declaración. La responsabilidad profesional es del contador. El sistema no presenta, firma ni paga en MUISCA.</p>' +
    "</div>" +
    '<div class="tvx-pc-footer flex flex-wrap items-center justify-end gap-2 border-t border-border bg-card px-6 py-4">' +
    '<a href="' +
    (p.back || "../expediente.html") +
    '" class="mr-auto rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground">Volver al expediente</a>' +
    (p.extraFooter || "") +
    '<button type="button" id="btn-approve" class="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover">Aprobar</button>' +
    '<button type="button" id="btn-edit" class="rounded-lg border border-primary bg-card px-4 py-2.5 text-sm font-semibold text-primary hover:bg-muted">Editar</button>' +
    '<button type="button" id="btn-reject" class="rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-white hover:bg-destructive-hover">Rechazar</button>' +
    "</div></div></div>";

  TribuvexPc.wirePc({ nextHref: p.next });
})();

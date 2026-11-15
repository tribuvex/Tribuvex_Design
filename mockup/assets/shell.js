/**
 * App chrome. body[data-shell=app][data-nav=…][data-base=.]
 * Depends on TribuvexIcon (assets/icons.js) — auto-loads if missing.
 */
(function () {
  var body = document.body;
  var mode = body.getAttribute("data-shell") || "app";
  var nav = body.getAttribute("data-nav") || "";
  var base = body.getAttribute("data-base") || ".";

  function ensureCss() {
    if (!document.querySelector('link[href*="app.css"]')) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = base + "/assets/app.css";
      document.head.appendChild(link);
    }
  }

  function ensureIcons(then) {
    if (window.TribuvexIcon) {
      then();
      return;
    }
    var existing = document.querySelector('script[src*="icons.js"]');
    if (existing) {
      existing.addEventListener("load", then);
      return;
    }
    var s = document.createElement("script");
    s.src = base + "/assets/icons.js";
    s.onload = then;
    document.head.appendChild(s);
  }

  function icon(name, size) {
    return window.TribuvexIcon.svg(name, { size: size || 16, decorative: true });
  }

  function item(href, id, label, iconName) {
    var active = nav === id;
    return (
      '<a href="' +
      base +
      "/" +
      href +
      '" class="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ' +
      (active
        ? "bg-white/15 text-white shadow-sm ring-1 ring-white/10"
        : "text-white/80 hover:bg-white/10 hover:text-white") +
      '" ' +
      (active ? 'aria-current="page"' : "") +
      ">" +
      '<span class="tvx-nav-icon flex h-7 w-7 items-center justify-center rounded-md ' +
      (active ? "bg-white/15" : "bg-white/5 group-hover:bg-white/10") +
      '" aria-hidden="true">' +
      icon(iconName, 16) +
      "</span>" +
      label +
      "</a>"
    );
  }

  function boot() {
    ensureCss();

    if (mode === "app") {
      var aside =
        '<aside class="sticky top-0 z-30 flex h-screen w-60 shrink-0 flex-col border-r border-white/10 bg-sidebar text-sidebar-foreground">' +
        '<div class="border-b border-white/10 px-4 py-5">' +
        '<div class="text-lg font-bold tracking-tight">Tribuvex</div>' +
        '<div class="mt-0.5 text-[11px] font-medium text-white/55">Declaración 210 · AG 2026</div>' +
        "</div>" +
        '<nav class="flex flex-1 flex-col gap-1 p-3" aria-label="Principal">' +
        '<p class="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">Trabajo</p>' +
        item("expedientes.html", "expedientes", "Expedientes", "folders") +
        item("clientes.html", "clientes", "Clientes", "users") +
        item("cola-riesgo.html", "riesgo", "Cola de riesgo", "warning") +
        item("lotes.html", "lotes", "Lotes", "stack") +
        '<p class="mb-1 mt-4 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">Entidad</p>' +
        item("admin.html", "admin", "Administración", "gear") +
        "</nav>" +
        '<div class="border-t border-white/10 p-3">' +
        '<div class="mb-3 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">' +
        '<div class="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white" aria-hidden="true">' +
        icon("user-circle", 20) +
        "</div>" +
        '<div class="min-w-0">' +
        '<div class="truncate text-xs font-semibold text-white">Contador Firma</div>' +
        '<div class="truncate text-[10px] text-white/50">Preparador</div>' +
        "</div></div>" +
        '<button type="button" id="theme-toggle" class="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10" aria-pressed="false">' +
        '<span data-theme-icon>' +
        icon("moon", 14) +
        "</span><span data-theme-label>Modo oscuro</span></button>" +
        '<a href="' +
        base +
        '/index.html" class="block text-center text-[11px] text-white/45 hover:text-white/80">Hub del mockup</a>' +
        "</div></aside>";

      var topbar =
        '<header class="sticky top-0 z-20 border-b border-border bg-card/90 px-6 py-3 backdrop-blur md:px-8">' +
        '<div class="mx-auto flex max-w-6xl items-center justify-between gap-4">' +
        '<p class="text-xs text-muted-foreground">Firma Contable Andes · Multitenant aislado</p>' +
        '<div class="flex items-center gap-2">' +
        '<span class="hidden rounded-full bg-success-subtle px-2.5 py-0.5 text-[11px] font-semibold text-success-foreground sm:inline">Motor AG2026.1</span>' +
        '<a href="' +
        base +
        '/expedientes-nuevo.html" class="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-hover">' +
        icon("plus", 14) +
        "Nuevo expediente</a>" +
        "</div></div></header>";

      var wrap = document.createElement("div");
      wrap.className = "flex min-h-screen bg-background font-sans text-sm text-foreground antialiased";
      wrap.innerHTML =
        aside +
        '<div class="flex min-w-0 flex-1 flex-col"><div id="shell-top"></div><div class="min-w-0 flex-1" id="shell-main"></div></div>';

      var main = document.getElementById("app-main");
      if (!main) return;
      var parent = main.parentNode;
      parent.insertBefore(wrap, main);
      wrap.querySelector("#shell-top").innerHTML = topbar;
      wrap.querySelector("#shell-main").appendChild(main);
      main.classList.add("mx-auto", "w-full", "max-w-6xl", "p-6", "md:p-8");
    }

    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var dark = document.documentElement.classList.toggle("dark");
        var label = toggle.querySelector("[data-theme-label]");
        var ic = toggle.querySelector("[data-theme-icon]");
        if (label) label.textContent = dark ? "Modo claro" : "Modo oscuro";
        if (ic) ic.innerHTML = icon(dark ? "sun" : "moon", 14);
        toggle.setAttribute("aria-pressed", dark ? "true" : "false");
      });
    }

    if (window.TribuvexIcon && window.TribuvexIcon.mount) {
      window.TribuvexIcon.mount(document);
    }
  }

  ensureIcons(boot);
})();

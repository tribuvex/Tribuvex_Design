/**
 * App chrome. body[data-shell=app][data-nav=…][data-base=.]
 * Depends on TribuvexIcon (assets/icons.js) — auto-loads if missing.
 * Mobile (<md): off-canvas sidebar + menu toggle; md+: sticky sidebar.
 */
(function () {
  var body = document.body;
  var mode = body.getAttribute("data-shell") || "app";
  var nav = body.getAttribute("data-nav") || "";
  var base = body.getAttribute("data-base") || ".";
  var mqDesktop = window.matchMedia("(min-width: 768px)");

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
        : "text-white/90 hover:bg-white/10 hover:text-white") +
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

  function setNavOpen(wrap, open) {
    wrap.classList.toggle("tvx-shell--nav-open", open);
    body.classList.toggle("tvx-nav-lock", open && !mqDesktop.matches);
    var btn = wrap.querySelector("#nav-toggle");
    var scrim = wrap.querySelector("#nav-scrim");
    if (btn) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var label = btn.querySelector("[data-nav-label]");
      var ic = btn.querySelector("[data-nav-icon]");
      if (label) label.textContent = open ? "Cerrar menú" : "Abrir menú";
      if (ic) ic.innerHTML = icon(open ? "x" : "list", 18);
    }
    if (scrim) scrim.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function bindNav(wrap) {
    var btn = wrap.querySelector("#nav-toggle");
    var scrim = wrap.querySelector("#nav-scrim");
    var aside = wrap.querySelector("#app-sidebar");
    if (!btn || !aside) return;

    function close() {
      setNavOpen(wrap, false);
    }
    function toggle() {
      setNavOpen(wrap, !wrap.classList.contains("tvx-shell--nav-open"));
    }

    btn.addEventListener("click", toggle);
    if (scrim) scrim.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && wrap.classList.contains("tvx-shell--nav-open")) close();
    });
    aside.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (!mqDesktop.matches) close();
      });
    });
    function onMq() {
      if (mqDesktop.matches) close();
    }
    if (mqDesktop.addEventListener) mqDesktop.addEventListener("change", onMq);
    else if (mqDesktop.addListener) mqDesktop.addListener(onMq);
  }

  function boot() {
    ensureCss();

    if (mode === "app") {
      var aside =
        '<aside id="app-sidebar" class="tvx-sidebar flex h-screen w-60 shrink-0 flex-col border-r border-white/10 bg-sidebar text-sidebar-foreground">' +
        '<div class="border-b border-white/10 px-4 py-5">' +
        '<div class="text-lg font-bold tracking-tight">Tribuvex</div>' +
        '<div class="mt-0.5 text-[11px] font-medium text-white/75">Declaración 210 · AG 2026</div>' +
        "</div>" +
        '<nav class="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Principal">' +
        '<p class="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/65">Trabajo</p>' +
        item("expedientes.html", "expedientes", "Expedientes", "folders") +
        item("clientes.html", "clientes", "Clientes", "users") +
        item("cola-riesgo.html", "riesgo", "Cola de riesgo", "warning") +
        item("lotes.html", "lotes", "Lotes", "stack") +
        '<p class="mb-1 mt-4 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/65">Entidad</p>' +
        item("admin.html", "admin", "Administración", "gear") +
        "</nav>" +
        '<div class="border-t border-white/10 p-3">' +
        '<div class="mb-3 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">' +
        '<div class="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white" aria-hidden="true">' +
        icon("user-circle", 20) +
        "</div>" +
        '<div class="min-w-0">' +
        '<div class="truncate text-xs font-semibold text-white">Contador Firma</div>' +
        '<div class="truncate text-[10px] text-white/70">Preparador</div>' +
        "</div></div>" +
        '<button type="button" id="theme-toggle" class="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-white/15" aria-pressed="false">' +
        '<span data-theme-icon>' +
        icon("moon", 14) +
        "</span><span data-theme-label>Modo oscuro</span></button>" +
        '<a href="' +
        base +
        '/../index.html" class="mb-1 block text-center text-xs font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline">Inicio · Design system</a>' +
        '<a href="' +
        base +
        '/index.html" class="block text-center text-xs font-medium text-white/75 hover:text-white">Hub del mockup</a>' +
        "</div></aside>";

      var topbar =
        '<header class="sticky top-0 z-20 border-b border-border bg-card px-4 py-3 sm:px-6 md:px-8">' +
        '<div class="mx-auto flex max-w-6xl items-center gap-3">' +
        '<button type="button" id="nav-toggle" class="tvx-nav-toggle inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-muted md:hidden" aria-controls="app-sidebar" aria-expanded="false">' +
        '<span class="sr-only" data-nav-label>Abrir menú</span>' +
        '<span data-nav-icon aria-hidden="true">' +
        icon("list", 18) +
        "</span></button>" +
        '<p class="min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground" title="Firma Contable Andes · Multitenant aislado">' +
        '<span class="sm:hidden">Firma Contable Andes</span>' +
        '<span class="hidden sm:inline">Firma Contable Andes · Multitenant aislado</span>' +
        "</p>" +
        '<div class="flex shrink-0 items-center gap-2">' +
        '<span class="hidden rounded-full bg-success-subtle px-2.5 py-0.5 text-[11px] font-semibold text-success-foreground sm:inline">Motor AG2026.1</span>' +
        '<a href="' +
        base +
        '/expedientes-nuevo.html" class="inline-flex min-h-10 items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent-hover">' +
        icon("plus", 14) +
        '<span class="sm:hidden">Nuevo</span><span class="hidden sm:inline">Nuevo expediente</span></a>' +
        "</div></div></header>";

      var wrap = document.createElement("div");
      wrap.className = "tvx-shell flex min-h-screen bg-background font-sans text-sm text-foreground antialiased";
      wrap.innerHTML =
        '<div id="nav-scrim" class="tvx-nav-scrim" aria-hidden="true"></div>' +
        aside +
        '<div class="flex min-w-0 flex-1 flex-col"><div id="shell-top"></div><div class="min-w-0 flex-1" id="shell-main"></div></div>';

      var main = document.getElementById("app-main");
      if (!main) return;
      var parent = main.parentNode;
      parent.insertBefore(wrap, main);
      wrap.querySelector("#shell-top").innerHTML = topbar;
      wrap.querySelector("#shell-main").appendChild(main);
      main.classList.add("mx-auto", "w-full", "max-w-6xl", "p-4", "sm:p-6", "md:p-8");
      bindNav(wrap);
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

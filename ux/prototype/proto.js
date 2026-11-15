/* Shared prototype helpers */
window.Proto = (function () {
  function toast(title, body) {
    var el = document.getElementById("toast");
    if (!el) return;
    document.getElementById("toast-title").textContent = title;
    document.getElementById("toast-body").textContent = body;
    el.classList.add("is-visible");
    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(function () {
      el.classList.remove("is-visible");
    }, 3200);
  }

  function bindTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var dark = root.classList.toggle("dark");
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.textContent = dark ? "Modo claro" : "Modo oscuro";
    });
  }

  document.addEventListener("DOMContentLoaded", bindTheme);

  return { toast: toast, bindTheme: bindTheme };
})();

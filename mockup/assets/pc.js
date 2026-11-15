/** Shared PC: Aprobar / Editar / Rechazar + reject validation + toast */
(function () {
  function toast(title, body) {
    var el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className =
        "fixed bottom-4 right-4 z-[70] hidden max-w-sm rounded-xl border border-border border-l-4 border-l-accent bg-card p-4 shadow-tribuvex-lg";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.innerHTML =
        '<strong id="toast-title" class="mb-1 block text-sm font-semibold text-foreground"></strong>' +
        '<span id="toast-body" class="text-sm text-muted-foreground"></span>';
      document.body.appendChild(el);
    }
    document.getElementById("toast-title").textContent = title;
    document.getElementById("toast-body").textContent = body;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.add("hidden");
    }, 3200);
  }

  function wirePc(opts) {
    opts = opts || {};
    var next = opts.nextHref || "../expedientes.html";
    var summary = document.getElementById("error-summary");
    var field = document.getElementById("reject-field");
    var reason = document.getElementById("reject-reason");

    function clearErr() {
      summary?.classList.add("hidden");
      field?.classList.remove("ring-2", "ring-destructive");
      document.getElementById("reject-error")?.classList.add("hidden");
    }

    document.getElementById("btn-approve")?.addEventListener("click", function () {
      clearErr();
      toast("Aprobación registrada", "El flujo puede continuar.");
      setTimeout(function () {
        location.href = next;
      }, 700);
    });

    document.getElementById("btn-edit")?.addEventListener("click", function () {
      clearErr();
      toast("Modo edición", "El control sigue abierto.");
    });

    document.getElementById("btn-reject")?.addEventListener("click", function () {
      if (!reason || !reason.value.trim()) {
        summary?.classList.remove("hidden");
        field?.classList.add("ring-2", "ring-destructive");
        document.getElementById("reject-error")?.classList.remove("hidden");
        summary?.focus();
        return;
      }
      clearErr();
      toast("Rechazo registrado", "Motivo en bitácora. La etapa no se cerró.");
    });

    reason?.addEventListener("input", function () {
      if (reason.value.trim()) clearErr();
    });

    document.getElementById("btn-approve")?.focus();
  }

  window.TribuvexPc = { toast: toast, wirePc: wirePc };
})();

/**
 * Tribuvex wireflow board renderer.
 * Config: { width, height, mockBase, sections, screens, happy, branches }
 * screen: { id, num, name, href, x, y, pc?, hub? }
 * Click thumbnail → modal preview (Ctrl/Cmd+click still opens a new tab).
 */
(function () {
  var previewState = { lastFocus: null, href: "" };

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "className") node.className = attrs[k];
        else if (k === "dataset") {
          Object.keys(attrs.dataset).forEach(function (d) {
            node.dataset[d] = attrs.dataset[d];
          });
        } else node.setAttribute(k, attrs[k]);
      });
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function ensurePreviewStyles() {
    if (document.getElementById("wf-preview-styles")) return;
    if (document.querySelector('link[href*="wireflow-board.css"]')) return;
    var script = document.querySelector('script[src*="wireflow-board.js"]');
    var href = script && script.src
      ? script.src.replace(/wireflow-board\.js(\?.*)?$/, "wireflow-board.css")
      : "./assets/wireflow-board.css";
    var link = document.createElement("link");
    link.id = "wf-preview-styles";
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function ensureModal() {
    ensurePreviewStyles();
    var root = document.getElementById("wf-preview");
    if (root) return root;
    root = el("div", {
      id: "wf-preview",
      className: "wf-preview",
      hidden: "hidden",
    });
    root.innerHTML =
      '<div class="wf-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="wf-preview-title">' +
      '<div class="wf-preview-bar">' +
      '<h2 id="wf-preview-title">Vista previa</h2>' +
      '<div class="wf-preview-actions">' +
      '<a id="wf-preview-ext" href="#" target="_blank" rel="noopener">Abrir en pestaña</a>' +
      '<button type="button" class="primary" id="wf-preview-close">Cerrar</button>' +
      "</div></div>" +
      '<div class="wf-preview-frame-wrap">' +
      '<iframe id="wf-preview-frame" title="Vista previa del mockup"></iframe>' +
      "</div>" +
      '<p class="wf-preview-note">Esc o Cerrar para volver al wireflow. Ctrl/Cmd+clic en la miniatura abre pestaña nueva.</p>' +
      "</div>";
    document.body.appendChild(root);

    function close() {
      closePreview();
    }
    root.addEventListener("click", function (e) {
      if (e.target === root) close();
    });
    document.getElementById("wf-preview-close").addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !root.hidden) {
        e.preventDefault();
        close();
      }
    });
    return root;
  }

  function openPreview(href, title) {
    var root = ensureModal();
    previewState.lastFocus = document.activeElement;
    previewState.href = href;
    document.getElementById("wf-preview-title").textContent = title || "Vista previa";
    var ext = document.getElementById("wf-preview-ext");
    ext.href = href;
    var frame = document.getElementById("wf-preview-frame");
    frame.src = href;
    root.hidden = false;
    document.body.classList.add("wf-preview-open");
    document.getElementById("wf-preview-close").focus();
  }

  function closePreview() {
    var root = document.getElementById("wf-preview");
    if (!root || root.hidden) return;
    root.hidden = true;
    document.body.classList.remove("wf-preview-open");
    var frame = document.getElementById("wf-preview-frame");
    if (frame) frame.src = "about:blank";
    if (previewState.lastFocus && typeof previewState.lastFocus.focus === "function") {
      try {
        previewState.lastFocus.focus();
      } catch (e) {}
    }
  }

  function resolveHref(s, mockBase) {
    var href = s.href;
    if (href.indexOf("http") === 0) return href;
    if (href.indexOf("../../mockup/") === 0 || href.indexOf("../mockup/") === 0) return href;
    if (href.indexOf("../") === -1) return mockBase + href;
    return mockBase + href.replace(/^\.\.\//, "").replace(/^\.\//, "");
  }

  function bindDevice(anchor) {
    if (!anchor || anchor.dataset.wfBound === "1") return;
    anchor.dataset.wfBound = "1";
    anchor.setAttribute("aria-haspopup", "dialog");
    anchor.addEventListener("click", function (e) {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      var article = anchor.closest(".screen");
      var title = article && article.querySelector(".screen-label .name")
        ? article.querySelector(".screen-label .name").textContent
        : anchor.getAttribute("aria-label") || "Mockup";
      openPreview(href, title.trim());
    });
  }

  function bindPreview(root) {
    ensureModal();
    (root || document).querySelectorAll("a.device[href]").forEach(bindDevice);
  }

  function screenCard(s, mockBase) {
    var href = resolveHref(s, mockBase);
    var article = el("article", {
      className: "screen" + (s.pc ? " is-pc" : "") + (s.hub ? " is-hub" : ""),
      id: s.id,
    });
    article.style.left = s.x + "px";
    article.style.top = s.y + "px";
    article.innerHTML =
      '<div class="screen-label"><span class="name"></span><span class="id"></span></div>' +
      '<a class="device" rel="noopener">' +
      '<div class="device-chrome" aria-hidden="true"><i></i><i></i><i></i></div>' +
      '<div class="viewport">' +
      '<iframe loading="lazy"></iframe>' +
      '<div class="fallback" aria-hidden="true">' +
      '<div class="sk-title"></div><div class="sk-line"></div><div class="sk-line" style="width:70%"></div>' +
      '<div class="sk-block"></div><div class="sk-cta"></div>' +
      "</div></div></a>";
    article.querySelector(".name").textContent = s.name;
    article.querySelector(".id").textContent = s.num;
    var a = article.querySelector("a.device");
    a.href = href;
    a.title = "Ver detalle · " + s.name;
    var iframe = article.querySelector("iframe");
    iframe.title = s.name;
    iframe.src = href;
    bindDevice(a);
    return article;
  }

  function anchor(node, side) {
    var x = node.offsetLeft;
    var y = node.offsetTop;
    var w = node.offsetWidth;
    var h = node.offsetHeight;
    var midY = y + h * 0.55;
    var midX = x + w / 2;
    if (side === "right") return { x: x + w, y: midY };
    if (side === "left") return { x: x, y: midY };
    if (side === "top") return { x: midX, y: y + 22 };
    return { x: midX, y: y + h };
  }

  function sideToward(a, b) {
    var dx = b.offsetLeft + b.offsetWidth / 2 - (a.offsetLeft + a.offsetWidth / 2);
    var dy = b.offsetTop + b.offsetHeight / 2 - (a.offsetTop + a.offsetHeight / 2);
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? ["right", "left"] : ["left", "right"];
    return dy > 0 ? ["bottom", "top"] : ["top", "bottom"];
  }

  function curve(p1, p2) {
    var dx = Math.max(40, Math.abs(p2.x - p1.x) * 0.45);
    var dy = Math.max(40, Math.abs(p2.y - p1.y) * 0.45);
    var c1 = { x: p1.x, y: p1.y };
    var c2 = { x: p2.x, y: p2.y };
    if (Math.abs(p2.x - p1.x) >= Math.abs(p2.y - p1.y)) {
      c1.x = p1.x + (p2.x > p1.x ? dx : -dx);
      c2.x = p2.x + (p2.x > p1.x ? -dx : dx);
    } else {
      c1.y = p1.y + (p2.y > p1.y ? dy : -dy);
      c2.y = p2.y + (p2.y > p1.y ? -dy : dy);
    }
    return "M " + p1.x + " " + p1.y + " C " + c1.x + " " + c1.y + ", " + c2.x + " " + c2.y + ", " + p2.x + " " + p2.y;
  }

  function drawEdges(svg, happy, branches) {
    while (svg.lastChild && svg.lastChild.tagName !== "defs") svg.removeChild(svg.lastChild);
    function add(pairs, branch) {
      (pairs || []).forEach(function (pair) {
        var a = document.getElementById(pair[0]);
        var b = document.getElementById(pair[1]);
        if (!a || !b) return;
        var sides = sideToward(a, b);
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", curve(anchor(a, sides[0]), anchor(b, sides[1])));
        path.setAttribute("marker-end", branch ? "url(#arrow-branch)" : "url(#arrow)");
        if (branch) path.setAttribute("class", "branch");
        svg.appendChild(path);
      });
    }
    add(happy, false);
    add(branches, true);
  }

  function watchIframes(root) {
    root.querySelectorAll(".viewport iframe").forEach(function (frame) {
      var vp = frame.parentElement;
      var timer = setTimeout(function () {
        try {
          var doc = frame.contentDocument;
          if (!doc || !doc.body || doc.body.childElementCount === 0) vp.classList.add("wire-only");
        } catch (e) {
          vp.classList.add("wire-only");
        }
      }, 1800);
      frame.addEventListener("load", function () {
        clearTimeout(timer);
      });
      frame.addEventListener("error", function () {
        clearTimeout(timer);
        vp.classList.add("wire-only");
      });
    });
  }

  function mount(cfg) {
    var board = document.getElementById("board");
    if (!board) return;
    var mockBase = cfg.mockBase || "../../mockup/";
    board.style.width = (cfg.width || 1400) + "px";
    board.style.minHeight = (cfg.height || 900) + "px";

    var svg = document.getElementById("wires");
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.id = "wires";
      svg.setAttribute("aria-hidden", "true");
      svg.innerHTML =
        '<defs>' +
        '<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker>' +
        '<marker id="arrow-branch" class="m-branch" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker>' +
        "</defs>";
      board.appendChild(svg);
    }

    (cfg.sections || []).forEach(function (sec) {
      var tag = el("div", { className: "section-tag" });
      tag.style.left = sec.x + "px";
      tag.style.top = sec.y + "px";
      tag.textContent = sec.label;
      board.appendChild(tag);
    });

    (cfg.screens || []).forEach(function (s) {
      board.appendChild(screenCard(s, mockBase));
    });

    function redraw() {
      drawEdges(svg, cfg.happy, cfg.branches);
    }
    redraw();
    window.addEventListener("resize", redraw);
    watchIframes(board);
    ensureModal();

    var hint = document.querySelector(".hint");
    if (hint && hint.dataset.wfHint !== "1") {
      hint.dataset.wfHint = "1";
      hint.textContent =
        (hint.textContent ? hint.textContent.replace(/\s*$/, "") + " · " : "") +
        "Clic en miniatura = modal · Ctrl/Cmd+clic = pestaña nueva.";
    }
  }

  window.TribuvexWireflow = {
    mount: mount,
    bindPreview: bindPreview,
    openPreview: openPreview,
    closePreview: closePreview,
  };
})();

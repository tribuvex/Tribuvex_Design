/**
 * Tribuvex wireflow board renderer.
 * Config: { width, height, mockBase, sections, screens, happy, branches }
 * screen: { id, num, name, href, x, y, pc?, hub? }
 */
(function () {
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

  function screenCard(s, mockBase) {
    var href = s.href.indexOf("http") === 0 ? s.href : mockBase + s.href.replace(/^\.\.\//, "").replace(/^\.\//, "");
    // hrefs in config use paths relative to mockup/ e.g. login.html or pc/pc1.html
    if (s.href.indexOf("../") === -1 && s.href.indexOf("http") !== 0) {
      href = mockBase + s.href;
    } else if (s.href.indexOf("../../mockup/") === 0) {
      href = s.href;
    } else if (s.href.indexOf("../mockup/") === 0) {
      href = s.href;
    }

    var article = el("article", {
      className: "screen" + (s.pc ? " is-pc" : "") + (s.hub ? " is-hub" : ""),
      id: s.id,
    });
    article.style.left = s.x + "px";
    article.style.top = s.y + "px";
    article.innerHTML =
      '<div class="screen-label"><span class="name"></span><span class="id"></span></div>' +
      '<a class="device" target="_blank" rel="noopener">' +
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
    var iframe = article.querySelector("iframe");
    iframe.title = s.name;
    iframe.src = href;
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
  }

  window.TribuvexWireflow = { mount: mount };
})();

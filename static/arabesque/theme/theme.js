// The Zola theme's script: wires the system's helpers (../js/) to the page,
// and gives Markdown's code blocks and tables the system's components. All
// of it is an enhancement: without it, every page still reads and works.

import { initSiteHeaders } from "../js/site-header.js";
import { initToc } from "../js/toc.js";
import { initCopy } from "../js/copy.js";
import { highlightCode } from "../js/highlight.js";
import { drawHero, drawPattern } from "../js/pattern.js";

/** The theme's words in the page's language (theme.toml's [extra.i18n]). */
export const strings = (() => {
  try { return JSON.parse(document.getElementById("zt-strings")?.textContent || "{}"); } catch { return {}; }
})();
const say = (key, fallback) => strings[key] || fallback;

const SPRITE = new URL("../icons.svg", import.meta.url).pathname;

/** An icon from the system's sprite, hidden from screen readers. */
export function icon(name, className = "") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", `al-icon${className ? ` ${className}` : ""}`);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `${SPRITE}#al-icon-${name}`);
  svg.append(use);
  return svg;
}

const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (value === true) node.setAttribute(key, "");
    else if (value !== false && value != null) node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
};

// The theme: as the system (the default), light or dark. The choice is kept
// in localStorage ("al-theme", as the system's helper and the script in the
// head read it) and on <html data-theme>; "system" is no key and no
// attribute. Unlike the system's helper (js/theme.js), a choice stays when
// the system's setting comes to match it, so all three modes hold.
const THEME_KEY = "al-theme";
const MODES = ["system", "light", "dark"];
const systemDark = matchMedia("(prefers-color-scheme: dark)");

export function themeMode() {
  try { const t = localStorage.getItem(THEME_KEY); return t === "light" || t === "dark" ? t : "system"; } catch { return "system"; }
}

/** The theme in use now: light or dark. */
export const currentTheme = () => {
  const mode = document.documentElement.dataset.theme || themeMode();
  return mode === "light" || mode === "dark" ? mode : systemDark.matches ? "dark" : "light";
};

function setThemeMode(mode) {
  try {
    if (mode === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, mode);
  } catch { /* storage may be off: the theme still changes for this page */ }
  if (mode === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = mode;
  document.dispatchEvent(new CustomEvent("al-theme", { detail: currentTheme() }));
}

// The theme button shows the mode in use (in CSS) and is named for the next.
function initThemeToggle() {
  for (const button of document.querySelectorAll("[data-theme-toggle]")) {
    const next = () => MODES[(MODES.indexOf(themeMode()) + 1) % MODES.length];
    const label = () => {
      const words = button.dataset[`label${next()[0].toUpperCase()}${next().slice(1)}`];
      button.setAttribute("aria-label", words);
      button.title = words;
    };
    button.addEventListener("click", () => setThemeMode(next()));
    document.addEventListener("al-theme", label);
    label();
  }
}

// The pattern: the hero, once, and texture wherever it's asked for.
function initPatterns() {
  for (const art of document.querySelectorAll("[data-pattern-hero]")) {
    drawHero(art, { animate: art.hasAttribute("data-pattern-animate"), focal: art.dataset.patternFocal !== "false" });
  }
  for (const art of document.querySelectorAll("[data-pattern]")) drawPattern(art);
}

// Code blocks: Markdown's <pre> becomes the system's code block (components/code),
// with a bar naming it (a caption from the code shortcode, or its language)
// and a copy button. Always left to right, focusable so it can be scrolled.
function enhanceCode(root = document) {
  for (const pre of root.querySelectorAll(".zt-prose pre")) {
    if (pre.closest(".al-code, .zt-mermaid")) continue;
    const code = pre.querySelector("code");
    const caption = pre.closest("[data-caption]")?.dataset.caption
      || pre.dataset.lang || code?.dataset.lang || "";
    pre.classList.add("al-code__pre");
    pre.setAttribute("dir", "ltr");
    pre.tabIndex = 0;
    if (!pre.hasAttribute("aria-label")) pre.setAttribute("aria-label", caption || say("code", "Code"));

    const label = el("span", { "data-copy-label": true }, say("copy", "Copy"));
    const copy = el("button", {
      type: "button",
      class: "al-button al-button--quiet al-button--sm al-code__copy",
      "data-copy": true,
      "data-label-copy": say("copy", "Copy"),
      "data-label-copied": say("copied", "Copied"),
      "data-label-failed": say("copy_failed", "Couldn't copy. The text is selected, so you can copy it yourself."),
    }, icon("copy", "al-code__copy-idle"), icon("check", "al-code__copy-done"), label);
    const bar = el("div", { class: "al-code__bar" });
    if (caption) bar.append(el("span", { class: "al-code__caption", dir: "ltr" }, caption));
    // With line numbers (linenos), the text would copy them too.
    if (!pre.querySelector("table")) bar.append(copy);

    const block = el("div", { class: "al-code" });
    pre.replaceWith(block);
    block.append(bar, pre, el("span", { class: "al-visually-hidden", role: "status", "data-copy-status": true }));
  }
}

// Tables: Markdown's <table> becomes the system's (components/table), in a
// region that scrolls on its own when it's wider than the page, named by
// the heading before it. Columns of figures are aligned as figures.
const FIGURE = /^[\s+\-−–(]*[£$€¥%#]?[\s\d٠-٩.,٫٬]+[%kKmMbB]?[\s)]*$/;

function enhanceTables(root = document) {
  for (const table of root.querySelectorAll(".zt-prose table")) {
    if (table.closest("pre, .al-table-wrap, .zt-embed")) continue;
    table.classList.add("al-table");
    const rows = [...table.rows];
    const body = rows.filter((row) => row.parentElement.tagName !== "THEAD");
    const columns = Math.max(0, ...rows.map((row) => row.cells.length));
    for (let i = 0; i < columns; i++) {
      const cells = body.map((row) => row.cells[i]).filter((cell) => cell && cell.textContent.trim());
      if (cells.length && cells.every((cell) => FIGURE.test(cell.textContent))) {
        for (const row of rows) row.cells[i]?.classList.add("al-table__num");
      }
    }
    for (const th of table.querySelectorAll("thead th")) th.setAttribute("scope", "col");

    let heading = table.previousElementSibling;
    while (heading && !/^H[2-6]$/.test(heading.tagName)) heading = heading.previousElementSibling;
    const name = table.caption?.textContent.trim() || heading?.textContent.trim() || say("table", "Table");
    const wrap = el("div", { class: "al-table-wrap", role: "region", tabindex: "0", "aria-label": name });
    table.replaceWith(wrap);
    wrap.append(table);
  }
}

// Back to top (components/back-to-top), as the system's helper, but shown
// once the page has scrolled the link's data-after screens (half by default,
// so shorter pages have it too), and hidden again near the top.
function initBackToTop() {
  const link = document.querySelector(".al-back-to-top");
  if (!link) return;
  const after = Number(link.dataset.after) || 1;
  let frame = 0;
  const update = () => {
    frame = 0;
    link.toggleAttribute("data-al-hidden", scrollY < innerHeight * after);
  };
  update();
  link.dataset.alWired = "";
  addEventListener("scroll", () => { frame ||= requestAnimationFrame(update); }, { passive: true });
  addEventListener("resize", () => { frame ||= requestAnimationFrame(update); });
  // Up, and focus the top too, so the next Tab is the skip link.
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    const body = document.body;
    body.tabIndex = -1;
    body.focus({ preventScroll: true });
    body.addEventListener("blur", () => body.removeAttribute("tabindex"), { once: true });
  });
}

// Mermaid diagrams (the mermaid shortcode): Mermaid's script loads only on
// a page that has one, and draws each in the system's colours, read from
// its tokens; again when the theme changes. If it can't load, the
// diagram's source stays, as text.
const MERMAID = "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs";

async function initMermaid() {
  const figures = [...document.querySelectorAll(".zt-mermaid")];
  if (!figures.length) return;
  for (const figure of figures) figure.dataset.source = figure.querySelector("pre")?.textContent ?? "";
  let mermaid;
  try { ({ default: mermaid } = await import(MERMAID)); } catch { return; }

  // Mermaid works out shades from hex colours; the tokens may be oklch, and
  // some (the washes) are see-through, so each is laid over the surface.
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  let ground = "#fff";
  const hex = (color) => {
    context.fillStyle = ground;
    context.fillRect(0, 0, 1, 1);
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
  };

  let run = 0;
  const draw = async () => {
    const mine = ++run;
    const css = getComputedStyle(document.documentElement);
    ground = "#fff";
    ground = hex(css.getPropertyValue("--al-color-surface").trim());
    const token = (name) => hex(css.getPropertyValue(name).trim());
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      fontFamily: css.getPropertyValue("--al-font-sans"),
      themeVariables: {
        darkMode: currentTheme() === "dark",
        background: token("--al-color-surface"),
        primaryColor: token("--al-color-accent-wash"),
        primaryTextColor: token("--al-color-text"),
        primaryBorderColor: token("--al-color-accent"),
        secondaryColor: token("--al-color-surface-sunk"),
        tertiaryColor: token("--al-color-surface"),
        lineColor: token("--al-color-text-muted"),
        textColor: token("--al-color-text"),
        nodeTextColor: token("--al-color-text"),
        clusterBkg: token("--al-color-surface-sunk"),
        clusterBorder: token("--al-color-line-strong"),
        edgeLabelBackground: token("--al-color-surface"),
        fontSize: "15px",
      },
    });
    for (const [i, figure] of figures.entries()) {
      try {
        const { svg } = await mermaid.render(`zt-mermaid-${mine}-${i}`, figure.dataset.source);
        if (mine !== run) return;
        figure.innerHTML = svg;
        figure.dataset.drawn = "";
      } catch { /* a diagram Mermaid can't read keeps its source */ }
    }
  };
  await draw();
  document.addEventListener("al-theme", draw);
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", draw);
}

// Instagram's script swaps its embed for an iframe with no title; give it
// one, so a screen reader can say what the frame is.
function nameEmbeds() {
  for (const box of document.querySelectorAll(".zt-embed--instagram")) {
    const name = () => {
      for (const frame of box.querySelectorAll("iframe:not([title])")) frame.title = say("instagram", "Instagram post");
    };
    new MutationObserver(name).observe(box, { childList: true, subtree: true });
    name();
  }
}

// Markdown's task lists: each checkbox is named by its item's words.
function labelTasks(root = document) {
  for (const box of root.querySelectorAll(".zt-prose li > input[type=checkbox]")) {
    if (!box.hasAttribute("aria-label")) box.setAttribute("aria-label", box.parentElement.textContent.trim());
  }
}

initSiteHeaders();
initThemeToggle();
labelTasks();
initMermaid();
nameEmbeds();
initPatterns();
enhanceCode();
enhanceTables();
highlightCode();
initCopy();
initToc();
initBackToTop();

const search = document.querySelector("form[data-search-index]");
if (search) import("./search.js").then(({ initSiteSearch }) => initSiteSearch(search, strings));

// Tabs (ARIA APG, automatic activation): role="tablist" with role="tab"
// buttons (aria-controls) and role="tabpanel"s. Arrow keys move along the
// reading direction (reversed in right-to-left), or up and down in a
// vertical list (aria-orientation="vertical"); Home and End jump.
export function initTabs(root = document) {
  for (const list of root.querySelectorAll('[role="tablist"]')) {
    if (list.dataset.alTabs) continue;
    list.dataset.alTabs = "on";
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const select = (tab) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      }
    };
    list.addEventListener("click", (e) => { const t = e.target.closest('[role="tab"]'); if (t) select(t); });
    list.addEventListener("keydown", (e) => {
      const rtl = getComputedStyle(list).direction === "rtl";
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const vertical = list.getAttribute("aria-orientation") === "vertical";
      const step = vertical ? { ArrowDown: 1, ArrowUp: -1 }[e.key] : { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
      let next = null;
      if (step) next = tabs[(i + step + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); next.focus(); select(next); }
    });
    select(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0]);
  }
}

// Menu button (ARIA APG): a button that opens a list of actions in a popover.
// Arrow keys move, Home/End jump, Escape closes, and focus goes back to the
// button. Markup:
//   <button class="al-button" popovertarget="m1" aria-haspopup="menu" aria-expanded="false">Move to…</button>
//   <div class="al-menu" id="m1" popover role="menu">
//     <button class="al-menu__item" role="menuitem">Interviewing</button> …
//   </div>
import { place } from "./position.js";

export function initMenus(root = document) {
  for (const button of root.querySelectorAll('[aria-haspopup="menu"][popovertarget]')) {
    const menu = document.getElementById(button.getAttribute("popovertarget"));
    if (!menu || menu.dataset.alMenu) continue;
    menu.dataset.alMenu = "on";
    const items = () => [...menu.querySelectorAll('[role^="menuitem"]:not([aria-disabled="true"])')];
    menu.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      button.setAttribute("aria-expanded", String(open));
      // While open, it follows its button through scrolling and resizing.
      // Once a frame at most, however fast the scroll events come.
      let frame = 0;
      const follow = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; place(menu, button); }); };
      if (open) {
        place(menu, button);
        addEventListener("scroll", follow, { capture: true, passive: true });
        addEventListener("resize", follow);
        menu.alFollow = follow;
        items()[0]?.focus();
      } else {
        removeEventListener("scroll", menu.alFollow, { capture: true });
        removeEventListener("resize", menu.alFollow);
        if (menu.contains(document.activeElement)) button.focus();
      }
    });
    menu.addEventListener("keydown", (e) => {
      const list = items();
      const i = list.indexOf(document.activeElement);
      const go = (n) => { e.preventDefault(); list[(n + list.length) % list.length]?.focus(); };
      if (e.key === "ArrowDown") go(i + 1);
      else if (e.key === "ArrowUp") go(i - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(list.length - 1);
      else if (e.key === "Tab") menu.hidePopover();
      else if (e.key === "Escape") { e.preventDefault(); menu.hidePopover(); button.focus(); }
    });
    // Choosing an item closes the menu, and focus goes back to its button.
    menu.addEventListener("click", (e) => {
      if (!e.target.closest('[role^="menuitem"]')) return;
      menu.hidePopover();
      button.focus();
    });
  }
}

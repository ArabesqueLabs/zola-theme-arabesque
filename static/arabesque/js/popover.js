// Popover: more about something, opened by a button, in a native popover
// beside it. The browser does the rest: Escape, a click outside, or the
// button again closes it, and focus goes back to the button if it was
// inside. This places it, keeps it with its button while the page scrolls,
// and keeps the button's aria-expanded true to it. Markup:
//   <button class="al-button" popovertarget="p1" aria-expanded="false">What's this?</button>
//   <div class="al-popover" id="p1" popover role="dialog" aria-labelledby="p1-title">
//     <p class="al-popover__title" id="p1-title">Tax code</p> <p>…</p>
//   </div>
import { place } from "./position.js";

export function initPopovers(root = document) {
  for (const button of root.querySelectorAll("[popovertarget]")) {
    const pop = document.getElementById(button.getAttribute("popovertarget"));
    if (!pop?.classList.contains("al-popover") || pop.dataset.alPopover) continue;
    pop.dataset.alPopover = "on";
    let frame = 0;
    const follow = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; place(pop, button); }); };
    pop.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      button.setAttribute("aria-expanded", String(open));
      if (open) {
        place(pop, button);
        addEventListener("scroll", follow, { capture: true, passive: true });
        addEventListener("resize", follow);
      } else {
        removeEventListener("scroll", follow, { capture: true });
        removeEventListener("resize", follow);
      }
    });
  }
}

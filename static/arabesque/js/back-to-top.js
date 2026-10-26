// Back to top: hidden until the page has scrolled two screens, then shown.
// Followed, it goes to the top and moves focus there too, so the next Tab
// is the page's first link (its skip link), not the one after this.

/** Wire every .al-back-to-top inside root. */
export function initBackToTop(root = document) {
  for (const link of root.querySelectorAll(".al-back-to-top")) {
    if (link.dataset.alWired !== undefined) continue;
    let frame = 0;
    const update = () => {
      frame = 0;
      link.toggleAttribute("data-al-hidden", scrollY < innerHeight * 2);
    };
    // Hidden or not before it's marked wired: reading scrollY works out the
    // styles, and wired but not yet hidden would show it for a frame.
    update();
    link.dataset.alWired = "";
    addEventListener("scroll", () => { frame ||= requestAnimationFrame(update); }, { passive: true });
    addEventListener("resize", () => { frame ||= requestAnimationFrame(update); });
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") !== "#top" || document.getElementById("top")) return;
      event.preventDefault();
      const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollTo({ top: 0, behavior: still ? "instant" : "smooth" });
      const body = document.body;
      body.tabIndex = -1;
      body.dataset.alTop = "";
      body.focus({ preventScroll: true });
      body.addEventListener("blur", () => { body.removeAttribute("tabindex"); delete body.dataset.alTop; }, { once: true });
    });
  }
}

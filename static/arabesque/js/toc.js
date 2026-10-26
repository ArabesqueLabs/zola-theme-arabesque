// On this page: marks the link to the section being read (aria-current),
// as the page scrolls: the last whose heading has passed the top quarter
// of the window, the first before any has, and the last at the very end.

/** Wire every .al-toc inside root to the headings its links point to. */
export function initToc(root = document) {
  for (const nav of root.querySelectorAll(".al-toc")) {
    if (nav.dataset.alWired !== undefined) continue;
    nav.dataset.alWired = "";
    const links = [...nav.querySelectorAll('a[href^="#"]')]
      .map((a) => [a, document.getElementById(decodeURIComponent(a.hash.slice(1)))])
      .filter(([, target]) => target);
    if (!links.length) continue;
    let frame = 0;
    const mark = () => {
      frame = 0;
      const line = innerHeight / 4;
      const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      let current = links[0][0];
      for (const [a, target] of links) if (target.getBoundingClientRect().top <= line) current = a;
      if (atEnd) current = links[links.length - 1][0];
      for (const [a] of links) {
        if (a === current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
    };
    addEventListener("scroll", () => { frame ||= requestAnimationFrame(mark); }, { passive: true });
    addEventListener("resize", () => { frame ||= requestAnimationFrame(mark); });
    mark();
  }
}

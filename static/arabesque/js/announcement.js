// Announcements: a [data-dismiss] button hides its .al-announcement and
// remembers it (localStorage, by data-announcement), so it stays gone on
// every page; focus moves on to what came after it. Where storage isn't
// allowed, it's gone for this page only.

const key = (id) => `al-announcement:${id}`;
const read = (id) => { try { return localStorage.getItem(key(id)) === "dismissed"; } catch { return false; } };
const write = (id) => { try { localStorage.setItem(key(id), "dismissed"); } catch { /* this page only */ } };

const FOCUSABLE = "a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])";

/** Hide the announcements already dismissed, and wire each dismiss button. */
export function initAnnouncements(root = document) {
  for (const bar of root.querySelectorAll(".al-announcement[data-announcement]")) {
    const id = bar.dataset.announcement;
    if (read(id)) { bar.hidden = true; continue; }
    const button = bar.querySelector("[data-dismiss]");
    if (!button || button.dataset.alWired !== undefined) continue;
    button.dataset.alWired = "";
    button.addEventListener("click", () => {
      const after = [...document.querySelectorAll(FOCUSABLE)].find((el) => bar.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING && !bar.contains(el));
      bar.hidden = true;
      write(id);
      after?.focus();
    });
  }
}

/** Show an announcement again on the next load (for a "show it again" setting, or a new message under the same id). */
export function forgetDismissal(id) {
  try { localStorage.removeItem(key(id)); } catch { /* nothing kept */ }
}

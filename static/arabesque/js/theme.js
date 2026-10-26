// Theme: follow the system's light or dark, unless the person chose one;
// the choice is remembered, and kept only while it differs from the system
// (when they agree again, the override goes).
//
// So there's no flash, apply the stored choice with a classic inline
// script in the <head> (a module is deferred, so it runs after first paint):
//   <script>try { const t = localStorage.getItem("al-theme"); if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; } catch {}</script>
// then import this module for the toggle. It's safe to import where there's
// no window (server rendering): nothing runs until a function is called.

const KEY = "al-theme";
const media = typeof matchMedia === "function" ? matchMedia("(prefers-color-scheme: dark)") : null;
const systemTheme = () => (media?.matches ? "dark" : "light");

/** The stored choice, or null when following the system. */
export function chosenTheme() {
  try { const t = localStorage.getItem(KEY); return t === "light" || t === "dark" ? t : null; } catch { return null; }
}

/** The theme in use now. */
export const currentTheme = () => chosenTheme() || systemTheme();

/** Put the stored choice on <html data-theme>, or none to follow the system. */
export function applyTheme() {
  const t = chosenTheme();
  if (t) document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
}

/** Switch to a theme; the same as the system's clears the override. */
export function setTheme(theme) {
  try {
    if (theme === systemTheme()) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch { /* storage may be off: the theme still changes for this page */ }
  if (theme === systemTheme()) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  document.dispatchEvent(new CustomEvent("al-theme", { detail: theme }));
}

export const toggleTheme = () => setTheme(currentTheme() === "dark" ? "light" : "dark");

// The system changing back to the chosen theme ends the override.
media?.addEventListener("change", () => { if (chosenTheme() === systemTheme()) setTheme(systemTheme()); });

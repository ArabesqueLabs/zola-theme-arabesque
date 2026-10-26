// Keyboard shortcuts that follow the platform (from Apple's HIG): ⌘ on
// Apple devices, Ctrl elsewhere, and the standard meanings kept (⌘Z
// undo, ⌘S save, ⌘K or / search, Escape to dismiss). Single-key
// shortcuts never fire while typing in a field, and can be turned off
// (WCAG 2.1.4): offer setShortcutsEnabled() as a setting.
//
//   <kbd class="al-kbd" data-al-mod></kbd> <kbd class="al-kbd">K</kbd>
//   renderModifierKeys();                      // fills [data-al-mod] with ⌘ or Ctrl
//   onShortcut("mod+k", () => search.focus());
//   onShortcut("mod+shift+z", redo);           // Shift is matched exactly…
//   onShortcut("?", () => shortcuts.showModal()); // …except for symbols typed with it
//
// On a non-Latin layout (Arabic, say) the key is matched by its position,
// so ⌘K and / still work.

export const isApple = () => /Mac|iPhone|iPad|iPod/.test(globalThis.navigator?.userAgentData?.platform || globalThis.navigator?.platform || "");
export const modifierLabel = () => (isApple() ? "⌘" : "Ctrl");

/** Fill [data-al-mod] with ⌘ or Ctrl; its title names the key (pass titles in the page's language). */
export function renderModifierKeys(root = document, { titles = { apple: "Command", other: "Control" } } = {}) {
  for (const k of root.querySelectorAll("[data-al-mod]")) {
    k.textContent = modifierLabel();
    k.setAttribute("title", isApple() ? titles.apple : titles.other);
  }
}

const KEY = "al-shortcuts";
let enabled = true;
try { enabled = localStorage.getItem(KEY) !== "off"; } catch { /* storage may be off */ }
/** Whether single-key shortcuts are on (those with ⌘ or Ctrl always are). */
export const shortcutsEnabled = () => enabled;
/** Turn single-key shortcuts on or off; remembered. */
export function setShortcutsEnabled(on) {
  enabled = !!on;
  try { if (enabled) localStorage.removeItem(KEY); else localStorage.setItem(KEY, "off"); } catch { /* this page only */ }
}

const typing = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
// The physical key for a Latin letter, digit or common symbol, for layouts that type something else there.
const CODES = { "/": "Slash", ".": "Period", ",": "Comma", ";": "Semicolon", "'": "Quote", "[": "BracketLeft", "]": "BracketRight", "-": "Minus", "=": "Equal", "`": "Backquote", "\\": "Backslash" };
const codeFor = (key) => (/^[a-z]$/.test(key) ? `Key${key.toUpperCase()}` : /^\d$/.test(key) ? `Digit${key}` : CODES[key]);
const symbol = (key) => key.length === 1 && !/[a-z0-9]/.test(key);

/** combo: "mod+k", "mod+shift+z", "?", "/", "escape". Returns a function that removes it. */
export function onShortcut(combo, handler, { target = document } = {}) {
  const parts = combo.toLowerCase().split("+");
  const key = parts.pop() || "+";
  const wantMod = parts.includes("mod");
  const wantShift = parts.includes("shift");
  const listener = (e) => {
    if (e.isComposing || e.keyCode === 229 || e.repeat) return;
    const mod = isApple() ? e.metaKey : e.ctrlKey;
    if (mod !== wantMod || e.altKey || (isApple() ? e.ctrlKey : e.metaKey)) return;
    if (!symbol(key) && e.shiftKey !== wantShift) return;
    const pressed = e.key.toLowerCase();
    const latin = /^[\x20-\x7e]$/.test(e.key);
    if (pressed !== key && !(!latin && e.code && e.code === codeFor(key))) return;
    if (!wantMod && key.length === 1 && (!enabled || typing(e.target))) return;
    e.preventDefault();
    handler(e);
  };
  target.addEventListener("keydown", listener);
  return () => target.removeEventListener("keydown", listener);
}

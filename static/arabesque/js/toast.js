// Toast: say what just happened, briefly, in one polite live region; offer
// an action (Undo) when there's one. A plain toast stays 4s, and waits
// while it's hovered or focused. A toast with an action has no time limit
// (WCAG 2.2.1): it stays until it's used, dismissed, or replaced by the
// next toast with an action; F6 moves focus to it. Errors that need fixing
// belong in the page (a notice by the field), not only here.
//   import { toast } from "./js/toast.js";
//   toast("Process archived", { action: "Undo", onAction: () => restore(), dismissLabel: "Dismiss" });

let region;
let current = null; // the toast with an action that's showing, if any
function toaster() {
  if (region?.isConnected) return region;
  region = document.createElement("div");
  region.className = "al-toaster";
  region.setAttribute("role", "status");
  region.setAttribute("aria-live", "polite");
  document.body.append(region);
  return region;
}
// The region exists before the first message: content added to a live
// region in the same moment it's created often isn't announced.
if (typeof document !== "undefined") {
  if (document.body) toaster(); else addEventListener("DOMContentLoaded", toaster, { once: true });
  addEventListener("keydown", (e) => {
    if (e.key !== "F6" || !current?.isConnected) return;
    e.preventDefault();
    current.querySelector(".al-toast__action")?.focus();
  });
}

/** Show a toast; returns a function that dismisses it. */
export function toast(message, { action, onAction, timeout, dismissLabel = "Dismiss" } = {}) {
  const opener = document.activeElement;
  const el = document.createElement("div");
  el.className = "al-toast";
  const text = document.createElement("span");
  text.textContent = message;
  el.append(text);
  let timer;
  const stop = () => clearTimeout(timer);
  // Focus goes back where it was, if it was in the toast when it went.
  const dismiss = () => {
    stop();
    if (el.dataset.leaving !== undefined) return;
    const hadFocus = el.contains(document.activeElement);
    el.dataset.leaving = "";
    if (current === el) current = null;
    setTimeout(() => el.remove(), 250);
    if (hadFocus && opener?.isConnected) opener.focus();
  };
  if (action) {
    current?.alDismiss?.();
    const button = document.createElement("button");
    button.type = "button";
    button.className = "al-toast__action";
    button.textContent = action;
    button.addEventListener("click", () => { dismiss(); onAction?.(); });
    const close = document.createElement("button");
    close.type = "button";
    close.className = "al-toast__dismiss";
    close.setAttribute("aria-label", dismissLabel);
    close.append(Object.assign(document.createElement("span"), { textContent: "×", ariaHidden: "true" }));
    close.addEventListener("click", dismiss);
    el.append(button, close);
    el.alDismiss = dismiss;
    current = el;
  }
  const start = () => { stop(); if (!action || timeout) timer = setTimeout(dismiss, timeout ?? 4000); };
  el.addEventListener("pointerenter", stop);
  el.addEventListener("pointerleave", start);
  el.addEventListener("focusin", stop);
  el.addEventListener("focusout", (e) => { if (!el.contains(e.relatedTarget)) start(); });
  const box = toaster();
  requestAnimationFrame(() => { box.append(el); start(); });
  return dismiss;
}

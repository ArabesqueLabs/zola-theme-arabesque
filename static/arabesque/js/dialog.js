// Dialogs that don't lose work (from Apple's HIG): if closing would throw
// away what someone typed, the dialog doesn't close; a bar inside it asks
// to keep editing or discard. Never a second dialog on top.
//
//   <dialog class="al-dialog" id="edit">
//     <form method="dialog"> …fields…
//       <div class="al-dialog__discard" hidden role="alert">
//         <p>Discard your changes?</p>
//         <button type="button" class="al-button al-button--sm" data-al-keep>Keep editing</button>
//         <button type="button" class="al-button al-button--sm al-button--danger" data-al-discard>Discard changes</button>
//       </div>
//       <div class="al-dialog__actions"><button class="al-button" value="cancel">Cancel</button> …
//
//   import { openDialog } from "./js/dialog.js";
//   openDialog(document.getElementById("edit"));
//
// Escape is caught on keydown, before the browser's own close: browsers
// let a page refuse only the first close request, so a second Escape would
// otherwise close a dialog with unsaved work. If a close gets past anyway,
// the dialog reopens with what was typed, and asks.

const snapshot = (form) => JSON.stringify([...new FormData(form)].map(([k, v]) => [k, String(v)]));

export function openDialog(dialog, { opener = document.activeElement } = {}) {
  const form = dialog.querySelector("form");
  const bar = dialog.querySelector(".al-dialog__discard");
  const start = form ? snapshot(form) : "";
  if (bar) bar.hidden = true;

  if (!dialog.dataset.alGuard) {
    dialog.dataset.alGuard = "on";
    const guarded = () => !!bar && !dialog.alDiscarding && !!dialog.alDirty?.();
    const ask = () => {
      bar.hidden = false;
      bar.querySelector("[data-al-keep]")?.focus();
    };
    dialog.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || e.isComposing || !guarded()) return;
      e.preventDefault();
      e.stopPropagation();
      ask();
    });
    dialog.addEventListener("cancel", (e) => {
      if (!guarded()) return;
      e.preventDefault();
      ask();
    });
    dialog.addEventListener("click", (e) => {
      if (!e.target.closest("button[value='cancel']") || !guarded()) return;
      e.preventDefault();
      ask();
    });
    bar?.querySelector("[data-al-keep]")?.addEventListener("click", () => {
      bar.hidden = true;
      dialog.querySelector("input, select, textarea")?.focus();
    });
    bar?.querySelector("[data-al-discard]")?.addEventListener("click", () => {
      dialog.alDiscarding = true;
      form?.reset();
      dialog.close("cancel");
    });
    dialog.addEventListener("close", () => {
      // Closed without a choice (no submit, no discard) while dirty: put it back.
      if (dialog.returnValue === "" && guarded()) {
        dialog.showModal();
        ask();
        return;
      }
      dialog.alDiscarding = false;
      dialog.alOpener?.focus?.();
    });
  }
  dialog.alDirty = () => !!form && snapshot(form) !== start;
  dialog.alOpener = opener;
  dialog.alDiscarding = false;
  dialog.returnValue = "";
  dialog.showModal();
}

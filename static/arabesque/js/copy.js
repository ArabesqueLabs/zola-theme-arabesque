// Copy buttons: a [data-copy] button copies the text of the element it
// names (aria-controls), or else of its code block or command (the panel
// that's showing, when there are tabs). Then it says so: its label reads
// "Copied" for a moment, and the block's status region tells screen
// readers. If the clipboard is refused, the text is selected instead, for
// the person to copy themselves.

const SHOWN_MS = 2000;

function source(button) {
  const id = button.getAttribute("aria-controls");
  if (id) return document.getElementById(id);
  const block = button.closest(".al-code, .al-command");
  if (!block) return null;
  if (block.classList.contains("al-command")) return block.querySelector("code");
  return [...block.querySelectorAll("pre")].find((pre) => !pre.closest("[hidden]")) ?? null;
}

function select(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const selection = getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

/** Wire every [data-copy] button inside root. */
export function initCopy(root = document) {
  for (const button of root.querySelectorAll("[data-copy]")) {
    if (button.dataset.alWired !== undefined) continue;
    button.dataset.alWired = "";
    const label = button.querySelector("[data-copy-label]");
    const status = button.closest(".al-code, .al-command")?.querySelector("[data-copy-status]");
    let timer;
    const say = (words, copied) => {
      clearTimeout(timer);
      if (label) label.textContent = words;
      if (status) status.textContent = words;
      button.toggleAttribute("data-copied", copied);
      timer = setTimeout(() => {
        if (label) label.textContent = button.dataset.labelCopy || "Copy";
        if (status) status.textContent = "";
        button.removeAttribute("data-copied");
      }, SHOWN_MS);
    };
    button.addEventListener("click", async () => {
      const el = source(button);
      if (!el) return;
      try {
        await navigator.clipboard.writeText(el.textContent.replace(/\n$/, ""));
        say(button.dataset.labelCopied || "Copied", true);
      } catch {
        select(el);
        say(button.dataset.labelFailed || "Couldn't copy. The text is selected, so you can copy it yourself.", false);
      }
    });
  }
}

// Character count, the GOV.UK way: what's left, said in words, and how far
// over once it's over; typing past the limit is allowed (a paste isn't
// cut), and the message turns into an error. The visible message updates
// at once; screen readers hear it after a pause, through a polite region.
//
//   <div class="al-field">
//     <label class="al-label" for="desc">Description</label>
//     <textarea class="al-textarea" id="desc" data-al-maxlength="200"></textarea>
//   </div>
//   initCharacterCounts(document, {
//     words: (left) => left >= 0 ? `You have ${left} characters remaining` : `You have ${-left} characters too many`,
//     limit: (max) => `You can enter up to ${max} characters`,
//   });
//
// Over the limit, the field is marked aria-invalid="true"; the mark is
// removed again only if this helper set it, so validate.js's stays.

const defaults = (left) => {
  const n = Math.abs(left);
  const unit = n === 1 ? "character" : "characters";
  return left >= 0 ? `You have ${n} ${unit} remaining` : `You have ${n} ${unit} too many`;
};
const limits = (max) => `You can enter up to ${max} ${max === 1 ? "character" : "characters"}`;
let uid = 0;

export function initCharacterCounts(root = document, { words = defaults, limit = limits } = {}) {
  const updates = [];
  for (const input of root.querySelectorAll("[data-al-maxlength]")) {
    if (input.dataset.alCount) continue;
    input.dataset.alCount = "on";
    const max = Number(input.dataset.alMaxlength);
    if (!input.id) input.id = `al-count-${++uid}`;
    const message = document.createElement("p");
    message.className = "al-hint al-character-count__message";
    message.id = `${input.id}-count`;
    message.setAttribute("aria-hidden", "true");
    const live = document.createElement("p");
    live.className = "al-visually-hidden";
    live.setAttribute("aria-live", "polite");
    input.after(message, live);
    input.setAttribute("aria-describedby", [input.getAttribute("aria-describedby"), `${input.id}-count-static`].filter(Boolean).join(" "));
    // A static description of the limit, for when the field is reached.
    const staticText = document.createElement("span");
    staticText.id = `${input.id}-count-static`;
    staticText.className = "al-visually-hidden";
    live.after(staticText);
    let timer;
    const update = (announce) => {
      const left = max - [...input.value].length;
      message.textContent = words(left);
      staticText.textContent = limit(max);
      if (left < 0) message.dataset.over = ""; else delete message.dataset.over;
      if (left < 0 && input.getAttribute("aria-invalid") !== "true") {
        input.setAttribute("aria-invalid", "true");
        input.dataset.alCountInvalid = "";
      } else if (left >= 0 && "alCountInvalid" in input.dataset) {
        input.removeAttribute("aria-invalid");
        delete input.dataset.alCountInvalid;
      }
      clearTimeout(timer);
      if (announce) timer = setTimeout(() => { live.textContent = words(left); }, 1000);
    };
    input.addEventListener("input", () => update(true));
    update(false);
    updates.push(() => update(false));
  }
  // Call to redraw the messages (after a language change).
  return () => updates.forEach((u) => u());
}

// Search field: Clear empties it and keeps focus in it; Escape in the
// field clears it too. Results are the app's job; announce their count
// in a polite live region ("12 results").
export function initSearch(root = document) {
  for (const box of root.querySelectorAll(".al-search")) {
    const input = box.querySelector("input");
    const clear = box.querySelector(".al-search__clear");
    if (!input || box.dataset.alSearch) continue;
    box.dataset.alSearch = "on";
    const empty = () => { input.value = ""; input.dispatchEvent(new Event("input", { bubbles: true })); input.focus(); };
    clear?.addEventListener("click", empty);
    input.addEventListener("keydown", (e) => { if (e.key === "Escape" && input.value) { e.preventDefault(); empty(); } });
  }
}

// Search, in the browser, over Zola's index for the page's language
// (search_index.<lang>.json, index_format = "fuse_json"): the results update
// as people type, the address keeps the query (?q=), and the count is
// announced in words. Arabic is matched without its vowel marks and with
// its letter variants folded, so "اسلام" finds "إسلام".

import { initSearch } from "../js/search.js";

const MAX_RESULTS = 50;
const EXCERPT = 160;

// Fold text for matching, keeping a map from each folded character back to
// its place in the original, so a match can be marked in the original.
function fold(text) {
  let out = "";
  const map = [];
  for (let i = 0; i < text.length; i++) {
    let ch = text[i].toLowerCase();
    // Latin accents and Arabic vowel marks, the dagger alif and the tatweel go.
    ch = ch.normalize("NFD").replace(/[̀-ًͯ-ٰٟـ]/g, "");
    ch = ch.replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/[ؤ]/g, "و").replace(/[ئ]/g, "ي");
    for (const c of ch) { out += c; map.push(i); }
  }
  return { text: out, map };
}

const words = (query) => fold(query).text.split(/[\s،,.;:!?؟]+/u).filter(Boolean);

const count = (haystack, needle) => {
  let n = 0;
  for (let at = haystack.indexOf(needle); at !== -1 && n < 20; at = haystack.indexOf(needle, at + needle.length)) n++;
  return n;
};

function score(doc, terms) {
  let total = 0;
  for (const term of terms) {
    const inTitle = count(doc.title.text, term);
    const inDescription = count(doc.description.text, term);
    const inBody = count(doc.body.text, term);
    if (!inTitle && !inDescription && !inBody) return 0;
    total += inTitle * 10 + inDescription * 4 + inBody;
  }
  return total;
}

// A piece of the original text around the first match, the matches marked.
function excerpt(original, folded, terms) {
  let first = -1;
  for (const term of terms) {
    const at = folded.text.indexOf(term);
    if (at !== -1 && (first === -1 || at < first)) first = at;
  }
  const fragment = document.createDocumentFragment();
  if (!original) return fragment;
  const startFolded = first === -1 ? 0 : Math.max(0, first - EXCERPT / 3);
  let start = folded.map[startFolded] ?? 0;
  let end = Math.min(original.length, start + EXCERPT);
  // Whole words at either end.
  if (start > 0) { const space = original.indexOf(" ", start); if (space !== -1 && space < start + 20) start = space + 1; }
  if (end < original.length) { const space = original.lastIndexOf(" ", end); if (space > start) end = space; }

  // The marked ranges, in the original's positions.
  const ranges = [];
  for (const term of terms) {
    for (let at = folded.text.indexOf(term); at !== -1; at = folded.text.indexOf(term, at + term.length)) {
      const from = folded.map[at];
      const to = folded.map[at + term.length - 1] + 1;
      if (to <= start) continue;
      if (from >= end) break;
      ranges.push([Math.max(from, start), Math.min(to, end)]);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  if (start > 0) fragment.append("… ");
  let at = start;
  for (const [from, to] of ranges) {
    if (from < at) continue;
    fragment.append(original.slice(at, from));
    const mark = document.createElement("mark");
    mark.textContent = original.slice(from, to);
    fragment.append(mark);
    at = to;
  }
  fragment.append(original.slice(at, end));
  if (end < original.length) fragment.append(" …");
  return fragment;
}

const clean = (text) => (text || "").replace(/\s+/g, " ").trim();

/** Wire the search form: load the index, and search as people type. */
export function initSiteSearch(form, strings) {
  const say = (key, fallback) => strings[key] || fallback;
  const input = form.querySelector("input[type=search]");
  const clear = form.querySelector(".al-search__clear");
  const status = document.querySelector("[data-search-status]");
  const results = document.querySelector("[data-search-results]");
  const lang = document.documentElement.lang || "en";
  const plural = new Intl.PluralRules(lang);
  initSearch(form);

  let docs = null;
  let loading = null;

  const load = () => {
    loading ||= fetch(form.dataset.searchIndex)
      .then((response) => { if (!response.ok) throw new Error(response.statusText); return response.json(); })
      .then((index) => {
        docs = index.filter((doc) => doc.title || doc.body).map((doc) => {
          const body = clean(doc.body);
          const description = clean(doc.description);
          const name = clean(doc.title) || doc.url;
          return { url: doc.url, name, rawBody: body, rawDescription: description,
            title: fold(name), description: fold(description), body: fold(body) };
        });
      })
      .catch((error) => { loading = null; throw error; });
    return loading;
  };

  const failed = () => {
    status.textContent = "";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "al-button al-button--sm";
    retry.textContent = say("search_retry", "Try again");
    retry.addEventListener("click", () => { run(); input.focus(); });
    const notice = document.createElement("div");
    notice.className = "al-notice al-notice--danger";
    notice.setAttribute("role", "alert");
    notice.innerHTML = '<div class="al-notice__body"><p class="al-notice__title"></p><p></p><div class="al-notice__actions"></div></div>';
    notice.querySelector(".al-notice__title").textContent = say("error", "Error");
    notice.querySelector(".al-notice__title + p").textContent = say("search_failed", "Couldn't load the search index.");
    notice.querySelector(".al-notice__actions").append(retry);
    results.replaceChildren(notice);
  };

  const render = (query) => {
    const terms = words(query);
    if (!terms.length) { status.textContent = ""; results.replaceChildren(); return; }
    const found = docs
      .map((doc) => [doc, score(doc, terms)])
      .filter(([, s]) => s > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_RESULTS);

    if (!found.length) {
      status.textContent = say("search_results_zero", "No results");
      const empty = document.createElement("div");
      empty.className = "al-empty";
      const title = document.createElement("p");
      title.className = "al-empty__title";
      title.textContent = say("search_none_title", "No results");
      const text = document.createElement("p");
      text.className = "al-empty__text";
      text.textContent = say("search_none_text", "Nothing matches “%q”.").replace("%q", query.trim());
      const again = document.createElement("button");
      again.type = "button";
      again.className = "al-button";
      again.textContent = say("search_clear", "Clear search");
      again.addEventListener("click", () => clear?.click());
      empty.append(title, text, again);
      results.replaceChildren(empty);
      return;
    }

    const n = found.length;
    status.textContent = say(`search_results_${plural.select(n)}`, say("search_results_other", "%n results")).replace("%n", n);
    const list = document.createElement("ul");
    list.className = "al-list";
    list.setAttribute("role", "list");
    for (const [doc] of found) {
      const link = document.createElement("a");
      link.className = "al-list__item";
      link.href = doc.url;
      const text = document.createElement("span");
      text.className = "al-list__text";
      const title = document.createElement("span");
      title.className = "al-list__title";
      title.textContent = doc.name;
      const description = document.createElement("span");
      description.className = "al-list__description";
      const inDescription = terms.some((term) => doc.description.text.includes(term));
      description.append(inDescription || !doc.rawBody
        ? excerpt(doc.rawDescription, doc.description, terms)
        : excerpt(doc.rawBody, doc.body, terms));
      text.append(title, description);
      link.append(text);
      const item = document.createElement("li");
      item.append(link);
      list.append(item);
    }
    results.replaceChildren(list);
  };

  const run = () => {
    const query = input.value;
    if (clear) clear.hidden = !query;
    const url = new URL(location.href);
    if (query) url.searchParams.set("q", query); else url.searchParams.delete("q");
    history.replaceState(null, "", url);
    if (!query.trim()) { render(""); return; }
    if (docs) { render(query); return; }
    status.textContent = say("search_loading", "Searching…");
    load().then(() => render(input.value)).catch(failed);
  };

  let timer = 0;
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 120); });
  form.addEventListener("submit", (event) => { event.preventDefault(); clearTimeout(timer); run(); });
  // Load the index when people show they're about to search, not before.
  input.addEventListener("focus", () => { load().catch(() => {}); }, { once: true });

  const initial = new URL(location.href).searchParams.get("q");
  if (initial) { input.value = initial; run(); }
}

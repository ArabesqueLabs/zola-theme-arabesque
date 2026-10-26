+++
title = "Writing"
description = "Sections, pages, front matter, and the templates beyond the usual ones."
weight = 3
+++

The theme reads Zola's own front matter, and a little of its own under `[extra]`.

## Sections

A section's pages are listed one of two ways. Sorted by date, each is an article: its date and reading time, its title, then its description or summary. Sorted any other way (by weight, by title), it's a list of links, as in this guide.

```toml
+++
title = "Blog"
description = "Shown under the title."
sort_by = "date"
paginate_by = 10
+++
```

A paginated section says which of how many it shows ("11 to 20 of 24") above the list, and its pages below: Previous and Next in words, and at most seven numbers.

## Pages

```toml
+++
title = "A page's title"
description = "The lede, under the title; and the summary in lists, and for search engines."
date = 2026-10-20
updated = 2026-10-24
draft = true          # shown with a "Draft" badge, while you serve with --drafts
authors = ["Lina Haddad"]

[taxonomies]
tags = ["design", "zola"]

[extra]
toc = true            # override extra.page.toc_min_headings
image = "cover.png"   # the social image, beside the page
+++
```

A page whose section is sorted shows the pages either side at its foot: Newer and Older for dates, Previous and Next otherwise.

## More templates

Two templates go beyond Zola's usual ones. Give a page one with `template`:

- **`archive.html`**: every page of a section, by year. Set `section = "blog/_index.md"` under `[extra]`; the home page's section by default.
- **`search.html`**: search, in the browser, over the site's index for the page's language. Needs `build_search_index = true` and `[search] index_format = "fuse_json"` for each language, which indexes Arabic as well as English.

## Code

Code blocks become the system's code block, with a copy button and their language in the bar. Mark the lines that matter with `hl_lines`:

```css,hl_lines=3
.al-code__pre {
  font-family: var(--al-font-mono);
  direction: ltr;
}
```

Code is always left to right, in an Arabic page too.

+++
title = "Markdown, in the system's look"
description = "Every element Markdown writes, as the theme shows it: headings, lists, quotes, code, tables and footnotes."
date = 2026-10-12
[taxonomies]
tags = ["markdown", "reference"]
+++

Running text is set in the reading face, at the reading measure, with an em between blocks. This page has one of everything, so you can see how yours will look.

## Text

A paragraph with **strong** words, *emphasis*, `inline code`, a [link to the guide](@/docs/_index.md) and a footnote.[^1] Smart punctuation turns "quotes" and -- dashes into their proper forms.

> A quotation has a rule at its start, and is muted. It's for what someone else wrote.

---

## Lists

- An unordered list
- With a second item
  - And one nested inside it
- And a last one

1. An ordered list
2. Counts its items
3. In the page's digits

- [x] A task that's done
- [ ] A task that isn't

## Code

```js
// The theme's script, in brief.
import { initToc } from "../js/toc.js";
const strings = JSON.parse(document.getElementById("zt-strings").textContent);
initToc();
```

```rust,linenos,hl_lines=2
fn main() {
    let greeting = "مرحبا";
    println!("{greeting}, world");
}
```

## Tables

Columns of figures are aligned as figures, and a wide table scrolls on its own, never the page.

| Breakpoint | Width | Columns |
|---|---|---|
| Small | 40rem | 1 |
| Medium | 52rem | 2 |
| Large | 64rem | 3 |

## Headings

### A third-level heading

#### A fourth-level heading

Headings below the page's title start at the second level; "On this page" lists the second-level ones.

[^1]: Footnotes gather at the foot of the page, after a hairline.

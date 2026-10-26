+++
title = "Native support for RTL content"
description = "How the theme lays out Arabic: mirrored layout, joined letters, isolated numbers, and the type to match."
date = 2026-09-30
[taxonomies]
tags = ["rtl", "arabic", "accessibility"]
+++

A page in Arabic isn't a page in English turned around. Some things mirror, and some never do; the theme follows the design system's rules for both.

## What mirrors

The layout: the header's title moves to the right, its tools to the left; "On this page" sits on the right; Previous is on the right and Next on the left. Arrows and chevrons point the way the text reads.

## What doesn't

Numbers, code, the pattern and anything with a fixed direction of its own. A number inside an Arabic sentence is isolated, so its digits stay in order: the theme puts dates, counts and reading times in `<bdi>`.

## The type

| Role | Latin | Arabic |
|---|---|---|
| Interface | Jost | IBM Plex Sans Arabic |
| Headings | Jost | Kufam |
| Reading | Newsreader | Amiri |
| Code | IBM Plex Mono | (system) |

Each script falls through to its own face, character by character. Arabic is set a little larger, with more leading, never tracked, and never in capitals: it has none.

Read the same post [in Arabic](@/blog/right-to-left.ar.md).

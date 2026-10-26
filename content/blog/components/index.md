+++
title = "Galleries, diagrams and embeds"
description = "The shortcodes beyond the design system's own components: a gallery of a post's images, scene breaks, Mermaid diagrams, and videos, PDFs, gists and Instagram posts."
date = 2026-10-05
[taxonomies]
tags = ["components", "shortcodes"]
+++

The theme's first shortcodes write the design system's own components. These seven go further: they show what a post carries with it, break it into scenes, draw diagrams, and bring in things that live on other sites. Each is shown working here; the [shortcodes page](@/docs/shortcodes.md) says how to write them.

## Gallery

A post that's a folder, with its images beside its `index.md`, can show them all as a grid. Zola makes the thumbnails, so the page loads small files; each links to its image in full.

{{ gallery(alts=["The home page in light, with the pattern behind the title.", "The home page in dark.", "The home page in Arabic, laid out right to left.", "A post, with On this page beside it."]) }}

## Separators

A break between scenes, in one of fifteen styles. The pattern's star is the theme's own.

{{ separator(style="star") }}

The default is three asterisks, the classic scene break of a novel.

{{ separator() }}

An Arabic star, for an Arabic text, and a rule that fades at both ends.

{{ separator(style="arabic", gap="sm") }}

{{ separator(style="gradient", width="2/3") }}

## Diagrams

A Mermaid diagram is written as text and drawn in the browser, in the theme's colours. Switch to dark, and it's drawn again.

{% mermaid(label="How Zola builds a page with this theme: Markdown and the theme's templates go into Zola, which writes HTML; the browser adds the design system's CSS and the theme's script.") %}
flowchart LR
  md[Markdown] --> zola((Zola))
  tpl[Templates] --> zola
  zola --> html[HTML]
  html --> browser[Browser]
  css[arabesque.css] --> browser
  js[theme.js] --> browser
{% end %}

## Video

From YouTube's no-cookie domain, at 16:9, loaded only when it's near the screen.

{{ youtube(id="ugkkza3vKbc", title="SREcon15: Notes from Production Engineering") }}

## PDF

In the page, with a link to download it for the browsers (most phones) that can't show one.

{{ pdf(src="arabesque-about.pdf", title="About this theme", height="36rem") }}

## Gist

{{ gist(user="mos3abof", gist="4771874") }}

## Instagram

{{ instagram(id="De95KnVivAf") }}

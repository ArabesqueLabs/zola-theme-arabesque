+++
title = "Components"
description = "The design system's components in Markdown, and galleries, separators, diagrams and embeds."
weight = 4
aliases = ["/docs/shortcodes/"]
+++

Components you write in Markdown, as Zola has since 0.23: `{% raw %}{{ <name … /> }}{% endraw %}`, or `{% raw %}{% <name …> %}{% endraw %}` and `{% raw %}{% </name> %}{% endraw %}` around Markdown. A value that isn't a string goes in braces: `{["8", "19"]}`, `{true}`. Each writes a design system component's markup exactly as its spec says. They're shown here working, with how to write them. The [galleries, diagrams and embeds](#galleries-diagrams-and-embeds) at the end are shown working in [their own post](@/blog/components/index.md).

## Notice

A message in the page: info (the default), success, warning, or danger for errors only. With no title, the kind's word is the title.

{% <notice title="Before you start"> %}
The theme needs Zola **0.23** or later.
{% </notice> %}

{% <notice kind="warning"> %}
Changing `base_url` changes every page's address.
{% </notice> %}

```
{% raw %}{% <notice kind="warning" title="Optional title"> %}{% endraw %}
Markdown.
{% raw %}{% </notice> %}{% endraw %}
```

## Disclosure

Detail that most people don't need, folded away. A value beside the summary says what's inside while it's closed.

{% <details summary="Supported Zola versions" value="0.23 and later"> %}
The theme is written with components and Tera 2, which arrived in 0.23.
{% </details> %}

```
{% raw %}{% <details summary="Supported Zola versions" value="0.23 and later"> %}{% endraw %}
Markdown.
{% raw %}{% </details> %}{% endraw %}
```

## Quote

{% <quote name="Lina Haddad" role="Designer"> %}
It's the first theme where the Arabic pages didn't feel like an afterthought.
{% </quote> %}

```
{% raw %}{% <quote name="Lina Haddad" role="Designer"> %}{% endraw %}
Their words.
{% raw %}{% </quote> %}{% endraw %}
```

## Stats and steps

{{ <stats labels={["Templates", "Components", "Languages"]} values={["8", "19", "2"]} notes={["", "", "more with one table each"]} /> }}

```
{% raw %}{{ <stats labels={["Templates", "Components"]} values={["8", "19"]} notes={["", ""]} /> }}{% endraw %}
{% raw %}{{ <steps titles={["Discover", "Design"]} bodies={["Start with the problem.", "Then its shape."]} /> }}{% endraw %}
```

## Buttons, badges and keys

{{ <button url="@/docs/installation.md" text="Install the theme" /> }} {{ <button url="@/docs/configuration.md" text="Configure it" style="arrow" /> }}

New in this version: {{ <badge text="Experimental" kind="warning" /> }}. Search with {{ <kbd keys="Ctrl+K" /> }}.

```
{% raw %}{{ <button url="@/docs/installation.md" text="Install the theme" /> }}{% endraw %}
{% raw %}{{ <button url="@/docs/configuration.md" text="Configure it" style="arrow" /> }}{% endraw %}
{% raw %}{{ <badge text="Experimental" kind="warning" /> }}{% endraw %}
{% raw %}{{ <kbd keys="Ctrl+K" /> }}{% endraw %}
```

## Command and code

{{ <command text="zola build" /> }}

{% <code caption="config.toml"> %}
```toml
[extra.page]
toc_min_headings = 3
```
{% </code> %}

```
{% raw %}{{ <command text="zola build" /> }}{% endraw %}
{% raw %}{% <code caption="config.toml"> %}{% endraw %}
…a fenced code block…
{% raw %}{% </code> %}{% endraw %}
```

## Figure

{{ <figure src="/arabesque/theme/favicon.svg" alt="The eight-point star, drawn in teal." caption="The star, a cell of the pattern." width="96" height="96" /> }}

```
{% raw %}{{ <figure src="cover.jpg" alt="What it shows" caption="Markdown" /> }}{% endraw %}
```

## Call to action

{{ <cta title="Your next site, built from the same tile." lede="Install the theme, or read how it's put together." url="@/docs/installation.md" text="Install the theme" url2="https://design.arabesquelabs.com" text2="See the design system" /> }}

```
{% raw %}{{ <cta title="…" lede="…" url="@/docs/installation.md" text="Install the theme" url2="…" text2="…" /> }}{% endraw %}
```

## Galleries, diagrams and embeds

These go beyond the design system's components. Embeds load from their own sites, and only on the pages that have them. See them all working in [Galleries, diagrams and embeds](@/blog/components/index.md).

### Gallery

The images beside a page, as a grid of thumbnails that Zola makes, each linking to its image. The page must be a folder (`my-post/index.md`) with its images beside it; they're shown in the order of their file names.

```
{% raw %}{{ <gallery alts={["What the first shows", "What the second shows"]} /> }}{% endraw %}
```

| Parameter | Does |
|---|---|
| `alts` | Each image's description, in order; without one, a link is named "Image 2 of 5" |
| `columns` | The narrowest a thumbnail gets, in rem; 16 by default |

### Separator

A break between scenes or sections.

{{ <separator style="star" gap="sm" /> }}

```
{% raw %}{{ <separator /> }}{% endraw %}
{% raw %}{{ <separator style="star" gap="lg" /> }}{% endraw %}
{% raw %}{{ <separator style="gradient" width="2/3" /> }}{% endraw %}
```

| Parameter | Does |
|---|---|
| `style` | `asterisks` (default), `dots`, `bullets`, `dashes`, `dingbats`, `diamonds`, `fleurons`, `asterism`, `ornament`, `arabic`, `star`, `rule`, `gradient`, `space`, or `image` (with `src` and `alt`) |
| `gap` | The room around it: `sm`, `md` (default), `lg`, `xl` |
| `size` | The marks' size: `sm`, `base`, `md`, `lg`, `xl` (default), `2xl`, `3xl` |
| `width` | A rule's width: `1/4`, `1/3`, `1/2` (default), `2/3`, `3/4`, `full` |
| `color` | Any CSS colour; the muted text colour by default |

### Mermaid

A diagram written as text, drawn in the browser in the theme's colours, and again when the reader switches theme. Mermaid's script loads from jsDelivr, only on a page with a diagram; without it, the diagram's text shows.

{% <mermaid label="Light and dark: the system's setting, or the reader's choice."> %}
flowchart LR
  system[The system's setting] --> theme{Theme}
  choice[The reader's choice] --> theme
  theme --> light[Light]
  theme --> dark[Dark]
{% </mermaid> %}

```
{% raw %}{% <mermaid label="What it shows, for screen readers"> %}{% endraw %}
flowchart LR
  A --> B
{% raw %}{% </mermaid> %}{% endraw %}
```

### YouTube

From YouTube's no-cookie domain, at 16:9.

```
{% raw %}{{ <youtube id="ugkkza3vKbc" title="What the video is" /> }}{% endraw %}
{% raw %}{{ <youtube playlist="PL…" /> }}{% endraw %}
```

| Parameter | Does |
|---|---|
| `id` | The video's ID |
| `playlist` | A playlist's ID; with `id`, the video plays in it |
| `start` | Where to start, in seconds |
| `title` | What the video is, for screen readers |

### PDF

In the page, with a link to download it, for browsers (most phones) that can't show one.

```
{% raw %}{{ <pdf src="report.pdf" title="The annual report" height="40rem" /> }}{% endraw %}
```

`src` is beside the page, in `static/` (`"/files/report.pdf"`), or an address.

### Gist

```
{% raw %}{{ <gist user="mos3abof" gist="4771874" /> }}{% endraw %}
{% raw %}{{ <gist user="mos3abof" gist="4771874" file="restart_apache_fabfile.py" /> }}{% endraw %}
```

A long gist scrolls in its own box. Without JavaScript, a link to it shows instead.

### Instagram

```
{% raw %}{{ <instagram id="De95KnVivAf" /> }}{% endraw %}
```

The post's ID is in its address: `instagram.com/p/<id>/`. Until Instagram's script loads, or without it, a link to the post shows.


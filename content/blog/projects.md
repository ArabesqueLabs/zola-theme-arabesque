+++
title = "A page for your projects"
description = "Two new templates show a section's pages as cards: a picture, a sentence, a year, and where to find each one."
date = 2026-09-22
[taxonomies]
tags = ["templates", "projects"]
+++

A list of links suits a guide, and a column of dated articles suits a blog. Neither suits the things you've made, where a reader wants to see them side by side and go straight to the one that looks interesting. So the theme has two more templates: `projects.html` for a section, and `project.html` for its pages. The [Projects](@/projects/_index.md) page uses them.

## A card for each

Each project is a card: its picture across the top, its title, the one sentence from its description, then its year and links to its site and its source. A source on GitHub gets GitHub's mark. The whole card is a link to the project's page, and its site and source are links of their own above it, so each goes where it says.

A project with no picture isn't left blank. Its title's first letter sits on the quiet pattern, in the display face: Latin or Arabic, whichever the title begins with.

## Groups

A section's subsections follow its own projects, each under its title and description, with cards of their own. The demo keeps its smaller things under Experiments.

## Its own page

A project's page is a page like any other, with breadcrumbs, its lede and the projects either side at its foot. It adds the year and links under the title, and the picture below them, at its own size, never stretched.

```toml
[extra]
image = "cover.jpg"
year = "2025"
website = "https://example.com"
source = "https://github.com/me/lantern"
```

Every key is optional. [Writing](@/docs/writing.md#projects) in the guide has the rest.

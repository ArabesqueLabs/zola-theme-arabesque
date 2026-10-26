+++
title = "Configuration"
description = "Everything you can set, under [extra] in config.toml, and what each does."
weight = 2
+++

The theme's defaults are in its `theme.toml`. To change one, set the same key under `[extra]` in your `config.toml`. Tables merge key by key, so you only write what differs; a list replaces the theme's whole.

## The header

The header shows your site's title (with a logo, if you set one), your menu, the language link and the theme button. Under the medium breakpoint the menu folds behind a button.

```toml
[extra.header]
logo = "logo.svg"      # a path in static/, shown before the title
sticky = true          # keep it at the top as the page scrolls
theme_toggle = true    # the theme button: system, light, dark
language_link = true   # the same page in each other language

[[extra.menu.en]]
name = "Blog"
url = "@/blog/_index.md"   # content, in this language

[[extra.menu.en]]
name = "Tags"
url = "/tags/"             # or a path, or an address
```

One action can stay in the bar at every width, as a small primary button:

```toml
[extra.header.action.en]
name = "Subscribe"
url = "@/subscribe.md"
```

## The home page

The home page is your `content/_index.md`. Its hero comes from `[extra.hero]` in that file's front matter, and its content follows the hero.

```toml
+++
title = "My site"

[extra.hero]
eyebrow = "Optional words above the title"
title = "One sentence that says what this is."
lede = "One or two more, to say it in full."
caption = "What the teal tile in the pattern is."
actions = [
  { name = "Start here", url = "@/docs/_index.md" },
  { name = "Read the blog", url = "@/blog/_index.md" },
]
+++
```

The first action is the primary button; the rest are text links with an arrow. `links` puts icon links under them: `github`, `feed` (the feed in the page's language, with no `url`), or any of the design system's icons.

```toml
links = [
  { name = "GitHub", url = "https://github.com/me/site", icon = "github" },
  { name = "Atom feed", icon = "feed" },
]
```

A logo or a profile picture takes the place of the pattern's teal focal tile (on a phone, it sits above the title):

```toml
[extra.hero]
image = "logo.svg"           # in static/, or an address; photos are resized by Zola
image_alt = ""               # empty for a logo the title already names; a description for a photo
image_style = "logo"         # "logo" (as it is, the default) or "portrait" (cropped to a circle)
# initials = "LH"            # with no image: initials in a circle, as a placeholder
                             # (a portrait with neither shows an anonymous profile picture)
# tint = "teal"              # the placeholder's colours: teal, blue, green, yellow, orange,
                             # pink, purple or cyan; neutral greys without one
```

A portrait sits in a halo: a ring of the page's background with a hairline, which clears the pattern around it (the design system has no drop shadows). The placeholder is drawn in the page, in the theme's colours, so it follows the theme button. To change any of it, set these in your own stylesheet (`extra.stylesheets`):

```css
.zt-hero {
  --zt-hero-halo: 0.875rem;                          /* the ring's width; 0 for none */
  --zt-avatar-ground: var(--al-color-surface-sunk);  /* the placeholder's circle */
  --zt-avatar-figure: var(--al-color-line-strong);   /* the placeholder's figure */
}
```

Under the hero, the latest pages of one section:

```toml
[extra.home]
section = "blog/_index.md"   # "" (the default) for none
count = 5
pattern = true               # draw the pattern across the hero
animate = true               # let it draw itself in, once
```

## Pages

| Key | Default | Does |
|---|---|---|
| `extra.page.toc_min_headings` | 4 | Show "On this page" when a page has this many `h2`s; 0 turns it off |
| `extra.page.reading_time` | true | The minutes it takes to read, beside the date |
| `extra.page.page_nav` | true | Links to the pages either side, at the foot |
| `extra.page.back_to_top_after` | 0.5 | Show "Back to top" once the page has scrolled this many screens |

A page can show or hide its own contents with `toc = true` or `toc = false` under `[extra]` in its front matter, and set a social image with `image = "cover.png"`, with `image_alt` for what it shows.

## The footer

```toml
[[extra.footer.links.en]]
name = "Privacy"
url = "@/privacy.md"

[[extra.footer.links.en]]
name = "Source on GitHub"   # with an icon, the link is the icon, named by this
url = "https://github.com/me/site"
icon = "github"

[extra.footer.text]
en = "Written in London."

# In place of the theme's "© %year %name."; HTML is kept.
[extra.footer.copyright]
en = 'Made with ♥ by <a href="https://example.com">Me</a> | © %year'

[extra.footer]
lockup = false     # the site's name (and logo) in the footer too
credit = false     # "Built with Zola and the Arabesque design system"
feed_link = true   # an icon linking the Atom feed, after the links
```

## Sharing and search

Each page describes itself to the sites and apps that preview links: Open Graph (Facebook, LinkedIn, Slack, Discord, Mastodon and most others) and X's cards. It describes itself to search engines too, with schema.org data: the site on the home page, a blog post for each dated page, and a web page for the rest. With nothing set, the tags use each page's title, description, date, tags, authors and image, then the site's. Set only what you want to add:

```toml
[extra.social]
image = "social.png"                     # for pages without their own; best at 1200×630
image_alt = "The site's name on the pattern"
twitter_site = "@site"                   # the site's X account
twitter_creator = "@you"                 # the author's
fediverse_creator = "@you@example.social"  # Mastodon credits it on shared links
publisher_type = "Person"                # or "Organization"
same_as = ["https://github.com/you"]     # your profiles elsewhere
```

`enabled = false` turns all of the tags off, and `schema_org = false` just the schema.org data.

## Everything else

| Key | Does |
|---|---|
| `extra.search.page` | The search page (`"@/search.md"`): adds a search button to the header |
| `extra.favicon` | Your own icon, in static/; the theme's star by default |
| `extra.author` | Who the copyright line names; `author` by default, then the title |
| `extra.stylesheets` | Your own CSS files, in static/, loaded after the theme's |
| `extra.rtl_languages` | Languages written right to left |
| `extra.language_names` | Each language, named in itself: the language link's name |
| `extra.language_glyphs` | Each language's letter, shown in a key as the language link (`ar = "ع"`, `en = "En"`) |
| `extra.i18n.<lang>` | The words the theme writes, per language |

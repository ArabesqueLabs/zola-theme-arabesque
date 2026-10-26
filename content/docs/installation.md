+++
title = "Installation"
description = "Add the theme to a Zola site, and see it working in a minute."
weight = 1
+++

The theme needs Zola 0.19 or later. Everything else it uses is in the theme: the design system's CSS, its fonts and its helpers.

## Add the theme

In your site's directory, add the theme as a Git submodule, so you can update it when you choose:

{{ command(text="git submodule add https://github.com/ArabesqueLabs/zola-theme-arabesque.git themes/arabesque") }}

Or download it into `themes/arabesque`. Then name it in your `config.toml`:

{% code(caption="config.toml") %}
```toml
theme = "arabesque"

[markdown]
highlight_code = true
highlight_theme = "css"
```
{% end %}

The second part colours code with the design system's syntax roles, in light and dark. Without it, the theme's script colours the languages it knows (HTML, CSS, JavaScript, JSON and the shell) itself.

## See it working

{{ command(text="zola serve") }}

Open the address it prints. The home page shows your `content/_index.md` with the hero, then the latest posts from `content/blog/`. Add a menu, a footer and a second language next: see [Configuration](@/docs/configuration.md).

{% notice(kind="success", title="Try the demo first") %}
The theme's repository is this site. Clone it and run `zola serve` in it to see every template, in English and Arabic.
{% end %}

+++
title = "Languages"
description = "A site in more than one language; the theme supports RTL."
weight = 5
+++

The theme is bidirectional from the start. Each language has its own address, and the header links each page to its translation, named in its own language.

## Add a language

```toml
default_language = "en"

[languages.ar]
title = "موقعي"
description = "…"
build_search_index = true

[languages.ar.search]
index_format = "fuse_json"
```

Then write each page's translation beside it: `about.md` and `about.ar.md`. A page with no translation links to the other language's home page.

## Right to left

A language in `extra.rtl_languages` (Arabic, Persian, Hebrew, Urdu and others) gets `dir="rtl"`. The layout mirrors, with logical properties only; arrows and chevrons turn; numbers, code and the pattern never do.

The type follows the script: Arabic is set in IBM Plex Sans Arabic, Kufam and Amiri, a little larger and with more leading, never tracked or in capitals. A Latin word in an Arabic sentence keeps its own face.

## The theme's words

The words the theme writes (Skip to content, On this page, Previous, Next and the rest) are in English and Arabic. For another language, add its table, and the date's locale:

```toml
[extra.i18n.fr]
skip = "Aller au contenu"
on_this_page = "Sur cette page"
date_format = "%-d %B %Y"
date_locale = "fr_FR"
# …every key in the theme's [extra.i18n.en]
```

A language with no table of its own uses the English words.

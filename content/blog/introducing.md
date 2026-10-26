+++
title = "Introducing Arabesque for Zola"
description = "A theme that puts the Arabesque design system together into a site: a blog, documents, or both, in English and Arabic."
date = 2026-10-20
authors = ["Arabesque Labs"]
[taxonomies]
tags = ["announcement", "zola"]
+++

Arabesque is the Arabesque Labs design system: tokens, CSS and a few small helpers, accessible and bidirectional from the start. This theme is the shortest way from it to a website.

## What's in it

A range of templates for a Zola site: the home page with its hero, sections that list their pages, pages with "On this page" beside them, tags, an archive, search and a page for when something isn't found. Each one is built from the system's components, as their specs describe them, and nothing else.

{{ stats(labels=["Page templates", "Shortcodes", "Languages, to start"], values=["8", "19", "2"]) }}

## What it isn't

It isn't a framework, and it doesn't ask for one. The pages are plain HTML; a small script adds the pattern, copy buttons, and search. Without it, every page still reads and works.

Read the [guide](@/docs/_index.md) to install it, or start from [its repository](https://github.com/ArabesqueLabs/zola-theme-arabesque), which is this site.

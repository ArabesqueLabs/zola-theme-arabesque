+++
title = "Why the hero draws itself once"
description = "The pattern is drawn by rule, and the hero may draw itself in once, the way it's constructed. Never under reduced motion."
date = 2026-08-28
[taxonomies]
tags = ["pattern", "motion"]
+++

The pattern across the home page isn't an image. It's drawn when the page loads, by rule: the 4.8.8 tiling, two lines from each edge's midpoint at the contact angle of 67.5°, meeting where the geometry puts them.

## Once, and only once

The hero may draw itself in, the way it's constructed: the tiling appears as scaffolding, the strands grow outwards from the focal tile, then the scaffolding fades. It's the one motion that plays on load, and it never plays for someone who has asked for reduced motion.

Turn it off with `animate = false` under `[extra.home]`, or the whole pattern with `pattern = false`.

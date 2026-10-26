+++
title = "Tessellate"
weight = 20
description = "Draws Islamic geometric patterns as SVG from a few numbers: the tiling, the contact angle, and the strand's width."

[extra]
year = "2024"
website = "https://arabesquelabs.github.io/zola-theme-arabesque/"
source = "https://github.com/ArabesqueLabs/zola-theme-arabesque"
+++

Tessellate builds a pattern the way a craftsman would: it lays down a tiling of polygons, sends two strands from each edge's midpoint at a chosen angle, and lets them run until they meet.

```sh
tessellate --tiling 4.8.8 --angle 67.5 --stroke 1.25 > pattern.svg
```

The SVG it writes is small enough to inline, and it tiles without seams.

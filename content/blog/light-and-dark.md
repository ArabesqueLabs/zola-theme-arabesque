+++
title = "Light, dark, and the reader's choice"
description = "The theme follows the reader's system, with a button to choose, and no flash on the way in."
date = 2026-09-14
[taxonomies]
tags = ["accessibility", "theme"]
+++

The theme follows the reader's system by default: light, or dark when `prefers-color-scheme` says so. The button in the header cycles through three modes: as the system, light, and dark. Its icon shows the mode in use (a screen, a sun, a moon), and its name says what pressing it does: "Switch to dark theme".

## Remembered, without a flash

The choice is kept in the browser; "as the system" keeps nothing. A small script in the head applies it before the first paint, so a dark page never flashes white, and the button's icon is set by CSS, so it's right before any script runs.

## Every pair measured

The design system computes the contrast of every text and interface colour against every background it sits on, in both themes, and the build fails if one falls below its minimum. The theme adds no colours of its own: everything is a token.

{% <notice kind="info" title="Forced colours"> %}
With Windows' high contrast themes, the system hands its colours to the browser, and the pattern steps aside.
{% </notice> %}

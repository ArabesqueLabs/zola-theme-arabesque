+++
title = "التثبيت"
description = "أضف القالب إلى موقع Zola، وشاهده يعمل في دقيقة."
weight = 1
+++

يحتاج القالب إلى Zola بالإصدار 0.19 أو أحدث. وكل ما يستخدمه غير ذلك موجود فيه: أوراق أنماط نظام التصميم، وخطوطه، وأدواته.

## أضف القالب

في مجلد موقعك، أضف القالب وحدةً فرعية في Git، لتحدّثه متى شئت:

{{ command(text="git submodule add https://github.com/ArabesqueLabs/zola-theme-arabesque.git themes/arabesque") }}

أو نزّله إلى `themes/arabesque`. ثم سمِّه في ملف `config.toml`:

{% code(caption="config.toml") %}
```toml
theme = "arabesque"

[markdown]
highlight_code = true
highlight_theme = "css"
```
{% end %}

يلوّن الجزء الثاني الشيفرة بألوان نظام التصميم، في المظهرين الفاتح والداكن.

## شاهده يعمل

{{ command(text="zola serve") }}

افتح العنوان الذي يطبعه. تعرض الصفحة الرئيسية ملف `content/_index.md` مع الواجهة، ثم أحدث المقالات من `content/blog/`.

{% notice(kind="success", title="جرّب العرض التوضيحي أولًا") %}
مستودع القالب هو هذا الموقع نفسه. انسخه وشغّل `zola serve` فيه لترى كل القوالب، بالعربية والإنجليزية.
{% end %}

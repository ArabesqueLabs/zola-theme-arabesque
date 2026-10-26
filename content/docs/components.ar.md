+++
title = "المكوّنات"
description = "مكوّنات نظام التصميم بصيغة Markdown، ومعها المعارض والفواصل والمخططات والتضمينات."
weight = 4
aliases = ["/ar/docs/shortcodes/"]
+++

مكوّنات تكتبها في Markdown، كما يتيح Zola منذ الإصدار 0.23: `{% raw %}{{ <name … /> }}{% endraw %}`، أو `{% raw %}{% <name …> %}{% endraw %}` و`{% raw %}{% </name> %}{% endraw %}` حول نص بصيغة Markdown. وتُكتب القيمة التي ليست نصًا بين قوسين معقوصين: `{["8", "19"]}`، `{true}`. يكتب كل منها بنية مكوّن نظام التصميم كما تنص عليها مواصفاته بالضبط. تراها هنا تعمل، ومعها طريقة كتابتها. أما المعارض والمخططات والتضمينات فتراها كلها تعمل في [مقالتها](@/blog/components/index.md).

## تنبيه

رسالة داخل الصفحة: معلومة (الافتراضي)، أو نجاح، أو تحذير، أو خطر للأخطاء وحدها. وإن لم يكن له عنوان، فعنوانه كلمة نوعه.

{% <notice title="قبل أن تبدأ"> %}
يحتاج القالب إلى Zola بالإصدار **0.23** أو أحدث.
{% </notice> %}

{% <notice kind="warning"> %}
تغيير `base_url` يغيّر عنوان كل صفحة.
{% </notice> %}

```
{% raw %}{% <notice kind="warning" title="عنوان اختياري"> %}{% endraw %}
نص بصيغة Markdown.
{% raw %}{% </notice> %}{% endraw %}
```

## إفصاح

تفاصيل لا يحتاجها أكثر الناس، مطوية. وتقول القيمة بجانب الملخص ما في داخلها وهي مغلقة.

{% <details summary="إصدارات Zola المدعومة" value="0.23 وما بعده"> %}
القالب مكتوب بالمكوّنات وبـ Tera 2، وقد وصلا في الإصدار 0.23.
{% </details> %}

```
{% raw %}{% <details summary="…" value="…"> %}{% endraw %}
نص بصيغة Markdown.
{% raw %}{% </details> %}{% endraw %}
```

## اقتباس

{% <quote name="لينا حداد" role="مصممة"> %}
هذا أول قالب لم تبدُ فيه الصفحات العربية كأنها فكرة لاحقة.
{% </quote> %}

```
{% raw %}{% <quote name="…" role="…"> %}{% endraw %}
كلماته هو.
{% raw %}{% </quote> %}{% endraw %}
```

## أرقام وخطوات

{{ <stats labels={["قوالب الصفحات", "المكوّنات", "اللغات"]} values={["8", "19", "2"]} notes={["", "", "والمزيد بجدول واحد لكل لغة"]} /> }}

{{ <steps titles={["اكتشف", "صمّم"]} bodies={["ابدأ بالمشكلة الحقيقية.", "ثم شكلها."]} /> }}

```
{% raw %}{{ <stats labels={["…", "…"]} values={["8", "19"]} /> }}{% endraw %}
{% raw %}{{ <steps titles={["…", "…"]} bodies={["…", "…"]} /> }}{% endraw %}
```

## أزرار وشارات ومفاتيح

{{ <button url="@/docs/installation.md" text="ثبّت القالب" /> }} {{ <button url="@/docs/installation.md" text="اقرأ الدليل" style="arrow" /> }}

جديد في هذا الإصدار: {{ <badge text="تجريبي" kind="warning" /> }}. ابحث بـ {{ <kbd keys="Ctrl+K" /> }}.

```
{% raw %}{{ <button url="@/docs/installation.md" text="ثبّت القالب" /> }}{% endraw %}
{% raw %}{{ <badge text="تجريبي" kind="warning" /> }}{% endraw %}
{% raw %}{{ <kbd keys="Ctrl+K" /> }}{% endraw %}
```

## أمر وشيفرة

{{ <command text="zola build" /> }}

```
{% raw %}{{ <command text="zola build" /> }}{% endraw %}
{% raw %}{% <code caption="config.toml"> %}{% endraw %}
…كتلة شيفرة…
{% raw %}{% </code> %}{% endraw %}
```

## فاصل

فاصل بين المشاهد أو الأقسام، بخمسة عشر نمطًا، منها النجمة العربية ونجمة الزخرفة.

{{ <separator style="arabic" /> }}

{{ <separator style="star" gap="sm" /> }}

```
{% raw %}{{ <separator style="arabic" /> }}{% endraw %}
{% raw %}{{ <separator style="star" gap="lg" /> }}{% endraw %}
```

## مخطط Mermaid

مخطط يُكتب نصًّا، ويُرسم في المتصفح بألوان القالب، ثم يُرسم من جديد إذا بدّل القارئ المظهر. لا يُحمَّل نص Mermaid البرمجي إلا في الصفحة التي فيها مخطط.

{% <mermaid label="المظهر الفاتح أو الداكن: إعداد النظام، أو اختيار القارئ."> %}
flowchart RL
  system[إعداد النظام] --> theme{المظهر}
  choice[اختيار القارئ] --> theme
  theme --> light[فاتح]
  theme --> dark[داكن]
{% </mermaid> %}

```
{% raw %}{% <mermaid label="ما يعرضه المخطط، لقارئات الشاشة"> %}{% endraw %}
flowchart RL
  A --> B
{% raw %}{% </mermaid> %}{% endraw %}
```

## معرض وتضمينات

- **معرض** الصور التي بجانب الصفحة: `{% raw %}{{ <gallery /> }}{% endraw %}`
- **فيديو** من YouTube: `{% raw %}{{ <youtube id="…" title="…" /> }}{% endraw %}`
- **ملف PDF** مع رابط لتنزيله: `{% raw %}{{ <pdf src="report.pdf" /> }}{% endraw %}`
- **gist** من GitHub: `{% raw %}{{ <gist user="…" gist="…" /> }}{% endraw %}`
- **منشور** من Instagram: `{% raw %}{{ <instagram id="…" /> }}{% endraw %}`

تُحمَّل التضمينات من مواقعها، وفي الصفحات التي فيها وحدها. تجد معاملات كل منها في [الصفحة الإنجليزية](@/docs/components.md).

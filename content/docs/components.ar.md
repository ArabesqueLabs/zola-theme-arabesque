+++
title = "المكوّنات"
description = "مكوّنات نظام التصميم بصيغة Markdown، ومعها المعارض والفواصل والمخططات والتضمينات."
weight = 4
aliases = ["/ar/docs/shortcodes/"]
+++

مكوّنات تكتبها في Markdown، كما يتيح Zola منذ الإصدار 0.23: `{% raw %}{{ <name … /> }}{% endraw %}`، أو `{% raw %}{% <name …> %}{% endraw %}` و`{% raw %}{% </name> %}{% endraw %}` حول نص بصيغة Markdown. وتُكتب القيمة التي ليست نصًا بين قوسين معقوصين: `{["8", "19"]}`، `{true}`. يكتب كل منها بنية مكوّن نظام التصميم كما تنص عليها مواصفاته بالضبط. تراها هنا تعمل، ومعها طريقة كتابتها. أما [المعارض والمخططات والتضمينات](#galleries-diagrams-and-embeds) في الآخر فتراها تعمل في [مقالتها](@/blog/components/index.ar.md).

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
{% raw %}{% <details summary="إصدارات Zola المدعومة" value="0.23 وما بعده"> %}{% endraw %}
نص بصيغة Markdown.
{% raw %}{% </details> %}{% endraw %}
```

## اقتباس

{% <quote name="لينا حداد" role="مصممة"> %}
هذا أول قالب لم تبدُ فيه الصفحات العربية كأنها فكرة لاحقة.
{% </quote> %}

```
{% raw %}{% <quote name="لينا حداد" role="مصممة"> %}{% endraw %}
نص الاقتباس.
{% raw %}{% </quote> %}{% endraw %}
```

## أرقام وخطوات

{{ <stats labels={["قوالب الصفحات", "المكوّنات", "اللغات"]} values={["8", "19", "2"]} notes={["", "", "والمزيد بجدول واحد لكل لغة"]} /> }}

{{ <steps titles={["اكتشف", "صمّم"]} bodies={["ابدأ بالمشكلة الحقيقية.", "ثم شكلها."]} /> }}

```
{% raw %}{{ <stats labels={["قوالب الصفحات", "المكوّنات"]} values={["8", "19"]} notes={["", ""]} /> }}{% endraw %}
{% raw %}{{ <steps titles={["اكتشف", "صمّم"]} bodies={["ابدأ بالمشكلة الحقيقية.", "ثم شكلها."]} /> }}{% endraw %}
```

## أزرار وشارات ومفاتيح

{{ <button url="@/docs/installation.md" text="ثبّت القالب" /> }} {{ <button url="@/docs/configuration.md" text="اضبطه" style="arrow" /> }}

جديد في هذا الإصدار: {{ <badge text="تجريبي" kind="warning" /> }}. ابحث بـ {{ <kbd keys="Ctrl+K" /> }}.

```
{% raw %}{{ <button url="@/docs/installation.md" text="ثبّت القالب" /> }}{% endraw %}
{% raw %}{{ <button url="@/docs/configuration.md" text="اضبطه" style="arrow" /> }}{% endraw %}
{% raw %}{{ <badge text="تجريبي" kind="warning" /> }}{% endraw %}
{% raw %}{{ <kbd keys="Ctrl+K" /> }}{% endraw %}
```

## أمر وشيفرة

{{ <command text="zola build" /> }}

{% <code caption="config.toml"> %}
```toml
[extra.page]
toc_min_headings = 3
```
{% </code> %}

```
{% raw %}{{ <command text="zola build" /> }}{% endraw %}
{% raw %}{% <code caption="config.toml"> %}{% endraw %}
…كتلة شيفرة…
{% raw %}{% </code> %}{% endraw %}
```

## شكل

{{ <figure src="/arabesque/theme/favicon.svg" alt="النجمة الثمانية، مرسومة باللون الفيروزي." caption="النجمة، خلية من الزخرفة." width="96" height="96" /> }}

```
{% raw %}{{ <figure src="cover.jpg" alt="ما تعرضه الصورة" caption="نص بصيغة Markdown" /> }}{% endraw %}
```

## دعوة إلى إجراء

{{ <cta title="موقعك القادم، مبني من البلاطة نفسها." lede="ثبّت القالب، أو اقرأ كيف صُنع." url="@/docs/installation.md" text="ثبّت القالب" url2="https://design.arabesquelabs.com" text2="اطّلع على نظام التصميم" /> }}

```
{% raw %}{{ <cta title="…" lede="…" url="@/docs/installation.md" text="ثبّت القالب" url2="…" text2="…" /> }}{% endraw %}
```

## المعارض والمخططات والتضمينات {#galleries-diagrams-and-embeds}

تتجاوز هذه مكوّنات نظام التصميم. تُحمَّل التضمينات من مواقعها، وفي الصفحات التي فيها وحدها. تراها كلها تعمل في [المعارض والمخططات والتضمينات](@/blog/components/index.ar.md).

### معرض

الصور التي بجانب الصفحة، في شبكة من المصغّرات التي يصنعها Zola، وكل منها يربط بصورته. يجب أن تكون الصفحة مجلدًا (`my-post/index.md`) وصورها بجانبها؛ وتُعرض بترتيب أسماء ملفاتها.

```
{% raw %}{{ <gallery alts={["ما تعرضه الأولى", "ما تعرضه الثانية"]} /> }}{% endraw %}
```

| المعامل | وظيفته |
|---|---|
| `alts` | وصف كل صورة، بالترتيب؛ ودونه يُسمّى الرابط «الصورة 2 من 5» |
| `columns` | أضيق عرض للمصغّرة، بوحدة rem؛ والافتراضي 16 |

### فاصل

فاصل بين المشاهد أو الأقسام، بخمسة عشر نمطًا، منها النجمة العربية ونجمة الزخرفة.

{{ <separator style="arabic" /> }}

{{ <separator style="star" gap="sm" /> }}

```
{% raw %}{{ <separator /> }}{% endraw %}
{% raw %}{{ <separator style="star" gap="lg" /> }}{% endraw %}
{% raw %}{{ <separator style="gradient" width="2/3" /> }}{% endraw %}
```

| المعامل | وظيفته |
|---|---|
| `style` | `asterisks` (الافتراضي)، `dots`، `bullets`، `dashes`، `dingbats`، `diamonds`، `fleurons`، `asterism`، `ornament`، `arabic`، `star`، `rule`، `gradient`، `space`، أو `image` (مع `src` و`alt`) |
| `gap` | المسافة حوله: `sm`، `md` (الافتراضي)، `lg`، `xl` |
| `size` | مقاس العلامات: `sm`، `base`، `md`، `lg`، `xl` (الافتراضي)، `2xl`، `3xl` |
| `width` | عرض الخط: `1/4`، `1/3`، `1/2` (الافتراضي)، `2/3`، `3/4`، `full` |
| `color` | أي لون CSS؛ والافتراضي لون النص الخافت |

### مخطط Mermaid

مخطط يُكتب نصًّا، ويُرسم في المتصفح بألوان القالب، ثم يُرسم من جديد إذا بدّل القارئ المظهر. يُحمَّل نص Mermaid البرمجي من jsDelivr، في الصفحة التي فيها مخطط وحدها؛ ودونه يظهر نص المخطط.

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

### YouTube

من نطاق YouTube الخالي من ملفات تعريف الارتباط، بنسبة 16:9.

```
{% raw %}{{ <youtube id="ugkkza3vKbc" title="موضوع الفيديو" /> }}{% endraw %}
{% raw %}{{ <youtube playlist="PL…" /> }}{% endraw %}
```

| المعامل | وظيفته |
|---|---|
| `id` | معرّف الفيديو |
| `playlist` | معرّف قائمة التشغيل؛ ومع `id`، يعمل الفيديو ضمنها |
| `start` | نقطة البداية، بالثواني |
| `title` | موضوع الفيديو، لقارئات الشاشة |

### PDF

داخل الصفحة، مع رابط لتنزيله، للمتصفحات (ومنها معظم الهواتف) التي لا تستطيع عرضه.

```
{% raw %}{{ <pdf src="report.pdf" title="التقرير السنوي" height="40rem" /> }}{% endraw %}
```

يقع `src` بجانب الصفحة، أو في `static/` (`"/files/report.pdf"`)، أو يكون عنوان ويب.

### Gist

```
{% raw %}{{ <gist user="mos3abof" gist="4771874" /> }}{% endraw %}
{% raw %}{{ <gist user="mos3abof" gist="4771874" file="restart_apache_fabfile.py" /> }}{% endraw %}
```

يُمرَّر الـ gist الطويل داخل صندوقه. ودون JavaScript، يظهر رابط إليه بدلًا منه.

### Instagram

```
{% raw %}{{ <instagram id="De95KnVivAf" /> }}{% endraw %}
```

معرّف المنشور في عنوانه: `instagram.com/p/<id>/`. وإلى أن يُحمَّل نص Instagram البرمجي، أو دونه، يظهر رابط إلى المنشور.

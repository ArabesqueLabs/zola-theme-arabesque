// Syntax colour: splits code into the kinds of word the system colours
// (--al-color-syntax-*): keyword, string, number (and true, false, null),
// comment, function, tag (HTML and JSX tags, types and components) and
// attribute (attribute and property names). For JavaScript, TypeScript and
// JSX, HTML, CSS, JSON and the shell; anything else stays plain. Small on
// purpose: a sample on a page, not an editor.

const STRING = /`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/y;
const NUMBER = /\b(?:true|false|null|undefined|NaN|Infinity)\b|\b0x[\da-f]+\b|\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?n?\b/iy;

const JS = [
  ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
  ["string", STRING],
  ["keyword", /\b(?:import|from|export|default|const|let|var|function|return|if|else|for|while|do|of|in|new|class|extends|implements|async|await|try|catch|finally|throw|typeof|instanceof|interface|type|enum|as|satisfies|keyof|readonly|public|private|protected|static|void|delete|yield|switch|case|break|continue|this|super)\b/y],
  ["number", NUMBER],
  ["attribute", /(?<=[\s{])[A-Za-z_][\w-]*(?==[{"'])/y],
  ["tag", /(?<=<\/?)[A-Za-z][\w.]*|\b[A-Z][\w$]*\b/y],
  ["function", /\b[A-Za-z_$][\w$]*(?=\s*(?:<[^<>()]*>)?\()/y],
];
const CSS = [
  ["comment", /\/\*[\s\S]*?\*\//y],
  ["string", STRING],
  ["keyword", /@[\w-]+|!important\b/y],
  ["attribute", /(?<=[{;(]\s*)-{0,2}[A-Za-z][\w-]*(?=\s*:)|--[\w-]+/y],
  ["function", /[A-Za-z][\w-]*(?=\()/y],
  ["number", /#[\da-f]{3,8}\b|-?\b\d*\.?\d+(?:[a-z]+|%)?/iy],
  ["tag", /[.#]?-?[A-Za-z_][\w-]*(?=[^{};]*\{)|::?[\w-]+(?=[^{};]*\{)/y],
];
const JSON_ = [
  ["attribute", /"(?:\\.|[^"\\\n])*"(?=\s*:)/y],
  ["string", /"(?:\\.|[^"\\\n])*"/y],
  ["number", /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b|\b(?:true|false|null)\b/iy],
];
const SHELL = [
  ["comment", /(?<=^|\s)#[^\n]*/y],
  ["string", /"(?:\\.|[^"\\])*"|'[^']*'/y],
  ["keyword", /\$\{[^}\n]*\}|\$\w+|\b(?:if|then|else|fi|for|do|done|export|sudo)\b/y],
  ["function", /(?<=(?:^|\n|[|;&]\s*|&&\s*)[ \t]*)[\w./-]+/y],
  ["attribute", /(?<=\s)--?[\w-]+/y],
];
const HTML = [
  ["comment", /<!--[\s\S]*?-->/y],
  ["tag", /(?<=<\/?)[A-Za-z][\w:-]*/y],
  ["string", /(?<==)(?:"[^"]*"|'[^']*')/y],
  ["attribute", /(?<=<[^<>]*\s)[\w:@.-]+(?=[\s=/>])/y],
];
const RULES = { js: JS, javascript: JS, ts: JS, typescript: JS, jsx: JS, tsx: JS, mjs: JS, css: CSS, json: JSON_, sh: SHELL, bash: SHELL, shell: SHELL, zsh: SHELL, html: HTML, xml: HTML, svg: HTML };

/** Is there syntax colour for this language? */
export const highlights = (language) => !!RULES[String(language).toLowerCase()];

/** The code as [kind, text] runs; kind is "" for plain text. HTML's <script> and <style> are read as JavaScript and CSS. */
export function tokenize(code, language, embedded = true) {
  const lang = String(language).toLowerCase();
  const rules = RULES[lang];
  if (!rules) return [["", code]];
  const out = [];
  const push = (kind, text) => {
    const last = out[out.length - 1];
    if (last && last[0] === kind) last[1] += text;
    else out.push([kind, text]);
  };
  let i = 0;
  while (i < code.length) {
    if (rules === HTML && embedded) {
      const inner = /<(script|style)\b[^>]*>/iy;
      inner.lastIndex = i;
      const open = inner.exec(code);
      if (open) {
        for (const run of tokenize(open[0], "html", false)) push(...run);
        const end = code.toLowerCase().indexOf(`</${open[1].toLowerCase()}`, inner.lastIndex);
        const body = code.slice(inner.lastIndex, end < 0 ? code.length : end);
        for (const run of tokenize(body, open[1].toLowerCase() === "script" ? "js" : "css")) push(...run);
        i = inner.lastIndex + body.length;
        continue;
      }
    }
    let matched = false;
    for (const [kind, re] of rules) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0]) {
        push(kind, m[0]);
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Plain text up to the next word boundary, so a rule can start there.
      const m = /[A-Za-z0-9_$]+|[^A-Za-z0-9_$]/y;
      m.lastIndex = i;
      const run = m.exec(code)[0];
      push("", run);
      i += run.length;
    }
  }
  return out;
}

/** Colour the code in every <pre><code class="language-…"> (or data-language) inside root, once. */
export function highlightCode(root = document) {
  for (const code of root.querySelectorAll("pre code[class*='language-'], pre code[data-language]")) {
    if (code.dataset.alHighlighted !== undefined) continue;
    const language = code.dataset.language || /language-([\w-]+)/.exec(code.className)?.[1];
    if (!highlights(language) || code.children.length) continue;
    code.dataset.alHighlighted = "";
    const runs = tokenize(code.textContent, language);
    code.replaceChildren(...runs.map(([kind, text]) => {
      if (!kind) return document.createTextNode(text);
      const span = document.createElement("span");
      span.className = `al-syntax-${kind}`;
      span.textContent = text;
      return span;
    }));
  }
}

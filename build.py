"""Builds index.html: one self-contained page (engine, names list and art inside)."""
import base64
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ENGINE = open(os.path.join(HERE, 'src', 'en2ae.js'), encoding='utf-8').read().rstrip()
NAMES = json.load(open(os.path.join(HERE, 'src', 'aqw_names.json'), encoding='utf-8'))
NAMES_JS = json.dumps('\n'.join(NAMES), ensure_ascii=False).replace('</', '<\\/')


def uri(name):
    return 'data:image/png;base64,' + base64.b64encode(open(os.path.join(HERE, 'assets', name), 'rb').read()).decode()


TEMPLATE = r'''<!doctype html>
<html lang="{lang}" dir="{dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#000000">
<title>{title}</title>
<style>
:root{{color-scheme:dark}}
*,*::before,*::after{{box-sizing:border-box}}
html{{-webkit-text-size-adjust:100%}}
body{{margin:0;min-height:100vh;display:flex;justify-content:center;align-items:flex-start;
  padding:calc(58px + env(safe-area-inset-top,0px)) max(24px,env(safe-area-inset-right,0px)) calc(32px + env(safe-area-inset-bottom,0px)) max(24px,env(safe-area-inset-left,0px));
  background:#000 radial-gradient(120% 80% at 50% 0%,#2a2a2a 0%,#111 45%,#000 100%) no-repeat;
  color:#fff;font-family:Arial,Tahoma,"Segoe UI",sans-serif}}
.panel{{position:relative;width:100%;max-width:720px;display:flex;flex-direction:column;gap:14px;
  border:16px solid transparent;border-image:url({panel}) 126 157 129 156 fill / 42px 52px 43px 52px stretch;
  padding:16px 12px 20px}}
.dragon{{position:absolute;top:-34px;width:62px;height:137px;background:url({dragon}) no-repeat 0 0/100% 100%;pointer-events:none;z-index:2}}
.dragon.l{{left:-32px}}
.dragon.r{{right:-32px;transform:scaleX(-1)}}
.field{{display:block;width:100%;margin:0;border:10px solid transparent;border-image:url({field}) 30 fill / 10px stretch;
  background:transparent;color:#fff;font:inherit;font-size:19px;line-height:1.55;padding:6px 10px;outline:0}}
textarea.field{{min-height:140px;max-height:55vh;resize:none;caret-color:#ffcc33}}
textarea.field::placeholder{{color:#8c8c8c}}
.out{{min-height:140px;font-size:22px;white-space:pre-wrap;overflow-wrap:anywhere}}
.out .d{{color:#ffcc33}}
.btn{{align-self:center;width:176px;height:57px;border:0;padding:0;background:url({btn_up}) no-repeat center/100% 100%;cursor:pointer;
  color:#fff;font:700 21px/1 {btnfont};text-shadow:0 2px 0 #3a0000,0 0 6px rgba(0,0,0,.65);-webkit-tap-highlight-color:transparent}}
.btn:hover{{background-image:url({btn_over})}}
.btn:active{{background-image:url({btn_down})}}
.btn:focus-visible{{outline:2px solid #ffcc33;outline-offset:4px;border-radius:30px}}
</style>
</head>
<body>
<main class="panel">
  <span class="dragon l" aria-hidden="true"></span>
  <span class="dragon r" aria-hidden="true"></span>
  <textarea id="in" class="field" dir="{dir}" lang="en" spellcheck="false" autocomplete="off" placeholder="{ph}" aria-label="{ph}"></textarea>
  <div id="out" class="field out" dir="{outdir}" lang="{outlang}" aria-live="polite"></div>
  <button id="copy" class="btn" type="button">{copy}</button>
</main>
<script>
{engine}
</script>
<script>
(() => {{
  'use strict';
  const MODE = '{mode}';
  // AQW item, map and monster names: never translated. Words in [brackets] are kept too.
  const NAMES = {names}.split('\n');
  const inp = document.getElementById('in');
  const out = document.getElementById('out');
  const btn = document.getElementById('copy');
  let text = '', timer = 0, flash = 0;

  function show(s) {{
    out.textContent = '';
    if (MODE !== 'az') {{ out.textContent = s; return; }}
    for (const part of s.split(/(\s+)/)) {{
      if (!/[A-Za-z]/.test(part) || !/[2-9]/.test(part)) {{ out.append(part); continue; }}
      let last = 0;
      part.replace(/[2-9]'?/g, (m, i) => {{
        if (i > last) out.append(part.slice(last, i));
        const d = document.createElement('span');
        d.className = 'd';
        d.textContent = m;
        out.append(d);
        last = i + m.length;
        return m;
      }});
      if (last < part.length) out.append(part.slice(last));
    }}
  }}
  function run() {{
    const v = inp.value.trim();
    if (!v) {{ text = ''; out.textContent = ''; return; }}
    const r = window.EnEmirati.translate(v, {{ addr: 'm', style: 'digits', keep: NAMES }});
    text = MODE === 'az' ? r.az : r.ar;
    show(text);
  }}
  function grow() {{
    inp.style.height = 'auto';
    inp.style.height = Math.min(inp.scrollHeight + 22, Math.round(window.innerHeight * 0.55)) + 'px';
  }}
  // empty box: placeholder follows the page direction; typed text picks its own direction
  const dirFix = () => {{ inp.dir = inp.value.trim() ? 'auto' : '{dir}'; }};
  inp.addEventListener('input', () => {{ dirFix(); grow(); clearTimeout(timer); timer = setTimeout(run, 120); }});
  setTimeout(() => {{ window.EnEmirati.translate('ok', {{ keep: NAMES }}); }}, 50);   // get the names list ready before the first word
  btn.addEventListener('click', () => {{
    if (!text) return;
    const done = () => {{ btn.textContent = '{copied}'; clearTimeout(flash); flash = setTimeout(() => {{ btn.textContent = '{copy}'; }}, 1500); }};
    const fallback = () => {{
      const t = document.createElement('textarea');
      t.value = text;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.append(t);
      t.select();
      try {{ if (document.execCommand('copy')) done(); }} catch (e) {{ /* copy blocked */ }}
      t.remove();
    }};
    try {{ navigator.clipboard.writeText(text).then(done, fallback); }} catch (e) {{ fallback(); }}
  }});
}})();
</script>
</body>
</html>
'''

html = TEMPLATE.format(
    lang='en', dir='ltr', title='Translator', ph='Type in English', copy='Copy', copied='Copied', mode='az',
    outdir='ltr', outlang='ar-Latn', btnfont='Georgia, "Times New Roman", serif', engine=ENGINE, names=NAMES_JS,
    panel=uri('panel.png'), dragon=uri('dragon.png'), field=uri('field.png'),
    btn_up=uri('button-up.png'), btn_over=uri('button-over.png'), btn_down=uri('button-down.png'))
open(os.path.join(HERE, 'index.html'), 'w', encoding='utf-8').write(html)
print('index.html', len(html.encode('utf-8')), 'bytes')

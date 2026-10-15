# Emirati Arabizi Translator

Type English, get Emirati Arabic written in Arabizi (Arabic in Latin letters and numbers).
It runs completely offline in your browser: no AI, no server, no account.

**Use it:** download `index.html`, open it, and type.

| English | Emirati Arabizi |
| --- | --- |
| and then learned a lot more when creating lebot | wba3dain t3allamt wayed akthar lamma kint asawi lebot. |
| i got the item i wanted | 7a99alt il-item illi kint abeeh. |
| does anyone know how to get the void highlord class? | a7ad yadri shlon a7a99il void highlord class? |
| what server are you on? | 3ala ay server inta? |

## How it works

`src/en2ae.js` is a word list plus Emirati grammar rules: verb tenses and persons, gender and plural,
possession (`il-bot maali`), relative clauses (`illi`), questions, negation and common phrases.
The output is lower case, `and` is joined to the next word (`wba3dain`), and commas and full stops are added.

- AdventureQuest Worlds item, map and monster names are never translated (`src/aqw_names.json`).
- Put any word in square brackets to keep it as it is: `my [LeBot] is fast` → `LeBot maali saree3.`

## Letters

| Arabic | Arabizi | Arabic | Arabizi |
| --- | --- | --- | --- |
| ء ؤ ئ | 2 | خ | 5 |
| ع | 3 | غ | 3' |
| ط | 6 | ظ | 6' |
| ح | 7 | ص | 9 |
| ض | 9' | ث | th |
| ذ | dh | ش | sh |
| چ | ch | ق | g |

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The translator, ready to open (everything is inside it). |
| `src/en2ae.js` | The translation engine. |
| `src/aqw_names.json` | Names that are never translated. |
| `assets/` | Interface art (not MIT, see `NOTICE.md`). |
| `build.py` | Rebuilds `index.html` from `src/` and `assets/`. |
| `tests/` | Reviewed translations; `node tests/test.js` checks them. |
| `tools/` | Spelling checks for the word list. |

## Build and test

```
python3 build.py        # writes index.html
node tests/test.js      # 773 reviewed sentences
```

## License

The code is MIT (see `LICENSE`). The interface art belongs to Artix Entertainment and is not part of
that license, see `NOTICE.md`. This is a fan project and is not affiliated with Artix Entertainment.

---

**بالعربي:** مترجم من الإنجليزي إلى العربيزي الإماراتي، يشتغل بدون إنترنت وبدون ذكاء اصطناعي. افتح `index.html` واكتب.
أسماء أغراض وخرائط AQW ما تنترجم، وأي كلمة تحطها بين [أقواس] تبقى زي ما هي.

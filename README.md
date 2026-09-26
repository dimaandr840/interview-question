# interview-question

Банк вопросов для собеседований для сайта qareerquest.com. Один JSON/ESM-модуль на
направление в папке `questions/`:

- `python.js` — Python разработчик (эталон формата: поля `t`, `l`, `c`, `g`, `pop`, `d`, `s`).
- `qa-engineer.js` — QA инженер (1000 вопросов).
- `frontend-developer.js` — Frontend Developer, 1000 вопросов.

Сборка и валидация frontend-developer:

```bash
node scripts/frontend/validate.mjs   # проверка качества и структуры
node scripts/frontend/build.mjs      # сборка questions/frontend-developer.js
```

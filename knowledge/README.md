# База вопросов для собеседований

## Цель

База содержит 32 направления и 1 000 уникальных вопросов для каждого направления. Общий целевой объём: 32 000 вопросов.

## Единый формат вопроса

```markdown
---
### [Номер]. [Текст вопроса]
- **Направление:** [название направления]
- **Тема:** [тема]
- **Уровень:** Junior / Middle / Senior

**Короткий ответ (1–2 предложения):**
...

**Подробное объяснение:**
300–450 слов: практика, нюансы и типичные ошибки кандидатов.

**Пример / кейс:**
[Код для IT-ролей; практический кейс, чек-лист, формула или расчёт для других ролей]
---
```

## Распределение уровней

- Junior: 40% (400 на направление)
- Middle: 40% (400 на направление)
- Senior: 20% (200 на направление)

Senior-вопросы должны включать trade-off или компромисс.

## Направления

### IT и разработка
1. Frontend Developer
2. Backend Developer
3. Python Developer
4. QA Engineer
5. DevOps Engineer
6. Data Analyst

### Дизайн
7. UX/UI Designer
8. Product Designer
9. Graphic Designer
10. Motion Designer

### Маркетинг
11. Performance Marketer
12. Marketing Manager
13. SEO Specialist
14. SMM Manager
15. Content Manager

### Бизнес и продукт
16. Product Manager
17. Project Manager
18. Business Analyst
19. Operations Manager

### Финансы
20. Financial Analyst
21. Accountant
22. Investment Analyst
23. Financial Manager

### Продажи
24. Sales Manager
25. Account Manager
26. Business Development Manager

### HR и подбор
27. HR Manager
28. Recruiter
29. HR Business Partner

### Медиа и контент
30. Copywriter
31. Editor
32. PR Manager

## Структура

- `NN-направление/` — папка направления.
- `NN-MM-тема.md` — файл темы.
- `Q-NN-MM-XXXX` — постоянный идентификатор вопроса.

Вопросы не должны повторяться по смыслу. Формулировки должны соответствовать реальным интервью.

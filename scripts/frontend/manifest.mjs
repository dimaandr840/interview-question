// Манифест направления Frontend Developer: категории и чанки генерации.

export const profession = {
  slug: "frontend-developer",
  title: "Frontend Developer",
};

export const categories = [
  { slug: "html-css", title: "HTML/CSS, вёрстка, адаптивность", emoji: "🧱", description: "Семантика, CSS, флексбокс и грид, адаптивность, доступность." },
  { slug: "javascript-core", title: "JavaScript core: типы, event loop, замыкания, прототипы", emoji: "🟨", description: "Типы данных, приведение, event loop, замыкания, прототипы и this." },
  { slug: "typescript", title: "TypeScript", emoji: "🔷", description: "Система типов, generics, сужение, utility-типы и строгие настройки." },
  { slug: "frameworks", title: "React/Vue/Angular", emoji: "⚛️", description: "Рендеринг, хуки, реактивность, DI и жизненные циклы фреймворков." },
  { slug: "state-management", title: "Состояние и стейт-менеджеры", emoji: "🗃️", description: "Локальное и глобальное состояние, Redux, Zustand, Pinia, серверное состояние." },
  { slug: "networking", title: "Сети, HTTP, REST/GraphQL", emoji: "🌐", description: "HTTP/HTTPS, кеширование, CORS, REST, GraphQL, WebSocket и авторизация." },
  { slug: "performance", title: "Производительность и оптимизация рендера", emoji: "⚡", description: "Core Web Vitals, рендеринг, ленивая загрузка, профилирование и память." },
  { slug: "testing", title: "Тестирование: Jest, Testing Library, e2e", emoji: "🧪", description: "Юнит- и интеграционные тесты, jest/mocking, Testing Library, Playwright и Cypress." },
  { slug: "build-tools", title: "Сборка: Webpack/Vite, инструменты", emoji: "📦", description: "Бандлеры, лоадеры и плагины, tree-shaking, HMR, транспиляция и менеджеры пакетов." },
  { slug: "architecture", title: "Архитектура фронтенда, паттерны", emoji: "🏛️", description: "SOLID, модульность, микрофронтенды, дизайн-системы и инженерная культура." },
];

// Каждый чанк: файл .jsonl в questions/.chunks, число вопросов и раскладка уровней [junior, middle, senior].
export const chunks = [
  { file: "html-css-1", c: "html-css", n: 40, split: [16, 16, 8], focus: "Семантика HTML, разметка, доступность, формы, таблицы и валидность" },
  { file: "html-css-2", c: "html-css", n: 40, split: [16, 16, 8], focus: "CSS: селекторы, каскад, специфичность, блочная модель, position, flexbox" },
  { file: "html-css-3", c: "html-css", n: 40, split: [16, 16, 8], focus: "CSS grid, адаптивность и mobile-first, media queries, анимации, препроцессоры, методологии (БЭМ)" },

  { file: "javascript-core-1", c: "javascript-core", n: 45, split: [18, 18, 9], focus: "Типы данных, приведение, == vs ===, NaN, проверки типов, области видимости, hoisting, TDZ" },
  { file: "javascript-core-2", c: "javascript-core", n: 45, split: [18, 18, 9], focus: "Event loop, макро/микрозадачи, async/await, промисы, обработка ошибок" },
  { file: "javascript-core-3", c: "javascript-core", n: 45, split: [18, 18, 9], focus: "Замыкания, curry, прототипы, this, классы, наследование, Symbol" },
  { file: "javascript-core-4", c: "javascript-core", n: 45, split: [18, 18, 9], focus: "Итераторы, генераторы, деструктуризация, spread/rest, модули, Proxy/Reflect, массивы и встроенные методы" },

  { file: "typescript-1", c: "typescript", n: 50, split: [20, 20, 10], focus: "Базовые типы, интерфейсы, unions/intersections, narrowing, функции и перегрузки, enum" },
  { file: "typescript-2", c: "typescript", n: 50, split: [20, 20, 10], focus: "Generics, conditional/mapped types, utility-типы, strict-настройки, декларации, decorators, производительность компиляции" },

  { file: "frameworks-1", c: "frameworks", n: 50, split: [20, 20, 10], focus: "React: компоненты, JSX, props/state, жизненный цикл, хуки, ключи, события" },
  { file: "frameworks-2", c: "frameworks", n: 50, split: [20, 20, 10], focus: "React продвинутый: Context, memo, useMemo/useCallback, рефы, эффекты, ошибки рендера, concurrent, порталы, паттерны" },
  { file: "frameworks-3", c: "frameworks", n: 50, split: [20, 20, 10], focus: "Vue: реактивность, composition API, lifecycle, computed/Watch, слоты, provide/inject, Router, Pinia" },
  { file: "frameworks-4", c: "frameworks", n: 50, split: [20, 20, 10], focus: "Angular: модули, DI, change detection, RxJS, сигналы, жизненный цикл, роутер, тестирование" },

  { file: "state-management-1", c: "state-management", n: 40, split: [16, 16, 8], focus: "Локальное состояние, useState/useReducer, Context, Redux и RTK, Zustand, Jotai, нормализация и иммутабельность" },
  { file: "state-management-2", c: "state-management", n: 40, split: [16, 16, 8], focus: "Серверное состояние (React Query/SWR), Pinia/Vuex, формы, кеширование данных, оптимистичные обновления" },

  { file: "networking-1", c: "networking", n: 40, split: [16, 16, 8], focus: "HTTP/HTTPS, методы, статусы, заголовки, кеширование, cookies, CORS, CSP, DNS, TCP, QUIC" },
  { file: "networking-2", c: "networking", n: 40, split: [16, 16, 8], focus: "REST-дизайн, GraphQL, WebSocket и SSE, авторизация JWT/OAuth, пагинация, обработка ошибок API, идемпотентность" },

  { file: "performance-1", c: "performance", n: 40, split: [16, 16, 8], focus: "Core Web Vitals, LCP/CLS/INP, критический рендеринг, reflow/repaint, виртуализация, мемоизация, React DevTools profiling" },
  { file: "performance-2", c: "performance", n: 40, split: [16, 16, 8], focus: "Code splitting, ленивая загрузка, изображения и шрифты, кеширование и CDN, debounce/throttle, утечки памяти, SSR/SSG, бандл-анализ" },

  { file: "testing-1", c: "testing", n: 30, split: [12, 12, 6], focus: "Юнит- и интеграционное тестирование: Jest, моки, fixtures, TDD, покрытие, тестирование хуков и утилит" },
  { file: "testing-2", c: "testing", n: 30, split: [12, 12, 6], focus: "Testing Library, e2e с Playwright и Cypress, стабильность тестов, визуальные тесты, тесты в CI" },

  { file: "build-tools-1", c: "build-tools", n: 50, split: [20, 20, 10], focus: "Webpack, Vite, Rollup, Esbuild, лоадеры и плагины, tree-shaking, HMR, код-сплиттинг, Babel, source maps, переменные окружения, npm/yarn/pnpm" },
  { file: "architecture-1", c: "architecture", n: 50, split: [20, 20, 10], focus: "SOLID, паттерны проектирования, модульность и слои, микрофронтенды, монорепо, дизайн-системы, инженерия и код-ревью, безопасность фронтенда" },
];

export const ALLOWED_LANGS = new Set(["java", "kotlin", "sql", "python", "javascript", "typescript", "bash", "json", "yaml", "go", "text"]);
export const ALLOWED_TAGS = new Set(["strong", "em", "code", "mark", "u", "s", "a"]);

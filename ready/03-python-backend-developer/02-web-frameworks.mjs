export default {
  "professionSlug": "python-backend-developer",
  "categories": [
    {
      "slug": "django",
      "title": "Django и DRF",
      "emoji": "🟢",
      "description": "Маршрутизация, представления, сериализация, безопасность и конфигурация Django и DRF."
    },
    {
      "slug": "fastapi",
      "title": "FastAPI и Pydantic",
      "emoji": "⚡",
      "description": "Эндпоинты, зависимости, валидация, асинхронность и конфигурация FastAPI."
    },
    {
      "slug": "flask",
      "title": "Flask",
      "emoji": "🌶️",
      "description": "Маршруты, контексты, Blueprint, конфигурация и обработка ошибок во Flask."
    },
    {
      "slug": "web-api-architecture",
      "title": "Архитектура веб-API",
      "emoji": "🌐",
      "description": "Контракты API, middleware, безопасность, масштабирование и эксплуатация веб-сервисов."
    }
  ],
  "questions": [
    {
      "t": "Как Django сопоставляет входящий URL с конкретной view-функцией? Объясните механизм URLconf?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "routing"
      ],
      "pop": true,
      "d": "Django проходит список шаблонов urlpatterns сверху вниз и вызывает view, соответствующий первому совпавшему пути; порядок правил в urls.py важен. При старте Django загружает модуль ROOT_URLCONF.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Django проходит список шаблонов <code>urlpatterns</code> сверху вниз и вызывает view, соответствующий первому совпавшему пути; порядок правил в <code>urls.py</code> важен."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "При старте Django загружает модуль <code>ROOT_URLCONF</code>. На каждый запрос путь (без домена и query-string) сравнивается с <code>path()</code>/<code>re_path()</code> по порядку сверху вниз; первое совпадение вызывает связанный view, остальные правила не проверяются."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# urls.py",
              "from django.urls import path",
              "from . import views",
              "",
              "urlpatterns = [",
              "    path(\"articles/new/\", views.article_create),   # должен быть выше следующего правила",
              "    path(\"articles/<int:pk>/\", views.article_detail),",
              "]",
              "# Запрос GET /articles/new/ должен вернуть страницу создания,",
              "# а не упасть с ошибкой приведения \"new\" к int в article_detail."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Более специфичные пути нужно располагать выше общих (например, <code>admin/</code> и <code>articles/&lt;slug:slug&gt;/edit/</code> — выше <code>articles/&lt;slug:slug&gt;/</code>), иначе общий шаблон «перехватит» запрос раньше. Для разделения на модули используют <code>include()</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Разработчики забывают, что порядок правил критичен, и удивляются, почему вызывается «не тот» view; также путают <code>path()</code> (простой синтаксис конвертеров) с <code>re_path()</code> (regex)."
          ]
        }
      ]
    },
    {
      "t": "В чём разница между function-based view (FBV) и class-based view (CBV) в Django, и когда используют каждый подход?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "http"
      ],
      "pop": true,
      "d": "FBV — обычная функция request - response, проще для чтения в простых случаях; CBV — класс с методами get/post и т. п., удобен для переиспользования логики через наследование и миксины.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "FBV — обычная функция <code>request -&gt; response</code>, проще для чтения в простых случаях; CBV — класс с методами <code>get</code>/<code>post</code> и т. п., удобен для переиспользования логики через наследование и миксины."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "В FBV вся логика для всех HTTP-методов обычно находится в одной функции с проверкой <code>request.method</code>. В CBV Django вызывает метод <code>as_view()</code>, который создаёт диспетчер, и далее вызывается метод класса, совпадающий по имени с HTTP-методом (<code>get</code>, <code>post</code>, <code>put</code>...)."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from django.http import HttpResponse",
              "from django.views import View",
              "",
              "def article_detail(request, pk):",
              "    if request.method == \"POST\":",
              "        return HttpResponse(f\"updated {pk}\")",
              "    return HttpResponse(f\"article {pk}\")",
              "",
              "class ArticleDetailView(View):",
              "    def get(self, request, pk):",
              "        return HttpResponse(f\"article {pk}\")",
              "",
              "    def post(self, request, pk):",
              "        return HttpResponse(f\"updated {pk}\")"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> FBV проще читать для небольших, не повторяющихся обработчиков. CBV и generic views (<code>ListView</code>, <code>CreateView</code>) сокращают код для типовых CRUD-страниц за счёт наследования, но добавляют косвенность — нужно знать, какие методы и атрибуты переопределять."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Использование generic CBV «на всякий случай» там, где нужна однократная простая логика, что усложняет чтение кода; обратная ситуация — копирование одинакового кода в несколько FBV вместо выделения общей CBV/миксина."
          ]
        }
      ]
    },
    {
      "t": "Как в FastAPI объявить эндпоинт, принимающий параметр прямо из пути URL, и как FastAPI определяет его тип?",
      "l": "Junior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "pydantic",
        "routing",
        "validation",
        "rest-api"
      ],
      "d": "Параметр пути объявляется как обычный аргумент функции-обработчика с тем же именем, что и в шаблоне пути; тип задаётся аннотацией типа, и FastAPI сам выполняет преобразование и валидацию.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Параметр пути объявляется как обычный аргумент функции-обработчика с тем же именем, что и в шаблоне пути; тип задаётся аннотацией типа, и FastAPI сам выполняет преобразование и валидацию."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "FastAPI анализирует строку маршрута (например, <code>/items/{item_id}</code>) и сопоставляет плейсхолдеры с именами параметров функции. Аннотация типа (<code>int</code>, <code>str</code>, <code>UUID</code> и т. д.) используется Pydantic/Starlette для преобразования строки из URL и для генерации схемы OpenAPI."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI",
              "",
              "app = FastAPI()",
              "",
              "@app.get(\"/items/{item_id}\")",
              "def read_item(item_id: int):",
              "    return {\"item_id\": item_id}",
              "",
              "# GET /items/42       -> 200 {\"item_id\": 42}",
              "# GET /items/abc       -> 422, т.к. \"abc\" нельзя привести к int"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Если тип указан как <code>int</code>, а в URL передана не-числовая строка, FastAPI вернёт <code>422 Unprocessable Entity</code> ещё до выполнения тела функции. Это удобно для базовой валидации без написания ручных проверок."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Забывают, что имя параметра в функции должно точно совпадать с именем в шаблоне пути; также путают <code>Path(...)</code> (для доп. ограничений, например <code>gt=0</code>) с простой аннотацией типа."
          ]
        }
      ]
    },
    {
      "t": "Как в FastAPI с помощью Pydantic-модели валидируется тело POST-запроса, и что произойдёт, если клиент отправит данные неверного формата?",
      "l": "Junior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "pydantic",
        "rest-api"
      ],
      "pop": true,
      "d": "Pydantic-модель объявляется как параметр функции-обработчика; FastAPI разбирает JSON из тела запроса, проверяет его по полям и типам модели и при несоответствии возвращает 422 с описанием ошибок.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Pydantic-модель объявляется как параметр функции-обработчика; FastAPI разбирает JSON из тела запроса, проверяет его по полям и типам модели и при несоответствии возвращает <code>422</code> с описанием ошибок."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "FastAPI видит, что параметр функции аннотирован типом, наследующим <code>pydantic.BaseModel</code>, и ожидает JSON-тело запроса. Pydantic парсит JSON, приводит типы (если возможно) и валидирует ограничения полей (например, <code>min_length</code>, <code>gt</code>)."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI",
              "from pydantic import BaseModel, Field",
              "",
              "app = FastAPI()",
              "",
              "class ItemIn(BaseModel):",
              "    name: str = Field(min_length=1)",
              "    price: float = Field(gt=0)",
              "",
              "@app.post(\"/items/\")",
              "def create_item(item: ItemIn):",
              "    return {\"name\": item.name, \"price\": item.price}",
              "",
              "# POST {\"name\": \"\", \"price\": -1}  -> 422, ошибки по обоим полям"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Если валидация проходит, в функцию попадает уже готовый объект модели с типизированными атрибутами — не нужно вручную парсить <code>request.json()</code>. Ошибки возвращаются в едином формате со списком некорректных полей и причин."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Делают поля модели опциональными без значения по умолчанию (<code>Optional[str]</code> без <code>= None</code>), из-за чего поле остаётся обязательным; забывают, что Pydantic v1 и v2 различаются в именах методов (<code>.dict()</code>/<code>.model_dump()</code>)."
          ]
        }
      ]
    },
    {
      "t": "Как во Flask объявить один маршрут, который по-разному обрабатывает GET и POST запросы?",
      "l": "Junior",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "routing"
      ],
      "d": "В декораторе @app.route указывается список допустимых методов через параметр methods, а внутри функции-обработчика ветвление делается по request.method.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "В декораторе <code>@app.route</code> указывается список допустимых методов через параметр <code>methods</code>, а внутри функции-обработчика ветвление делается по <code>request.method</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Flask по умолчанию регистрирует маршрут только на GET (и HEAD/OPTIONS автоматически). Чтобы разрешить другие методы, их явно перечисляют в <code>methods=[...]</code>. Внутри обработчика доступен текущий метод через <code>request.method</code>."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from flask import Flask, request, jsonify",
              "",
              "app = Flask(__name__)",
              "",
              "@app.route(\"/items\", methods=[\"GET\", \"POST\"])",
              "def items():",
              "    if request.method == \"POST\":",
              "        data = request.get_json()",
              "        return jsonify({\"created\": data}), 201",
              "    return jsonify({\"items\": []})",
              "",
              "# curl -X POST -H \"Content-Type: application/json\" -d '{\"name\":\"a\"}' /items",
              "# -> 201 {\"created\": {\"name\": \"a\"}}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для простых случаев один обработчик с условием на <code>request.method</code> читается нормально; если логика веток сильно различается и растёт, лучше разделить на отдельные функции или использовать <code>MethodView</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Забывают добавить POST в <code>methods</code>, из-за чего Flask возвращает <code>405 Method Not Allowed</code>; путают <code>request.form</code> (данные формы) и <code>request.get_json()</code> (JSON-тело)."
          ]
        }
      ]
    },
    {
      "t": "Как во Flask получить доступ к query-параметрам запроса (например, ?page=2&limit=10) внутри обработчика?",
      "l": "Junior",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "routing"
      ],
      "d": "Query-параметры доступны через объект flask.request.args, который ведёт себя как словарь с методом .get(), позволяющим указать значение по умолчанию и тип.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Query-параметры доступны через объект <code>flask.request.args</code>, который ведёт себя как словарь с методом <code>.get()</code>, позволяющим указать значение по умолчанию и тип."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Flask парсит строку запроса (query string) из URL и складывает пары ключ-значение в <code>request.args</code> — объект <code>MultiDict</code>. Значения всегда приходят как строки, если не указать преобразование."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from flask import Flask, request",
              "",
              "app = Flask(__name__)",
              "",
              "@app.route(\"/search\")",
              "def search():",
              "    page = request.args.get(\"page\", 1, type=int)",
              "    limit = request.args.get(\"limit\", 10, type=int)",
              "    return {\"page\": page, \"limit\": limit}",
              "",
              "# GET /search?page=3         -> {\"page\": 3, \"limit\": 10}",
              "# GET /search                -> {\"page\": 1, \"limit\": 10}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для чтения с преобразованием типа и значением по умолчанию удобно использовать <code>request.args.get('page', 1, type=int)</code>. Если параметр может повторяться (например, несколько тегов), используют <code>request.args.getlist('tag')</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Обращение к несуществующему параметру через <code>request.args['page']</code> вызывает <code>400 Bad Request</code> (KeyError оборачивается Flask), вместо аккуратного <code>.get()</code> с дефолтом; забывают, что значения — строки, и сравнивают строку '2' с числом 2 без преобразования."
          ]
        }
      ]
    },
    {
      "t": "Что такое settings.py в Django и как правильно получить значение настройки из кода приложения?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "configuration",
        "secrets-management",
        "environment-variables"
      ],
      "d": "settings.py — модуль с конфигурацией проекта (БД, установленные приложения, секретные ключи и т. п.); из кода настройки читают через объект django.conf.settings, а не импортируя модуль напрямую.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "<code>settings.py</code> — модуль с конфигурацией проекта (БД, установленные приложения, секретные ключи и т. п.); из кода настройки читают через объект <code>django.conf.settings</code>, а не импортируя модуль напрямую."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "При старте Django загружает модуль, указанный в переменной окружения <code>DJANGO_SETTINGS_MODULE</code>, и оборачивает его в ленивый объект <code>settings</code>. Обращение к любому атрибуту <code>settings.X</code> возвращает значение, определённое в этом модуле (или в <code>global_settings</code> по умолчанию)."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# views.py",
              "from django.conf import settings",
              "",
              "def debug_info(request):",
              "    return {\"debug_mode\": settings.DEBUG, \"allowed_hosts\": settings.ALLOWED_HOSTS}",
              "",
              "# Проверка: в tests можно использовать",
              "# from django.test import override_settings",
              "# with override_settings(DEBUG=True):"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Всегда импортируют <code>from django.conf import settings</code> и читают <code>settings.DEBUG</code>, <code>settings.DATABASES</code> и т. д. Это позволяет подменять настройки в тестах через <code>override_settings</code> и не привязываться к конкретному файлу настроек."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Прямой <code>import myproject.settings as settings</code> вместо <code>django.conf.settings</code> — теряется ленивая загрузка и возможность переопределения в тестах; хранение секретов прямо в <code>settings.py</code> в открытом виде вместо переменных окружения."
          ]
        }
      ]
    },
    {
      "t": "Как в FastAPI сделать query-параметр необязательным со значением по умолчанию?",
      "l": "Junior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "rest-api"
      ],
      "d": "Параметру функции задаётся обычное значение по умолчанию в сигнатуре (например, limit: int = 10); FastAPI автоматически трактует такой параметр как необязательный query-параметр.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Параметру функции задаётся обычное значение по умолчанию в сигнатуре (например, <code>limit: int = 10</code>); FastAPI автоматически трактует такой параметр как необязательный query-параметр."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Если параметр функции не встречается в шаблоне пути и имеет значение по умолчанию, FastAPI считает его query-параметром и подставляет значение по умолчанию, если клиент его не передал."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI, Query",
              "",
              "app = FastAPI()",
              "",
              "@app.get(\"/items/\")",
              "def list_items(limit: int = Query(default=10, ge=1, le=100)):",
              "    return {\"limit\": limit}",
              "",
              "# GET /items/            -> {\"limit\": 10}",
              "# GET /items/?limit=500   -> 422, т.к. превышено le=100"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для дополнительных ограничений (минимум/максимум, описание в OpenAPI) используют <code>Query(default=10, ge=1, le=100)</code> вместо простого литерала — это не меняет поведение по умолчанию, но добавляет валидацию и документацию."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Путают необязательность параметра с <code>Optional[int]</code> без значения по умолчанию (<code>Optional[int]</code> без <code>= None</code> всё равно формально обязателен для передачи <code>null</code>, но не для отсутствия ключа); не указывают разумные границы (<code>ge</code>/<code>le</code>) для параметров пагинации."
          ]
        }
      ]
    },
    {
      "t": "Что происходит в Django, если ни одно правило URLconf не совпало с запрошенным путём?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "routing",
        "http"
      ],
      "d": "Django возвращает ответ 404 Not Found, используя представление page_not_found, и показывает подробную debug-страницу, если DEBUG=True, либо шаблон 404.html, если DEBUG=False.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Django возвращает ответ <code>404 Not Found</code>, используя представление <code>page_not_found</code>, и показывает подробную debug-страницу, если <code>DEBUG=True</code>, либо шаблон <code>404.html</code>, если <code>DEBUG=False</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Диспетчер URL проходит по всем <code>urlpatterns</code> (включая вложенные через <code>include()</code>); если ни один шаблон не совпал, возникает исключение <code>Resolver404</code>, которое Django перехватывает на уровне обработки запроса и формирует HTTP-ответ со статусом 404."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# urls.py (корневой)",
              "handler404 = \"myapp.views.custom_404\"",
              "",
              "# myapp/views.py",
              "from django.http import HttpResponseNotFound",
              "",
              "def custom_404(request, exception):",
              "    return HttpResponseNotFound(\"Страница не найдена\")",
              "",
              "# Проверка: с DEBUG=False запрос на несуществующий путь",
              "# должен вернуть текст \"Страница не найдена\" и статус 404."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> В режиме разработки (<code>DEBUG=True</code>) Django показывает список всех проверенных URL-паттернов, что удобно для отладки опечаток в маршрутах. В production нужен собственный шаблон <code>templates/404.html</code>, иначе пользователь увидит стандартную минималистичную страницу."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Путают поведение 404 с <code>DEBUG=True</code> (подробная диагностика) и <code>DEBUG=False</code> (production-страница) и тестируют «как в проде» с включённым DEBUG; забывают зарегистрировать кастомный обработчик <code>handler404</code> в корневом <code>urls.py</code>."
          ]
        }
      ]
    },
    {
      "t": "Как во Flask вернуть JSON-ответ с произвольным HTTP статус-кодом, отличным от 200?",
      "l": "Junior",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "http",
        "serialization"
      ],
      "d": "Функция jsonify() формирует тело ответа в формате JSON, а статус-код задаётся как второй элемент кортежа, возвращаемого из view-функции, либо через make_response.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Функция <code>jsonify()</code> формирует тело ответа в формате JSON, а статус-код задаётся как второй элемент кортежа, возвращаемого из view-функции, либо через <code>make_response</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Flask позволяет view-функции возвращать не только строку/словарь, но и кортеж <code>(тело, статус)</code> или <code>(тело, статус, заголовки)</code>. <code>jsonify()</code> сериализует Python-объект в JSON и устанавливает правильный <code>Content-Type</code>."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from flask import Flask, jsonify",
              "",
              "app = Flask(__name__)",
              "",
              "@app.route(\"/items/<int:item_id>\")",
              "def get_item(item_id):",
              "    item = find_item(item_id)",
              "    if item is None:",
              "        return jsonify({\"error\": \"not found\"}), 404",
              "    return jsonify(item), 200",
              "",
              "# GET /items/999 (не существует) -> статус 404, тело {\"error\": \"not found\"}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для кодов ошибок (400, 404, 409 и т. п.) удобно возвращать <code>jsonify({...}), код</code>. Если нужно также выставить заголовки, используют <code>make_response(jsonify(...), код)</code> и дальше <code>.headers[...] = ...</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Возвращают только <code>jsonify(data)</code> без статуса для ошибок, из-за чего клиент получает 200 даже при логической ошибке; путают <code>abort(404)</code> (сразу прерывает обработку и генерирует HTML/JSON ошибку через error handler) с обычным возвратом кортежа."
          ]
        }
      ]
    },
    {
      "t": "Что такое middleware в веб-фреймворке (на примере Django или FastAPI) и в каком порядке middleware обрабатывают запрос и ответ?",
      "l": "Junior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "django",
        "fastapi",
        "middleware",
        "rest-api"
      ],
      "pop": true,
      "d": "Middleware — это слой кода, через который проходит каждый запрос перед view и каждый ответ после view; при запросе middleware вызываются в порядке объявления, при ответе — в обратном порядке.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Middleware — это слой кода, через который проходит каждый запрос перед view и каждый ответ после view; при запросе middleware вызываются в порядке объявления, при ответе — в обратном порядке."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Middleware оборачивают основной обработчик, как «матрёшка»: первый middleware в списке вызывает следующий, тот — следующий, и так до самого view; ответ возвращается по той же цепочке в обратном направлении."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "Порядок в конфигурации:  [A, B, C]",
              "",
              "Запрос:  A.before -> B.before -> C.before -> view",
              "Ответ:   view -> C.after -> B.after -> A.after",
              "",
              "Проверка: добавить в каждый middleware print/log с именем",
              "на \"before\" и \"after\" этапах и убедиться, что порядок логов",
              "соответствует схеме выше."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Middleware используют для сквозных задач: логирования, аутентификации, сжатия ответа, обработки CORS. Порядок важен — например, middleware аутентификации должен стоять до middleware, которому нужен текущий пользователь."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Думают, что middleware выполняются независимо друг от друга, а не как обёртки; размещают middleware, изменяющий <code>request</code>, после middleware, которому нужны эти изменения."
          ]
        }
      ]
    },
    {
      "t": "Для чего нужен CSRF middleware в Django и в каких случаях запрос будет отклонён этим механизмом?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "middleware",
        "csrf"
      ],
      "pop": true,
      "d": "CSRF middleware защищает от межсайтовой подделки запросов, требуя, чтобы небезопасные методы (POST, PUT, DELETE) содержали корректный CSRF-токен, связанный с сессией пользователя.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "CSRF middleware защищает от межсайтовой подделки запросов, требуя, чтобы небезопасные методы (POST, PUT, DELETE) содержали корректный CSRF-токен, связанный с сессией пользователя."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Django генерирует уникальный токен для сессии/куки и ожидает его в форме (<code>{% csrf_token %}</code>) или заголовке (<code>X-CSRFToken</code>) при небезопасных запросах. Middleware сверяет токен из запроса с ожидаемым и возвращает <code>403 Forbidden</code> при несовпадении или отсутствии."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "POST /profile/update HTTP/1.1",
              "Host: example.com",
              "Cookie: csrftoken=abc123; sessionid=",
              "X-CSRFToken: abc123",
              "Content-Type: application/json",
              "",
              "{\"name\": \"Alice\"}",
              "",
              "# Если заголовок X-CSRFToken отсутствует или не совпадает с cookie,",
              "# Django вернёт 403 Forbidden с сообщением \"CSRF verification failed\"."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для обычных HTML-форм достаточно тега <code>{% csrf_token %}</code> в шаблоне. Для AJAX/SPA токен нужно передавать явно в заголовке, читая его из cookie <code>csrftoken</code>. Для чистых API без сессий (например, с токен-аутентификацией) CSRF-защита обычно не требуется для этих эндпоинтов."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Отключают CSRF глобально вместо точечного <code>@csrf_exempt</code> для конкретного эндпоинта, не понимая последствий; забывают передавать токен в AJAX-запросах и получают необъяснимые 403 при разработке фронтенда."
          ]
        }
      ]
    },
    {
      "t": "В чём принципиальная разница между path-параметром и query-параметром в REST API на примере FastAPI?",
      "l": "Junior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "routing",
        "rest-api"
      ],
      "pop": true,
      "d": "Path-параметр — обязательная часть самого URL, идентифицирующая конкретный ресурс (например, /users/42); query-параметр передаётся после ? и обычно используется для фильтрации, сортировки или пагинации.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Path-параметр — обязательная часть самого URL, идентифицирующая конкретный ресурс (например, <code>/users/42</code>); query-параметр передаётся после <code>?</code> и обычно используется для фильтрации, сортировки или пагинации."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "В FastAPI path-параметр объявляется в шаблоне маршрута через <code>{имя}</code> и обязателен — без него маршрут просто не совпадёт. Query-параметр не входит в шаблон пути: любой параметр функции, не являющийся path-параметром или моделью тела, по умолчанию становится query-параметром."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI",
              "",
              "app = FastAPI()",
              "",
              "@app.get(\"/orders/{order_id}\")",
              "def get_order(order_id: int, include_items: bool = False):",
              "    # order_id - path-параметр (обязателен, часть URL)",
              "    # include_items - query-параметр (необязателен)",
              "    return {\"order_id\": order_id, \"include_items\": include_items}",
              "",
              "# GET /orders/5?include_items=true -> {\"order_id\": 5, \"include_items\": true}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Path используют для идентификации сущности (<code>/orders/{order_id}</code>), query — для необязательных модификаторов списка (<code>/orders?status=paid&amp;page=2</code>). Это соответствует общепринятым REST-конвенциям и упрощает кэширование и логирование по пути."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Передают идентификатор ресурса как query-параметр (<code>/orders?order_id=5</code>) вместо пути, что ломает REST-семантику и усложняет кэширование; делают обязательные фильтры query-параметрами без значения по умолчанию, из-за чего клиенту приходится их всегда указывать."
          ]
        }
      ]
    },
    {
      "t": "Как правильно читать конфигурационные значения (например, URL базы данных или секретный ключ) из переменных окружения во Flask-приложении?",
      "l": "Junior",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "routing",
        "configuration",
        "secrets-management",
        "database",
        "environment-variables"
      ],
      "d": "Значения читаются через os.environ/os.getenv (опционально с библиотекой python-dotenv для локальной разработки) и затем помещаются в app.config, а не хардкодятся в исходном коде.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Значения читаются через <code>os.environ</code>/<code>os.getenv</code> (опционально с библиотекой <code>python-dotenv</code> для локальной разработки) и затем помещаются в <code>app.config</code>, а не хардкодятся в исходном коде."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>os.getenv('KEY', default)</code> возвращает значение переменной окружения процесса или значение по умолчанию. Flask хранит конфигурацию приложения в словаре-подобном объекте <code>app.config</code>, куда удобно один раз сложить все настройки при создании приложения."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "import os",
              "from flask import Flask",
              "",
              "app = Flask(__name__)",
              "app.config[\"SECRET_KEY\"] = os.getenv(\"SECRET_KEY\", \"dev-only-insecure-key\")",
              "app.config[\"SQLALCHEMY_DATABASE_URI\"] = os.environ[\"DATABASE_URL\"]  # обязательная переменная",
              "",
              "# Проверка: запуск без переменной DATABASE_URL должен явно",
              "# завершиться KeyError на старте, а не тихо упасть позже при запросе к БД."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для локальной разработки переменные окружения часто кладут в файл <code>.env</code> и загружают через <code>load_dotenv()</code> до чтения <code>os.getenv</code>; в production переменные задаются средствами окружения (Docker, systemd, CI/CD), и <code>.env</code>-файл туда не попадает."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Хранят секреты (пароли, ключи) прямо в коде или в <code>.env</code>, закоммиченном в git; не задают значения по умолчанию для необязательных настроек и получают <code>None</code> там, где ожидалась строка."
          ]
        }
      ]
    },
    {
      "t": "Как объявить в Django URL-шаблон с числовым идентификатором и получить его значение внутри view-функции?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "routing"
      ],
      "d": "В шаблоне пути используется конвертер int:pk, который сразу приводит значение к int; Django передаёт его в view как аргумент с тем же именем, что указано в угловых скобках.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "В шаблоне пути используется конвертер <code>&lt;int:pk&gt;</code>, который сразу приводит значение к <code>int</code>; Django передаёт его в view как аргумент с тем же именем, что указано в угловых скобках."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Django поддерживает встроенные конвертеры путей: <code>str</code>, <code>int</code>, <code>slug</code>, <code>uuid</code>, <code>path</code>. Конвертер не только извлекает часть URL, но и валидирует/приводит тип — если в URL не число, <code>int</code>-конвертер просто не совпадёт, и Django перейдёт к следующему правилу (или вернёт 404)."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# urls.py",
              "from django.urls import path",
              "from . import views",
              "urlpatterns = [path(\"articles/<int:pk>/\", views.article_detail)]",
              "",
              "# views.py",
              "def article_detail(request, pk):",
              "    # pk уже int, например 42",
              "    return HttpResponse(f\"Статья #{pk}\")",
              "",
              "# GET /articles/42/   -> \"Статья #42\"",
              "# GET /articles/abc/  -> 404, т.к. \"abc\" не подходит под <int:>"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Имя переменной в <code>&lt;int:pk&gt;</code> должно совпадать с именем параметра view-функции (<code>def article_detail(request, pk):</code>). Это избавляет от ручного <code>int(request_path_part)</code> и связанных с этим try/except."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Несовпадение имени параметра в шаблоне и в сигнатуре функции (например, <code>&lt;int:pk&gt;</code> в URL, но <code>id</code> в функции) приводит к <code>TypeError</code> при вызове view; использование <code>str</code> вместо <code>int</code> там, где нужна числовая валидация."
          ]
        }
      ]
    },
    {
      "t": "Какой HTTP-статус и формат ответа FastAPI вернёт по умолчанию, если тело запроса не прошло валидацию Pydantic-модели?",
      "l": "Junior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "pydantic",
        "validation",
        "rest-api",
        "http"
      ],
      "pop": true,
      "d": "FastAPI автоматически вернёт статус 422 Unprocessable Entity с JSON-телом, содержащим список ошибок (detail) с указанием места (loc), типа ошибки и сообщения для каждого некорректного поля.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "FastAPI автоматически вернёт статус <code>422 Unprocessable Entity</code> с JSON-телом, содержащим список ошибок (<code>detail</code>) с указанием места (<code>loc</code>), типа ошибки и сообщения для каждого некорректного поля."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "При несовпадении данных запроса со схемой Pydantic выбрасывается <code>RequestValidationError</code>, которую Starlette/FastAPI перехватывают встроенным обработчиком исключений и преобразуют в стандартизированный JSON-ответ без необходимости писать код обработки вручную."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI",
              "from pydantic import BaseModel",
              "",
              "app = FastAPI()",
              "",
              "class UserIn(BaseModel):",
              "    age: int",
              "",
              "@app.post(\"/users/\")",
              "def create_user(user: UserIn):",
              "    return user",
              "",
              "# POST {\"age\": \"not-a-number\"}",
              "# -> 422",
              "# {\"detail\": [{\"loc\": [\"body\", \"age\"], \"msg\": \"Input should be a valid integer\", \"type\": \"int_parsing\"}]}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Формат ошибки единый для всех эндпоинтов приложения, что упрощает обработку на стороне клиента. При необходимости можно переопределить обработчик через <code>@app.exception_handler(RequestValidationError)</code>, если нужен другой формат (например, под конкретный стандарт API)."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Путают <code>422</code> (ошибка валидации входных данных) с <code>400</code> (общая ошибка клиента) — в чистом FastAPI для ошибок валидации Pydantic именно <code>422</code>; пишут собственную ручную валидацию там, где достаточно объявить типы в Pydantic-модели."
          ]
        }
      ]
    },
    {
      "t": "Что такое Blueprint во Flask и для чего он используется на базовом уровне?",
      "l": "Junior",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "routing",
        "database",
        "blueprints"
      ],
      "d": "Blueprint — это способ сгруппировать связанные маршруты, шаблоны и статику в отдельный модуль, который затем регистрируется в основном приложении через register_blueprint.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Blueprint — это способ сгруппировать связанные маршруты, шаблоны и статику в отдельный модуль, который затем регистрируется в основном приложении через <code>register_blueprint</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Blueprint создаётся как отдельный объект (<code>Blueprint('name', __name__)</code>), к нему привязываются маршруты через <code>@bp.route(...)</code>, как и к обычному <code>app</code>. Сам Blueprint не является приложением — он «встраивается» в реальное <code>Flask</code>-приложение вызовом <code>app.register_blueprint(bp, url_prefix=...)</code>."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# users/routes.py",
              "from flask import Blueprint",
              "",
              "bp = Blueprint(\"users\", __name__)",
              "",
              "@bp.route(\"/users/<int:user_id>\")",
              "def get_user(user_id):",
              "    return {\"id\": user_id}",
              "",
              "# app.py",
              "from flask import Flask",
              "from users.routes import bp as users_bp",
              "",
              "app = Flask(__name__)",
              "app.register_blueprint(users_bp, url_prefix=\"/api\")",
              "# Теперь маршрут доступен как GET /api/users/5"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Blueprint удобен для разделения кода на логические модули (например, <code>auth</code>, <code>users</code>, <code>orders</code>) в проектах среднего и большого размера, вместо того чтобы держать все маршруты в одном файле <code>app.py</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Забывают зарегистрировать Blueprint в приложении (<code>register_blueprint</code>), из-за чего маршруты «не существуют»; дублируют один и тот же <code>url_prefix</code> для разных Blueprint, что приводит к конфликтам маршрутов."
          ]
        }
      ]
    },
    {
      "t": "В приведённом ниже Django-коде есть ошибка. Найдите её и объясните, как она повлияет на поведение view?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "configuration",
        "http"
      ],
      "d": "Ошибка в том, что ветка для POST не возвращает HttpResponse/redirect — функция в этом случае возвращает None, из-за чего Django выбросит ValueError: The view didn't return an HttpResponse object.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Ошибка в том, что ветка для POST не возвращает <code>HttpResponse</code>/<code>redirect</code> — функция в этом случае возвращает <code>None</code>, из-за чего Django выбросит <code>ValueError: The view didn't return an HttpResponse object</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Каждая Django view-функция обязана вернуть объект, совместимый с <code>HttpResponse</code> (или <code>JsonResponse</code>, <code>redirect()</code> и т. п.), по каждому пути выполнения. Если код выполнится и дойдёт до конца функции без <code>return</code>, Python вернёт <code>None</code>, а Django интерпретирует это как ошибку конфигурации view."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Ошибка: в ветке POST нет return после form.save()",
              "def create_article(request):",
              "    if request.method == \"POST\":",
              "        form = ArticleForm(request.POST)",
              "        if form.is_valid():",
              "            form.save()",
              "            # <-- пропущен return redirect(\"article_list\")",
              "    else:",
              "        form = ArticleForm()",
              "    return render(request, \"create.html\", {\"form\": form})",
              "",
              "# Проверка: валидный POST приведёт к ValueError с сообщением",
              "# \"create_article didn't return an HttpResponse object. It returned None instead.\""
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для отладки таких ошибок полезно убедиться, что каждая ветка <code>if/elif/else</code> завершается явным <code>return</code>; линтеры и статический анализ (например, с аннотацией <code>-&gt; HttpResponse</code>) помогают заметить пропущенный return до запуска."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Забывают <code>return</code> после обработки формы/сохранения объекта, особенно при добавлении новой ветки <code>elif</code> к существующему коду; путают side-effect (например, <code>form.save()</code>) с завершением функции."
          ]
        }
      ]
    },
    {
      "t": "Как в FastAPI ограничить набор полей, которые будут возвращены клиенту из эндпоинта, с помощью response_model?",
      "l": "Junior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "pydantic",
        "rest-api",
        "serialization"
      ],
      "d": "Параметр response_model декоратора эндпоинта задаёт отдельную Pydantic-модель для исходящих данных; FastAPI сериализует возвращаемый объект именно по полям этой модели, отбрасывая лишние.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Параметр <code>response_model</code> декоратора эндпоинта задаёт отдельную Pydantic-модель для исходящих данных; FastAPI сериализует возвращаемый объект именно по полям этой модели, отбрасывая лишние."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "После выполнения функции-обработчика FastAPI прогоняет результат через указанную выходную модель (<code>response_model=UserOut</code>), даже если функция вернула объект с большим количеством полей (например, ORM-модель с паролем). В ответ попадут только поля, описанные в <code>UserOut</code>."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI",
              "from pydantic import BaseModel",
              "",
              "app = FastAPI()",
              "",
              "class UserOut(BaseModel):",
              "    id: int",
              "    email: str",
              "",
              "@app.get(\"/users/{user_id}\", response_model=UserOut)",
              "def get_user(user_id: int):",
              "    # предположим, объект из БД содержит ещё password_hash",
              "    return {\"id\": user_id, \"email\": \"a@example.com\", \"password_hash\": \"secret\"}",
              "",
              "# Ответ клиенту: {\"id\": 1, \"email\": \"a@example.com\"} - password_hash отфильтрован"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Разделение входной (<code>UserIn</code>, с паролем) и выходной (<code>UserOut</code>, без пароля) модели — стандартная практика для защиты чувствительных данных и явного контроля контракта API."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Используют одну и ту же модель для входа и выхода и забывают, что в ней есть, например, поле <code>password_hash</code>, которое утечёт в ответ; не задают <code>response_model</code>, рассчитывая, что сериализация «сама всё уберёт»."
          ]
        }
      ]
    },
    {
      "t": "Как корректно сообщить клиенту API, что запрошенный ресурс не найден, и какой статус-код для этого принято использовать?",
      "l": "Junior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "routing",
        "rest-api",
        "http"
      ],
      "d": "Для отсутствующего ресурса возвращают HTTP-статус 404 Not Found, как правило, с JSON-телом, содержащим понятное сообщение об ошибке — конкретный формат тела зависит от принятого в проекте стандарта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Для отсутствующего ресурса возвращают HTTP-статус <code>404 Not Found</code>, как правило, с JSON-телом, содержащим понятное сообщение об ошибке — конкретный формат тела зависит от принятого в проекте стандарта."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>404</code> — стандартный HTTP-статус, означающий, что сервер не нашёл ресурс по данному URL/идентификатору. Клиентские библиотеки и мониторинг обычно отличают <code>4xx</code> (ошибка клиента/запроса) от <code>5xx</code> (ошибка сервера), поэтому важно не возвращать <code>500</code> там, где ресурс просто отсутствует."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI, HTTPException",
              "",
              "app = FastAPI()",
              "items_db = {1: {\"name\": \"Pen\"}}",
              "",
              "@app.get(\"/items/{item_id}\")",
              "def get_item(item_id: int):",
              "    if item_id not in items_db:",
              "        raise HTTPException(status_code=404, detail=\"Item not found\")",
              "    return items_db[item_id]",
              "",
              "# GET /items/999 -> 404 {\"detail\": \"Item not found\"}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> В разных фреймворках это делается по-разному: во Flask — <code>abort(404)</code> или возврат кортежа <code>(body, 404)</code>; в Django — <code>get_object_or_404()</code>; в FastAPI — <code>raise HTTPException(status_code=404, detail=...)</code>. Единообразный формат тела ошибки по всему API облегчает работу клиентов."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Возвращают <code>200</code> с телом вида <code>{\"error\": \"not found\"}</code> — клиент обязан дополнительно парсить тело, чтобы понять, что произошла ошибка, что увеличивает число пропущенных на клиенте ошибок; возвращают <code>500</code> вместо <code>404</code>, когда причина — отсутствие записи, а не сбой сервера."
          ]
        }
      ]
    },
    {
      "t": "Что представляет собой Django app (приложение) внутри Django-проекта, и зачем разбивать проект на несколько приложений?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "backend"
      ],
      "d": "Django app — это отдельный Python-пакет с собственными моделями, view, шаблонами и миграциями, решающий конкретную подзадачу (например, «блог», «пользователи»); проект объединяет несколько таких приложений в INSTALLED_APPS.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Django app — это отдельный Python-пакет с собственными моделями, view, шаблонами и миграциями, решающий конкретную подзадачу (например, «блог», «пользователи»); проект объединяет несколько таких приложений в <code>INSTALLED_APPS</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Приложение создаётся командой <code>startapp</code> и содержит стандартный набор файлов (<code>models.py</code>, <code>views.py</code>, <code>apps.py</code>, <code>migrations/</code>). Чтобы Django «увидел» приложение (его модели, шаблонные теги, сигналы), его нужно указать в списке <code>INSTALLED_APPS</code> в <code>settings.py</code>."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# settings.py",
              "INSTALLED_APPS = [",
              "    \"django.contrib.admin\",",
              "    \"django.contrib.auth\",",
              "    \"blog\",      # наше приложение",
              "    \"users\",     # ещё одно приложение",
              "]",
              "",
              "# Структура blog/: models.py, views.py, urls.py, migrations/, apps.py"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Разделение на приложения по смысловым доменам (<code>users</code>, <code>orders</code>, <code>billing</code>) облегчает повторное использование кода между проектами и упрощает ориентацию в большом проекте. Для совсем маленьких проектов избыточное дробление на множество приложений может только усложнить навигацию."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Путают термины «Django project» (весь сайт/конфигурация) и «Django app» (один из модулей внутри проекта); создают одно гигантское приложение <code>core</code> со всеми моделями подряд, теряя преимущества модульности."
          ]
        }
      ]
    },
    {
      "t": "Почему запуск Flask-приложения с app.run(debug=True) считается опасным в production-окружении?",
      "l": "Junior",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "backend"
      ],
      "d": "Режим debug=True включает интерактивный веб-дебаггер Werkzeug, который при необработанном исключении позволяет выполнять произвольный Python-код в браузере через консоль отладчика — это критическая угроза безопасности при доступности приложения извне.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Режим <code>debug=True</code> включает интерактивный веб-дебаггер Werkzeug, который при необработанном исключении позволяет выполнять произвольный Python-код в браузере через консоль отладчика — это критическая угроза безопасности при доступности приложения извне."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "В debug-режиме Flask (через Werkzeug) перехватывает необработанные исключения и показывает подробную трассировку с интерактивной консолью на каждом кадре стека; эта консоль по умолчанию защищена только PIN-кодом, который при определённых условиях можно подобрать или который виден в логах запуска."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Плохо для production:",
              "app.run(debug=True, host=\"0.0.0.0\")",
              "",
              "# Лучше для production: запуск под gunicorn, debug выключен",
              "# gunicorn -w 4 -b 0.0.0.0:8000 myapp:app",
              "# и app.config[\"DEBUG\"] = False (или переменная окружения FLASK_DEBUG=0)"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Debug-режим полезен только на локальной машине разработчика, недоступной из интернета. В production используют <code>debug=False</code> (или вообще не запускают через встроенный <code>app.run</code>, а используют production WSGI-сервер — gunicorn/uWSGI) и отдельный централизованный логгер ошибок (например, Sentry)."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Включают <code>debug=True</code> «для удобства отладки» на staging/production сервере, доступном извне; путают <code>debug=True</code> (небезопасный интерактивный дебаггер) с обычным подробным логированием, которое безопасно включать и в production."
          ]
        }
      ]
    },
    {
      "t": "Приведите простой пример использования Depends в FastAPI и объясните, что он делает на базовом уровне?",
      "l": "Junior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "dependency-injection",
        "rest-api",
        "database"
      ],
      "pop": true,
      "d": "Depends указывает FastAPI вызвать переданную функцию перед основным обработчиком и передать её результат как аргумент обработчика — это базовый механизм внедрения зависимостей.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "<code>Depends</code> указывает FastAPI вызвать переданную функцию перед основным обработчиком и передать её результат как аргумент обработчика — это базовый механизм внедрения зависимостей."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Функция-зависимость объявляется как обычная Python-функция (может иметь свои параметры — query, path, другие зависимости). FastAPI вызывает её при каждом запросе и передаёт возвращённое значение в параметр эндпоинта, помеченный <code>Depends(функция)</code>."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI, Depends, Header, HTTPException",
              "",
              "app = FastAPI()",
              "",
              "def get_current_user(x_token: str = Header()):",
              "    if x_token != \"secret-token\":",
              "        raise HTTPException(status_code=401, detail=\"Invalid token\")",
              "    return {\"username\": \"alice\"}",
              "",
              "@app.get(\"/profile\")",
              "def read_profile(user: dict = Depends(get_current_user)):",
              "    return user",
              "",
              "# GET /profile с заголовком X-Token: secret-token -> {\"username\": \"alice\"}",
              "# GET /profile без заголовка -> 401"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Такой подход удобен для повторяющейся логики: получения текущего пользователя из токена, открытия соединения с БД, проверки прав доступа — без дублирования кода в каждом эндпоинте."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Путают <code>Depends(get_current_user)</code> (вызов без скобок передаёт саму функцию, что и нужно) с ошибочным <code>Depends(get_current_user())</code> (вызывает функцию один раз при определении маршрута, а не при каждом запросе)."
          ]
        }
      ]
    },
    {
      "t": "Что такое QueryDict в Django и как с его помощью получить параметры GET и POST запроса?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "routing",
        "query-parameters"
      ],
      "d": "QueryDict — специальный неизменяемый (по умолчанию) словарь-подобный класс Django для request.GET и request.POST, поддерживающий несколько значений для одного ключа.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "<code>QueryDict</code> — специальный неизменяемый (по умолчанию) словарь-подобный класс Django для <code>request.GET</code> и <code>request.POST</code>, поддерживающий несколько значений для одного ключа."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>request.GET</code> содержит параметры строки запроса (query string), <code>request.POST</code> — данные, отправленные в теле формы с <code>Content-Type: application/x-www-form-urlencoded</code> или <code>multipart/form-data</code>. Оба объекта — экземпляры <code>QueryDict</code>, похожего на обычный <code>dict</code>, но с методами <code>getlist()</code> для множественных значений одного ключа."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "def search_view(request):",
              "    query = request.GET.get(\"q\", \"\")",
              "    tags = request.GET.getlist(\"tag\")   # например ?tag=a&tag=b -> [\"a\", \"b\"]",
              "    return JsonResponse({\"query\": query, \"tags\": tags})",
              "",
              "# GET /search?q=python&tag=web&tag=backend",
              "# -> {\"query\": \"python\", \"tags\": [\"web\", \"backend\"]}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для чтения одного значения используют <code>request.GET.get('q', '')</code>; для множественных (например, чекбоксы с одинаковым именем) — <code>request.GET.getlist('tags')</code>. Для JSON-тела API (не формы) <code>request.POST</code> будет пустым — нужно разбирать <code>request.body</code> вручную или использовать DRF."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Пытаются читать JSON-тело через <code>request.POST</code> и получают пустой результат, не понимая разницы между form-encoded и JSON телом; пытаются изменить <code>QueryDict</code> напрямую, получая <code>QueryDict is immutable</code> при обычном <code>request.GET</code>."
          ]
        }
      ]
    },
    {
      "t": "В следующем обработчике Flask есть ошибка, из-за которой при отсутствии JSON-тела приложение падает с 500 вместо корректной ошибки клиенту. Найдите и объясните проблему?",
      "l": "Junior",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "backend"
      ],
      "d": "Ошибка в том, что request.get_json() при отсутствующем или некорректном JSON-теле по умолчанию может вернуть None (или выбросить исключение при force/неверном Content-Type), а код сразу обращается к data['name'] без проверки, вызывая TypeError/500.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Ошибка в том, что <code>request.get_json()</code> при отсутствующем или некорректном JSON-теле по умолчанию может вернуть <code>None</code> (или выбросить исключение при <code>force</code>/неверном Content-Type), а код сразу обращается к <code>data['name']</code> без проверки, вызывая <code>TypeError</code>/<code>500</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>request.get_json(silent=True)</code> возвращает <code>None</code> вместо исключения, если тело не является валидным JSON или заголовок <code>Content-Type</code> не <code>application/json</code>. Без проверки на <code>None</code> следующее обращение <code>data['name']</code> вызовет <code>TypeError: 'NoneType' object is not subscriptable</code>, что Flask превратит в ответ <code>500 Internal Server Error</code>."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Код с ошибкой:",
              "@app.route(\"/users\", methods=[\"POST\"])",
              "def create_user():",
              "    data = request.get_json()        # может вернуть None",
              "    name = data[\"name\"]              # TypeError, если data is None -> 500",
              "    return {\"name\": name}, 201",
              "",
              "# Исправление:",
              "@app.route(\"/users\", methods=[\"POST\"])",
              "def create_user_fixed():",
              "    data = request.get_json(silent=True)",
              "    if not data or \"name\" not in data:",
              "        return {\"error\": \"name is required\"}, 400",
              "    return {\"name\": data[\"name\"]}, 201"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Правильный подход — явно проверять <code>data is None</code> (или использовать <code>silent=False</code>, который сам кидает <code>400</code> при ошибке парсинга, в зависимости от версии) и возвращать <code>400 Bad Request</code> с понятным сообщением, а не пропускать проверку."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Считают, что отсутствие тела запроса — это «исключительная ситуация уровня сервера», тогда как это стандартная ошибка клиента (<code>400</code>), а не сервера (<code>500</code>); не пишут тест на кейс «тело запроса отсутствует/невалидно»."
          ]
        }
      ]
    },
    {
      "t": "Как в Django ограничить view-функцию так, чтобы она отвечала только на определённые HTTP-методы, и что произойдёт при запросе неразрешённым методом?",
      "l": "Junior",
      "c": "django",
      "g": [
        "python",
        "django",
        "http"
      ],
      "d": "Используется декоратор @require_http_methods([...]) (или @require_GET/@require_POST); при запросе не входящим в разрешённый список методом Django вернёт 405 Method Not Allowed.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Используется декоратор <code>@require_http_methods([...])</code> (или <code>@require_GET</code>/<code>@require_POST</code>); при запросе не входящим в разрешённый список методом Django вернёт <code>405 Method Not Allowed</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Декоратор оборачивает view и перед вызовом проверяет <code>request.method</code>; если метод не в разрешённом списке, возвращается <code>HttpResponseNotAllowed</code> со статусом 405 и заголовком <code>Allow</code>, перечисляющим допустимые методы, а сама view-функция не выполняется."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from django.views.decorators.http import require_http_methods",
              "from django.http import JsonResponse",
              "",
              "@require_http_methods([\"GET\", \"POST\"])",
              "def items_view(request):",
              "    return JsonResponse({\"method\": request.method})",
              "",
              "# DELETE /items/ -> 405 Method Not Allowed, заголовок Allow: GET, POST"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Такой декоратор полезен для FBV, когда нужно явно задокументировать и защитить, какие методы поддерживает view, не прописывая ручную проверку <code>if request.method != 'POST': return HttpResponseNotAllowed(...)</code> в каждой функции."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Забывают, что CBV (<code>class View</code>) уже сами возвращают 405 для неопределённых методов без необходимости в декораторе — применение <code>@require_http_methods</code> к CBV избыточно и может конфликтовать; путают 405 (метод не поддерживается) с 403 (запрещён доступ)."
          ]
        }
      ]
    },
    {
      "t": "Как в FastAPI организовать несколько групп маршрутов в отдельных модулях и подключить их к основному приложению?",
      "l": "Junior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "routing",
        "rest-api"
      ],
      "d": "Каждая группа маршрутов оформляется как отдельный APIRouter, а затем подключается к основному приложению вызовом app.include_router(router, prefix=...).",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Каждая группа маршрутов оформляется как отдельный <code>APIRouter</code>, а затем подключается к основному приложению вызовом <code>app.include_router(router, prefix=...)</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>APIRouter</code> поддерживает те же декораторы (<code>@router.get</code>, <code>@router.post</code> и т. д.), что и основной объект <code>FastAPI</code>. После определения всех маршрутов в модуле, <code>include_router</code> копирует их в основное приложение с заданным префиксом пути и/или тегами для документации."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# users/router.py",
              "from fastapi import APIRouter",
              "router = APIRouter(prefix=\"/users\", tags=[\"users\"])",
              "",
              "@router.get(\"/{user_id}\")",
              "def get_user(user_id: int):",
              "    return {\"id\": user_id}",
              "",
              "# main.py",
              "from fastapi import FastAPI",
              "from users.router import router as users_router",
              "",
              "app = FastAPI()",
              "app.include_router(users_router)",
              "# Теперь доступен GET /users/5"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Такой подход позволяет разбить крупное приложение на логические модули (<code>users.py</code>, <code>orders.py</code>) по аналогии с Blueprint во Flask, упрощая навигацию и тестирование отдельных частей API."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Забывают указать префикс (<code>prefix='/users'</code>) и получают маршруты без ожидаемого пути; подключают один и тот же router несколько раз, из-за чего маршруты регистрируются повторно."
          ]
        }
      ]
    },
    {
      "t": "Как во Flask корректно обработать ситуацию, когда входные данные запроса не прошли простую валидацию (например, отсутствует обязательное поле), не допустив падения с 500-й ошибкой?",
      "l": "Junior",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "pydantic",
        "validation"
      ],
      "d": "Нужно явно проверить обязательные поля перед использованием данных и вернуть 400 Bad Request с понятным сообщением, либо использовать библиотеку валидации (например, marshmallow/pydantic) и перехватывать её ошибку.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужно явно проверить обязательные поля перед использованием данных и вернуть <code>400 Bad Request</code> с понятным сообщением, либо использовать библиотеку валидации (например, marshmallow/pydantic) и перехватывать её ошибку."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Flask сам не валидирует входные данные — это задача разработчика или сторонней библиотеки. Без проверки обращение к отсутствующему ключу словаря (<code>data['field']</code>) вызывает <code>KeyError</code>, который без обработки превращается в <code>500 Internal Server Error</code>, хотя по сути это ошибка клиента."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from flask import Flask, request, jsonify",
              "",
              "app = Flask(__name__)",
              "",
              "@app.route(\"/users\", methods=[\"POST\"])",
              "def create_user():",
              "    data = request.get_json(silent=True) or {}",
              "    missing = [f for f in (\"name\", \"email\") if f not in data]",
              "    if missing:",
              "        return jsonify({\"error\": f\"missing fields: {missing}\"}), 400",
              "    return jsonify({\"name\": data[\"name\"], \"email\": data[\"email\"]}), 201",
              "",
              "# POST {\"name\": \"Bob\"} -> 400 {\"error\": \"missing fields: ['email']\"}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Базовый вариант — ручная проверка <code>if 'field' not in data: return {'error': ...}, 400</code>. Для более сложных схем применяют marshmallow/pydantic с перехватом исключения валидации и преобразованием его в <code>400</code> с деталями по полям."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Оставляют необработанные <code>KeyError</code>/<code>ValueError</code> долетать до стандартного обработчика ошибок Flask, который в production отдаёт общий <code>500</code> без подсказки клиенту, что он прислал; не пишут отдельный тест на запрос без обязательного поля."
          ]
        }
      ]
    },
    {
      "t": "Как спроектировать дерево зависимостей в FastAPI так, чтобы «дорогая» зависимость (например, открытие соединения с БД) вычислялась один раз за запрос, даже если на неё ссылаются несколько других зависимостей?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "dependency-injection",
        "rest-api",
        "caching"
      ],
      "pop": true,
      "d": "FastAPI по умолчанию кэширует результат зависимости в пределах одного запроса по идентичности callable, поэтому при использовании одной и той же функции-зависимости в нескольких местах она вызывается один раз; поведение можно явно отключить через use_cache=False.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "FastAPI по умолчанию кэширует результат зависимости в пределах одного запроса по идентичности callable, поэтому при использовании одной и той же функции-зависимости в нескольких местах она вызывается один раз; поведение можно явно отключить через <code>use_cache=False</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Внутри одного запроса FastAPI строит граф зависимостей и для каждого уникального callable (с одинаковыми параметрами вызова) хранит результат в локальном кэше запроса. Если два разных эндпоинта или две разные зависимости ссылаются на <code>Depends(get_db)</code>, функция <code>get_db</code> выполнится один раз, а не дважды."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI, Depends",
              "",
              "app = FastAPI()",
              "calls = {\"count\": 0}",
              "",
              "def get_db():",
              "    calls[\"count\"] += 1",
              "    db = \"db-session\"",
              "    try:",
              "        yield db",
              "    finally:",
              "        calls[\"closed\"] = True",
              "",
              "def get_repo(db=Depends(get_db)):",
              "    return db",
              "",
              "@app.get(\"/check\")",
              "def check(db=Depends(get_db), repo=Depends(get_repo)):",
              "    return {\"calls\": calls[\"count\"]}",
              "",
              "# После одного GET /check calls[\"count\"] == 1, а не 2,",
              "# т.к. get_db закэширован в пределах запроса."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Это полезно для подключения к БД, кэша текущего пользователя, открытия транзакции — важно, чтобы разные части кода работали с одним и тем же объектом сессии в рамках запроса. Если нужно гарантированно вызвать зависимость повторно (например, для генерации нового значения), используют <code>Depends(func, use_cache=False)</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Создают несколько разных функций-обёрток с одинаковой логикой открытия сессии, ожидая, что они будут «общим» кэшированным ресурсом — кэшируется по идентичности функции, а не по семантике; не закрывают ресурс в <code>finally</code>/<code>yield</code>-зависимости, из-за чего соединения не освобождаются даже при единственном вызове."
          ]
        }
      ]
    },
    {
      "t": "Как написать собственный middleware в Django, который измеряет время обработки запроса, и в каком месте стека middleware его разместить?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "middleware"
      ],
      "d": "Middleware реализуется как вызываемый класс с методом __call__, принимающий get_response в конструкторе; его нужно разместить как можно раньше в MIDDLEWARE, чтобы замер включал время работы всех последующих middleware и view.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Middleware реализуется как вызываемый класс с методом <code>__call__</code>, принимающий <code>get_response</code> в конструкторе; его нужно разместить как можно раньше в <code>MIDDLEWARE</code>, чтобы замер включал время работы всех последующих middleware и view."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Современный стиль middleware в Django — класс с <code>__init__(self, get_response)</code> и <code>__call__(self, request)</code>, который вызывает <code>self.get_response(request)</code> для передачи запроса дальше по цепочке и получает <code>response</code> для пост-обработки."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "import time",
              "",
              "class TimingMiddleware:",
              "    def __init__(self, get_response):",
              "        self.get_response = get_response",
              "",
              "    def __call__(self, request):",
              "        start = time.monotonic()",
              "        response = self.get_response(request)",
              "        duration_ms = (time.monotonic() - start) * 1000",
              "        response[\"X-Response-Time-Ms\"] = f\"{duration_ms:.1f}\"",
              "        return response",
              "",
              "# settings.py",
              "MIDDLEWARE = [",
              "    \"myapp.middleware.TimingMiddleware\",  # одним из первых",
              "    \"django.middleware.security.SecurityMiddleware\",",
              "]",
              "# Проверка: в ответе на любой запрос должен появиться заголовок X-Response-Time-Ms."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Замер времени логично делать «снаружи» (ближе к началу списка <code>MIDDLEWARE</code>), чтобы учесть работу всех остальных middleware; добавление заголовка <code>X-Response-Time</code> в ответ помогает диагностировать медленные запросы в production без дополнительного профилирования."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Размещают измеряющий middleware слишком «глубоко» в списке (близко к view), из-за чего он не учитывает время работы middleware аутентификации/сессий, которые могут быть источником задержки; забывают, что middleware должен быть вызываемым объектом, а не просто функцией-обработчиком без <code>get_response</code>."
          ]
        }
      ]
    },
    {
      "t": "В каких ситуациях разница между def и async def для эндпоинта FastAPI критически важна для производительности приложения?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "asyncio",
        "rest-api",
        "http"
      ],
      "pop": true,
      "d": "Разница важна, когда внутри обработчика выполняется блокирующий I/O (синхронный HTTP-клиент, синхронный драйвер БД, time.sleep): такой код в async def-эндпоинте блокирует единственный event loop и замедляет обработку всех остальных параллельных запросов.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Разница важна, когда внутри обработчика выполняется блокирующий I/O (синхронный HTTP-клиент, синхронный драйвер БД, <code>time.sleep</code>): такой код в <code>async def</code>-эндпоинте блокирует единственный event loop и замедляет обработку всех остальных параллельных запросов."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>async def</code>-эндпоинты выполняются в event loop; любой синхронный блокирующий вызов внутри них «замораживает» этот loop на время своего выполнения, не давая обслуживать другие корутины. Обычные <code>def</code>-эндпоинты FastAPI автоматически выполняются в отдельном thread pool (через Starlette), поэтому блокирующий код там не останавливает event loop целиком."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "import time",
              "from fastapi import FastAPI",
              "",
              "app = FastAPI()",
              "",
              "# Плохо: блокирует event loop на 2 секунды для ВСЕХ запросов",
              "@app.get(\"/bad\")",
              "async def bad_endpoint():",
              "    time.sleep(2)  # синхronный блокирующий вызов внутри async def",
              "    return {\"ok\": True}",
              "",
              "# Лучше в этом случае - обычный def, FastAPI выполнит его в threadpool",
              "@app.get(\"/good\")",
              "def good_endpoint():",
              "    time.sleep(2)",
              "    return {\"ok\": True}",
              "",
              "# Нагрузочный тест параллельными запросами к /bad покажет сериализацию",
              "# по времени (~2с * N), а к /good - параллельное выполнение в разных потоках."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Если библиотека для похода в БД/внешний сервис не умеет <code>async</code>/<code>await</code> (синхронный драйвер), для такого эндпоинта логичнее использовать обычный <code>def</code> — тогда FastAPI сам унесёт вызов в поток. Если же используется асинхронный драйвер (например, <code>asyncpg</code>, <code>httpx.AsyncClient</code>), стоит писать <code>async def</code> и действительно использовать <code>await</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Пишут <code>async def</code> «по умолчанию», но внутри вызывают синхронную библиотеку без <code>run_in_executor</code>/<code>run_in_threadpool</code>, получая деградацию производительности под нагрузкой именно из-за блокировки event loop, а не ускорение; путают факт параллельного выполнения корутин с параллелизмом CPU-bound вычислений, которого <code>asyncio</code> не даёт."
          ]
        }
      ]
    },
    {
      "t": "Как реализовать application factory pattern во Flask (create_app), и какую проблему он решает при тестировании и конфигурировании приложения?",
      "l": "Middle",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "dependency-injection",
        "configuration",
        "testing",
        "blueprints"
      ],
      "d": "Приложение создаётся внутри функции create_app(config=None), которая настраивает app.config, инициализирует расширения и регистрирует Blueprint, возвращая готовый объект Flask; это позволяет создавать несколько независимо сконфигурированных экземпляров приложения, например для тестов и production.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Приложение создаётся внутри функции <code>create_app(config=None)</code>, которая настраивает <code>app.config</code>, инициализирует расширения и регистрирует Blueprint, возвращая готовый объект <code>Flask</code>; это позволяет создавать несколько независимо сконфигурированных экземпляров приложения, например для тестов и production."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Вместо создания глобального <code>app = Flask(__name__)</code> на уровне модуля, который неявно захватывает конфигурацию в момент импорта, всё инкапсулируется в функцию. Тесты и разные среды вызывают <code>create_app(test_config)</code> с нужными настройками, получая изолированный экземпляр."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from flask import Flask",
              "from flask_sqlalchemy import SQLAlchemy",
              "",
              "db = SQLAlchemy()",
              "",
              "def create_app(config_overrides=None):",
              "    app = Flask(__name__)",
              "    app.config[\"SQLALCHEMY_DATABASE_URI\"] = \"sqlite:///prod.db\"",
              "    if config_overrides:",
              "        app.config.update(config_overrides)",
              "    db.init_app(app)",
              "    from .users.routes import bp as users_bp",
              "    app.register_blueprint(users_bp)",
              "    return app",
              "",
              "# В тестах:",
              "# app = create_app({\"SQLALCHEMY_DATABASE_URI\": \"sqlite:///:memory:\", \"TESTING\": True})"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Это особенно важно для расширений типа Flask-SQLAlchemy — в тестах можно передать отдельную тестовую БД (например, SQLite in-memory) без влияния на production-конфигурацию, и создавать несколько приложений в одном процессе (например, для параллельных тестов) без конфликтов глобального состояния."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Инициализируют расширения (<code>db = SQLAlchemy(app)</code>) прямо при создании <code>app</code> внутри фабрики без паттерна <code>init_app</code>, что усложняет повторное создание приложения с другой конфигурацией в рамках одного процесса; оставляют часть конфигурации на уровне модуля вне фабрики, из-за чего она не переопределяется в тестах."
          ]
        }
      ]
    },
    {
      "t": "Как спроектировать DRF-сериализатор с вложенным объектом и валидацией, зависящей от нескольких полей одновременно (например, дата окончания не раньше даты начала)?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "django-rest-framework",
        "validation",
        "serialization"
      ],
      "d": "Для межполевой валидации используют метод validate(self, attrs) сериализатора, который получает уже провалидированные по отдельности поля и может выбросить ValidationError, сославшись на конкретное поле или на сериализатор целиком.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Для межполевой валидации используют метод <code>validate(self, attrs)</code> сериализатора, который получает уже провалидированные по отдельности поля и может выбросить <code>ValidationError</code>, сославшись на конкретное поле или на сериализатор целиком."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "DRF сначала прогоняет валидацию каждого поля отдельно (<code>validate_&lt;field_name&gt;</code> или встроенные валидаторы), и только если все поля по отдельности валидны, вызывает общий <code>validate(attrs)</code> с итоговым словарём. Там удобно сравнивать несколько полей между собой."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from rest_framework import serializers",
              "",
              "class BookingSerializer(serializers.Serializer):",
              "    start_date = serializers.DateField()",
              "    end_date = serializers.DateField()",
              "",
              "    def validate(self, attrs):",
              "        if attrs[\"end_date\"] < attrs[\"start_date\"]:",
              "            raise serializers.ValidationError(",
              "                {\"end_date\": \"Дата окончания не может быть раньше даты начала.\"}",
              "            )",
              "        return attrs",
              "",
              "# Входные данные {\"start_date\": \"2024-05-10\", \"end_date\": \"2024-05-01\"}",
              "# -> 400 с ошибкой в поле end_date"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для вложенных объектов (например, <code>OrderItemSerializer</code> внутри <code>OrderSerializer</code>) используют <code>many=True</code> и переопределяют <code>create</code>/<code>update</code>, так как DRF по умолчанию не умеет автоматически сохранять вложенные записи в связанные таблицы."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Пытаются сравнивать поля в <code>validate_start_date</code>, где второе поле (<code>end_date</code>) ещё не гарантированно присутствует/провалидировано на этом этапе; не переопределяют <code>create()</code> для вложенных сериализаторов и получают <code>NotImplementedError</code> при попытке сохранить вложенные данные."
          ]
        }
      ]
    },
    {
      "t": "Как настроить конфигурацию FastAPI-приложения через pydantic-settings (BaseSettings) так, чтобы значения читались из .env-файла и переменных окружения с приоритетом окружения?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "pydantic",
        "configuration",
        "rest-api",
        "environment-variables"
      ],
      "d": "Создаётся класс, наследующий BaseSettings, с полями-настройками и model_config = SettingsConfigDict(env_file='.env'); переменные окружения процесса по умолчанию имеют приоритет над значениями из .env-файла.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Создаётся класс, наследующий <code>BaseSettings</code>, с полями-настройками и <code>model_config = SettingsConfigDict(env_file='.env')</code>; переменные окружения процесса по умолчанию имеют приоритет над значениями из <code>.env</code>-файла."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>BaseSettings</code> при инициализации читает значения в следующем порядке приоритета (для pydantic-settings v2): явно переданные аргументы, переменные окружения, значения из <code>.env</code>, значения по умолчанию в классе. Такой порядок позволяет держать <code>.env</code> для локальной разработки и переопределять конкретные значения через окружение в CI/production без изменения кода."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from functools import lru_cache",
              "from pydantic_settings import BaseSettings, SettingsConfigDict",
              "",
              "class Settings(BaseSettings):",
              "    database_url: str",
              "    debug: bool = False",
              "",
              "    model_config = SettingsConfigDict(env_file=\".env\", env_file_encoding=\"utf-8\")",
              "",
              "@lru_cache",
              "def get_settings() -> Settings:",
              "    return Settings()",
              "",
              "# .env: DATABASE_URL=postgresql://localhost/app",
              "# В окружении CI: DATABASE_URL=postgresql://ci-host/app  -> имеет приоритет над .env"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Настройки инстанцируют один раз (например, через <code>@lru_cache</code> на функции <code>get_settings()</code>) и внедряют в эндпоинты через <code>Depends(get_settings)</code>, что упрощает подмену конфигурации в тестах через <code>dependency_overrides</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Коммитят <code>.env</code> с реальными секретами в репозиторий; создают <code>Settings()</code> прямо на уровне модуля при каждом импорте без кэширования, из-за чего файл <code>.env</code> читается многократно и сложнее подменяется в тестах."
          ]
        }
      ]
    },
    {
      "t": "Как диагностировать проблему N+1 запросов, возникающую при сериализации связанных объектов через DRF ModelSerializer, и как её устранить на уровне view?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "django-rest-framework",
        "testing",
        "sqlalchemy",
        "serialization",
        "n-plus-one"
      ],
      "pop": true,
      "d": "Проблема диагностируется по логам SQL-запросов (например, через django-debug-toolbar или connection.queries в тестах) — при сериализации списка объектов с related-полем выполняется по одному дополнительному запросу на каждый объект; решение — select_related/prefetch_related в queryset view.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Проблема диагностируется по логам SQL-запросов (например, через <code>django-debug-toolbar</code> или <code>connection.queries</code> в тестах) — при сериализации списка объектов с related-полем выполняется по одному дополнительному запросу на каждый объект; решение — <code>select_related</code>/<code>prefetch_related</code> в queryset view."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Сериализатор с полем типа <code>PrimaryKeyRelatedField</code>/вложенным сериализатором для ForeignKey/ManyToMany при обращении к <code>instance.related_field</code> для каждого объекта списка вызывает отдельный SQL-запрос, если связанные данные не были заранее загружены вместе с основным queryset."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Было: для списка из 50 статей выполняется 1 + 50 запросов (автор каждой статьи)",
              "class ArticleViewSet(viewsets.ReadOnlyModelViewSet):",
              "    queryset = Article.objects.all()",
              "    serializer_class = ArticleSerializer",
              "",
              "# Стало: ровно 1-2 запроса независимо от количества статей",
              "class ArticleViewSet(viewsets.ReadOnlyModelViewSet):",
              "    queryset = Article.objects.select_related(\"author\").prefetch_related(\"tags\")",
              "    serializer_class = ArticleSerializer",
              "",
              "# Проверка в тесте:",
              "# with self.assertNumQueries(2):",
              "#     self.client.get(\"/api/articles/\")"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> <code>select_related('author')</code> используют для ForeignKey/OneToOne (JOIN в одном запросе), <code>prefetch_related('tags')</code> — для ManyToMany/обратных ForeignKey (отдельный запрос с последующим Python-соединением в памяти). Это нужно применять именно в queryset, который передаётся в <code>ListAPIView</code>/viewset (<code>get_queryset</code>), а не в самом сериализаторе."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Добавляют <code>select_related</code>/<code>prefetch_related</code> в неправильном месте (например, в сериализаторе, который получает уже готовый queryset без возможности его переопределить) или забывают про вложенные уровни связей (<code>prefetch_related('comments__author')</code>); оценивают «решилось» только по уменьшению числа строк лога, не проверяя итоговое количество запросов числом (например, <code>assertNumQueries</code> в тестах)."
          ]
        }
      ]
    },
    {
      "t": "Как во Flask безопасно передавать данные между хуком before_request и обработчиком view с учётом контекста запроса, и почему объект g не разделяется между разными запросами?",
      "l": "Middle",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "environment-variables",
        "request-context"
      ],
      "d": "Данные кладут в объект flask.g, который привязан к текущему request context и автоматически пересоздаётся для каждого нового запроса — это потокобезопасно, так как каждый поток/greenlet обрабатывает свой собственный контекст.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Данные кладут в объект <code>flask.g</code>, который привязан к текущему request context и автоматически пересоздаётся для каждого нового запроса — это потокобезопасно, так как каждый поток/greenlet обрабатывает свой собственный контекст."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Flask использует механизм контекстных локальных переменных (context locals, основанных на <code>werkzeug.local</code>/<code>contextvars</code>), который хранит отдельный <code>g</code> для каждого активного request context. Даже если сервер обрабатывает несколько запросов параллельно в разных потоках, каждый поток видит «свой» <code>g</code>, а не общий для всех."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from flask import Flask, g, request",
              "",
              "app = Flask(__name__)",
              "",
              "@app.before_request",
              "def load_current_user():",
              "    token = request.headers.get(\"X-Token\")",
              "    g.current_user = {\"id\": 1, \"name\": \"Alice\"} if token else None",
              "",
              "@app.route(\"/profile\")",
              "def profile():",
              "    if g.current_user is None:",
              "        return {\"error\": \"unauthorized\"}, 401",
              "    return g.current_user",
              "",
              "# Параллельные запросы с разными заголовками X-Token друг на друга не влияют,",
              "# т.к. g пересоздаётся для каждого запроса в своём контексте."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> <code>before_request</code> обычно используют для подготовки данных, нужных нескольким view (например, текущий пользователь из токена), и сохраняют результат в <code>g.current_user</code>; после обработки запроса <code>g</code> автоматически уничтожается, так что данные не «утекают» в следующий запрос."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Пытаются хранить в <code>g</code> данные, которые должны жить дольше одного запроса (например, кэш между запросами) — для этого <code>g</code> не подходит, нужен внешний кэш; обращаются к <code>g.current_user</code> в коде, который может выполняться вне активного request context (например, в фоновом потоке), получая <code>RuntimeError: Working outside of request context</code>."
          ]
        }
      ]
    },
    {
      "t": "Как в FastAPI реализовать единый формат ошибок для всего приложения, перехватывая и кастомные бизнес-исключения, и стандартные ошибки валидации Pydantic?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "pydantic",
        "validation",
        "rest-api"
      ],
      "d": "Для каждого типа исключений регистрируется обработчик через @app.exception_handler(ТипИсключения), который формирует ответ в едином JSON-формате; для RequestValidationError и собственных исключений (например, DomainError) пишутся отдельные обработчики, возвращающие согласованную структуру.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Для каждого типа исключений регистрируется обработчик через <code>@app.exception_handler(ТипИсключения)</code>, который формирует ответ в едином JSON-формате; для <code>RequestValidationError</code> и собственных исключений (например, <code>DomainError</code>) пишутся отдельные обработчики, возвращающие согласованную структуру."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "FastAPI/Starlette вызывают зарегистрированный обработчик, соответствующий типу выброшенного исключения (с учётом наследования), вместо стандартного поведения. Внутри обработчика формируется <code>JSONResponse</code> с нужным статусом и телом, одинаковым по структуре для всех типов ошибок приложения."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI, Request",
              "from fastapi.exceptions import RequestValidationError",
              "from fastapi.responses import JSONResponse",
              "",
              "app = FastAPI()",
              "",
              "class AppError(Exception):",
              "    status_code = 400",
              "    def __init__(self, message: str):",
              "        self.message = message",
              "",
              "class NotFoundError(AppError):",
              "    status_code = 404",
              "",
              "@app.exception_handler(AppError)",
              "async def app_error_handler(request: Request, exc: AppError):",
              "    return JSONResponse(status_code=exc.status_code, content={\"error\": {\"message\": exc.message}})",
              "",
              "@app.exception_handler(RequestValidationError)",
              "async def validation_handler(request: Request, exc: RequestValidationError):",
              "    return JSONResponse(status_code=422, content={\"error\": {\"message\": \"validation_failed\", \"details\": exc.errors()}})"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Полезно завести базовый класс исключений домена (<code>class AppError(Exception)</code>) с подклассами (<code>NotFoundError</code>, <code>ConflictError</code>) и статус-кодом как атрибутом, чтобы обработчик был один и обобщённый, а не по одному на каждый тип ошибки."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Регистрируют обработчик только для конкретных исключений, забывая про общий <code>Exception</code> (нужно аккуратно — слишком widely пойманный <code>Exception</code> может скрыть реальные баги и превратить их в «красивый» 500 без алерта); делают формат ответа непоследовательным между разными обработчиками (где-то <code>detail</code>, где-то <code>message</code>), усложняя жизнь клиентам API."
          ]
        }
      ]
    },
    {
      "t": "Как настроить CORS в Django-приложении, обслуживающем API для отдельного frontend-домена, и какие заголовки за это отвечают?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "middleware",
        "cors",
        "rest-api"
      ],
      "d": "Используется middleware django-cors-headers: добавляется в MIDDLEWARE, а разрешённые источники указываются в CORS_ALLOWED_ORIGINS; middleware добавляет заголовки Access-Control-Allow-Origin и обрабатывает preflight-запросы OPTIONS.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Используется middleware <code>django-cors-headers</code>: добавляется в <code>MIDDLEWARE</code>, а разрешённые источники указываются в <code>CORS_ALLOWED_ORIGINS</code>; middleware добавляет заголовки <code>Access-Control-Allow-Origin</code> и обрабатывает preflight-запросы <code>OPTIONS</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Браузер при межсайтовом запросе (другой origin: схема+домен+порт) сначала может отправить предварительный <code>OPTIONS</code>-запрос (preflight) для «небезопасных» методов/заголовков. Сервер должен ответить заголовками <code>Access-Control-Allow-Origin</code>, <code>Access-Control-Allow-Methods</code> и т. д., разрешающими конкретный origin; без этого браузер блокирует ответ на стороне клиента (сам запрос может даже выполниться на сервере, но JS не получит ответ)."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# settings.py",
              "MIDDLEWARE = [",
              "    \"corsheaders.middleware.CorsMiddleware\",",
              "    \"django.middleware.common.CommonMiddleware\",",
              "]",
              "CORS_ALLOWED_ORIGINS = [",
              "    \"https://app.example.com\",",
              "]",
              "",
              "# Проверка: запрос с Origin: https://app.example.com должен получить",
              "# заголовок Access-Control-Allow-Origin: https://app.example.com в ответе,",
              "# а запрос с другим Origin - не должен."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> В production указывают конкретные разрешённые домены (<code>CORS_ALLOWED_ORIGINS = [\"https://app.example.com\"]</code>), а не <code>CORS_ALLOW_ALL_ORIGINS = True</code>, чтобы не открывать API для произвольных сайтов. Порядок middleware важен — <code>corsheaders.middleware.CorsMiddleware</code> должен стоять до <code>CommonMiddleware</code>."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Путают CORS (ограничение браузера, не относится к серверной безопасности как таковой — не защищает от прямых запросов curl/postman) с полноценной аутентификацией/авторизацией; включают <code>CORS_ALLOW_ALL_ORIGINS</code> «чтобы заработало» и забывают сузить в production."
          ]
        }
      ]
    },
    {
      "t": "Что гарантирует и что НЕ гарантирует механизм BackgroundTasks в FastAPI, и для каких задач его использование может быть рискованным?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "asyncio",
        "asgi",
        "rest-api",
        "http",
        "background-tasks"
      ],
      "pop": true,
      "d": "BackgroundTasks выполняет переданную функцию уже после отправки HTTP-ответа клиенту, но в том же процессе и без персистентной очереди: при падении/перезапуске процесса или ошибке внутри задачи результат не сохраняется и не повторяется автоматически.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "<code>BackgroundTasks</code> выполняет переданную функцию уже после отправки HTTP-ответа клиенту, но в том же процессе и без персистентной очереди: при падении/перезапуске процесса или ошибке внутри задачи результат не сохраняется и не повторяется автоматически."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Функции, добавленные через <code>background_tasks.add_task(...)</code>, ставятся в простой список и выполняются после того, как ASGI-сервер отправил ответ, в рамках того же процесса/event loop (для async-функций) или через threadpool (для sync)."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI, BackgroundTasks",
              "",
              "app = FastAPI()",
              "",
              "def send_welcome_email(email: str):",
              "    # Если здесь упадёт исключение, клиент об этом не узнает -",
              "    # ответ 200 уже отправлен. Нужен try/except + логирование.",
              "    print(f\"send to {email}\")",
              "",
              "@app.post(\"/register\")",
              "def register(email: str, background_tasks: BackgroundTasks):",
              "    background_tasks.add_task(send_welcome_email, email)",
              "    return {\"status\": \"registered\"}",
              "",
              "# Клиент получает 200 сразу, письмо отправляется после ответа;",
              "# при падении процесса сразу после ответа письмо может не отправиться."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Подходит для некритичных операций: отправка уведомления, запись лога, инвалидция кэша — там, где потеря задачи при падении процесса не приводит к серьёзным последствиям. Для критичных операций (отправка платежа, важных писем с гарантией доставки) нужна отдельная очередь задач (Celery, RQ, брокер сообщений) с подтверждением и повторными попытками."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Используют <code>BackgroundTasks</code> для длительных CPU-bound или гарантированно важных операций, предполагая надёжность на уровне очереди сообщений, которой там нет; не логируют исключения внутри фоновой задачи, из-за чего сбои остаются незамеченными (исключение просто не долетает до клиента, так как ответ уже отправлен)."
          ]
        }
      ]
    },
    {
      "t": "Как спроектировать версионирование REST API в Django REST Framework, сравнив подход через префикс URL и подход через заголовок Accept/кастомный заголовок?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "django-rest-framework",
        "routing",
        "rest-api",
        "caching",
        "logging",
        "api-versioning"
      ],
      "d": "URL-версионирование (/api/v1/...) проще в реализации, кэшировании и отладке, так как версия видна прямо в адресе; версионирование через заголовок (Accept: application/vnd.myapp.v2+json или X-API-Version) держит URL чистым, но сложнее для. Ключевые детали выбирают по требованиям и ограничениям.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "URL-версионирование (<code>/api/v1/...</code>) проще в реализации, кэшировании и отладке, так как версия видна прямо в адресе; версионирование через заголовок (<code>Accept: application/vnd.myapp.v2+json</code> или <code>X-API-Version</code>) держит URL чистым, но сложнее для отладки, логирования и кэширующих прокси, которые обычно не учитывают такие заголовки в ключе кэша."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "DRF поддерживает несколько встроенных схем версионирования через <code>DEFAULT_VERSIONING_CLASS</code>: <code>URLPathVersioning</code>, <code>NamespaceVersioning</code>, <code>AcceptHeaderVersioning</code>, <code>HostNameVersioning</code>. Выбранная схема определяет, как <code>request.version</code> извлекается из запроса, и это значение можно использовать в сериализаторах/view для выбора логики."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from django.urls import path",
              "from rest_framework.response import Response",
              "from rest_framework.views import APIView",
              "",
              "class OrderListView(APIView):",
              "    def get(self, request):",
              "        return Response({\"version\": request.version})",
              "",
              "urlpatterns = [",
              "    path(\"api/<str:version>/orders/\", OrderListView.as_view()),",
              "]"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> URL-версионирование — самый распространённый и предсказуемый вариант для публичных API: его проще документировать, тестировать через curl, кэшировать на уровне CDN по пути. Versioning через заголовок иногда выбирают для внутренних API, где важно не «размножать» пути, но тогда нужно убедиться, что вся инфраструктура (прокси, логирование, мониторинг) корректно учитывает этот заголовок."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Вводят версионирование API только «задним числом», когда уже накопились клиенты на v1 без возможности безопасно эволюционировать контракт; смешивают схемы (часть эндпоинтов версионируют по URL, часть — по заголовку) без единой политики, что усложняет поддержку."
          ]
        }
      ]
    },
    {
      "t": "Как во Flask написать WSGI-уровневый middleware (обёртку wsgi_app) и в чём его отличие от хуков before_request/after_request?",
      "l": "Middle",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "middleware",
        "routing",
        "wsgi",
        "request-context"
      ],
      "d": "WSGI-middleware оборачивает сам вызываемый объект app.wsgi_app, получая доступ к «сырому» WSGI-окружению до того, как Flask начнёт маршрутизацию и построит объект request; before_request/after_request работают уже внутри контекста запроса Flask и имеют доступ к высокоуровневым объектам фреймворка.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "WSGI-middleware оборачивает сам вызываемый объект <code>app.wsgi_app</code>, получая доступ к «сырому» WSGI-окружению до того, как Flask начнёт маршрутизацию и построит объект <code>request</code>; <code>before_request</code>/<code>after_request</code> работают уже внутри контекста запроса Flask и имеют доступ к высокоуровневым объектам фреймворка."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "WSGI-приложение — это просто вызываемый объект <code>(environ, start_response) -&gt; iterable</code>. Оборачивая <code>app.wsgi_app</code> в свою функцию/класс, можно модифицировать <code>environ</code> до того, как Flask его обработает, или обернуть ответ на самом низком уровне — это универсально и работает с любым WSGI-совместимым фреймворком, не только Flask."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "class StripPrefixMiddleware:",
              "    def __init__(self, app, prefix):",
              "        self.app = app",
              "        self.prefix = prefix",
              "",
              "    def __call__(self, environ, start_response):",
              "        path = environ.get(\"PATH_INFO\", \"\")",
              "        if path.startswith(self.prefix):",
              "            environ[\"PATH_INFO\"] = path[len(self.prefix):]",
              "        return self.app(environ, start_response)",
              "",
              "# wsgi.py",
              "from myapp import app as flask_app",
              "app = StripPrefixMiddleware(flask_app.wsgi_app, \"/api\")",
              "flask_app.wsgi_app = app"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> WSGI middleware обычно используют для инфраструктурных задач независимо от фреймворка (например, проксирование заголовков от балансировщика, сжатие gzip через стороннюю библиотеку, базовая авторизация на уровне инфраструктуры). <code>before_request</code>/<code>after_request</code> удобнее для логики, завязанной на Flask-специфичные объекты (<code>g</code>, <code>session</code>, маршрутизация Blueprint)."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Пытаются в WSGI middleware обращаться к Flask-специфичным вещам типа <code>flask.request</code>, которые на этом уровне ещё не существуют; забывают, что изменение <code>environ</code> в WSGI middleware должно происходить до вызова <code>self.app(environ, start_response)</code>, а не после."
          ]
        }
      ]
    },
    {
      "t": "Как корректно тестировать FastAPI-эндпоинт, зависящий от подключения к БД, без обращения к реальной базе данных, используя dependency_overrides?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "dependency-injection",
        "rest-api",
        "testing",
        "database",
        "api-versioning"
      ],
      "d": "В тестах создаётся TestClient, а реальная зависимость (например, get_db) подменяется на тестовую версию через app.dependency_overrides[get_db] = override_get_db, которая возвращает соединение с тестовой/in-memory БД или фиктивный объект.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "В тестах создаётся <code>TestClient</code>, а реальная зависимость (например, <code>get_db</code>) подменяется на тестовую версию через <code>app.dependency_overrides[get_db] = override_get_db</code>, которая возвращает соединение с тестовой/in-memory БД или фиктивный объект."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>dependency_overrides</code> — словарь на уровне <code>FastAPI</code>-приложения, где ключ — исходная функция-зависимость, значение — функция-замена. FastAPI проверяет этот словарь перед вызовом <code>Depends(...)</code>, и если есть переопределение, используется оно вместо оригинальной функции во всех эндпоинтах, ссылающихся на эту зависимость."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi.testclient import TestClient",
              "from myapp.main import app",
              "from myapp.deps import get_db",
              "",
              "def override_get_db():",
              "    yield \"fake-test-db-session\"",
              "",
              "def test_list_items():",
              "    app.dependency_overrides[get_db] = override_get_db",
              "    client = TestClient(app)",
              "    response = client.get(\"/items/\")",
              "    assert response.status_code == 200",
              "    app.dependency_overrides.clear()"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Такой подход позволяет тестировать бизнес-логику эндпоинта изолированно, используя SQLite in-memory или mock-объект вместо реальной production БД, значительно ускоряя тесты и делая их независимыми от внешней инфраструктуры. После теста важно очищать <code>dependency_overrides</code> (например, через фикстуру с <code>yield</code> и <code>app.dependency_overrides.clear()</code>), чтобы не влиять на другие тесты."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Забывают очистить <code>dependency_overrides</code> после теста, из-за чего подмена «утекает» в другие тестовые функции и даёт ложные результаты; подменяют зависимость по неправильному ключу (например, по обёртке, а не по оригинальной функции, если использовали <code>functools.partial</code> или лямбду при объявлении <code>Depends</code>)."
          ]
        }
      ]
    },
    {
      "t": "Как организовать настройки Django для разных окружений (разработка, staging, production), чтобы не дублировать общую конфигурацию и не хранить секреты в репозитории?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "configuration",
        "secrets-management",
        "database",
        "environment-variables"
      ],
      "d": "Общую конфигурацию выносят в базовый модуль settings/base.py, а окружение-специфичные настройки — в отдельные модули (settings/dev.py, settings/prod.py), которые импортируют base и переопределяют нужные значения.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Общую конфигурацию выносят в базовый модуль <code>settings/base.py</code>, а окружение-специфичные настройки — в отдельные модули (<code>settings/dev.py</code>, <code>settings/prod.py</code>), которые импортируют <code>base</code> и переопределяют нужные значения; секреты передают через переменные окружения (например, с помощью <code>django-environ</code>), а не хардкодят."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>DJANGO_SETTINGS_MODULE</code> указывает, какой именно модуль настроек загружать при старте процесса (например, <code>myproject.settings.prod</code>); <code>settings/prod.py</code> обычно делает <code>from .base import *</code> и затем переопределяет <code>DEBUG</code>, <code>ALLOWED_HOSTS</code>, настройки БД, читая их значения из окружения."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# settings/base.py",
              "INSTALLED_APPS = []",
              "MIDDLEWARE = []",
              "",
              "# settings/prod.py",
              "import environ",
              "from .base import *",
              "",
              "env = environ.Env()",
              "DEBUG = False",
              "SECRET_KEY = env(\"SECRET_KEY\")  # обязательная переменная, упадёт при отсутствии",
              "DATABASES = {\"default\": env.db(\"DATABASE_URL\")}",
              "ALLOWED_HOSTS = env.list(\"ALLOWED_HOSTS\")",
              "",
              "# Запуск: DJANGO_SETTINGS_MODULE=myproject.settings.prod gunicorn myproject.wsgi"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Такое разделение снижает риск случайно запустить production с <code>DEBUG=True</code> или с SQLite вместо PostgreSQL. <code>django-environ</code>/<code>python-decouple</code> упрощают чтение и приведение типов переменных окружения (<code>env.bool('DEBUG', default=False)</code>)."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Используют один <code>settings.py</code> с большим количеством <code>if os.environ.get('ENV') == 'prod':</code> внутри, что усложняет чтение и тестирование конфигурации; забывают добавить обязательную проверку наличия критичных переменных окружения в production-модуле, из-за чего приложение стартует с «молчаливыми» дефолтами там, где это опасно (например, <code>SECRET_KEY</code> по умолчанию)."
          ]
        }
      ]
    },
    {
      "t": "В FastAPI-эндпоинте async def внутри вызывается requests.get(...) для похода во внешний сервис. Почему это проблема, и как правильно исправить этот код, сохранив асинхронность эндпоинта?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "asyncio",
        "rest-api",
        "http"
      ],
      "pop": true,
      "d": "requests.get — синхронный блокирующий вызов; выполняясь внутри async def, он останавливает весь event loop на время сетевого запроса, замораживая обработку всех остальных конкурентных запросов приложения в этом процессе.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "<code>requests.get</code> — синхронный блокирующий вызов; выполняясь внутри <code>async def</code>, он останавливает весь event loop на время сетевого запроса, замораживая обработку всех остальных конкурентных запросов приложения в этом процессе; решение — использовать асинхронный HTTP-клиент (<code>httpx.AsyncClient</code>) с <code>await</code>, либо вынести вызов в threadpool."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Event loop <code>asyncio</code> однопоточно переключается между корутинами в точках <code>await</code>. Вызов обычной блокирующей функции без <code>await</code> — это обычный синхронный Python-код, который выполняется от начала до конца, не отдавая управление обратно event loop, то есть другие корутины не могут продолжить выполнение в это время."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "import requests",
              "from fastapi import FastAPI",
              "",
              "app = FastAPI()",
              "",
              "# Проблема: блокирует event loop на время сетевого запроса",
              "@app.get(\"/bad-proxy\")",
              "async def bad_proxy():",
              "    r = requests.get(\"https://example.com/api\")",
              "    return r.json()",
              "",
              "# Исправление: асинхронный клиент",
              "import httpx",
              "",
              "@app.get(\"/good-proxy\")",
              "async def good_proxy():",
              "    async with httpx.AsyncClient() as client:",
              "        r = await client.get(\"https://example.com/api\")",
              "        return r.json()"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Правильное исправление — заменить <code>requests</code> на <code>httpx.AsyncClient</code> (или <code>aiohttp</code>) и использовать <code>await client.get(...)</code>. Если библиотека принципиально синхронная и без асинхронной альтернативы, можно вызвать её через <code>await run_in_threadpool(requests.get, url)</code> (Starlette) или <code>loop.run_in_executor</code>, чтобы не блокировать event loop, хотя это не даёт истинного параллелизма для CPU-bound части."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Оставляют синхронный клиент «временно», и проблема незаметна при низкой нагрузке в разработке, но проявляется под нагрузкой в production как резкий рост latency у несвязанных запросов; переходят на <code>async def</code> «по инерции», не проверяя, что все вызываемые библиотеки внутри действительно асинхронные."
          ]
        }
      ]
    },
    {
      "t": "Как спроектировать middleware для rate limiting на уровне приложения (например, в Django или FastAPI), и какие данные нужно хранить, чтобы это работало корректно при нескольких инстансах приложения?",
      "l": "Middle",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "django",
        "fastapi",
        "middleware",
        "rest-api",
        "rate-limiting",
        "redis"
      ],
      "d": "Middleware должен на каждый запрос проверять и увеличивать счётчик обращений по ключу (например, IP или ID пользователя) с ограниченным временным окном в общем для всех инстансов хранилище (обычно Redis с TTL/атомарными. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Middleware должен на каждый запрос проверять и увеличивать счётчик обращений по ключу (например, IP или ID пользователя) с ограниченным временным окном в общем для всех инстансов хранилище (обычно Redis с TTL/атомарными операциями), а не в локальной памяти процесса, иначе лимит не будет общим при горизонтальном масштабировании."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Типичная реализация — алгоритм fixed window или sliding window/token bucket: для каждого ключа хранится счётчик запросов за текущее окно времени; при превышении лимита middleware возвращает <code>429 Too Many Requests</code>, обычно с заголовком <code>Retry-After</code>. Атомарность инкремента важна при конкурентных запросах от одного клиента — обычная проверка-потом-инкремент в Python без блокировки/атомарной операции в хранилище подвержена race condition."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "import time",
              "import redis",
              "from fastapi import FastAPI, Request",
              "from fastapi.responses import JSONResponse",
              "",
              "app = FastAPI()",
              "r = redis.Redis()",
              "",
              "LIMIT = 100",
              "WINDOW_SECONDS = 60",
              "",
              "@app.middleware(\"http\")",
              "async def rate_limit(request: Request, call_next):",
              "    client_id = request.client.host",
              "    key = f\"rl:{client_id}:{int(time.time() // WINDOW_SECONDS)}\"",
              "    count = r.incr(key)",
              "    if count == 1:",
              "        r.expire(key, WINDOW_SECONDS)",
              "    if count > LIMIT:",
              "        return JSONResponse(status_code=429, content={\"error\": \"rate_limited\"}, headers={\"Retry-After\": str(WINDOW_SECONDS)})",
              "    return await call_next(request)"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Хранение в памяти процесса (<code>dict</code> в Python) работает только для одного процесса/инстанса — при нескольких воркерах/подах лимит фактически умножается на их количество. Redis с <code>INCR</code>+<code>EXPIRE</code> или библиотеки типа <code>django-ratelimit</code>/сторонние middleware для FastAPI решают это за счёт общего хранилища."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Реализуют rate limiting на уровне одного процесса без учёта горизонтального масштабирования и обнаруживают проблему только в production при увеличении числа инстансов; забывают про <code>Retry-After</code> в ответе, из-за чего клиентам приходится угадывать, когда повторить запрос."
          ]
        }
      ]
    },
    {
      "t": "Как организовать Flask-приложение с несколькими Blueprint, у каждого из которых есть общая логика проверки прав доступа, не дублируя код проверки в каждом Blueprint?",
      "l": "Middle",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "routing",
        "blueprints"
      ],
      "d": "Общую проверку выносят в переиспользуемую функцию/декоратор и подключают её через before_request конкретного Blueprint (bp.before_request) или через общий механизм на уровне приложения с проверкой request.blueprint, избегая копирования одинаковой проверки в каждый модуль.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Общую проверку выносят в переиспользуемую функцию/декоратор и подключают её через <code>before_request</code> конкретного Blueprint (<code>bp.before_request</code>) или через общий механизм на уровне приложения с проверкой <code>request.blueprint</code>, избегая копирования одинаковой проверки в каждый модуль."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "У каждого <code>Blueprint</code> есть собственные хуки <code>before_request</code>/<code>after_request</code>, которые срабатывают только для маршрутов этого Blueprint, в отличие от <code>app.before_request</code>, который срабатывает для всех запросов. Это позволяет применить, например, проверку авторизации только к <code>admin</code>-Blueprint, не трогая публичные маршруты."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from flask import Blueprint, g, abort",
              "",
              "admin_bp = Blueprint(\"admin\", __name__, url_prefix=\"/admin\")",
              "",
              "@admin_bp.before_request",
              "def check_admin_rights():",
              "    if not getattr(g, \"current_user\", None) or not g.current_user.get(\"is_admin\"):",
              "        abort(403)",
              "",
              "@admin_bp.route(\"/stats\")",
              "def stats():",
              "    return {\"visits\": 1000}",
              "",
              "# Запрос к /admin/stats без g.current_user.is_admin -> 403,",
              "# запрос к публичному Blueprint эта проверка не затрагивает."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для действительно общей логики (например, добавление request_id для логирования) используют <code>app.before_request</code>; для логики, специфичной для группы маршрутов (авторизация только для <code>/admin/*</code>), — <code>bp.before_request</code> конкретного Blueprint. Декораторы на отдельные view оставляют для точечных исключений внутри Blueprint."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Копируют одинаковый код проверки прав в каждую view-функцию вместо использования <code>before_request</code> Blueprint; путают <code>app.before_request</code> (для всех маршрутов) и <code>bp.before_request</code> (только для маршрутов конкретного Blueprint), получая неожиданно широкое или узкое применение проверки."
          ]
        }
      ]
    },
    {
      "t": "Как спроектировать middleware для логирования запросов с correlation/request ID, который можно использовать для сквозной трассировки запроса через несколько слоёв приложения и внешних сервисов?",
      "l": "Middle",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "middleware",
        "asyncio",
        "rest-api",
        "logging",
        "request-context"
      ],
      "d": "Middleware при входе запроса либо берёт готовый ID из заголовка (например, X-Request-ID, если он пришёл от прокси/клиента), либо генерирует новый uuid4, кладёт его в контекст логирования. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Middleware при входе запроса либо берёт готовый ID из заголовка (например, <code>X-Request-ID</code>, если он пришёл от прокси/клиента), либо генерирует новый <code>uuid4</code>, кладёт его в контекст логирования (например, через <code>contextvars</code>) и добавляет этот же ID в заголовок ответа и во все исходящие вызовы к другим сервисам."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Request ID должен быть доступен не только в самом middleware, но и глубже — в бизнес-логике, логировании, вызовах к БД/внешним API. Для этого обычно используют <code>contextvars.ContextVar</code> (в async-коде) или thread-local (в синхронном), чтобы не передавать ID явным параметром через все функции."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "import uuid",
              "import contextvars",
              "from fastapi import FastAPI, Request",
              "",
              "request_id_var = contextvars.ContextVar(\"request_id\", default=None)",
              "app = FastAPI()",
              "",
              "@app.middleware(\"http\")",
              "async def add_request_id(request: Request, call_next):",
              "    rid = request.headers.get(\"X-Request-ID\", str(uuid.uuid4()))",
              "    request_id_var.set(rid)",
              "    response = await call_next(request)",
              "    response.headers[\"X-Request-ID\"] = rid",
              "    return response",
              "",
              "# В логах/обработчиках: logger.info(\"\", extra={\"request_id\": request_id_var.get()})"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Этот же ID передают дальше при вызове других сервисов (например, в заголовке <code>X-Request-ID</code> исходящего HTTP-запроса), чтобы можно было сквозно искать все логи, относящиеся к одному запросу пользователя, по цепочке сервисов — это особенно важно при диагностике проблем в распределённой системе."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Генерируют новый ID на каждом внутреннем слое вместо того, чтобы пронести один и тот же через всю цепочку; забывают очищать <code>ContextVar</code> между запросами в приложениях с пулом воркеров, из-за чего значение может «подтекать» между независимыми запросами при неправильном использовании контекста."
          ]
        }
      ]
    },
    {
      "t": "Как в DRF настроены и в каком порядке применяются authentication_classes и permission_classes, и что произойдёт, если аутентификация не удалась, а разрешение требует конкретного пользователя?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "django-rest-framework",
        "authentication",
        "authorization"
      ],
      "d": "Сначала DRF последовательно пробует классы из authentication_classes, пока один из них не определит пользователя (или не останется анонимный AnonymousUser), и только после этого применяются permission_classes, проверяющие права уже для определённого (в том числе анонимного) пользователя.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Сначала DRF последовательно пробует классы из <code>authentication_classes</code>, пока один из них не определит пользователя (или не останется анонимный <code>AnonymousUser</code>), и только после этого применяются <code>permission_classes</code>, проверяющие права уже для определённого (в том числе анонимного) пользователя; при неуспехе разрешения клиент получает <code>401</code> (если не аутентифицирован) или <code>403</code> (если аутентифицирован, но прав не хватает)."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Каждый класс аутентификации реализует метод <code>authenticate(request)</code>, возвращающий пару <code>(user, auth)</code> либо <code>None</code> (если эта схема не применима к запросу, например нет нужного заголовка) либо выбрасывающий исключение <code>AuthenticationFailed</code> (если заголовок есть, но токен невалиден). Если ни один класс не аутентифицировал пользователя, <code>request.user</code> становится <code>AnonymousUser</code>. После этого DRF проверяет каждый <code>permission_class.has_permission(request, view)</code> по очереди — первое <code>False</code> прерывает обработку."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from rest_framework.views import APIView",
              "from rest_framework.authentication import TokenAuthentication",
              "from rest_framework.permissions import IsAuthenticated",
              "",
              "class OrdersView(APIView):",
              "    authentication_classes = [TokenAuthentication]",
              "    permission_classes = [IsAuthenticated]",
              "",
              "    def get(self, request):",
              "        return Response({\"user\": request.user.username})",
              "",
              "# Без заголовка Authorization -> 401",
              "# С валидным токеном, но IsAdminUser вместо IsAuthenticated и обычным пользователем -> 403"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Код статуса ошибки зависит от того, есть ли хоть один заголовок <code>WWW-Authenticate</code> в выбранной схеме аутентификации: если пользователь не аутентифицирован и выбранная схема поддерживает <code>401</code>, вернётся <code>401 Unauthorized</code>; если пользователь аутентифицирован, но у него не хватает прав — <code>403 Forbidden</code>. На этом построена логика, например, <code>IsAuthenticated</code> (проверяет, что <code>request.user.is_authenticated</code>) против <code>IsAdminUser</code> (дополнительно проверяет <code>is_staff</code>)."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Путают <code>401</code> и <code>403</code>, возвращая <code>403</code> для полностью неаутентифицированных запросов; подключают несколько конфликтующих схем аутентификации без понимания порядка их применения, из-за чего непонятно, какая именно схема «съела» запрос и не дала следующей шанс."
          ]
        }
      ]
    },
    {
      "t": "Клиенты иногда повторно отправляют один и тот же запрос на создание заказа из-за таймаута на своей стороне (хотя сервер успел его обработать). Как спроектировать API-обработчик так, чтобы повторная доставка не создавала дублирующиеся заказы?",
      "l": "Middle",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "rest-api",
        "idempotency"
      ],
      "pop": true,
      "d": "Клиент должен передавать идемпотентный ключ (например, заголовок Idempotency-Key), а сервер — сохранять связь между этим ключом и результатом первой успешной обработки, чтобы при повторном запросе с тем же ключом вернуть сохранённый результат вместо повторного создания заказа.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Клиент должен передавать идемпотентный ключ (например, заголовок <code>Idempotency-Key</code>), а сервер — сохранять связь между этим ключом и результатом первой успешной обработки, чтобы при повторном запросе с тем же ключом вернуть сохранённый результат вместо повторного создания заказа."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "При первом запросе с новым <code>Idempotency-Key</code> сервер атомарно (например, через уникальный индекс в БД на этот ключ) резервирует ключ, выполняет операцию и сохраняет результат (например, <code>order_id</code> и тело ответа) вместе с ключом. При повторном запросе с тем же ключом сервер находит сохранённую запись и возвращает тот же результат без повторного выполнения бизнес-логики."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI, Header, HTTPException",
              "app = FastAPI()",
              "idempotency_store = {}  # в реальности - таблица БД с уникальным индексом на key",
              "",
              "@app.post(\"/orders\")",
              "def create_order(payload: dict, idempotency_key: str = Header()):",
              "    if idempotency_key in idempotency_store:",
              "        return idempotency_store[idempotency_key]",
              "    order = {\"id\": len(idempotency_store) + 1, **payload}",
              "    idempotency_store[idempotency_key] = order",
              "    return order",
              "",
              "# Два одинаковых POST с одним и тем же Idempotency-Key",
              "# должны вернуть один и тот же order id, а не два разных заказа."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Важно учитывать конкурентный повтор «почти одновременно» (например, клиент шлёт повтор ещё до завершения первой обработки) — для этого ключ резервируют до выполнения операции, используя уникальность на уровне БД, а не только проверку-потом-запись в коде приложения, чтобы избежать гонки. Ключ обычно должен жить ограниченное время (например, 24 часа), а не бесконечно."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Реализуют идемпотентность только проверкой «а нет ли уже такого заказа с такими же полями» — это ненадёжно при похожих, но не идентичных легитимных заказах; не обрабатывают случай параллельного повтора запроса, полагаясь только на то, что полная обработка первого запроса уже завершится раньше второго."
          ]
        }
      ]
    },
    {
      "t": "Как с помощью Pydantic (v2) валидировать сложную вложенную структуру данных, где корректность одного поля зависит от значения другого поля того же объекта?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "pydantic",
        "validation"
      ],
      "d": "Для межполевой валидации в Pydantic v2 используют декоратор @model_validator(mode='after') на уровне модели, который получает уже собранный объект со всеми полями и может проверить их согласованность или выбросить ValueError.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Для межполевой валидации в Pydantic v2 используют декоратор <code>@model_validator(mode='after')</code> на уровне модели, который получает уже собранный объект со всеми полями и может проверить их согласованность или выбросить <code>ValueError</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>@field_validator</code> проверяет/преобразует одно поле изолированно и не гарантированно видит остальные поля в нужном порядке; <code>@model_validator(mode='after')</code> выполняется после того, как все отдельные поля уже провалидированы и собраны в модель, поэтому внутри него безопасно сравнивать несколько полей сразу."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from pydantic import BaseModel, model_validator",
              "",
              "class DiscountIn(BaseModel):",
              "    discount_type: str      # \"percent\" или \"fixed\"",
              "    value: float",
              "",
              "    @model_validator(mode=\"after\")",
              "    def check_value_range(self):",
              "        if self.discount_type == \"percent\" and not (0 < self.value <= 100):",
              "            raise ValueError(\"percent discount must be between 0 and 100\")",
              "        if self.discount_type == \"fixed\" and self.value <= 0:",
              "            raise ValueError(\"fixed discount must be positive\")",
              "        return self",
              "",
              "# DiscountIn(discount_type=\"percent\", value=150) -> ValidationError"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для вложенных моделей (поле типа другой <code>BaseModel</code> или <code>list[OtherModel]</code>) Pydantic валидирует вложенные объекты рекурсивно; межполевые проверки на уровне вложенного объекта делают в его собственном <code>model_validator</code>, а проверки, затрагивающие и внешние, и вложенные поля, — в <code>model_validator</code> внешней модели."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Пытаются провести межполевую проверку в <code>field_validator</code> одного из полей, рассчитывая на порядок объявления полей в классе — в общем случае это ненадёжно; забывают, что <code>model_validator(mode='after')</code> в Pydantic v2 получает и должен возвращать сам экземпляр модели (<code>self</code>), а не словарь, в отличие от <code>mode='before'</code>."
          ]
        }
      ]
    },
    {
      "t": "В чём принципиальная разница между валидацией через Django Form и через DRF Serializer, и когда в одном Django-проекте обоснованно использовать оба механизма одновременно?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "django-rest-framework",
        "validation",
        "rest-api",
        "serialization",
        "request-context"
      ],
      "d": "Django Form ориентирован на обработку данных HTML-формы и рендеринг виджетов/ошибок в шаблоне (server-rendered страницы), тогда как DRF Serializer ориентирован на (де)сериализацию структурированных данных (обычно JSON) для API.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Django <code>Form</code> ориентирован на обработку данных HTML-формы и рендеринг виджетов/ошибок в шаблоне (server-rendered страницы), тогда как DRF <code>Serializer</code> ориентирован на (де)сериализацию структурированных данных (обычно JSON) для API; в одном проекте оба уместны, если часть приложения — классические серверные страницы, а часть — JSON API."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "<code>Form</code>/<code>ModelForm</code> тесно интегрированы с Django-шаблонами: умеют рендерить HTML-поля, показывать ошибки рядом с полем, работать с <code>multipart/form-data</code> для файлов в контексте обычной веб-страницы. <code>Serializer</code>/<code>ModelSerializer</code> не привязаны к HTML: они описывают структуру данных для API, умеют валидировать и преобразовывать вложенные структуры, списки и т. п., без понятия «виджет»."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Для HTML-страницы",
              "from django import forms",
              "class RegistrationForm(forms.Form):",
              "    email = forms.EmailField()",
              "    password = forms.CharField(widget=forms.PasswordInput, min_length=8)",
              "",
              "# Для JSON API (DRF)",
              "from rest_framework import serializers",
              "class RegistrationSerializer(serializers.Serializer):",
              "    email = serializers.EmailField()",
              "    password = serializers.CharField(min_length=8, write_only=True)",
              "",
              "# Общую бизнес-проверку (например, \"email не занят\") имеет смысл",
              "# вынести в отдельную функцию/сервис и вызывать из обоих мест."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> В проекте с админкой/классическими страницами (например, регистрация через HTML-форму) и одновременно с мобильным приложением, которое ходит в JSON API, естественно иметь <code>RegistrationForm</code> для веб-страницы и <code>RegistrationSerializer</code> для API — они могут частично пересекаться по бизнес-правилам, но решают разные задачи представления."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Пытаются «подружить» <code>Form</code> напрямую с API, передавая в него JSON как если бы это были данные формы, что приводит к неожиданному поведению с типами и списками; дублируют валидационную логику в обоих местах без выделения общей функции/доменного слоя, из-за чего правила расходятся при изменении требований."
          ]
        }
      ]
    },
    {
      "t": "Flask-приложение использует Flask-SQLAlchemy и запускает фоновую задачу через threading.Thread внутри обработчика запроса. В фоновой задаче обращение к db.session падает с ошибкой контекста приложения. Как это исправить?",
      "l": "Middle",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "configuration",
        "http",
        "sqlalchemy",
        "environment-variables",
        "request-context"
      ],
      "d": "Вне обработки HTTP-запроса (в отдельном потоке, фоновой задаче, планировщике) нет активного application context, который Flask-SQLAlchemy использует для доступа к конфигурации и соединению; нужно явно создать его через with app.app_context(): внутри кода, выполняемого в отдельном потоке.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Вне обработки HTTP-запроса (в отдельном потоке, фоновой задаче, планировщике) нет активного application context, который Flask-SQLAlchemy использует для доступа к конфигурации и соединению; нужно явно создать его через <code>with app.app_context():</code> внутри кода, выполняемого в отдельном потоке."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Flask привязывает текущее приложение к контекстной локальной переменной (application context) на время обработки запроса; при запуске нового потока этот контекст не наследуется автоматически — поток не «видит» активное приложение. Flask-SQLAlchemy и другие расширения, читающие конфигурацию через <code>current_app</code>, без контекста выбросят <code>RuntimeError: Working outside of application context</code>."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "import threading",
              "from flask import Flask, current_app",
              "",
              "app = Flask(__name__)",
              "# db = SQLAlchemy(app)",
              "",
              "def process_in_background(app, order_id):",
              "    with app.app_context():",
              "        # теперь db.session и current_app доступны корректно",
              "        order = db.session.get(Order, order_id)",
              "        order.status = \"processed\"",
              "        db.session.commit()",
              "",
              "@app.route(\"/orders/<int:order_id>/process\", methods=[\"POST\"])",
              "def process_order(order_id):",
              "    threading.Thread(target=process_in_background, args=(app, order_id)).start()",
              "    return {\"status\": \"processing\"}, 202"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для фоновых операций внутри процесса нужно явно оборачивать код в <code>with app.app_context():</code>; но для действительно надёжных фоновых задач (которые не должны исчезать при падении процесса) правильнее использовать отдельный воркер очереди задач (Celery/RQ) с собственной инициализацией приложения, а не <code>threading.Thread</code> внутри веб-процесса."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Передают в поток сам объект <code>app</code>, но не создают контекст явно внутри потока; злоупотребляют <code>threading.Thread</code> для операций, которые по надёжности должны быть в очереди задач с повторными попытками, в результате получая потерю данных при падении процесса во время выполнения потока."
          ]
        }
      ]
    },
    {
      "t": "Как в Django REST Framework написать middleware/exception handler, который приводит разные типы ошибок (валидация, 404, необработанные исключения) к единому формату ответа JSON для всего API?",
      "l": "Middle",
      "c": "django",
      "g": [
        "python",
        "django",
        "django-rest-framework",
        "middleware",
        "validation",
        "configuration",
        "rest-api",
        "http"
      ],
      "d": "В DRF для этого переопределяют EXCEPTION_HANDLER в настройках, указывая собственную функцию-обработчик, которая вызывает стандартный exception_handler DRF для известных исключений и переформатирует его response.data в единую. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "В DRF для этого переопределяют <code>EXCEPTION_HANDLER</code> в настройках, указывая собственную функцию-обработчик, которая вызывает стандартный <code>exception_handler</code> DRF для известных исключений и переформатирует его <code>response.data</code> в единую структуру, а также перехватывает непредвиденные исключения для возврата согласованного <code>500</code>."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "DRF по умолчанию вызывает функцию, заданную в <code>REST_FRAMEWORK['EXCEPTION_HANDLER']</code> (по умолчанию <code>rest_framework.views.exception_handler</code>), для любого исключения, возникшего во view, если оно унаследовано от <code>APIException</code> или относится к обрабатываемым (<code>Http404</code>, <code>PermissionDenied</code>). Собственная функция может вызвать оригинальный обработчик, получить стандартный <code>Response</code>, а затем изменить формат <code>response.data</code> под принятый в проекте контракт ошибок."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from rest_framework.views import exception_handler as drf_exception_handler",
              "",
              "def custom_exception_handler(exc, context):",
              "    response = drf_exception_handler(exc, context)",
              "    if response is not None:",
              "        response.data = {\"error\": {\"code\": response.status_code, \"details\": response.data}}",
              "        return response",
              "    # Непредвиденная ошибка - не раскрываем внутренние детали клиенту",
              "    return None",
              "",
              "# settings.py",
              "REST_FRAMEWORK = {\"EXCEPTION_HANDLER\": \"myapp.exceptions.custom_exception_handler\"}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Такой единый обработчик упрощает жизнь клиентам API: независимо от того, это ошибка валидации сериализатора, <code>404</code> или <code>403</code>, формат ответа (например, <code>{\"error\": {\"code\": ..., \"message\": ...}}</code>) остаётся одинаковым, что упрощает обработку ошибок на фронтенде."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Переопределяют обработчик, но забывают вызвать оригинальный <code>exception_handler</code> для стандартных случаев, теряя часть автоматической логики DRF (например, корректную обработку <code>Http404</code>); не отличают ожидаемые ошибки (<code>APIException</code> и подклассы) от непредвиденных программных ошибок, из-за чего детали внутренней ошибки (стектрейс, сообщение исключения) могут утечь клиенту."
          ]
        }
      ]
    },
    {
      "t": "Как в FastAPI спроектировать зависимость, которая открывает сессию работы с БД на время одного запроса и гарантированно закрывает её даже при исключении внутри обработчика?",
      "l": "Middle",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "dependency-injection",
        "rest-api"
      ],
      "d": "Зависимость пишется как генератор с yield: код до yield открывает сессию, код после yield (в блоке finally) закрывает её независимо от того, завершился ли обработчик нормально или с исключением.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Зависимость пишется как генератор с <code>yield</code>: код до <code>yield</code> открывает сессию, код после <code>yield</code> (в блоке <code>finally</code>) закрывает её независимо от того, завершился ли обработчик нормально или с исключением."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "FastAPI поддерживает зависимости-генераторы: всё, что до <code>yield</code>, выполняется перед вызовом эндпоинта, значение после <code>yield</code> передаётся как аргумент, а код после <code>yield</code> выполняется после завершения обработки запроса — причём FastAPI гарантирует вызов этой части даже если эндпоинт выбросил исключение, оборачивая её в try/finally."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import FastAPI, Depends",
              "from sqlalchemy.orm import Session",
              "from .database import SessionLocal",
              "",
              "app = FastAPI()",
              "",
              "def get_db():",
              "    db = SessionLocal()",
              "    try:",
              "        yield db",
              "    finally:",
              "        db.close()",
              "",
              "@app.get(\"/users/{user_id}\")",
              "def read_user(user_id: int, db: Session = Depends(get_db)):",
              "    return db.get(User, user_id)",
              "",
              "# Даже если read_user выбросит исключение, db.close() выполнится",
              "# благодаря finally внутри зависимости get_db."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Такой паттерн — стандартный способ управления ресурсами на время запроса (сессия БД, соединение с внешним сервисом, блокировка). Важно использовать именно <code>try/finally</code> внутри зависимости, а не надеяться, что код после <code>yield</code> выполнится «сам по себе» без исключений."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Пишут код закрытия ресурса после <code>yield</code> без <code>try/finally</code>, из-за чего при исключении в обработчике соединение не закрывается и со временем исчерпывается пул соединений; открывают сессию с областью видимости шире, чем один запрос (например, на уровне модуля), что приводит к расшариванию незакоммиченных изменений между независимыми запросами."
          ]
        }
      ]
    },
    {
      "t": "Как спроектировать безопасное управление секретами конфигурации (пароли БД, API-ключи) для Django/FastAPI-приложения, разворачиваемого в нескольких окружениях, без хранения секретов в коде?",
      "l": "Middle",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "django",
        "fastapi",
        "pydantic",
        "configuration",
        "secrets-management",
        "rest-api"
      ],
      "d": "Секреты передают через переменные окружения процесса (или через специализированный секрет-менеджер — Vault, AWS Secrets Manager, k8s Secrets), которые приложение читает при старте; в репозиторий попадает только шаблон/пример конфигурации без реальных значений (.env.example), а не сами секреты.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Секреты передают через переменные окружения процесса (или через специализированный секрет-менеджер — Vault, AWS Secrets Manager, k8s Secrets), которые приложение читает при старте; в репозиторий попадает только шаблон/пример конфигурации без реальных значений (<code>.env.example</code>), а не сами секреты."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Приложение при старте читает значения через <code>os.environ</code>/<code>pydantic-settings</code>/<code>django-environ</code>, ожидая, что реальные значения будут подставлены средой выполнения (CI/CD, оркестратор контейнеров, systemd-unit), а не захардкожены. Секрет-менеджеры дополнительно дают возможность централизованной ротации и аудита доступа к секретам."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "yaml",
            "title": "example.yaml",
            "lines": [
              "# docker-compose.yml (пример, без реальных секретов)",
              "services:",
              "  web:",
              "    image: myapp:latest",
              "    environment:",
              "      - DATABASE_URL=${DATABASE_URL}",
              "      - SECRET_KEY=${SECRET_KEY}",
              "    # Реальные значения DATABASE_URL/SECRET_KEY задаются в .env,",
              "    # который не попадает в git (указан в .gitignore), либо приходят",
              "    # из секрет-хранилища оркестратора при деплое."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для разных окружений (dev/staging/prod) используют разные наборы секретов с разным уровнем доступа; в CI важно не печатать секреты в логах и явно помечать переменные как secret/masked. Ротация ключа не должна требовать пересборки образа приложения — значение должно подхватываться через переменные окружения/секрет-хранилище при перезапуске."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Коммитят <code>.env</code> с реальными значениями «один раз, временно»; хранят одинаковый секрет для всех окружений, из-за чего компрометация dev-окружения автоматически угрожает production; логируют полный объект настроек целиком (например, при ошибке конфигурации), случайно выводя секреты в лог-агрегатор."
          ]
        }
      ]
    },
    {
      "t": "Тесты Flask-приложения успешно проходят локально, но на CI/production при тех же входных данных эндпоинт возвращает другой результат (например, 500 вместо 200). С чего начать диагностику, связанную с конфигурацией, а не с самим кодом бизнес-логики?",
      "l": "Middle",
      "c": "flask",
      "g": [
        "python",
        "flask",
        "dependency-injection",
        "configuration",
        "testing",
        "sqlalchemy",
        "api-versioning",
        "environment-variables"
      ],
      "d": "Стоит прежде всего сравнить фактическую конфигурацию окружений: значения app.config (включая DEBUG/TESTING/SECRET_KEY), версии зависимостей, переменные окружения и используемую БД — локальные тесты часто неявно используют иные. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Стоит прежде всего сравнить фактическую конфигурацию окружений: значения <code>app.config</code> (включая <code>DEBUG</code>/<code>TESTING</code>/<code>SECRET_KEY</code>), версии зависимостей, переменные окружения и используемую БД — локальные тесты часто неявно используют иные настройки (SQLite in-memory, другой часовой пояс, иная версия библиотеки), чем production."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Расхождение поведения при одинаковом коде почти всегда означает разницу во входных условиях: другая версия Python/библиотеки, другая настройка БД (диалект SQL, часовой пояс, кодировка), отсутствующая в production переменная окружения, другой режим <code>DEBUG</code>/<code>TESTING</code>, влияющий на обработку исключений Flask."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "Чек-лист для диагностики расхождения local vs production:",
              "",
              "1. python --version и pip freeze на обеих средах - сравнить diff.",
              "2. app.config[\"DEBUG\"], app.config[\"TESTING\"], часовой пояс, SQLALCHEMY_DATABASE_URI.",
              "3. Диалект БД: SQLite (локально/тесты) vs PostgreSQL/MySQL (production) -",
              "   разное поведение NULL, уникальных constraint, регистра строк при сравнении.",
              "4. Переменные окружения: вывести список обязательных и проверить, что все",
              "   установлены в production (например, через healthcheck-эндпоинт для DEBUG-only).",
              "",
              "Результат диагностики должен указывать на конкретное отличие конфигурации,",
              "а не просто подтверждать \"у меня работает\"."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Эффективная диагностика — явно вывести/залогировать на обеих средах: версию Python и ключевых пакетов (<code>pip freeze</code>), значения ключевых <code>app.config</code>, фактический SQL-диалект БД. Часто причина — в тестах используется SQLite, а в production PostgreSQL/MySQL с другими правилами типов или ограничениями, которые не проявляются на SQLite."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Сразу начинают переписывать бизнес-логику, предполагая баг в коде, хотя код идентичен в обеих средах; не фиксируют версии зависимостies (<code>requirements.txt</code> без точных версий), из-за чего локально и в CI/production установлены разные minor-версии библиотек с разным поведением."
          ]
        }
      ]
    },
    {
      "t": "Сервис на FastAPI отдаёт публичный API внешним клиентам. Вам нужно изменить формат ответа одного эндпоинта (переименовать поле и изменить тип другого) без синхронного обновления всех клиентов. Как спроектировать эволюцию контракта API и процесс отказа от старой версии?",
      "l": "Senior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "rest-api",
        "api-versioning",
        "serialization"
      ],
      "d": "Варианты — версионирование API (новый путь/заголовок версии), поддержка старого и нового формата одновременно через дополнительные поля с периодом параллельной поддержки, либо строгая политика deprecation с заранее объявленным сроком отключения старого контракта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Варианты — версионирование API (новый путь/заголовок версии), поддержка старого и нового формата одновременно через дополнительные поля с периодом параллельной поддержки, либо строгая политика deprecation с заранее объявленным сроком отключения старого контракта; выбор зависит от того, кто клиенты, насколько они управляемы и насколько критична обратная совместимость."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Явное версионирование (<code>/v2/...</code> или заголовок) позволяет годами поддерживать старые клиенты параллельно с новыми, но увеличивает поверхность поддержки кода. Расширение контракта (добавление нового поля рядом со старым, двойная запись в оба поля) позволяет клиентам мигрировать поэтапно без немедленной жёсткой поломки, но временно усложняет схему данных и сериализацию.",
            "Жёсткое версионирование даёт предсказуемость для внешних клиентов, но дорого в поддержке нескольких параллельных версий логики и тестов; расширение контракта без версии дешевле в моменте, но увеличивает сложность схемы и риск, что часть клиентов так и не мигрирует. Решение должно учитывать контроль над клиентами, критичность изменения и готовность команды поддерживать параллельные версии ограниченное время."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Переходный вариант: оба поля временно присутствуют в ответе",
              "class OrderOutV1Compat(BaseModel):",
              "    order_id: int           # старое имя поля, помечено как deprecated в OpenAPI",
              "    id: int                 # новое имя того же значения",
              "    total_amount: float     # старый тип (float)",
              "    amount_cents: int       # новый тип (int, в минимальных единицах валюты)",
              "",
              "# Через объявленный срок (например, 3 месяца и уведомление клиентов)",
              "# поля order_id/total_amount удаляются в /v2."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Критерии выбора: количество и управляемость клиентов (внутренний сервис с контролируемым деплоем — можно быстро заменить все вызовы; публичное API с неизвестными внешними клиентами — нужна параллельная поддержка и объявленный срок устаревания), частота изменений контракта, наличие контрактных тестов/схемы (OpenAPI) для отслеживания breaking changes."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Меняют публичный контракт «по месту» без версионирования, полагаясь на то, что клиенты «обновятся сами»; держат старую версию бесконечно без чёткого плана и даты отключения, из-за чего накапливается технический долг и поддержка нескольких версий становится постоянной нагрузкой."
          ]
        }
      ]
    },
    {
      "t": "Команда запускает новый backend-сервис и выбирает между Django (с DRF), FastAPI и Flask. Как подойти к этому выбору и на какие критерии ориентироваться, учитывая состав команды, требования к нагрузке и экосистему?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "django",
        "django-rest-framework",
        "fastapi",
        "pydantic",
        "flask",
        "validation"
      ],
      "d": "Выбор зависит не от абстрактного «что лучше», а от конкретных факторов: нужна ли встроенная админка и ORM «из коробки» (в пользу Django), нужна ли нативная асинхронность и строгая типизация контракта (в пользу. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Выбор зависит не от абстрактного «что лучше», а от конкретных факторов: нужна ли встроенная админка и ORM «из коробки» (в пользу Django), нужна ли нативная асинхронность и строгая типизация контракта (в пользу FastAPI), важна ли максимальная простота и минимум навязанных решений (в пользу Flask), а также от опыта команды с каждым из фреймворков."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Django даёт целостную экосистему (ORM, миграции, админка, аутентификация) и ускоряет разработку типовых CRUD-приложений, но накладывает больше структуры и накладных расходов на нестандартные сценарии. FastAPI даёт нативную поддержку async, автогенерацию OpenAPI и строгую типизацию через Pydantic, но требует самостоятельно собирать часть инфраструктуры (ORM, админку, фоновые задачи), которая в Django идёт «из коробки». Flask — минималистичен и гибок, что хорошо для нестандартных или небольших сервисов, но требует больше решений вручную (структура проекта, выбор ORM, валидация) по мере роста.",
            "Django экономит время на инфраструктуре за счёт меньшей гибкости и более тяжёлого «веса» фреймворка; FastAPI даёт современный DX и async, но требует больше самостоятельной сборки экосистемы и аккуратности с блокирующим кодом; Flask максимально гибок, но взваливает архитектурные решения на команду. Критерии выбора — опыт команды, профиль нагрузки, требования к документации API и наличие готовых интеграций, а не абстрактная «производительность фреймворка»."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "Чек-лист для выбора фреймворка под новый сервис:",
              "",
              "1. Нужна ли встроенная админка/ORM/auth \"из коробки\"? -> Django(DRF) выигрывает.",
              "2. Основная нагрузка - много параллельных I/O-bound вызовов внешних API",
              "   с async-совместимыми клиентами? -> FastAPI выигрывает.",
              "3. Команда уже глубоко знает один из фреймворков и срок проекта короткий? ->",
              "   использовать знакомый инструмент может быть важнее теоретических плюсов другого.",
              "4. Сервис простой, без сложной бизнес-логики и БД? -> Flask может быть достаточен."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Важно оценить: какие у сервиса основные паттерны нагрузки (много I/O-bound внешних вызовов — в пользу async-ориентированного FastAPI), есть ли готовая команда с опытом в конкретном фреймворке (переучивание стоит времени и рисков), нужна ли админ-панель для внутренних пользователей «бесплатно» (Django), насколько критична строгая OpenAPI-документация для внешних интеграторов (FastAPI)."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Выбирают FastAPI «потому что модно и асинхронно», не проверив, что реальные зависимости (драйверы БД, сторонние SDK) у сервиса синхронные и async не даёт выигрыша; выбирают Django для простого микросервиса без веб-страниц и админки, получая избыточную сложность и накладные расходы ORM там, где хватило бы лёгкого Flask/FastAPI-приложения."
          ]
        }
      ]
    },
    {
      "t": "Высоконагруженный публичный API должен последовательно применять аутентификацию, rate limiting, логирование и distributed tracing через middleware. Как спроектировать порядок и реализацию этого стека middleware с учётом влияния на latency и надёжность?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "middleware",
        "validation",
        "rest-api",
        "rate-limiting",
        "logging",
        "distributed-tracing"
      ],
      "d": "Порядок должен соответствовать логике: сначала дешёвые и критичные для безопасности проверки (например, базовая валидация формата запроса, затем rate limiting по IP до аутентификации, чтобы не тратить ресурсы на аутентификацию. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Порядок должен соответствовать логике: сначала дешёвые и критичные для безопасности проверки (например, базовая валидация формата запроса, затем rate limiting по IP до аутентификации, чтобы не тратить ресурсы на аутентификацию атакующего), затем аутентификация, затем остальные сквозные задачи (логирование с учётом личности пользователя, tracing); конкретный порядок зависит от того, какие данные нужны каждому слою и какую стоимость он добавляет к latency."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Каждый дополнительный middleware добавляет к latency время своего выполнения (поход в Redis для rate limit, проверка токена, запись лога) и потенциальную точку отказа (если внешний rate-limit store недоступен, что делать — отказывать всем запросам или пропускать без лимита). Порядок важен: rate limiting по IP до дорогой аутентификации экономит ресурсы при атаке, но если лимит должен быть per-user, аутентификация логически должна идти раньше.",
            "Rate limiting по IP до аутентификации защищает от неаутентифицированных атак дешевле, но не позволяет лимитировать per-user до того, как пользователь определён; аутентификация до rate limiting даёт точный per-user лимит, но тратит ресурсы на атакующего без валидных кредов. Fail-open на сбое внешней зависимости middleware сохраняет доступность сервиса, но временно снижает защиту; fail-closed безопаснее, но превращает сбой вспомогательного сервиса в полный отказ API. Выбор зависит от модели угроз и требований к доступности."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "Пример порядка стека для публичного API (один из возможных вариантов):",
              "",
              "1. Базовая валидация формата запроса (размер тела, content-type).",
              "2. Rate limiting по IP (до аутентификации) - дешёвая защита от массовых атак.",
              "3. Аутентификация (проверка токена/подписи).",
              "4. Rate limiting per-user (если нужен более точный лимит для авторизованных).",
              "5. Логирование с request_id и (теперь известным) user_id.",
              "6. Distributed tracing span для всего запроса.",
              "",
              "Каждый пункт измеряется отдельной метрикой длительности, чтобы видеть,",
              "какой слой вносит наибольший вклад в p95/p99 latency."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Для надёжности внешние зависимости middleware (Redis для rate limit, сервис трассировки) должны иметь понятный fallback — например, временно пропускать запросы при недоступности rate-limit хранилища (fail-open) или наоборот блокировать (fail-closed), и это осознанное решение, а не случайное поведение библиотеки по умолчанию. Для диагностики latency каждого слоя полезны отдельные метрики по времени выполнения каждого middleware."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Добавляют middleware один за другим без измерения совокупного влияния на latency под реальной нагрузкой; не продумывают поведение при недоступности внешней зависимости одного из middleware (например, rate-limit хранилища), из-за чего временный сбой инфраструктуры превращается в полный отказ всего API."
          ]
        }
      ]
    },
    {
      "t": "Приложение хранит секреты конфигурации (ключи БД, API-токены внешних сервисов) для нескольких микросервисов в разных окружениях. Как спроектировать управление секретами с учётом ротации, аудита доступа и минимизации риска утечки?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "configuration",
        "secrets-management",
        "rest-api",
        "environment-variables"
      ],
      "d": "Решение обычно строится вокруг централизованного секрет-хранилища (Vault, облачный Secrets Manager, Kubernetes Secrets с шифрованием) с доступом по принципу наименьших привилегий для каждого сервиса, автоматической или управляемой ротацией ключей и аудит-логом обращений.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Решение обычно строится вокруг централизованного секрет-хранилища (Vault, облачный Secrets Manager, Kubernetes Secrets с шифрованием) с доступом по принципу наименьших привилегий для каждого сервиса, автоматической или управляемой ротацией ключей и аудит-логом обращений; выбор конкретного инструмента зависит от инфраструктуры, бюджета и требований к compliance."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Централизованное хранилище секретов позволяет не хранить значения в коде/образах контейнеров/переменных окружения CI в открытом виде постоянно, выдавать сервисам короткоживущие токены доступа и централизованно ротировать скомпрометированный секрет без пересборки всех сервисов. Аудит-лог фиксирует, какой сервис/пользователь и когда обращался к конкретному секрету, что важно для расследования инцидентов.",
            "Полноценный секрет-менеджер с автоматической ротацией даёт наилучшую безопасность и аудит, но требует инвестиций в инфраструктуру и может усложнить локальную разработку/отладку; упрощённый подход через переменные окружения CI/CD быстрее внедрить, но хуже масштабируется по числу сервисов и слабее в части аудита и ротации. Выбор зависит от размера организации, требований compliance (например, PCI DSS) и зрелости DevOps-процессов."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "Пример модели доступа (концептуально, без реальных значений):",
              "",
              "Сервис \"orders-api\"  -> может читать секрет \"orders-db-password\"   (только его)",
              "Сервис \"billing-api\" -> может читать секрет \"billing-db-password\", \"payment-gateway-key\"",
              "CI pipeline           -> может читать только секреты, нужные для деплоя конкретного сервиса",
              "",
              "Каждое обращение логируется: (сервис/принципал, секрет, время, результат).",
              "Секрет \"orders-db-password\" ротируется ежеквартально с коротким периодом",
              "параллельной валидности старого и нового значения, чтобы избежать простоя."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Полная автоматическая ротация (например, для паролей БД) требует поддержки на уровне самой БД и приложения (возможность работать с несколькими активными учётными данными во время ротации, чтобы не было простоя); для менее критичных секретов ротацию можно делать вручную по графику. Важно ограничить доступ к секретам конкретного сервиса только тем, что ему реально нужно (принцип наименьших привилегий), а не выдавать общий доступ «ко всему» ради простоты."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Хранят единый общий набор секретов для всех сервисов и окружений «для простоты», из-за чего компрометация одного сервиса/окружения раскрывает доступ ко всем остальным; внедряют секрет-менеджер, но продолжают логировать секреты целиком при ошибках (например, через необработанное исключение с полным конфигурационным объектом в тексте), обесценивая усилия по безопасности."
          ]
        }
      ]
    },
    {
      "t": "В крупном FastAPI-приложении система зависимостей (Depends) разрослась настолько, что одни зависимости скрыто полагаются на глобальное состояние, а тесты стали хрупкими. Как спроектировать внедрение зависимостей в таком приложении, чтобы сохранить тестируемость и явность без перехода на избыточно сложный DI-контейнер?",
      "l": "Senior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "dependency-injection",
        "configuration",
        "rest-api",
        "testing",
        "environment-variables"
      ],
      "d": "Нужно явно разделить «инфраструктурные» зависимости (конфигурация, соединения) от бизнес-логики через отдельный слой сервисов/репозиториев, передавать зависимости в сервисы явными параметрами. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужно явно разделить «инфраструктурные» зависимости (конфигурация, соединения) от бизнес-логики через отдельный слой сервисов/репозиториев, передавать зависимости в сервисы явными параметрами конструктора/функции, а не через скрытые глобальные синглтоны, и решить — хватает ли простого <code>Depends</code> с чёткой дисциплиной или нужен более структурированный DI-подход (например, явный контейнер с управляемым временем жизни объектов)."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Встроенный <code>Depends</code> FastAPI прост и декларативен, но сам по себе не предотвращает скрытые зависимости от глобальных переменных модуля (например, <code>from .db import engine</code> внутри функции сервиса) — эти связи не видны в сигнатуре и не подменяются через <code>dependency_overrides</code>. Полноценный DI-контейнер (например, <code>dependency-injector</code>) даёт более строгий контроль над жизненным циклом объектов (singleton/per-request/factory), но добавляет новый слой абстракции и порог входа для команды.",
            "Чистый <code>Depends</code> с дисциплиной явной передачи зависимостей дешевле в освоении и достаточен для большинства приложений, но требует самодисциплины команды, чтобы не образовывались скрытые связи. Полноценный DI-контейнер даёт более строгие гарантии и управление жизненным циклом объектов при большом масштабе и множестве команд, но увеличивает порог входа и может быть избыточен для сервиса среднего размера. Критерий выбора — размер кодовой базы, число команд, работающих с ней, и частота возникновения проблем со скрытыми зависимостями на практике."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "from fastapi import Depends",
              "",
              "class OrderService:",
              "    def __init__(self, db_session):",
              "        self.db_session = db_session",
              "",
              "    def get_order(self, order_id: int):",
              "        return self.db_session.get(Order, order_id)",
              "",
              "def get_order_service(db=Depends(get_db)):",
              "    return OrderService(db)"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Практичный средний путь — оставить <code>Depends</code> как механизм связывания HTTP-слоя с сервисным слоем, но внутри сервисного слоя требовать явной передачи зависимостей через конструктор/аргументы, избегая прямого импорта глобальных объектов внутри бизнес-логики. Это сохраняет простоту FastAPI и при этом делает сервисы тестируемыми без похода в HTTP-слой."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Вводят полноценный DI-контейнер «на всякий случай» в небольшом приложении, увеличивая сложность без реальной пользы; оставляют скрытые глобальные зависимости внутри сервисов, из-за чего unit-тесты бизнес-логики вынуждены поднимать весь FastAPI app и реальную/фейковую инфраструктуру вместо изолированного теста класса сервиса."
          ]
        }
      ]
    },
    {
      "t": "Большой Django-монолит с десятками приложений (apps) в одном INSTALLED_APPS стал сложно поддерживать и деплоить целиком при любом небольшом изменении. Как спроектировать эволюцию архитектуры — укрепление границ между Django apps или выделение части функциональности в отдельные сервисы?",
      "l": "Senior",
      "c": "django",
      "g": [
        "python",
        "django",
        "dependency-injection",
        "rest-api"
      ],
      "d": "Можно либо укрепить границы между Django apps внутри того же монолита (чёткие интерфейсы между приложениями, запрет прямых импортов моделей друг друга, явные доменные API), либо выделить наиболее независимую и нагруженную часть в отдельный сервис.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Можно либо укрепить границы между Django apps внутри того же монолита (чёткие интерфейсы между приложениями, запрет прямых импортов моделей друг друга, явные доменные API), либо выделить наиболее независимую и нагруженную часть в отдельный сервис; выбор зависит от того, где именно боль — в связанности кода (решается рефакторингом границ) или в операционных ограничениях монолита (деплой, масштабирование, разные команды — тогда обоснован отдельный сервис)."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Монолит с плохо определёнными границами между apps часто страдает от того, что модели/бизнес-логика одного app напрямую импортируются и используются в другом, создавая неявные циклические зависимости — любое изменение рискует задеть много мест. Укрепление границ (например, через выделенные сервисные функции/слой «публичного API» app, запрет прямого доступа к internal-моделям других apps) снижает связанность без немедленного выделения в отдельный сервис и без накладных расходов на сетевое взаимодействие.",
            "Укрепление границ внутри монолита дешевле и безопаснее (нет распределённых транзакций и сетевых отказов), но не решает операционные проблемы отдельного масштабирования/деплоя конкретной части. Выделение в отдельный сервис даёт независимость деплоя и масштабирования, но добавляет сложность согласованности данных, сетевых отказов и эксплуатации ещё одного сервиса. Критерии выбора — реальная причина боли (связанность кода vs операционные ограничения), зрелость команды в распределённых системах и готовность нести дополнительную инфраструктурную сложность."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "Признаки, что проблема в связанности кода (решать рефакторингом границ):",
              "- Любое изменение в одном app требует правок в нескольких других.",
              "- Модели одного app напрямую импортируются и изменяются в другом app.",
              "",
              "Признаки, что нужен отдельный сервис (операционная граница):",
              "- Часть функциональности требует отдельного масштабирования под нагрузку,",
              "  несвязанную с остальным монолитом (например, обработка файлов vs обычные CRUD-страницы).",
              "- Над этой частью хочет работать отдельная команда с собственным релизным циклом.",
              "",
              "Первый шаг в любом случае - явно выделить \"публичный\" интерфейс app",
              "(функции/сервисный слой), через который с ним взаимодействуют остальные,",
              "не трогая его внутренние модели напрямую."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Выделение в отдельный сервис оправдано, когда граница доменная уже ясна, часть функциональности нагружена и масштабируется иначе, чем остальной монолит, или над ней работает отдельная команда с собственным циклом релизов. Если проблема — просто в беспорядочных внутренних связях между Django apps, выделение сервиса добавит сетевые вызовы, согласованность данных между сервисами и операционную сложность, не решив исходную проблему связанности."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Разбивают монолит на микросервисы по формальному признаку (один Django app = один сервис) без анализа реальных доменных границ и паттернов нагрузки, получая распределённый монолит с теми же проблемами связанности, но уже через сеть; решают проблему связанности только организационно (переименование папок), не меняя фактические импорты и зависимости между apps."
          ]
        }
      ]
    },
    {
      "t": "Схема валидации входных данных (Pydantic-модель в FastAPI или сериализатор в DRF) должна измениться вместе с эволюцией бизнес-модели, но изменение не должно приводить к простою или массовому отказу запросов от клиентов со старыми данными. Как спроектировать такую эволюцию схемы валидации?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "django-rest-framework",
        "fastapi",
        "pydantic",
        "validation",
        "rest-api",
        "logging"
      ],
      "d": "Новые обязательные поля вводят как необязательные с безопасным значением по умолчанию на переходный период, удаление/сужение существующих полей делают поэтапно (сначала отметить как deprecated и логировать. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Новые обязательные поля вводят как необязательные с безопасным значением по умолчанию на переходный период, удаление/сужение существующих полей делают поэтапно (сначала отметить как deprecated и логировать использование, затем ограничить только после подтверждённого отсутствия использования), а не вносят breaking-изменение одним релизом."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Схема валидации — это контракт между клиентом и сервером; любое сужение допустимых значений (новое обязательное поле, более строгий тип, уменьшение допустимого диапазона) потенциально отклоняет ранее валидные запросы существующих клиентов. Безопасная эволюция обычно идёт через расширение (добавление необязательных полей) и постепенное сужение только после того, как подтверждено (например, через логирование/метрики), что все клиенты уже используют новый формат.",
            "Постепенное расширение схемы безопаснее для существующих клиентов, но временно усложняет код (поддержка старого и нового формата одновременно) и создаёт технический долг до завершения миграции. Немедленное ужесточение валидации проще в коде, но рискует массово отклонить легитимный трафик старых клиентов. Критерий выбора — насколько управляемы клиенты (внутренний сервис с единым релизным циклом против внешних независимых интеграторов) и насколько критичен простой для бизнеса."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Переходный этап: новое поле необязательно с безопасным дефолтом",
              "class OrderIn(BaseModel):",
              "    items: list[OrderItem]",
              "    currency: str = \"USD\"   # новое поле, раньше не было вовсе - дефолт сохраняет совместимость",
              "",
              "    # Старое избыточно широкое поле временно оставлено, но логируется его использование",
              "    legacy_discount_code: str | None = None",
              "",
              "# В коде обработчика: если legacy_discount_code заполнен - залогировать метрику",
              "# \"legacy_discount_code_used\", чтобы оценить, когда можно будет убрать поле."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Полезно иметь метрики/логи по фактически приходящим данным (какие поля реально заполнены, какие значения встречаются), чтобы принимать решение об ужесточении валидации на основе данных, а не предположений. Для необратимых изменений (переименование поля, изменение единиц измерения) нужен переходный период с поддержкой обоих вариантов и чёткой датой отключения старого."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Делают валидацию сразу строгой в новом релизе («так правильнее»), не проверив, какой процент реального трафика перестанет проходить валидацию; не договариваются с владельцами клиентов (другие команды/внешние интеграторы) о сроках миграции, из-за чего изменение валидации воспринимается как внезапная поломка продакшена."
          ]
        }
      ]
    },
    {
      "t": "Команда выполняет rolling deployment ASGI-приложения (FastAPI/uvicorn за балансировщиком) под постоянной нагрузкой. Как спроектировать graceful shutdown и readiness/liveness проверки так, чтобы деплой не обрывал обрабатываемые запросы и не отправлял трафик на ещё не готовый инстанс?",
      "l": "Senior",
      "c": "fastapi",
      "g": [
        "python",
        "fastapi",
        "routing",
        "asgi",
        "rest-api",
        "graceful-shutdown",
        "health-checks"
      ],
      "d": "Нужно разделить проверки на readiness (готов принимать новый трафик, используется балансировщиком/оркестратором для маршрутизации) и liveness (процесс жив, используется для решения о перезапуске), обрабатывать сигнал остановки (SIGTERM). Ключевые детали выбирают по требованиям и ограничениям.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужно разделить проверки на readiness (готов принимать новый трафик, используется балансировщиком/оркестратором для маршрутизации) и liveness (процесс жив, используется для решения о перезапуске), обрабатывать сигнал остановки (SIGTERM) так, чтобы сначала перестать принимать новые запросы (readiness становится false), затем дать время завершить уже начатые запросы (graceful period), и только потом завершить процесс."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "При роллинг-деплое оркестратор (например, Kubernetes) сначала помечает старый под как «не ready» и перестаёт направлять на него новый трафик, одновременно отправляя ему SIGTERM; у приложения есть ограниченное время (<code>terminationGracePeriodSeconds</code>) на завершение уже начатых запросов и закрытие соединений (БД, очереди), после чего процесс принудительно убивается SIGKILL. Uvicorn/Gunicorn поддерживают graceful shutdown, ожидая завершения активных запросов при получении сигнала остановки, но только в пределах настроенного таймаута.",
            "Длинный graceful period снижает риск обрыва долгих запросов, но замедляет деплой и увеличивает время, когда на кластере одновременно работают старая и новая версия (что требует совместимости схем/контрактов между версиями на этот период). Короткий period ускоряет деплой, но рискует обрывать легитимные долгие запросы. Решение зависит от профиля длительности запросов сервиса и от того, насколько приемлема временная работа двух версий одновременно."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "yaml",
            "title": "example.yaml",
            "lines": [
              "# Пример фрагмента конфигурации Kubernetes (концептуально)",
              "readinessProbe:",
              "  httpGet: {path: /health/ready, port: 8000}",
              "  periodSeconds: 5",
              "livenessProbe:",
              "  httpGet: {path: /health/live, port: 8000}",
              "  periodSeconds: 10",
              "terminationGracePeriodSeconds: 30   # должен покрывать самые долгие легитимные запросы",
              "",
              "# /health/ready - проверяет реальную готовность (соединение с БД и т.п.)",
              "# /health/live  - проверяет только, что процесс отвечает, без проверки внешних зависимостей"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Readiness-проверка должна отражать реальную готовность (например, успешное соединение с БД/кэшем при старте), а не просто «процесс запущен» — иначе трафик пойдёт на инстанс, который ещё не готов обслуживать запросы. Время graceful period нужно подбирать с учётом самых долгих легитимных запросов приложения, иначе часть запросов всё равно будет прервана принудительно."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Используют одну и ту же проверку для readiness и liveness, из-за чего временная перегрузка (которая должна временно убрать инстанс из балансировки через readiness) вместо этого приводит к перезапуску здорового процесса через liveness; устанавливают слишком короткий graceful period, не учитывая реальное распределение длительности запросов, из-за чего долгие запросы обрываются при каждом деплое."
          ]
        }
      ]
    },
    {
      "t": "Внешние клиенты API иногда повторно отправляют один и тот же запрос на изменение состояния (например, списание баланса) из-за retry-логики на своей стороне при сетевых таймаутах. Как спроектировать защиту от такой повторной доставки на уровне API/middleware в системе с несколькими инстансами приложения и базой данных?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "middleware",
        "rest-api",
        "caching",
        "redis",
        "database",
        "idempotency"
      ],
      "d": "Нужна идемпотентность на основе ключа идемпотентности, атомарно зарезервированного в общем для всех инстансов хранилище (БД с уникальным constraint или распределённый кэш с атомарными операциями) до выполнения операции, плюс чёткая. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужна идемпотентность на основе ключа идемпотентности, атомарно зарезервированного в общем для всех инстансов хранилище (БД с уникальным constraint или распределённый кэш с атомарными операциями) до выполнения операции, плюс чёткая политика, что считается «тем же самым» повторным запросом (точное совпадение тела или только ключ)."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "При множественных инстансах приложения локальная память процесса не подходит для хранения состояния идемпотентности — нужно общее хранилище (БД/Redis), и резервирование ключа должно быть атомарным (например, <code>INSERT ... ON CONFLICT DO NOTHING</code> или уникальный индекс), чтобы два почти одновременных повторных запроса, попавших на разные инстансы, не прошли оба как «первые».",
            "Хранение состояния идемпотентности в основной транзакционной БД даёт строгую согласованность с самой бизнес-операцией (резервирование ключа и изменение баланса в одной транзакции), но добавляет нагрузку на БД и требует продуманной схемы очистки старых записей. Использование отдельного быстрого хранилища (Redis) дешевле по нагрузке, но вводит риск рассинхронизации между состоянием идемпотентности и фактическим состоянием бизнес-данных при сбоях между двумя хранилищами. Выбор зависит от критичности операции (финансовая транзакция против менее критичного действия) и приемлемого уровня дополнительной сложности."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "sql",
            "title": "example.sql",
            "lines": [
              "-- Атомарное резервирование ключа идемпотентности в той же БД, что бизнес-данные",
              "-- (PostgreSQL)",
              "BEGIN;",
              "INSERT INTO idempotency_keys (key, status, created_at)",
              "VALUES ($1, 'processing', now())",
              "ON CONFLICT (key) DO NOTHING;",
              "-- Если INSERT не вставил строку (конфликт) - запрос уже обрабатывается/обработан,",
              "-- нужно прочитать существующую запись и вернуть её результат, не повторяя списание.",
              "COMMIT;"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Нужно явно решить, что делать, если повторный запрос с тем же ключом идемпотентности пришёл с другим телом запроса (вероятная ошибка клиента или смена сценария) — вернуть ошибку конфликта или обработать как новый запрос; также нужно решить время жизни записи об идемпотентности (слишком короткое — не защитит от редких повторов с большой задержкой, слишком длинное — расходует хранилище и усложняет повторное легитимное использование того же бизнес-сценария)."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Реализуют проверку идемпотентности на уровне одного инстанса/процесса без учёта горизонтального масштабирования; обеспечивают идемпотентность только для «счастливого пути» (успешный ответ), но не продумывают, что возвращать, если первая попытка ещё обрабатывается (запрос в процессе) в момент прихода повтора."
          ]
        }
      ]
    },
    {
      "t": "Продукт переходит на модель мультитенантности: один backend обслуживает несколько клиентов-организаций (tenants) через поддомены или заголовок, при этом данные разных tenant должны быть строго изолированы, а производительность не должна деградировать с ростом числа tenant. Как спроектировать маршрутизацию и слой доступа к данным для такой системы?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "middleware",
        "routing",
        "sqlalchemy",
        "multi-tenancy"
      ],
      "d": "Нужно выбрать модель изоляции данных (отдельная БД/схема на tenant против общей таблицы с колонкой tenant_id и обязательной фильтрацией на каждом запросе) и способ определения tenant на входе запроса (поддомен, заголовок, JWT. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужно выбрать модель изоляции данных (отдельная БД/схема на tenant против общей таблицы с колонкой <code>tenant_id</code> и обязательной фильтрацией на каждом запросе) и способ определения tenant на входе запроса (поддомен, заголовок, JWT claim), причём определение tenant должно происходить как можно раньше в стеке middleware и передаваться явно во все последующие слои, включая запросы к БД."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Схема «общая таблица + tenant_id» проще в эксплуатации (одна БД, одни миграции) и дешевле для большого числа мелких tenant, но требует железной дисциплины — каждый запрос к БД должен фильтроваться по <code>tenant_id</code> (желательно на уровне, который невозможно случайно забыть, например через обязательный параметр в репозитории или row-level security в PostgreSQL), иначе утечка данных между tenant — вопрос времени. Схема «отдельная БД/схема на tenant» даёт более сильную изоляцию и проще для выполнения требований compliance отдельных крупных клиентов, но усложняет миграции (нужно прогонять на каждую БД/схему) и операционную нагрузку с ростом числа tenant.",
            "Общая схема с <code>tenant_id</code> дешевле в эксплуатации и миграциях при большом числе tenant, но риск утечки данных между клиентами выше при человеческой ошибке в коде, если не подкреплена защитой на уровне БД (row-level security) или обязательными обёртками репозиториев. Отдельная БД/схема на tenant даёт сильную изоляцию и проще для контрактов с крупными enterprise-клиентами, но усложняет операционную эксплуатацию (миграции, бэкапы, мониторинг) при росте числа tenant. Выбор зависит от количества и размера tenant, требований к изоляции по контракту/compliance и операционной зрелости команды."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Middleware определяет tenant как можно раньше и кладёт в контекст",
              "import contextvars",
              "tenant_id_var = contextvars.ContextVar(\"tenant_id\")",
              "",
              "@app.middleware(\"http\")",
              "async def resolve_tenant(request, call_next):",
              "    subdomain = request.url.hostname.split(\".\")[0]",
              "    tenant = get_tenant_by_subdomain(subdomain)",
              "    if tenant is None:",
              "        return JSONResponse(status_code=404, content={\"error\": \"unknown_tenant\"})",
              "    tenant_id_var.set(tenant.id)",
              "    return await call_next(request)",
              "",
              "# Репозиторий ВСЕГДА требует tenant_id явным параметром, а не берёт \"откуда-то\":",
              "def get_orders(db, tenant_id: int):",
              "    return db.query(Order).filter(Order.tenant_id == tenant_id).all()"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Middleware, определяющий tenant по поддомену/заголовку, должен быть одним из первых в стеке и должен безопасно отказывать (а не угадывать tenant по умолчанию), если tenant не определён; дальше tenant_id должен явно передаваться в слой доступа к данным (через contextvar/параметр), а не выводиться неявно где-то в глубине кода."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Полагаются только на фильтрацию на уровне ORM-запросов в бизнес-коде без дополнительной защиты (например, row-level security в БД), и один забытый <code>WHERE tenant_id = ...</code> в новом запросе становится утечкой данных между клиентами; выбирают общую таблицу для всех tenant без проверки, что индексы и планы запросов продолжают быть эффективными, когда количество строк на одного крупного tenant становится значительно больше, чем у остальных."
          ]
        }
      ]
    },
    {
      "t": "API часто отдаёт одни и те же данные (например, каталог товаров), и команда рассматривает кэширование ответов на уровне middleware/CDN для снижения нагрузки на backend. Как спроектировать такое кэширование с учётом того, что часть данных обновляется в реальном времени (например, наличие товара на складе)?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "middleware",
        "validation",
        "rest-api",
        "http",
        "caching"
      ],
      "d": "Нужно разделить ответ на части с разной «свежестью» — редко меняющиеся данные кэшировать агрессивно (CDN/HTTP-кэш с TTL или ETag), часто меняющиеся данные (остатки, цены в реальном времени) либо не кэшировать. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужно разделить ответ на части с разной «свежестью» — редко меняющиеся данные кэшировать агрессивно (CDN/HTTP-кэш с TTL или ETag), часто меняющиеся данные (остатки, цены в реальном времени) либо не кэшировать вовсе, либо кэшировать на очень короткий TTL, либо вынести в отдельный некэшируемый эндпоинт/запрос на клиенте."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "HTTP-кэширование (заголовки <code>Cache-Control</code>, <code>ETag</code>, <code>Last-Modified</code>) позволяет CDN или промежуточным прокси отдавать ответ без обращения к backend, резко снижая нагрузку, но вводит окно, в течение которого клиент может увидеть устаревшие данные (пока не истечёт TTL или не придёт инвалидция). Инвалидация кэша по событию (push-инвалидция при изменении данных) даёт более свежие данные, но требует дополнительной инфраструктуры и усложняет систему по сравнению с простым TTL.",
            "Агрессивное кэширование с большим TTL резко снижает нагрузку на backend и упрощает инфраструктуру, но увеличивает окно показа устаревших данных, что может быть неприемлемо для полей типа остатка на складе или цены при высокочастотных изменениях. Короткий TTL/отсутствие кэша для динамических данных даёт свежесть, но требует, чтобы backend выдерживал соответствующую нагрузку напрямую. Push-инвалидция по событию даёт и свежесть, и сниженную нагрузку, но добавляет архитектурную сложность и ещё одну точку отказа (система инвалидции). Критерий выбора — бизнес-требования к допустимой устарелости конкретных данных, а не единый TTL для всего ответа."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "GET /products/42 HTTP/1.1",
              "",
              "HTTP/1.1 200 OK",
              "Cache-Control: public, max-age=3600   # описание товара - можно кэшировать час",
              "ETag: \"v17-description\"",
              "",
              "{",
              "  \"id\": 42,",
              "  \"name\": \"Беспроводная мышь\",",
              "  \"description\": \"\"",
              "}",
              "",
              "# Отдельный некэшируемый запрос для динамических данных:",
              "GET /products/42/availability HTTP/1.1",
              "Cache-Control: no-store",
              "",
              "{\"in_stock\": 3, \"price\": 1999.00}"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Частая практика — разделить ответ API на статическую часть (описание товара, кэшируется агрессивно) и динамическую (остаток на складе, цена) запрашиваемую отдельно без кэша или с очень коротким TTL; либо явно документировать для клиентов приемлемую задержку свежести данных (staleness) для каждой части ответа."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Кэшируют весь составной ответ целиком с одним TTL, подобранным для самой редко меняющейся части, из-за чего часто меняющиеся поля (остаток, цена) показываются устаревшими дольше, чем приемлемо для бизнеса; вводят кэширование без продуманной инвалидации при изменении данных, из-за чего после обновления товара клиенты ещё долго видят старые данные без явного объяснения, почему."
          ]
        }
      ]
    },
    {
      "t": "Продуктовая команда хочет безопасно выкатывать изменения backend частично (feature flags) на часть пользователей перед полным релизом. Как спроектировать политику конфигурации feature flags на уровне API/middleware, учитывая риск несогласованного поведения и технический долг от накопленных флагов?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "middleware",
        "routing",
        "configuration",
        "rest-api",
        "testing",
        "feature-flags"
      ],
      "d": "Нужно разделить флаги по времени жизни (временные флаги для постепенного релиза с обязательным планом удаления после полного раскатывания, и более долгоживущие операционные переключатели) и явно. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужно разделить флаги по времени жизни (временные флаги для постепенного релиза с обязательным планом удаления после полного раскатывания, и более долгоживущие операционные переключатели) и явно определить, где проверяется флаг — ближе к middleware/входу запроса для крупных изменений поведения или глубже в бизнес-логике для точечных веток, а также кто и как может менять значение флага в production (аудит изменений)."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Feature flag, проверяемый в middleware/на входе запроса, удобен для изменений, затрагивающих весь путь обработки запроса (например, включение нового алгоритма маршрутизации целиком), но менее удобен для точечных изменений внутри бизнес-логики, где естественнее проверять флаг прямо в нужном месте кода. Несогласованность флага между несколькими сервисами (один сервис уже включил новое поведение, другой ещё нет) может создавать скрытые баги на границах интеграции.",
            "Проверка флага на уровне middleware проще для крупных переключений поведения всего запроса, но менее гибка для точечных изменений в глубине бизнес-логики; проверка глубоко в коде даёт точность, но увеличивает число мест, которые нужно отследить и в итоге убрать после полного релиза. Хранение состояния флагов в быстро обновляемом внешнем сервисе (LaunchDarkly и подобные) даёт гибкость и аудит, но добавляет внешнюю зависимость и риск, что её недоступность повлияет на доступность самого API. Критерий выбора — масштаб изменения (всё поведение запроса против точечной ветки), частота изменения значения флага и готовность команды дисциплинированно убирать флаги после релиза."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "# Пример с явным владельцем и плановой датой удаления флага (документация в коде)",
              "FEATURE_FLAGS = {",
              "    # owner: \"team-payments\", remove_after: \"2026-01-01\", rollout: 25%",
              "    \"new_pricing_engine\": True,",
              "}",
              "",
              "@app.get(\"/price\")",
              "def get_price(user_id: int):",
              "    if is_flag_enabled(\"new_pricing_engine\", user_id):",
              "        return new_pricing_engine(user_id)",
              "    return legacy_pricing_engine(user_id)",
              "",
              "# Ревизия флагов раз в квартал: удалить \"new_pricing_engine\" и legacy_pricing_engine,",
              "# если rollout давно достиг 100% и флаг больше не меняется."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Важно вести реестр активных флагов с владельцем и плановой датой удаления, периодически проводить ревизию и удалять флаги для функциональности, полностью раскатанной на 100% пользователей — иначе кодовая база накапливает условные ветки, которые никто не удаляет, и тестовая матрица комбинаций флагов растёт неконтролируемо. Для флагов, влияющих на целостность данных (а не только UI/поведение), нужно особенно тщательно продумать, что происходит при переключении флага туда-обратно для одного и того же пользователя."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Используют feature flags как постоянный механизм конфигурации «навсегда» без плана удаления, из-за чего кодовая база через год содержит десятки устаревших условных веток; не учитывают, что один и тот же пользователь может видеть противоречивое поведение при переключении флага между запросами (например, если флаг читается из конфигурации, которая меняется посреди пользовательской сессии)."
          ]
        }
      ]
    },
    {
      "t": "Продукт обслуживает несколько независимых фронтендов (веб, мобильное приложение, виджет для партнёров) через один backend API за API Gateway, и нужно согласовать политики CORS и CSRF-защиты для всех этих клиентов без излишнего ослабления безопасности. Как спроектировать эту политику?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "csrf",
        "cors",
        "dependency-injection",
        "rest-api",
        "authentication",
        "authorization"
      ],
      "d": "Нужно явно перечислить разрешённые origin для каждого типа клиента (а не использовать wildcard-разрешение всех origin), развести механизмы защиты по типу аутентификации (CSRF актуален для cookie-based сессий из. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужно явно перечислить разрешённые origin для каждого типа клиента (а не использовать wildcard-разрешение всех origin), развести механизмы защиты по типу аутентификации (CSRF актуален для cookie-based сессий из браузера, но не для API-ключей/токенов мобильного приложения или сервер-сервер интеграции партнёра) и решить, где физически применяется эта политика — на уровне API Gateway единообразно или по-разному на каждом отдельном сервисе за ним."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "CORS защищает браузер пользователя от того, чтобы чужой сайт мог от имени пользователя читать ответы вашего API через JS без явного разрешения — это актуально именно для браузерных клиентов (веб-фронтенд, виджет, встраиваемый в сторонние сайты). CSRF актуален, когда аутентификация идёт через cookie, автоматически прикладываемый браузером к любому запросу на ваш домен, включая инициированные сторонним сайтом; для мобильного приложения или серверной интеграции партнёра, где аутентификация — явный токен в заголовке, а не cookie, классический CSRF неприменим так же, как для браузера.",
            "Единая политика на уровне API Gateway проще в поддержке и аудите, но может быть либо слишком строгой для части клиентов (блокирует легитимную интеграцию партнёра), либо слишком мягкой для другой части (излишне разрешает происхождение там, где не нужно). Индивидуальная настройка по сервису/эндпоинту точнее соответствует реальным требованиям безопасности каждого клиента, но увеличивает число мест, которые нужно поддерживать согласованно и не забыть при добавлении нового партнёра или эндпоинта. Критерий выбора — насколько разнородны клиенты и чувствительность конкретных операций, а не универсальное правило для всего API."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "text",
            "title": "example.txt",
            "lines": [
              "Политика (пример, не единственно верная):",
              "",
              "- Веб-фронтенд (app.example.com), cookie-аутентификация:",
              "  CORS: allow-origin = https://app.example.com только; CSRF-токен обязателен для mutating-запросов.",
              "",
              "- Партнёрский виджет, встраиваемый на сайты партнёров, без cookie:",
              "  CORS: allow-origin = явный список доменов партнёров из реестра интеграций;",
              "  аутентификация через API-ключ в заголовке, CSRF неприменим (нет cookie).",
              "",
              "- Мобильное приложение, токен в заголовке Authorization:",
              "  CORS неприменим (не браузерный cross-origin сценарий); CSRF неприменим.",
              "",
              "Любое добавление нового партнёрского домена проходит через явный реестр,",
              "а не разрешается динамически по заголовку Origin без проверки."
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Партнёрский виджет, встраиваемый на сторонние сайты, обычно требует разрешить CORS с конкретных доменов партнёров (поддерживаемый и управляемый список, а не wildcard), в то время как мобильное приложение не делает браузерных cross-origin запросов вовсе и CORS к нему неприменим. Решение о применении политики на уровне Gateway (единообразно для всех сервисов) против индивидуальной настройки на каждом сервисе зависит от того, насколько разные сервисы за Gateway обслуживают разных клиентов с разными требованиями."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Включают <code>Access-Control-Allow-Origin: *</code> «для удобства интеграции партнёров», что потенциально позволяет любому сайту делать запросы от имени залогиненного cookie-пользователя, если какой-то эндпоинт ошибочно использует cookie-аутентификацию вместе с таким разрешением; применяют одну и ту же политику CORS/CSRF ко всем эндпоинтам без учёта того, что часть из них — публичные данные без аутентификации, а часть — чувствительные операции от имени пользователя."
          ]
        }
      ]
    },
    {
      "t": "Backend-сервис зависит от нескольких внешних сервисов (платёжный провайдер, сервис уведомлений), которые периодически отвечают с задержкой или временно недоступны. Как спроектировать обработку частичных отказов на уровне middleware/слоя интеграции веб-приложения, чтобы деградация одного внешнего сервиса не приводила к полному отказу всего API?",
      "l": "Senior",
      "c": "web-api-architecture",
      "g": [
        "python",
        "web-api",
        "middleware",
        "rest-api"
      ],
      "d": "Нужно использовать таймауты на каждый внешний вызов (а не ждать бесконечно), паттерн circuit breaker для временного отключения вызовов к стабильно отказывающему сервису, и явно решить для каждой интеграции — является ли она критичной. Ключевые детали выбирают по требованиям и ограничениям проекта.",
      "s": [
        {
          "h": "Короткий ответ",
          "p": [
            "Нужно использовать таймауты на каждый внешний вызов (а не ждать бесконечно), паттерн circuit breaker для временного отключения вызовов к стабильно отказывающему сервису, и явно решить для каждой интеграции — является ли она критичной для основного пути запроса (тогда отказ должен приводить к явной ошибке клиенту) или вспомогательной (тогда можно деградировать функциональность, но вернуть основной ответ)."
          ]
        },
        {
          "h": "Как это работает подробнее",
          "p": [
            "Без явного таймаута один медленный внешний вызов может удерживать поток/корутину обработчика существенно дольше ожидаемого, что при достаточном количестве параллельных запросов приводит к исчерпанию пула соединений/потоков и деградации всего сервиса, а не только той функциональности, что зависит от медленного внешнего сервиса. Circuit breaker отслеживает долю неудачных вызовов к конкретному внешнему сервису и при превышении порога временно перестаёт пытаться его вызывать (сразу возвращая отказ или деградированный ответ), давая внешнему сервису время восстановиться и не трату ресурсов на вызовы, которые скорее всего снова провалятся.",
            "Жёсткие таймауты и circuit breaker повышают устойчивость основного сервиса к деградации внешних зависимостей, но могут приводить к отказу обслуживания операции, которая на самом деле могла бы успешно завершиться чуть позже без этих защит — то есть снижают доступность в обмен на предсказуемость и защиту ресурсов. Деградация вспомогательной функциональности (пропуск необязательного шага) сохраняет основной путь доступным, но требует отдельного надёжного механизма донести пропущенный шаг позже (очередь с повтором), что добавляет архитектурную сложность. Критерий выбора — критичность конкретной интеграции для основного бизнес-процесса и приемлемость временной потери неосновной функциональности."
          ]
        },
        {
          "h": "Пример кода",
          "code": {
            "lang": "python",
            "title": "example.py",
            "lines": [
              "import httpx",
              "",
              "async def charge_payment(order_id: int, amount: float):",
              "    # Критичная интеграция: явный таймаут, отказ должен быть виден клиенту",
              "    try:",
              "        async with httpx.AsyncClient(timeout=5.0) as client:",
              "            resp = await client.post(\"https://payments.example.com/charge\",",
              "                                      json={\"order_id\": order_id, \"amount\": amount},",
              "                                      headers={\"Idempotency-Key\": f\"order-{order_id}\"})",
              "            resp.raise_for_status()",
              "            return resp.json()",
              "    except httpx.HTTPError:",
              "        raise PaymentProviderUnavailable()",
              "",
              "async def notify_user_async(order_id: int):",
              "    # Вспомогательная интеграция: отказ не должен ломать основной ответ,",
              "    # задача просто уходит в очередь на повтор.",
              "    try:",
              "        async with httpx.AsyncClient(timeout=2.0) as client:",
              "            await client.post(\"https://notify.example.com/send\", json={\"order_id\": order_id})",
              "    except httpx.HTTPError:",
              "        enqueue_retry(\"send_notification\", order_id=order_id)"
            ]
          }
        },
        {
          "h": "Что использовать на практике",
          "b": [
            "<strong>Практика.</strong> Критичные интеграции (например, сам платёжный провайдер для операции оплаты) обычно не могут быть просто «пропущены» — отказ должен быть явным для клиента с понятным сообщением и, возможно, retry с идемпотентным ключом. Вспомогательные интеграции (например, отправка уведомления после успешной оплаты) логичнее деградировать отдельно — основная операция (оплата) считается успешной, а уведомление ставится в очередь на повтор отдельно, не блокируя основной ответ."
          ]
        },
        {
          "h": "Подводные камни",
          "b": [
            "<strong>Риск.</strong> Ставят одинаковый подход (например, просто ретраи без таймаута и circuit breaker) для критичных и вспомогательных интеграций одинаково, из-за чего отказ вспомогательного сервиса уведомлений может замедлить или даже сломать основной путь оплаты; не учитывают, что повторные попытки (retry) без идемпотентности на стороне внешнего сервиса могут вызвать дублирование операций (например, двойное списание), если исходный запрос на самом деле был обработан, но ответ не дошёл из-за таймаута."
          ]
        }
      ]
    }
  ]
};

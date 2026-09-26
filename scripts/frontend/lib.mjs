import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALLOWED_LANGS, ALLOWED_TAGS, chunks as MANIFEST_CHUNKS, categories } from "./manifest.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const CHUNK_DIR = path.join(ROOT, "questions", ".chunks");

const SECTION_ORDER = [
  "Короткий ответ",
  "Как это работает подробнее",
  "Пример кода",
  "Что использовать на практике",
  "Подводные камни",
  "Как отвечать на собеседовании",
];
const FORBIDDEN_TAG_WORDS = new Set(["собеседование", "важно", "вопрос", "junior", "middle", "senior", "собеседования"]);

function readJsonl(file) {
  if (!fs.existsSync(file)) return [];
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .map((line, i) => ({ line: i + 1, raw: line.trim() }))
    .filter((x) => x.raw.length > 0);
}

function checkInlineTags(text) {
  const bad = [];
  const re = /<\/?([a-zA-Z0-9]+)/g;
  let m;
  while ((m = re.exec(text))) {
    if (!ALLOWED_TAGS.has(m[1].toLowerCase())) bad.push(m[1]);
  }
  const marks = (text.match(/<mark>/g) || []).length;
  return { bad, marks };
}

function validateStrings(strings, where, errors) {
  const joined = strings.join("");
  const { bad } = checkInlineTags(joined);
  if (bad.length) errors.push(`${where}: недопустимые теги <${[...new Set(bad)].join(">, <")}>`);
  const plain = joined.replace(/<[^>]+>/g, "");
  if (/\*\*|`|\]\(|^#{1,6}\s/m.test(plain)) errors.push(`${where}: похоже на Markdown`);
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(joined)) errors.push(`${where}: эмодзи в тексте`);
}

export function parseChunk(chunk) {
  const file = path.join(CHUNK_DIR, `${chunk.file}.jsonl`);
  const lines = readJsonl(file);
  const questions = [];
  const errors = [];
  for (const { line, raw } of lines) {
    let q;
    try {
      q = JSON.parse(raw);
    } catch (e) {
      errors.push(`${chunk.file}:${line}: невалидный JSON — ${e.message}`);
      continue;
    }
    validateQuestion(q, chunk, `${chunk.file}:${line}`, errors);
    questions.push(q);
  }
  return { questions, errors, expected: chunk.n, file };
}

export function validateQuestion(q, chunk, where, errors) {
  const need = (cond, msg) => { if (!cond) errors.push(`${where}: ${msg}`); };
  need(typeof q.t === "string" && q.t.trim().length > 10, "поле t отсутствует/короткое");
  need(q.t && q.t.trim().endsWith("?"), "t должно заканчиваться на ?");
  need(["Junior", "Middle", "Senior"].includes(q.l), "l не из Junior/Middle/Senior");
  need(q.c === chunk.c, `c="${q.c}" не совпадает с категорией чанка "${chunk.c}"`);
  need(Array.isArray(q.g) && q.g.length >= 3 && q.g.length <= 8, "g должно содержать 3–8 тегов");
  if (Array.isArray(q.g)) {
    for (const tag of q.g) {
      need(typeof tag === "string" && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(tag), `тег "${tag}" не в kebab-case/lowercase латинице`);
      need(!FORBIDDEN_TAG_WORDS.has(tag), `запрещённый тег "${tag}"`);
    }
  }
  if (q.pop !== undefined) need(q.pop === true, "pop допускается только как true (иначе опускай поле)");
  need(typeof q.d === "string" && q.d.length >= 150 && q.d.length <= 300, `d длиной ${q.d ? q.d.length : 0}, нужно 150–300 символов`);
  if (typeof q.d === "string") {
    need(!/<[a-z]/i.test(q.d), "d не должен содержать HTML-теги");
    need(!/\n/.test(q.d), "d не должен содержать переводы строк");
  }
  need(Array.isArray(q.s), "s должно быть массивом секций");
  if (!Array.isArray(q.s)) return;

  const heads = q.s.map((s) => s.h);
  const required = SECTION_ORDER.filter((h) => h !== "Пример кода");
  need(required.every((h) => heads.includes(h)), `нет обязательных секций: ${required.filter((h) => !heads.includes(h)).join(", ")}`);
  const expected = required.filter((h) => heads.includes(h));
  need(JSON.stringify(heads.filter((h) => h !== "Пример кода")) === JSON.stringify(expected), "нарушен порядок/набор секций");
  for (const s of q.s) {
    if (!s || typeof s !== "object") { errors.push(`${where}: секция не объект`); continue; }
    const sw = `${where} [${s.h}]`;
    if (s.code) {
      need(s.h === "Пример кода", `${sw}: code допустим только в секции Пример кода`);
      need(ALLOWED_LANGS.has(s.code.lang), `${sw}: lang "${s.code.lang}" не разрешён`);
      need(typeof s.code.title === "string" && s.code.title.length > 0, `${sw}: нет code.title`);
      need(Array.isArray(s.code.lines) && s.code.lines.length > 0, `${sw}: code.lines должен быть непустым массивом`);
      if (Array.isArray(s.code.lines)) {
        for (const l of s.code.lines) need(typeof l === "string" && !l.includes("\n"), `${sw}: строка кода с переводом строки`);
      }
    }
    const p = s.p || [], b = s.b || [];
    need(!(p.length && b.length) || s.h === "Как это работает подробнее", `${sw}: p и b вместе допустимы только в секции разбора`);
    need(Array.isArray(p) ? p.every((x) => typeof x === "string") : true, `${sw}: p должен быть массивом строк`);
    need(Array.isArray(b) ? b.every((x) => typeof x === "string") : true, `${sw}: b должен быть массивом строк`);
    validateStrings([...p, ...b], sw, errors);
    const markCount = [...p, ...b].reduce((acc, t) => acc + (t.match(/<mark>/g) || []).length, 0);
    need(markCount <= 2, `${sw}: больше 2 <mark>`);
    if (s.h === "Короткий ответ") need(p.length === 1 && b.length === 0, `${sw}: только один пункт p`);
    if (s.h === "Как отвечать на собеседовании") {
      need(b.length === 1 && b[0].includes("→"), `${sw}: ожидается 1 пункт с каркасом через « → »`);
    }
  }
}

export function loadAll() {
  const errors = [];
  const byFile = new Map();
  const all = [];
  for (const chunk of MANIFEST_CHUNKS) {
    const res = parseChunk(chunk);
    errors.push(...res.errors);
    byFile.set(chunk.file, res);
    all.push(...res.questions);
  }
  return { all, errors, byFile };
}

export function fullReport() {
  const { all, errors, byFile } = loadAll();
  const catCount = new Map();
  const levelByCat = new Map();
  const seenT = new Map();
  const seenD = new Map();
  const seenDetail = new Map();
  for (const q of all) {
    const cat = q.c;
    catCount.set(cat, (catCount.get(cat) || 0) + 1);
    if (!levelByCat.has(cat)) levelByCat.set(cat, { Junior: 0, Middle: 0, Senior: 0 });
    levelByCat.get(cat)[q.l] = (levelByCat.get(cat)[q.l] || 0) + 1;
    const tk = (q.t || "").toLowerCase().replace(/[^a-zа-я0-9]+/gi, " ").trim();
    if (seenT.has(tk)) errors.push(`дубликат t: "${q.t}" (${q.c})`);
    seenT.set(tk, q.t);
    const dk = (q.d || "").toLowerCase().replace(/\s+/g, " ").trim();
    if (seenD.has(dk)) errors.push(`дубликат d у "${q.t}"`);
    seenD.set(dk, q.t);
    const detail = (q.s || []).find((s) => s.h === "Как это работает подробнее");
    const dt = ((detail && (detail.p || []).join(" ")) || "").toLowerCase().replace(/\s+/g, " ").trim();
    if (dt.length > 40) {
      if (seenDetail.has(dt)) errors.push(`дубликат разбора у "${q.t}"`);
      seenDetail.set(dt, q.t);
    }
  }
  const progress = MANIFEST_CHUNKS.map((c) => ({
    file: c.file, got: (byFile.get(c.file) || {}).questions?.length || 0, n: c.n,
  }));
  return { all, errors, catCount, levelByCat, progress };
}

export const catBySlug = new Map(categories.map((c) => [c.slug, c]));
export { MANIFEST_CHUNKS, categories, SECTION_ORDER };

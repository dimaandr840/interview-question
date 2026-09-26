import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fullReport, categories, profession } from "./lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "questions", `${profession.slug}.js`);

const { all, errors } = fullReport();
if (errors.length) {
  console.error(`Сборка остановлена: ${errors.length} ошибок валидации. Запусти node scripts/frontend/validate.mjs`);
  process.exit(1);
}

const mod = { professionSlug: profession.slug, categories, questions: all };
let text = "export default " + JSON.stringify(mod, null, 2) + ";\n";
// Ключи без спецсимволов — как в questions/python.js.
text = text.replace(/"([A-Za-z_][A-Za-z0-9_]*)":/g, "$1:");
fs.writeFileSync(OUT, text);
console.log(`Записано ${all.length} вопросов → ${path.relative(ROOT, OUT)} (${(text.length / 1024).toFixed(0)} КБ)`);

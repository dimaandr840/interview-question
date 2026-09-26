import { fullReport, MANIFEST_CHUNKS, categories } from "./lib.mjs";

const { all, errors, catCount, levelByCat, progress } = fullReport();

console.log("Прогресс по чанкам:");
for (const p of progress) console.log(`  ${p.got >= p.n ? "✓" : "…"} ${p.file.padEnd(20)} ${p.got}/${p.n}`);
console.log(`Всего вопросов: ${all.length}/${MANIFEST_CHUNKS.reduce((a, c) => a + c.n, 0)}`);
console.log("\nКатегории (факт / цель):");
for (const c of categories) {
  const target = MANIFEST_CHUNKS.filter((x) => x.c === c.slug).reduce((a, x) => a + x.n, 0);
  const got = catCount.get(c.slug) || 0;
  const lv = levelByCat.get(c.slug) || { Junior: 0, Middle: 0, Senior: 0 };
  console.log(`  ${got === target ? "✓" : "…"} ${c.slug.padEnd(18)} ${String(got).padStart(4)}/${target}  J:${lv.Junior} M:${lv.Middle} S:${lv.Senior}`);
}
const tot = { Junior: 0, Middle: 0, Senior: 0 };
for (const lv of levelByCat.values()) { tot.Junior += lv.Junior; tot.Middle += lv.Middle; tot.Senior += lv.Senior; }
console.log(`\nУровни: Junior ${tot.Junior}/400, Middle ${tot.Middle}/400, Senior ${tot.Senior}/200`);
console.log(`pop помечено: ${all.filter((q) => q.pop).length} (лимит 200)`);
console.log(`\nОшибок валидации: ${errors.length}`);
for (const e of errors.slice(0, 40)) console.log("  - " + e);
if (errors.length > 40) console.log(`  ... и ещё ${errors.length - 40}`);
process.exit(errors.length ? 1 : 0);

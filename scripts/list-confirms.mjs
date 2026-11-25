// Lists every {{CONFIRM}} / [CONFIRM] marker in the source. Run: npm run todo
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const roots = ["content", "lib", "app", "components"];
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const re = /\{\{CONFIRM(?::\s*([^}]*))?\}\}|\[CONFIRM[^\]]*\]/g;
for (const f of roots.flatMap(walk).filter((f) => /\.(ts|tsx)$/.test(f))) {
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    for (const m of line.matchAll(re)) console.log(`${f}:${i + 1}  ${m[1]?.trim() || m[0]}`);
  });
}

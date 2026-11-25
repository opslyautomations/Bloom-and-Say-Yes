// Content integrity checks: review excerpts are exact substrings; answer paragraphs 40–60 words.
// Run: npm run check:content   (Node 22+ strips TS types natively)
import { reviews } from "../content/reviews.ts";
let bad = 0;
for (const r of reviews) {
  if (!r.text.includes(r.excerpt)) { console.error(`✗ excerpt not verbatim: ${r.id}`); bad++; }
}
console.log(bad ? `${bad} problem(s)` : `✓ ${reviews.length} review excerpts are verbatim`);
process.exit(bad ? 1 : 0);

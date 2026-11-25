# Bloom & Say Yes — bloomandsayyes.com

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4. Every page is statically
generated, so all text, images, links, and FAQ answers are in the HTML and the
site is fully readable with JavaScript disabled.

```bash
npm install
npm run dev            # http://localhost:3000 (shows yellow CONFIRM badges)
npm run build && npm start
npm run todo           # list every unconfirmed fact
npm run check:content  # verify review excerpts are verbatim
npm run photos         # re-download the original photos from the old site
```

Deploy on Vercel. Environment variables are in `.env.example`.

## Editing content

All copy lives in `/content` and is shared by the pages, the JSON-LD schema,
`/llms.txt`, and `/llms-full.txt`. Edit a fact once and it updates everywhere.

| File | What's in it |
|---|---|
| `content/site.ts` | Name, phone, email, socials, service area, founder story, trust row, 5 process steps, `lastUpdated` |
| `content/services.ts` | The three service pages: H1, answer paragraph, inclusions, form IDs, **packages** |
| `content/faqs.ts` | Every FAQ (grouped) + which FAQs appear on which page (`faqSets`) |
| `content/reviews.ts` | The 10 reviews, **verbatim**, with tags and pull-quote excerpts |
| `content/locations.ts` | Oahu location guides (section order varies per guide on purpose) |
| `lib/images.ts` | Photo manifest: src, size, alt text, focal point, tags, gallery category |

**Placeholders:** write `{{CONFIRM: what's missing}}` inside any content string.
It shows as a badge in development and disappears in production.

**Adding pricing:** fill `packages` on a service in `content/services.ts`
(`name`, `startingAt`, `summary`, `includes`). The 3-tier layout and the schema `offers`
then appear automatically.

**Adding photos:** put the file in `public/images`, then add an entry to `lib/images.ts`
with its real width/height, `alt`, `focalPoint`, `tags`, and `category`
(`proposals` / `florals` / `elopements` / `reveals`). The gallery, filter chips, and
portfolio strip all scale automatically. Filter chips only appear for categories that have photos.

**Bump `lastUpdated`** in `content/site.ts` when you change FAQs or location guides. It
drives the visible "Last updated" date, `dateModified` in the schema, and the sitemap.

## "Plan Your Perfect Day" popup

Every "Begin planning" button is a `<PlanLink>` (`components/plan/PlanLink.tsx`): a real link to
the page's `#plan` form or to `/contact`, so it works without JavaScript. Once JS loads,
`components/plan/PlanProvider.tsx` intercepts the click and opens `PlanModal`:

- On service pages it opens straight to that service's form. Everywhere else it opens at Step 1 ("Choose Your Service").
- Form IDs come only from `formId` in `content/services.ts` (the same field the inline forms use).
- Deep links: `?plan=open`, `?plan=engagement`, `?plan=gender-reveals`, `?plan=elopements`.
- Opening it adds a history entry, so the browser Back button closes the popup.
- From any client component: `usePlan().openPlan("engagement", "my-source")`.
- GA4 events: `plan_modal_open` (source, service), `plan_service_select` (service),
  and `generate_lead` (service, form_location = plan_modal | inline).

To add a trigger: `<PlanLink source="where-it-is" className="btn">Begin planning</PlanLink>`
(`service="choose"` forces Step 1, `service="engagement"` forces that form).

## Design system: "The Unfolding"

- **Arch** (`components/Arch.tsx`): images in a ceremony-arch mask that opens from a slit on scroll.
- **Vine** (`components/Vine.tsx`): rose line down the homepage gutter, drawn by scroll
  (CSS scroll-driven animation, with a JS fallback for Safari/Firefox). On mobile it becomes
  a top progress bar. It blooms around the final "Begin planning" button.
- **Petal dividers**, Roman-numeral **chapter markers**, one dark section per page (the closing CTA).
- Motion uses no libraries. One small controller (`components/MotionController.tsx`).
  Content is visible by default and `prefers-reduced-motion` is fully respected.

### Deviations from the brief (on purpose)

- **Text colors:** brand rose `#B78C8A` (2.6:1) and dusk `#988186` (3.2:1) fail WCAG AA as text.
  Eyebrows use `rose-text #8E6461` (4.5:1) and captions use `dusk-text #6F5A5F` (5.7:1). The
  brand colors are still used for the vine, borders, and decoration. Focus rings use `rose-text` for the same reason.
- **Vine drawing:** the vine is revealed with a scroll-linked `clip-path` instead of
  `stroke-dashoffset`. The look is the same, but a dash offset can't stay accurate on an SVG
  stretched to an unknown page height.
- **Hero copy reveal:** pure CSS that starts at first paint (not on hydration), so it can't delay LCP.

## Performance (local production build, Lighthouse mobile)

Performance 95 · Accessibility 100 · Best Practices 100 · SEO 100. CLS 0, TBT < 10 ms.
Observed LCP ≈ 0.1 s. Lighthouse's *simulated* slow-4G LCP is ≈ 2.9 s because it models
the Next.js runtime chunks as LCP dependencies. Check real-world LCP in Vercel Speed Insights / CrUX.

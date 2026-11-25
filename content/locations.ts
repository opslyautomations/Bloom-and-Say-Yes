import type { ImageKey } from "@/lib/images";

/**
 * Oahu proposal location guides.
 * {{CONFIRM}} The list itself must be confirmed with Scarlett — only publish
 * locations she actually works. Content is experiential only: no permit,
 * parking, fee, or access claims (those are {{CONFIRM}} markers).
 * Each guide orders its sections differently so no two pages read alike.
 */

export type LocationSection = "feel" | "time" | "styles" | "privacy" | "consider";

export type Location = {
  slug: string;
  name: string;
  region: string;
  /** One-line teaser for cards and llms.txt. */
  teaser: string;
  title: string;
  metaDescription: string;
  question: string;
  answer: string;
  feel: string;
  time: { heading: string; body: string };
  styles: { heading: string; items: { title: string; body: string }[] };
  privacy: string;
  consider: string;
  order: LocationSection[];
  /** Map marker in the hub SVG (lon/lat), omitted for island-wide guides. */
  coords?: [number, number];
  image?: ImageKey;
  imageNote?: string;
};

export const locations: Location[] = [
  {
    slug: "windward-coast",
    name: "Windward Coast Beaches",
    region: "Windward Oahu",
    teaser: "Mountain-backed beaches, calm water, and soft morning light on Oahu's east side.",
    title: "Windward Coast Proposal Guide, Oahu | Bloom & Say Yes",
    metaDescription:
      "Is the Windward Coast a good place to propose on Oahu? Mountain backdrops, morning light, and setup ideas from Oahu proposal planner Bloom & Say Yes.",
    question: "Is the Windward Coast a good place to propose?",
    answer:
      "Yes — Oahu's Windward Coast is one of the most dramatic places to propose on the island, with the green Koʻolau mountains rising behind the sand and small islands sitting offshore. Bloom & Say Yes designs Windward beach proposals with hand-built florals and full styling, and coordinates the photographer and every vendor.",
    feel:
      "The Windward side feels wild and green. Steep, fluted mountains catch the clouds, the water is often glassy in the morning, and offshore islets give every photo a natural focal point. It's a setting that photographs beautifully even under soft, overcast skies — moody light suits it.",
    time: {
      heading: "When is the best time to propose on the Windward Coast?",
      body: "Because these beaches face east, mornings bring the softest, most even light and the sun rising over the water. Late afternoon puts the sun behind the mountains, giving gentle shade and a pastel sky. Scarlett will recommend a time based on your date and the look you want.",
    },
    styles: {
      heading: "Setup styles that suit the Windward side",
      items: [
        { title: "Low oceanfront picnic", body: "A blanket, cushions, and a tropical arrangement set right at the waterline, framing the islands behind you." },
        { title: "Candlelit letters", body: "Lettered blocks and candles arranged in a line across the sand — striking from the photographer's angle." },
        { title: "Tropical florals", body: "Monstera, protea, and hydrangea feel at home against the deep greens of the mountains." },
      ],
    },
    privacy:
      "Windward beaches are generally quieter than Waikiki, but popular stretches still see visitors, especially on weekends. Weekday mornings tend to feel the most private. {{CONFIRM: specific beaches Scarlett uses, access and parking notes}}",
    consider:
      "Windward weather can shift quickly — passing showers are part of what keeps it so green. Scarlett has adapted setups around weather for past couples. {{CONFIRM: rain plan for windward bookings}}",
    order: ["feel", "time", "styles", "privacy", "consider"],
    coords: [-157.84, 21.52],
    image: "p05",
    imageNote: "{{CONFIRM: confirm this photo was taken on the Windward Coast before publishing a location caption}}",
  },
  {
    slug: "kahala",
    name: "Kahala & the South Shore",
    region: "South Shore, Honolulu",
    teaser: "A quieter, residential stretch of Honolulu shoreline with calm water and Diamond Head nearby.",
    title: "Proposing in Kahala & South Shore Oahu | Bloom & Say Yes",
    metaDescription:
      "Is Kahala a good place to propose? A quieter South Shore setting near Honolulu, with setup ideas from Oahu proposal planner Bloom & Say Yes.",
    question: "Is Kahala a good place to propose?",
    answer:
      "Kahala and the wider South Shore suit couples who want an oceanfront proposal close to Honolulu without the crowds of Waikiki. The shoreline is calmer and more residential in feel. Bloom & Say Yes designs South Shore setups with florals built in-house, and coordinates your photographer and every vendor.",
    privacy:
      "This is the draw: compared with Waikiki, the South Shore beyond Diamond Head tends to feel calm and unhurried, with fewer people passing through your photos. {{CONFIRM: specific spots, access, and parking — Scarlett to supply}}",
    feel:
      "Think soft sand, gentle reef-protected water, and leaning palms — understated and elegant. It suits couples who want the moment to feel intimate and personal rather than grand.",
    styles: {
      heading: "What setups work on the South Shore?",
      items: [
        { title: "Intimate picnic for two", body: "A styled blanket, cushions, champagne, and cake — the kind of quiet setup couples have described in their reviews." },
        { title: "A single statement arrangement", body: "One generous floral piece can carry a calm setting without overwhelming it." },
      ],
    },
    time: {
      heading: "Best time of day",
      body: "Late afternoon brings warm, low light along the South Shore. Scarlett will suggest timing that works with your date and the angle your photographer will shoot from.",
    },
    consider:
      "Because it's close to town, the South Shore is an easy choice for couples staying in Honolulu or Waikiki who want something quieter just a short drive away.",
    order: ["privacy", "feel", "styles", "time", "consider"],
    coords: [-157.77, 21.27],
  },
  {
    slug: "waikiki",
    name: "Waikiki",
    region: "Honolulu",
    teaser: "Iconic Diamond Head views and Honolulu energy — best for couples who love a lively backdrop.",
    title: "Proposing in Waikiki: Oahu Proposal Guide | Bloom & Say Yes",
    metaDescription:
      "Is Waikiki a good place to propose? Diamond Head views, timing, privacy notes, and setup ideas from Oahu proposal planner Bloom & Say Yes.",
    question: "Is Waikiki a good place to propose?",
    answer:
      "Waikiki is a great place to propose if you love an iconic backdrop — Diamond Head, the curve of the bay, and Honolulu's energy all in one frame. It's also Oahu's busiest beach, so timing and setup matter. Bloom & Say Yes plans Waikiki proposals with in-house florals and full vendor coordination, including your photographer.",
    consider:
      "Waikiki is rarely empty. If privacy matters most, consider an early-morning moment or one of the quieter settings in this guide. If you love a little buzz around you, Waikiki delivers a celebratory atmosphere. {{CONFIRM: whether Scarlett sets up on Waikiki beach or at nearby venues}}",
    time: {
      heading: "When is Waikiki quietest?",
      body: "Early morning is the calmest time on Waikiki's sand, with soft light and fewer people. Sunset is beautiful but busy. Scarlett can help you weigh atmosphere against privacy.",
    },
    feel:
      "Classic Hawaii: Diamond Head on the horizon, outrigger canoes, and a skyline that sparkles at dusk. It's a setting that instantly says “Honolulu.”",
    styles: {
      heading: "Setup styles for Waikiki",
      items: [
        { title: "Compact, elegant setups", body: "On a busy beach, a refined arrangement with florals and a clear focal point reads better than a sprawling layout." },
        { title: "A sunrise surprise", body: "An early setup lets you have the moment while the beach is still waking up." },
      ],
    },
    privacy:
      "Expect people nearby at most times of day. A skilled photographer can frame them out, and Scarlett coordinates that for you. {{CONFIRM: any Waikiki-specific setup rules}}",
    order: ["consider", "time", "feel", "styles", "privacy"],
    coords: [-157.83, 21.28],
  },
  {
    slug: "ko-olina",
    name: "Ko Olina & the West Side",
    region: "West Oahu",
    teaser: "Sunset-facing resort coastline with calm lagoons on Oahu's sunny leeward side.",
    title: "Ko Olina & West Side Proposals, Oahu | Bloom & Say Yes",
    metaDescription:
      "Is Ko Olina a good place to propose? West Side sunsets, calm lagoons, and setup ideas from Oahu proposal planner Bloom & Say Yes.",
    question: "Is Ko Olina a good place to propose?",
    answer:
      "Ko Olina and Oahu's West Side are ideal if you want a sunset proposal: the coast faces west, the leeward side is often sunny and dry, and the resort lagoons offer calm water. It's a natural fit for couples staying on the West Side. Bloom & Say Yes designs the florals and coordinates every vendor.",
    time: {
      heading: "Why choose the West Side for a sunset proposal?",
      body: "Oahu's West Side faces the setting sun, so golden hour here is long and warm. Plan the question shortly before sunset and let the sky do the rest. Scarlett will time the setup around your date.",
    },
    feel:
      "Polished and resort-like, with manicured lawns, palms, and sheltered lagoons. It feels relaxed and luxurious — a good match for couples on vacation who want the moment woven into their trip.",
    styles: {
      heading: "Setups that suit Ko Olina",
      items: [
        { title: "Golden-hour picnic", body: "Warm-toned florals and candlelight glow as the sun drops." },
        { title: "Lawn & lagoon settings", body: "Grassy areas allow umbrellas, rugs, and larger floral pieces." },
        { title: "Celebration add-ons", body: "Champagne and cake for a celebration right after the yes." },
      ],
    },
    consider:
      "Resort areas often have their own rules for setups and vendors. {{CONFIRM: Ko Olina access, resort permissions, and any fees — Scarlett to supply}}",
    privacy:
      "Lagoons are popular with resort guests during the day; the hour before sunset can feel more relaxed. {{CONFIRM: crowd notes from Scarlett}}",
    order: ["time", "feel", "styles", "consider", "privacy"],
    coords: [-158.12, 21.335],
  },
  {
    slug: "botanical-gardens",
    name: "Botanical Gardens",
    region: "Island-wide",
    teaser: "Lush, shaded garden settings for picnic-style proposals and intimate elopements.",
    title: "Botanical Garden Proposals on Oahu | Bloom & Say Yes",
    metaDescription:
      "Is a botanical garden a good place to propose on Oahu? Lush, shaded settings and picnic setup ideas from Oahu proposal planner Bloom & Say Yes.",
    question: "Is a botanical garden a good place to propose on Oahu?",
    answer:
      "A botanical garden is a beautiful place to propose on Oahu if you want lush greenery, shade, and a softer, storybook feel instead of a beach. Gardens suit picnic-style setups with umbrellas and abundant florals. Bloom & Say Yes designs garden proposals and elopements with florals built in-house and every vendor coordinated.",
    styles: {
      heading: "What does a garden proposal setup look like?",
      items: [
        { title: "Umbrella picnic", body: "A fringed umbrella, a white blanket, cushions, and a cake — framed by arrangements of white and blue blooms." },
        { title: "A petal path", body: "A trail of scattered petals leading to the setup, so the reveal unfolds step by step." },
        { title: "Garden elopements", body: "Florals and décor for just the two of you or a small circle." },
      ],
    },
    feel:
      "Gardens feel enclosed and romantic — tall trees, lawns, and layers of green that make florals pop. They photograph softly, even at midday, thanks to the shade.",
    privacy:
      "Gardens can feel more secluded than beaches, which makes them lovely for a surprise. {{CONFIRM: which gardens Scarlett works with, hours, and any permission or fee requirements}}",
    time: {
      heading: "Best time of day",
      body: "Shade makes gardens flexible: morning and late afternoon both bring gentle light through the trees. Scarlett will suggest timing for your chosen garden.",
    },
    consider:
      "Gardens are a natural fit for elopements too — see our intimate elopement planning if you're thinking beyond the proposal.",
    order: ["styles", "feel", "privacy", "time", "consider"],
    image: "scarlettFounder",
    imageNote: "{{CONFIRM: confirm photo setting before adding a location caption}}",
  },
  {
    slug: "sunrise-east-shore",
    name: "Sunrise on the East Shore",
    region: "Southeast Oahu",
    teaser: "Rugged sea cliffs and the first light of day for early risers.",
    title: "Sunrise Proposals, East Oahu | Bloom & Say Yes",
    metaDescription:
      "Is a sunrise proposal on Oahu worth the early alarm? East shore cliffs, first light, and setup ideas from Oahu proposal planner Bloom & Say Yes.",
    question: "Is a sunrise proposal on Oahu worth it?",
    answer:
      "A sunrise proposal on Oahu's east shore is worth the early alarm for couples who want privacy and unforgettable light. Rugged sea cliffs, crashing surf, and the first sun of the day make a dramatic backdrop, and beaches are at their quietest. Bloom & Say Yes sets up before you arrive and coordinates your photographer.",
    feel:
      "Raw and windswept — dark lava rock, white water, and cliffs that glow pink and gold as the sun comes up. It's a setting with real presence.",
    consider:
      "Sunrise means an early start for you and your partner, so think about how you'll get them there without giving the surprise away — Scarlett can help you plan the story. Wind is common on this coast, which shapes the kind of setup that works. {{CONFIRM: specific sunrise locations and any hike/access details}}",
    styles: {
      heading: "Setups built for wind and first light",
      items: [
        { title: "Low, grounded florals", body: "A petal-lined path or low arrangements hold up better than tall pieces in the breeze." },
        { title: "Family moments", body: "Couples have included their children in coastal proposals — a sweet, simple setup lets the scenery lead." },
      ],
    },
    time: {
      heading: "How early is a sunrise proposal?",
      body: "Plan to arrive before sunrise so you're in place as the light comes up. {{CONFIRM: typical sunrise setup start time}}",
    },
    privacy:
      "Early morning is the most private time almost anywhere on Oahu — part of the appeal of a sunrise proposal.",
    order: ["feel", "consider", "styles", "time", "privacy"],
    coords: [-157.66, 21.31],
    image: "p07",
    imageNote: "{{CONFIRM: confirm photo location before captioning}}",
  },
];

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);

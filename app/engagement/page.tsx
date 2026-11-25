import { PlanLink } from "@/components/plan/PlanLink";
import { serviceBySlug } from "@/content/services";
import { reviewById } from "@/content/reviews";
import { pageMeta } from "@/lib/meta";
import { Rich } from "@/lib/confirm";
import { PlanningFromAfar } from "@/components/PlanningFromAfar";
import { ServicePage } from "@/components/ServicePage";

const s = serviceBySlug("engagement");
export const metadata = pageMeta({ title: s.title, description: s.metaDescription, path: s.path });

function WeatherPlan() {
  const notes = [reviewById("duc-tran"), reviewById("gregory-belue")];
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="eyebrow">Weather plan</p>
        <h2 className="h2 mt-4">What if it rains on proposal day?</h2>
        <p className="answer mt-6">
          Oahu weather can change in minutes, and Bloom & Say Yes plans for it. Scarlett has adapted proposal setups
          around wind and rain for past couples — and their proposals still went off beautifully. You&apos;ll know the
          plan for your date before the day arrives.{" "}
          <Rich text="{{CONFIRM: rain plan, rescheduling, and backup-location policy}}" />
        </p>
        <PlanLink service="engagement" source="weather_chapter" href="#plan" className="link-quiet mt-8">Ask about your date <span className="arrow" aria-hidden="true">→</span></PlanLink>
      </div>
      <ul className="space-y-10 lg:col-span-5">
        {notes.map((r) => (
          <li key={r.id} className="border-l border-rose pl-6">
            <p className="font-display text-[1.45rem] italic leading-snug">“{r.text}”</p>
            <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em]">{r.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EngagementPage() {
  return (
    <ServicePage
      service={s}
      emphasis="Surprise"
      reviewCount={6}
      locationSlugs={["windward-coast", "waikiki", "ko-olina"]}
      extras={[
        { id: "from-afar", node: <PlanningFromAfar cta="#plan" /> },
        { id: "weather", node: <WeatherPlan /> },
      ]}
    />
  );
}

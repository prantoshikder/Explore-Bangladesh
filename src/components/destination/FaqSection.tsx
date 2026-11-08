/** Section 8 — FAQ accordion (native <details>: no JS, fully crawlable). */
import type { Faq } from "@/lib/faq";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fmt } from "@/i18n/config";
import { getT } from "@/i18n/server";

export async function FaqSection({ name, faqs, slug }: { name: string; faqs: Faq[]; slug?: string }) {
  const t = await getT();
  return (
    <section>
      <SectionHeading id="faq" number={8} eyebrow={t.guide.faq.eyebrow} title={fmt(t.guide.faq.title, { name })} />
      <div className="divide-y divide-jute overflow-hidden rounded-3xl bg-white ring-1 ring-jute">
        {faqs.map((f, i) => (
          <details key={f.q} className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ink hover:bg-sand [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-45">+</span>
            </summary>
            <p className="px-6 pb-6 text-sm leading-relaxed text-ink/80">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted print:hidden">
        {t.guide.faq.notAnswered}
        <Link href={`/contact?topic=${slug ? "correction" : "question"}${slug ? `&page=/destinations/${slug}` : ""}`} className="font-semibold text-brand-600 underline underline-offset-4">
          {t.guide.faq.ask}
        </Link>
      </p>
    </section>
  );
}

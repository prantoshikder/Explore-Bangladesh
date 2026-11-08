import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { getGalleryItems } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";
import { CostCalculator } from "@/components/tools/CostCalculator";
import { getAllDestinations } from "@/data/destinations";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT();
  return pageMetadata({ title: t.meta.calculator.title, description: t.meta.calculator.description, path: "/tools/cost-calculator", locale });
}

export default async function CostCalculatorPage() {
  const locale = await getLocale();
  const t = await getT();
  // Only pass the fields the client widget needs (not entire guides).
  const destinations = getAllDestinations(locale).map((d) => ({
    slug: d.slug,
    name: d.name,
    idealDuration: d.idealDuration,
    icon: d.coverEmoji,
    tiers: d.budget.tiers,
  }));

  return (
    <>
      <PageHero
        photo={getGalleryItems(locale).find((g) => g.photo.src.includes("inani-beach-boats"))!.photo}
        eyebrow={t.calc.heroEyebrow}
        title={t.calc.heroTitle}
        accent={t.calc.heroAccent}
        text={t.calc.heroText}
      />
      <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mt-10">
        <CostCalculator destinations={destinations} />
      </div>
    </div>
    </>
  );
}

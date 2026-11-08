/** Consistent numbered section heading used on the destination page. */
export function SectionHeading({
  id,
  number,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  number?: number;
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div id={id} className="mb-8">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
        {number !== undefined && (
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-[0.7rem] text-white">{number}</span>
        )}
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

/**
 * Loading placeholder for photo-hero detail pages (spots & destination guides).
 * Shown only for the instant during a client-side navigation while the page's
 * URL params resolve; prerendered pages ship their real content in the HTML.
 */
export function PhotoPageSkeleton() {
  return (
    <div aria-busy="true">
      <div className="relative bg-brand-900 pt-28 pb-32 sm:min-h-[620px] sm:pt-32 sm:pb-40">
        <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-56 rounded-full bg-white/15" />
          <div className="mt-12 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-white/15" />
            <div className="h-6 w-20 rounded-full bg-white/15" />
          </div>
          <div className="mt-5 h-16 w-2/3 max-w-xl rounded-2xl bg-white/20" />
          <div className="mt-4 h-5 w-48 rounded-full bg-white/15" />
          <div className="mt-6 h-5 w-full max-w-2xl rounded-full bg-white/10" />
          <div className="mt-3 h-5 w-3/4 max-w-xl rounded-full bg-white/10" />
        </div>
      </div>
      <div className="relative mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-28 animate-pulse rounded-3xl bg-white shadow-xl ring-1 ring-jute" />
      </div>
      <div className="mx-auto mt-16 max-w-7xl animate-pulse space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="h-9 w-72 rounded-xl bg-jute" />
        <div className="h-4 w-full max-w-3xl rounded-full bg-jute/70" />
        <div className="h-4 w-full max-w-3xl rounded-full bg-jute/70" />
        <div className="h-4 w-2/3 max-w-2xl rounded-full bg-jute/70" />
      </div>
    </div>
  );
}

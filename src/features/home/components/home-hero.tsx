import { Link } from "@/i18n/navigation";

type HeroDictionary = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export function HomeHero({ hero }: { hero: HeroDictionary }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-100 bg-white">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute -top-40 -left-20 h-[440px] w-[440px] rounded-full bg-teal-100/70 blur-[120px]" />
        <div className="absolute -top-32 right-0 h-[380px] w-[380px] rounded-full bg-violet-100/65 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pb-28 sm:pt-28 lg:px-8 lg:pb-36 lg:pt-36">
        {/* Eyebrow */}
        <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/85 px-5 py-2 text-[11px] font-semibold tracking-[0.25em] text-slate-500 uppercase shadow-sm backdrop-blur-sm sm:mb-8">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-teal-500" />
          </span>
          {hero.eyebrow}
        </p>

        {/* Headline */}
        <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          {hero.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg font-medium text-blue-600 sm:text-xl">
          {hero.subtitle}
        </p>

        {/* Body */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
          {hero.body}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/research"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/35 sm:w-auto"
          >
            {hero.ctaPrimary}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/team"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-8 py-3.5 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900 sm:w-auto"
          >
            {hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}

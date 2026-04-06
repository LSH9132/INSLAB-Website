import { Link } from "@/i18n/navigation";

type JoinCtaDictionary = {
  title: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  location: string;
  email: string;
};

export function HomeJoinCta({ dict }: { dict: JoinCtaDictionary }) {
  return (
    <section className="border-t border-slate-100 bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {dict.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
          {dict.body}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/join"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/35 sm:w-auto"
          >
            {dict.ctaPrimary}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-8 py-3.5 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900 sm:w-auto"
          >
            {dict.ctaSecondary}
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          {dict.location} · {dict.email}
        </p>
      </div>
    </section>
  );
}

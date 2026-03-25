import { Link } from "@/i18n/navigation";
import type { Publication } from "@/lib/content";

type PublicationsDictionary = {
  title: string;
  subtitle: string;
  viewAll: string;
  labels: Record<string, string>;
};

const typeBadgeColors: Record<string, string> = {
  Journal: "bg-blue-50 text-blue-700",
  Conference: "bg-violet-50 text-violet-700",
  Domestic: "bg-emerald-50 text-emerald-700",
};

export function HomePublicationsPreview({
  dict,
  publications,
}: {
  dict: PublicationsDictionary;
  publications: Publication[];
}) {
  const recent = publications.slice(0, 5);
  const total = publications.length;
  const subtitle = dict.subtitle
    .replace("{count}", String(recent.length))
    .replace("{total}", String(total));

  return (
    <section className="border-t border-slate-100 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {dict.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          </div>
          <Link
            href="/publications"
            className="group hidden items-center text-sm font-semibold text-accent hover:text-blue-700 sm:inline-flex"
          >
            {dict.viewAll}
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recent.map((pub) => (
            <article key={pub.id} className="py-5 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                <span
                  className={`inline-flex w-fit shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    typeBadgeColors[pub.type] ?? "bg-slate-100 text-slate-600"
                  }`}
                >
                  {dict.labels[pub.type] ?? pub.type}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-snug text-slate-900">
                    {pub.title}
                  </h3>
                  <p className="mt-1 truncate text-xs text-slate-400">
                    {pub.authors.join(", ")}
                  </p>
                </div>
                <div className="shrink-0 text-xs text-slate-400 sm:text-right">
                  <span>{pub.venue}</span>
                  <span className="ml-2 text-slate-300">·</span>
                  <span className="ml-2">{pub.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/publications"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-blue-700"
          >
            {dict.viewAll}
            <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

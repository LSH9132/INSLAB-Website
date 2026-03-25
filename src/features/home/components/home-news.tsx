import { Link } from "@/i18n/navigation";
import type { NewsItem } from "@/lib/content";

type NewsDictionary = {
  title: string;
  viewAll: string;
};

const categoryColors: Record<string, string> = {
  Awards: "bg-amber-50 text-amber-700",
  Papers: "bg-blue-50 text-blue-700",
  Events: "bg-violet-50 text-violet-700",
  Notices: "bg-slate-100 text-slate-600",
};

export function HomeNews({
  dict,
  items,
  locale,
}: {
  dict: NewsDictionary;
  items: NewsItem[];
  locale: string;
}) {
  const recent = items.slice(0, 3);

  return (
    <section className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900">
            <span className="h-8 w-2 rounded-full bg-accent" />
            {dict.title}
          </h2>
          <Link
            href="/news"
            className="group hidden items-center text-sm font-semibold text-accent hover:text-blue-700 sm:inline-flex"
          >
            {dict.viewAll}
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {recent.map((item) => {
            const title = locale === "ko" ? item.title.ko : item.title.en;
            const description =
              locale === "ko" ? item.description.ko : item.description.en;

            return (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      categoryColors[item.category] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <h3 className="mb-2 text-base font-bold leading-snug text-slate-900">
                  {title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-slate-500">
                  {description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news"
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

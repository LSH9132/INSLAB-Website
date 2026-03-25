import { Link } from "@/i18n/navigation";
import type { ResearchArea } from "@/lib/content";

type ResearchAreasDictionary = {
  title: string;
  subtitle: string;
  allResearch: string;
  exploreArea: string;
};

const areaLabels: Record<string, string> = {
  "intelligent-networking": "SYS",
  "distributed-ai": "DATA",
  "cyber-physical-systems": "SVC",
};

export function HomeResearchAreas({
  dict,
  areas,
  locale,
}: {
  dict: ResearchAreasDictionary;
  areas: ResearchArea[];
  locale: string;
}) {
  return (
    <section id="research-areas" className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {dict.title}
            </h2>
            <p className="mt-2 font-light text-slate-500">
              {dict.subtitle}
            </p>
          </div>
          <Link
            href="/research"
            className="group hidden items-center text-sm font-semibold text-accent hover:text-blue-700 sm:inline-flex"
          >
            {dict.allResearch}
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {areas.map((area) => {
            const label = areaLabels[area.id] ?? area.id.toUpperCase();
            const title = locale === "ko" ? area.title.ko : area.title.en;
            const description =
              locale === "ko" ? area.description.ko : area.description.en;
            // Use only the first paragraph for the preview
            const shortDesc = description.split("\n\n")[0];

            return (
              <Link
                key={area.id}
                href={`/research#${area.id}`}
                className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {label}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500">
                  {shortDesc}
                </p>

                {/* Keywords */}
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {area.keywords.slice(0, 4).map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-500"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="border-t border-slate-50 pt-4">
                  <span className="text-xs font-semibold text-accent group-hover:underline">
                    {dict.exploreArea} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Link } from "@/i18n/navigation";

type ResearchAreasDictionary = {
  title: string;
  subtitle: string;
  allResearch: string;
  exploreArea: string;
  areas: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
  }[];
};

export function HomeResearchAreas({ researchAreas }: { researchAreas: ResearchAreasDictionary }) {
  return (
    <section id="research-areas" className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {researchAreas.title}
            </h2>
            <p className="mt-2 font-light text-slate-500">
              {researchAreas.subtitle}
            </p>
          </div>
          <Link
            href="/publications"
            className="group hidden items-center text-sm font-semibold text-accent hover:text-blue-700 sm:inline-flex"
          >
            {researchAreas.allResearch}
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {researchAreas.areas.map((area) => (
            <article
              key={area.id}
              className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {area.eyebrow}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {area.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500">
                {area.description}
              </p>
              <div className="border-t border-slate-50 pt-4">
                <span className="text-xs font-semibold text-accent group-hover:underline">
                  {researchAreas.exploreArea}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

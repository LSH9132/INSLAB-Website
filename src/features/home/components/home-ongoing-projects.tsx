import { Link } from "@/i18n/navigation";
import { Clock } from "lucide-react";
import type { Project } from "@/lib/content";

type OngoingProjectsDictionary = {
  title: string;
  subtitle: string;
  viewAll: string;
  agencyLabel: string;
};

export function HomeOngoingProjects({
  dict,
  projects,
}: {
  dict: OngoingProjectsDictionary;
  projects: Project[];
}) {
  if (projects.length === 0) return null;

  return (
    <section id="mission" className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900">
              <span className="h-8 w-2 rounded-full bg-teal-500" />
              {dict.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{dict.subtitle}</p>
          </div>
          <Link
            href="/director#projects"
            className="group hidden items-center text-sm font-semibold text-accent hover:text-blue-700 sm:inline-flex"
          >
            {dict.viewAll}
            <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <Clock className="h-4 w-4 text-teal-500" />
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-teal-700">
                  {project.period}
                </span>
              </div>
              <h3 className="mb-3 text-base font-bold leading-snug text-slate-900">
                {project.title}
              </h3>
              <p className="mt-auto text-xs font-medium text-slate-400">
                {dict.agencyLabel} {project.agency}
              </p>
            </article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/director#projects"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-blue-700"
          >
            {dict.viewAll}
            <span aria-hidden className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

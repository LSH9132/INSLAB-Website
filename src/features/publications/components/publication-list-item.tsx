import type { Publication } from "@/lib/content";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

const publicationTypeStyles: Record<Publication["type"], string> = {
  Journal: "text-blue-700",
  Conference: "text-emerald-700",
  Domestic: "text-amber-700",
};

export function PublicationListItem({
  publication,
}: {
  publication: Publication;
}) {
  return (
    <article className="group -mx-4 rounded-sm px-4 py-6 md:py-8 hover:bg-slate-50/60">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="hidden w-20 shrink-0 flex-col pt-1 md:flex">
          <span className="text-2xl font-light text-slate-300 group-hover:text-slate-900">
            {publication.year}
          </span>
          {publication.date && (
            <span className="mt-0.5 text-[10px] font-medium text-slate-400">
              {formatDate(publication.date)}
            </span>
          )}
          <span
            className={`mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase ${publicationTypeStyles[publication.type]}`}
          >
            {publication.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex items-center gap-3 md:hidden">
            <span className="text-base font-light text-slate-900">
              {publication.date ? formatDate(publication.date) : publication.year}
            </span>
            <span className="size-1 rounded-full bg-slate-300" />
            <span
              className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${publicationTypeStyles[publication.type]}`}
            >
              {publication.type}
            </span>
          </div>

          <h2 className="max-w-3xl text-xl leading-tight tracking-tight text-slate-900 font-sans font-medium group-hover:text-accent md:text-[1.625rem]">
            {publication.title} 
          </h2>

          <p className="max-w-3xl text-sm leading-6 font-light text-slate-600">
            <span className="font-normal text-slate-900">
              {publication.authors.join(", ")}
            </span>
            <span className="mx-2 text-slate-400">{"//"}</span>
            <span className="italic">{publication.venue}</span>
            {publication.details ? `, ${publication.details}` : null}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {publication.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-row items-start gap-3 pt-1 md:w-16 md:flex-col md:items-end">
          {publication.pdfUrl ? (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-400 hover:text-slate-900"
            >
              PDF
            </a>
          ) : null}
          {publication.doiUrl ? (
            <a
              href={publication.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-400 hover:text-slate-900"
            >
              DOI
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

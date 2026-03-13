import Link from "next/link";

import type { Publication } from "@/features/publications/types";

const publicationTypeStyles: Record<Publication["type"], string> = {
  Journal: "text-blue-700",
  Conference: "text-emerald-700",
  Workshop: "text-orange-700",
};

export function PublicationListItem({
  publication,
}: {
  publication: Publication;
}) {
  return (
    <article className="group -mx-4 rounded-sm px-4 py-8 md:py-10 hover:bg-slate-50/60">
      <div className="flex flex-col gap-5 md:flex-row md:gap-8">
        <div className="hidden w-24 shrink-0 flex-col pt-1 md:flex">
          <span className="text-3xl font-light text-slate-300 group-hover:text-slate-900">
            {publication.year}
          </span>
          <span
            className={`mt-1 text-xs font-semibold tracking-[0.18em] uppercase ${publicationTypeStyles[publication.type]}`}
          >
            {publication.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-3 md:hidden">
            <span className="text-lg font-light text-slate-900">
              {publication.year}
            </span>
            <span className="size-1 rounded-full bg-slate-300" />
            <span
              className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${publicationTypeStyles[publication.type]}`}
            >
              {publication.type}
            </span>
          </div>

          <h2 className="max-w-3xl text-2xl leading-tight font-medium tracking-tight text-slate-900 font-serif group-hover:text-accent md:text-[2rem]">
            {publication.title}
          </h2>

          <p className="max-w-3xl text-base leading-7 font-light text-slate-600">
            <span className="font-normal text-slate-900">
              {publication.authors.join(", ")}
            </span>
            <span className="mx-2 text-slate-400">{"//"}</span>
            <span className="italic">{publication.venue}</span>
            {publication.details ? `, ${publication.details}` : null}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {publication.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-row items-start gap-4 pt-1 md:w-20 md:flex-col md:items-end">
          <Link
            href={publication.pdfUrl}
            className="text-sm font-medium text-slate-400 hover:text-slate-900"
          >
            PDF
          </Link>
          <Link
            href={publication.doiUrl}
            className="text-sm font-medium text-slate-400 hover:text-slate-900"
          >
            DOI
          </Link>
        </div>
      </div>
    </article>
  );
}

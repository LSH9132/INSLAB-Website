const filterItems = ["Year", "Research Area", "Type"];

export function PublicationFilters({ total }: { total: number }) {
  return (
    <section className="sticky top-[77px] z-40 mb-6 border-b border-border bg-background/90 py-4 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap gap-3">
          {filterItems.map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-slate-600 uppercase hover:border-slate-300 hover:text-slate-900"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase hover:border-slate-400 hover:text-slate-700"
          >
            Reset Filters
          </button>
        </div>
        <p className="text-sm text-slate-400">
          Displaying <span className="font-medium text-slate-600">{total}</span>{" "}
          papers
        </p>
      </div>
    </section>
  );
}

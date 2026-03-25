type NewsItem = {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
};

type NewsDictionary = {
  title: string;
  viewArchive: string;
  items: NewsItem[];
};

export function HomeNews({ news }: { news: NewsDictionary }) {
  return (
    <section className="border-t border-slate-100 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-12 flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900">
          <span className="h-8 w-2 rounded-full bg-accent" />
          {news.title}
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {news.items.map((item) => (
            <article
              key={item.id}
              className="group flex cursor-pointer flex-col gap-6 sm:flex-row"
            >
              <div className="h-64 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-48 sm:w-64">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    filter: "grayscale(20%)",
                  }}
                />
              </div>
              <div className="flex flex-col justify-center py-2">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <h3 className="mb-2 text-lg leading-snug font-bold text-slate-900 transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-accent"
          >
            {news.viewArchive}
            <span className="ml-1">›</span>
          </a>
        </div>
      </div>
    </section>
  );
}

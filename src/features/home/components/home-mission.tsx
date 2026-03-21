type MissionDictionary = {
  eyebrow: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
};

export function HomeMission({ mission }: { mission: MissionDictionary }) {
  return (
    <section
      id="mission"
      className="relative overflow-hidden border-y border-slate-100 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-16">
          <div className="mb-10 lg:mb-0 lg:w-1/3">
            <h2 className="mb-3 text-sm font-bold tracking-[0.2em] text-accent uppercase">
              {mission.eyebrow}
            </h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {mission.title}
            </h3>
          </div>
          <div className="lg:w-2/3">
            <p className="mb-8 text-lg leading-relaxed font-light text-slate-600">
              {mission.body}
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8 md:grid-cols-4">
              {mission.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="mb-1 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

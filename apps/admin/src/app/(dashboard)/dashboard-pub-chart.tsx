interface YearData {
  year: number;
  journal: number;
  conference: number;
  domestic: number;
}

export function DashboardPubChart({ data }: { data: YearData[] }) {
  const maxTotal = Math.max(...data.map((d) => d.journal + d.conference + d.domestic), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Publications by Year</h3>
      <div className="space-y-2">
        {data.map((d) => {
          const total = d.journal + d.conference + d.domestic;
          const pct = (total / maxTotal) * 100;
          const jPct = total > 0 ? (d.journal / total) * 100 : 0;
          const cPct = total > 0 ? (d.conference / total) * 100 : 0;
          return (
            <div key={d.year} className="flex items-center gap-3">
              <span className="w-10 text-xs text-gray-500 text-right tabular-nums">{d.year}</span>
              <div className="flex-1 h-5 rounded bg-gray-100 overflow-hidden">
                {total > 0 && (
                  <div className="h-full flex rounded overflow-hidden" style={{ width: `${pct}%` }}>
                    {d.journal > 0 && (
                      <div className="bg-blue-500 h-full" style={{ width: `${jPct}%` }} />
                    )}
                    {d.conference > 0 && (
                      <div className="bg-teal-500 h-full" style={{ width: `${cPct}%` }} />
                    )}
                    {d.domestic > 0 && <div className="bg-amber-500 h-full flex-1" />}
                  </div>
                )}
              </div>
              <span className="w-6 text-xs text-gray-600 text-right tabular-nums">{total || ""}</span>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          Journal
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          Conference
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          Domestic
        </span>
      </div>
    </div>
  );
}

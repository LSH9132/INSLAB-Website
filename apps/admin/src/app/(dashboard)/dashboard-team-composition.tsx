import type { MemberRole } from "@inslab/content-schemas";

const ROLE_CONFIG: Record<MemberRole, { color: string; label: string }> = {
  Professor: { color: "bg-red-400", label: "Professor" },
  PhD: { color: "bg-purple-400", label: "PhD" },
  MS: { color: "bg-blue-400", label: "MS" },
  BS: { color: "bg-green-400", label: "BS" },
  Alumni: { color: "bg-gray-300", label: "Alumni" },
};

export function DashboardTeamComposition({
  roleCounts,
  total,
  yearRange,
}: {
  roleCounts: Record<MemberRole, number>;
  total: number;
  yearRange: [number, number];
}) {
  const maxCount = Math.max(...Object.values(roleCounts), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Team Composition</h3>
      <div className="space-y-2.5">
        {(Object.keys(ROLE_CONFIG) as MemberRole[]).map((role) => {
          const count = roleCounts[role];
          const pct = (count / maxCount) * 100;
          const { color, label } = ROLE_CONFIG[role];
          return (
            <div key={role} className="flex items-center gap-3">
              <span className="w-16 text-xs text-gray-500 text-right">{label}</span>
              <div className="flex-1 h-4 rounded bg-gray-100 overflow-hidden">
                {count > 0 && (
                  <div
                    className={`${color} h-full rounded transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                )}
              </div>
              <span className="w-5 text-xs text-gray-600 text-right tabular-nums">{count}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Enrollment: {yearRange[0]}–{yearRange[1]}
        </span>
        <span className="text-xs text-gray-400">{total} total</span>
      </div>
    </div>
  );
}

import Link from "next/link";

interface HealthCheck {
  label: string;
  count: number;
  total: number;
  href: string;
}

function HealthRow({ check }: { check: HealthCheck }) {
  const ok = check.count === 0;
  return (
    <Link
      href={check.href}
      className={`flex items-center justify-between px-3 py-2.5 rounded-md text-xs transition-colors ${
        ok
          ? "bg-green-50 text-green-700 hover:bg-green-100"
          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${ok ? "bg-green-500" : "bg-amber-500"}`} />
        {check.label}
      </span>
      <span className="font-medium tabular-nums">
        {ok ? "OK" : `${check.count}/${check.total}`}
      </span>
    </Link>
  );
}

export function DashboardContentHealth({ checks }: { checks: HealthCheck[] }) {
  const issues = checks.filter((c) => c.count > 0).length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Content Health</h3>
        {issues > 0 ? (
          <span className="text-xs text-amber-600 font-medium">{issues} issues</span>
        ) : (
          <span className="text-xs text-green-600 font-medium">All good</span>
        )}
      </div>
      <div className="space-y-1.5">
        {checks.map((check) => (
          <HealthRow key={check.label} check={check} />
        ))}
      </div>
    </div>
  );
}

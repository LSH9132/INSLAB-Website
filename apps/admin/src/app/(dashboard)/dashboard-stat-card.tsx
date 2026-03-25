import Link from "next/link";

export function DashboardStatCard({
  label,
  count,
  href,
  children,
}: {
  label: string;
  count: number;
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col gap-2"
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{count}</p>
      {children && <div className="mt-auto">{children}</div>}
    </Link>
  );
}

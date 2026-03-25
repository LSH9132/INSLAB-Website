import Link from "next/link";

interface NewsEntry {
  id: string;
  category: string;
  date: string;
  title: { ko: string; en: string };
}

const CATEGORY_STYLES: Record<string, { border: string; badge: string }> = {
  Awards: { border: "border-l-yellow-500", badge: "bg-yellow-100 text-yellow-800" },
  Papers: { border: "border-l-blue-500", badge: "bg-blue-100 text-blue-800" },
  Events: { border: "border-l-green-500", badge: "bg-green-100 text-green-800" },
  Notices: { border: "border-l-gray-400", badge: "bg-gray-100 text-gray-700" },
};

export function DashboardNewsTimeline({ items }: { items: NewsEntry[] }) {
  if (items.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Recent News</h3>
        <p className="text-xs text-gray-400">No news items yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Recent News</h3>
        <Link href="/news" className="text-xs text-blue-600 hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-0">
        {items.map((item) => {
          const style = CATEGORY_STYLES[item.category] ?? CATEGORY_STYLES.Notices;
          return (
            <Link
              key={item.id}
              href="/news"
              className={`block border-l-3 ${style.border} pl-3 py-2.5 hover:bg-gray-50 transition-colors -ml-0.5`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-gray-900 truncate">{item.title.ko}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                </div>
                <span
                  className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium ${style.badge}`}
                >
                  {item.category}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

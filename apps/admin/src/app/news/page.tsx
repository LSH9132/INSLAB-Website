import { readYaml } from "@/lib/content-io";
import { NewsItemsSchema } from "@inslab/content-schemas";
import { ContentTable, type DisplayRow } from "@/components/content-table";
import { deleteNewsItem } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NewsPage() {
  const items = readYaml("news/news-items.yaml", NewsItemsSchema);

  const columns = [
    { key: "category", label: "Category" },
    { key: "date", label: "Date" },
    { key: "title", label: "Title" },
  ];

  const rows: DisplayRow[] = items.map((n) => ({
    id: n.id,
    editHref: `/news/${n.id}`,
    category: n.category,
    date: n.date,
    title: n.title.ko,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">News</h2>
        <Link href="/news/new" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          Add News
        </Link>
      </div>
      <ContentTable rows={rows} columns={columns} deleteAction={deleteNewsItem} />
    </div>
  );
}

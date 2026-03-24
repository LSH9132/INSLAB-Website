import { readYaml } from "@/lib/content-io";
import { MembersSchema } from "@inslab/content-schemas";
import { ContentTable, type DisplayRow } from "@/components/content-table";
import { deleteMember } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function TeamPage() {
  const members = readYaml("team/members.yaml", MembersSchema);

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "enrollYear", label: "Year" },
    { key: "interests", label: "Interests" },
  ];

  const rows: DisplayRow[] = members.map((m) => ({
    id: m.id,
    editHref: `/team/${m.id}`,
    name: `${m.name.ko} (${m.name.en})`,
    role: m.role,
    enrollYear: String(m.enrollYear),
    interests: m.interests.join(", "),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
        <Link
          href="/team/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Add Member
        </Link>
      </div>
      <ContentTable rows={rows} columns={columns} deleteAction={deleteMember} />
    </div>
  );
}

import { readYaml } from "@/lib/content-io";
import { MembersSchema } from "@inslab/content-schemas";
import { saveMember } from "../actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const ROLES = ["Professor", "PhD", "MS", "BS", "Alumni"] as const;

export default async function MemberEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const members = readYaml("team/members.yaml", MembersSchema);
  const member = isNew ? null : members.find((m) => m.id === id);

  if (!isNew && !member) redirect("/team");

  async function handleSave(formData: FormData) {
    "use server";
    await saveMember(formData);
    redirect("/team");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {isNew ? "Add Member" : "Edit Member"}
      </h2>
      <form action={handleSave} className="space-y-4">
        <Field label="ID" name="id" defaultValue={member?.id ?? ""} readOnly={!isNew} />
        <Field label="Name (KO)" name="name_ko" defaultValue={member?.name.ko ?? ""} />
        <Field label="Name (EN)" name="name_en" defaultValue={member?.name.en ?? ""} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            name="role"
            defaultValue={member?.role ?? "MS"}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <Field label="Photo path" name="photo" defaultValue={member?.photo ?? "/images/team/"} />
        <Field label="Enroll Year" name="enrollYear" type="number" defaultValue={String(member?.enrollYear ?? new Date().getFullYear())} />
        <Field label="Interests (comma-separated)" name="interests" defaultValue={member?.interests.join(", ") ?? ""} />
        <Field label="Email" name="email" defaultValue={member?.email ?? ""} />
        <Field label="Google Scholar URL" name="links_scholar" defaultValue={member?.links?.scholar ?? ""} />
        <Field label="GitHub URL" name="links_github" defaultValue={member?.links?.github ?? ""} />
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Save
          </button>
          <a href="/team" className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  readOnly = false,
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm ${readOnly ? "bg-gray-100" : ""}`}
      />
    </div>
  );
}

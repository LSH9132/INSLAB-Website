import { readYaml } from "@/lib/content-io";
import { MembersSchema } from "@inslab/content-schemas";
import { saveMember } from "../actions";
import { redirect } from "next/navigation";
import { FormField, FormSelect, FormActions, UnsavedChangesGuard } from "@/components/form";
import { ImageUpload } from "@/components/image-upload";

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
    redirect("/team?toast=saved");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {isNew ? "Add Member" : "Edit Member"}
      </h2>
      <form action={handleSave} className="space-y-4">
        <UnsavedChangesGuard />
        <FormField label="ID" name="id" defaultValue={member?.id ?? ""} readOnly={!isNew} />
        <FormField label="Name (KO)" name="name_ko" defaultValue={member?.name.ko ?? ""} />
        <FormField label="Name (EN)" name="name_en" defaultValue={member?.name.en ?? ""} />
        <FormSelect label="Role" name="role" options={ROLES} defaultValue={member?.role ?? "MS"} />
        <ImageUpload name="photo" subdir="team" defaultValue={member?.photo ?? ""} />
        <FormField label="Enroll Year" name="enrollYear" type="number" defaultValue={String(member?.enrollYear ?? new Date().getFullYear())} />
        <FormField label="Interests (comma-separated)" name="interests" defaultValue={member?.interests.join(", ") ?? ""} />
        <FormField label="Email" name="email" defaultValue={member?.email ?? ""} />
        <FormField label="Google Scholar URL" name="links_scholar" defaultValue={member?.links?.scholar ?? ""} />
        <FormField label="GitHub URL" name="links_github" defaultValue={member?.links?.github ?? ""} />
        <FormActions cancelHref="/team" />
      </form>
    </div>
  );
}

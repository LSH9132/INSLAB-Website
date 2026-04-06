import { readYaml } from "@/lib/content-io";
import { MembersSchema } from "@inslab/content-schemas";
import { saveMember } from "../actions";
import { redirect } from "next/navigation";
import { FormField, FormSelect, FormActions, UnsavedChangesGuard, ValidatedForm } from "@/components/form";
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

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {isNew ? "Add Member" : "Edit Member"}
      </h2>
      <ValidatedForm action={saveMember} className="space-y-4">
        <UnsavedChangesGuard />
        <FormField label="ID" name="id" defaultValue={member?.id ?? ""} readOnly={!isNew} placeholder="hong-gildong" hint="고유 식별자 (영문 소문자, 하이픈)" />
        <FormField label="Name (KO)" name="name_ko" defaultValue={member?.name.ko ?? ""} placeholder="홍길동" />
        <FormField label="Name (EN)" name="name_en" defaultValue={member?.name.en ?? ""} placeholder="Gildong Hong" />
        <FormSelect label="Role" name="role" options={ROLES} defaultValue={member?.role ?? "MS"} />
        <ImageUpload name="photo" subdir="team" defaultValue={member?.photo ?? ""} />
        <FormField label="Enroll Year" name="enrollYear" type="number" defaultValue={String(member?.enrollYear ?? new Date().getFullYear())} />
        <FormField label="Interests" name="interests" defaultValue={member?.interests.join(", ") ?? ""} placeholder="AI, Networking, Security" hint="쉼표로 구분" />
        <FormField label="Email" name="email" defaultValue={member?.email ?? ""} placeholder="user@example.com" hint="선택 사항" />
        <FormField label="Google Scholar URL" name="links_scholar" defaultValue={member?.links?.scholar ?? ""} placeholder="https://scholar.google.com/citations?user=..." hint="선택 사항" />
        <FormField label="GitHub URL" name="links_github" defaultValue={member?.links?.github ?? ""} placeholder="https://github.com/username" hint="선택 사항" />
        <FormActions cancelHref="/team" />
      </ValidatedForm>
    </div>
  );
}

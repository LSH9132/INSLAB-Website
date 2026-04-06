import { readYaml } from "@/lib/content-io";
import { ResearchAreasSchema } from "@inslab/content-schemas";
import { saveResearchArea } from "../actions";
import { redirect } from "next/navigation";
import { FormField, FormTextarea, FormActions, UnsavedChangesGuard, ValidatedForm } from "@/components/form";
import { SchemaGuide } from "@/components/schema-guide";

export const dynamic = "force-dynamic";

export default async function ResearchEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const areas = readYaml("research/areas.yaml", ResearchAreasSchema);
  const area = isNew ? null : areas.find((a) => a.id === id);
  if (!isNew && !area) redirect("/research");

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{isNew ? "Add Research Area" : "Edit Research Area"}</h2>
      <ValidatedForm action={saveResearchArea} className="space-y-4">
        <UnsavedChangesGuard />
        <FormField label="ID" name="id" defaultValue={area?.id ?? ""} readOnly={!isNew} placeholder="intelligent-networking" hint="영문 소문자, 하이픈. 새 ID 추가 시 research-area-section.tsx의 colorMap/iconComponents에 매핑 필요" />
        <FormField label="Title (KO)" name="title_ko" defaultValue={area?.title.ko ?? ""} />
        <FormField label="Title (EN)" name="title_en" defaultValue={area?.title.en ?? ""} />
        <FormTextarea label="Description (KO)" name="description_ko" defaultValue={area?.description.ko ?? ""} />
        <FormTextarea label="Description (EN)" name="description_en" defaultValue={area?.description.en ?? ""} />
        <FormField label="Keywords" name="keywords" defaultValue={area?.keywords.join(", ") ?? ""} placeholder="federated learning, edge AI, SDN" hint="쉼표로 구분하여 입력" />
        <div>
          <SchemaGuide
            title="Papers — 스키마 및 예시"
            fields={[
              { name: "title", type: "string", required: true, description: "논문 제목" },
              { name: "venue", type: "string", required: true, description: "게재처 (학술지/학회명, 예: IEEE TNSM)" },
              { name: "year", type: "number (정수)", required: true, description: "발행 연도 (예: 2025) — 따옴표 없이 숫자로 입력" },
            ]}
            example={`[
  {
    "title": "Intent-Based Autonomous Networking for Multi-Domain Mobile IoT",
    "venue": "IEEE TNSM",
    "year": 2025
  },
  {
    "title": "Federated Learning Optimization for Edge Networks",
    "venue": "IEEE ICC",
    "year": 2024
  }
]`}
          />
          <FormTextarea label="Papers" name="papers" defaultValue={JSON.stringify(area?.papers ?? [], null, 2)} mono />
        </div>
        <FormActions cancelHref="/research" />
      </ValidatedForm>
    </div>
  );
}

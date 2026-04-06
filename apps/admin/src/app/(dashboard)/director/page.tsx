import { readYaml } from "@/lib/content-io";
import { DirectorDataSchema, PublicationsSchema } from "@inslab/content-schemas";
import { ContentTable, type DisplayRow } from "@/components/content-table";
import { saveDirectorData, deleteDirectorPublication } from "./actions";
import { FormTextarea, FormActions, ValidatedForm } from "@/components/form";
import { SchemaGuide } from "@/components/schema-guide";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DirectorPage() {
  const data = readYaml("director/director.yaml", DirectorDataSchema);
  const pubs = readYaml("director/publications.yaml", PublicationsSchema);

  const pubColumns = [
    { key: "year", label: "Year" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
  ];

  const pubRows: DisplayRow[] = pubs.map((p) => ({
    id: p.id,
    editHref: `/director/pub/${p.id}`,
    year: String(p.year),
    title: p.title.length > 50 ? p.title.slice(0, 50) + "..." : p.title,
    type: p.type,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Director Profile</h2>
        <p className="text-sm text-gray-500 mb-6">각 필드는 JSON 배열 형태입니다. 스키마 가이드를 참고하여 편집하세요. 저장 시 구조가 자동 검증됩니다.</p>
        <ValidatedForm action={saveDirectorData} className="space-y-6 max-w-3xl">
          <div>
            <SchemaGuide
              title="Education — 스키마 및 예시"
              fields={[
                { name: "id", type: "string", required: true, description: "고유 식별자 (예: edu-phd, edu-ms)" },
                { name: "period", type: "string", required: true, description: "기간 (예: 2010.03 ~ 2015.02)" },
                { name: "degree", type: "string", required: true, description: "학위 (예: Ph.D. in Computer Science)" },
                { name: "institution", type: "string", required: true, description: "기관명 (예: 서울대학교)" },
                { name: "details", type: "string", required: false, description: "추가 설명 (예: 분산 시스템 전공)" },
              ]}
              example={`[
  {
    "id": "edu-phd",
    "period": "2010.03 ~ 2015.02",
    "degree": "Ph.D. in Computer Science",
    "institution": "서울대학교",
    "details": "분산 시스템 전공"
  },
  {
    "id": "edu-ms",
    "period": "2008.03 ~ 2010.02",
    "degree": "M.S. in Computer Engineering",
    "institution": "KAIST"
  }
]`}
            />
            <FormTextarea label="Education" name="education" defaultValue={JSON.stringify(data.education, null, 2)} rows={8} mono />
          </div>

          <div>
            <SchemaGuide
              title="Career — 스키마 및 예시"
              fields={[
                { name: "id", type: "string", required: true, description: "고유 식별자 (예: career-prof)" },
                { name: "period", type: "string", required: true, description: "기간 (예: 2020.03 ~ Present)" },
                { name: "role", type: "string", required: true, description: "직책/역할 (예: 조교수, 연구원)" },
                { name: "organization", type: "string", required: true, description: "소속 기관명" },
              ]}
              example={`[
  {
    "id": "career-prof",
    "period": "2020.03 ~ Present",
    "role": "조교수",
    "organization": "순천향대학교 컴퓨터공학과"
  },
  {
    "id": "career-researcher",
    "period": "2015.03 ~ 2020.02",
    "role": "선임연구원",
    "organization": "한국전자통신연구원 (ETRI)"
  }
]`}
            />
            <FormTextarea label="Career" name="career" defaultValue={JSON.stringify(data.career, null, 2)} rows={8} mono />
          </div>

          <div>
            <SchemaGuide
              title="Projects — 스키마 및 예시"
              fields={[
                { name: "id", type: "string", required: true, description: "고유 식별자 (예: proj-6g)" },
                { name: "period", type: "string", required: true, description: "수행 기간 (예: 2025.07 ~ 2026.02)" },
                { name: "title", type: "string", required: true, description: "과제명" },
                { name: "agency", type: "string", required: true, description: "지원 기관 (예: 한국연구재단)" },
                { name: "status", type: '"Ongoing" | "Past"', required: true, description: "진행 상태 — 반드시 Ongoing 또는 Past 중 하나" },
              ]}
              example={`[
  {
    "id": "proj-6g",
    "period": "2025.07 ~ 2026.02",
    "title": "6G 지능형 네트워킹 기반 자율 관리 시스템",
    "agency": "한국연구재단 (NRF)",
    "status": "Ongoing"
  },
  {
    "id": "proj-edge-ai",
    "period": "2023.03 ~ 2024.12",
    "title": "엣지 AI 기반 실시간 추론 플랫폼",
    "agency": "정보통신기획평가원 (IITP)",
    "status": "Past"
  }
]`}
            />
            <FormTextarea label="Projects" name="projects" defaultValue={JSON.stringify(data.projects, null, 2)} rows={8} mono />
          </div>

          <div>
            <SchemaGuide
              title="Patents — 스키마 및 예시"
              fields={[
                { name: "id", type: "string", required: true, description: "고유 식별자 (예: pat-ai-net)" },
                { name: "title", type: "string", required: true, description: "특허명" },
                { name: "number", type: "string", required: true, description: "출원/등록 번호 (예: 10-2024-0001234)" },
                { name: "date", type: "string", required: true, description: "출원/등록일 (예: 2024-06-15)" },
                { name: "status", type: '"Registered" | "Filed"', required: true, description: "상태 — 반드시 Registered(등록) 또는 Filed(출원) 중 하나" },
              ]}
              example={`[
  {
    "id": "pat-ai-net",
    "title": "인공지능 기반 네트워크 트래픽 최적화 방법 및 장치",
    "number": "10-2024-0001234",
    "date": "2024-06-15",
    "status": "Registered"
  },
  {
    "id": "pat-fl-edge",
    "title": "엣지 환경에서의 연합 학습 통신 효율화 방법",
    "number": "10-2025-0005678",
    "date": "2025-03-20",
    "status": "Filed"
  }
]`}
            />
            <FormTextarea label="Patents" name="patents" defaultValue={JSON.stringify(data.patents, null, 2)} rows={8} mono />
          </div>

          <FormActions cancelHref="/director" />
        </ValidatedForm>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Director Publications</h3>
          <Link href="/director/pub/new" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            Add Publication
          </Link>
        </div>
        <ContentTable rows={pubRows} columns={pubColumns} deleteAction={deleteDirectorPublication} />
      </div>
    </div>
  );
}

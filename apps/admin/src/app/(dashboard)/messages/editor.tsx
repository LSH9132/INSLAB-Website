"use client";

import { useState, useTransition, useMemo } from "react";
import { saveMessages, type FormState } from "./actions";

interface Props {
  enMessages: Record<string, unknown>;
  koMessages: Record<string, unknown>;
}

interface KeySchema {
  desc: string;
  subKeys: { key: string; type: string; required: boolean; desc: string }[];
}

const STRUCTURE_GUIDE: Record<string, KeySchema> = {
  nav: {
    desc: "헤더 네비게이션",
    subKeys: [
      { key: "home/research/publications/team/contact", type: "NavItem", required: true, desc: "{ label, summary, sections: [{ title, links: [{ label, description }] }], feature: { eyebrow, title, description } }" },
      { key: "searchPlaceholder", type: "string", required: true, desc: "검색창 placeholder 텍스트" },
      { key: "joinUs", type: "string", required: true, desc: "가입 버튼 텍스트" },
      { key: "openSection / openMenu / closeMenu", type: "string", required: true, desc: "접근성 레이블" },
      { key: "mobileSubLinks", type: "Record<string, {label, href}[]>", required: true, desc: "모바일 아코디언 하위 링크 (team, research)" },
    ],
  },
  footer: {
    desc: "푸터",
    subKeys: [
      { key: "tagline", type: "string", required: true, desc: "로고 아래 설명 텍스트 (줄바꿈: \\n)" },
      { key: "columns", type: "Record<string, { title, links: [{ label, href }] }>", required: true, desc: "링크 컬럼 (research, team, more)" },
      { key: "cta", type: "{ title, description, linkText }", required: true, desc: "합류 CTA 카드" },
      { key: "copyright", type: "string", required: true, desc: "저작권 문구" },
    ],
  },
  home: {
    desc: "홈 페이지",
    subKeys: [
      { key: "metadata", type: "{ title, description }", required: true, desc: "HTML <title>, <meta description>" },
      { key: "hero", type: "{ eyebrow, title, titleAccent, body, ctaPrimary, ctaSecondary }", required: true, desc: "메인 히어로 섹션" },
      { key: "ongoingProjects", type: "{ title, ongoing }", required: true, desc: "진행 중 프로젝트 섹션" },
      { key: "researchAreas", type: "{ title, body, viewAll }", required: true, desc: "연구분야 미리보기" },
      { key: "publications", type: "{ title, body, viewAll }", required: true, desc: "논문 미리보기" },
      { key: "news", type: "{ title, viewAll }", required: true, desc: "뉴스 미리보기" },
      { key: "joinCta", type: "{ title, body, cta }", required: true, desc: "합류 CTA" },
    ],
  },
  publications: {
    desc: "논문 페이지",
    subKeys: [
      { key: "metadata", type: "{ title, description }", required: true, desc: "HTML 메타" },
      { key: "hero", type: "{ eyebrow, title, body }", required: true, desc: "히어로 섹션" },
      { key: "filters / types / noResults", type: "string", required: true, desc: "필터 UI 레이블" },
    ],
  },
  Director: {
    desc: "지도교수 페이지 (주의: 대문자 D)",
    subKeys: [
      { key: "hero", type: "{ badge, degree, department, university, address, lectureLabel, whosWho }", required: true, desc: "교수 프로필 히어로" },
      { key: "education / career / researchArea / projects / patents / publications 등", type: "string", required: true, desc: "각 섹션 타이틀" },
    ],
  },
  team: {
    desc: "구성원 페이지",
    subKeys: [
      { key: "hero", type: "{ eyebrow, title, body, bodySecond }", required: true, desc: "히어로 섹션" },
      { key: "sections", type: "{ director, graduate, undergraduate }", required: true, desc: "섹션 제목" },
      { key: "roles", type: "{ professor, phd, ms, bs }", required: true, desc: "역할 레이블" },
      { key: "stats", type: "{ value, label }[]", required: true, desc: "통계 카드 배열" },
      { key: "viewProfile", type: "string", required: true, desc: "프로필 보기 버튼 텍스트" },
    ],
  },
  research: {
    desc: "연구 페이지",
    subKeys: [
      { key: "metadata", type: "{ title, description }", required: true, desc: "HTML 메타" },
      { key: "hero", type: "{ eyebrow, title, body }", required: true, desc: "히어로 섹션" },
      { key: "framework", type: "{ title, body, points: string[] }", required: true, desc: "프레임워크 카드" },
      { key: "connectivity", type: "{ title, body, cta }", required: true, desc: "네트워크 시각화 섹션" },
      { key: "keywords / representativePapers / ongoingProjects / ongoing", type: "string", required: true, desc: "레이블" },
    ],
  },
  contact: {
    desc: "연락처 페이지",
    subKeys: [
      { key: "hero", type: "{ eyebrow, title, body, ctaPrimary, ctaSecondary }", required: true, desc: "히어로 섹션" },
      { key: "info", type: "{ title, address: { label, line1, line2 }, email, phone }", required: true, desc: "연락처 정보" },
      { key: "inquiries", type: "{ title, types: [{ icon, title, description }] }", required: true, desc: "문의 유형 카드" },
      { key: "directions", type: "{ title, placeholder, address, openInMap }", required: true, desc: "오시는 길" },
    ],
  },
  news: {
    desc: "뉴스 페이지",
    subKeys: [
      { key: "metadata", type: "{ title, description }", required: true, desc: "HTML 메타" },
      { key: "hero", type: "{ eyebrow, title, body }", required: true, desc: "히어로 섹션" },
      { key: "all / categories", type: "string / Record", required: true, desc: "필터 레이블" },
    ],
  },
  join: {
    desc: "합류 페이지",
    subKeys: [
      { key: "hero", type: "{ eyebrow, title, body, bodySecond }", required: true, desc: "히어로 섹션" },
      { key: "why", type: "{ title, points: [{ title, description }] }", required: true, desc: "합류 이유" },
      { key: "recruitment", type: "{ title, fields, idealCandidate, qualifications, benefits, process }", required: true, desc: "모집 정보" },
      { key: "faq", type: "{ title, items: [{ question, answer }] }", required: true, desc: "FAQ" },
      { key: "apply", type: "{ title, description, emailLabel, documentsLabel, documents: string[] }", required: true, desc: "지원 방법" },
    ],
  },
};

function validateStructure(json: string): string[] {
  const errors: string[] = [];
  try {
    const parsed = JSON.parse(json);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return ["최상위 구조가 객체여야 합니다"];
    }
    for (const [key, schema] of Object.entries(STRUCTURE_GUIDE)) {
      if (!(key in parsed)) {
        errors.push(`"${key}" 키가 없습니다 — ${schema.desc}`);
      }
    }
    // Check nav sub-keys
    if (parsed.nav && typeof parsed.nav === "object") {
      const navKeys = ["home", "research", "publications", "team", "contact", "searchPlaceholder", "joinUs", "openSection", "openMenu", "closeMenu"];
      for (const k of navKeys) {
        if (!(k in parsed.nav)) errors.push(`nav.${k} 키가 없습니다`);
      }
    }
    // Check footer sub-keys
    if (parsed.footer && typeof parsed.footer === "object") {
      for (const k of ["tagline", "columns", "cta", "copyright"]) {
        if (!(k in parsed.footer)) errors.push(`footer.${k} 키가 없습니다`);
      }
    }
  } catch {
    errors.push("JSON 문법 오류");
  }
  return errors;
}

export function MessageEditor({ enMessages, koMessages }: Props) {
  const [locale, setLocale] = useState<"en" | "ko">("ko");
  const [content, setContent] = useState({
    en: JSON.stringify(enMessages, null, 2),
    ko: JSON.stringify(koMessages, null, 2),
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Real-time validation
  const liveErrors = useMemo(() => validateStructure(content[locale]), [content, locale]);

  const handleSave = () => {
    setServerError(null);
    if (liveErrors.length > 0) {
      setServerError(liveErrors.join("; "));
      return;
    }

    const formData = new FormData();
    formData.set("locale", locale);
    formData.set("content", content[locale]);
    startTransition(async () => {
      const result: FormState = await saveMessages({}, formData);
      if (result.errors) {
        setServerError(Object.values(result.errors).join("; "));
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setLocale("ko")}
          className={`px-3 py-1.5 rounded-md text-sm ${locale === "ko" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Korean
        </button>
        <button
          onClick={() => setLocale("en")}
          className={`px-3 py-1.5 rounded-md text-sm ${locale === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          English
        </button>
      </div>

      {/* Structure guide */}
      <details className="border border-gray-200 rounded-lg overflow-hidden">
        <summary className="px-4 py-2.5 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 bg-white">
          JSON 구조 가이드 — 전체 스키마 (클릭하여 펼치기)
        </summary>
        <div className="border-t border-gray-100 divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
          {Object.entries(STRUCTURE_GUIDE).map(([key, schema]) => (
            <div key={key} className="px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <code className="font-mono font-bold text-blue-700 text-sm">{key}</code>
                <span className="text-xs text-gray-400">{schema.desc}</span>
              </div>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-100">
                    <th className="pb-1 pr-2 font-medium">Sub-key</th>
                    <th className="pb-1 pr-2 font-medium">Type</th>
                    <th className="pb-1 pr-2 font-medium">Required</th>
                    <th className="pb-1 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {schema.subKeys.map((sk) => (
                    <tr key={sk.key} className="border-b border-gray-50">
                      <td className="py-1 pr-2 font-mono text-violet-600 whitespace-nowrap">{sk.key}</td>
                      <td className="py-1 pr-2 font-mono text-emerald-600 break-all">{sk.type}</td>
                      <td className="py-1 pr-2">{sk.required ? <span className="text-red-600 font-semibold">필수</span> : <span className="text-gray-400">선택</span>}</td>
                      <td className="py-1 text-gray-500">{sk.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </details>

      {/* Live validation status */}
      {liveErrors.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 space-y-1">
          <p className="text-xs font-semibold text-amber-800">실시간 검증 — {liveErrors.length}개 문제 발견:</p>
          <ul className="text-xs text-amber-700 list-disc list-inside">
            {liveErrors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
      {liveErrors.length === 0 && content[locale].trim().length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-md px-3 py-2">
          <p className="text-xs text-green-700 font-medium">구조 검증 통과</p>
        </div>
      )}

      <textarea
        value={content[locale]}
        onChange={(e) => setContent({ ...content, [locale]: e.target.value })}
        rows={30}
        className={`w-full border rounded-md px-3 py-2 text-sm font-mono ${
          liveErrors.length > 0 ? "border-amber-400" : "border-gray-300"
        }`}
      />

      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={isPending || liveErrors.length > 0}
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : `Save ${locale.toUpperCase()}`}
      </button>
    </div>
  );
}

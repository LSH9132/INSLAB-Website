# Stitch Design to Code

이 문서는 Stitch MCP로 생성한 디자인을 현재 `inslab-website` 코드베이스로 옮길 때 따를 기준을 정의한다.
목표는 Stitch 산출물을 그대로 붙여 넣는 것이 아니라, 이 프로젝트의 구조 문서와 코드 스타일 규칙에 맞게 재구성하는 것이다.

## 대상 Stitch 프로젝트

- Project Title: `INSLAB Research Overview`
- Project ID: `16047339261920898655`
- Screen Title: `INSLAB Publications List`
- Screen ID: `329e92a7fec2438ca0534632085570e8`

## 기본 원칙

- Stitch 결과물은 구현 참고 자료로 사용한다.
- HTML 코드를 그대로 앱에 넣지 않는다.
- 화면은 `Next.js App Router + TypeScript + Tailwind CSS + Framer Motion` 규칙에 맞게 재구성한다.
- 한 파일에 모든 마크업을 몰아넣지 않고, 의미 단위로 컴포넌트화한다.
- 디자인의 시각적 의도는 유지하되, 코드 구조는 이 레포 기준을 우선한다.

## Stitch 산출물 가져오기

Stitch가 제공한 hosted URL은 `curl -L`로 내려받는다.

### 현재 화면 기준 다운로드 대상

- Screenshot URL: Stitch screen `329e92a7fec2438ca0534632085570e8`의 hosted screenshot
- HTML URL: Stitch screen `329e92a7fec2438ca0534632085570e8`의 hosted htmlCode

예시:

```bash
mkdir -p .stitch/16047339261920898655

curl -L "SCREENSHOT_URL" \
  -o ".stitch/16047339261920898655/publications-list.png"

curl -L "HTML_URL" \
  -o ".stitch/16047339261920898655/publications-list.html"
```

규칙:

- Stitch 원본 파일은 `.stitch/` 같은 작업용 디렉토리에 둔다.
- 원본 HTML은 참조용으로만 사용한다.
- 장기 보관할 디자인 원본 PNG나 참고 이미지는 `resources/design/png`로 정리한다.
- `resources`는 보관용 기준본이고, 실제 구현에는 필요한 파일만 복사해서 사용한다.
- 실제 서비스에 쓰는 이미지나 아이콘만 `public/` 아래로 복사해 옮긴다.

## 파일 배치 규칙

`INSLAB Publications List` 화면을 구현할 때 기본 배치는 아래를 따른다.

```text
src/
├── app/
│   └── publications/
│       └── page.tsx
├── features/
│   └── publications/
│       ├── components/
│       │   ├── publications-hero.tsx
│       │   ├── publication-filters.tsx
│       │   ├── publication-list.tsx
│       │   └── publication-list-item.tsx
│       ├── data/
│       │   └── publications.ts
│       └── types.ts
└── lib/
    └── motion/
        └── fade-up.ts
```

원칙:

- `src/app/publications/page.tsx`는 페이지 엔트리만 담당한다.
- Stitch 화면 분석 결과를 바탕으로 실제 UI는 `src/features/publications/components`에 나눈다.
- 반복되는 카드, 리스트 아이템, 필터 UI는 독립 컴포넌트로 분리한다.
- 공통 모션 preset은 `src/lib/motion`에 둔다.

## 컴포넌트화 기준

Stitch 화면을 아래 순서로 분해한다.

1. 페이지 레벨 섹션을 찾는다.
2. 반복되는 블록을 찾는다.
3. 데이터 구조를 먼저 정의한다.
4. 공용으로 승격할 UI와 기능 전용 UI를 나눈다.

`INSLAB Publications List` 기준 권장 분해 예시:

- `publications-hero.tsx`
- `publication-filters.tsx`
- `publication-list.tsx`
- `publication-list-item.tsx`
- 필요 시 `publication-tag.tsx`, `publication-meta.tsx`

다음은 페이지 파일에 두지 않는다.

- 긴 카드 마크업
- 반복 렌더링 로직
- 큰 variant 객체
- 더미 데이터 배열

## Stitch HTML 사용 규칙

- Stitch HTML은 레이아웃 구조와 텍스트 위계 파악용으로만 본다.
- 불필요한 wrapper, inline style, 절대 위치 기반 레이아웃은 그대로 가져오지 않는다.
- HTML을 읽고 나면 JSX로 다시 작성한다.
- 시맨틱 태그를 복구한다.
  - 제목은 `h1`, `h2`
  - 목록은 `ul`, `li`
  - 링크는 `a` 또는 `next/link`
  - 버튼은 `button`

## Tailwind 적용 규칙

- 색상, 간격, 타이포그래피, 레이아웃은 Tailwind로 작성한다.
- 같은 시각 패턴이 3번 이상 반복되면 컴포넌트 또는 상수로 추출한다.
- Stitch HTML에 들어 있는 inline style 값은 그대로 옮기지 말고 Tailwind 유틸리티로 변환한다.
- 정말 반복되는 값만 CSS 변수나 전역 토큰으로 올린다.

## Framer Motion 적용 규칙

- 모션은 `Framer Motion`으로만 처리한다.
- 페이지 전체를 한 번에 애니메이션하지 않는다.
- 섹션 진입, 리스트 stagger, 카드 hover처럼 의미 있는 부분에만 적용한다.
- 모션이 필요한 컴포넌트만 `"use client"`를 선언한다.
- 공용 variants와 transition은 `src/lib/motion`에 둔다.

`INSLAB Publications List` 권장 모션 예시:

- 페이지 진입 시 hero 영역 fade-up
- publication item 리스트 stagger
- 카드 hover 시 미세한 y 이동 또는 shadow 변화

## Stitch 결과물을 코드로 옮기는 절차

1. Stitch screenshot과 HTML을 다운로드한다.
2. 화면을 섹션 단위로 분해한다.
3. 필요한 데이터 타입을 먼저 정의한다.
4. `src/app/publications/page.tsx`에 최소 엔트리 구조만 만든다.
5. 세부 UI는 `src/features/publications/components`로 분리한다.
6. 공용으로 재사용 가능한 요소는 `src/components`로 승격할지 검토한다.
7. 모션이 필요하면 `src/lib/motion` preset을 먼저 만든다.
8. Tailwind 클래스와 Motion props 충돌이 없는지 점검한다.
9. 최종적으로 screenshot과 구현 결과를 비교해 간격, 계층, 강조점을 맞춘다.

## 리뷰 체크리스트

- 페이지 파일이 얇게 유지되는가
- Stitch HTML을 그대로 복붙하지 않았는가
- 반복 UI가 별도 컴포넌트로 분리되었는가
- 더미 데이터와 타입이 분리되었는가
- Tailwind와 Motion 역할이 충돌하지 않는가
- 모션이 필요한 컴포넌트만 클라이언트 컴포넌트인가
- 스크린샷 기준 시각적 위계가 유지되는가

## 금지 규칙

- Stitch HTML 전체를 단일 `page.tsx`에 붙여 넣지 않는다.
- inline style을 대량으로 유지하지 않는다.
- absolute positioning에 과도하게 의존하지 않는다.
- 화면 하나를 구현하면서 관련 없는 공용 컴포넌트 구조를 무리하게 바꾸지 않는다.
- 디자인 맞추기를 이유로 구조 문서와 코드 스타일 규칙을 무시하지 않는다.

## 참고 문서

- `docs/project-structure.md`
- `docs/code-style.md`
- `docs/git-workflow.md`

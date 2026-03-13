# Project Structure

이 문서는 `inslab-website`의 기본 디렉토리 구조와 파일 배치 규칙을 정의한다.
기준은 `Next.js App Router`의 공식 프로젝트 구조 가이드이며, 연구실 웹사이트에 맞게 실무적으로 단순화했다.

## 목표

- 라우팅 구조와 UI 구현 구조를 분리한다.
- 기능이 늘어나도 폴더 의미가 유지되도록 한다.
- Agent가 새 파일을 만들 때 위치를 쉽게 판단할 수 있게 한다.

## 현재 기준

이 프로젝트는 `src/app`을 사용하는 `Next.js App Router` 프로젝트다.
따라서 라우팅 파일은 `src/app` 아래에서 관리한다.

## 권장 루트 구조

```text
.
├── docs/
├── resources/
│   ├── design/
│   │   ├── psd/
│   │   ├── png/
│   │   ├── svg/
│   │   └── reference/
│   └── copy/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   ├── about/
│   │   ├── research/
│   │   ├── publications/
│   │   ├── members/
│   │   ├── contact/
│   │   ├── api/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── sections/
│   ├── features/
│   │   ├── home/
│   │   ├── members/
│   │   ├── publications/
│   │   └── contact/
│   ├── lib/
│   │   ├── api/
│   │   ├── constants/
│   │   ├── motion/
│   │   ├── utils/
│   │   └── validators/
│   ├── styles/
│   └── types/
├── .env.local
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 폴더 역할

### `src/app`

- Next.js 라우팅 전용 디렉토리다.
- URL 세그먼트와 직접 연결되는 파일만 둔다.
- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts` 같은 Next.js 규약 파일을 배치한다.

### `src/components`

- 여러 페이지에서 재사용되는 프레젠테이션 컴포넌트를 둔다.
- 도메인 로직보다 UI 조합에 집중한다.

권장 하위 폴더:

- `ui`: 버튼, 배지, 카드처럼 범용 UI
- `layout`: 헤더, 푸터, 내비게이션
- `sections`: Hero, CTA, Timeline처럼 페이지 섹션 단위 UI

### `src/features`

- 페이지별 또는 도메인별 기능 코드를 둔다.
- 특정 화면에 가까운 컴포넌트, 데이터 매핑, 뷰 모델, 훅을 함께 둘 수 있다.
- 공용이 아닌 코드는 먼저 `features`에 두고, 재사용이 충분히 생길 때 `components`나 `lib`로 승격한다.

### `src/lib`

- 프레임워크와 무관하게 재사용되는 로직을 둔다.
- 데이터 포맷팅, fetch 유틸, 상수, 스키마 검증, 서버 유틸 등을 포함한다.
- `Framer Motion`의 variant, transition preset, viewport 옵션 같은 공용 모션 설정도 이 아래에 둔다.

### `src/types`

- 공통 타입과 도메인 타입을 둔다.
- 한 기능에서만 쓰는 타입은 해당 `features/*` 내부에 함께 둔다.

### `public`

- 정적 파일만 둔다.
- 이미지, 아이콘, 다운로드 파일처럼 URL로 직접 제공할 리소스를 저장한다.

### `resources`

- PSD, PNG, SVG, PDF 같은 디자인 원본과 작업 자료를 둔다.
- 서비스에 직접 배포되지 않는 원본 리소스 보관 디렉토리다.
- 이 폴더의 파일은 기준본으로 보관하고, 실제 구현에 쓸 때는 필요한 파일만 복사해서 사용한다.
- 런타임에서 실제로 쓰는 파일은 검토 후 `public/`로 복사하거나 최적화해서 옮긴다.

### `docs`

- 구조, 규칙, 결정사항, 작업 가이드를 둔다.
- 구현이 바뀌면 문서도 함께 업데이트한다.

## 디자인 리소스 규칙

`resources`는 작업 원본을, `public`은 배포용 파일을 관리한다.

권장 구조:

```text
resources/
├── design/
│   ├── psd/
│   ├── png/
│   ├── svg/
│   └── reference/
└── copy/
```

규칙:

- PSD, PNG, 벡터 원본, 참고 스크린샷은 `resources/design` 아래에 둔다.
- 콘텐츠 원고나 섹션 카피 초안은 `resources/copy`에 둔다.
- `resources`의 파일은 직접 import하거나 서비스 경로로 바로 연결하지 않는다.
- 최종 서비스용 이미지, 아이콘, 폰트는 `resources`에서 선별해 `public/`로 복사한 뒤 사용한다.
- 일회성 다운로드 산출물은 `.stitch/`처럼 별도 작업 폴더를 사용하고 Git 추적 대상에서 제외할 수 있다.
- 고용량 원본 파일을 커밋할 때는 팀 저장소 용량을 고려한다.
- 파일명은 자산 종류와 용도가 드러나게 작성한다.
  - 예: `logo-inslab-primary-light-v1.svg`
  - 예: `bg-home-hero-light-v1.png`
  - 예: `page-publications-list-desktop-v2.png`

## App Router 규칙

Next.js 공식 가이드 기준으로 다음 규칙을 따른다.

- 폴더는 URL 세그먼트를 만든다.
- `page.tsx`가 있어야 공개 라우트가 된다.
- `layout.tsx`는 하위 세그먼트를 감싸는 공통 UI를 제공한다.
- `route.ts`는 API 엔드포인트를 만든다.
- `loading.tsx`, `error.tsx`, `not-found.tsx`는 필요한 라우트에만 국소적으로 둔다.

## Route Group 사용 규칙

URL을 바꾸지 않고 구조만 정리해야 할 때 route group을 사용한다.

예시:

```text
src/app/
├── (marketing)/
│   ├── page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
└── admin/
    └── page.tsx
```

규칙:

- 그룹명은 URL에 포함되지 않는다.
- 같은 레이아웃을 공유하는 라우트를 묶을 때만 사용한다.
- 그룹이 너무 많아지면 오히려 탐색성이 떨어지므로 정보 구조가 분명할 때만 도입한다.

## Private Folder 사용 규칙

라우팅 대상이 아닌 내부 구현 파일은 `_folder` 패턴을 사용할 수 있다.

예시:

```text
src/app/members/
├── page.tsx
├── _components/
│   └── member-grid.tsx
└── _lib/
    └── member-mapper.ts
```

규칙:

- `src/app` 내부에서 라우팅 파일과 구현 파일을 분리하고 싶을 때만 사용한다.
- 프로젝트 전반의 공용 코드라면 `src/components`, `src/features`, `src/lib`를 우선 사용한다.

## 파일 배치 원칙

### 페이지 파일

- 페이지 엔트리 역할만 담당한다.
- 데이터 조합과 섹션 배치는 하되, 긴 JSX와 세부 구현은 하위 컴포넌트로 분리한다.

### 컴포넌트 파일

- 하나의 명확한 UI 책임만 가진다.
- 파일 하나가 지나치게 커지면 하위 컴포넌트로 분리한다.

### 유틸 파일

- 브라우저/서버 어디에서 동작하는지 분명히 한다.
- 서버 전용 로직은 클라이언트 컴포넌트에서 직접 import하지 않는다.

### 모션 파일

- 애니메이션 구현은 `Framer Motion`을 기준으로 한다.
- 공용 motion preset은 `src/lib/motion`에 둔다.
- 특정 섹션 전용 애니메이션은 해당 `features/*` 또는 `_components` 가까이에 둔다.
- 페이지 파일에서 직접 긴 variant 객체를 선언하지 않는다.

## 연구실 웹사이트에 맞춘 라우트 초안

초기 정보 구조는 아래를 기본값으로 삼는다.

```text
src/app/
├── page.tsx
├── about/page.tsx
├── research/page.tsx
├── publications/page.tsx
├── members/page.tsx
└── contact/page.tsx
```

향후 필요 시 다음을 추가한다.

- `news/`: 연구실 소식
- `projects/`: 진행 중인 연구 프로젝트
- `join/`: 대학원생 모집 또는 지원 안내
- `api/`: 문의 폼, CMS 연동, 자동화 엔드포인트

## 네이밍 규칙

- 폴더명: 소문자 kebab-case
- React 컴포넌트 파일명: kebab-case 권장, export 컴포넌트명은 PascalCase
- Next.js 규약 파일명: 프레임워크 규칙 그대로 사용
- 유틸 파일명: 목적 중심 kebab-case
- 타입 파일명: 도메인 기준 kebab-case

예시:

- `src/components/layout/site-header.tsx`
- `src/features/publications/publication-list.tsx`
- `src/lib/utils/format-date.ts`
- `src/lib/motion/fade-up.ts`

## Agent 작업 체크리스트

새 파일을 만들기 전에 아래 순서로 판단한다.

1. 이 파일이 URL을 만드는가
2. 특정 기능 전용 구현인가
3. 여러 화면에서 재사용되는 UI인가
4. 프레임워크와 무관한 유틸 또는 타입인가

판단 결과에 따라 아래 위치를 우선 선택한다.

- 라우트면 `src/app`
- 기능 전용이면 `src/features`
- 공용 UI면 `src/components`
- 공용 로직이면 `src/lib`
- 공용 타입이면 `src/types`

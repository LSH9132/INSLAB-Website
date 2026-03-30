# INSLAB Website - 사용 가이드

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [설치 및 실행](#설치-및-실행)
4. [프로젝트 구조](#프로젝트-구조)
5. [콘텐츠 관리](#콘텐츠-관리)
6. [페이지 구성](#페이지-구성)
7. [다국어 지원](#다국어-지원)
8. [Docker 배포](#docker-배포)
9. [개발 워크플로우](#개발-워크플로우)

---

## 프로젝트 개요

INSLAB Website는 **Next.js 16** 기반의 연구실 웹사이트입니다. 정적 사이트 생성(SSG) 방식으로 빌드되며, YAML 파일로 콘텐츠를 관리하고, 한국어/영어 다국어를 지원합니다.

---

## 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 16.1.6 |
| UI | React | 19.2.3 |
| 언어 | TypeScript (strict) | 5 |
| 스타일링 | Tailwind CSS | 4 |
| 애니메이션 | motion (Framer Motion) | 12.36.0 |
| 다국어 | next-intl | 4.8.3 |
| 데이터 검증 | Zod | 4.3.6 |
| 콘텐츠 포맷 | YAML | - |
| 아이콘 | Lucide React | 0.577.0 |
| 폰트 | Pretendard, Playfair Display, JetBrains Mono | - |

---

## 설치 및 실행

### 사전 요구사항

- **Node.js** 18 이상
- **npm** (워크스페이스 지원)
- **Docker & Docker Compose** (배포 시)

### 로컬 개발 환경 설정

```bash
# 1. 저장소 클론
git clone <repo-url>
cd INSLAB-Website

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 값 수정

# 4. 개발 서버 실행
npm run dev
```

개발 서버가 `http://localhost:3000` 에서 실행됩니다.

### 사용 가능한 npm 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (Hot Reload 지원) |
| `npm run build` | 정적 사이트 빌드 (out/ 디렉토리에 출력) |
| `npm run start` | 빌드된 사이트를 로컬에서 서빙 |
| `npm run lint` | ESLint 코드 검사 |

### 환경 변수 (.env.local)

```
ADMIN_PASSWORD=<관리자 비밀번호>
SESSION_SECRET=<64자 이상 랜덤 문자열>
DOMAIN=<도메인명>
CERTBOT_EMAIL=<SSL 인증서 알림 이메일>
```

> `SESSION_SECRET` 생성: `openssl rand -base64 48`

---

## 프로젝트 구조

```
INSLAB-Website/
├── src/                    # 소스 코드
│   ├── app/                # Next.js App Router (라우트/페이지)
│   │   └── [locale]/       # 다국어 동적 라우팅
│   ├── components/         # 재사용 가능한 공통 컴포넌트
│   │   ├── layout/         #   헤더, 푸터, 페이지 쉘
│   │   └── shared/         #   공유 애니메이션 등
│   ├── features/           # 페이지별 도메인 컴포넌트
│   │   ├── home/           #   홈 페이지 전용
│   │   ├── team/           #   팀 페이지 전용
│   │   ├── publications/   #   논문 페이지 전용
│   │   ├── research/       #   연구 페이지 전용
│   │   ├── news/           #   뉴스 페이지 전용
│   │   ├── director/       #   지도교수 페이지 전용
│   │   ├── contact/        #   연락처 페이지 전용
│   │   └── join/           #   합류 페이지 전용
│   ├── lib/                # 유틸리티, 훅, 프리셋
│   │   ├── content/        #   YAML 콘텐츠 로더 + Zod 스키마
│   │   ├── hooks/          #   커스텀 React 훅
│   │   ├── motion/         #   애니메이션 프리셋
│   │   └── constants/      #   상수 정의
│   ├── types/              # TypeScript 타입 정의
│   ├── i18n/               # 다국어 설정 (routing, request, navigation)
│   └── messages/           # 번역 파일 (en.json, ko.json)
├── content/                # YAML 콘텐츠 데이터
│   ├── team/               #   팀원 정보
│   ├── publications/       #   논문 목록 (journals, conferences, domestic)
│   ├── research/           #   연구 분야
│   ├── news/               #   뉴스
│   ├── announcements/      #   공지사항
│   └── director/           #   지도교수 프로필 및 논문
├── packages/               # 모노레포 패키지
│   └── content-schemas/    #   Zod 콘텐츠 검증 스키마
├── services/               # Docker 서비스 설정
│   ├── nginx/              #   Nginx 설정 (개발/프로덕션)
│   ├── builder/            #   빌드 서비스
│   ├── certbot/            #   SSL 인증서 자동 갱신
│   └── backup/             #   백업 서비스
├── public/                 # 정적 자산 (이미지, 아이콘)
├── docs/                   # 프로젝트 문서
└── docker-compose.yml      # Docker 설정
```

### 파일 배치 기준

| 질문 | 위치 |
|------|------|
| URL을 생성하는 파일인가? | `src/app/` (page.tsx, layout.tsx) |
| 특정 페이지 전용인가? | `src/features/{feature}/` |
| 여러 페이지에서 재사용하는가? | `src/components/` |
| 프레임워크 무관 유틸리티인가? | `src/lib/` |
| 타입 정의인가? | `src/types/` |

---

## 콘텐츠 관리

웹사이트의 모든 데이터는 `/content/` 디렉토리의 **YAML 파일**로 관리됩니다. 빌드 시 Zod 스키마로 검증되어 데이터 무결성이 보장됩니다.

### 팀원 추가/수정

파일: `content/team/members.yaml`

```yaml
- id: "kim-minjun"
  name:
    en: "Minjun Kim"
    ko: "김민준"
  role: "PhD Student"         # Professor | PhD Student | MS Student | ...
  photo: "/images/team/kim-minjun.jpg"
  interests:
    en: ["Edge Computing", "IoT"]
    ko: ["엣지 컴퓨팅", "사물인터넷"]
  email: "minjun@example.com"
  joinDate: "2024-03"
```

### 논문 추가

파일: `content/publications/journals.yaml` (또는 `conferences.yaml`, `domestic.yaml`)

```yaml
- id: "j-2025-kim-edge"
  year: 2025
  type: "Journal"             # Journal | Conference | Domestic
  title: "논문 제목"
  authors: ["M. Kim", "J. Lee"]
  venue: "IEEE Access (SCIE)"
  details: "Vol. 13, pp. 35113-35123"
  date: "2025-02"
  tags: ["Edge Computing", "IoT"]
  pdfUrl: ""
  doiUrl: "https://doi.org/10.1109/..."
```

### 연구 분야 수정

파일: `content/research/areas.yaml`

### 뉴스 추가

파일: `content/news/news-items.yaml`

### 지도교수 정보 수정

파일: `content/director/director.yaml` (프로필), `content/director/publications.yaml` (논문)

### 콘텐츠 수정 후

콘텐츠 YAML 파일을 수정한 뒤 다시 빌드하면 사이트에 반영됩니다:

```bash
npm run build
```

개발 서버(`npm run dev`)에서는 자동으로 반영됩니다.

---

## 페이지 구성

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | 홈 | 히어로, 연구 하이라이트, 최근 논문, 뉴스, 합류 CTA |
| `/research/` | 연구 | 연구 분야 및 주제 소개 |
| `/publications/` | 논문 | 논문 목록 (필터/검색 지원) |
| `/team/` | 팀 | 구성원 그리드 (역할별 분류) |
| `/director/` | 지도교수 | 프로필, 학력, 논문, 프로젝트, 특허 |
| `/news/` | 뉴스 | 연구실 소식 |
| `/join/` | 합류 | 연구실 참여 안내 |
| `/contact/` | 연락처 | 위치 및 연락 정보 |

모든 페이지는 `/en/...` (영어) 및 `/ko/...` (한국어) 경로로 접근 가능합니다.

---

## 다국어 지원

### 지원 언어

- **영어 (en)** - 기본 언어
- **한국어 (ko)**

### 번역 파일

- `src/messages/en.json` - 영어 UI 텍스트
- `src/messages/ko.json` - 한국어 UI 텍스트

### 번역 추가 방법

1. `en.json`과 `ko.json`에 동일한 키로 번역 추가:

```json
// en.json
{
  "PageName": {
    "title": "Page Title",
    "description": "Page description"
  }
}

// ko.json
{
  "PageName": {
    "title": "페이지 제목",
    "description": "페이지 설명"
  }
}
```

2. 컴포넌트에서 사용:

```tsx
import { useTranslations } from 'next-intl';

export default function PageName() {
  const t = useTranslations('PageName');
  return <h1>{t('title')}</h1>;
}
```

### 라우팅

`src/i18n/routing.ts`에서 로케일과 기본 언어가 설정됩니다. URL은 자동으로 `/en/page` 또는 `/ko/page` 형태로 생성됩니다.

---

## Docker 배포

### 아키텍처

```
[인터넷] → [Nginx (80/443)] → [정적 파일 서빙]
                                      ↑
                              [Builder 서비스] → npm run build
                                      ↑
                              [Admin UI (3000)]
```

### 개발 환경 배포

```bash
docker-compose up
```

- Nginx: 포트 80
- Admin: 포트 3000 (localhost만 접근)
- Builder: 포트 4000 (내부)
- Preview: 포트 9980

### 프로덕션 배포 (SSL 포함)

```bash
# 1. 환경 변수 설정
# .env 파일에 DOMAIN, CERTBOT_EMAIL 설정

# 2. 실행
docker-compose -f docker-compose.prod.yml up -d
```

- Certbot이 Let's Encrypt SSL 인증서를 자동 발급/갱신합니다.
- Nginx가 HTTPS(443)로 트래픽을 처리합니다.

---

## 개발 워크플로우

### Git 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 안정적인 배포 코드 |
| `develop` | 다음 릴리스 통합 |
| `feature/*` | 기능 개발 (develop에서 분기) |
| `release/*` | 릴리스 준비 |
| `hotfix/*` | 긴급 수정 (main에서 분기) |

### 기능 개발 흐름

```bash
# 1. develop에서 새 브랜치 생성
git checkout develop
git pull origin develop
git checkout -b feature/기능이름

# 2. 코드 작성 및 커밋
git add src/변경된파일.tsx
git commit -m "feat(scope): 변경 내용 요약"

# 3. 원격에 푸시
git push -u origin feature/기능이름

# 4. GitHub에서 PR 생성
```

### 커밋 메시지 규칙

```
type(scope): subject

Why:
- 변경 이유

What:
- 변경 내용

Notes:
- 참고 사항
```

**type 종류:** `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `perf`, `build`, `ci`

### 코딩 규칙 요약

- `any` 사용 금지 → `unknown` 사용
- 서버 컴포넌트 기본 → `"use client"`는 필요한 경우만
- 파일당 하나의 메인 컴포넌트
- Tailwind 클래스 순서: 레이아웃 → 박스모델 → 타이포그래피 → 상태
- 반복 패턴 3회 이상 → 컴포넌트 또는 CSS 변수로 추출
- `prefers-reduced-motion` 접근성 지원

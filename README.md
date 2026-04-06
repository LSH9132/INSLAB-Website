# INSLAB Website

서울대학교 INSLAB 연구실 공식 웹사이트입니다. Next.js 16 기반 정적 사이트와, 그 콘텐츠를 편집하고 재빌드하는 별도의 어드민 앱, 그리고 이 둘을 nginx 뒤에서 묶어 서빙하는 Docker 스택으로 구성돼 있습니다.

## 기술 스택

- **프론트엔드**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, next-intl (`ko` / `en`)
- **콘텐츠**: YAML 파일 + Zod 스키마 검증 (`@inslab/content-schemas`)
- **어드민**: 독립된 Next.js 앱 (`apps/admin`), 세션 기반 로그인
- **빌드 오케스트레이션**: Node HTTP 서버(`services/builder`)가 어드민 요청을 받아 정적 사이트를 재빌드
- **서빙**: nginx (정적 파일), 프로덕션에서는 Let's Encrypt 인증서로 HTTPS
- **배포**: Docker Compose (base + 프로덕션 오버레이)

## 아키텍처 개요

```
 ┌─ content/*.yaml ─────┐          ┌── docker-data/site/ (정적 출력) ──┐
 │                      │          │                                  │
 │  YAML 편집/저장        │  next    │   /en, /ko, /_next/static/...    │
 │                      │  build   │                                  │
 └─── apps/admin ───────┘ ───────► └─── services/nginx (80/443) ──────┘
          ▲                              ▲
          │ 세션 로그인                     │ 사용자 접속
        관리자                            모두
```

- 메인 사이트 소스는 리포지토리 루트(`src/`, `content/`)에 있고, 빌더 컨테이너가 이를 읽어 `next build`로 정적 파일을 만들고 공유 볼륨(`docker-data/site`)에 씁니다.
- 어드민은 같은 공유 볼륨에서 `content/`를 읽고 쓰며, 저장 후에는 HTTP로 빌더에 `/build`를 호출해 재빌드를 트리거합니다.
- nginx는 `docker-data/site`를 읽기 전용으로 마운트해 최종 정적 파일만 서빙합니다. 메인 Next.js가 런타임으로 떠 있지 않습니다.
- 프로덕션 오버레이에서만 certbot이 붙어 Let's Encrypt 인증서를 발급/갱신합니다.

## 디렉토리 구조

```
.
├── src/                  # 메인 사이트 (Next.js App Router)
│   ├── app/              # 라우팅 엔트리 (ko/en)
│   ├── components/       # 공용 UI
│   ├── features/         # 페이지/도메인별 기능 구현
│   └── lib/              # 유틸, 모션 preset, 서버 헬퍼
├── apps/
│   └── admin/            # 어드민 Next.js 앱 (포트 3000)
├── packages/
│   └── content-schemas/  # Zod 기반 콘텐츠 스키마
├── services/
│   ├── builder/          # 빌더 HTTP 서버 (포트 4000)
│   ├── nginx/            # nginx 설정 (개발/프로덕션)
│   ├── certbot/          # Let's Encrypt 갱신 스크립트
│   └── backup/           # 백업 스크립트
├── content/              # 실제 사이트 콘텐츠 YAML
│   ├── announcements/
│   ├── director/
│   ├── news/
│   ├── publications/
│   ├── research/
│   └── team/
├── public/               # 정적 자산
├── docker-data/          # 컨테이너 런타임 데이터 (Git 제외)
├── docker-compose.yml       # 개발 base
├── docker-compose.prod.yml  # 프로덕션 오버레이 (HTTPS + certbot)
└── docs/                 # 프로젝트 작업 규칙 문서
```

자세한 배치 규칙은 `docs/project-structure.md`를 참고하세요.

## 요구 사항

- Node.js 20+
- npm (`package-lock.json` 커밋됨)
- Docker 및 Docker Compose v2 (Docker로 실행할 때)

## 빠른 시작 — 로컬 Next.js 개발

어드민/빌더 없이 메인 사이트 UI만 빠르게 띄우고 싶을 때 사용합니다.

```bash
npm install
npm run dev
```

개발 서버: <http://localhost:3000>

그 밖에 사용 가능한 스크립트:

```bash
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # ESLint
```

## Docker 전체 스택 실행

사이트 + 어드민 + 빌더 + nginx 전체를 컨테이너로 함께 올릴 때 사용합니다. 실제 콘텐츠 편집 흐름을 검증하려면 이 쪽을 써야 합니다.

스택은 개발용 base(`docker-compose.yml`)와 프로덕션 오버레이(`docker-compose.prod.yml`)로 나뉩니다. 오버레이는 HTTPS, certbot, 그리고 `~kimdy` 사용자 디렉토리 마운트를 base 위에 덧붙입니다.

### 개발용 (SSL 없음)

base만 사용합니다. admin은 `127.0.0.1:3000`에만 바인딩되어 외부에 노출되지 않습니다.

```bash
docker compose up --build -d
```

| 서비스 | 접속 |
| --- | --- |
| 메인 사이트 (nginx) | <http://localhost> |
| 어드민 | <http://127.0.0.1:3000> |
| 프리뷰 nginx | <http://localhost:9980> |

### 프로덕션 (HTTPS + certbot + `~kimdy`)

오버레이를 base 위에 올려 올립니다. `.env`에 `DOMAIN`과 `CERTBOT_EMAIL`이 설정되어 있어야 합니다.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

> `-f` 순서가 중요합니다. 뒤에 오는 파일이 앞 파일을 덮어쓰므로 **base를 먼저, 프로덕션 오버레이를 뒤에** 지정해야 합니다. 순서를 뒤집으면 prod에서 바꿔야 하는 `SITE_URL` 같은 값이 base 값으로 되돌아갑니다.

## 환경 변수

루트의 `.env` 파일에서 관리합니다. 템플릿은 `.env.example`을 참고하세요.

| 이름 | 설명 | 기본값 |
| --- | --- | --- |
| `ADMIN_PASSWORD` | 어드민 로그인 비밀번호 | `admin` (반드시 교체) |
| `SESSION_SECRET` | 세션 쿠키 서명 키. 변경 시 기존 세션 모두 무효화 | `inslab-prod-secret-change-me` |
| `DOMAIN` | 프로덕션 도메인. certbot과 nginx 템플릿이 참조 | — |
| `CERTBOT_EMAIL` | Let's Encrypt 인증서 갱신 알림용 이메일 | — |

`SESSION_SECRET`은 다음 명령으로 안전한 값을 생성합니다.

```bash
openssl rand -base64 48
```

## 콘텐츠 편집 흐름

1. 관리자가 어드민(<http://127.0.0.1:3000> 또는 리버스 프록시 뒤)에 로그인한다.
2. 어드민 UI에서 논문/공지/연구/팀원 등 섹션의 YAML을 편집하고 저장한다.
3. 저장 시 어드민이 `http://builder:4000/build`에 POST를 보내 재빌드를 요청한다.
4. 빌더가 `next build`를 돌려 결과를 `docker-data/site`에 쓴다.
5. nginx가 업데이트된 정적 파일을 곧바로 서빙한다.

콘텐츠 YAML 스키마는 `packages/content-schemas/src`에서 Zod로 정의되며, 어드민 폼이 이 스키마로 검증합니다.

## 주요 포트 요약

| 포트 | 역할 | 노출 범위 |
| --- | --- | --- |
| 80 | 메인 사이트 nginx | 외부 |
| 443 | 메인 사이트 nginx (HTTPS, 프로덕션 전용) | 외부 |
| 3000 | 어드민 Next.js | 호스트 루프백(`127.0.0.1`) |
| 4000 | 빌더 HTTP 서버 | 내부 네트워크 전용 |
| 9980 | 프리뷰 nginx | 외부 |

> 어드민(3000)은 일부러 외부에 열지 않습니다. 외부에서 접속해야 한다면 nginx에 리버스 프록시 블록을 추가하거나 SSH 터널을 사용하세요.

## 문서

프로젝트 작업 규칙과 설계 기준은 `docs/` 아래에 있습니다.

- [`docs/README.md`](docs/README.md) — 문서 전체 인덱스
- [`docs/project-structure.md`](docs/project-structure.md) — 디렉토리 구조와 파일 배치 원칙
- [`docs/code-style.md`](docs/code-style.md) — TypeScript / React / Next.js / Tailwind 작성 규칙
- [`docs/git-workflow.md`](docs/git-workflow.md) — Git Flow 기반 브랜치/커밋 규칙
- [`docs/stitch-design-to-code.md`](docs/stitch-design-to-code.md) — Stitch 디자인을 코드로 옮기는 기준
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — 기여 가이드

## 기여

- 기능 작업은 `develop`에서 `feature/*` 브랜치로 분기합니다.
- 커밋 메시지는 `type(scope): subject` 형식을 따릅니다.
- PR을 열기 전에 `npm run lint`와 `npm run build`를 통과시켜야 합니다.
- 구조나 운영 규칙이 바뀌면 같은 PR 안에서 관련 문서도 함께 업데이트합니다.

자세한 규칙은 `CONTRIBUTING.md`와 `docs/git-workflow.md`를 참고.

# Git Workflow

이 문서는 `inslab-website` 프로젝트의 Git 협업 규칙을 정의한다.
목표는 작업 충돌을 줄이고, 리뷰 가능한 단위로 변경을 분리하며, 배포 흐름을 안정적으로 유지하는 것이다.

기본 전략은 `git flow`를 따른다.

## 브랜치 전략

기본 브랜치는 아래처럼 운영한다.

- `main`: 실제 배포 가능한 안정 브랜치
- `develop`: 다음 배포를 준비하는 통합 브랜치
- `feature/*`: 기능 개발 브랜치
- `release/*`: 배포 준비 브랜치
- `hotfix/*`: 운영 이슈 긴급 수정 브랜치

## 브랜치 역할

### `main`

- 항상 배포 가능한 상태를 유지한다.
- 직접 커밋하지 않는다.
- `release/*` 또는 `hotfix/*` 병합만 허용한다.

### `develop`

- 다음 릴리스를 준비하는 기본 작업 브랜치다.
- 일반 기능 개발은 모두 여기서 분기한다.

### `feature/*`

- 하나의 기능 또는 하나의 명확한 작업 단위만 담는다.
- 여러 기능을 한 브랜치에 섞지 않는다.
- 완료 후 `develop`으로 병합한다.

예시:

- `feature/home-hero`
- `feature/publications-page`
- `feature/member-card-motion`

### `release/*`

- 배포 직전 안정화 작업을 위한 브랜치다.
- 문구 수정, 버전 조정, 경미한 버그 수정만 허용한다.
- 기능 추가는 금지한다.

예시:

- `release/0.1.0`
- `release/2026-03-launch`

### `hotfix/*`

- 운영 중인 문제를 빠르게 수정할 때 사용한다.
- `main`에서 분기해 `main`과 `develop` 양쪽에 반영한다.

예시:

- `hotfix/fix-contact-form`
- `hotfix/seo-metadata`

## 작업 시작 규칙

새 작업은 항상 브랜치를 분리해서 시작한다.
현재 브랜치에서 바로 수정하지 않는다.

권장 순서:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/page-members
```

운영 긴급 수정이라면:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/fix-navigation-link
```

## `git checkout` 사용 규칙

작업 분리를 위해 브랜치 전환을 명확히 사용한다.

- 새로운 작업을 시작할 때는 반드시 새 브랜치로 `checkout` 한다.
- 리뷰 중인 작업과 새 작업을 같은 브랜치에서 이어서 하지 않는다.
- 컨텍스트가 다른 작업은 브랜치도 분리한다.
- 브랜치를 옮기기 전 `git status`로 변경사항을 확인한다.
- 커밋하지 않은 변경이 있으면 먼저 커밋하거나 stash 한 뒤 `checkout` 한다.

기본 점검 명령:

```bash
git status
git branch --show-current
git log --oneline --decorate -5
```

브랜치 전환 예시:

```bash
git checkout feature/home-hero
git checkout develop
git checkout -b feature/about-page
```

## 작업 분리 원칙

- 한 브랜치에는 한 목적만 담는다.
- 구조 변경과 UI 변경은 가능하면 분리한다.
- 리팩터링과 기능 추가는 같은 커밋에 섞지 않는다.
- 패키지 설치와 기능 구현은 상황에 따라 커밋을 나눈다.
- 문서 변경은 기능 변경과 함께 갈 수 있지만, 대규모 문서 작업은 별도 브랜치가 더 낫다.

좋은 분리 예시:

- `feature/site-header`
- `feature/home-motion`
- `feature/publications-data-shape`

나쁜 분리 예시:

- 헤더 리디자인, 멤버 페이지 추가, eslint 규칙 수정이 한 브랜치에 함께 있는 경우

## 커밋 기본 원칙

- 커밋은 작은 단위로 자주 만든다.
- 각 커밋은 하나의 의도를 설명할 수 있어야 한다.
- 빌드 불가 상태, lint 실패 상태로 커밋하지 않는다.
- 정리용 대규모 커밋 하나보다 의미 있는 여러 커밋을 선호한다.
- 리뷰어가 `git show`만 봐도 왜 바뀌었는지 이해할 수 있어야 한다.

## 커밋 메시지 규칙

형식은 아래를 기본으로 한다.

```text
type(scope): subject
```

예시:

```text
feat(home): add hero section layout
fix(header): correct mobile navigation overlap
docs(git): define git flow collaboration rules
refactor(publications): extract publication card component
style(button): normalize spacing tokens
chore(deps): install framer motion
```

### `type` 규칙

- `feat`: 사용자 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `refactor`: 동작 변화 없는 구조 개선
- `style`: 시각 표현 또는 포맷 조정
- `test`: 테스트 추가 또는 수정
- `chore`: 설정, 의존성, 빌드, 운영 작업
- `perf`: 성능 개선
- `build`: 빌드 파이프라인 변경
- `ci`: CI/CD 변경

### `scope` 규칙

- 페이지, 기능, 공용 모듈 단위로 작성한다.
- 너무 넓은 `project`, `misc` 같은 표현은 피한다.
- 가능한 실제 변경 위치와 도메인이 드러나게 쓴다.

좋은 예시:

- `feat(members): add faculty profile grid`
- `fix(contact): prevent empty form submission`
- `chore(deps): pin next version`

피해야 할 예시:

- `fix: stuff`
- `update files`
- `feat(project): many changes`

### `subject` 규칙

- 명령문 현재형으로 짧게 작성한다.
- 마침표를 붙이지 않는다.
- 무엇을 바꿨는지 직접 드러내고, 너무 추상적인 표현은 피한다.

좋은 예시:

- `feat(home): add animated research highlight cards`
- `fix(layout): prevent footer overlap on short pages`

## 커밋 본문 규칙

필요할 때는 본문을 추가한다.
특히 선택 이유, 제약, 마이그레이션 영향이 있으면 남긴다.

형식:

```text
type(scope): subject

Why:
- 변경 이유

What:
- 핵심 변경 내용

Notes:
- 리뷰 또는 배포 시 주의점
```

예시:

```text
feat(home): add animated research highlight cards

Why:
- 첫 화면에서 연구 분야를 더 빠르게 이해할 수 있게 하기 위해

What:
- 카드 기반 하이라이트 섹션 추가
- framer motion 기반 stagger preset 연결

Notes:
- reduced motion 대응은 다음 커밋에서 추가 예정
```

## 커밋 크기 기준

- 1 커밋 1 의도 원칙을 지킨다.
- 파일 수가 많아도 목적이 하나면 괜찮다.
- 목적이 2개 이상이면 커밋을 쪼갠다.
- 자동 포맷팅만 포함된 변경은 별도 커밋으로 분리하는 편이 좋다.

## 스테이징 규칙

- `git add .`를 습관적으로 사용하지 않는다.
- 변경 파일을 확인한 뒤 의도한 파일만 스테이징한다.
- 부분 스테이징이 필요하면 `git add -p`를 사용한다.

권장 명령:

```bash
git status
git add src/app/page.tsx
git add src/components/sections/hero.tsx
git commit -m "feat(home): add hero section skeleton"
```

## 병합 규칙

- `feature/*`는 리뷰 후 `develop`으로 병합한다.
- `release/*`는 `develop`에서 분기하고, 배포 후 `main`과 `develop`에 반영한다.
- `hotfix/*`는 `main`에서 분기하고, 완료 후 `main`과 `develop` 둘 다 병합한다.
- 큰 충돌이 예상되면 먼저 `develop`을 feature 브랜치에 가져와 로컬에서 해결한다.

## Pull Request 규칙

- PR 하나는 하나의 목적만 설명해야 한다.
- 제목은 커밋 메시지 스타일과 비슷하게 간결하게 쓴다.
- 설명에는 배경, 변경 범위, 확인 방법, 남은 이슈를 적는다.
- UI 변경이 있으면 스크린샷 또는 짧은 설명을 포함한다.

권장 PR 템플릿:

```text
## Summary
- 무엇을 바꿨는지

## Why
- 왜 필요한지

## Test
- npm run lint
- 수동 확인 내용

## Notes
- 후속 작업 또는 주의점
```

## Release 흐름

일반 기능 배포는 아래 순서를 따른다.

1. `develop`에서 `release/*` 브랜치를 만든다.
2. 릴리스 브랜치에서 최종 점검과 수정만 진행한다.
3. 검증이 끝나면 `main`에 병합하고 태그를 만든다.
4. 같은 변경을 `develop`에도 반영한다.

예시:

```bash
git checkout develop
git pull origin develop
git checkout -b release/0.1.0
```

배포 완료 후:

```bash
git checkout main
git merge --no-ff release/0.1.0
git tag v0.1.0
git checkout develop
git merge --no-ff release/0.1.0
```

## Hotfix 흐름

운영 장애나 치명적 버그는 아래 순서를 따른다.

1. `main`에서 `hotfix/*` 브랜치를 만든다.
2. 필요한 최소 수정만 반영한다.
3. `main`에 먼저 병합해 배포한다.
4. 같은 수정 내용을 `develop`에도 반영한다.

## 금지 규칙

- `main`에 직접 커밋하지 않는다.
- 여러 목적의 작업을 한 브랜치에 섞지 않는다.
- 의미 없는 커밋 메시지를 쓰지 않는다.
- 리뷰 전 대규모 force push를 반복하지 않는다.
- 다른 사람이 작업 중인 브랜치를 임의로 재작성하지 않는다.

## Agent 작업 체크리스트

- 지금 작업이 새 브랜치를 만들 만큼 독립적인가
- 현재 브랜치가 맞는가
- 커밋 하나가 하나의 의도를 설명하는가
- 패키지 변경과 기능 변경을 분리할 필요가 있는가
- PR 설명만 읽어도 리뷰어가 맥락을 이해할 수 있는가

## 권장 명령 요약

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-task-name
git status
git add -p
git commit -m "feat(scope): concise subject"
git push -u origin feature/your-task-name
```

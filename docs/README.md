# Documentation

이 디렉토리는 `inslab-website` 프로젝트를 위한 작업 기준 문서를 모아두는 곳이다.
Agent 팀과 사람이 같은 기준으로 설계, 구현, 리뷰할 수 있도록 최소한의 공통 규칙부터 먼저 정의한다.

## 문서 목록

- `project-structure.md`: Next.js App Router 기준 디렉토리 구조와 파일 배치 원칙
- `code-style.md`: TypeScript, React, Next.js, Tailwind CSS 작성 규칙
  - 모션 구현은 `Framer Motion` 기준으로 관리한다.
- `git-workflow.md`: Git Flow 기반 브랜치 전략, 커밋 규칙, checkout 기반 작업 분리 규칙
- `stitch-design-to-code.md`: Stitch MCP 화면을 현재 레포 구조와 컴포넌트 규칙에 맞게 옮기는 기준

## 레포 운영 파일

- `.github/PULL_REQUEST_TEMPLATE.md`: PR 작성 템플릿
- `.gitmessage.txt`: 커밋 메시지 템플릿
- `CONTRIBUTING.md`: 기여 및 협업 시작 가이드

## 문서 사용 원칙

- 새 디렉토리나 공용 패턴을 추가하기 전에 먼저 이 문서를 확인한다.
- 현재 프로젝트에 없는 폴더도 향후 확장을 고려해 규칙으로 정의할 수 있다.
- 구조를 바꾸는 PR은 문서도 함께 업데이트한다.

## 기준 문서

- Next.js App Router Project Structure
  - https://nextjs.org/docs/app/getting-started/project-structure

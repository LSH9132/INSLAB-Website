# Contributing

이 프로젝트는 Agent 팀과 사람이 함께 작업하는 연구실 웹사이트 프로젝트다.
작업을 시작하기 전에 아래 문서를 먼저 확인한다.

## Read First

- [docs/README.md](docs/README.md)
- [docs/project-structure.md](docs/project-structure.md)
- [docs/code-style.md](docs/code-style.md)
- [docs/git-workflow.md](docs/git-workflow.md)

## Workflow

기본 협업 전략은 `git flow`다.

- 기능 작업은 `develop`에서 `feature/*` 브랜치로 분기한다.
- 배포 준비는 `release/*` 브랜치에서 진행한다.
- 긴급 수정은 `main`에서 `hotfix/*` 브랜치로 분기한다.

작업 시작 예시:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-task-name
```

## Commit Rules

커밋 메시지는 아래 형식을 따른다.

```text
type(scope): subject
```

예시:

```text
feat(home): add research hero section
fix(layout): prevent footer overlap
docs(git): add pull request template
```

커밋 템플릿을 쓰려면 로컬에서 한 번 설정한다.

```bash
git config commit.template .gitmessage.txt
```

## Pull Requests

- PR 하나에는 하나의 목적만 담는다.
- UI 변경이 있으면 스크린샷이나 설명을 포함한다.
- 구조나 규칙이 바뀌면 관련 문서를 함께 수정한다.
- PR 생성 시 `.github/PULL_REQUEST_TEMPLATE.md`를 따른다.

## Before Requesting Review

- `npm run lint`를 실행한다.
- 변경 범위에 맞는 수동 확인을 마친다.
- 불필요한 파일과 임시 코드를 제거한다.
- 커밋 메시지와 브랜치 이름이 규칙에 맞는지 확인한다.

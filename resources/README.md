# Resources

이 디렉토리는 디자인 원본과 시안 기반 작업 파일을 보관하는 곳이다.
여기에 둔 파일은 보관용 기준본으로 취급하고, 실제 구현에 사용할 때는 필요한 파일만 복사해서 사용한다.
서비스에 직접 배포되는 파일은 여기에 두지 않는다.

## 권장 구조

```text
resources/
├── design/
│   ├── psd/
│   ├── png/
│   ├── svg/
│   └── reference/
└── copy/
```

## 규칙

- `design/psd`: Photoshop 원본 파일
- `design/png`: 시안 이미지, 화면 캡처, 중간 export PNG
- `design/svg`: 로고 원본, 벡터 리소스, 다이어그램
- `design/reference`: 비교용 레퍼런스 이미지, PDF, 외부 공유 자료
- `copy`: 페이지 문구 초안, 콘텐츠 원고, 텍스트 기반 자료
- `resources` 안의 파일은 원본 보관용으로 유지한다.
- 앱에서 실제로 쓸 때는 `public/` 또는 필요한 작업 디렉토리로 복사해서 사용한다.

## 네이밍 규칙

파일명은 아래 순서를 기본으로 한다.

```text
{category}-{subject}-{variant?}-{theme?}-v{number}.{ext}
```

예시:

- `logo-inslab-primary-light-v1.svg`
- `logo-inslab-symbol-dark-v2.png`
- `bg-home-hero-light-v1.png`
- `page-publications-list-desktop-v3.png`
- `page-members-overview-mobile-v1.psd`
- `ref-publications-stitch-desktop-v1.png`

### 필드 의미

- `category`: 자산 종류
  - `logo`
  - `bg`
  - `page`
  - `icon`
  - `ref`
  - `diagram`
- `subject`: 화면명, 섹션명, 브랜드명 등 핵심 대상
  - `inslab`
  - `home`
  - `publications`
  - `members`
- `variant`: 자산 변형
  - `primary`
  - `secondary`
  - `symbol`
  - `wordmark`
  - `hero`
  - `overview`
  - `list`
- `theme`: 필요한 경우 배경/표현 구분
  - `light`
  - `dark`
  - `transparent`
  - `desktop`
  - `mobile`

### 세부 규칙

- 전부 소문자 `kebab-case`를 사용한다.
- 공백, 한글, 특수문자, 날짜 문자열 남발은 피한다.
- `final`, `real-final`, `last` 같은 모호한 이름은 금지한다.
- 버전이 바뀌면 파일명을 덮어쓰기보다 `v2`, `v3`처럼 올린다.
- 로고는 `primary`, `secondary`, `symbol`, `wordmark` 같은 변형명을 꼭 붙인다.
- 배경은 사용 위치가 드러나게 `bg-home-hero-*`, `bg-publications-hero-*`처럼 작성한다.
- 페이지 시안은 `page-{route}-{section?}-{device}-v{n}` 형식을 권장한다.
- 레퍼런스 이미지는 `ref-` 접두사로 시작해 작업 원본과 구분한다.

## 주의

- 실제 런타임에서 사용하는 이미지는 `resources`에서 바로 참조하지 않고 `public/`로 복사해 사용한다.
- Stitch처럼 일회성 다운로드 산출물은 `.stitch/`에 두고 Git 추적하지 않는다.
- 파일명만 보고도 로고인지, 배경인지, 페이지 시안인지 구분 가능해야 한다.

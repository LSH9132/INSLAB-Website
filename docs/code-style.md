# Code Style

이 문서는 `inslab-website`에서 사용하는 코드 스타일 기준을 정의한다.
목표는 코드 일관성, 리뷰 속도, Agent 협업 효율을 높이는 것이다.

## 기본 원칙

- TypeScript를 기본 언어로 사용한다.
- 가능한 한 Server Component를 우선한다.
- 클라이언트 상호작용이 필요할 때만 `"use client"`를 선언한다.
- 모션 구현은 `Framer Motion`으로 통일한다.
- 구현보다 의미가 먼저 드러나는 이름을 사용한다.
- 짧아도 모호한 코드보다 조금 길어도 읽기 쉬운 코드를 선택한다.

## TypeScript 규칙

- `any`는 금지한다. 정말 필요한 경우 `unknown`으로 시작한다.
- 타입 추론이 충분하면 불필요한 타입 주석은 줄인다.
- 함수 반환 타입은 공개 유틸, 복잡한 계산, 서버 경계에서 명시한다.
- 도메인 모델은 `type` 또는 `interface`를 일관되게 선택해 한 파일 안에서 섞지 않는다.
- nullable 값은 이름과 분기 처리에서 명확하게 드러낸다.

예시:

```ts
type Publication = {
  id: string;
  title: string;
  publishedAt: string;
  authors: string[];
};
```

## React 규칙

- 컴포넌트는 PascalCase로 export 한다.
- 파일 하나에는 기본적으로 하나의 주요 컴포넌트만 둔다.
- Props가 3개 이상이면 인라인 타입 대신 별도 타입 선언을 우선한다.
- JSX가 길어지면 섹션 단위로 분리한다.
- effect는 정말 필요한 경우에만 사용한다.
- 파생 가능한 값은 state로 중복 저장하지 않는다.
- `Framer Motion`을 쓰는 컴포넌트만 `"use client"`를 선언한다.

## Next.js 규칙

- 페이지 컴포넌트는 얇게 유지한다.
- 데이터 로딩은 가능한 서버에서 처리한다.
- 메타데이터는 각 라우트에 맞춰 `metadata` 또는 `generateMetadata`로 관리한다.
- 이미지에는 `next/image`를 우선 사용한다.
- 내부 이동에는 `next/link`를 사용한다.

## Tailwind CSS 규칙

- 유틸리티 클래스는 레이아웃 -> 박스 모델 -> 타이포그래피 -> 상태 순으로 정렬한다.
- 같은 클래스 조합이 3번 이상 반복되면 컴포넌트 또는 스타일 상수로 추출을 검토한다.
- 매직 넘버 색상은 최소화하고, 반복되는 값은 CSS 변수 또는 테마 토큰으로 승격한다.
- 한 요소의 클래스가 지나치게 길어지면 컴포넌트 분리를 먼저 검토한다.

## Motion 규칙

- 애니메이션 라이브러리는 `Framer Motion`으로 통일한다.
- React 구현 시 최신 문서 기준의 `motion/react` 사용 방식을 우선 참고한다.
- 반복되는 등장 애니메이션은 공용 preset으로 추출한다.
- 과한 패럴랙스나 지속 애니메이션보다 정보 흐름을 돕는 전환을 우선한다.
- 초기 진입 모션은 짧고 분명하게 유지한다.
- 스크롤 기반 애니메이션은 콘텐츠 가독성을 해치지 않는 범위에서만 사용한다.
- `prefers-reduced-motion`을 고려한 안전한 기본값을 유지한다.

## Motion x Tailwind 규칙

- 역할을 분리한다.
  - Tailwind는 정적 스타일과 반응형 레이아웃을 담당한다.
  - Motion은 `animate`, `initial`, `exit`, `whileHover`, `whileTap`, `layout` 같은 애니메이션 상태를 담당한다.
- 같은 요소에 Motion 애니메이션과 Tailwind `transition-*` 유틸을 함께 과도하게 섞지 않는다.
- 특히 Motion으로 위치, 크기, transform을 제어하는 요소에는 `transition-all`, `transition-transform` 같은 클래스 사용을 피한다.
- 애니메이션이 버벅이거나 예상과 다르게 움직이면 먼저 Tailwind transition 클래스 충돌을 의심한다.
- 반응형 모션 값이 필요하면 Tailwind의 CSS 변수 문법을 사용하고, Motion이 그 변수를 읽어 애니메이션하도록 작성한다.
- 반복적으로 쓰는 진입 거리, delay, easing 값은 CSS 변수 또는 공용 preset으로 올린다.
- 간단한 hover 전환처럼 CSS만으로 충분한 경우는 Tailwind transition을 써도 된다.
- 레이아웃 변형, mount/unmount, scroll reveal처럼 상태 기반 제어가 필요한 경우는 Motion을 사용한다.

권장 패턴:

- Tailwind 클래스는 색상, 간격, 타이포그래피, 반응형 브레이크포인트를 담당
- Motion props는 opacity, x, y, scale, layout 상태를 담당
- 반응형 진입 애니메이션은 `md:[--entry-distance-y:48px]` 같은 CSS 변수로 제어

주의 패턴:

- 같은 요소에 `whileHover={{ scale: 1.05 }}` 와 `hover:scale-105`를 동시에 사용
- Motion `animate={{ x: 100 }}` 와 Tailwind `transition-transform`를 함께 사용
- Motion이 제어하는 요소에 `transition-all`을 기본 습관처럼 붙이는 것

예시:

```tsx
<motion.div
  className="
    rounded-2xl bg-slate-900 px-6 py-8 text-white
    [--entry-distance-y:20px]
    md:[--entry-distance-y:40px]
  "
  initial={{ opacity: 0, y: "var(--entry-distance-y)" }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
>
  ...
</motion.div>
```

권장 예시:

- 페이드 인 + 약한 y축 이동
- 카드 리스트의 짧은 stagger
- 섹션 전환 시 opacity 중심 전환

지양 예시:

- 긴 bounce 애니메이션
- 본문 가독성을 해치는 과도한 스케일 변화
- 페이지 전체에 상시 반복되는 장식 모션

예시:

```tsx
<section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
  <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
    Research Areas
  </h2>
</section>
```

## 스타일링 원칙

- 기본 폰트와 색상은 `src/app/globals.css` 또는 추후 도입할 전역 토큰 파일에서 관리한다.
- 컴포넌트 내부에 인라인 스타일은 지양한다.
- 다크 모드는 실제 요구가 생기기 전까지 기본 전제로 두지 않는다.
- 연구실 사이트 특성상 정보 전달성과 가독성을 브랜드 연출보다 우선한다.
- 반응형 애니메이션 값이 필요할 때는 인라인 style 객체보다 Tailwind CSS 변수 문법을 우선 검토한다.

## 파일 작성 규칙

- import 순서는 외부 패키지 -> 내부 절대 경로 -> 상대 경로 순으로 둔다.
- 사용하지 않는 import, 변수, props는 즉시 제거한다.
- 기본 export는 Next.js 규약 파일을 제외하면 최소화한다.
- 공용 유틸은 부수효과 없는 순수 함수 형태를 우선한다.
- 공용 motion preset은 `src/lib/motion`에 모은다.

## 네이밍 규칙

- 변수명은 역할이 드러나게 작성한다.
- boolean은 `is`, `has`, `can`, `should` 접두사를 사용한다.
- 이벤트 핸들러는 `handle*` 패턴을 사용한다.
- 포맷 함수는 `format*`, 변환 함수는 `map*` 또는 `to*` 패턴을 사용한다.

예시:

- `isLoading`
- `hasPublications`
- `handleSubmit`
- `formatMemberName`
- `fadeUpVariants`
- `staggerContainerVariants`

## 주석 규칙

- 코드만으로 의도가 드러나면 주석을 쓰지 않는다.
- 정책, 예외 처리, 성능상 이유처럼 맥락이 필요한 경우에만 짧게 작성한다.
- TODO는 실행 조건이 분명할 때만 남긴다.

## 접근성 규칙

- 버튼은 버튼으로, 링크는 링크로 작성한다.
- `alt` 텍스트는 장식용 이미지가 아니라면 의미 있게 작성한다.
- heading 레벨은 페이지 구조에 맞게 순서대로 사용한다.
- 색상만으로 정보를 구분하지 않는다.

## Agent 리뷰 체크리스트

- 이 컴포넌트가 Server Component여도 되는가
- 파일 위치가 구조 문서와 맞는가
- 타입이 충분히 명확한가
- 재사용이 필요한 UI를 페이지 파일에 묻어두지 않았는가
- Tailwind 클래스가 과도하게 길어지지 않았는가
- 반복 가능한 모션이 컴포넌트 내부에 하드코딩되지 않았는가
- `Framer Motion` 사용 범위가 필요한 클라이언트 컴포넌트로 제한되어 있는가
- Motion이 제어하는 요소에 불필요한 `transition-*` Tailwind 클래스가 섞여 있지 않은가
- 반응형 모션 값이 필요할 때 CSS 변수 패턴으로 일관되게 처리했는가
- 접근성 기본 규칙을 위반하지 않았는가

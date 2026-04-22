# IGT Design System — Claude Code 지침

이 프로젝트는 **IGT 백오피스 전용 React 컴포넌트 라이브러리**입니다.

> 이 프로젝트에서 AI의 역할은 **IGT 디자인시스템을 올바르게 사용해 화면을 구현하는 것**이다.
> 컴포넌트 구축 규칙은 `/Users/sikisiki/Documents/igt-ai-studio_v2/` 워크스페이스를 참조.

---

## 화면 구현 시 참조 순서

> 백오피스 화면을 구현할 때 아래 순서로 반드시 확인한다.

| 순서 | 문서 | 확인 내용 |
|------|------|---------|
| 1 | `ai-guide/component-catalog.md` | 사용 가능한 컴포넌트, 정확한 props 이름, 사용 예시 |
| 2 | `ai-guide/patterns/` | 해당 UI 패턴 문서 (filter-box, listing 등) |
| 3 | `ai-guide/usage-patterns.md` | 컴포넌트 조합 패턴 |

---

## ai-guide 업데이트 규칙

> 컴포넌트가 추가되거나 변경되면 **아래 두 문서를 반드시 세트로 업데이트**한다.

| 순서 | 문서 | 내용 |
|------|------|------|
| 1 | `ai-guide/component-catalog.md` | 컴포넌트 항목 추가 (props, 사용 예시) |
| 2 | `ai-guide/usage-patterns.md` | 해당 컴포넌트가 포함되는 조합 패턴 추가 |

catalog만 업데이트하고 patterns를 빠뜨리는 것은 미완료로 간주.

---

## ai-guide 전체 검토 절차 (필수)

> "가이드 업데이트" 요청이 오면 아래 순서를 반드시 따른다.
> **문서 기준이 아닌 폴더 기준으로 시작한다** — 이 순서를 지키지 않으면 신규 컴포넌트를 놓친다.

### Step 1 — 실제 폴더 목록 확인
```bash
ls /Users/sikisiki/Documents/IGTdesignsystem/src/components/
```

### Step 2 — 문서에 없는 컴포넌트 추출
`component-catalog.md`에 등재된 컴포넌트 목록과 폴더 목록을 대조.
**폴더에 있지만 문서에 없는 것** → 신규 추가 대상

### Step 3 — 기존 문서 교차 검증
문서에 있는 컴포넌트들의 props를 실제 `.tsx` 소스와 대조.
존재하지 않는 props, 누락된 props, 잘못된 타입/기본값 수정.

### Step 4 — patterns/ 폴더 확인
`filter-box.md`, `listing-page.md` 등 패턴 문서에서
"미구현" 표시된 항목이 실제로 구현되었는지 확인 후 반영.

> ⚠️ Step 1~2를 건너뛰고 문서 기준으로만 검토하면 신규 컴포넌트를 반드시 놓친다.

---

## 컴포넌트 사용 규칙

- 이미 구현된 컴포넌트가 있으면 반드시 재사용
- 임의의 새 CSS 클래스나 인라인 스타일 생성 금지
- 컴포넌트 외부에서 `igt-*` 내부 클래스 직접 사용 금지
- 아이콘은 `component-catalog.md`의 Icon 전체 목록에서만 선택 (목록 외 이름 사용 불가)

---

## 작업 디렉토리 구조

```
IGTdesignsystem/
├── src/
│   ├── components/        ← 컴포넌트 구현
│   ├── styles/
│   │   └── globals.css    ← 유일한 토큰 소스 (수정 시 신중하게)
│   └── index.ts           ← 공개 API export
├── docs/                  ← 컴포넌트 스펙 문서
├── ai-guide/              ← AI 바이브 코딩 지침서
│   ├── component-catalog.md
│   ├── usage-patterns.md
│   └── anti-patterns.md
└── showcase/              ← 개발용 데모 앱
```

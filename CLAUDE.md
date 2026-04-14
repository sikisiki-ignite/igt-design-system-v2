# IGT Design System — Claude Code 지침

이 프로젝트는 **IGT 백오피스 전용 React 컴포넌트 라이브러리**입니다.

> **컨텍스트 구분**
> - **컴포넌트 구축** (Figma → 코드 구현): 아래 구축 규칙 섹션 참조
> - **컴포넌트 사용** (백오피스 화면 개발): `ai-guide/component-catalog.md` 먼저 확인
> - **구현 계획/로드맵**: `/Users/sikisiki/Documents/igt-ai-studio_v2/PLAN.md` 참조

---

## 구축 규칙

@.claude/build-rules.md

---

## 컴포넌트 사용 규칙

- UI 구현 시 `ai-guide/component-catalog.md`를 먼저 확인
- 이미 구현된 컴포넌트가 있으면 반드시 재사용
- 임의의 새 CSS 클래스나 인라인 스타일 생성 금지
- 컴포넌트 외부에서 `igt-*` 내부 클래스 직접 사용 금지

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

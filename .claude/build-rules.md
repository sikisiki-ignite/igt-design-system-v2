# IGT Design System — 컴포넌트 구축 규칙

> 이 파일은 `IGTdesignsystem/CLAUDE.md`와 `igt-ai-studio_v2/CLAUDE.md` 양쪽에서 import됩니다.
> 구축 규칙 변경 시 이 파일만 수정하면 됩니다.

---

## Figma 우선

- 컴포넌트 구현 전 반드시 Figma에서 스펙을 확인한다
- Figma fileKey: `pTCGG9i5xgx1HiVQ6EFJRt`
- 디자인 의도가 불명확할 때는 임의 해석 금지 — 사용자에게 확인

## 토큰 시스템 준수

- 색상, 간격, 타이포그래피는 반드시 CSS 변수 사용
- `src/styles/globals.css`가 유일한 토큰 소스
- 임의의 hex 값, px 하드코딩 금지
- 토큰 계층: `--ref-*` → `--sys-*` → `--[comp]-*`
- 컴포넌트 CSS에서 직접 `--ref-*` 또는 hex 사용 금지
- 컴포넌트 토큰이 없으면 `--sys-*` 참조 허용
- **예외 — spacing:** `--sys-space-*` 미정의 상태이므로 `--ref-space-*` 직접 참조 허용 (예: `var(--ref-space-8)`). `--sys-space-*` 추가 시 교체할 것
- 네이밍 규칙 상세: `docs/token-convention.md` 참조

## 컴포넌트 구조 규칙

- 각 컴포넌트는 `src/components/[Name]/` 폴더에 위치
- 파일 구성: `[Name].tsx`, `[Name].css`, `index.ts`
- CSS 클래스명은 `igt-` 접두사 사용 (예: `igt-btn`, `igt-input`)
- `data-*` 속성으로 variant/state 제어 (className 조합 최소화)

## 구현 워크플로우

1. Figma에서 `get_design_context`로 스펙 추출
2. `docs/spec-template.md` 기반으로 스펙 문서 작성
3. TSX + CSS 구현
4. `docs/verification-checklist.md` 기준으로 검증
5. `src/index.ts` export 추가
6. `ai-guide/component-catalog.md` 업데이트 — props, 사용 예시 포함
7. `ai-guide/usage-patterns.md` 업데이트 — 6번과 반드시 세트, 생략 불가

> **6 → 7은 세트다.** catalog만 업데이트하고 patterns를 빠뜨리면 미완료.

## 구현 금지 사항

- Figma 확인 없이 컴포넌트 임의 디자인
- globals.css 외부에 토큰 정의
- 구현된 컴포넌트 무시하고 동일 기능을 새로 만드는 것

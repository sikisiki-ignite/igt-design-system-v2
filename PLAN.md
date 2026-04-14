# IGT Design System — AI 지침서 & 스킬 구축 계획

> 작성: 2026-04-13  
> 이 경로의 목적: AI 바이브 코딩 최적화를 위한 지침서 및 스킬 구축  
> 컴포넌트 구축 계획: `/Users/sikisiki/Documents/igt-ai-studio_v2/PLAN.md` 참조

---

## 이 경로에서 하는 일

`igt-ai-studio_v2/` 에서 컴포넌트가 구축되면,  
이 경로에서 **AI가 그 컴포넌트를 올바르게 사용하도록 지침서와 스킬을 만든다.**

```
igt-ai-studio_v2/   →  컴포넌트 완성
        ↓
IGTdesignsystem/    →  지침서 업데이트 + 스킬 구축
        ↓
바이브 코딩 시      →  일관된 백오피스 화면 생성
```

---

## 작업 순서

### Step 1 — component-catalog.md 작성
**상태:** ✅ 완료 (2026-04-14)

컴포넌트가 완성될 때마다 목록에 추가.  
AI가 바이브 코딩 시 "어떤 컴포넌트가 있는지" 파악하는 기준 문서.

```
ai-guide/component-catalog.md
```

포함 내용:
- 컴포넌트 이름
- 언제 쓰는지 (용도)
- 핵심 props 요약
- 간단한 사용 예시

---

### Step 2 — usage-patterns.md 작성
**상태:** ✅ 완료 (2026-04-14)

백오피스에서 자주 쓰는 조합 패턴 정리.  
단순 컴포넌트 나열이 아니라 **"이런 화면은 이렇게 조합해라"** 가이드.

```
ai-guide/usage-patterns.md
```

포함 내용:
- 검색 폼 패턴 (Input + Button + Select)
- 데이터 테이블 패턴 (Table + Pagination + Badge)
- 편집 폼 패턴 (Label + Input + Modal)
- 알림 패턴 (Toast + Alert)

---

### Step 3 — anti-patterns.md 작성
**상태:** ✅ 완료 (2026-04-14)

하면 안 되는 것들 명시.  
AI가 잘못된 방향으로 구현하는 걸 사전에 차단.

```
ai-guide/anti-patterns.md
```

포함 내용:
- 토큰 무시하고 hex 직접 사용
- 구현된 컴포넌트 무시하고 새로 만들기
- igt-* 내부 클래스 외부에서 직접 사용

---

### Step 4 — backoffice-dev 스킬 제작
**상태:** ✅ 완료 (2026-04-14) — `~/.claude/skills/backoffice-dev.md`

ai-guide/ 문서들을 참조하는 스킬 파일 작성.  
바이브 코딩 시 `/backoffice-dev` 호출하면 지침서 기반으로 화면 구성.

```
.claude/skills/backoffice-dev.md
```

---

### Step 5 — 스킬 검증 ← 다음 단계
**상태:** ⬜ 대기

실제 백오피스 화면 1개를 `/backoffice-dev` 스킬로 구현해서 일관성 검증.  
검증 후 지침서 보완.

---

## 현재 컴포넌트 현황

> `igt-ai-studio_v2/` 에서 완성된 컴포넌트 목록. 업데이트 시 여기도 동기화.

| 컴포넌트 | catalog 반영 |
|---------|------------|
| Button | ✅ |
| Input | ✅ |
| Select | ✅ |
| Checkbox | ✅ |
| Radio / RadioGroup | ✅ |
| Badge | ✅ |
| CountBadge / DotBadge | ✅ |
| Table | ✅ |
| Modal | ✅ |
| Toast / ToastContainer | ✅ |
| Tooltip | ✅ |
| Alert | ✅ |
| Avatar | ✅ |
| Switch / SwitchField | ✅ |
| Icon | ✅ |
| Label | ✅ |
| Divider | ✅ |
| Skeleton | ✅ |
| Backdrop | ✅ |

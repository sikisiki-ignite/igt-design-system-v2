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

### Step 1 — component-catalog.md + usage-patterns.md 작성 (세트)
**상태:** ✅ 완료 (2026-04-14, 2026-04-15 업데이트)

> **⚠️ 두 문서는 항상 세트로 업데이트한다.**  
> 컴포넌트가 추가/변경될 때 catalog만 업데이트하고 patterns를 빠뜨리면 안 됨.

#### 업데이트 플로우

```
새 컴포넌트 완성
      ↓
1. ai-guide/component-catalog.md 에 항목 추가
   - 컴포넌트 이름 / 언제 쓰는지 / props 요약 / 사용 예시
      ↓
2. ai-guide/usage-patterns.md 에 조합 패턴 추가
   - 해당 컴포넌트가 실제로 쓰이는 백오피스 맥락
   - 단독 사용법이 아니라 다른 컴포넌트와의 조합 패턴
      ↓
3. PLAN.md 하단 컴포넌트 현황 테이블 업데이트
```

#### catalog에 포함할 내용
- 컴포넌트 이름
- 언제 쓰는지 (용도)
- 핵심 props 요약
- 간단한 사용 예시

#### patterns에 포함할 내용
- 백오피스에서 자주 쓰이는 조합 맥락
- 단순 컴포넌트 나열이 아닌 **"이런 화면은 이렇게 조합한다"** 형태
- 각 패턴마다 **규칙** 섹션 포함 (AI가 잘못 구현하는 케이스 방지)

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

### Step 6 — UI 패턴 문서 보강 (patterns/)
**상태:** 🔄 진행 중 (2026-04-15 시작)

`ai-guide/patterns/` 하위에 화면 단위 패턴 문서를 추가한다.  
component-catalog가 컴포넌트 단위라면, patterns는 **화면/섹션 단위 조합 규칙**이다.

#### 완료된 패턴 문서

| 파일 | 내용 | 상태 |
|-----|-----|-----|
| `filter-box.md` | 백오피스 필터 박스 레이아웃 규칙, 6가지 필터 타입 | ✅ |
| `listing-page.md` | 리스팅 페이지 전체 구조 (헤더→필터→태그행→테이블→페이지네이션) | ✅ |
| `app-layout-lnb.md` | AppLayout + SideNavigation 올바른 조합, Figma 실측치, 금지 패턴 | ✅ |

#### 추가 예정 패턴 문서

| 파일 | 내용 | 상태 |
|-----|-----|-----|
| `detail-page.md` | 상세 페이지 구조 (헤더 + 섹션 + 하단 액션) | ⬜ |
| `form-page.md` | 등록/수정 폼 레이아웃, 유효성 처리 패턴 | ⬜ |
| `modal-form.md` | 모달 내 폼 조합 패턴 | ⬜ |

#### 계기
탁송 관리 화면(showcase/DeliveryManagementPage) 구현 중 발견된 3가지 버그:
- LNB 여백 비대칭 (AppLayout + SideNavigation 조합 오류)
- 필터 영역 임의 구현 (filter-box.md 미참조)
- Pagination props 불일치

버그 상세: `igt-ai-studio_v2/docs/bug-report-delivery-page.md` 참조

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

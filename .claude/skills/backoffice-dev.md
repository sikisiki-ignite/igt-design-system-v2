# IGT 백오피스 개발자

TRIGGER when: 사용자가 "igt 디자인 시스템", "igt 디자인", "디자인시스템", "design system", "igt 컴포넌트", "백오피스 화면 만들어줘", "화면 구현해줘" 같은 표현을 사용할 때. IGT 디자인 시스템을 사용한 UI 구현 요청이면 무조건 이 스킬을 먼저 적용한다.

너는 IGT Design System을 사용해 **백오피스 화면을 구현하는 전문 FE 개발자**야.
디자인 시스템 경로: `/Users/sikisiki/Documents/IGTdesignsystem/`

작업 시작 전 아래 지침 전체를 숙지하고 적용해.
규칙을 어기는 코드는 작성하지 마. 어길 것 같으면 작성 전에 대안을 먼저 제시해.

---

## 핵심 참조 문서

작업 전 반드시 확인:

- **컴포넌트 목록 & 사용법**: `/Users/sikisiki/Documents/IGTdesignsystem/ai-guide/component-catalog.md`
- **디자인 토큰 (색상/폰트/간격)**: `/Users/sikisiki/Documents/IGTdesignsystem/ai-guide/design-tokens.md`
- **조합 패턴**: `/Users/sikisiki/Documents/IGTdesignsystem/ai-guide/usage-patterns.md`
- **하면 안 되는 것**: `/Users/sikisiki/Documents/IGTdesignsystem/ai-guide/anti-patterns.md`

---

## 임포트

```tsx
import {
  Button, Input, Select, Checkbox, Radio, RadioGroup, RadioGroupItem,
  Switch, SwitchField, Badge, CountBadge, DotBadge, Label, Avatar, Icon,
  Divider, Skeleton, SkeletonText, SkeletonRect, SkeletonCircle,
  Modal, Tooltip, Toast, ToastContainer, Backdrop, Alert, Table,
  AppLayout,
  SideNavigation, SideNavigationList, NavItem, NavSectionHeader,
} from '@igt/design-system'
```

---

## 절대 금지 사항

### 1. 하드코딩 색상

```tsx
// ❌
style={{ color: '#191f28' }}
style={{ background: 'rgba(0,0,0,0.5)' }}
style={{ borderColor: '#e5e8eb' }}

// ✅
style={{ color: 'var(--sys-content-neutral-strong)' }}
style={{ background: 'var(--sys-surface-subtle)' }}
style={{ borderColor: 'var(--sys-border-neutral-default)' }}
```

### 2. 하드코딩 폰트/간격/반경

```tsx
// ❌
style={{ fontSize: '14px', fontWeight: 600, borderRadius: '8px', padding: '16px' }}

// ✅
style={{
  fontSize: 'var(--ref-font-size-14)',
  fontWeight: 'var(--ref-font-weight-600)',
  borderRadius: 'var(--radius-md)',
  padding: '16px',  // 간격은 수치값 허용 (토큰 없는 레이아웃 속성)
}}
```

> **간격 허용 기준**: `display`, `flex`, `gap`, `padding`, `margin` 등 레이아웃 속성은 `8px`, `16px` 등 수치 직접 허용.
> 단, `design-tokens.md`의 간격 스케일(4, 8, 12, 16, 20, 24, 32, 40, 48px)에서만 사용.

### 3. 구현된 컴포넌트 무시하고 직접 만들기

```tsx
// ❌ — 항상 컴포넌트 사용
<button style={{ background: '#3182f6' }}>저장</button>
<span style={{ background: '#dcfce7' }}>활성</span>

// ✅
<Button>저장</Button>
<Badge variant="success">활성</Badge>
```

### 4. igt-* 내부 클래스 외부 사용

```tsx
// ❌
<div className="igt-btn igt-badge--success">

// ✅ — 컴포넌트로만 접근
<Button /> <Badge />
```

---

## 레이아웃 정책 (PC 전용)

- 최소 지원 너비: **1280px** (모바일/태블릿 대응 불필요)
- 사이드바 너비: 220px ~ 280px

### 스크롤 구조

```tsx
// ✅ 기본 페이지 템플릿
<div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
  {/* 사이드바 */}
  <nav style={{ width: 240, flexShrink: 0, overflow: 'auto' }}>...</nav>

  {/* 메인 영역 */}
  <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
    <header style={{ flexShrink: 0 }}>...</header>
    {/* 스크롤 영역 — 반드시 단 하나 */}
    <div style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: '24px' }}>
      {/* 페이지 콘텐츠 */}
    </div>
  </main>
</div>
```

---

## 자주 쓰는 패턴 요약

### 검색 필터 바
```tsx
<div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
  <Input prefix={<Icon name="search" size="sm" />} placeholder="검색" style={{ width: 240 }} />
  <Select options={options} placeholder="상태 전체" style={{ width: 140 }} />
  <Button tone="secondary" variant="outline">초기화</Button>
  <Button>검색</Button>
</div>
```

### 데이터 테이블
```tsx
<Table
  columns={columns}  // render로 Badge, Avatar 조합
  data={data}
  rowKey="id"
  loading={isLoading}
  striped
  onSort={handleSort}
  emptyText="데이터가 없습니다."
/>
```

### 편집 폼
```tsx
<form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Input label="이름" error={errors.name} fullWidth />
  <Select label="역할" options={roleOptions} error={errors.role} fullWidth />
  <Divider />
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
    <Button tone="secondary" variant="outline">취소</Button>
    <Button type="submit" loading={isSubmitting}>저장</Button>
  </div>
</form>
```

### 삭제 확인 모달
```tsx
<Modal
  open={open} onClose={onClose} title="삭제 확인" size="sm"
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button tone="secondary" variant="outline" onClick={onClose}>취소</Button>
      <Button tone="danger" loading={isDeleting} onClick={handleDelete}>삭제</Button>
    </div>
  }
>
  <p>정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
</Modal>
```

### 테이블 행 액션 버튼
```tsx
// 항상 ghost + iconOnly + Tooltip 조합
<Tooltip content="수정">
  <Button tone="secondary" variant="ghost" size="sm" iconOnly leadingIcon={<Icon name="edit" size="sm" />} onClick={...} />
</Tooltip>
<Tooltip content="삭제">
  <Button tone="danger" variant="ghost" size="sm" iconOnly leadingIcon={<Icon name="trash" size="sm" />} onClick={...} />
</Tooltip>
```

---

## 컴포넌트 선택 기준

| 상황 | 컴포넌트 |
|------|---------|
| 사용자 액션 버튼 | `Button` |
| 텍스트 입력 | `Input` |
| 옵션 단일 선택 (드롭다운) | `Select` |
| 옵션 단일 선택 (나열) | `RadioGroup` + `RadioGroupItem` |
| 복수 선택 | `Checkbox` |
| 즉시 적용 토글 | `Switch` |
| 상태/카테고리 텍스트 칩 | `Badge` |
| 숫자 카운트 | `CountBadge` |
| 상태 점 | `DotBadge` |
| 색상 강조 태그 | `Label` |
| 프로필 이미지 | `Avatar` |
| 아이콘 | `Icon` |
| 구분선 | `Divider` |
| 로딩 자리 표시 | `SkeletonText` / `SkeletonRect` / `SkeletonCircle` |
| 대화상자 | `Modal` |
| hover 설명 | `Tooltip` |
| 일시적 액션 피드백 | `Toast` + `ToastContainer` |
| 페이지 고정 안내 | `Alert` |
| 배경 어둡게 | `Backdrop` (Modal이 자동 처리) |
| 정형 데이터 목록 | `Table` |
| 전체 페이지 레이아웃 | `AppLayout` |
| 좌측 네비게이션 바 (LNB) | `SideNavigation` + `SideNavigationList` + `NavItem` |
| LNB 섹션 구분 레이블 | `NavSectionHeader` |

---

## LNB 패턴

```tsx
// AppLayout sideNav 슬롯에 배치
<SideNavigation tone="accent" style={{ flex: 1 }}>
  <SideNavigationList>
    <NavSectionHeader>관리</NavSectionHeader>
    <NavItem
      as="button"
      tone="accent"
      current           // 현재 페이지
      leadingIcon={<Icon name="person" size="sm" />}
      onClick={() => navigate('/users')}
    >
      사용자 관리
    </NavItem>
    <NavItem
      as="button"
      tone="accent"
      leadingIcon={<Icon name="setting" size="sm" />}
      onClick={() => navigate('/settings')}
    >
      설정
    </NavItem>
  </SideNavigationList>
</SideNavigation>
```

- `tone="accent"` → 현재 메뉴를 brand 색으로 강조 (기본값 neutral은 grey)
- `current` → 현재 활성 라우트에만 적용
- `depth={2}` → 하위 메뉴 들여쓰기

---

## 버튼 조합 규칙

- **취소는 왼쪽, 주요 액션은 오른쪽**
- **버튼 그룹은 우측 정렬** (`justifyContent: 'flex-end'`)
- 삭제/위험 액션 → `tone="danger"`
- 보조 액션 → `tone="secondary" variant="outline"`
- 기본 확인/저장 → `tone="primary"` (기본값)

---

## 상태 표시 규칙

- 상태는 항상 `Badge`로 표시 (텍스트 직접 출력 금지)
- 상태별 variant 매핑:

| 상태 | variant |
|------|---------|
| 활성/완료/승인 | `success` |
| 비활성/취소/반려 | `danger` |
| 대기/보류 | `warning` |
| 임시/초안 | `neutral` |
| 진행중/처리중 | `info` |

---

## 코드 작성 전 자가 점검

생성하려는 코드에 아래 항목이 있으면 **즉시 토큰/컴포넌트로 대체**:

- [ ] hex 색상 직접 사용 (`#`, `rgb`, `rgba`)
- [ ] `font-size`, `font-weight` 수치 직접 사용
- [ ] `<button>`, `<input>`, `<select>`, `<textarea>` HTML 요소 직접 사용
- [ ] 에러 텍스트를 컴포넌트 밖에 별도로 추가
- [ ] 로딩/빈 상태를 직접 구현 (Table, Button의 내장 기능 무시)
- [ ] `igt-*` 클래스 외부에서 직접 사용
- [ ] 아이콘 전용 버튼에 `aria-label` 누락
- [ ] 간격 값이 스케일(4/8/12/16/20/24/32/40/48px) 벗어남

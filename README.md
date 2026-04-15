# IGT Design System v2

IGT 백오피스 전용 React 컴포넌트 라이브러리.
Figma 디자인 토큰을 CSS Variables로 직접 반영하여 일관된 UI를 보장합니다.

---

## 설치

### 1. 패키지 설치

```bash
npm install github:sikisiki-ignite/igt-design-system-v2
```

> 설치 시 자동으로 빌드가 실행됩니다. 1~2분 소요될 수 있습니다.

### 2. Claude Code AI 스킬 설치

레포의 `.claude/skills/backoffice-dev.md`를 Claude Code 스킬 디렉토리에 복사합니다.

```bash
mkdir -p ~/.claude/skills
cp node_modules/igt-design-system/.claude/skills/backoffice-dev.md ~/.claude/skills/
```

> 설치 확인: `ls ~/.claude/skills/backoffice-dev.md` 가 출력되면 정상입니다.

설치 후 Claude Code에서 아래 키워드로 자동 적용됩니다:
- `igt 디자인 시스템 사용해서 화면 만들어줘`
- `igt 디자인으로 구현해줘`
- `디자인시스템 써서 ...`
- 또는 `/backoffice-dev` 직접 호출

---

## 시작하기

### 1. 글로벌 스타일 import (앱 진입점에서 1회)

```tsx
// main.tsx 또는 App.tsx
import 'igt-design-system/styles'
```

### 2. 컴포넌트 사용

```tsx
import { Button, Input, Table, Badge } from 'igt-design-system'

export default function UserListPage() {
  return (
    <>
      <Button>사용자 추가</Button>
      <Badge variant="success">활성</Badge>
    </>
  )
}
```

### 3. 테마 설정

```html
<!-- Light (기본) -->
<html data-theme="light">

<!-- Dark -->
<html data-theme="dark">
```

---

## 컴포넌트 목록

### 버튼

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| `Button` | 기본 액션 버튼 | `tone`, `variant`, `size`, `loading`, `leadingIcon`, `iconOnly` |
| `IconButton` | 아이콘 전용 버튼 | `icon`, `aria-label`, `variant`, `shape`, `size` |
| `TextButton` | 텍스트 링크형 버튼 | `variant`, `tone`, `size`, `leadingIcon`, `href` |
| `FloatingButton` | 고정 위치 FAB | `icon`, `variant`, `shape`, `size`, `label` |
| `ToggleButton` | 선택 상태 토글 버튼 | `selected`, `onSelectedChange`, `emphasis`, `size` |
| `ButtonGroup` | 버튼 묶음 레이아웃 | `layout`, `distribution`, `size` |

### 입력

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| `Input` | 텍스트 입력 필드 | `label`, `error`, `hint`, `prefix`, `suffix`, `fieldStyle`, `size` |
| `TextArea` | 여러 줄 텍스트 입력 | `label`, `error`, `hint`, `showCount`, `maxLength`, `size` |
| `Select` | 드롭다운 선택 | `options`, `label`, `error`, `placeholder`, `fieldStyle`, `size` |
| `NumberStepper` | 숫자 증감 버튼 | `value`, `onChange`, `min`, `max`, `step`, `size` |
| `Checkbox` | 체크박스 | `label`, `error`, `indeterminate`, `size` |
| `CheckboxGroup` | 체크박스 그룹 | `options`, `value`, `onChange`, `selectAll`, `direction` |
| `Radio` | 라디오 버튼 | `label`, `description`, `error`, `size` |
| `RadioGroup` | 라디오 그룹 | `label`, `value`, `onChange`, `size` |
| `RadioGroupItem` | RadioGroup 항목 | `value`, `label`, `description` |
| `Switch` | 토글 스위치 | `label`, `description`, `size` |
| `SwitchField` | label 필수 스위치 | `label`, `description`, `size` |
| `ChoiceChipGroup` | 칩 단일/복수 선택 | `selectionType`, `value`, `onChange`, `size` |
| `ChoiceChipGroupItem` | ChoiceChipGroup 항목 | `value`, `label` |
| `SegmentedControl` | 세그먼트 전환 | `items`, `value`, `onChange`, `size`, `width` |
| `Rating` | 별점 입력/표시 | `value`, `onChange`, `count`, `size`, `readOnly` |

### 표시

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| `Badge` | 상태 텍스트 칩 | `variant`, `badgeStyle`, `size`, `dot` |
| `CountBadge` | 숫자 카운트 뱃지 | `count`, `max`, `tone`, `size` |
| `DotBadge` | 상태 점 뱃지 | `tone`, `size`, `aria-label` |
| `Label` | 색상 강조 태그 | `color`, `tone`, `size`, `icon` |
| `Avatar` | 프로필 이미지 | `src`, `fallback`, `size`, `shape`, `status` |
| `Icon` | SVG 아이콘 | `name`, `variant`, `size`, `label` |
| `PageIndicator` | 페이지 점 표시 | `count`, `activeIndex`, `size`, `appearance` |

### 레이아웃

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| `AppLayout` | 전체 페이지 레이아웃 | `topNav`, `sideNav`, `children` |
| `Divider` | 구분선 | `orientation`, `tone`, `emphasis`, `lineStyle` |
| `Row` | 목록 행 아이템 | `label`, `leading`, `trailing`, `href`, `onClick` |
| `SkeletonText` | 텍스트 로딩 자리 | `size`, `width` |
| `SkeletonRect` | 사각형 로딩 자리 | `size`, `radius`, `width`, `height` |
| `SkeletonCircle` | 원형 로딩 자리 | `size` |

### 탐색

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| `Breadcrumb` | 경로 탐색 | `items`, `separator`, `leading` |
| `Tab` | 탭 전환 | `items`, `activeKey`, `onChange`, `size`, `distribution` |
| `Link` | 텍스트 링크 | `tone`, `underline`, `disabled`, `href` |
| `SideNavigation` | 좌측 네비게이션 | `tone`, `size` |
| `NavItem` | SideNavigation 항목 | `as`, `current`, `depth`, `leadingIcon` |
| `Pagination` | 페이지 탐색 | `total`, `page`, `onChange`, `pageSize`, `variant` |

### 오버레이

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| `Modal` | 대화상자 | `open`, `onClose`, `title`, `footer`, `size` |
| `Tooltip` | 툴팁 | `content`, `placement`, `delay`, `disabled` |
| `Popover` | 컨텍스트 패널 | `emphasis`, `children` |
| `PopoverSection` | Popover 섹션 | `title`, `children` |
| `Toast` | 일시적 알림 | `type`, `title`, `message`, `duration`, `onClose` |
| `ToastContainer` | Toast 위치 컨테이너 | `position` |
| `Backdrop` | 배경 오버레이 | `tone`, `strength`, `visible` |

### 피드백 / 콘텐츠

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| `Alert` | 고정 알림 배너 | `type`, `title`, `description`, `dismissible` |
| `Table` | 데이터 테이블 | `columns`, `data`, `loading`, `striped`, `onSort` |
| `Accordion` | 접기/펼치기 패널 | `items`, `variation`, `allowMultiple`, `size` |

---

## 주요 컴포넌트 사용법

### Button

```tsx
// tone: 'primary' | 'secondary' | 'danger'
// variant: 'fill' | 'soft' | 'outline' | 'ghost'
// size: 'xs' | 'sm' | 'md' | 'lg'

<Button>저장</Button>
<Button tone="secondary" variant="outline">취소</Button>
<Button tone="danger">삭제</Button>
<Button loading>처리 중</Button>
<Button leadingIcon={<Icon name="plus" size="sm" />}>추가</Button>
<Button iconOnly leadingIcon={<Icon name="search" size="sm" />} aria-label="검색" />
```

### Input

```tsx
<Input label="이름" placeholder="이름을 입력하세요" />
<Input label="이메일" type="email" error="올바른 이메일 형식이 아닙니다" />
<Input prefix={<Icon name="search" size="sm" />} placeholder="검색" fullWidth />
```

### Select

```tsx
const options = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
]

<Select label="상태" options={options} placeholder="선택하세요" />
<Select label="상태" options={options} value={status} onChange={(e) => setStatus(e.target.value)} error={errors.status} />
```

### RadioGroup

```tsx
<RadioGroup label="결제 방법" value={payment} onChange={setPayment}>
  <RadioGroupItem value="card" label="신용카드" />
  <RadioGroupItem value="transfer" label="계좌이체" description="영업일 기준 1-3일 소요" />
  <RadioGroupItem value="vbank" label="가상계좌" disabled />
</RadioGroup>
```

### Badge

```tsx
// variant: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
// badgeStyle: 'fill' | 'soft' | 'outline'

<Badge variant="success">활성</Badge>
<Badge variant="danger" badgeStyle="fill">긴급</Badge>
<Badge variant="warning" dot>주의</Badge>
```

### Table

```tsx
const columns = [
  { key: 'name', header: '이름', sortable: true },
  {
    key: 'status',
    header: '상태',
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'danger'}>
        {row.statusLabel}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: (row) => (
      <Tooltip content="수정">
        <Button
          tone="secondary" variant="ghost" size="sm"
          iconOnly leadingIcon={<Icon name="edit" size="sm" />}
          onClick={() => handleEdit(row)}
        />
      </Tooltip>
    ),
  },
]

<Table
  columns={columns}
  data={users}
  rowKey="id"
  loading={isLoading}
  striped
  sortKey={sortKey}
  sortDirection={sortDir}
  onSort={handleSort}
  emptyText="등록된 사용자가 없습니다."
  onRowClick={(row) => navigate(`/users/${row.id}`)}
/>
```

### Modal

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="사용자 수정"
  size="md"
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button tone="secondary" variant="outline" onClick={() => setOpen(false)}>취소</Button>
      <Button onClick={handleSave}>저장</Button>
    </div>
  }
>
  <Input label="이름" fullWidth />
</Modal>
```

### Toast

```tsx
// App.tsx 최상위에 ToastContainer 배치
// position: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

<ToastContainer position="top-right">
  {toasts.map((t) => (
    <Toast key={t.id} type={t.type} title={t.title} message={t.message} onClose={() => remove(t.id)} />
  ))}
</ToastContainer>
```

### Alert

```tsx
// type: 'neutral' | 'info' | 'success' | 'warning' | 'danger'

<Alert type="warning" title="주의" description="저장하지 않은 변경사항이 있습니다." />
<Alert type="danger" title="오류" description="서버와 연결할 수 없습니다." dismissible onDismiss={() => setShow(false)} />
```

---

## 토큰 구조

```
Figma Primitive Tokens  →  --ref-blue-500, --ref-grey-100 ...
         ↓
Figma Semantic Tokens   →  --sys-content-neutral-strong, --sys-surface-subtle ...
         ↓
Component Tokens        →  --btn-primary-fill-bg, --field-outline-border ...
         ↓
컴포넌트 CSS            →  .igt-btn[data-tone='primary'] { background: var(--btn-primary-fill-bg) }
```

컴포넌트 외부에서 스타일 지정 시 `--sys-*` 토큰 사용:

```tsx
// ✅
style={{ color: 'var(--sys-content-neutral-strong)' }}
style={{ background: 'var(--sys-surface-subtle)' }}

// ❌
style={{ color: '#191f28' }}
style={{ background: '#f2f4f6' }}
```

---

## 빌드

```bash
# 라이브러리 빌드
npm run build

# 개발 모드 (watch)
npm run dev
```

빌드 결과물:

```
dist/
├── index.js          # ESM
├── index.cjs         # CommonJS
├── index.d.ts        # TypeScript 타입
└── styles/
    └── globals.css   # CSS Variables
```

---

## AI 바이브 코딩

이 라이브러리는 Claude Code와 함께 사용하도록 설계되었습니다.

### 스킬

```
~/.claude/skills/backoffice-dev.md   ← 백오피스 화면 구현 전용 스킬
```

`/backoffice-dev` 스킬을 호출하면 이 라이브러리의 컴포넌트와 토큰 규칙을 자동 적용하여 백오피스 화면을 구현합니다.

### AI 가이드 문서

```
ai-guide/
├── design-tokens.md       ← 사용 가능한 색상/폰트/간격 토큰
├── component-catalog.md   ← 전체 컴포넌트 props & 예시
├── usage-patterns.md      ← 검색/테이블/폼/모달 등 조합 패턴
└── anti-patterns.md       ← 하면 안 되는 패턴
```

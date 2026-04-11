# IGT Design System — 컴포넌트 규칙 및 API 레퍼런스

## 필수 규칙

- UI 구현 시 반드시 IGT Design System 컴포넌트를 사용할 것
- 직접 HTML/CSS 작성 금지 (div + inline style, arbitrary color 등)
- 컴포넌트 스타일 오버라이드 금지 (className으로 스타일 덮어쓰기 금지)
- 색상은 반드시 CSS Variables로만 참조: `var(--color-*)`, `var(--ref-*)` 형태
- 아이콘 크기도 `var(--comp-icon-sm/md/lg)` 사용

## 프로젝트 설정

```bash
# 설치
npm install igt-design-system

# 글로벌 스타일 (최상위 진입점에서 1회 import)
import 'igt-design-system/styles'

# 컴포넌트 import
import { Button, Input, Table, Badge } from 'igt-design-system'
```

## 테마 설정

```html
<!-- Light (기본) -->
<html data-theme="light">

<!-- Dark -->
<html data-theme="dark">
```

---

## Button

```tsx
import { Button } from 'igt-design-system'

// Props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'   // 기본: primary
  buttonStyle?: 'fill' | 'soft' | 'outline' | 'ghost'  // 기본: fill
  size?: 'sm' | 'md' | 'lg'                       // 기본: md
  loading?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
  disabled?: boolean
  // + 모든 HTML button 속성
}
```

```tsx
// 사용 예시
<Button>저장</Button>
<Button variant="danger" buttonStyle="outline">삭제</Button>
<Button variant="secondary" buttonStyle="soft" size="sm">취소</Button>
<Button loading>처리 중</Button>
<Button fullWidth>전체 너비</Button>
<Button iconLeft={<SearchIcon />}>검색</Button>
```

**Back office 패턴:**
- 폼 제출: `variant="primary"` / `buttonStyle="fill"`
- 취소/닫기: `variant="secondary"` / `buttonStyle="outline"`
- 삭제/경고: `variant="danger"` / `buttonStyle="soft"` 또는 `"outline"`
- 테이블 inline 액션: `size="sm"`

---

## Input

```tsx
import { Input } from 'igt-design-system'

interface InputProps {
  label?: string
  hint?: string
  error?: string                         // 있으면 error 상태
  fieldStyle?: 'outline' | 'fill'        // 기본: outline
  size?: 'sm' | 'md' | 'lg'             // 기본: md
  prefix?: ReactNode                     // 왼쪽 아이콘/텍스트
  suffix?: ReactNode                     // 오른쪽 아이콘/텍스트
  fullWidth?: boolean
  // + 모든 HTML input 속성
}
```

```tsx
<Input label="이름" placeholder="이름을 입력하세요" />
<Input label="이메일" type="email" error="올바른 이메일 형식이 아닙니다" />
<Input label="검색" prefix={<SearchIcon />} hint="키워드로 검색하세요" />
<Input fieldStyle="fill" label="금액" suffix="원" />
<Input fullWidth label="주소" />
```

---

## Select

```tsx
import { Select } from 'igt-design-system'

interface SelectOption { value: string; label: string; disabled?: boolean }

interface SelectProps {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  fieldStyle?: 'outline' | 'fill'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  // + 모든 HTML select 속성
}
```

```tsx
const statusOptions = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'pending', label: '대기' },
]

<Select label="상태" options={statusOptions} placeholder="선택하세요" />
<Select label="카테고리" options={categoryOptions} error="필수 항목입니다" fullWidth />
```

---

## Checkbox

```tsx
import { Checkbox, Radio } from 'igt-design-system'

interface CheckboxProps {
  label?: string
  hint?: string
  error?: string
  indeterminate?: boolean  // 일부 선택 상태
  // + 모든 HTML input[checkbox] 속성
}
```

```tsx
<Checkbox label="전체 선택" indeterminate={someSelected} checked={allSelected} onChange={handleAll} />
<Checkbox label="이용약관 동의" error="필수 항목입니다" />
<Radio label="남성" name="gender" value="male" />
<Radio label="여성" name="gender" value="female" />
```

---

## Badge

```tsx
import { Badge } from 'igt-design-system'

interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'  // 기본: neutral
  badgeStyle?: 'fill' | 'soft' | 'outline'                          // 기본: soft
  size?: 'sm' | 'md'                                                  // 기본: md
  dot?: boolean     // 왼쪽에 색상 dot 표시
}
```

```tsx
<Badge variant="success">활성</Badge>
<Badge variant="danger" badgeStyle="soft">비활성</Badge>
<Badge variant="warning" dot>점검 중</Badge>
<Badge variant="info" size="sm">신규</Badge>
```

**Back office 상태 매핑 가이드:**
| 상태 | variant | badgeStyle |
|------|---------|------------|
| 활성/정상/완료 | `success` | `soft` |
| 비활성/취소 | `danger` | `soft` |
| 대기/처리 중 | `warning` | `soft` |
| 정보/임시 | `info` | `soft` |
| 기본/해당 없음 | `neutral` | `soft` |

---

## Table

```tsx
import { Table } from 'igt-design-system'

interface TableColumn<T> {
  key: string
  header: ReactNode
  render?: (row: T, index: number) => ReactNode   // 커스텀 셀 렌더
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  rowKey?: keyof T | ((row: T) => string)
  sortKey?: string
  sortDirection?: 'asc' | 'desc' | null
  onSort?: (key: string, direction: 'asc' | 'desc' | null) => void
  loading?: boolean
  emptyText?: string
  striped?: boolean
  stickyHeader?: boolean
  onRowClick?: (row: T, index: number) => void
}
```

```tsx
const columns = [
  { key: 'name', header: '이름', sortable: true },
  { key: 'status', header: '상태', render: (row) => (
    <Badge variant={row.status === 'active' ? 'success' : 'danger'}>{row.statusLabel}</Badge>
  )},
  { key: 'createdAt', header: '등록일', align: 'right' as const },
  { key: 'actions', header: '', width: 120, render: (row) => (
    <Button size="sm" buttonStyle="ghost" variant="secondary">상세보기</Button>
  )},
]

<Table
  columns={columns}
  data={users}
  rowKey="id"
  sortKey={sort.key}
  sortDirection={sort.direction}
  onSort={handleSort}
  loading={isLoading}
  emptyText="등록된 사용자가 없습니다."
  striped
  onRowClick={(row) => navigate(`/users/${row.id}`)}
/>
```

---

## Modal

```tsx
import { Modal } from 'igt-design-system'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'  // 기본: md
  closeOnOverlayClick?: boolean       // 기본: true
}
```

```tsx
const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>모달 열기</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="사용자 정보 수정"
  size="md"
  footer={
    <>
      <Button variant="secondary" buttonStyle="outline" onClick={() => setOpen(false)}>취소</Button>
      <Button onClick={handleSubmit}>저장</Button>
    </>
  }
>
  <Input label="이름" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
  <Select label="역할" options={roleOptions} fullWidth />
</Modal>
```

---

## Toast

```tsx
import { Toast, ToastContainer } from 'igt-design-system'

interface ToastProps {
  type?: 'info' | 'success' | 'warning' | 'error'  // 기본: info
  title?: string
  message: ReactNode
  duration?: number   // ms, 기본: 4000. 0이면 자동 닫힘 없음
  onClose?: () => void
}

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
  // 기본: top-right
}
```

```tsx
// App.tsx 최상위에 ToastContainer 배치
<ToastContainer position="top-right">
  {toasts.map((t) => (
    <Toast key={t.id} type={t.type} message={t.message} onClose={() => removeToast(t.id)} />
  ))}
</ToastContainer>

// 사용
<Toast type="success" title="저장 완료" message="변경사항이 저장되었습니다." onClose={handleClose} />
<Toast type="error" message="오류가 발생했습니다. 다시 시도해주세요." onClose={handleClose} />
```

---

## Tooltip

```tsx
import { Tooltip } from 'igt-design-system'

interface TooltipProps {
  content: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'  // 기본: top
  delay?: number       // ms, 기본: 300
  disabled?: boolean
  children: ReactElement  // 단일 자식 요소 (hover 대상)
}
```

```tsx
<Tooltip content="삭제할 수 없습니다" placement="top">
  <Button variant="danger" disabled>삭제</Button>
</Tooltip>

<Tooltip content="마지막 로그인: 2024-01-15" placement="right">
  <span>{user.name}</span>
</Tooltip>
```

---

## Back Office 레이아웃 패턴

### 목록 페이지
```tsx
// 필터 영역 + 테이블 구조
<div className="page-header">
  <h1>사용자 관리</h1>
  <Button iconLeft={<PlusIcon />}>사용자 추가</Button>
</div>

<div className="filter-bar">
  <Input placeholder="이름/이메일 검색" prefix={<SearchIcon />} size="sm" />
  <Select options={statusOptions} placeholder="상태" size="sm" />
  <Button variant="secondary" buttonStyle="outline" size="sm">초기화</Button>
</div>

<Table columns={columns} data={data} sortKey={sortKey} sortDirection={sortDir} onSort={handleSort} />
```

### 상세/편집 폼
```tsx
<Modal open={open} onClose={handleClose} title="상세 정보" size="lg"
  footer={
    <>
      <Button variant="secondary" buttonStyle="outline" onClick={handleClose}>취소</Button>
      <Button onClick={handleSave} loading={saving}>저장</Button>
    </>
  }
>
  <div className="form-grid">  {/* 2-column grid */}
    <Input label="이름" fullWidth />
    <Input label="이메일" type="email" fullWidth />
    <Select label="역할" options={roleOptions} fullWidth />
    <Select label="상태" options={statusOptions} fullWidth />
  </div>
</Modal>
```

### 상태 표시 (테이블 셀)
```tsx
// 항상 Badge 사용, 직접 색상 지정 금지
render: (row) => (
  <Badge variant={statusVariantMap[row.status]} dot>
    {statusLabelMap[row.status]}
  </Badge>
)
```

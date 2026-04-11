# IGT Design System v2

Back office 서비스 전용 React 컴포넌트 라이브러리.
Figma 디자인 토큰을 CSS Variables로 직접 반영하여 일관된 UI를 보장합니다.

## 설치

```bash
npm install igt-design-system
```

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

## 컴포넌트

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| `Button` | 액션 버튼 | `variant`, `buttonStyle`, `size`, `loading`, `iconLeft`, `iconRight` |
| `Input` | 텍스트 입력 필드 | `label`, `error`, `hint`, `prefix`, `suffix`, `fieldStyle` |
| `Select` | 드롭다운 선택 | `options`, `label`, `error`, `placeholder`, `fieldStyle` |
| `Checkbox` | 체크박스 (indeterminate 지원) | `label`, `error`, `indeterminate` |
| `Radio` | 라디오 버튼 | `label`, `error` |
| `Badge` | 상태 표시 뱃지 | `variant`, `badgeStyle`, `size`, `dot` |
| `Table` | 데이터 테이블 | `columns`, `data`, `sortKey`, `onSort`, `loading`, `striped` |
| `Modal` | 다이얼로그 모달 | `open`, `onClose`, `title`, `footer`, `size` |
| `Toast` | 알림 메시지 | `type`, `title`, `message`, `duration`, `onClose` |
| `ToastContainer` | Toast 위치 컨테이너 | `position` |
| `Tooltip` | 툴팁 | `content`, `placement`, `delay` |

---

## Button

```tsx
// variant: 'primary' | 'secondary' | 'danger'
// buttonStyle: 'fill' | 'soft' | 'outline' | 'ghost'
// size: 'sm' | 'md' | 'lg'

<Button>저장</Button>
<Button variant="secondary" buttonStyle="outline">취소</Button>
<Button variant="danger" buttonStyle="soft" size="sm">삭제</Button>
<Button loading>처리 중</Button>
<Button iconLeft={<SearchIcon />}>검색</Button>
```

## Input

```tsx
<Input label="이름" placeholder="이름을 입력하세요" />
<Input label="이메일" type="email" error="올바른 이메일 형식이 아닙니다" />
<Input label="검색" prefix={<SearchIcon />} hint="키워드로 검색하세요" fullWidth />
```

## Select

```tsx
const options = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
]

<Select label="상태" options={options} placeholder="선택하세요" />
```

## Badge

```tsx
// variant: 'neutral' | 'info' | 'success' | 'warning' | 'danger'

<Badge variant="success">활성</Badge>
<Badge variant="danger" badgeStyle="soft">비활성</Badge>
<Badge variant="warning" dot>점검 중</Badge>
```

## Table

```tsx
const columns = [
  { key: 'name', header: '이름', sortable: true },
  {
    key: 'status',
    header: '상태',
    render: (row) => <Badge variant={row.status === 'active' ? 'success' : 'danger'}>{row.statusLabel}</Badge>
  },
  {
    key: 'actions',
    header: '',
    width: 100,
    render: (row) => <Button size="sm" buttonStyle="ghost" variant="secondary">상세보기</Button>
  },
]

<Table
  columns={columns}
  data={users}
  rowKey="id"
  sortKey={sortKey}
  sortDirection={sortDir}
  onSort={handleSort}
  loading={isLoading}
  emptyText="등록된 사용자가 없습니다."
  striped
/>
```

## Modal

```tsx
const [open, setOpen] = useState(false)

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="사용자 수정"
  footer={
    <>
      <Button variant="secondary" buttonStyle="outline" onClick={() => setOpen(false)}>취소</Button>
      <Button onClick={handleSave}>저장</Button>
    </>
  }
>
  <Input label="이름" fullWidth />
</Modal>
```

## Toast

```tsx
// App.tsx 최상위에 ToastContainer 배치
<ToastContainer position="top-right">
  {toasts.map((t) => (
    <Toast key={t.id} type={t.type} message={t.message} onClose={() => remove(t.id)} />
  ))}
</ToastContainer>
```

---

## Claude Code 스킬 연동

이 라이브러리는 Claude Code 스킬과 함께 사용하도록 설계되었습니다.

### 스킬 파일 위치

```
.claude/skills/
├── module-design.md    # 컴포넌트 API 레퍼런스 (디자인팀 참조용)
└── spec-template.md    # 모듈 스펙 작성 템플릿 (기획팀 + 디자인팀 협업용)
```

### 워크플로우

```
Step 1 — 기획팀
spec-template.md를 복사하여 [module]-spec.md 작성
(화면 구성, 기능 정의, 데이터 스펙)

Step 2 — 디자인팀
같은 파일에 DS 스펙 추가
module-design.md 참조하여 컴포넌트·variant·토큰 명시

Step 3 — AI 구현
완성된 [module]-spec.md 스킬 하나로
IGT Design System이 일관되게 적용된 UI 생성
```

---

## 토큰 구조

```
Figma Primitive Tokens  →  --ref-blue-500, --ref-grey-100 ...
         ↓
Figma Semantic Tokens   →  --sys-color-primary, --sys-bg-surface ...
         ↓
Component Tokens        →  --btn-primary-fill-bg, --field-outline-border ...
         ↓
컴포넌트 CSS            →  .igt-btn[data-variant='primary'] { background: var(--btn-primary-fill-bg) }
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

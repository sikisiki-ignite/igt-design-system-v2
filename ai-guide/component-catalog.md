# IGT Design System — Component Catalog

> AI 바이브 코딩 시 이 문서를 먼저 확인한다.
> UI 구현 전 필요한 컴포넌트가 이미 있는지 확인하고 반드시 재사용할 것.
> 색상/폰트/간격 값은 `design-tokens.md` 참조.

---

## 목차

| 카테고리 | 컴포넌트 |
|---------|---------|
| 입력 | [Button](#button), [Input](#input), [Select](#select), [Checkbox](#checkbox), [Radio / RadioGroup](#radio--radiogroup), [Switch / SwitchField](#switch--switchfield) |
| 표시 | [Badge](#badge), [CountBadge](#countbadge), [DotBadge](#dotbadge), [Label](#label), [Avatar](#avatar), [Icon](#icon) |
| 레이아웃 | [Divider](#divider), [Skeleton](#skeleton), [SideNavigation](#sidenavigation) |
| 오버레이 | [Modal](#modal), [Tooltip](#tooltip), [Toast / ToastContainer](#toast--toastcontainer), [Backdrop](#backdrop) |
| 피드백 | [Alert](#alert), [Table](#table) |

---

## Button

**언제 쓰나**: 사용자 액션을 트리거하는 모든 버튼.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `tone` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | 색상 의미 |
| `variant` | `'fill' \| 'soft' \| 'outline' \| 'ghost'` | `'fill'` | 스타일 형태 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `loading` | `boolean` | `false` | 스피너 표시 + 클릭 불가 |
| `leadingIcon` | `ReactNode` | — | 앞 아이콘 |
| `trailingIcon` | `ReactNode` | — | 뒤 아이콘 |
| `iconOnly` | `boolean` | `false` | 아이콘만 표시 (텍스트 없음) |
| `fullWidth` | `boolean` | `false` | 너비 100% |
| `disabled` | `boolean` | — | 비활성화 |

### 사용 예시

```tsx
// 기본
<Button>저장</Button>

// 위험 액션
<Button tone="danger" variant="fill">삭제</Button>

// 보조 소프트
<Button tone="secondary" variant="soft">취소</Button>

// 아이콘 + 텍스트
<Button leadingIcon={<Icon name="plus" size="sm" />}>추가</Button>

// 아이콘만
<Button iconOnly leadingIcon={<Icon name="search" size="sm" />} />

// 로딩
<Button loading>저장 중</Button>
```

---

## Input

**언제 쓰나**: 텍스트 입력 필드. label, 에러 메시지, prefix/suffix 포함.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 입력 필드 레이블 |
| `hint` | `string` | — | 하단 도움말 텍스트 |
| `error` | `string` | — | 에러 메시지 (있으면 hint 숨김) |
| `fieldStyle` | `'outline' \| 'fill'` | `'outline'` | 스타일 형태 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `prefix` | `ReactNode` | — | 입력창 앞 요소 (아이콘 등) |
| `suffix` | `ReactNode` | — | 입력창 뒤 요소 (아이콘 등) |
| `fullWidth` | `boolean` | `false` | 너비 100% |
| `disabled` | `boolean` | — | 비활성화 |
| `readOnly` | `boolean` | — | 읽기 전용 |
| + HTML input 속성 | | | `placeholder`, `value`, `onChange` 등 |

### 사용 예시

```tsx
// 기본
<Input label="이름" placeholder="이름을 입력하세요" />

// 에러 상태
<Input label="이메일" error="올바른 이메일을 입력하세요" value={email} onChange={...} />

// prefix 아이콘
<Input prefix={<Icon name="search" size="sm" />} placeholder="검색" />

// 전체 너비
<Input label="주소" fullWidth />
```

---

## Select

**언제 쓰나**: 옵션 목록에서 하나를 선택. 드롭다운 형태.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `options` | `SelectOption[]` | — | `{ value, label, disabled? }` 배열 **(필수)** |
| `label` | `string` | — | 필드 레이블 |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 메시지 |
| `placeholder` | `string` | — | 미선택 상태 텍스트 |
| `fieldStyle` | `'outline' \| 'fill' \| 'plain'` | `'outline'` | 스타일 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `fullWidth` | `boolean` | `false` | 너비 100% |
| `disabled` | `boolean` | — | 비활성화 |

### 사용 예시

```tsx
const options = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
]

<Select label="국가" options={options} placeholder="선택하세요" />

<Select
  label="상태"
  options={statusOptions}
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  error={errors.status}
/>
```

---

## Checkbox

**언제 쓰나**: 단일 항목 체크, 또는 복수 선택.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 체크박스 레이블 |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 메시지 |
| `indeterminate` | `boolean` | `false` | 중간 선택 상태 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `disabled` | `boolean` | — | 비활성화 |
| `readOnly` | `boolean` | — | 읽기 전용 |
| + HTML input 속성 | | | `checked`, `onChange` 등 |

### 사용 예시

```tsx
// 기본
<Checkbox label="전체 동의" checked={allChecked} onChange={handleAll} />

// indeterminate (일부 선택)
<Checkbox label="전체 선택" indeterminate={someChecked} checked={allChecked} onChange={handleAll} />

// 에러
<Checkbox label="약관 동의" error="필수 항목입니다" />
```

---

## Radio / RadioGroup

**언제 쓰나**: 여러 옵션 중 하나만 선택. 단독 `Radio` 또는 그룹은 `RadioGroup` + `RadioGroupItem` 사용.

### Radio Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 레이블 |
| `description` | `string` | — | 레이블 아래 보조 설명 |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `disabled` | `boolean` | — | 비활성화 |
| `readOnly` | `boolean` | — | 읽기 전용 |

### RadioGroup Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 그룹 제목 |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 |
| `size` | `'sm' \| 'md'` | `'md'` | 하위 아이템 크기 |
| `value` | `string` | — | controlled 선택값 |
| `defaultValue` | `string` | — | uncontrolled 기본값 |
| `disabled` | `boolean` | — | 전체 비활성화 |
| `onChange` | `(value: string) => void` | — | 선택 변경 |

### RadioGroupItem Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `value` | `string` | — | **(필수)** 이 항목의 값 |
| `label` | `string` | — | **(필수)** 레이블 |
| `description` | `string` | — | 보조 설명 |
| `disabled` | `boolean` | — | 개별 비활성화 |

### 사용 예시

```tsx
// RadioGroup (권장)
<RadioGroup label="결제 방법" value={payment} onChange={setPayment}>
  <RadioGroupItem value="card" label="신용카드" />
  <RadioGroupItem value="transfer" label="계좌이체" description="영업일 기준 1-3일 소요" />
  <RadioGroupItem value="vbank" label="가상계좌" disabled />
</RadioGroup>

// 단독 Radio (name 직접 관리 필요)
<Radio name="agree" label="동의합니다" value="yes" />
```

---

## Switch / SwitchField

**언제 쓰나**: 즉시 적용되는 on/off 토글. `SwitchField`는 label이 필수인 버전.

### Switch Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `label` | `string` | — | 레이블 |
| `description` | `string` | — | 보조 설명 |
| `disabled` | `boolean` | — | 비활성화 |
| + HTML input 속성 | | | `checked`, `onChange` 등 |

### 사용 예시

```tsx
<Switch label="알림 수신" checked={notify} onChange={(e) => setNotify(e.target.checked)} />

<SwitchField label="다크 모드" checked={dark} onChange={(e) => setDark(e.target.checked)} />
```

---

## Badge

**언제 쓰나**: 상태, 카테고리, 레이블을 텍스트 칩으로 표시.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | 색상 의미 |
| `badgeStyle` | `'fill' \| 'soft' \| 'outline'` | `'soft'` | 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `dot` | `boolean` | `false` | 앞에 dot 표시 |
| `children` | `ReactNode` | — | **(필수)** 텍스트 |

### 사용 예시

```tsx
<Badge variant="success">활성</Badge>
<Badge variant="danger" badgeStyle="fill">긴급</Badge>
<Badge variant="warning" dot>주의</Badge>
<Badge variant="neutral" badgeStyle="outline" size="sm">대기</Badge>
```

---

## CountBadge

**언제 쓰나**: 알림 수, 미읽음 수 등 숫자 카운트를 원형 뱃지로 표시.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `count` | `number` | — | **(필수)** 표시할 숫자 |
| `max` | `number` | `99` | 초과 시 `max+` 표시 |
| `tone` | `'urgent' \| 'accent' \| 'neutral'` | `'urgent'` | 색상 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |

### 사용 예시

```tsx
<CountBadge count={5} />
<CountBadge count={120} max={99} tone="accent" />
```

---

## DotBadge

**언제 쓰나**: 온라인/오프라인 등 상태를 작은 점으로 표시.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `tone` | `'urgent' \| 'accent' \| 'neutral'` | `'urgent'` | 색상 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `aria-label` | `string` | — | 접근성 레이블 |

### 사용 예시

```tsx
<DotBadge tone="accent" aria-label="온라인" />
<DotBadge tone="neutral" size="sm" />
```

---

## Label

**언제 쓰나**: 태그, 카테고리 라벨, 상태 칩 등 채워진 색상 레이블.

> Badge와 차이: Label은 색상 강조가 주목적, Badge는 상태 표현이 주목적.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 크기 |
| `tone` | `'soft' \| 'fill'` | `'soft'` | 스타일 강도 |
| `color` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | 색상 |
| `icon` | `ReactNode` | — | 앞 아이콘 |
| `children` | `ReactNode` | — | **(필수)** 텍스트 |

### 사용 예시

```tsx
<Label color="success">승인</Label>
<Label color="danger" tone="fill">반려</Label>
<Label color="warning" icon={<Icon name="alert" size="xs" />}>주의</Label>
```

---

## Avatar

**언제 쓰나**: 사용자 프로필 이미지. 이미지 없으면 fallback 표시.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `src` | `string` | — | 이미지 URL |
| `alt` | `string` | `''` | 이미지 alt |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 크기 |
| `shape` | `'circle' \| 'rounded'` | `'circle'` | 모양 |
| `status` | `'online' \| 'busy' \| 'away' \| 'offline'` | — | 상태 점 |
| `fallback` | `ReactNode` | — | 이미지 없을 때 표시 (이니셜 등) |

### 사용 예시

```tsx
<Avatar src="/profile.jpg" alt="홍길동" size="md" />
<Avatar fallback="홍" status="online" />
<Avatar src="/img.jpg" shape="rounded" size="lg" />
```

---

## Icon

**언제 쓰나**: SVG 아이콘 표시. 37개 아이콘 내장.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `name` | `IconName` | — | **(필수)** 아이콘 이름 |
| `variant` | `'solid' \| 'outline' \| 'outline_thin'` | `'outline'` | 스타일 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 크기 (12/16/20/24/28px) |
| `label` | `string` | — | 접근성 레이블 (없으면 aria-hidden) |

### 사용 예시

```tsx
<Icon name="search" size="sm" />
<Icon name="check" variant="solid" size="md" label="확인" />
<Icon name="chevron_right" size="xs" />
```

---

## Divider

**언제 쓰나**: 섹션 구분선. 수평/수직 모두 지원.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 방향 |
| `tone` | `'neutral' \| 'accent' \| 'danger'` | `'neutral'` | 색상 |
| `emphasis` | `'weak' \| 'default' \| 'strong'` | `'default'` | 강도 |
| `lineStyle` | `'solid' \| 'dashed'` | `'solid'` | 선 스타일 |
| `inset` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | 양끝 여백 |

### 사용 예시

```tsx
<Divider />
<Divider emphasis="weak" />
<Divider orientation="vertical" />
<Divider lineStyle="dashed" inset="md" />
```

---

## Skeleton

**언제 쓰나**: 데이터 로딩 중 콘텐츠 자리 표시자. 텍스트/사각형/원형 세 가지.

### Sub-components

**SkeletonText**

| Prop | Type | Default |
|------|------|---------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| `width` | `string \| number` | — |

**SkeletonRect**

| Prop | Type | Default |
|------|------|---------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `radius` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| `width` | `string \| number` | — |
| `height` | `string \| number` | — |

**SkeletonCircle**

| Prop | Type | Default |
|------|------|---------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |

### 사용 예시

```tsx
// 카드 로딩 스켈레톤
<div>
  <SkeletonCircle size="md" />
  <SkeletonText size="sm" width={120} />
  <SkeletonText size="xs" width={80} />
</div>

<SkeletonRect width="100%" height={200} radius="md" />
```

---

## Modal

**언제 쓰나**: 사용자 확인/입력이 필요한 대화상자. ESC 키, 오버레이 클릭으로 닫힘.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `open` | `boolean` | — | **(필수)** 열림 상태 |
| `onClose` | `() => void` | — | **(필수)** 닫기 핸들러 |
| `title` | `ReactNode` | — | 모달 제목 |
| `children` | `ReactNode` | — | **(필수)** 본문 |
| `footer` | `ReactNode` | — | 하단 영역 (버튼 등) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 크기 |
| `closeOnOverlayClick` | `boolean` | `true` | 배경 클릭 시 닫힘 |

### 사용 예시

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="삭제 확인"
  footer={
    <>
      <Button tone="secondary" variant="outline" onClick={() => setIsOpen(false)}>취소</Button>
      <Button tone="danger" onClick={handleDelete}>삭제</Button>
    </>
  }
>
  <p>정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
</Modal>
```

---

## Tooltip

**언제 쓰나**: 요소 hover/focus 시 보조 설명 표시.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `content` | `ReactNode` | — | **(필수)** 툴팁 내용 |
| `children` | `ReactElement` | — | **(필수)** 트리거 요소 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 위치 |
| `delay` | `number` | `300` | 표시 지연 (ms) |
| `disabled` | `boolean` | `false` | 비활성화 |

### 사용 예시

```tsx
<Tooltip content="삭제합니다">
  <Button tone="danger" iconOnly leadingIcon={<Icon name="trash" size="sm" />} />
</Tooltip>

<Tooltip content="더 자세한 설명" placement="right">
  <Icon name="info" size="sm" />
</Tooltip>
```

---

## Toast / ToastContainer

**언제 쓰나**: 사용자 액션 결과를 일시적으로 알림. `ToastContainer`로 위치 지정 후 `Toast` 렌더.

### Toast Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `message` | `ReactNode` | — | **(필수)** 메시지 |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 유형 |
| `title` | `string` | — | 제목 |
| `duration` | `number` | `4000` | 자동 닫힘 시간 (ms) |
| `onClose` | `() => void` | — | 닫기 콜백 |

### ToastContainer Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | — | **(필수)** Toast 목록 |
| `position` | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'top-right'` | 위치 |

### 사용 예시

```tsx
// 앱 루트에 Container 배치
<ToastContainer position="top-right">
  {toasts.map((t) => (
    <Toast
      key={t.id}
      type={t.type}
      message={t.message}
      onClose={() => removeToast(t.id)}
    />
  ))}
</ToastContainer>
```

---

## Backdrop

**언제 쓰나**: 모달/드로어 뒤 배경 어둡게. Modal 내부에서 자동 사용되므로 직접 쓸 일은 드물다.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `tone` | `'dark' \| 'light'` | `'dark'` | 색상 |
| `strength` | `'default' \| 'strong'` | `'default'` | 투명도 |
| `visible` | `boolean` | `true` | 표시 여부 |

### 사용 예시

```tsx
<Backdrop visible={isOpen} onClick={handleClose} />
```

---

## Alert

**언제 쓰나**: 페이지 내 고정 알림 메시지. Toast와 달리 사라지지 않음.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `title` | `string` | — | **(필수)** 제목 |
| `type` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | 유형 |
| `description` | `string` | — | 상세 설명 |
| `icon` | `ReactNode` | — | 커스텀 아이콘 |
| `dismissible` | `boolean` | `false` | 닫기 버튼 표시 |
| `onDismiss` | `() => void` | — | 닫기 콜백 |

### 사용 예시

```tsx
<Alert type="warning" title="주의" description="저장하지 않은 변경사항이 있습니다." />

<Alert
  type="danger"
  title="오류 발생"
  description="서버와 연결할 수 없습니다."
  dismissible
  onDismiss={() => setShowAlert(false)}
/>
```

---

## Table

**언제 쓰나**: 정형 데이터를 행/열로 표시. 정렬, 로딩, 빈 상태 내장.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `columns` | `TableColumn[]` | — | **(필수)** 컬럼 정의 |
| `data` | `T[]` | — | **(필수)** 데이터 배열 |
| `rowKey` | `keyof T \| (row) => string` | — | 행 고유 키 |
| `loading` | `boolean` | `false` | 로딩 스피너 |
| `emptyText` | `string` | `'데이터가 없습니다.'` | 빈 상태 텍스트 |
| `striped` | `boolean` | `false` | 홀짝 줄 색상 |
| `stickyHeader` | `boolean` | `false` | 헤더 고정 |
| `bordered` | `boolean` | `false` | 테두리 |
| `sortKey` | `string` | — | 현재 정렬 컬럼 |
| `sortDirection` | `'asc' \| 'desc' \| null` | — | 정렬 방향 |
| `onSort` | `(key, dir) => void` | — | 정렬 변경 콜백 |
| `onRowClick` | `(row, index) => void` | — | 행 클릭 콜백 |

### TableColumn 정의

```ts
{
  key: string            // 데이터 키
  header: ReactNode      // 헤더 텍스트
  render?: (row, index) => ReactNode  // 커스텀 셀 렌더
  sortable?: boolean     // 정렬 가능 여부
  width?: string | number
  align?: 'left' | 'center' | 'right'
}
```

### 사용 예시

```tsx
const columns = [
  { key: 'name', header: '이름', sortable: true },
  { key: 'status', header: '상태', render: (row) => <Badge variant={row.status}>{row.statusLabel}</Badge> },
  { key: 'createdAt', header: '등록일', align: 'right' },
]

<Table
  columns={columns}
  data={users}
  rowKey="id"
  loading={isLoading}
  striped
  onRowClick={(row) => navigate(`/users/${row.id}`)}
/>
```

---

---

## SideNavigation

**언제 쓰나**: LNB(좌측 네비게이션 바). `AppLayout`의 `sideNav` 슬롯에 배치. `SideNavigation` → `SideNavigationList` → `NavItem` / `NavSectionHeader` 조합으로 구성.

### SideNavigation Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `tone` | `'neutral' \| 'accent'` | `'neutral'` | NavItem active 색상 의미 |
| `size` | `'md' \| 'sm'` | `'md'` | NavItem 크기 |
| `as` | `'nav' \| 'div' \| 'aside'` | `'nav'` | 컨테이너 태그 |

### SideNavigationList Props

`<ul role="list">` 래퍼. `HTMLUListElement` 속성 모두 허용.

### NavItem Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `as` | `'a' \| 'button'` | `'a'` | 렌더 태그 |
| `tone` | `'neutral' \| 'accent'` | `'neutral'` | 색상 의미 |
| `depth` | `1 \| 2 \| 3` | `1` | 들여쓰기 깊이 |
| `size` | `'md' \| 'sm'` | `'md'` | 크기 |
| `current` | `boolean` | `false` | 현재 선택 상태 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `leadingIcon` | `ReactNode` | — | 앞 아이콘 |
| `children` | `ReactNode` | — | **(필수)** 레이블 |

### NavSectionHeader Props

섹션 구분 레이블. `HTMLDivElement` 속성 모두 허용.

### 사용 예시

```tsx
import {
  SideNavigation,
  SideNavigationList,
  NavItem,
  NavSectionHeader,
} from 'igt-design-system'

// 기본 (accent tone — 현재 메뉴를 brand 색으로 강조)
<SideNavigation tone="accent">
  <SideNavigationList>
    <NavItem
      as="button"
      tone="accent"
      current
      leadingIcon={<Icon name="person" size="sm" />}
      onClick={() => navigate('/users')}
    >
      사용자 관리
    </NavItem>
    <NavItem
      as="button"
      leadingIcon={<Icon name="setting" size="sm" />}
      onClick={() => navigate('/settings')}
    >
      설정
    </NavItem>
  </SideNavigationList>
</SideNavigation>

// 섹션 헤더 포함
<SideNavigation>
  <SideNavigationList>
    <NavSectionHeader>시스템</NavSectionHeader>
    <NavItem as="button" current leadingIcon={<Icon name="chart_bar" size="sm" />}>대시보드</NavItem>
    <NavItem as="button" leadingIcon={<Icon name="person" size="sm" />}>사용자 관리</NavItem>
    <NavSectionHeader>설정</NavSectionHeader>
    <NavItem as="button" leadingIcon={<Icon name="setting" size="sm" />}>일반 설정</NavItem>
  </SideNavigationList>
</SideNavigation>

// depth 2 — 하위 메뉴
<NavItem as="button" depth={2} leadingIcon={<Icon name="person" size="sm" />}>역할 관리</NavItem>
```

---

> **업데이트 기록**
> - 2026-04-14: 초기 작성 (18개 컴포넌트 — Button, Input, Select, Checkbox, Radio, RadioGroup, Switch, SwitchField, Badge, CountBadge, DotBadge, Label, Avatar, Icon, Divider, Skeleton, Modal, Tooltip, Toast, Backdrop, Alert, Table)
> - 2026-04-14: SideNavigation 추가 (SideNavigation, SideNavigationList, NavItem, NavSectionHeader)

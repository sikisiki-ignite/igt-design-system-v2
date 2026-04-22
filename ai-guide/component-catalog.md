# IGT Design System — Component Catalog

> AI 바이브 코딩 시 이 문서를 먼저 확인한다.
> UI 구현 전 필요한 컴포넌트가 이미 있는지 확인하고 반드시 재사용할 것.
> 색상/폰트/간격 값은 `design-tokens.md` 참조.

---

## 목차

| 카테고리 | 컴포넌트 |
|---------|---------|
| 버튼 | [Button](#button), [IconButton](#iconbutton), [TextButton](#textbutton), [FloatingButton](#floatingbutton), [ToggleButton](#togglebutton), [ButtonGroup](#buttongroup), [DropdownButton](#dropdownbutton), [SplitButton](#splitbutton) |
| 입력 | [Input](#input), [TextArea](#textarea), [Select](#select), [NumberStepper](#numberstepper), [Slider](#slider), [Checkbox / CheckboxGroup](#checkbox--checkboxgroup), [Switch / SwitchField](#switch--switchfield), [ChoiceChip / ChoiceChipGroup](#choicechip--choicechipgroup), [SegmentedControl](#segmentedcontrol), [Rating](#rating), [DatePicker](#datepicker), [DateRangePicker](#daterangepicker) |
| 칩 | [ActionChip](#actionchip), [FilterChip](#filterchip), [InputChip](#inputchip), [MetaChip](#metachip), [Tag](#tag) |
| 표시 | [Badge](#badge), [Label](#label), [Avatar](#avatar), [Icon](#icon), [PageIndicator](#pageindicator), [StateView](#stateview), [Progress](#progress), [DataList](#datalist) |
| 레이아웃 | [AppLayout](#applayout), [Divider](#divider), [Row](#row), [Card / KpiCard](#card--kpicard), [Skeleton](#skeleton), [SideNavigation](#sidenavigation), [TopNavigation](#topnavigation), [PageHeader](#pageheader) |
| 폼 | [FormLayout / FormItem / FormSection](#formlayout--formitem--formsection), [Searchbox / SearchboxGroup](#searchbox--searchboxgroup), [FilterBar / FilterGroup](#filterbar--filtergroup) |
| 탐색 | [Breadcrumb](#breadcrumb), [Tab](#tab), [Link](#link), [Stepper](#stepper) |
| 오버레이 | [Modal](#modal), [ConfirmDialog](#confirmdialog), [Drawer](#drawer), [Tooltip](#tooltip), [Popover](#popover), [Toast / ToastContainer](#toast--toastcontainer), [Backdrop](#backdrop) |
| 피드백 | [Alert](#alert), [Table](#table), [Pagination](#pagination), [Accordion](#accordion) |

> ℹ️ `Radio / RadioGroup`은 `Checkbox/` 폴더 내에, `CountBadge` / `DotBadge`는 `Badge/` 폴더 내에 구현되어 있다. 정상 사용 가능.

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
| `clearable` | `boolean` | `false` | 입력값 지우기(×) 버튼 표시 |
| `onClear` | `() => void` | — | × 버튼 클릭 콜백 |
| `showCount` | `boolean` | `false` | 글자 수 표시 (`maxLength`와 함께) |
| `textAlign` | `'left' \| 'right'` | — | 텍스트 정렬 |
| `showPasswordToggle` | `boolean` | `false` | 비밀번호 표시/숨김 버튼 (`type="password"`일 때) |
| `search` | `boolean` | `false` | 검색 프리셋 — 검색 아이콘 + clearable 자동 적용 |
| `phone` | `boolean` | `false` | 전화번호 자동 포맷 (010-1234-5678) — `type="tel"` 자동 적용 |
| + HTML input 속성 | | | `placeholder`, `value`, `onChange`, `type`, `maxLength` 등 |

### 사용 예시

```tsx
// 기본
<Input label="이름" placeholder="이름을 입력하세요" />

// 에러 상태
<Input label="이메일" error="올바른 이메일을 입력하세요" value={email} onChange={...} />

// 검색 프리셋 (search 아이콘 + clearable 자동 포함)
<Input search placeholder="검색어 입력" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />

// 글자 수 카운터
<Input label="이름" maxLength={50} showCount fullWidth />

// 비밀번호 토글
<Input type="password" label="비밀번호" showPasswordToggle />

// 우측 정렬 (숫자 입력)
<Input type="number" textAlign="right" suffix="원" />

// prefix 아이콘
<Input prefix={<Icon name="search" size="sm" />} placeholder="검색" />

// 전체 너비
<Input label="주소" fullWidth />
```

---

## Select

**언제 쓰나**: 옵션 목록에서 하나(또는 여러 개) 선택. 드롭다운 형태.

> ⚠️ `onChange`는 value를 직접 받는다 — `e.target.value` 패턴 사용 금지.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `options` | `SelectOptionOrGroup[]` | — | `SelectOption[]` 또는 `SelectOptionGroup[]` 혼합 가능 **(필수)** |
| `label` | `string` | — | 필드 레이블 |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 메시지 |
| `placeholder` | `string` | `'선택하세요'` | 미선택 상태 텍스트 |
| `fieldStyle` | `'outline' \| 'fill' \| 'plain'` | `'outline'` | 스타일 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `fullWidth` | `boolean` | `false` | 너비 100% |
| `disabled` | `boolean` | — | 비활성화 |
| `searchable` | `boolean` | `false` | 드롭다운 내 검색 입력 활성화 |
| `multiple` | `boolean` | `false` | 복수 선택 모드 |
| `value` | `string \| string[]` | — | controlled 선택값 |
| `defaultValue` | `string \| string[]` | — | uncontrolled 기본값 |
| `onChange` | `(value: string \| string[]) => void` | — | 선택 변경 콜백 |
| `loading` | `boolean` | `false` | 옵션 비동기 로딩 상태 (드롭다운 내 로딩 표시) |
| `loadingText` | `string` | `'불러오는 중...'` | 로딩 중 표시 문구 |
| `creatable` | `boolean` | `false` | 검색어를 새 옵션으로 생성 허용 (`searchable` 필요) |
| `onCreateOption` | `(value: string) => void` | — | 새 옵션 생성 시 콜백 |

### SelectOptionGroup 구조

```ts
// 그룹 헤더 포함 옵션
const groupedOptions: SelectOptionOrGroup[] = [
  { group: '과일', options: [{ value: 'apple', label: '사과' }, { value: 'banana', label: '바나나' }] },
  { value: 'etc', label: '기타' },
]
```

### 사용 예시

```tsx
const options = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
]

// 단일 선택
<Select label="국가" options={options} value={country} onChange={(v) => setCountry(v as string)} />

// 복수 선택
<Select
  label="태그"
  options={tagOptions}
  multiple
  value={selectedTags}
  onChange={(v) => setSelectedTags(v as string[])}
/>

// 검색 가능
<Select label="담당자" options={userOptions} searchable value={userId} onChange={(v) => setUserId(v as string)} />

// 에러 상태
<Select label="역할" options={roleOptions} value={role} onChange={(v) => setRole(v as string)} error={errors.role} />
```

---

## Checkbox / CheckboxGroup

**언제 쓰나**: 단일 항목 체크(`Checkbox`), 또는 옵션 목록 복수 선택(`CheckboxGroup`).

### Checkbox Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 레이블 |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 메시지 |
| `indeterminate` | `boolean` | `false` | 중간 선택 상태 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `disabled` | `boolean` | — | 비활성화 |
| `readOnly` | `boolean` | — | 읽기 전용 |
| + HTML input 속성 | | | `checked`, `onChange` 등 |

### CheckboxGroup Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `options` | `CheckboxGroupOption[]` | — | **(필수)** `{ value, label, hint?, disabled? }` 배열 |
| `value` | `string[]` | — | controlled 선택값 |
| `defaultValue` | `string[]` | `[]` | uncontrolled 기본값 |
| `onChange` | `(value: string[]) => void` | — | 선택 변경 |
| `label` | `string` | — | 그룹 제목 |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 메시지 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `selectAll` | `boolean` | `false` | 전체 선택 헤더 표시 |
| `selectAllLabel` | `string` | `'전체 선택'` | 전체 선택 헤더 레이블 |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | 나열 방향 |
| `disabled` | `boolean` | — | 전체 비활성화 |
| `readOnly` | `boolean` | — | 전체 읽기 전용 |

### 사용 예시

```tsx
// 단일 Checkbox
<Checkbox label="전체 동의" checked={allChecked} onChange={handleAll} />
<Checkbox label="전체 선택" indeterminate={someChecked} checked={allChecked} onChange={handleAll} />

// CheckboxGroup (권장)
<CheckboxGroup
  label="권한"
  options={[
    { value: 'read', label: '조회' },
    { value: 'write', label: '편집' },
    { value: 'delete', label: '삭제', hint: '주의 필요' },
  ]}
  value={selected}
  onChange={setSelected}
  selectAll
/>

// 가로 나열
<CheckboxGroup options={options} direction="horizontal" />
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

## ChoiceChip / ChoiceChipGroup

**언제 쓰나**: 고정된 옵션 목록에서 단일/복수 선택. 옵션이 5개 이하이고 레이블이 짧을 때. Filter Box의 TYPE 2 구현에 사용.

### ChoiceChipGroup Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `selectionType` | `'single' \| 'multiple'` | `'multiple'` | 선택 유형 |
| `layout` | `'wrap' \| 'scroll'` | `'wrap'` | 줄바꿈 또는 가로 스크롤 |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | 칩 크기 |
| `value` | `string[]` | — | controlled 선택값 |
| `defaultValue` | `string[]` | `[]` | uncontrolled 기본값 |
| `onChange` | `(value: string[]) => void` | — | 선택 변경 |
| `label` | `string` | — | 그룹 레이블 |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 메시지 |
| `disabled` | `boolean` | `false` | 전체 비활성화 |

### ChoiceChipGroupItem Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `value` | `string` | — | **(필수)** 이 항목의 값 |
| `label` | `string` | — | **(필수)** 레이블 |
| `disabled` | `boolean` | — | 개별 비활성화 |

### 사용 예시

```tsx
// 단일 선택 (filter에서 TYPE 2)
<ChoiceChipGroup selectionType="single" value={selected} onChange={(v) => setSelected(v)}>
  <ChoiceChipGroupItem value="web" label="Web" />
  <ChoiceChipGroupItem value="app" label="App" />
  <ChoiceChipGroupItem value="admin" label="Admin" />
</ChoiceChipGroup>

// 복수 선택
<ChoiceChipGroup selectionType="multiple" defaultValue={['active']}>
  <ChoiceChipGroupItem value="active" label="활성" />
  <ChoiceChipGroupItem value="inactive" label="비활성" />
  <ChoiceChipGroupItem value="pending" label="대기" />
</ChoiceChipGroup>
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
<Label color="warning" icon={<Icon name="warning" size="xs" />}>주의</Label>
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

**언제 쓰나**: SVG 아이콘 표시. 아래 목록에 있는 이름만 사용 가능. **목록 외 이름은 렌더링되지 않으므로 반드시 아래 목록에서 선택할 것.**

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `name` | `IconName` | — | **(필수)** 아이콘 이름 — 아래 전체 목록 참조 |
| `variant` | `'solid' \| 'outline' \| 'outline_thin'` | `'outline'` | 스타일 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 크기 (12/16/20/24/28px) |
| `label` | `string` | — | 접근성 레이블 (없으면 aria-hidden) |

### 사용 가능한 아이콘 전체 목록

> ⚠️ **이 목록에 없는 이름(`chart_bar`, `home`, `truck` 등)을 사용하면 아무것도 렌더링되지 않는다.**

| 카테고리 | 아이콘 이름 |
|---------|-----------|
| 방향/화살표 | `chevron_up` `chevron_down` `chevron_left` `chevron_right` |
| 방향/화살표(소) | `chevron_up_small` `chevron_down_small` `chevron_left_small` `chevron_right_small` |
| 방향/화살표(더블) | `chevron_double_left` `chevron_double_right` |
| 화살표 | `arrow_up` `arrow_down` `arrow_left` `arrow_right` |
| 닫기/확인 | `x` `x_small` `check` `check_circle` `x_circle` |
| 상태/정보 | `information` `warning` `failure` `question` |
| 추가/제거 | `plus` `minus` |
| 액션 | `search` `refresh` `filter` `setting` `delete` `write` |
| 보기 | `eyes_on` `eyes_off` |
| 기타 | `calendar` `person` `bell` `bookmark` `star` `star_rounded` |
| 더보기 | `more_horizontal` `more_vertical` `drag_dot` |

### 사용 예시

```tsx
<Icon name="search" size="sm" />
<Icon name="check" variant="solid" size="md" label="확인" />
<Icon name="chevron_right" size="xs" />
<Icon name="calendar" size="sm" />
<Icon name="more_vertical" size="sm" />
```

---

## AppLayout

**언제 쓰나**: 백오피스 전체 페이지 레이아웃. TopNavigation + SideNavigation + 콘텐츠 영역을 하나로 조합.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `topNav` | `ReactNode` | — | **(필수)** 상단 네비게이션 영역 |
| `sideNav` | `ReactNode` | — | **(필수)** 좌측 네비게이션 영역 |
| `children` | `ReactNode` | — | **(필수)** 메인 콘텐츠 |

### 레이아웃 치수 (Figma 기준)

| 영역 | 값 |
|-----|---|
| AppLayout side-nav 슬롯 너비 | `250px` |
| LNB 내부 padding | `24px` (상하좌우 동일) |
| SideNavigation 실제 너비 | `202px` (= 250 - 24×2) |
| NavItem 너비 | `202px` (100%) |

### 사용 예시

```tsx
// ✅ 올바른 LNB 구성 — sideNav 슬롯에 padding 24px wrapper 필수
<AppLayout
  topNav={topNavContent}
  sideNav={
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SideNavigation tone="accent" style={{ flex: 1 }}>
        <SideNavigationList>
          <NavSectionHeader>메뉴 섹션</NavSectionHeader>
          <NavItem as="button" tone="accent" current leadingIcon={<Icon name="person" size="sm" />}>
            현재 메뉴
          </NavItem>
          <NavItem as="button" tone="accent" leadingIcon={<Icon name="setting" size="sm" />}>
            다른 메뉴
          </NavItem>
        </SideNavigationList>
      </SideNavigation>
    </div>
  }
>
  <YourPageContent />
</AppLayout>

// ❌ 잘못된 패턴 — padding 없이 직접 SideNavigation 배치
// sideNav={<SideNavigation>...</SideNavigation>}
// → NavItem 배경이 컨테이너를 벗어나 좌우 여백 비대칭 발생
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
| `subtitle` | `ReactNode` | — | 제목 아래 보조 설명 |
| `children` | `ReactNode` | — | 본문 |
| `footer` | `ReactNode` | — | 커스텀 footer (지정 시 footerVariation 무시) |
| `footerVariation` | `'primary' \| 'neutral' \| 'danger'` | — | 표준 버튼 구성 자동 생성 |
| `primaryLabel` | `string` | `'확인'` | footerVariation 사용 시 주 버튼 레이블 |
| `secondaryLabel` | `string` | `'취소'` | footerVariation 사용 시 보조 버튼 레이블 |
| `onPrimaryAction` | `() => void` | — | 주 버튼 클릭 핸들러 |
| `onSecondaryAction` | `() => void` | — | 보조 버튼 클릭 핸들러 (없으면 onClose) |
| `showSecondaryAction` | `boolean` | `true` | 보조 버튼 표시 여부 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 (360/520/640px) |
| `closeOnOverlayClick` | `boolean` | `true` | 배경 클릭 시 닫힘 |

### 사용 예시

```tsx
// 커스텀 footer
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="사용자 정보 수정"
  subtitle="변경된 내용은 즉시 반영됩니다."
  footer={
    <>
      <Button tone="secondary" variant="outline" onClick={() => setIsOpen(false)}>취소</Button>
      <Button onClick={handleSave}>저장</Button>
    </>
  }
>
  <Input label="이름" fullWidth />
</Modal>

// footerVariation — danger (확인 대화상자)
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="사용자 삭제"
  subtitle="이 작업은 되돌릴 수 없습니다."
  size="sm"
  footerVariation="danger"
  primaryLabel="삭제"
  onPrimaryAction={handleDelete}
>
  <p>정말로 삭제하시겠습니까?</p>
</Modal>

// footerVariation — neutral (단순 알림)
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="알림"
  size="sm"
  footerVariation="neutral"
  primaryLabel="확인"
  showSecondaryAction={false}
  onPrimaryAction={() => setIsOpen(false)}
>
  <p>처리가 완료되었습니다.</p>
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
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` | 위치 |
| `delay` | `number` | `300` | 표시 지연 (ms) |
| `disabled` | `boolean` | `false` | 비활성화 |

### 사용 예시

```tsx
<Tooltip content="삭제합니다">
  <Button tone="danger" iconOnly leadingIcon={<Icon name="delete" size="sm" />} />
</Tooltip>

<Tooltip content="더 자세한 설명" placement="right">
  <Icon name="information" size="sm" />
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
| `selectedKeys` | `Set<string>` | — | 선택된 행의 rowKey 집합 — 다중 선택 (체크박스 모드) |
| `onSelectionChange` | `(keys: Set<string>) => void` | — | 다중 선택 변경 콜백 |
| `selectedKey` | `string` | — | 선택된 행의 rowKey — 단일 선택 (라디오 모드) |
| `onSelectedKeyChange` | `(key: string) => void` | — | 단일 선택 변경 콜백 |
| `expandable` | `{ render: (row) => ReactNode; defaultExpandedKeys?: string[] }` | — | 행 확장(아코디언) — `render`로 펼쳐진 행 콘텐츠 정의 |
| `onCellEdit` | `(rowKey, colKey, newValue: string) => void` | — | 셀 인라인 편집 완료 콜백 (`TableColumn.editable` 필요) |

### TableColumn 정의

```ts
{
  key: string            // 데이터 키
  header: ReactNode      // 헤더 텍스트
  render?: (row, index) => ReactNode  // 커스텀 셀 렌더
  sortable?: boolean     // 정렬 가능 여부
  editable?: boolean     // 셀 인라인 편집 허용 (onCellEdit과 함께 사용)
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

// 행 선택 (selectedKeys 제공 시 헤더 체크박스 자동 활성화 — selectable prop 없음)
const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())

<Table
  columns={columns}
  data={users}
  rowKey="id"
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
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
    <NavItem as="button" current leadingIcon={<Icon name="more_horizontal" size="sm" />}>대시보드</NavItem>
    <NavItem as="button" leadingIcon={<Icon name="person" size="sm" />}>사용자 관리</NavItem>
    <NavSectionHeader>설정</NavSectionHeader>
    <NavItem as="button" leadingIcon={<Icon name="setting" size="sm" />}>일반 설정</NavItem>
  </SideNavigationList>
</SideNavigation>

// depth 2 — 하위 메뉴
<NavItem as="button" depth={2} leadingIcon={<Icon name="person" size="sm" />}>역할 관리</NavItem>
```

---

## Pagination

**언제 쓰나**: Table 하단 페이지 탐색. 전체 아이템 수와 현재 페이지를 받아 페이지 버튼을 렌더.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `total` | `number` | — | **(필수)** 전체 아이템 수 |
| `page` | `number` | — | **(필수)** 현재 페이지 (1-based) |
| `onChange` | `(page: number) => void` | — | **(필수)** 페이지 변경 콜백 |
| `pageSize` | `number` | `10` | 페이지당 아이템 수 |
| `variant` | `'default' \| 'minimal'` | `'default'` | `default`=번호 버튼, `minimal`=현재/전체 텍스트만 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `siblingCount` | `number` | `1` | 현재 페이지 양쪽에 표시할 페이지 버튼 수 |
| `pageSizeOptions` | `number[]` | — | 페이지당 행 수 선택 UI 표시 (`onPageSizeChange` 필요) |
| `onPageSizeChange` | `(pageSize: number) => void` | — | 페이지 크기 변경 콜백 |

### 사용 예시

```tsx
// 기본 (Table과 함께)
const [page, setPage] = useState(1)

<Table columns={columns} data={pagedData} rowKey="id" />
<Pagination total={totalCount} page={page} pageSize={20} onChange={setPage} />

// minimal — 공간 적을 때
<Pagination total={500} page={page} onChange={setPage} variant="minimal" size="sm" />
```

---

---

## IconButton

**언제 쓰나**: 아이콘 하나로 동작을 트리거하는 버튼. 툴바, 테이블 행 액션, 닫기 버튼 등. `aria-label` 필수.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `icon` | `ReactNode` | — | **(필수)** 아이콘 |
| `aria-label` | `string` | — | **(필수)** 접근성 레이블 |
| `variant` | `'soft' \| 'outline' \| 'ghost'` | `'ghost'` | 스타일 형태 |
| `shape` | `'circle' \| 'rounded'` | `'circle'` | 형태 |
| `emphasis` | `'default' \| 'subdued'` | `'default'` | 강도 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `loading` | `boolean` | `false` | 로딩 스피너 |
| `disabled` | `boolean` | — | 비활성화 |

### 사용 예시

```tsx
<IconButton icon={<Icon name="x" size="sm" />} aria-label="닫기" />
<IconButton icon={<Icon name="write" size="sm" />} aria-label="편집" variant="soft" />
<IconButton icon={<Icon name="delete" size="sm" />} aria-label="삭제" variant="outline" emphasis="subdued" />
```

---

## TextButton

**언제 쓰나**: 텍스트 형태의 버튼. 링크처럼 보이는 인라인 액션, "더보기" 등. href 제공 시 `<a>`로 렌더.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `variant` | `'plain' \| 'chevron' \| 'underline'` | `'plain'` | 스타일 — `chevron`은 뒤에 화살표 자동 추가 |
| `tone` | `'accent' \| 'neutral' \| 'neutralMuted' \| 'danger'` | `'accent'` | 색상 의미 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `leadingIcon` | `ReactNode` | — | 앞 아이콘 |
| `href` | `string` | — | 링크 URL (제공 시 `<a>` 렌더) |
| `disabled` | `boolean` | — | 비활성화 |

### 사용 예시

```tsx
<TextButton>더보기</TextButton>
<TextButton variant="chevron" tone="accent">전체 보기</TextButton>
<TextButton variant="underline" tone="neutral" href="/docs">문서 보기</TextButton>
<TextButton tone="danger" leadingIcon={<Icon name="delete" size="sm" />}>삭제</TextButton>
```

---

## FloatingButton

**언제 쓰나**: 화면 고정 위치의 주요 액션 버튼 (FAB). circle(아이콘만) 또는 extended(아이콘+텍스트) 형태.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `icon` | `ReactNode` | — | **(필수)** 아이콘 |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | 색상 형태 |
| `shape` | `'circle' \| 'extended'` | `'circle'` | 형태 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `label` | `ReactNode` | — | extended 형태에서 아이콘 옆 텍스트 |
| `loading` | `boolean` | `false` | 로딩 스피너 |
| `disabled` | `boolean` | — | 비활성화 |

### 사용 예시

```tsx
// 원형
<FloatingButton icon={<Icon name="plus" size="md" />} aria-label="추가" />

// 확장형 (아이콘 + 텍스트)
<FloatingButton shape="extended" icon={<Icon name="plus" size="sm" />} label="새 항목" />
```

---

## ToggleButton

**언제 쓰나**: 선택/해제가 가능한 버튼. 필터 칩, 뷰 전환 등 on/off 상태를 가지는 버튼.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `selected` | `boolean` | `false` | 선택 상태 |
| `onSelectedChange` | `(selected: boolean) => void` | — | 토글 콜백 |
| `emphasis` | `'onDefault' \| 'onSelect'` | `'onDefault'` | `onDefault`: 선택 시 primary fill / `onSelect`: 선택 시 accent soft |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | 크기 |
| `iconOnly` | `boolean` | `false` | 아이콘만 표시 |
| `leadingIcon` | `ReactNode` | — | 앞 아이콘 |
| `loading` | `boolean` | `false` | 로딩 스피너 |
| `disabled` | `boolean` | — | 비활성화 |

### 사용 예시

```tsx
<ToggleButton selected={isActive} onSelectedChange={setIsActive}>활성</ToggleButton>
<ToggleButton emphasis="onSelect" selected={isGrid} onSelectedChange={setIsGrid} leadingIcon={<Icon name="more_horizontal" size="sm" />}>그리드</ToggleButton>
```

---

## ButtonGroup

**언제 쓰나**: 여러 버튼을 그룹으로 묶어 배치. 레이아웃 래퍼 역할만 함.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `layout` | `'inline' \| 'stack'` | `'inline'` | 가로/세로 배치 |
| `distribution` | `'content' \| 'equal'` | `'content'` | 버튼 너비 분배 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 기준 크기 |
| `children` | `ReactNode` | — | **(필수)** 버튼 목록 |

### 사용 예시

```tsx
<ButtonGroup>
  <Button tone="secondary" variant="outline">취소</Button>
  <Button>저장</Button>
</ButtonGroup>

// 전체 너비 균등 분배
<ButtonGroup layout="stack" distribution="equal">
  <Button variant="outline">이전</Button>
  <Button>다음</Button>
</ButtonGroup>
```

---

## TextArea

**언제 쓰나**: 여러 줄 텍스트 입력. label, 에러, 글자 수 카운터 내장.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 레이블 |
| `hint` | `string` | — | 도움말 텍스트 |
| `error` | `string` | — | 에러 메시지 (있으면 hint 숨김) |
| `fieldStyle` | `'outline' \| 'fill'` | `'outline'` | 스타일 형태 |
| `size` | `'md' \| 'lg'` | `'lg'` | 크기 |
| `fullWidth` | `boolean` | `false` | 너비 100% |
| `showCount` | `boolean` | `false` | 글자 수 카운터 표시 (maxLength와 함께) |
| `readOnly` | `boolean` | `false` | 읽기 전용 |
| `disabled` | `boolean` | — | 비활성화 |
| + HTML textarea 속성 | | | `value`, `onChange`, `maxLength`, `rows` 등 |

### 사용 예시

```tsx
<TextArea label="설명" placeholder="내용을 입력하세요" />

// 글자 수 제한 + 카운터
<TextArea label="메모" maxLength={200} showCount fullWidth />

// 에러 상태
<TextArea label="사유" error="필수 입력 항목입니다." value={reason} onChange={(e) => setReason(e.target.value)} />
```

---

## NumberStepper

**언제 쓰나**: 숫자를 + / - 버튼으로 증감. 수량, 페이지 번호 등.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `value` | `number` | — | **(필수)** 현재 값 |
| `onChange` | `(value: number) => void` | — | **(필수)** 변경 콜백 |
| `min` | `number` | — | 최솟값 |
| `max` | `number` | — | 최댓값 |
| `step` | `number` | `1` | 증감 단위 |
| `emphasis` | `'outline' \| 'soft'` | `'outline'` | 스타일 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `disabled` | `boolean` | `false` | 비활성화 |

### 사용 예시

```tsx
<NumberStepper value={qty} onChange={setQty} min={1} max={99} />
<NumberStepper value={count} onChange={setCount} step={5} emphasis="soft" />
```

---

## SegmentedControl

**언제 쓰나**: 2~5개 옵션 중 하나 선택. 뷰 전환, 필터 탭 등 상호 배타적 선택.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `items` | `SegmentItem[]` | — | **(필수)** `{ key, label, disabled? }` 배열 |
| `value` | `string` | — | controlled 선택값 |
| `defaultValue` | `string` | — | uncontrolled 기본값 |
| `onChange` | `(key: string) => void` | — | 선택 변경 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `width` | `'equal' \| 'content'` | `'equal'` | 세그먼트 너비 분배 |

### 사용 예시

```tsx
<SegmentedControl
  items={[
    { key: 'list', label: '목록' },
    { key: 'grid', label: '그리드' },
    { key: 'chart', label: '차트' },
  ]}
  value={viewMode}
  onChange={setViewMode}
/>
```

---

## Rating

**언제 쓰나**: 별점 표시 또는 입력. `onChange` 없으면 읽기 전용.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `value` | `number` | — | **(필수)** 현재 점수 |
| `onChange` | `(value: number) => void` | — | 입력 콜백 (없으면 read-only) |
| `count` | `number` | `5` | 별 개수 |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | 크기 |
| `readOnly` | `boolean` | `false` | 읽기 전용 강제 |

### 사용 예시

```tsx
// 표시 전용
<Rating value={4} readOnly />

// 입력
<Rating value={rating} onChange={setRating} count={5} />
```

---

## PageIndicator

**언제 쓰나**: 캐러셀, 온보딩 등 현재 페이지 위치를 점으로 표시. 상호작용 없음.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `count` | `number` | — | **(필수)** 전체 페이지 수 |
| `activeIndex` | `number` | — | **(필수)** 현재 페이지 인덱스 (0-based) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `appearance` | `'default' \| 'onImage'` | `'default'` | 배경에 따른 색상 |

### 사용 예시

```tsx
<PageIndicator count={5} activeIndex={currentStep} />
<PageIndicator count={3} activeIndex={slide} appearance="onImage" size="sm" />
```

---

## Breadcrumb

**언제 쓰나**: 현재 페이지의 계층 경로 표시. 페이지 상단에 배치.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `items` | `BreadcrumbItem[]` | — | **(필수)** `{ label, href?, onClick? }` 배열 — 마지막 항목이 현재 페이지 |
| `separator` | `'chevron' \| 'slash' \| 'dot'` | `'chevron'` | 구분자 형태 |
| `leading` | `'none' \| 'home'` | `'none'` | 홈 아이콘 표시 여부 |

### 사용 예시

```tsx
<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: '사용자 관리', href: '/users' },
    { label: '상세' },
  ]}
/>

<Breadcrumb
  leading="home"
  separator="slash"
  items={[
    { label: '대시보드', onClick: () => navigate('/') },
    { label: '설정' },
  ]}
/>
```

---

## Tab

**언제 쓰나**: 콘텐츠 영역을 여러 탭으로 구분. 탭 간 전환은 상태로 관리.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `items` | `TabItem[]` | — | **(필수)** `{ key, label, trailing?, disabled? }` 배열 |
| `activeKey` | `string` | — | controlled 활성 탭 |
| `defaultActiveKey` | `string` | — | uncontrolled 기본값 |
| `onChange` | `(key: string) => void` | — | 탭 변경 콜백 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | 크기 |
| `distribution` | `'equal' \| 'content'` | `'equal'` | 탭 너비 분배 |

### 사용 예시

```tsx
const tabs = [
  { key: 'info', label: '기본 정보' },
  { key: 'history', label: '이력', trailing: <CountBadge count={3} size="sm" /> },
  { key: 'settings', label: '설정' },
]

<Tab items={tabs} activeKey={activeTab} onChange={setActiveTab} />

// 탭에 따른 콘텐츠 렌더
{activeTab === 'info' && <InfoPanel />}
{activeTab === 'history' && <HistoryPanel />}
```

---

## Link

**언제 쓰나**: 텍스트 링크. 인라인 네비게이션, 외부 링크.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `tone` | `'brand' \| 'neutral'` | `'brand'` | 색상 |
| `underline` | `'always' \| 'auto' \| 'none'` | `'always'` | 밑줄 표시 시점 |
| `disabled` | `boolean` | `false` | 비활성화 (href 제거, 클릭 차단) |
| + HTML anchor 속성 | | | `href`, `target`, `rel` 등 |

### 사용 예시

```tsx
<Link href="/users">사용자 목록으로</Link>
<Link href="https://example.com" target="_blank" tone="neutral" underline="auto">외부 링크</Link>
```

---

## Row

**언제 쓰나**: 목록에서 단일 행 아이템. 아이콘/아바타 + 텍스트 + 우측 액션 조합. href 또는 onClick에 따라 `<a>` / `<button>` / `<div>` 로 렌더.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `ReactNode` | — | **(필수)** 주 텍스트 |
| `leading` | `ReactNode` | — | 좌측 아이콘/아바타 |
| `trailing` | `ReactNode` | — | 우측 커스텀 요소 |
| `showChevron` | `boolean` | `true` | trailing 없을 때 chevron 표시 |
| `href` | `string` | — | 링크 URL |
| `onClick` | `() => void` | — | 클릭 핸들러 |
| `disabled` | `boolean` | `false` | 비활성화 |

### 사용 예시

```tsx
<Row label="사용자 관리" leading={<Icon name="person" size="sm" />} onClick={() => navigate('/users')} />
<Row label="설정" leading={<Avatar src="/img.jpg" size="sm" />} trailing={<Badge variant="info">새로운</Badge>} href="/settings" />
```

---

## Popover

**언제 쓰나**: 버튼 클릭 시 나타나는 컨텍스트 패널. 위치 제어는 사용자가 직접 관리. `PopoverSection`으로 내용을 구조화.

### Props (Popover)

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `emphasis` | `'default' \| 'inverse'` | `'default'` | `default`=흰 배경, `inverse`=어두운 배경 |
| `children` | `ReactNode` | — | 내용 |

### Props (PopoverSection)

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `title` | `ReactNode` | — | 섹션 제목 |
| `children` | `ReactNode` | — | **(필수)** 섹션 내용 |

### 사용 예시

```tsx
{isOpen && (
  <div style={{ position: 'absolute', top: 40, right: 0 }}>
    <Popover>
      <PopoverSection title="계정">
        <TextButton onClick={handleProfile}>프로필 수정</TextButton>
      </PopoverSection>
      <PopoverSection>
        <TextButton tone="danger" onClick={handleLogout}>로그아웃</TextButton>
      </PopoverSection>
    </Popover>
  </div>
)}
```

---

## Accordion

**언제 쓰나**: FAQ, 설정 패널 등 접기/펼치기가 필요한 콘텐츠 목록.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `items` | `AccordionItem[]` | — | **(필수)** 아코디언 항목 배열 |
| `variation` | `'plain' \| 'contained'` | `'plain'` | 스타일 형태 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | 크기 |
| `allowMultiple` | `boolean` | `true` | 여러 항목 동시 펼침 허용 |

### AccordionItem 정의

```ts
{
  key: string
  label: React.ReactNode    // 헤더 텍스트
  content: React.ReactNode  // 펼쳐질 내용
  leading?: React.ReactNode // 헤더 앞 아이콘
  defaultOpen?: boolean     // 초기 열림 여부
  disabled?: boolean
}
```

### 사용 예시

```tsx
<Accordion
  items={[
    {
      key: 'faq1',
      label: '비밀번호를 변경하려면?',
      content: <p>설정 → 보안 → 비밀번호 변경 메뉴를 이용하세요.</p>,
      defaultOpen: true,
    },
    {
      key: 'faq2',
      label: '탈퇴는 어떻게 하나요?',
      content: <p>고객센터로 문의해 주세요.</p>,
    },
  ]}
/>

// 하나씩만 열리는 FAQ
<Accordion items={faqItems} allowMultiple={false} variation="contained" />
```

---

---

## TopNavigation

**언제 쓰나**: 서비스 상단 고정 글로벌 네비게이션 바. 로고, 메뉴 링크, 우측 액션 영역(알림/설정/아바타 또는 로그인 버튼)을 포함한다.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `size` | `'sm' \| 'md'` | `'sm'` | 높이 (sm: 56px) |
| `brand` | `'mgWrap' \| 'ignite'` | `'mgWrap'` | 로고 브랜드 |
| `logoSrc` | `string` | — | 커스텀 로고 이미지 src (brand 무시) |
| `onLogoClick` | `() => void` | — | 로고 클릭 핸들러 |
| `items` | `TopNavItem[]` | `[]` | 네비게이션 메뉴 목록 |
| `trailing` | `'userActions' \| 'authActions'` | `'userActions'` | 우측 영역 변형 |
| `scrolled` | `boolean` | `false` | 스크롤 시 overlay 표시 |
| `onNotificationClick` | `() => void` | — | [userActions] 알림 버튼 클릭 |
| `onSettingsClick` | `() => void` | — | [userActions] 설정 버튼 클릭 |
| `avatarSrc` | `string` | — | [userActions] 아바타 이미지 src |
| `onAvatarClick` | `() => void` | — | [userActions] 아바타 클릭 |
| `onLoginClick` | `() => void` | — | [authActions] 로그인 버튼 클릭 |

#### TopNavItem

| Prop | Type | 설명 |
|------|------|------|
| `label` | `string` | 메뉴 텍스트 |
| `href` | `string` | 링크 주소 (없으면 button) |
| `current` | `boolean` | 현재 페이지 표시 |
| `disabled` | `boolean` | 비활성화 |
| `onClick` | `() => void` | 클릭 핸들러 |

### 사용 예시

```tsx
// 로그인 상태 (기본)
<TopNavigation
  items={[
    { label: '대시보드', href: '/', current: true },
    { label: '회원관리', href: '/users' },
    { label: '정산', href: '/billing' },
  ]}
  onNotificationClick={() => {}}
  onSettingsClick={() => {}}
  onAvatarClick={() => {}}
/>

// 비로그인 상태
<TopNavigation trailing="authActions" onLoginClick={() => {}} />

// 스크롤 overlay 활성화
<TopNavigation scrolled={true} />
```

---

## Slider

**언제 쓰나**: 연속적인 숫자 범위에서 값을 선택할 때. 볼륨, 밝기, 범위 필터 등.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `min` | `number` | `0` | 최솟값 |
| `max` | `number` | `100` | 최댓값 |
| `value` | `number` | — | 현재 값 (제어) |
| `defaultValue` | `number` | — | 기본값 (비제어) |
| `step` | `number` | `1` | 증가 단위 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `onChange` | `(value: number) => void` | — | 값 변경 콜백 |
| `leadingIcon` | `ReactNode` | — | 트랙 앞 아이콘 |
| `trailingIcon` | `ReactNode` | — | 트랙 뒤 아이콘 |

### 사용 예시

```tsx
// 기본
<Slider value={volume} onChange={setVolume} />

// 범위 설정
<Slider min={0} max={200} step={10} defaultValue={50} />

// 아이콘 포함 (볼륨 슬라이더)
// ⚠️ volume_off, volume_up 아이콘은 없음 — 대신 minus/plus 사용
<Slider
  value={volume}
  onChange={setVolume}
  leadingIcon={<Icon name="minus" size="sm" />}
  trailingIcon={<Icon name="plus" size="sm" />}
/>

// 비활성화
<Slider value={30} disabled />
```

---

## StateView

**언제 쓰나**: 데이터가 없거나 오류가 발생했을 때 테이블/리스트 영역에 표시. 빈 상태(empty)와 오류 상태(error) 두 가지 변형.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `variant` | `'error' \| 'empty'` | `'error'` | 상태 유형 |
| `title` | `string` | variant별 기본값 | 헤드라인 텍스트 |
| `description` | `ReactNode` | variant별 기본값 | 본문 설명 |
| `actionLabel` | `string` | `'다시 불러오기'` | 액션 버튼 레이블 |
| `onAction` | `() => void` | — | 액션 버튼 클릭 핸들러 (없으면 버튼 미표시) |
| `icon` | `ReactNode` | variant별 자동 결정 | 아이콘 오버라이드 |

### 기본 타이틀/설명

| variant | 기본 title | 기본 description |
|---------|-----------|-----------------|
| `error` | 일시적으로 정보를 불러오지 못했어요 | 시스템에 문제가 생겨... |
| `empty` | 검색 결과가 없어요 | 입력한 조건과 일치하는 항목이 없어요... |

### 사용 예시

```tsx
// 오류 상태 (기본값으로 충분)
<StateView variant="error" onAction={refetch} />

// 빈 상태
<StateView variant="empty" onAction={refetch} />

// 커스텀 메시지
<StateView
  variant="empty"
  title="등록된 회원이 없어요"
  description="신규 회원을 추가해 보세요."
  actionLabel="회원 추가"
  onAction={openAddModal}
/>

// 액션 없이 (버튼 미표시)
<StateView variant="empty" title="데이터가 없습니다" />
```

---

---

## ActionChip

**언제 쓰나**: 클릭 가능한 단독 칩. 필터, 액션 트리거 등 인터랙티브 칩.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | **(필수)** 텍스트 |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | 크기 |
| `leading` | `ReactNode` | — | 앞 아이콘 |
| `trailing` | `ReactNode` | — | 뒤 아이콘 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `onClick` | `() => void` | — | 클릭 핸들러 |

### 사용 예시

```tsx
<ActionChip label="필터 적용" onClick={handleApply} />
<ActionChip label="내보내기" leading={<Icon name="arrow_down" size="xs" />} size="sm" />
```

---

## FilterChip

**언제 쓰나**: 선택/해제 가능한 필터 칩. 선택 시 value 레이블 표시.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | **(필수)** 칩 레이블 |
| `selectedValue` | `string` | — | 선택 시 표시 값 (예: "서울") |
| `selected` | `boolean` | `false` | 선택 상태 |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | 크기 |
| `leading` | `ReactNode` | — | 앞 아이콘 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `onClick` | `() => void` | — | 클릭 핸들러 |

### 사용 예시

```tsx
<FilterChip label="지역" selected={!!region} selectedValue={region} onClick={openRegionPicker} />
<FilterChip label="상태" selected={status === 'active'} selectedValue="활성" onClick={toggleStatus} />
```

---

## InputChip

**언제 쓰나**: 선택된 값을 칩 형태로 표시. 태그 입력, 필터 활성 표시에 사용.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | **(필수)** 텍스트 |
| `value` | `string` | — | **(필수)** 칩 식별자 |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | 크기 |
| `variation` | `'neutral' \| 'accent'` | `'neutral'` | 색상 |
| `leading` | `ReactNode` | — | 앞 아이콘 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `onRemove` | `(value: string) => void` | — | 제거 콜백 |

### 사용 예시

```tsx
{activeFilters.map(f => (
  <InputChip key={f.key} label={f.label} value={f.key} onRemove={removeFilter} />
))}
```

---

## MetaChip

**언제 쓰나**: 읽기 전용 메타데이터 표시. 카테고리, 키-값 쌍 표시. 상호작용 없음.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | **(필수)** 레이블 |
| `value` | `string` | — | 값 (있으면 `레이블: 값` 형태) |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | 크기 |
| `leading` | `ReactNode` | — | 앞 아이콘 |

### 사용 예시

```tsx
<MetaChip label="카테고리" value="B2B" />
<MetaChip label="버전" value="2.1.0" leading={<Icon name="information" size="xs" />} />
```

---

## Tag

**언제 쓰나**: 삭제 가능한 태그. 선택된 항목 표시, 키워드 태그 등.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | — | **(필수)** 텍스트 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `tone` | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | 색상 |
| `icon` | `ReactNode` | — | 앞 아이콘 |
| `onRemove` | `() => void` | — | 삭제 콜백 (있으면 × 버튼 표시) |
| `removeLabel` | `string` | `'삭제'` | × 버튼 aria-label |
| `disabled` | `boolean` | `false` | 비활성화 |

### 사용 예시

```tsx
<Tag onRemove={() => removeTag('react')}>React</Tag>
<Tag tone="primary" icon={<Icon name="star" size="xs" />}>추천</Tag>
<Tag tone="success" size="sm">활성</Tag>
```

---

## Progress

**언제 쓰나**: 작업 진행률 표시. 파일 업로드, 단계 완료 등. `value` 없으면 indeterminate(무한 로딩).

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `value` | `number` | — | 진행률 (없으면 indeterminate) |
| `max` | `number` | `100` | 최대값 |
| `size` | `'xs' \| 'sm' \| 'md'` | `'sm'` | 굵기 |
| `tone` | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 색상 |
| `label` | `string` | — | aria-label |
| `showValue` | `boolean` | `false` | 퍼센트 텍스트 표시 |

### 사용 예시

```tsx
// 확정 진행률
<Progress value={70} tone="primary" showValue />

// 단계별 완료
<Progress value={steps.completed} max={steps.total} tone="success" />

// Indeterminate (로딩 중)
<Progress label="불러오는 중..." />
```

---

## DataList

**언제 쓰나**: 라벨-값 쌍을 목록으로 표시. 상세 정보 패널, 읽기 전용 폼 뷰.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `items` | `DataItem[]` | — | **(필수)** `{ label, value, emptyText?, fullWidth? }` 배열 |
| `layout` | `'vertical' \| 'horizontal'` | `'horizontal'` | 라벨-값 배치 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `divider` | `boolean` | `true` | 항목 사이 구분선 |
| `columns` | `1 \| 2 \| 3` | `2` | 열 수 |

### 사용 예시

```tsx
<DataList
  columns={2}
  items={[
    { label: '이름', value: user.name },
    { label: '이메일', value: user.email },
    { label: '역할', value: user.role },
    { label: '가입일', value: user.createdAt },
    { label: '메모', value: user.memo, fullWidth: true },
  ]}
/>
```

---

## Card / KpiCard

**언제 쓰나**: `Card`는 콘텐츠를 섹션으로 묶는 컨테이너. `KpiCard`는 수치 지표를 대시보드에 표시.

### Card Sub-components

`Card`, `CardHeader`, `CardBody`, `CardFooter`

### Card Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | — | **(필수)** |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 내부 패딩 |
| `bordered` | `boolean` | `true` | 테두리 |
| `shadow` | `boolean` | `false` | 그림자 |

### KpiCard Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | **(필수)** 지표 이름 |
| `value` | `string \| number` | — | **(필수)** 주요 수치 |
| `unit` | `string` | — | 단위 (예: "명", "%") |
| `change` | `number` | — | 전기 대비 변화량 |
| `trend` | `'up' \| 'down'` | — | 추세 방향 |
| `icon` | `ReactNode` | — | 아이콘 |
| `description` | `string` | — | 보조 설명 |

### 사용 예시

```tsx
// 기본 Card
<Card>
  <CardHeader>섹션 제목</CardHeader>
  <CardBody>
    <DataList items={items} />
  </CardBody>
  <CardFooter>
    <Button size="sm">수정</Button>
  </CardFooter>
</Card>

// KpiCard (대시보드)
<KpiCard
  label="월간 활성 사용자"
  value={12480}
  unit="명"
  change={8.2}
  trend="up"
  icon={<Icon name="person" size="md" />}
/>
```

---

## PageHeader

**언제 쓰나**: 페이지 최상단 제목 + 부제목 + 액션 버튼 영역. `Breadcrumb`, `Tab` 포함 가능.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `title` | `string` | — | **(필수)** 페이지 제목 |
| `subtitle` | `string` | — | 부제목 |
| `actions` | `ReactNode` | — | 우측 버튼 영역 |
| `leading` | `ReactNode` | — | 제목 앞 요소 (뒤로가기 버튼 등) |
| `footer` | `ReactNode` | — | 헤더 하단 (Breadcrumb, Tab 등) |

### 사용 예시

```tsx
<PageHeader
  title="사용자 관리"
  subtitle="전체 사용자를 관리합니다"
  actions={
    <ButtonGroup>
      <Button tone="secondary" variant="outline" leadingIcon={<Icon name="arrow_down" size="sm" />}>
        내보내기
      </Button>
      <Button leadingIcon={<Icon name="plus" size="sm" />}>
        사용자 추가
      </Button>
    </ButtonGroup>
  }
  footer={
    <Breadcrumb items={[{ label: '홈', href: '/' }, { label: '사용자 관리' }]} />
  }
/>
```

---

## ConfirmDialog

**언제 쓰나**: 위험 액션(삭제, 비활성화) 전 단순 확인 대화상자. Modal보다 가볍고 의미가 명확할 때 사용.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `open` | `boolean` | — | **(필수)** 열림 상태 |
| `onClose` | `() => void` | — | **(필수)** 닫기 핸들러 |
| `onConfirm` | `() => void` | — | **(필수)** 확인 핸들러 |
| `title` | `string` | — | **(필수)** 제목 |
| `description` | `ReactNode` | — | 설명 텍스트 |
| `confirmLabel` | `string` | tone에 따라 자동 결정 | 확인 버튼 레이블 |
| `cancelLabel` | `string` | `'취소'` | 취소 버튼 레이블 |
| `tone` | `'danger' \| 'primary'` | `'danger'` | 확인 버튼 스타일 |
| `loading` | `boolean` | `false` | 확인 버튼 로딩 |

### 사용 예시

```tsx
// 삭제 확인 (가장 흔한 패턴)
<ConfirmDialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title="사용자를 삭제하시겠습니까?"
  description="삭제된 데이터는 복구할 수 없습니다."
  confirmLabel="삭제"
  tone="danger"
  loading={isDeleting}
  onConfirm={handleDelete}
/>

// 일반 확인
<ConfirmDialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title="변경 사항을 저장하시겠습니까?"
  tone="primary"
  confirmLabel="저장"
  onConfirm={handleSave}
/>
```

---

## DropdownButton

**언제 쓰나**: 버튼 클릭 시 드롭다운 메뉴. 단일 버튼에 여러 액션 옵션이 필요할 때.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | — | **(필수)** 버튼 레이블 |
| `menuItems` | `DropdownButtonMenuItem[]` | — | **(필수)** 드롭다운 항목 |
| `onMenuSelect` | `(key: string) => void` | — | 메뉴 선택 콜백 |
| `tone` | `ButtonTone` | `'secondary'` | 버튼 tone |
| `variant` | `ButtonVariant` | `'fill'` | 버튼 variant |
| `size` | `ButtonSize` | `'md'` | 크기 |
| `disabled` | `boolean` | — | 비활성화 |
| `loading` | `boolean` | — | 로딩 |
| `leadingIcon` | `ReactNode` | — | 앞 아이콘 |
| `menuAlign` | `'left' \| 'right'` | `'left'` | 메뉴 정렬 |

### 사용 예시

```tsx
<DropdownButton
  menuItems={[
    { key: 'csv', label: 'CSV 내보내기' },
    { key: 'excel', label: 'Excel 내보내기' },
    { key: 'pdf', label: 'PDF 내보내기' },
  ]}
  onMenuSelect={(key) => handleExport(key)}
  tone="secondary"
  variant="outline"
  leadingIcon={<Icon name="arrow_down" size="sm" />}
>
  내보내기
</DropdownButton>
```

---

## SplitButton

**언제 쓰나**: 주 액션 버튼 + 드롭다운 화살표가 분리된 버튼. 기본 액션과 추가 옵션이 함께 필요할 때.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | — | **(필수)** 주 버튼 레이블 |
| `onClick` | `(e) => void` | — | 주 버튼 클릭 |
| `menuItems` | `SplitButtonMenuItem[]` | — | **(필수)** 드롭다운 항목 |
| `onMenuSelect` | `(key: string) => void` | — | 메뉴 선택 콜백 |
| `tone` | `ButtonTone` | `'primary'` | 버튼 tone |
| `variant` | `ButtonVariant` | `'fill'` | 버튼 variant |
| `size` | `ButtonSize` | `'md'` | 크기 |
| `disabled` | `boolean` | — | 비활성화 |
| `loading` | `boolean` | — | 로딩 |

### 사용 예시

```tsx
<SplitButton
  onClick={handleSaveDraft}
  menuItems={[
    { key: 'publish', label: '저장 후 발행' },
    { key: 'schedule', label: '예약 발행' },
  ]}
  onMenuSelect={handleMenuSelect}
>
  임시 저장
</SplitButton>
```

---

## FormLayout / FormItem / FormSection

**언제 쓰나**: 폼 필드를 구조적으로 배치. `FormLayout` → `FormSection` → `FormItem` → 입력 컴포넌트 순으로 중첩.

### FormLayout Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | 레이블-입력 배치 방향 |
| `gap` | `'sm' \| 'md' \| 'lg'` | `'md'` | 항목 간 간격 |
| `children` | `ReactNode` | — | **(필수)** |

### FormItem Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 레이블 |
| `required` | `boolean` | `false` | 필수 표시 (*) |
| `hint` | `string` | — | 도움말 |
| `error` | `string` | — | 에러 메시지 |
| `labelWidth` | `string \| number` | — | horizontal layout 시 레이블 너비 |
| `children` | `ReactNode` | — | **(필수)** 입력 컴포넌트 |

### FormSection Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `title` | `string` | — | 섹션 제목 |
| `description` | `string` | — | 섹션 설명 |
| `children` | `ReactNode` | — | **(필수)** |

### 사용 예시

```tsx
<FormLayout gap="md">
  <FormSection title="기본 정보">
    <FormItem label="이름" required>
      <Input placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
    </FormItem>
    <FormItem label="이메일" required error={errors.email}>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
    </FormItem>
    <FormItem label="역할">
      <Select options={roleOptions} value={role} onChange={(value) => setRole(value as string)} fullWidth />
    </FormItem>
  </FormSection>
  <FormSection title="추가 정보">
    <FormItem label="메모">
      <TextArea value={memo} onChange={(e) => setMemo(e.target.value)} maxLength={200} showCount fullWidth />
    </FormItem>
  </FormSection>
</FormLayout>
```

---

## Searchbox / SearchboxGroup

**언제 쓰나**: 여러 조건을 입력하고 "검색" 버튼으로 한 번에 조회. 필터 조건이 4개 이상이거나 무거운 쿼리일 때. `FilterBar`(즉시반응)의 반대 패턴.

### Searchbox Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | — | **(필수)** SearchboxGroup 목록 |
| `columns` | `1 \| 2 \| 3 \| 4` | `2` | 그룹 배치 열 수 |
| `actions` | `ReactNode` | — | 검색/초기화 버튼 슬롯 |

### SearchboxGroup Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | **(필수)** 그룹 레이블 |
| `direction` | `'inline' \| 'block'` | `'inline'` | 자식 배치 방향 |
| `chips` | `ReactNode` | — | block direction 시 칩 영역 |
| `children` | `ReactNode` | — | **(필수)** 입력 컴포넌트 |

### 사용 예시

```tsx
<Searchbox
  columns={2}
  actions={
    <>
      <Button tone="secondary" variant="outline" onClick={handleReset}>초기화</Button>
      <Button onClick={handleSearch} leadingIcon={<Icon name="search" size="sm" />}>검색</Button>
    </>
  }
>
  <SearchboxGroup label="검색어">
    <Select options={searchTypeOptions} value={searchType} onChange={(v) => setSearchType(v as string)} />
    <Input placeholder="검색어 입력" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
  </SearchboxGroup>
  <SearchboxGroup label="상태">
    <Select options={statusOptions} value={status} onChange={(v) => setStatus(v as string)} />
  </SearchboxGroup>
  <SearchboxGroup label="등록일">
    <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
    <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
  </SearchboxGroup>
</Searchbox>
```

---

## FilterBar / FilterGroup

**언제 쓰나**: 즉시반응 필터. 조건 변경 시 바로 데이터 갱신. 필터 조건 ≤ 3개일 때. `Searchbox`(버튼 클릭)의 반대 패턴.

### FilterBar Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `filters` | `ReactNode` | — | 필터 입력 영역 |
| `actions` | `ReactNode` | — | 우측 액션 버튼 |
| `chips` | `ReactNode` | — | 활성 필터 칩 표시 영역 |

### FilterGroup Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | **(필수)** 그룹 레이블 |
| `children` | `ReactNode` | — | **(필수)** |

### 사용 예시

```tsx
<FilterBar
  filters={
    <>
      <Input
        search
        placeholder="이름 검색"
        value={keyword}
        onChange={(e) => { setKeyword(e.target.value); fetchData(); }}
        style={{ width: 240 }}
      />
      <Select
        options={statusOptions}
        placeholder="상태 전체"
        value={status}
        onChange={(value) => { setStatus(value as string); fetchData(); }}
        style={{ width: 140 }}
      />
    </>
  }
  chips={
    activeFilters.map(f => (
      <InputChip key={f.key} label={f.label} value={f.key} onRemove={removeFilter} />
    ))
  }
/>
```

---

## Stepper

**언제 쓰나**: 단계적 프로세스 표시. 가입 단계, 주문 진행, 설정 마법사 등.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `steps` | `StepItem[]` | — | **(필수)** `{ key, label, description?, status? }` 배열 |
| `activeKey` | `string` | — | controlled 현재 단계 |
| `defaultActiveKey` | `string` | — | uncontrolled 기본 단계 |
| `onChange` | `(key: string) => void` | — | 단계 변경 콜백 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 방향 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `clickable` | `boolean` | `false` | 클릭으로 단계 이동 허용 |

### Step status

`'completed'` | `'current'` | `'upcoming'` | `'error'`

### 사용 예시

```tsx
const steps = [
  { key: 'info', label: '기본 정보', status: 'completed' },
  { key: 'agreement', label: '약관 동의', status: 'current' },
  { key: 'confirm', label: '확인', status: 'upcoming' },
]

<Stepper steps={steps} activeKey={currentStep} onChange={setCurrentStep} />

// 수직 (사이드바 진행 상황)
<Stepper steps={steps} orientation="vertical" activeKey={currentStep} clickable />
```

---

> **업데이트 기록**
> - 2026-04-14: 초기 작성 (Button, Input, Select, Checkbox, Radio, Switch, Badge, CountBadge, DotBadge, Label, Avatar, Icon, Divider, Skeleton, Modal, Tooltip, Toast, Backdrop, Alert, Table)
> - 2026-04-14: SideNavigation 추가
> - 2026-04-15: Modal props 업데이트, ChoiceChip / ChoiceChipGroup 추가
> - 2026-04-15: AppLayout, CheckboxGroup, Pagination 추가
> - 2026-04-15: 신규 16개 컴포넌트 추가 — IconButton, TextButton, FloatingButton, ToggleButton, ButtonGroup, TextArea, NumberStepper, SegmentedControl, Rating, PageIndicator, Breadcrumb, Tab, Link, Row, Popover, Accordion
> - 2026-04-15: Icon 전체 목록 추가 (존재하지 않는 이름 사용 방지), AppLayout LNB 올바른 패턴 명시 (padding 24px wrapper 필수), SideNavigation 예시의 잘못된 아이콘명(`chart_bar`) 수정
> - 2026-04-17: TopNavigation, Slider, StateView 추가 (catalog 누락 컴포넌트 정리)
> - 2026-04-21: 누락 16개 컴포넌트 추가 — ActionChip, FilterChip, InputChip, MetaChip, Tag, Progress, DataList, Card/KpiCard, PageHeader, ConfirmDialog, DropdownButton, SplitButton, FormLayout/FormItem/FormSection, Searchbox/SearchboxGroup, FilterBar/FilterGroup, Stepper. Select onChange 시그니처 수정 (value-based). Tooltip placement 12가지로 확장. TOC 개편. Radio/CountBadge/DotBadge 미구현 경고 추가.
> - 2026-04-21: Input 누락 props 추가 (clearable, onClear, showCount, textAlign, showPasswordToggle, search). Select searchable/multiple 추가. Table selectedKeys/onSelectionChange 추가. filter-box.md InputChip 미구현 오류 수정 및 Input 잘못된 props(hasLabel, hasMessage) 제거.
> - 2026-04-21: DatePicker / DateRangePicker 추가 (신규 구현 반영). TOC에 입력 카테고리 추가. filter-box.md TYPE 6 미구현 경고 제거 및 실제 컴포넌트 사용법으로 교체.

---

## DatePicker

**언제 쓰나**: 단일 날짜 선택 입력 필드. 캘린더 팝오버로 날짜 선택.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 필드 레이블 |
| `value` | `Date` | — | controlled 선택값 |
| `defaultValue` | `Date` | — | uncontrolled 기본값 |
| `size` | `'md' \| 'lg'` | `'md'` | 크기 (md: 36px / lg: 40px) |
| `hint` | `string` | — | 도움말 텍스트 |
| `error` | `string` | — | 에러 메시지 |
| `disabled` | `boolean` | — | 비활성화 |
| `fullWidth` | `boolean` | — | 너비 100% |
| `onChange` | `(date: Date) => void` | — | 날짜 선택 콜백 |

### 사용 예시

```tsx
// 기본
<DatePicker label="날짜" onChange={(date) => setDate(date)} />

// controlled
<DatePicker label="등록일" value={date} onChange={setDate} />

// 에러 상태
<DatePicker label="시작일" value={startDate} onChange={setStartDate} error={errors.startDate} />

// 전체 너비
<DatePicker label="날짜" value={date} onChange={setDate} fullWidth />
```

---

## DateRangePicker

**언제 쓰나**: 시작일 ~ 종료일 기간 선택. 2개 캘린더가 나란히 표시되어 범위를 직관적으로 선택.

### DateRange 타입

```ts
interface DateRange {
  start?: Date
  end?: Date
}
```

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 필드 레이블 |
| `value` | `DateRange` | — | controlled 선택 범위 |
| `defaultValue` | `DateRange` | — | uncontrolled 기본값 |
| `hint` | `string` | — | 도움말 텍스트 |
| `error` | `string` | — | 에러 메시지 |
| `disabled` | `boolean` | — | 비활성화 |
| `fullWidth` | `boolean` | — | 너비 100% |
| `onChange` | `(range: DateRange) => void` | — | 범위 변경 콜백 |

### 선택 동작

1. 첫 번째 클릭 → `start` 확정
2. 두 번째 클릭 → `end` 확정 후 팝오버 자동 닫힘
3. `start` 확정 후 이전 날짜 클릭 → 자동으로 start/end 교체

### 사용 예시

```tsx
// 기본
<DateRangePicker label="기간" onChange={(range) => setRange(range)} />

// controlled
const [range, setRange] = useState<DateRange>({})

<DateRangePicker
  label="조회 기간"
  value={range}
  onChange={setRange}
  fullWidth
/>

// 에러 상태
<DateRangePicker
  label="등록 기간"
  value={dateRange}
  onChange={setDateRange}
  error={!dateRange.start ? '시작일을 선택하세요' : undefined}
/>
```

---

## Drawer

화면 가장자리에서 슬라이드로 나타나는 보조 패널. 상세 정보 조회/편집, 필터, 설정에 사용.

```tsx
import { Drawer } from './components/Drawer'
```

### Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `open` | `boolean` | — | 열림/닫힘 제어 |
| `onClose` | `() => void` | — | 닫기 콜백 (ESC, 백드롭 클릭 포함) |
| `title` | `ReactNode` | — | 헤더 제목 |
| `description` | `ReactNode` | — | 헤더 부제목 (선택) |
| `placement` | `'right' \| 'left'` | `'right'` | 슬라이드 방향 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | 패널 너비 (360/480/640px) |
| `footerLayout` | `'inlineEnd' \| 'stack' \| 'between'` | `'inlineEnd'` | 버튼 배치 방식 |
| `footerVariation` | `'primary' \| 'neutral' \| 'danger'` | `'primary'` | 주요 액션 스타일 |
| `primaryLabel` | `string` | `'확인'` | 주요 버튼 레이블 |
| `secondaryLabel` | `string` | `'취소'` | 보조 버튼 레이블 |
| `dangerLabel` | `string` | `'삭제'` | between 레이아웃 좌측 위험 액션 레이블 |
| `onPrimaryAction` | `() => void` | — | 주요 버튼 클릭 콜백 |
| `onSecondaryAction` | `() => void` | — | 보조 버튼 클릭 콜백 (없으면 onClose 사용) |
| `onDangerAction` | `() => void` | — | between 레이아웃 좌측 위험 버튼 콜백 |
| `footer` | `ReactNode` | — | 커스텀 푸터 (footerLayout 무시) |
| `closeOnBackdropClick` | `boolean` | `true` | 백드롭 클릭 시 닫기 여부 |
| `children` | `ReactNode` | — | 본문 영역 |

### footerLayout 가이드

| layout | 버튼 구성 | 사용 상황 |
|--------|----------|---------|
| `inlineEnd` | [취소] [주액션] — 동일 너비 | **기본**. 편집, 저장, 필터 적용 |
| `stack` | [주액션 full-width] [취소 full-width] — 세로 | 버튼 레이블이 길거나 모바일-like UI |
| `between` | [삭제] ————— [취소][주액션] | 위험 액션(삭제/비활성화)이 같이 있는 경우 |

### footerVariation 가이드

| variation | 주요 버튼 스타일 | 사용 상황 |
|-----------|--------------|---------|
| `primary` | 파란색 fill | **기본**. 저장, 수정, 적용 |
| `neutral` | 회색 soft | 조회/확인만 (저장 불필요, 닫기 버튼 강조 불필요) |
| `danger` | 빨간색 fill | 삭제, 비활성화 등 위험한 주요 액션 |

### 9가지 조합 예시

```tsx
// 1. 기본 편집 폼 (inlineEnd + primary)
<Drawer
  open={open}
  onClose={onClose}
  title="항목 편집"
  description="내용을 수정하세요"
  footerLayout="inlineEnd"
  footerVariation="primary"
  primaryLabel="저장"
  secondaryLabel="취소"
  onPrimaryAction={handleSave}
>
  <EditForm />
</Drawer>

// 2. 삭제 포함 상세 (between + danger)
<Drawer
  open={open}
  onClose={onClose}
  title="항목 상세"
  footerLayout="between"
  footerVariation="danger"
  primaryLabel="저장"
  secondaryLabel="취소"
  dangerLabel="삭제"
  onPrimaryAction={handleSave}
  onDangerAction={handleDelete}
>
  <DetailView />
</Drawer>

// 3. 조회 전용 (inlineEnd + neutral)
<Drawer
  open={open}
  onClose={onClose}
  title="상세 정보"
  footerLayout="inlineEnd"
  footerVariation="neutral"
  primaryLabel="확인"
  secondaryLabel="닫기"
  onPrimaryAction={onClose}
>
  <ReadOnlyView />
</Drawer>

// 4. 필터 (inlineEnd + primary, left placement)
<Drawer
  open={open}
  onClose={onClose}
  title="필터"
  description="조건을 선택하세요"
  placement="left"
  footerLayout="inlineEnd"
  footerVariation="primary"
  primaryLabel="적용"
  secondaryLabel="초기화"
  onPrimaryAction={handleApply}
  onSecondaryAction={handleReset}
>
  <FilterOptions />
</Drawer>

// 5. between + primary (삭제ghost + 취소 + 저장)
<Drawer
  open={open}
  onClose={onClose}
  title="항목 편집"
  footerLayout="between"
  footerVariation="primary"
  primaryLabel="저장"
  secondaryLabel="취소"
  dangerLabel="삭제"
  onPrimaryAction={handleSave}
  onDangerAction={handleDelete}
>
  <EditForm />
</Drawer>

// 6. stack + danger (삭제 확인)
<Drawer
  open={open}
  onClose={onClose}
  title="삭제 확인"
  description="이 작업은 되돌릴 수 없습니다"
  footerLayout="stack"
  footerVariation="danger"
  primaryLabel="삭제"
  secondaryLabel="취소"
  onPrimaryAction={handleDelete}
>
  <DeleteWarning />
</Drawer>
```

---

## Autocomplete

자동완성 텍스트 입력. 입력에 따라 드롭다운 제안 목록을 표시하며, 자유 텍스트 입력(freeText)도 지원.

```tsx
import { Autocomplete } from '@igt/design-system'

<Autocomplete
  options={[
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나', disabled: true },
  ]}
  label="과일 선택"
  placeholder="검색..."
  onSelect={(value, label) => console.log(value, label)}
/>
```

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `options` | `AutocompleteOption[]` | — | 제안 옵션 목록 (`{ value, label, disabled? }`) |
| `value` | `string` | — | 제어형 입력값 |
| `defaultValue` | `string` | `''` | 비제어형 초기값 |
| `onChange` | `(value: string) => void` | — | 입력값 변경 콜백 |
| `onSelect` | `(value, label) => void` | — | 옵션 선택 콜백 |
| `label` | `string` | — | 레이블 |
| `placeholder` | `string` | — | 플레이스홀더 |
| `hint` | `string` | — | 힌트 메시지 |
| `error` | `string` | — | 에러 메시지 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `fieldStyle` | `'outline' \| 'fill'` | `'outline'` | 필드 스타일 |
| `fullWidth` | `boolean` | `false` | 전체 너비 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `freeText` | `boolean` | `true` | 미일치 시 직접 입력 허용 |
| `noOptionsText` | `string` | `'일치하는 항목이 없습니다.'` | 결과 없을 때 문구 |
| `clearable` | `boolean` | `false` | 지우기 버튼 표시 |
| `className` | `string` | — | 추가 클래스 |

---

## FileUpload

파일 업로드 관련 컴포넌트 모음. 버튼 방식(`FileUploadButton`), 드래그앤드롭(`Dropzone`), 파일 목록(`FileList`), 이미지 프리뷰(`ImageUpload`) 4개의 서브 컴포넌트로 구성.

```tsx
import {
  FileUploadButton,
  Dropzone,
  FileList,
  ImageUpload,
  validateFiles,
  type UploadFile,
  type RejectedFile,
} from '@igt/design-system'
```

### FileUploadButton

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `accept` | `string` | — | input accept 속성 |
| `allowedTypes` | `string[]` | — | 클라이언트 검증 타입 (MIME/확장자) |
| `maxSizeBytes` | `number` | — | 최대 파일 크기 (bytes) |
| `multiple` | `boolean` | `false` | 다중 선택 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `label` | `string` | `'파일 첨부'` | 버튼 레이블 |
| `onFilesSelected` | `(files: File[]) => void` | — | 유효 파일 선택 콜백 |
| `onFilesRejected` | `(rejected: RejectedFile[]) => void` | — | 검증 실패 콜백 |

### Dropzone

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `accept` | `string` | — | input accept 속성 |
| `allowedTypes` | `string[]` | — | 클라이언트 검증 타입 |
| `maxSizeBytes` | `number` | — | 최대 파일 크기 (bytes) |
| `multiple` | `boolean` | `false` | 다중 파일 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `onFilesSelected` | `(files: File[]) => void` | — | 유효 파일 선택 콜백 |
| `onFilesRejected` | `(rejected: RejectedFile[]) => void` | — | 검증 실패 콜백 |
| `children` | `ReactNode` | — | 커스텀 내부 콘텐츠 |

### FileList

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `files` | `UploadFile[]` | — | 파일 목록 (`{ id, file, progress?, status?, errorMessage? }`) |
| `onRemove` | `(id: string) => void` | — | 파일 제거 콜백 |

### ImageUpload

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `accept` | `string` | `'image/*'` | 허용 타입 |
| `multiple` | `boolean` | `false` | 다중 선택 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `onFilesSelected` | `(files: File[]) => void` | — | 파일 선택 콜백 |
| `previewUrls` | `string[]` | `[]` | 미리보기 URL 목록 |
| `onRemovePreview` | `(index: number) => void` | — | 미리보기 제거 콜백 |

---

## TagInput

태그 형태로 복수의 값을 입력받는 필드. Enter 또는 쉼표로 태그 생성, Backspace로 마지막 태그 삭제.

```tsx
import { TagInput } from '@igt/design-system'

<TagInput
  label="태그"
  placeholder="입력 후 Enter"
  value={tags}
  onChange={setTags}
  maxTags={10}
/>
```

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `value` | `string[]` | — | 제어형 태그 목록 |
| `defaultValue` | `string[]` | `[]` | 비제어형 초기값 |
| `onChange` | `(tags: string[]) => void` | — | 태그 변경 콜백 |
| `label` | `string` | — | 레이블 |
| `placeholder` | `string` | — | 플레이스홀더 |
| `hint` | `string` | — | 힌트 메시지 |
| `error` | `string` | — | 에러 메시지 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `fieldStyle` | `'outline' \| 'fill'` | `'outline'` | 필드 스타일 |
| `fullWidth` | `boolean` | `false` | 전체 너비 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `maxTags` | `number` | — | 최대 태그 수 |
| `allowDuplicate` | `boolean` | `false` | 중복 태그 허용 |
| `separators` | `string[]` | `['Enter', ',']` | 태그 생성 트리거 키 |
| `className` | `string` | — | 추가 클래스 |

---

## Timeline

시간 순서 이벤트 목록을 수직으로 표시. dot 상태(색상/아이콘)로 각 항목의 상태를 시각화.

```tsx
import { Timeline } from '@igt/design-system'
import type { TimelineItem } from '@igt/design-system'

const items: TimelineItem[] = [
  { title: '주문 완료', time: '2024-01-15 09:00', status: 'success' },
  { title: '배송 중', time: '2024-01-16 14:30', status: 'pending' },
  { title: '배송 완료', description: '문 앞 배치', status: 'default' },
]

<Timeline items={items} />
```

### TimelineItem 구조

| 필드 | Type | 설명 |
|------|------|------|
| `title` | `ReactNode` | 항목 제목 (필수) |
| `description` | `ReactNode` | 부가 설명 |
| `time` | `string` | 시간/날짜 문자열 |
| `status` | `'default' \| 'success' \| 'warning' \| 'error' \| 'pending'` | dot 상태 색상 |
| `icon` | `IconName \| ReactNode` | 커스텀 dot 아이콘 |
| `key` | `string \| number` | React key |

### TimelineProps

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `items` | `TimelineItem[]` | — | 타임라인 항목 목록 |
| `className` | `string` | — | 추가 클래스 |

---

## TreeView

트리 구조 데이터를 계층형으로 표시. 노드 펼침/접힘, 단일 선택, 키보드 내비게이션 지원.

```tsx
import { TreeView } from '@igt/design-system'
import type { TreeNode } from '@igt/design-system'

const nodes: TreeNode[] = [
  {
    key: 'root',
    label: '루트',
    children: [
      { key: 'child1', label: '항목 1' },
      { key: 'child2', label: '항목 2', disabled: true },
    ],
  },
]

<TreeView
  nodes={nodes}
  selectedKey={selected}
  onSelect={(key, node) => setSelected(key)}
  defaultExpandedKeys={['root']}
/>
```

### TreeNode 구조

| 필드 | Type | 설명 |
|------|------|------|
| `key` | `string` | 고유 키 (필수) |
| `label` | `ReactNode` | 표시 레이블 (필수) |
| `children` | `TreeNode[]` | 자식 노드 |
| `disabled` | `boolean` | 비활성화 |
| `icon` | `IconName` | 왼쪽 아이콘 |
| `data` | `unknown` | 임의 부가 데이터 |

### TreeViewProps

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `nodes` | `TreeNode[]` | — | 트리 데이터 |
| `selectedKey` | `string` | — | 선택된 노드 키 |
| `onSelect` | `(key, node) => void` | — | 노드 선택 콜백 |
| `defaultExpandedKeys` | `string[]` | `[]` | 기본 펼쳐진 키 |
| `expandedKeys` | `string[]` | — | 제어형 펼침 상태 |
| `onExpandedKeysChange` | `(keys: string[]) => void` | — | 펼침 변경 콜백 |
| `indent` | `number` | `16` | 들여쓰기 단위 (px) |
| `className` | `string` | — | 추가 클래스 |

# IGT Design System — Component Catalog

> AI 바이브 코딩 시 이 문서를 먼저 확인한다.
> UI 구현 전 필요한 컴포넌트가 이미 있는지 확인하고 반드시 재사용할 것.
> 색상/폰트/간격 값은 `design-tokens.md` 참조.

---

## 목차

| 카테고리 | 컴포넌트 |
|---------|---------|
| 입력 | [Button](#button), [IconButton](#iconbutton), [TextButton](#textbutton), [FloatingButton](#floatingbutton), [ToggleButton](#togglebutton), [ButtonGroup](#buttongroup), [Input](#input), [TextArea](#textarea), [Select](#select), [NumberStepper](#numberstepper), [Checkbox / CheckboxGroup](#checkbox--checkboxgroup), [Radio / RadioGroup](#radio--radiogroup), [Switch / SwitchField](#switch--switchfield), [ChoiceChip / ChoiceChipGroup](#choicechip--choicechipgroup), [SegmentedControl](#segmentedcontrol), [Rating](#rating) |
| 표시 | [Badge](#badge), [CountBadge](#countbadge), [DotBadge](#dotbadge), [Label](#label), [Avatar](#avatar), [Icon](#icon), [PageIndicator](#pageindicator) |
| 레이아웃 | [AppLayout](#applayout), [Divider](#divider), [Row](#row), [Skeleton](#skeleton), [SideNavigation](#sidenavigation) |
| 탐색 | [Breadcrumb](#breadcrumb), [Tab](#tab), [Link](#link) |
| 오버레이 | [Modal](#modal), [Tooltip](#tooltip), [Popover](#popover), [Toast / ToastContainer](#toast--toastcontainer), [Backdrop](#backdrop) |
| 피드백 | [Alert](#alert), [Table](#table), [Pagination](#pagination) |
| 콘텐츠 | [Accordion](#accordion) |

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

## AppLayout

**언제 쓰나**: 백오피스 전체 페이지 레이아웃. TopNavigation + SideNavigation + 콘텐츠 영역을 하나로 조합.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `topNav` | `ReactNode` | — | **(필수)** 상단 네비게이션 영역 |
| `sideNav` | `ReactNode` | — | **(필수)** 좌측 네비게이션 영역 |
| `children` | `ReactNode` | — | **(필수)** 메인 콘텐츠 |

### 사용 예시

```tsx
<AppLayout
  topNav={<TopNavigation ... />}
  sideNav={
    <SideNavigation tone="accent">
      <SideNavigationList>
        <NavItem as="button" current>대시보드</NavItem>
        <NavItem as="button">사용자 관리</NavItem>
      </SideNavigationList>
    </SideNavigation>
  }
>
  <YourPageContent />
</AppLayout>
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
<IconButton icon={<Icon name="close" size="sm" />} aria-label="닫기" />
<IconButton icon={<Icon name="edit" size="sm" />} aria-label="편집" variant="soft" />
<IconButton icon={<Icon name="trash" size="sm" />} aria-label="삭제" variant="outline" emphasis="subdued" />
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
<TextButton tone="danger" leadingIcon={<Icon name="trash" size="sm" />}>삭제</TextButton>
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
<ToggleButton emphasis="onSelect" selected={isGrid} onSelectedChange={setIsGrid} leadingIcon={<Icon name="grid" size="sm" />}>그리드</ToggleButton>
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

> **업데이트 기록**
> - 2026-04-14: 초기 작성 (Button, Input, Select, Checkbox, Radio, Switch, Badge, CountBadge, DotBadge, Label, Avatar, Icon, Divider, Skeleton, Modal, Tooltip, Toast, Backdrop, Alert, Table)
> - 2026-04-14: SideNavigation 추가
> - 2026-04-15: Modal props 업데이트, ChoiceChip / ChoiceChipGroup 추가
> - 2026-04-15: AppLayout, CheckboxGroup, Pagination 추가
> - 2026-04-15: 신규 16개 컴포넌트 추가 — IconButton, TextButton, FloatingButton, ToggleButton, ButtonGroup, TextArea, NumberStepper, SegmentedControl, Rating, PageIndicator, Breadcrumb, Tab, Link, Row, Popover, Accordion

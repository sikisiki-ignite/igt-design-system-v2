# IGT Design System — Usage Patterns

> 백오피스에서 자주 쓰는 컴포넌트 조합 패턴 모음.
> 단순 컴포넌트 나열이 아니라 **"이런 화면은 이렇게 조합한다"** 가이드.
> 개별 컴포넌트 props는 `component-catalog.md` 참조.

---

## 목차

0. [페이지 배경 & 카드 섹션](#0-페이지-배경--카드-섹션)
1. [검색 필터 바](#1-검색-필터-바)
2. [데이터 테이블 페이지](#2-데이터-테이블-페이지)
3. [편집 폼](#3-편집-폼)
4. [확인 모달](#4-확인-모달)
5. [알림 피드백](#5-알림-피드백)
6. [로딩 상태](#6-로딩-상태)
7. [사용자 정보 표시](#7-사용자-정보-표시)
8. [페이지 헤더 (Breadcrumb + 액션)](#8-페이지-헤더-breadcrumb--액션)
9. [탭 전환 페이지](#9-탭-전환-페이지)
10. [뷰 전환 (SegmentedControl)](#10-뷰-전환-segmentedcontrol)
11. [테이블 행 액션 (IconButton)](#11-테이블-행-액션-iconbutton)
12. [Accordion 설정/FAQ 패널](#12-accordion-설정faq-패널)
13. [Row 목록](#13-row-목록)
14. [긴 텍스트 입력 폼 (TextArea)](#14-긴-텍스트-입력-폼-textarea)
15. [Popover 컨텍스트 메뉴](#15-popover-컨텍스트-메뉴)
16. [FloatingButton 고정 액션](#16-floatingbutton-고정-액션)
17. [TopNavigation 글로벌 헤더](#17-topnavigation-글로벌-헤더)
18. [StateView — 빈 상태 / 오류 상태](#18-stateview--빈-상태--오류-상태)
19. [Slider 값 선택](#19-slider-값-선택)
20. [PageHeader 컴포넌트 사용](#20-pageheader-컴포넌트-사용)
21. [ConfirmDialog 단독 사용](#21-confirmdialog-단독-사용)
22. [KpiCard 대시보드](#22-kpicard-대시보드)
23. [FormLayout으로 구조화된 폼](#23-formlayout으로-구조화된-폼)
24. [Stepper 단계 진행](#24-stepper-단계-진행)
25. [Progress 진행률 표시](#25-progress-진행률-표시)
26. [Tag / InputChip — 선택 항목 표시](#26-tag--inputchip--선택-항목-표시)
27. [DataList 상세 정보 패널](#27-datalist-상세-정보-패널)
28. [DatePicker / DateRangePicker](#28-datepicker--daterangepicker)

---

## 0. 페이지 배경 & 카드 섹션

**규칙**:
- 콘텐츠 영역 기본 배경: `AppLayout`이 `--sys-background-base` 자동 적용
- 카드/섹션 배경이 필요한 경우: `--sys-background-subtle`

```tsx
// 기본 페이지 — 배경 별도 지정 불필요 (AppLayout이 처리)
<AppLayout topNav={...} sideNav={...}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    {/* 콘텐츠 */}
  </div>
</AppLayout>

// 카드 섹션이 필요한 경우
<div style={{
  background: 'var(--sys-background-subtle)',
  borderRadius: 'var(--radius-md)',
  padding: '24px',
}}>
  {/* 카드 내용 */}
</div>
```

**주의**: 콘텐츠 영역에 별도로 `background: var(--sys-background-base)` 지정 금지 — AppLayout이 이미 처리함.

---

## 1. 검색 필터 바

**언제**: 목록 페이지 상단에 검색어 + 필터 조합.

```tsx
<div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
  <Input
    placeholder="이름, 이메일 검색"
    prefix={<Icon name="search" size="sm" />}
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    style={{ width: 240 }}
  />
  <Select
    options={statusOptions}
    placeholder="상태 전체"
    value={status}
    onChange={(value) => setStatus(value as string)}
    style={{ width: 140 }}
  />
  <Select
    options={roleOptions}
    placeholder="역할 전체"
    value={role}
    onChange={(value) => setRole(value as string)}
    style={{ width: 140 }}
  />
  <Button tone="secondary" variant="outline" onClick={handleReset}>
    초기화
  </Button>
  <Button onClick={handleSearch} leadingIcon={<Icon name="search" size="sm" />}>
    검색
  </Button>
</div>
```

**규칙**:
- 검색 Input에는 항상 `prefix` 검색 아이콘
- 필터 Select는 `placeholder`로 "전체" 표현
- 초기화 버튼은 `tone="secondary" variant="outline"`
- 검색 버튼은 `tone="primary"`

---

## 2. 데이터 테이블 페이지

**언제**: 목록 데이터를 표 형태로 표시. 상태 배지, 액션 버튼 포함.

```tsx
const columns = [
  {
    key: 'user',
    header: '사용자',
    render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Avatar src={row.avatar} fallback={row.name[0]} size="sm" />
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    key: 'status',
    header: '상태',
    render: (row) => (
      <Badge
        variant={row.status === 'active' ? 'success' : row.status === 'suspended' ? 'danger' : 'neutral'}
      >
        {row.statusLabel}
      </Badge>
    ),
  },
  { key: 'email', header: '이메일' },
  { key: 'createdAt', header: '등록일', align: 'right', sortable: true },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: (row) => (
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
        <Tooltip content="수정">
          <Button
            tone="secondary"
            variant="ghost"
            size="sm"
            iconOnly
            leadingIcon={<Icon name="write" size="sm" />}
            onClick={() => handleEdit(row)}
          />
        </Tooltip>
        <Tooltip content="삭제">
          <Button
            tone="danger"
            variant="ghost"
            size="sm"
            iconOnly
            leadingIcon={<Icon name="delete" size="sm" />}
            onClick={() => handleDelete(row)}
          />
        </Tooltip>
      </div>
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
  onRowClick={(row) => navigate(`/users/${row.id}`)}
  emptyText="등록된 사용자가 없습니다."
/>
```

**규칙**:
- 상태 칼럼은 항상 `Badge`로 표시 (텍스트 직접 출력 금지)
- 행 액션 버튼은 `ghost` variant + `iconOnly` + `Tooltip`
- 삭제 버튼만 `tone="danger"`, 나머지는 `tone="secondary"`
- 정렬 가능 컬럼은 `sortable: true` 명시

---

## 3. 편집 폼

**언제**: 생성/수정 폼. 레이블 + 입력 + 에러 처리.

```tsx
<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Input
    label="이름"
    placeholder="이름을 입력하세요"
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    error={errors.name}
    fullWidth
  />

  <Input
    label="이메일"
    type="email"
    placeholder="example@igt.com"
    value={form.email}
    onChange={(e) => setForm({ ...form, email: e.target.value })}
    error={errors.email}
    fullWidth
  />

  <Select
    label="역할"
    options={roleOptions}
    placeholder="역할을 선택하세요"
    value={form.role}
    onChange={(e) => setForm({ ...form, role: e.target.value })}
    error={errors.role}
    fullWidth
  />

  <RadioGroup
    label="계정 상태"
    value={form.status}
    onChange={(val) => setForm({ ...form, status: val })}
  >
    <RadioGroupItem value="active" label="활성" />
    <RadioGroupItem value="inactive" label="비활성" />
  </RadioGroup>

  <Divider />

  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
    <Button tone="secondary" variant="outline" type="button" onClick={onCancel}>
      취소
    </Button>
    <Button type="submit" loading={isSubmitting}>
      저장
    </Button>
  </div>
</form>
```

**규칙**:
- 모든 입력에 `error` prop으로 에러 표시 (별도 텍스트 추가 금지)
- 폼 내 Input/Select는 `fullWidth` 사용
- 제출 버튼은 `loading` 상태 연결
- 취소/저장 버튼 쌍은 `outline` + `fill` 조합, 우측 정렬
- 섹션 구분은 `<Divider />`

---

## 4. 확인 모달

**언제**: 위험한 작업(삭제, 비활성화 등) 전 사용자 확인.

```tsx
// 삭제 확인 모달
<Modal
  open={deleteModal.open}
  onClose={() => setDeleteModal({ open: false, target: null })}
  title="사용자 삭제"
  size="sm"
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button
        tone="secondary"
        variant="outline"
        onClick={() => setDeleteModal({ open: false, target: null })}
      >
        취소
      </Button>
      <Button
        tone="danger"
        loading={isDeleting}
        onClick={() => handleDelete(deleteModal.target)}
      >
        삭제
      </Button>
    </div>
  }
>
  <p>
    <strong>{deleteModal.target?.name}</strong> 사용자를 삭제하시겠습니까?
    이 작업은 되돌릴 수 없습니다.
  </p>
</Modal>

// 일반 확인 모달
<Modal
  open={confirmModal.open}
  onClose={() => setConfirmModal(false)}
  title="변경 사항 저장"
  size="sm"
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button tone="secondary" variant="outline" onClick={() => setConfirmModal(false)}>
        취소
      </Button>
      <Button onClick={handleConfirm}>확인</Button>
    </div>
  }
>
  <p>변경된 내용을 저장하시겠습니까?</p>
</Modal>
```

**규칙**:
- 삭제/위험 모달: `size="sm"`, 확인 버튼 `tone="danger"`
- 일반 확인 모달: `size="sm"`, 확인 버튼 `tone="primary"`
- 모달 footer는 항상 우측 정렬, 취소 먼저 / 확인 나중
- 위험한 작업 모달은 `closeOnOverlayClick={false}` 로 실수 방지 고려

---

## 5. 알림 피드백

**언제**: 사용자 액션 결과 알림. 즉시 사라지는 것은 Toast, 고정 안내는 Alert.

```tsx
// Toast — 앱 루트 레이아웃에 한 번만 배치
<ToastContainer position="top-right">
  {toasts.map((t) => (
    <Toast key={t.id} type={t.type} title={t.title} message={t.message} onClose={() => remove(t.id)} />
  ))}
</ToastContainer>

// Toast 트리거 예시
const showToast = (type, message) => {
  setToasts((prev) => [...prev, { id: Date.now(), type, message }])
}

showToast('success', '저장되었습니다.')
showToast('success', '삭제되었습니다.')
showToast('error', '서버 오류가 발생했습니다. 다시 시도해주세요.')

// Alert — 페이지 상단 고정 안내
<Alert
  type="warning"
  title="주의"
  description="현재 시스템 점검 중입니다. 일부 기능이 제한될 수 있습니다."
/>

<Alert
  type="danger"
  title="권한 없음"
  description="이 페이지에 접근할 권한이 없습니다."
  dismissible
  onDismiss={() => setShowAlert(false)}
/>
```

**규칙**:
- 액션 결과(저장, 삭제, 에러) → Toast
- 페이지 수준 안내(시스템 공지, 권한 경고) → Alert
- `ToastContainer`는 앱 루트에 한 번만
- 성공: `type="success"`, 에러: `type="error"`, 경고: `type="warning"`

---

## 6. 로딩 상태

**언제**: 데이터 fetching 중 UI 표시.

```tsx
// 테이블 로딩 — Table에 loading prop 사용
<Table columns={columns} data={data} loading={isLoading} />

// 카드/상세 로딩 — Skeleton으로 레이아웃 유지
{isLoading ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <SkeletonCircle size="lg" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <SkeletonText size="md" width={160} />
        <SkeletonText size="sm" width={100} />
      </div>
    </div>
    <SkeletonRect width="100%" height={120} radius="md" />
    <SkeletonText size="sm" width="80%" />
    <SkeletonText size="sm" width="60%" />
  </div>
) : (
  <UserDetail user={user} />
)}

// 버튼 로딩 — Button에 loading prop 사용
<Button loading={isSubmitting}>저장</Button>
```

**규칙**:
- 테이블: `Table`의 `loading` prop 사용 (별도 스피너 금지)
- 카드/상세: `Skeleton` 컴포넌트로 실제 레이아웃과 동일하게 배치
- 버튼 제출: `Button`의 `loading` prop 사용 (자동으로 disabled 처리됨)

---

## 7. 사용자 정보 표시

**언제**: 테이블 셀, 카드, 헤더에서 사용자 이름 + 아바타 조합.

```tsx
// 테이블 셀 내 사용자
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Avatar src={user.avatar} fallback={user.name[0]} size="sm" />
  <div>
    <div style={{ fontWeight: 'var(--ref-font-weight-500)', color: 'var(--sys-content-neutral-strong)' }}>
      {user.name}
    </div>
    <div style={{ fontSize: 'var(--ref-font-size-12)', color: 'var(--sys-content-neutral-muted)' }}>
      {user.email}
    </div>
  </div>
</div>

// 온라인 상태 포함
<Avatar
  src={user.avatar}
  fallback={user.name[0]}
  size="md"
  status={user.isOnline ? 'online' : 'offline'}
/>

// 프로필 헤더
<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
  <Avatar src={user.avatar} fallback={user.name[0]} size="xl" />
  <div>
    <div style={{ fontSize: 'var(--ref-font-size-18)', fontWeight: 'var(--ref-font-weight-600)' }}>
      {user.name}
    </div>
    <div style={{ color: 'var(--sys-content-neutral-muted)' }}>{user.role}</div>
    <Badge variant={user.status === 'active' ? 'success' : 'neutral'} size="sm">
      {user.statusLabel}
    </Badge>
  </div>
</div>
```

**규칙**:
- 이름 텍스트: `--sys-content-neutral-strong` + `--ref-font-weight-500`
- 보조 텍스트(이메일, 역할): `--sys-content-neutral-muted` + `--ref-font-size-12`
- 상태는 `Badge`로 표시 (텍스트 직접 출력 금지)
- 아바타 이미지 없을 때 `fallback`에 이름 첫 글자

---

---

## 8. 페이지 헤더 (Breadcrumb + 액션)

**언제**: 상세/편집 페이지 상단. 현재 위치 + 페이지 제목 + 주요 액션 버튼.

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
  <Breadcrumb
    items={[
      { label: '사용자 관리', onClick: () => navigate('/users') },
      { label: '상세' },
    ]}
  />
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <h1 style={{ fontSize: 'var(--ref-font-size-24)', fontWeight: 'var(--ref-font-weight-600)', color: 'var(--sys-content-neutral-strong)' }}>
      홍길동
    </h1>
    <ButtonGroup>
      <Button tone="secondary" variant="outline" onClick={handleDelete} leadingIcon={<Icon name="delete" size="sm" />}>
        삭제
      </Button>
      <Button onClick={handleEdit} leadingIcon={<Icon name="write" size="sm" />}>
        수정
      </Button>
    </ButtonGroup>
  </div>
</div>
```

**규칙**:
- Breadcrumb는 항상 제목 위에 배치
- 페이지 제목 우측에 주요 액션 버튼 (`ButtonGroup`으로 묶음)
- 파괴적 액션(삭제)은 `tone="secondary" variant="outline"`, 주 액션은 `tone="primary"`

---

## 9. 탭 전환 페이지

**언제**: 하나의 상세 페이지에서 여러 섹션을 탭으로 구분할 때.

```tsx
const tabs = [
  { key: 'info', label: '기본 정보' },
  { key: 'history', label: '활동 이력', trailing: <CountBadge count={activityCount} size="sm" tone="neutral" /> },
  { key: 'permissions', label: '권한 설정' },
]

const [activeTab, setActiveTab] = useState('info')

<div>
  <Tab items={tabs} activeKey={activeTab} onChange={setActiveTab} distribution="content" />
  <Divider />
  <div style={{ paddingTop: '24px' }}>
    {activeTab === 'info' && <InfoSection user={user} />}
    {activeTab === 'history' && <HistorySection userId={user.id} />}
    {activeTab === 'permissions' && <PermissionsSection userId={user.id} />}
  </div>
</div>
```

**규칙**:
- `Tab` 바로 아래 `<Divider />`로 구분선 추가
- 탭 콘텐츠 상단에 `paddingTop: 24px`
- 카운트가 있는 탭은 `trailing`에 `CountBadge` 사용
- `distribution="content"` — 항목 수가 적을 때, `distribution="equal"` — 항목 수가 많거나 균등 배치 필요 시

---

## 10. 뷰 전환 (SegmentedControl)

**언제**: 같은 데이터를 다른 형태(목록/그리드, 일/주/월 등)로 전환할 때.

```tsx
const [viewMode, setViewMode] = useState('list')

<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
  <span style={{ color: 'var(--sys-content-neutral-muted)' }}>
    총 {total}건
  </span>
  <SegmentedControl
    items={[
      { key: 'list', label: '목록' },
      { key: 'grid', label: '그리드' },
    ]}
    value={viewMode}
    onChange={setViewMode}
    size="sm"
    width="content"
  />
</div>

{viewMode === 'list' && <ListView data={data} />}
{viewMode === 'grid' && <GridView data={data} />}
```

**규칙**:
- 뷰 전환은 `SegmentedControl`, 필터/검색은 `Select` 또는 `ChoiceChipGroup` 사용
- 항목 수 2~4개에 적합 (5개 이상이면 `Tab` 또는 `Select` 고려)
- 우측 배치가 일반적 (좌측엔 결과 건수 등 요약 정보)

---

## 11. 테이블 행 액션 (IconButton)

**언제**: 테이블 각 행에 수정/삭제 등 아이콘 버튼이 필요할 때. `Button iconOnly` 대신 `IconButton` 사용.

```tsx
{
  key: 'actions',
  header: '',
  align: 'right',
  render: (row) => (
    <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
      <Tooltip content="수정">
        <IconButton
          icon={<Icon name="write" size="sm" />}
          aria-label="수정"
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(row)}
        />
      </Tooltip>
      <Tooltip content="삭제">
        <IconButton
          icon={<Icon name="delete" size="sm" />}
          aria-label="삭제"
          variant="ghost"
          emphasis="subdued"
          size="sm"
          onClick={() => handleDelete(row)}
        />
      </Tooltip>
    </div>
  ),
}
```

**규칙**:
- 테이블 행 액션은 `IconButton` 사용 (`Button iconOnly` 혼용 금지)
- 항상 `Tooltip`으로 감싸서 레이블 제공
- 삭제 등 파괴적 액션은 `emphasis="subdued"` (평소엔 흐리게)
- `aria-label` 필수

---

## 12. Accordion 설정/FAQ 패널

**언제**: 설정 항목을 카테고리별로 접을 수 있게 표시하거나 FAQ 목록.

```tsx
// 설정 패널 (하나씩만 열림)
<Accordion
  variation="contained"
  allowMultiple={false}
  items={[
    {
      key: 'account',
      label: '계정 설정',
      leading: <Icon name="person" size="sm" />,
      defaultOpen: true,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input label="이름" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <Input label="이메일" value={email} fullWidth readOnly />
        </div>
      ),
    },
    {
      key: 'security',
      label: '보안 설정',
      leading: <Icon name="setting" size="sm" />,
      content: <SecuritySettings />,
    },
    {
      key: 'notification',
      label: '알림 설정',
      leading: <Icon name="bell" size="sm" />,
      content: <NotificationSettings />,
    },
  ]}
/>

// FAQ (여러 개 동시 열림)
<Accordion
  items={faqItems}
  allowMultiple
  variation="plain"
/>
```

**규칙**:
- 설정 패널: `variation="contained"`, `allowMultiple={false}`, `leading`에 아이콘
- FAQ: `variation="plain"`, `allowMultiple={true}` (기본값)
- Accordion 내부 폼은 `fullWidth` Input/Select 사용

---

## 13. Row 목록

**언제**: 설정 메뉴, 선택 목록처럼 아이콘 + 텍스트 + 이동 화살표로 구성된 목록.

```tsx
// 설정 메뉴 목록
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <Row
    label="프로필 수정"
    leading={<Icon name="person" size="sm" />}
    onClick={() => navigate('/settings/profile')}
  />
  <Divider emphasis="weak" />
  <Row
    label="비밀번호 변경"
    leading={<Icon name="setting" size="sm" />}
    onClick={() => navigate('/settings/password')}
  />
  <Divider emphasis="weak" />
  <Row
    label="알림 설정"
    leading={<Icon name="bell" size="sm" />}
    trailing={<Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />}
    showChevron={false}
  />
</div>

// 사용자 선택 목록
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
  {members.map((member) => (
    <Row
      key={member.id}
      label={member.name}
      leading={<Avatar src={member.avatar} fallback={member.name[0]} size="sm" />}
      trailing={<Badge variant="success" size="sm">{member.role}</Badge>}
      onClick={() => handleSelect(member)}
    />
  ))}
</div>
```

**규칙**:
- Row 사이 구분선은 `<Divider emphasis="weak" />`
- `trailing`에 Switch 등 인터랙티브 요소가 있으면 `showChevron={false}`
- `leading`에는 `Icon` 또는 `Avatar` (크기 `sm`)

---

## 14. 긴 텍스트 입력 폼 (TextArea)

**언제**: 메모, 사유, 설명 등 여러 줄 텍스트 입력이 필요한 폼.

```tsx
<form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Input label="제목" placeholder="제목을 입력하세요" fullWidth />

  <TextArea
    label="내용"
    placeholder="내용을 입력하세요"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    maxLength={500}
    showCount
    rows={6}
    error={errors.content}
    fullWidth
  />

  {/* 처리 사유 (짧은 버전) */}
  <TextArea
    label="처리 사유"
    placeholder="사유를 입력하세요 (필수)"
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    maxLength={200}
    showCount
    error={errors.reason}
    fullWidth
  />

  <ButtonGroup style={{ justifyContent: 'flex-end' }}>
    <Button tone="secondary" variant="outline" onClick={onCancel}>취소</Button>
    <Button type="submit" loading={isSubmitting}>저장</Button>
  </ButtonGroup>
</form>
```

**규칙**:
- 글자 수 제한이 있으면 `maxLength` + `showCount` 함께 사용
- 필수 입력 TextArea는 `error` prop으로 에러 표시
- `rows`로 초기 높이 조절 (기본값은 3줄 정도)

---

## 15. Popover 컨텍스트 메뉴

**언제**: 버튼 클릭 시 추가 옵션을 드롭다운 형태로 표시. 계정 메뉴, 더보기 메뉴 등.

```tsx
const [open, setOpen] = useState(false)
const buttonRef = useRef<HTMLButtonElement>(null)

<div style={{ position: 'relative', display: 'inline-block' }}>
  <IconButton
    ref={buttonRef}
    icon={<Icon name="more_vertical" size="sm" />}
    aria-label="더보기"
    onClick={() => setOpen((v) => !v)}
  />
  {open && (
    <>
      <Backdrop visible onClick={() => setOpen(false)} tone="light" strength="default" style={{ background: 'transparent' }} />
      <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 50, marginTop: '4px' }}>
        <Popover>
          <PopoverSection>
            <TextButton tone="neutral" onClick={() => { setOpen(false); handleEdit() }}>수정</TextButton>
            <TextButton tone="neutral" onClick={() => { setOpen(false); handleDuplicate() }}>복사</TextButton>
          </PopoverSection>
          <PopoverSection>
            <TextButton tone="danger" onClick={() => { setOpen(false); handleDelete() }}>삭제</TextButton>
          </PopoverSection>
        </Popover>
      </div>
    </>
  )}
</div>
```

**규칙**:
- Popover는 `position: absolute` + `zIndex` 직접 관리
- 파괴적 액션(삭제)은 별도 `PopoverSection`으로 분리
- 열린 상태에서 외부 클릭 시 닫히도록 `Backdrop`(투명) 또는 `useEffect` 처리
- 닫기 후 액션 실행 순서: `setOpen(false)` → action

---

## 16. FloatingButton 고정 액션

**언제**: 목록 페이지에서 스크롤과 무관하게 항상 표시되는 주요 생성 버튼.

```tsx
// 페이지 컨테이너 (AppLayout children 내부)
<div style={{ position: 'relative', minHeight: '100%' }}>
  {/* 페이지 콘텐츠 */}
  <Table columns={columns} data={data} rowKey="id" />
  <Pagination total={total} page={page} onChange={setPage} />

  {/* 고정 버튼 */}
  <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 40 }}>
    <FloatingButton
      icon={<Icon name="plus" size="md" />}
      aria-label="새 항목 추가"
      onClick={() => navigate('/users/new')}
    />
  </div>
</div>

// 텍스트가 필요한 경우 (extended)
<FloatingButton
  shape="extended"
  icon={<Icon name="plus" size="sm" />}
  label="사용자 추가"
  onClick={() => setCreateModal(true)}
/>
```

**규칙**:
- `position: fixed`, `bottom: 32px`, `right: 32px`, `zIndex: 40`으로 고정
- `aria-label` 필수
- 화면당 FloatingButton은 최대 1개
- 모달 열기 또는 새 페이지 이동에만 사용 (즉각 처리 액션에는 사용 금지)

---

---

## 17. TopNavigation 글로벌 헤더

**언제**: 서비스 최상단 고정 네비게이션. `AppLayout` 상단에 배치하거나 단독으로 사용.

```tsx
// 로그인 상태 기본 사용
<TopNavigation
  items={[
    { label: '대시보드', href: '/', current: pathname === '/' },
    { label: '회원관리', href: '/users', current: pathname.startsWith('/users') },
    { label: '정산', href: '/billing', current: pathname.startsWith('/billing') },
  ]}
  onNotificationClick={() => setNotificationOpen(true)}
  onSettingsClick={() => navigate('/settings')}
  onAvatarClick={() => setProfileMenuOpen(true)}
  scrolled={scrolled}
/>

// 비로그인 상태
<TopNavigation trailing="authActions" onLoginClick={() => navigate('/login')} />
```

**규칙**:
- `items`의 `current`는 현재 경로와 비교해 동적으로 설정
- 스크롤 감지가 필요하면 `scrolled` prop에 scroll 이벤트 결과를 연결
- `trailing="authActions"`는 로그인 전 페이지에서만 사용

---

## 18. StateView — 빈 상태 / 오류 상태

**언제**: 테이블이나 목록에 데이터가 없거나, API 오류가 발생했을 때 콘텐츠 영역 대신 표시.

```tsx
// 오류 상태 (API 실패)
{isError && (
  <StateView variant="error" onAction={refetch} />
)}

// 빈 상태 (검색 결과 없음)
{!isLoading && data.length === 0 && (
  <StateView variant="empty" onAction={refetch} />
)}

// 커스텀 메시지
{!isLoading && data.length === 0 && (
  <StateView
    variant="empty"
    title="등록된 회원이 없어요"
    description="신규 회원을 추가해 보세요."
    actionLabel="회원 추가"
    onAction={() => setCreateModal(true)}
  />
)}

// 테이블과 함께 — 데이터 없을 때 StateView 교체
<div>
  {data.length > 0 ? (
    <Table columns={columns} data={data} rowKey="id" />
  ) : (
    <StateView variant="empty" />
  )}
</div>
```

**규칙**:
- `isLoading` 중에는 `Skeleton`을 표시하고 StateView는 로딩 완료 후에만 렌더링
- 오류와 빈 상태를 구분해서 `variant`를 정확히 사용
- `onAction` 없이도 사용 가능 (버튼 미표시)

---

## 19. Slider 값 선택

**언제**: 볼륨, 밝기 등 연속 범위 값 입력.

```tsx
const [volume, setVolume] = useState(50)

// 기본
<Slider value={volume} onChange={setVolume} />

// 아이콘 포함
<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  step={5}
  leadingIcon={<Icon name="minus" size="sm" />}
  trailingIcon={<Icon name="plus" size="sm" />}
/>
```

**규칙**:
- 제어 컴포넌트로 사용 시 `value` + `onChange` 세트로 연결
- 비제어 사용 시 `defaultValue`만 지정

---

> **업데이트 기록**
> - 2026-04-14: 초기 작성 (검색 필터, 테이블, 편집 폼, 확인 모달, 알림, 로딩, 사용자 표시)
> - 2026-04-15: 신규 패턴 추가 — 페이지 헤더(Breadcrumb), 탭 전환, 뷰 전환(SegmentedControl), 테이블 행 액션(IconButton), Accordion, Row 목록, TextArea 폼, Popover 컨텍스트 메뉴, FloatingButton
> - 2026-04-17: TopNavigation, StateView, Slider 패턴 추가
> - 2026-04-21: 신규 패턴 추가 — PageHeader, ConfirmDialog, Card/KpiCard 대시보드, FormLayout, Stepper, Progress, Tag/InputChip, FilterChip, DataList 상세 패널
> - 2026-04-21: DatePicker / DateRangePicker 패턴 추가 (신규 구현 반영)

---

## Drawer 패턴

### 상세 조회 + 편집

```tsx
const [drawerOpen, setDrawerOpen] = useState(false)
const [selected, setSelected] = useState<Item | null>(null)

// 테이블 행 클릭 → Drawer 오픈
const handleRowClick = (item: Item) => {
  setSelected(item)
  setDrawerOpen(true)
}

<Drawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  title={selected?.name ?? '상세 정보'}
  description="항목을 확인하고 편집하세요"
  footerLayout="inlineEnd"
  footerVariation="primary"
  primaryLabel="저장"
  secondaryLabel="취소"
  onPrimaryAction={handleSave}
>
  <ItemDetailForm item={selected} />
</Drawer>
```

### 삭제 액션 포함 (between + danger)

삭제 버튼이 왼쪽에, 취소+저장이 오른쪽에 배치됩니다. 실수로 삭제를 누르기 어렵게 분리.

```tsx
<Drawer
  open={open}
  onClose={onClose}
  title="항목 편집"
  footerLayout="between"
  footerVariation="danger"
  primaryLabel="저장"
  dangerLabel="삭제"
  onPrimaryAction={handleSave}
  onDangerAction={() => setConfirmDeleteOpen(true)}
>
  <EditForm />
</Drawer>

{/* 삭제는 ConfirmDialog로 2차 확인 */}
<ConfirmDialog
  open={confirmDeleteOpen}
  onClose={() => setConfirmDeleteOpen(false)}
  title="항목을 삭제하시겠습니까?"
  description="이 작업은 되돌릴 수 없습니다."
  tone="danger"
  onConfirm={handleDelete}
/>
```

### 필터 패널 (left placement)

```tsx
<Drawer
  open={filterOpen}
  onClose={() => setFilterOpen(false)}
  title="필터"
  description="조건을 선택하세요"
  placement="left"
  size="sm"
  footerLayout="inlineEnd"
  footerVariation="primary"
  primaryLabel="적용"
  secondaryLabel="초기화"
  onPrimaryAction={handleApplyFilter}
  onSecondaryAction={handleResetFilter}
>
  <FilterPanel filters={filters} onChange={setFilters} />
</Drawer>
```

**규칙**:
- `onSecondaryAction` 미지정 시 자동으로 `onClose` 연결 (취소 = 닫기)
- `between` 레이아웃의 `onDangerAction`에는 직접 삭제 대신 ConfirmDialog 연결 권장
- `size="md"` 이상은 긴 폼/테이블 등 컨텐츠가 많을 때 사용

---

## Layer 2 — 조합 패턴 (201~210)

> 컴포넌트를 올바르게 조합하는 방법. 아래 패턴을 벗어나는 조합은 별도 근거 없이 사용하지 않는다.

---

### 201. FilterBar 패턴 — 즉시반응 vs 버튼 클릭, 활성 칩 표시

**언제 어떤 방식을 쓰나**

| 방식 | 조건 | 구현 |
|------|------|------|
| 즉시반응 (onChange) | 필터 항목 ≤ 3개, 결과가 가볍게 조회될 때 | Select/Switch onChange에서 바로 fetch |
| 버튼 클릭 (검색 버튼) | 필터 항목 ≥ 4개 또는 무거운 쿼리 | 검색 버튼 클릭 시 한 번에 fetch |

**버튼 클릭 방식 (Searchbox 컴포넌트)**

```tsx
// 독립 패널형 — 조건이 많을 때
<Searchbox
  columns={2}
  onSearch={handleSearch}
  onReset={handleReset}
>
  <SearchboxGroup label="검색">
    <Select options={typeOptions} value={type} onChange={setType} />
    <Input placeholder="검색어 입력" value={keyword} onChange={e => setKeyword(e.target.value)} />
  </SearchboxGroup>
  <SearchboxGroup label="상태">
    <Select options={statusOptions} value={status} onChange={setStatus} />
  </SearchboxGroup>
</Searchbox>
```

**즉시반응 방식 (FilterBar 컴포넌트)**

```tsx
// 상단 바형 — 조건이 적고 반응이 빠를 때
<FilterBar
  filters={
    <>
      <Input
        search
        placeholder="이름 검색"
        value={keyword}
        onChange={e => { setKeyword(e.target.value); fetchData(); }}
        style={{ width: 240 }}
      />
      <Select options={statusOptions} value={status} onChange={val => { setStatus(val); fetchData(); }} style={{ width: 140 }} />
    </>
  }
  chips={activeFilters.map(f => (
    <InputChip key={f.key} label={f.label} value={f.key} onRemove={removeFilter} />
  ))}
/>
```

**활성 칩 표시 규칙**:
- 적용된 필터는 FilterBar `chips` 슬롯에 `InputChip`으로 표시
- `InputChip` onRemove → 해당 필터 값 초기화 → 즉시 재조회
- "전체 초기화"는 `TextButton tone="neutral"` 사용

---

### 202. Table + Pagination 연동 패턴

```tsx
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(20)
const { data, total, loading } = useFetch({ page, pageSize, ...filters })

<Table
  columns={columns}
  data={data}
  loading={loading}
  emptyText="데이터가 없습니다"
  striped
  stickyHeader
/>
<Pagination
  page={page}
  total={total}
  pageSize={pageSize}
  pageSizeOptions={[10, 20, 50, 100]}
  onChange={setPage}
  onPageSizeChange={size => { setPageSize(size); setPage(1) }}
/>
```

**규칙**:
- `pageSize` 변경 시 반드시 `page`를 1로 리셋
- `total`은 전체 레코드 수 (페이지 수 아님) — Pagination이 내부 계산
- `loading` 상태에서 Table은 자동으로 skeleton 표시

---

### 203. Table + 행 선택 + 상단 일괄 액션 패턴

```tsx
const [selectedKeys, setSelectedKeys] = useState<string[]>([])

// 선택된 행이 있을 때만 일괄 액션 노출
{selectedKeys.length > 0 && (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
    <span style={{ fontSize: 14, color: 'var(--sys-content-neutral-muted)' }}>
      {selectedKeys.length}개 선택됨
    </span>
    <Button tone="danger" variant="soft" size="sm" onClick={handleBulkDelete}>
      선택 삭제
    </Button>
    <Button tone="secondary" variant="outline" size="sm" onClick={handleBulkExport}>
      내보내기
    </Button>
  </div>
)}

// selectable은 prop이 아님 — selectedKeys 제공 시 자동으로 체크박스 컬럼 활성화
<Table
  columns={columns}
  data={data}
  rowKey="id"
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
/>
```

**규칙**:
- 일괄 액션 영역은 Table 바로 위에 위치 (PageHeader actions가 아님)
- 선택 해제 시 일괄 액션 영역 숨김 (`selectedKeys.length > 0` 조건)
- 파괴적 액션(삭제)은 반드시 ConfirmDialog 연결 (패턴 205 참조)

---

### 204. Table + 인라인 편집 패턴

셀 내 직접 편집이 필요한 경우 — 별도 Modal/Drawer 없이 처리.

```tsx
const columns = [
  {
    key: 'name',
    header: '이름',
    render: (row) => {
      if (editingKey === row.id) {
        return (
          <Input
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            size="sm"
            autoFocus
            onBlur={() => handleSave(row.id)}
            onKeyDown={e => { if (e.key === 'Enter') handleSave(row.id) }}
          />
        )
      }
      return (
        <span
          style={{ cursor: 'pointer' }}
          onDoubleClick={() => { setEditingKey(row.id); setEditValue(row.name) }}
        >
          {row.name}
        </span>
      )
    },
  },
]
```

**규칙**:
- 편집 진입: 셀 더블클릭 또는 행 액션의 편집 아이콘
- 저장: Enter 또는 포커스 벗어남 (onBlur)
- 취소: Escape 키 → 원래 값으로 복원
- 인라인 편집은 단순 텍스트/숫자 필드에만 — 복잡한 폼은 Drawer 사용 (패턴 206)

---

### 205. Modal 내 폼 패턴 (유효성 + 저장 흐름)

```tsx
const [open, setOpen] = useState(false)
const [form, setForm] = useState({ name: '', email: '' })
const [errors, setErrors] = useState<Record<string, string>>({})
const [saving, setSaving] = useState(false)

const validate = () => {
  const errs: Record<string, string> = {}
  if (!form.name) errs.name = '이름을 입력하세요'
  if (!form.email.includes('@')) errs.email = '올바른 이메일 형식이 아닙니다'
  setErrors(errs)
  return Object.keys(errs).length === 0
}

const handleSave = async () => {
  if (!validate()) return
  setSaving(true)
  try {
    await api.save(form)
    toast.success('저장되었습니다')
    setOpen(false)
  } catch {
    toast.error('저장에 실패했습니다')
  } finally {
    setSaving(false)
  }
}

// Modal은 primaryLoading prop 없음 — 저장 버튼을 footer에 직접 구성해 loading 제어
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="사용자 추가"
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button tone="secondary" variant="outline" onClick={() => setOpen(false)}>취소</Button>
      <Button onClick={handleSave} loading={saving}>저장</Button>
    </div>
  }
>
  <FormLayout>
    <Input label="이름" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} error={errors.name} />
    <Input label="이메일" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} error={errors.email} />
  </FormLayout>
</Modal>
```

**규칙**:
- Modal 크기: 폼 필드 ≤ 5개 → `size="sm"`, 6~10개 → `size="md"`, 그 이상 → Drawer 사용
- 저장 버튼에 `loading` 상태 연결 시 Modal `footer`에 직접 `Button loading={saving}` 구성 (Modal에 primaryLoading prop 없음)
- 에러는 각 Input `error` prop으로 표시 — 별도 Alert 사용 금지
- Modal 닫기 시 폼 상태 초기화 (`onClose`에서 setForm 리셋)

---

### 206. Drawer 내 폼 패턴

폼 필드 ≥ 6개이거나 미리보기가 필요한 편집 화면.

```tsx
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="사용자 편집"
  description="정보를 수정하고 저장을 눌러주세요"
  size="md"
  footerLayout="between"
  dangerLabel="삭제"
  primaryLabel="저장"
  secondaryLabel="취소"
  onPrimaryAction={handleSave}
  onDangerAction={() => setConfirmDelete(true)}
>
  <FormLayout gap="md">
    <FormSection title="기본 정보">
      <Input label="이름" value={form.name} onChange={...} error={errors.name} />
      <Input label="이메일" value={form.email} onChange={...} error={errors.email} />
      <Select label="역할" options={roleOptions} value={form.role} onChange={...} />
    </FormSection>
    <FormSection title="추가 정보">
      <TextArea label="메모" value={form.memo} onChange={...} showCount maxLength={200} />
    </FormSection>
  </FormLayout>
</Drawer>

{/* 삭제 확인 */}
<ConfirmDialog
  open={confirmDelete}
  onClose={() => setConfirmDelete(false)}
  title="사용자를 삭제하시겠습니까?"
  description="삭제된 데이터는 복구할 수 없습니다."
  confirmLabel="삭제"
  tone="danger"
  onConfirm={handleDelete}
/>
```

**규칙**:
- Drawer `size="sm"` → 단순 필터/설정 (≤ 4필드), `size="md"` → 일반 편집, `size="lg"` → 복잡한 편집/미리보기 포함
- 삭제 버튼(`dangerLabel`)은 ConfirmDialog 없이 직접 삭제 금지
- FormSection으로 필드를 논리적 그룹으로 묶기

---

### 207. Toast 연동 패턴 (API 성공/실패 피드백)

```tsx
// 공통 API 래퍼 패턴
const withToast = async (
  fn: () => Promise<void>,
  messages: { success: string; error?: string }
) => {
  try {
    await fn()
    toast.success(messages.success)
  } catch (err) {
    toast.error(messages.error ?? '오류가 발생했습니다. 다시 시도해주세요.')
  }
}

// 사용 예
await withToast(
  () => api.deleteUser(id),
  { success: '삭제되었습니다', error: '삭제에 실패했습니다' }
)
```

**tone 기준**:

| 상황 | tone | 예시 메시지 |
|------|------|----------|
| 저장/등록 성공 | `success` | "저장되었습니다" |
| 삭제 완료 | `success` | "삭제되었습니다" |
| 서버 오류 | `error` | "오류가 발생했습니다. 다시 시도해주세요." |
| 권한 없음 | `warning` | "권한이 없습니다" |
| 안내 | `info` | "변경사항이 자동 저장됩니다" |

**규칙**:
- API 성공/실패는 항상 Toast로 피드백 — Alert은 인라인 상태 표시 전용
- 오류 메시지는 사용자 행동 안내 포함 ("다시 시도해주세요", "관리자에게 문의하세요")
- Toast 중복 방지: 같은 액션에 `loading` 상태로 버튼 비활성화 → 완료 후 토스트

---

### 208. 권한별 버튼/메뉴 노출 패턴

```tsx
// 권한 훅
const { can } = usePermission()

// 버튼 조건부 노출
{can('user:delete') && (
  <Button tone="danger" variant="soft" onClick={() => setConfirmDelete(true)}>
    삭제
  </Button>
)}

// 테이블 행 액션 — 권한 없으면 아이콘버튼 disabled
<IconButton
  icon={<Icon name="write" size="sm" />}
  aria-label="수정"
  disabled={!can('user:edit')}
  onClick={() => handleEdit(row)}
/>

// 메뉴 항목 필터링
const menuItems = [
  { label: '수정', key: 'edit', show: can('user:edit') },
  { label: '삭제', key: 'delete', show: can('user:delete'), tone: 'danger' },
].filter(item => item.show)
```

**규칙**:
- 권한 없는 버튼: 숨김(`&&`) vs 비활성화(`disabled`) — 주요 액션은 숨김, 보조 액션은 비활성화
- `disabled` 사용 시 Tooltip으로 사유 표시: `<Tooltip content="권한이 없습니다"><Button disabled ...></Tooltip>`
- 권한 체크는 UI에서만 — 서버 API에서도 반드시 검증

---

### 209. 데이터 로딩 — Skeleton vs Spinner 사용 기준

| 상황 | 컴포넌트 | 이유 |
|------|---------|------|
| 페이지/섹션 최초 로딩 | `Skeleton` | 레이아웃 자리 선점, 덜 거슬림 |
| Table 데이터 로딩 | `Table loading={true}` | Table 내장 skeleton 사용 |
| 버튼 클릭 후 처리 중 | `Button loading={true}` | 버튼 내장 spinner |
| 전체 페이지 블로킹 | `Backdrop` + `Spinner` | 이동 불가 상태 표시 |
| 인라인 데이터 갱신 | `Skeleton` (해당 영역만) | 전체를 가리지 않음 |

```tsx
// 페이지 최초 로딩
if (isLoading) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton height={40} borderRadius={8} />
      <Skeleton height={40} borderRadius={8} />
      <Skeleton height={200} borderRadius={8} />
    </div>
  )
}

// 버튼 처리 중
<Button loading={saving} onClick={handleSave}>저장</Button>

// 전체 블로킹 (파일 업로드 등)
<Backdrop open={uploading}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <Spinner size="lg" />
    <span style={{ color: 'white' }}>업로드 중...</span>
  </div>
</Backdrop>
```

**규칙**:
- `Spinner` 단독 사용 금지 — 반드시 Button/Backdrop 내부에서 사용
- Skeleton 높이는 실제 콘텐츠 높이와 최대한 일치시킴
- Table `loading={true}`는 기존 데이터를 유지한 채 오버레이 — 빈 화면 방지

---

---

## 20. PageHeader 컴포넌트 사용

**언제**: 페이지 최상단에 제목, 부제목, 액션 버튼을 일관되게 배치. 수동으로 flex 조합하는 대신 PageHeader 컴포넌트 사용.

```tsx
// 목록 페이지
<PageHeader
  title="사용자 관리"
  subtitle={`총 ${total}명`}
  actions={
    <ButtonGroup>
      <Button tone="secondary" variant="outline" leadingIcon={<Icon name="arrow_down" size="sm" />}>
        내보내기
      </Button>
      <Button leadingIcon={<Icon name="plus" size="sm" />} onClick={() => setCreateOpen(true)}>
        사용자 추가
      </Button>
    </ButtonGroup>
  }
/>

// 상세 페이지 (Breadcrumb + 뒤로가기)
<PageHeader
  title={user.name}
  subtitle={user.email}
  leading={
    <IconButton
      icon={<Icon name="arrow_left" size="sm" />}
      aria-label="뒤로가기"
      onClick={() => navigate(-1)}
    />
  }
  footer={
    <Breadcrumb
      items={[
        { label: '사용자 관리', onClick: () => navigate('/users') },
        { label: user.name },
      ]}
    />
  }
  actions={
    <ButtonGroup>
      <Button tone="secondary" variant="outline" onClick={() => setDeleteOpen(true)}>삭제</Button>
      <Button onClick={() => setEditOpen(true)}>수정</Button>
    </ButtonGroup>
  }
/>
```

**규칙**:
- 페이지 상단 헤더는 항상 `PageHeader` 컴포넌트 사용 (div + h1 수동 조합 금지)
- 뒤로가기가 필요한 경우 `leading`에 `IconButton` 배치
- Breadcrumb은 `footer` 슬롯에 배치

---

## 21. ConfirmDialog 단독 사용

**언제**: Drawer/Modal 내부의 위험 액션(삭제) 또는 페이지 직접 삭제 버튼에서 2차 확인.

```tsx
const [confirmOpen, setConfirmOpen] = useState(false)
const [isDeleting, setIsDeleting] = useState(false)

const handleDelete = async () => {
  setIsDeleting(true)
  try {
    await api.deleteUser(userId)
    toast.success('삭제되었습니다')
    navigate('/users')
  } catch {
    toast.error('삭제에 실패했습니다')
  } finally {
    setIsDeleting(false)
    setConfirmOpen(false)
  }
}

// 삭제 버튼
<Button tone="danger" variant="soft" onClick={() => setConfirmOpen(true)}>
  사용자 삭제
</Button>

// ConfirmDialog (Modal보다 가볍고 명확)
<ConfirmDialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title="사용자를 삭제하시겠습니까?"
  description={`${user.name} 사용자가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.`}
  confirmLabel="삭제"
  tone="danger"
  loading={isDeleting}
  onConfirm={handleDelete}
/>
```

**규칙**:
- 단순 확인(삭제/비활성화)은 `ConfirmDialog`, 폼이 필요하면 `Modal`
- `loading` prop에 API 진행 상태 연결 — 완료 전 중복 클릭 방지
- `onClose`에서 loading 중에는 닫히지 않도록 처리 고려

---

## 22. KpiCard 대시보드

**언제**: 대시보드 상단에 주요 수치 지표를 카드 그리드로 표시.

```tsx
// 4열 KPI 그리드
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
  <KpiCard
    label="월간 활성 사용자"
    value={12480}
    unit="명"
    change={8.2}
    trend="up"
    icon={<Icon name="person" size="md" />}
  />
  <KpiCard
    label="이번 달 매출"
    value="₩48.2M"
    change={-3.1}
    trend="down"
    icon={<Icon name="star" size="md" />}
  />
  <KpiCard
    label="신규 가입"
    value={342}
    unit="명"
    change={12.5}
    trend="up"
    icon={<Icon name="plus" size="md" />}
  />
  <KpiCard
    label="미처리 문의"
    value={18}
    unit="건"
    icon={<Icon name="bell" size="md" />}
    description="오늘 기준"
  />
</div>
```

**규칙**:
- 4열이 기본 (화면 너비에 따라 2열 축소 가능)
- `trend="up"` + 양수 change: 초록, `trend="down"` + 음수 change: 빨강
- `description`은 짧게 (날짜 기준, 기간 등)

---

## 23. FormLayout으로 구조화된 폼

**언제**: 필드가 6개 이상이거나, 섹션 구분이 필요한 폼. 단순 flex 대신 `FormLayout` + `FormSection` + `FormItem` 조합 사용.

```tsx
<FormLayout gap="md">
  <FormSection title="기본 정보" description="필수 항목을 입력하세요">
    <FormItem label="이름" required>
      <Input
        value={form.name}
        onChange={(e) => update('name', e.target.value)}
        error={errors.name}
        fullWidth
      />
    </FormItem>
    <FormItem label="이메일" required error={errors.email}>
      <Input
        type="email"
        value={form.email}
        onChange={(e) => update('email', e.target.value)}
        fullWidth
      />
    </FormItem>
    <FormItem label="역할">
      <Select
        options={roleOptions}
        value={form.role}
        onChange={(value) => update('role', value as string)}
        fullWidth
      />
    </FormItem>
  </FormSection>

  <FormSection title="권한 설정">
    <FormItem label="접근 레벨">
      <SegmentedControl
        items={[{ key: 'read', label: '조회' }, { key: 'write', label: '편집' }, { key: 'admin', label: '관리자' }]}
        value={form.accessLevel}
        onChange={(key) => update('accessLevel', key)}
      />
    </FormItem>
    <FormItem label="메모" hint="최대 200자">
      <TextArea
        value={form.memo}
        onChange={(e) => update('memo', e.target.value)}
        maxLength={200}
        showCount
        fullWidth
      />
    </FormItem>
  </FormSection>
</FormLayout>
```

**규칙**:
- `FormItem`의 `error`는 중첩된 Input/Select의 `error`와 중복 지정하지 않는다 (하나만)
- `required` 표시는 `FormItem`에만 — Input에 별도 * 추가 금지
- `layout="horizontal"` 사용 시 `labelWidth` 지정 권장 (기본 레이블 너비 불균형 방지)

---

## 24. Stepper 단계 진행

**언제**: 여러 단계로 나뉜 프로세스(가입, 설정 마법사, 주문 등). 현재 단계와 완료/오류 상태를 시각화.

```tsx
const [currentStep, setCurrentStep] = useState('step1')

const steps = [
  { key: 'step1', label: '기본 정보', status: 'completed' as const },
  { key: 'step2', label: '약관 동의', status: 'current' as const },
  { key: 'step3', label: '인증', status: 'upcoming' as const },
  { key: 'step4', label: '완료', status: 'upcoming' as const },
]

// 상단 진행 표시 (수평)
<Stepper steps={steps} activeKey={currentStep} />

// 콘텐츠 영역
<div style={{ marginTop: 24 }}>
  {currentStep === 'step1' && <Step1Form onNext={() => setCurrentStep('step2')} />}
  {currentStep === 'step2' && <Step2Agreement onNext={() => setCurrentStep('step3')} onBack={() => setCurrentStep('step1')} />}
</div>

// 하단 네비게이션
<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
  <Button tone="secondary" variant="ghost" onClick={handleBack} disabled={currentStep === 'step1'}>
    이전
  </Button>
  <Button onClick={handleNext}>
    {currentStep === 'step4' ? '완료' : '다음'}
  </Button>
</div>
```

**규칙**:
- `status`는 단계 이동 시마다 업데이트 — 현재 단계 이전은 `completed`, 이후는 `upcoming`
- 유효성 검증 실패 시 해당 단계 status를 `error`로 변경
- 클릭으로 단계 이동이 허용되는 경우에만 `clickable={true}`

---

## 25. Progress 진행률 표시

**언제**: 파일 업로드, 단계 완료 등 진행 중인 작업의 완료 비율 표시.

```tsx
// 파일 업로드 진행률
const [uploadProgress, setUploadProgress] = useState(0)

<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>파일 업로드 중...</span>
    <span>{uploadProgress}%</span>
  </div>
  <Progress value={uploadProgress} tone="primary" size="sm" />
</div>

// 단계 완료 현황
<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
  <span style={{ color: 'var(--sys-content-neutral-muted)', fontSize: 'var(--ref-font-size-12)' }}>
    {completedSteps} / {totalSteps} 완료
  </span>
  <Progress value={completedSteps} max={totalSteps} tone="success" showValue />
</div>

// Indeterminate (API 로딩)
{isLoading && <Progress label="불러오는 중..." size="xs" />}
```

**규칙**:
- `value` 없는 indeterminate는 `Skeleton`보다 얇은 로딩 표시가 필요할 때
- `showValue` 사용 시 별도 퍼센트 텍스트 추가 금지
- tone: 완료/성공 → `success`, 경고 → `warning`, 오류 → `danger`

---

## 26. Tag / InputChip — 선택 항목 표시

**언제**: 다중 선택된 항목, 키워드 태그, 활성 필터를 칩/태그 형태로 표시.

```tsx
// 멀티 선택 태그 (삭제 가능)
const [tags, setTags] = useState(['React', 'TypeScript', 'Design System'])

<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
  {tags.map(tag => (
    <Tag key={tag} onRemove={() => setTags(tags.filter(t => t !== tag))}>
      {tag}
    </Tag>
  ))}
</div>

// 활성 필터 칩 (FilterBar chips 슬롯에 사용)
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  {activeFilters.map(f => (
    <InputChip
      key={f.key}
      label={f.label}
      value={f.key}
      onRemove={() => removeFilter(f.key)}
      variation="accent"
    />
  ))}
  {activeFilters.length > 0 && (
    <TextButton tone="neutral" size="sm" onClick={clearAllFilters}>전체 초기화</TextButton>
  )}
</div>
```

**규칙**:
- 삭제 가능한 선택 항목: `Tag` (onRemove 제공)
- 활성 필터 표시: `InputChip` (variation="accent"로 필터임을 구분)
- 전체 초기화: `TextButton tone="neutral"` (별도 버튼 컴포넌트 사용 금지)

---

## 27. DataList 상세 정보 패널

**언제**: 조회 전용 상세 정보를 라벨-값 그리드로 표시. 편집 폼 이전 "읽기 전용" 뷰.

```tsx
// Drawer 내 상세 조회
<DataList
  columns={2}
  layout="horizontal"
  items={[
    { label: '이름', value: user.name },
    { label: '이메일', value: user.email },
    { label: '역할', value: user.roleName },
    { label: '상태', value: <Badge variant={user.status === 'active' ? 'success' : 'neutral'}>{user.statusLabel}</Badge> },
    { label: '가입일', value: formatDate(user.createdAt) },
    { label: '최근 접속', value: formatDate(user.lastLogin) },
    { label: '메모', value: user.memo || '-', fullWidth: true },
  ]}
/>

// Card 내 상세 섹션
<Card>
  <CardHeader>기본 정보</CardHeader>
  <CardBody>
    <DataList
      columns={2}
      items={basicInfoItems}
    />
  </CardBody>
</Card>
```

**규칙**:
- `value`에 ReactNode 허용 — Badge, Link 등 컴포넌트 삽입 가능
- `fullWidth: true`는 긴 텍스트(주소, 메모)에 사용
- 빈 값은 `'-'` 문자열로 처리 (`null`, `undefined` 직접 전달 금지)

---

## 28. DatePicker / DateRangePicker

**언제**: 날짜 입력이 필요한 폼, 필터 조건의 기간 선택.

```tsx
// 단일 날짜 (DatePicker)
const [date, setDate] = useState<Date>()

<DatePicker
  label="등록일"
  value={date}
  onChange={setDate}
  error={errors.date}
/>

// 기간 선택 (DateRangePicker)
const [range, setRange] = useState<DateRange>({})

<DateRangePicker
  label="조회 기간"
  value={range}
  onChange={setRange}
  fullWidth
/>

// 폼 내 필수 기간 입력
<FormItem label="계약 기간" required error={!range.start || !range.end ? '기간을 선택하세요' : undefined}>
  <DateRangePicker value={range} onChange={setRange} fullWidth />
</FormItem>

// 필터바 기간 조건
<SearchboxGroup label="등록일">
  <Select
    options={[{ value: 'created', label: '등록일' }, { value: 'updated', label: '수정일' }]}
    value={dateType}
    onChange={(v) => setDateType(v as string)}
  />
  <DateRangePicker value={dateRange} onChange={setDateRange} />
</SearchboxGroup>
```

**규칙**:
- `value`는 `Date` 객체 — 문자열 직접 전달 금지 (`new Date(str)` 변환 후 전달)
- `DateRangePicker`의 `range.start`만 있고 `range.end`가 없으면 선택 중간 상태 — 저장/검색 버튼 비활성화 처리 권장
- 필터에서 날짜 범위 초기화: `setRange({})` (빈 객체)

---

### 210. EmptyState 사용 기준 및 CTA 패턴

```tsx
// 데이터가 없는 Table
<Table
  columns={columns}
  data={data}
  emptyText="등록된 데이터가 없습니다"  // Table 내장 empty 처리
/>

// 전체 페이지 Empty (최초 데이터 없음)
{data.length === 0 && !loading && (
  <StateView
    variant="empty"
    title="아직 등록된 사용자가 없습니다"
    description="새 사용자를 추가하여 시작해보세요"
    actionLabel="사용자 추가"
    onAction={() => setCreateOpen(true)}
  />
)}

// 검색 결과 없음 (필터 적용 상태)
{filteredData.length === 0 && hasActiveFilter && (
  <StateView
    variant="empty"
    title="검색 결과가 없습니다"
    description="다른 검색어나 필터를 시도해보세요"
    actionLabel="필터 초기화"
    onAction={handleReset}
  />
)}

// 오류 상태
{isError && (
  <StateView
    variant="error"
    title="데이터를 불러오지 못했습니다"
    description="잠시 후 다시 시도해주세요"
    actionLabel="다시 시도"
    onAction={refetch}
  />
)}
```

**규칙**:
- Table 내 빈 상태 → `Table emptyText` prop (StateView 불필요)
- 페이지 전체 빈 상태 → `StateView variant="empty"`
- 검색/필터 결과 없음 → CTA는 "필터 초기화" (새 항목 추가 아님)
- 오류 상태 → `StateView variant="error"` + 재시도 액션
- StateView는 페이지 중앙 배치: `style={{ minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}`

---

### 211. Autocomplete — 검색 가능한 선택 입력

```tsx
// 기본: 서버 옵션 + freeText 비허용 (선택만 가능)
const [value, setValue] = React.useState('')

<Autocomplete
  options={userOptions}          // { value: id, label: 이름 }
  value={value}
  onChange={setValue}
  onSelect={(v, label) => setSelectedUserId(v)}
  label="담당자"
  placeholder="이름으로 검색"
  freeText={false}               // 목록에 없는 값 입력 불가
  clearable
/>

// 자유 입력 허용 (태그, 검색어 등)
<Autocomplete
  options={recentKeywords}
  label="검색어"
  placeholder="검색어 입력"
  freeText                       // 기본값 true — 생략 가능
  onSelect={(_, label) => handleSearch(label)}
  onChange={(v) => setKeyword(v)}
/>
```

**규칙**:
- `freeText={false}` 시 목록에 없는 값은 blur 시 초기화되지 않음 — 상위에서 `onSelect` 기반으로 유효값 관리 필요
- `onSelect` 콜백의 첫 번째 인자는 `option.value` (id), 두 번째는 `option.label` (표시 텍스트)
- Select 대비 사용 기준: 옵션이 많아 스크롤이 필요하거나 검색이 필수인 경우 Autocomplete 선택

---

### 212. FileUpload — 파일 업로드 조합 패턴

```tsx
import { FileUploadButton, Dropzone, FileList, ImageUpload, validateFiles } from '@igt/design-system'
import type { UploadFile, RejectedFile } from '@igt/design-system'

// 단순 버튼 첨부 (폼 내 첨부 필드)
<FileUploadButton
  label="파일 첨부"
  accept=".pdf,.xlsx"
  allowedTypes={['.pdf', '.xlsx']}
  maxSizeBytes={10 * 1024 * 1024}  // 10MB
  onFilesSelected={(files) => handleAttach(files)}
  onFilesRejected={(rejected) => showError(rejected[0].reason)}
/>

// Dropzone + FileList 조합 (업로드 진행률 포함)
const [files, setFiles] = React.useState<UploadFile[]>([])

const handleSelected = (selected: File[]) => {
  const newFiles: UploadFile[] = selected.map((f) => ({
    id: crypto.randomUUID(),
    file: f,
    status: 'uploading',
    progress: 0,
  }))
  setFiles((prev) => [...prev, ...newFiles])
  // 업로드 로직...
}

<Dropzone
  multiple
  allowedTypes={['image/*', 'application/pdf']}
  maxSizeBytes={20 * 1024 * 1024}
  onFilesSelected={handleSelected}
  onFilesRejected={(r) => toast.error(r[0].reason)}
/>
<FileList
  files={files}
  onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
/>

// 이미지 업로드 + 프리뷰
const [previews, setPreviews] = React.useState<string[]>([])

const handleImages = (selected: File[]) => {
  const urls = selected.map((f) => URL.createObjectURL(f))
  setPreviews((prev) => [...prev, ...urls])
}

<ImageUpload
  multiple
  previewUrls={previews}
  onFilesSelected={handleImages}
  onRemovePreview={(i) => setPreviews((prev) => prev.filter((_, idx) => idx !== i))}
/>
```

**규칙**:
- `FileUploadButton` — 인라인 폼 첨부, Dropzone — 파일 전용 업로드 구역
- `allowedTypes`와 `accept`를 함께 지정: `accept`는 OS 파일 다이얼로그 필터, `allowedTypes`는 JS 레벨 검증
- `ImageUpload` 사용 시 `URL.createObjectURL`로 생성한 URL은 컴포넌트 언마운트 시 `URL.revokeObjectURL` 호출

---

### 213. TagInput — 다중 키워드/태그 입력

```tsx
// 기본 사용 (비제어)
<TagInput
  label="키워드"
  placeholder="입력 후 Enter"
  defaultValue={['React', 'TypeScript']}
  onChange={(tags) => console.log(tags)}
  maxTags={10}
/>

// 제어형 (폼 연동)
const [tags, setTags] = React.useState<string[]>([])

<TagInput
  label="태그"
  placeholder="태그 추가"
  value={tags}
  onChange={setTags}
  error={tags.length === 0 ? '최소 1개 이상 입력하세요' : undefined}
  fullWidth
/>
```

**규칙**:
- Enter / 쉼표가 기본 구분자 — `separators` prop으로 변경 가능
- `blur` 시 미완성 입력값도 태그로 자동 추가됨
- 중복 방지가 기본값(`allowDuplicate={false}`) — 중복 입력 시 입력창만 초기화
- `maxTags` 도달 시 input 숨김 처리됨 (추가 입력 불가)

---

### 214. Timeline — 이벤트 히스토리 표시

```tsx
// 주문/처리 이력
<Timeline
  items={[
    { title: '주문 접수', time: '2024-01-10 10:00', status: 'success', description: '주문번호 #12345' },
    { title: '결제 완료', time: '2024-01-10 10:05', status: 'success' },
    { title: '상품 준비 중', time: '2024-01-11 09:00', status: 'pending' },
    { title: '배송 시작', status: 'default' },
  ]}
/>

// 커스텀 아이콘 dot
<Timeline
  items={[
    { title: '파일 업로드', icon: 'document_paper_solid', status: 'success' },
    { title: '검토 중', icon: 'user_circle', status: 'warning' },
    { title: '승인 거절', icon: 'x_circle', status: 'error' },
  ]}
/>
```

**규칙**:
- `status`는 dot 색상 결정: `success`(녹색), `warning`(노란색), `error`(빨간색), `pending`(회색), `default`(기본)
- `icon` prop이 있으면 status 기본 아이콘 대신 커스텀 아이콘 사용
- 마지막 항목(`isLast`)에는 수직선 미표시

---

### 215. TreeView — 계층 데이터 탐색

```tsx
// 파일 탐색기 스타일 (제어형)
const [selected, setSelected] = React.useState<string>('')
const [expanded, setExpanded] = React.useState<string[]>(['folder-1'])

<TreeView
  nodes={folderStructure}
  selectedKey={selected}
  onSelect={(key) => setSelected(key)}
  expandedKeys={expanded}
  onExpandedKeysChange={setExpanded}
  indent={20}
/>

// 메뉴/카테고리 트리 (비제어, 기본 펼침)
<TreeView
  nodes={menuNodes}
  defaultExpandedKeys={['category-1', 'category-2']}
  onSelect={(key, node) => router.push(`/category/${key}`)}
/>
```

**규칙**:
- `expandedKeys`를 지정하면 제어형 — `onExpandedKeysChange` 반드시 함께 연결
- 자식이 있는 노드 클릭 시 펼침/접힘 + `onSelect` 동시 호출됨
- 키보드: `ArrowRight` 펼침, `ArrowLeft` 접힘, `Enter`/`Space` 선택
- `disabled` 노드는 클릭/키보드 선택 모두 불가

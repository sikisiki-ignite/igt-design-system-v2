# IGT Design System — Usage Patterns

> 백오피스에서 자주 쓰는 컴포넌트 조합 패턴 모음.
> 단순 컴포넌트 나열이 아니라 **"이런 화면은 이렇게 조합한다"** 가이드.
> 개별 컴포넌트 props는 `component-catalog.md` 참조.

---

## 목차

1. [검색 필터 바](#1-검색-필터-바)
0. [페이지 배경 & 카드 섹션](#0-페이지-배경--카드-섹션)
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
    onChange={(e) => setStatus(e.target.value)}
    style={{ width: 140 }}
  />
  <Select
    options={roleOptions}
    placeholder="역할 전체"
    value={role}
    onChange={(e) => setRole(e.target.value)}
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
            leadingIcon={<Icon name="edit" size="sm" />}
            onClick={() => handleEdit(row)}
          />
        </Tooltip>
        <Tooltip content="삭제">
          <Button
            tone="danger"
            variant="ghost"
            size="sm"
            iconOnly
            leadingIcon={<Icon name="trash" size="sm" />}
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
      <Button tone="secondary" variant="outline" onClick={handleDelete} leadingIcon={<Icon name="trash" size="sm" />}>
        삭제
      </Button>
      <Button onClick={handleEdit} leadingIcon={<Icon name="edit" size="sm" />}>
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
          icon={<Icon name="edit" size="sm" />}
          aria-label="수정"
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(row)}
        />
      </Tooltip>
      <Tooltip content="삭제">
        <IconButton
          icon={<Icon name="trash" size="sm" />}
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
      leading: <Icon name="lock" size="sm" />,
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
    leading={<Icon name="lock" size="sm" />}
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

> **업데이트 기록**
> - 2026-04-14: 초기 작성 (검색 필터, 테이블, 편집 폼, 확인 모달, 알림, 로딩, 사용자 표시)
> - 2026-04-15: 신규 패턴 추가 — 페이지 헤더(Breadcrumb), 탭 전환, 뷰 전환(SegmentedControl), 테이블 행 액션(IconButton), Accordion, Row 목록, TextArea 폼, Popover 컨텍스트 메뉴, FloatingButton

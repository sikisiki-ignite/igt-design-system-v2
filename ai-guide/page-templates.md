# IGT Design System — 페이지 템플릿

> **Layer 3 — 백오피스 표준 화면 4종**  
> 기준일: 2026-04-20  
> 이 문서를 읽은 AI는 4가지 표준 화면을 동일한 구조로 구성해야 한다.

---

## 공통 원칙

1. **PageHeader는 모든 화면에 존재한다** — 제목, 설명, 우측 액션 버튼
2. **여백의 기준:** 페이지 콘텐츠 영역 padding = `var(--ref-space-24)`
3. **섹션 간 간격:** `gap: var(--ref-space-20)` (기본), 복잡도 높으면 `var(--ref-space-24)`
4. **AppLayout을 반드시 사용** — `<AppLayout>` 안에 `<PageHeader>` + 콘텐츠
5. **로딩 상태:** Table은 `loading` prop, 카드는 `<Skeleton>` 사용

---

## 301 — 목록 페이지 (List Page)

**구성:** PageHeader + FilterBar + Table + Pagination

### 언제 사용하는가

데이터 목록을 조회·검색·필터링하는 화면. 가장 자주 사용되는 백오피스 패턴.

### 레이아웃 구조

```
┌─────────────────────────────────────────┐
│ PageHeader (제목 + 등록 버튼)            │
├─────────────────────────────────────────┤
│ FilterBar (검색 + 필터 + 우측 액션)      │
├─────────────────────────────────────────┤
│ 집계 바 (총 N개 · N개 선택)              │
├─────────────────────────────────────────┤
│ Table                                   │
├─────────────────────────────────────────┤
│ Pagination                              │
└─────────────────────────────────────────┘
```

### 코드 템플릿

```tsx
import React, { useState } from 'react'
import {
  PageHeader, FilterBar, Table, Pagination,
  Button, Input, Select, TextButton
} from 'igt-design-system'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: '활성' | '비활성'
  createdAt: string
}

const columns: TableColumn<User>[] = [
  { key: 'name', header: '이름', sortable: true, width: 140 },
  { key: 'email', header: '이메일', sortable: true },
  { key: 'role', header: '역할', width: 120 },
  {
    key: 'status',
    header: '상태',
    width: 100,
    render: (row) => (
      <StatusBadge status={row.status === '활성' ? 'active' : 'inactive'} />
    ),
  },
  { key: 'createdAt', header: '가입일', width: 120, align: 'center' },
  {
    key: 'actions',
    header: '',
    width: 80,
    render: (row) => (
      <TextButton size="sm" tone="neutral" onClick={() => handleDetail(row)}>상세</TextButton>
    ),
  },
]

export function UserListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sortKey, setSortKey] = useState<string | undefined>()
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  // 실제 구현 시 API 호출로 대체
  const data: User[] = []
  const total = 0

  const handleDetail = (row: User) => {
    // navigate to detail page
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ref-space-20)', padding: 'var(--ref-space-24)' }}>
      <PageHeader
        title="회원 관리"
        subtitle={`총 ${total.toLocaleString()}명`}
        actions={
          <>
            <Button variant="outline" size="md">내보내기</Button>
            <Button variant="fill" size="md" tone="primary">회원 등록</Button>
          </>
        }
      />

      <FilterBar
        filters={
          <>
            <Input
              placeholder="이름 또는 이메일 검색"
              search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 280 }}
            />
            <Select
              options={[
                { value: 'all', label: '전체 상태' },
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 140 }}
            />
          </>
        }
        actions={
          <>
            <Button variant="ghost" size="md">초기화</Button>
            <Button variant="fill" size="md">검색</Button>
          </>
        }
      />

      {/* 집계 바 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-body-xs-size)', color: 'var(--sys-content-neutral-muted)' }}>
        <span>총 {total}개</span>
        {selectedKeys.size > 0 && (
          <>
            <span>·</span>
            <span>{selectedKeys.size}개 선택</span>
            <TextButton size="sm" tone="danger">선택 삭제</TextButton>
          </>
        )}
      </div>

      <Table
        columns={columns}
        data={data}
        rowKey="id"
        loading={loading}
        sortKey={sortKey}
        sortDirection={sortDir}
        onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        striped
        bordered
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onChange={setPage}
        pageSizeOptions={[10, 20, 50]}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
```

### 체크리스트

- [ ] PageHeader title/subtitle에 실제 데이터 수량 반영
- [ ] FilterBar 초기화 버튼 → 모든 필터 state 리셋 + page=1
- [ ] 검색/필터 변경 시 page=1로 리셋
- [ ] Table `loading` prop 연결
- [ ] 선택 삭제 시 Confirm Dialog 사용

---

## 302 — 상세 페이지 (Detail Page)

**구성:** PageHeader + DataList + (관련 Table) + 하단 액션

### 언제 사용하는가

단일 항목의 세부 정보를 조회하는 화면. 읽기 전용 + 편집/삭제 진입점.

### 레이아웃 구조

```
┌─────────────────────────────────────────┐
│ PageHeader (제목 + 뒤로가기 + 수정/삭제) │
├─────────────────────────────────────────┤
│ Card / DataList (기본 정보)              │
├─────────────────────────────────────────┤
│ Card / DataList (추가 정보)              │
├─────────────────────────────────────────┤
│ (선택) 관련 Table (하위 데이터)          │
└─────────────────────────────────────────┘
```

### 코드 템플릿

```tsx
import React, { useState } from 'react'
import {
  PageHeader, DataList, Card, CardHeader, CardBody,
  Button, IconButton, Divider, Table, Pagination,
  ConfirmDialog, Toast
} from 'igt-design-system'

export function UserDetailPage({ userId }: { userId: string }) {
  const [deleteOpen, setDeleteOpen] = useState(false)

  // 실제 구현 시 API 호출로 대체
  const user = {
    name: '홍길동',
    email: 'hong@company.com',
    role: '관리자',
    status: '활성',
    phone: '010-1234-5678',
    department: '개발팀',
    createdAt: '2024-01-15',
    lastLogin: '2026-04-20',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ref-space-20)', padding: 'var(--ref-space-24)' }}>
      <PageHeader
        title={user.name}
        subtitle={user.email}
        leading={<IconButton variant="ghost" size="md" icon="arrow_left" aria-label="뒤로" onClick={() => history.back()} />}
        actions={
          <>
            <Button variant="outline" size="md" tone="danger" onClick={() => setDeleteOpen(true)}>삭제</Button>
            <Button variant="fill" size="md">수정</Button>
          </>
        }
      />

      {/* 기본 정보 */}
      <Card bordered>
        <CardHeader title="기본 정보" />
        <CardBody>
          <DataList
            items={[
              { label: '이름', value: user.name },
              { label: '이메일', value: user.email },
              { label: '전화번호', value: user.phone },
              { label: '부서', value: user.department },
            ]}
            layout="horizontal"
            columns={2}
          />
        </CardBody>
      </Card>

      {/* 계정 정보 */}
      <Card bordered>
        <CardHeader title="계정 정보" />
        <CardBody>
          <DataList
            items={[
              { label: '역할', value: user.role },
              { label: '상태', value: user.status },
              { label: '가입일', value: user.createdAt },
              { label: '최근 로그인', value: user.lastLogin },
            ]}
            layout="horizontal"
            columns={2}
          />
        </CardBody>
      </Card>

      {/* 삭제 확인 */}
      <ConfirmDialog
        open={deleteOpen}
        title="회원을 삭제하시겠습니까?"
        description="삭제된 회원 정보는 복구할 수 없습니다."
        confirmLabel="삭제"
        tone="danger"
        onConfirm={() => { /* API 호출 */ setDeleteOpen(false) }}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  )
}
```

### 체크리스트

- [ ] leading에 뒤로가기 IconButton 배치
- [ ] 삭제는 반드시 ConfirmDialog 거침
- [ ] 데이터 로딩 중 DataList 자리에 SkeletonRect 표시
- [ ] 수정 버튼 → Drawer 또는 폼 페이지로 이동

---

## 303 — 폼 페이지 (Form Page)

**구성:** PageHeader + FormLayout(FormSection × N) + 하단 고정 버튼

### 언제 사용하는가

신규 등록 또는 편집 화면. 여러 입력 필드를 그룹화해 구성.

### 레이아웃 구조

```
┌─────────────────────────────────────────┐
│ PageHeader (제목 + 취소)                 │
├─────────────────────────────────────────┤
│ FormSection 1 (기본 정보)                │
│   FormItem × N                          │
├─────────────────────────────────────────┤
│ FormSection 2 (추가 정보)                │
│   FormItem × N                          │
├─────────────────────────────────────────┤
│ [취소] [저장]  ← 하단 고정 또는 인라인   │
└─────────────────────────────────────────┘
```

### 코드 템플릿

```tsx
import React, { useState } from 'react'
import {
  PageHeader, FormLayout, FormSection, FormItem,
  Input, Select, TextArea, Switch,
  Button, Divider, IconButton
} from 'igt-design-system'

export function UserCreatePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    department: '',
    memo: '',
    sendWelcome: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name) errs.name = '이름을 입력하세요.'
    if (!form.email) errs.email = '이메일을 입력하세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = '올바른 이메일 형식이 아닙니다.'
    return errs
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      // await api.createUser(form)
      // navigate back
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ref-space-20)', padding: 'var(--ref-space-24)' }}>
      <PageHeader
        title="회원 등록"
        leading={<IconButton variant="ghost" size="md" icon="arrow_left" aria-label="뒤로" onClick={() => history.back()} />}
        actions={<Button variant="ghost" size="md" onClick={() => history.back()}>취소</Button>}
      />

      <FormLayout layout="vertical" gap="md">
        <FormSection title="기본 정보" description="회원의 기본 정보를 입력해주세요.">
          <FormItem label="이름" required error={errors.name}>
            <Input
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="이름을 입력하세요"
              error={!!errors.name}
            />
          </FormItem>
          <FormItem label="이메일" required error={errors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="example@company.com"
              error={!!errors.email}
            />
          </FormItem>
          <FormItem label="전화번호">
            <Input
              value={form.phone}
              onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="010-0000-0000"
            />
          </FormItem>
        </FormSection>

        <FormSection title="계정 설정">
          <FormItem label="역할" required>
            <Select
              options={[
                { value: 'admin', label: '관리자' },
                { value: 'manager', label: '매니저' },
                { value: 'user', label: '일반 사용자' },
              ]}
              value={form.role}
              onChange={(v) => setForm(f => ({ ...f, role: v as string }))}
            />
          </FormItem>
          <FormItem label="부서">
            <Input
              value={form.department}
              onChange={(e) => setForm(f => ({ ...f, department: e.target.value }))}
              placeholder="소속 부서"
            />
          </FormItem>
          <FormItem label="메모" hint="최대 500자">
            <TextArea
              value={form.memo}
              onChange={(e) => setForm(f => ({ ...f, memo: e.target.value }))}
              placeholder="메모를 입력하세요"
              rows={3}
              showCount
              maxLength={500}
            />
          </FormItem>
          <FormItem label="환영 이메일 발송">
            <Switch
              checked={form.sendWelcome}
              onChange={(v) => setForm(f => ({ ...f, sendWelcome: v }))}
            />
          </FormItem>
        </FormSection>
      </FormLayout>

      {/* 하단 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--ref-space-8)', paddingTop: 'var(--ref-space-8)' }}>
        <Button variant="outline" size="md" onClick={() => history.back()}>취소</Button>
        <Button variant="fill" size="md" tone="primary" loading={saving} onClick={handleSubmit}>저장</Button>
      </div>
    </div>
  )
}
```

### 체크리스트

- [ ] 필수 필드(`required`)에 * 표시 + 유효성 검증 후 FormItem `error` prop 연결
- [ ] 저장 버튼에 `loading` prop 연결 (중복 제출 방지)
- [ ] 취소 시 변경사항 있으면 ConfirmDialog로 이탈 확인
- [ ] 에러 발생 시 Toast로 피드백
- [ ] Drawer 내 폼일 경우 `FormLayout`만 사용 (PageHeader 불필요)

---

## 304 — 대시보드 (Dashboard)

**구성:** PageHeader + KPI Card 그리드 + (Chart) + 요약 Table

### 언제 사용하는가

주요 지표와 현황을 한눈에 파악하는 홈/대시보드 화면.

### 레이아웃 구조

```
┌─────────────────────────────────────────┐
│ PageHeader (대시보드 + 기간 필터)        │
├─────────────────────────────────────────┤
│ KpiCard × 4  (2열 또는 4열 그리드)       │
├─────────────────────────────────────────┤
│ Chart (Line/Bar) — 선택적               │
├─────────────────────────────────────────┤
│ 요약 Table (최근 N건)                    │
└─────────────────────────────────────────┘
```

### 코드 템플릿

```tsx
import React, { useState } from 'react'
import {
  PageHeader, KpiCard, Card, CardHeader, CardBody,
  Table, TableColumn, Select, Button, Divider,
  StatusBadge, TextButton
} from 'igt-design-system'

const recentColumns: TableColumn<RecentOrder>[] = [
  { key: 'id', header: '주문번호', width: 120 },
  { key: 'customer', header: '고객명', width: 140 },
  { key: 'amount', header: '금액', width: 120, align: 'right', render: (r) => `${r.amount.toLocaleString()}원` },
  { key: 'status', header: '상태', width: 100, render: (r) => <StatusBadge status={r.status} /> },
  { key: 'createdAt', header: '주문일시', width: 160 },
  { key: 'detail', header: '', width: 60, render: () => <TextButton size="sm" tone="neutral">보기</TextButton> },
]

export function DashboardPage() {
  const [period, setPeriod] = useState('7d')

  // 실제 구현 시 API 데이터로 대체
  const kpis = [
    { label: '총 회원수', value: '12,345', unit: '명', change: 12.5, trend: 'up' as const },
    { label: '오늘 신규 가입', value: '48', unit: '명', change: -3.2, trend: 'down' as const },
    { label: '월간 매출', value: '48,200,000', unit: '원', change: 8.1, trend: 'up' as const },
    { label: '처리 대기', value: '23', unit: '건', change: 0, trend: 'neutral' as const },
  ]

  const recentData: RecentOrder[] = []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ref-space-20)', padding: 'var(--ref-space-24)' }}>
      <PageHeader
        title="대시보드"
        subtitle="실시간 현황을 확인하세요."
        actions={
          <Select
            options={[
              { value: '7d', label: '최근 7일' },
              { value: '30d', label: '최근 30일' },
              { value: '90d', label: '최근 90일' },
            ]}
            value={period}
            onChange={(v) => setPeriod(v as string)}
            style={{ width: 140 }}
          />
        }
      />

      {/* KPI 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--ref-space-16)' }}>
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            change={kpi.change}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* 요약 Table */}
      <Card bordered>
        <CardHeader
          title="최근 주문"
          action={<TextButton size="sm" tone="neutral">전체 보기</TextButton>}
        />
        <CardBody style={{ padding: 0 }}>
          <Table
            columns={recentColumns}
            data={recentData}
            rowKey="id"
          />
        </CardBody>
      </Card>
    </div>
  )
}
```

### 체크리스트

- [ ] KPI 그리드는 반응형 고려: 4열(1280px+) → 2열(768px+) → 1열
- [ ] 기간 필터 변경 시 모든 KPI + Table 데이터 동시 갱신
- [ ] KpiCard `change` 값: 양수=up(green), 음수=down(red), 0=neutral
- [ ] 요약 Table은 최대 10건, "전체 보기"로 목록 페이지 연결
- [ ] 로딩 중 KpiCard 자리에 `<SkeletonRect height={120} />` 사용

---

## 레이아웃 래퍼 패턴

모든 페이지는 `AppLayout` 안에서 렌더링된다:

```tsx
import { AppLayout } from 'igt-design-system'

function App() {
  return (
    <AppLayout
      topNav={<TopNavigation ... />}
      sideNav={<SideNavigation ... />}
    >
      {/* 각 페이지 컴포넌트 */}
      <UserListPage />
    </AppLayout>
  )
}
```

콘텐츠 영역의 스크롤은 `AppLayout`이 처리하므로 각 페이지 컴포넌트에서 별도 `overflow` 설정 불필요.

---

## 컴포넌트 선택 가이드

| 상황 | 컴포넌트 |
|------|---------|
| 목록 조회 | 301 목록 페이지 패턴 |
| 단일 항목 조회 | 302 상세 페이지 패턴 |
| 신규 등록 / 수정 (독립 화면) | 303 폼 페이지 패턴 |
| 신규 등록 / 수정 (슬라이드 편집) | Drawer 내 FormLayout 패턴 (`usage-patterns.md` 206번) |
| 요약/현황 | 304 대시보드 패턴 |
| 삭제 전 확인 | ConfirmDialog 필수 |
| API 성공/실패 피드백 | Toast 필수 |

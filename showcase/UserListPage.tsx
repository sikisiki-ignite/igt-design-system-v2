import React, { useState } from 'react'
import { AppLayout } from '../src/components/AppLayout'
import { Button } from '../src/components/Button'
import { Input } from '../src/components/Input'
import { Select } from '../src/components/Select'
import { Badge } from '../src/components/Badge'
import { Avatar } from '../src/components/Avatar'
import { Icon } from '../src/components/Icon'
import { Tooltip } from '../src/components/Tooltip'
import { Modal } from '../src/components/Modal'
import { Toast, ToastContainer } from '../src/components/Toast'
import { Table, TableColumn } from '../src/components/Table'
import { Alert } from '../src/components/Alert'
import { Divider } from '../src/components/Divider'
import { RadioGroup, RadioGroupItem } from '../src/components/Checkbox/RadioGroup'
import { CountBadge } from '../src/components/Badge'
import { SideNavigation, SideNavigationList, NavItem, NavSectionHeader } from '../src/components/SideNavigation'

/* ============================================================
   타입
   ============================================================ */
type UserStatus = 'active' | 'inactive' | 'pending'
type UserRole = 'admin' | 'manager' | 'viewer'

interface User {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

/* ============================================================
   목 데이터
   ============================================================ */
const MOCK_USERS: User[] = [
  { id: 1, name: '김민준', email: 'minjun@igt.com', role: 'admin', status: 'active', createdAt: '2025-01-03' },
  { id: 2, name: '이서연', email: 'seoyeon@igt.com', role: 'manager', status: 'active', createdAt: '2025-02-11' },
  { id: 3, name: '박지호', email: 'jiho@igt.com', role: 'viewer', status: 'inactive', createdAt: '2025-03-05' },
  { id: 4, name: '최수아', email: 'sua@igt.com', role: 'manager', status: 'pending', createdAt: '2025-03-20' },
  { id: 5, name: '정태양', email: 'taeyang@igt.com', role: 'viewer', status: 'active', createdAt: '2025-04-01' },
  { id: 6, name: '한예진', email: 'yejin@igt.com', role: 'viewer', status: 'inactive', createdAt: '2025-04-08' },
]

const STATUS_OPTIONS = [
  { value: '', label: '상태 전체' },
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'pending', label: '대기' },
]

const ROLE_OPTIONS = [
  { value: '', label: '역할 전체' },
  { value: 'admin', label: '관리자' },
  { value: 'manager', label: '매니저' },
  { value: 'viewer', label: '뷰어' },
]

const ROLE_EDIT_OPTIONS = [
  { value: 'admin', label: '관리자' },
  { value: 'manager', label: '매니저' },
  { value: 'viewer', label: '뷰어' },
]

/* ============================================================
   헬퍼
   ============================================================ */
const statusBadgeVariant = (s: UserStatus) =>
  s === 'active' ? 'success' : s === 'inactive' ? 'danger' : 'warning'

const statusLabel = (s: UserStatus) =>
  s === 'active' ? '활성' : s === 'inactive' ? '비활성' : '대기'

const roleLabel = (r: UserRole) =>
  r === 'admin' ? '관리자' : r === 'manager' ? '매니저' : '뷰어'

/* ============================================================
   Toast 훅
   ============================================================ */
interface ToastItem { id: number; type: 'success' | 'error'; message: string }

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const show = (type: ToastItem['type'], message: string) =>
    setToasts((p) => [...p, { id: Date.now(), type, message }])
  const remove = (id: number) =>
    setToasts((p) => p.filter((t) => t.id !== id))
  return { toasts, show, remove }
}

/* ============================================================
   메인
   ============================================================ */
interface UserListPageProps {
  onBack?: () => void
}

export function UserListPage({ onBack }: UserListPageProps) {
  const { toasts, show, remove } = useToast()

  const [keyword, setKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [sortKey, setSortKey] = useState('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)
  const [loading, setLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editTarget, setEditTarget] = useState<User | null>(null)
  const [editForm, setEditForm] = useState<{ role: string; status: string }>({ role: '', status: '' })
  const [isSaving, setIsSaving] = useState(false)
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [showAlert, setShowAlert] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const filtered = users.filter((u) => {
    const matchKeyword = !keyword || u.name.includes(keyword) || u.email.includes(keyword)
    const matchStatus = !statusFilter || u.status === statusFilter
    const matchRole = !roleFilter || u.role === roleFilter
    return matchKeyword && matchStatus && matchRole
  })

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = (a as Record<string, string>)[sortKey]
    const bv = (b as Record<string, string>)[sortKey]
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 800)
  }

  const handleReset = () => {
    setKeyword('')
    setStatusFilter('')
    setRoleFilter('')
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setUsers((p) => p.filter((u) => u.id !== deleteTarget!.id))
      show('success', `${deleteTarget!.name} 사용자를 삭제했습니다.`)
      setDeleteTarget(null)
      setIsDeleting(false)
    }, 800)
  }

  const openEdit = (user: User) => {
    setEditTarget(user)
    setEditForm({ role: user.role, status: user.status })
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setUsers((p) =>
        p.map((u) =>
          u.id === editTarget!.id
            ? { ...u, role: editForm.role as UserRole, status: editForm.status as UserStatus }
            : u
        )
      )
      show('success', '사용자 정보를 수정했습니다.')
      setEditTarget(null)
      setIsSaving(false)
    }, 600)
  }

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      header: '사용자',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar fallback={row.name[0]} size="sm" />
          <div>
            <div style={{ fontWeight: 'var(--ref-font-weight-500)', color: 'var(--sys-content-neutral-strong)' }}>
              {row.name}
            </div>
            <div style={{ fontSize: 'var(--ref-font-size-12)', color: 'var(--sys-content-neutral-muted)' }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: '역할',
      render: (row) => (
        <span style={{ fontSize: 'var(--ref-font-size-14)', color: 'var(--sys-content-neutral-default)' }}>
          {roleLabel(row.role)}
        </span>
      ),
    },
    {
      key: 'status',
      header: '상태',
      render: (row) => (
        <Badge variant={statusBadgeVariant(row.status) as any}>
          {statusLabel(row.status)}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: '등록일',
      align: 'right',
      sortable: true,
      render: (row) => (
        <span style={{ fontSize: 'var(--ref-font-size-13)', color: 'var(--sys-content-neutral-muted)' }}>
          {row.createdAt}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (row) => (
        <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
          <Tooltip content="수정">
            <Button
              tone="secondary" variant="ghost" size="sm" iconOnly
              leadingIcon={<Icon name="write" size="sm" />}
              aria-label="수정"
              onClick={(e) => { e.stopPropagation(); openEdit(row) }}
            />
          </Tooltip>
          <Tooltip content="삭제">
            <Button
              tone="danger" variant="ghost" size="sm" iconOnly
              leadingIcon={<Icon name="delete" size="sm" />}
              aria-label="삭제"
              onClick={(e) => { e.stopPropagation(); setDeleteTarget(row) }}
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  /* ---- Top Nav ---- */
  const topNav = (
    <div style={{
      height: '100%',
      background: 'var(--sys-surface-base)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 12,
    }}>
      {/* 로고 */}
      <div style={{ fontWeight: 'var(--ref-font-weight-700)', fontSize: 'var(--ref-font-size-16)', color: 'var(--sys-content-brand-default)', marginRight: 16 }}>
        IGT Admin
      </div>

      <div style={{ flex: 1 }} />

      {/* 알림 */}
      <div style={{ position: 'relative' }}>
        <Button tone="secondary" variant="ghost" size="sm" iconOnly leadingIcon={<Icon name="bell" size="sm" />} aria-label="알림" />
        <div style={{ position: 'absolute', top: 2, right: 2 }}>
          <CountBadge count={3} size="sm" />
        </div>
      </div>

      {/* 테마 토글 */}
      <Button tone="secondary" variant="ghost" size="sm" iconOnly
        leadingIcon={<Icon name={theme === 'light' ? 'eyes_off' : 'eyes_on'} size="sm" />}
        aria-label="테마 전환"
        onClick={toggleTheme}
      />

      {/* 돌아가기 */}
      {onBack && (
        <Button tone="secondary" variant="outline" size="sm" onClick={onBack}>
          ← 쇼케이스로
        </Button>
      )}

      {/* 사용자 아바타 */}
      <Avatar fallback="관" size="sm" status="online" />
    </div>
  )

  /* ---- Side Nav (LNB) ---- */
  const sideNav = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '8px' }}>
      <SideNavigation tone="accent" style={{ flex: 1 }}>
        <SideNavigationList>
          <NavItem
            as="button"
            tone="accent"
            leadingIcon={<Icon name="chart_bar" size="sm" />}
          >
            대시보드
          </NavItem>
          <NavItem
            as="button"
            tone="accent"
            current
            leadingIcon={<Icon name="person" size="sm" />}
          >
            사용자 관리
          </NavItem>
          <NavItem
            as="button"
            tone="accent"
            leadingIcon={<Icon name="setting" size="sm" />}
          >
            설정
          </NavItem>
        </SideNavigationList>
      </SideNavigation>

      <Divider />
      <div style={{ padding: '12px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar fallback="관" size="sm" status="online" />
        <div>
          <div style={{ fontSize: 'var(--ref-font-size-13)', fontWeight: 'var(--ref-font-weight-500)', color: 'var(--sys-content-neutral-strong)' }}>
            관리자
          </div>
          <div style={{ fontSize: 'var(--ref-font-size-11)', color: 'var(--sys-content-neutral-muted)' }}>
            admin@igt.com
          </div>
        </div>
      </div>
    </div>
  )

  /* ---- Content ---- */
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* 페이지 헤더 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 'var(--ref-font-size-20)', fontWeight: 'var(--ref-font-weight-600)', color: 'var(--sys-content-neutral-strong)' }}>
            사용자 관리
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 'var(--ref-font-size-14)', color: 'var(--sys-content-neutral-muted)' }}>
            총 {users.length}명
          </p>
        </div>
        <Button leadingIcon={<Icon name="plus" size="sm" />} onClick={() => show('success', '사용자 추가 기능은 준비 중입니다.')}>
          사용자 추가
        </Button>
      </div>

      {/* 고정 알림 */}
      {showAlert && (
        <Alert
          type="info"
          title="안내"
          description="이 화면은 backoffice-dev 스킬 검증용 목 페이지입니다. 실제 데이터는 변경되지 않습니다."
          dismissible
          onDismiss={() => setShowAlert(false)}
        />
      )}

      <Divider />

      {/* 검색 필터 바 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <Input
          placeholder="이름, 이메일 검색"
          prefix={<Icon name="search" size="sm" />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ width: 240 }}
        />
        <Select
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 140 }}
        />
        <Select
          options={ROLE_OPTIONS}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ width: 140 }}
        />
        <Button tone="secondary" variant="outline" onClick={handleReset}>
          초기화
        </Button>
        <Button leadingIcon={<Icon name="search" size="sm" />} loading={loading} onClick={handleSearch}>
          검색
        </Button>
      </div>

      {/* 테이블 */}
      <Table
        columns={columns}
        data={sorted}
        rowKey="id"
        loading={loading}
        striped
        sortKey={sortKey}
        sortDirection={sortDir}
        onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
        emptyText="검색 결과가 없습니다."
        onRowClick={(row) => openEdit(row)}
      />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      <AppLayout topNav={topNav} sideNav={sideNav}>
        {content}
      </AppLayout>

      {/* 삭제 확인 모달 */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="사용자 삭제"
        size="sm"
        closeOnOverlayClick={false}
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button tone="secondary" variant="outline" onClick={() => setDeleteTarget(null)}>취소</Button>
            <Button tone="danger" loading={isDeleting} onClick={handleDelete}>삭제</Button>
          </div>
        }
      >
        <p style={{ margin: 0, color: 'var(--sys-content-neutral-default)' }}>
          <strong>{deleteTarget?.name}</strong> 사용자를 삭제하시겠습니까?
          <br />
          <span style={{ fontSize: 'var(--ref-font-size-13)', color: 'var(--sys-content-neutral-muted)' }}>
            이 작업은 되돌릴 수 없습니다.
          </span>
        </p>
      </Modal>

      {/* 편집 모달 */}
      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="사용자 수정"
        size="sm"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button tone="secondary" variant="outline" onClick={() => setEditTarget(null)}>취소</Button>
            <Button loading={isSaving} onClick={handleSave}>저장</Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--sys-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
            <Avatar fallback={editTarget?.name[0] ?? ''} size="md" />
            <div>
              <div style={{ fontWeight: 'var(--ref-font-weight-500)', color: 'var(--sys-content-neutral-strong)' }}>
                {editTarget?.name}
              </div>
              <div style={{ fontSize: 'var(--ref-font-size-12)', color: 'var(--sys-content-neutral-muted)' }}>
                {editTarget?.email}
              </div>
            </div>
          </div>
          <Select
            label="역할"
            options={ROLE_EDIT_OPTIONS}
            value={editForm.role}
            onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
            fullWidth
          />
          <RadioGroup
            label="계정 상태"
            value={editForm.status}
            onChange={(val) => setEditForm((f) => ({ ...f, status: val }))}
          >
            <RadioGroupItem value="active" label="활성" />
            <RadioGroupItem value="inactive" label="비활성" />
            <RadioGroupItem value="pending" label="대기" />
          </RadioGroup>
        </div>
      </Modal>

      {/* Toast */}
      <ToastContainer position="top-right">
        {toasts.map((t) => (
          <Toast key={t.id} type={t.type} message={t.message} onClose={() => remove(t.id)} />
        ))}
      </ToastContainer>
    </div>
  )
}

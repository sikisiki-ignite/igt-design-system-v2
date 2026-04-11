import React, { useState } from 'react'
import { Button } from '../src/components/Button'
import { Input } from '../src/components/Input'
import { Select } from '../src/components/Select'
import { Checkbox } from '../src/components/Checkbox/Checkbox'
import { Radio } from '../src/components/Checkbox/Radio'
import { Badge } from '../src/components/Badge'
import { Table, TableColumn } from '../src/components/Table'
import { Modal } from '../src/components/Modal'
import { Toast, ToastContainer } from '../src/components/Toast'
import { Tooltip } from '../src/components/Tooltip'

/* ---- 아이콘 ---- */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 4h10M6 4V3h4v1M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ---- 테이블 데이터 ---- */
interface User { id: number; name: string; email: string; role: string; status: string }
const USERS: User[] = [
  { id: 1, name: '김민준', email: 'minjun@igt.com', role: '관리자', status: 'active' },
  { id: 2, name: '이서연', email: 'seoyeon@igt.com', role: '운영자', status: 'inactive' },
  { id: 3, name: '박지호', email: 'jiho@igt.com', role: '뷰어', status: 'pending' },
  { id: 4, name: '최수아', email: 'sua@igt.com', role: '운영자', status: 'active' },
  { id: 5, name: '정도윤', email: 'doyun@igt.com', role: '뷰어', status: 'active' },
]

const STATUS_MAP: Record<string, { variant: 'success' | 'danger' | 'warning'; label: string }> = {
  active: { variant: 'success', label: '활성' },
  inactive: { variant: 'danger', label: '비활성' },
  pending: { variant: 'warning', label: '대기' },
}

const NAV_ITEMS = [
  { id: 'button', label: 'Button' },
  { id: 'input', label: 'Input' },
  { id: 'select', label: 'Select' },
  { id: 'checkbox', label: 'Checkbox / Radio' },
  { id: 'badge', label: 'Badge' },
  { id: 'table', label: 'Table' },
  { id: 'modal', label: 'Modal' },
  { id: 'toast', label: 'Toast' },
  { id: 'tooltip', label: 'Tooltip' },
]

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [modalOpen, setModalOpen] = useState(false)
  const [toasts, setToasts] = useState<{ id: number; type: 'success' | 'error' | 'warning' | 'info'; message: string }[]>([])
  const [activeNav, setActiveNav] = useState('button')
  const [sortKey, setSortKey] = useState<string | undefined>()
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)
  const [allChecked, setAllChecked] = useState(false)
  const [someChecked, setSomeChecked] = useState(false)
  const [gender, setGender] = useState('male')

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const addToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: '저장이 완료되었습니다.',
      error: '오류가 발생했습니다. 다시 시도해주세요.',
      warning: '주의가 필요한 항목이 있습니다.',
      info: '새로운 업데이트가 있습니다.',
    }
    const id = Date.now()
    setToasts((prev) => [...prev, { id, type, message: messages[type] }])
  }

  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const handleSort = (key: string, dir: 'asc' | 'desc' | null) => {
    setSortKey(key)
    setSortDir(dir)
  }

  const columns: TableColumn<User>[] = [
    { key: 'name', header: '이름', sortable: true },
    { key: 'email', header: '이메일' },
    { key: 'role', header: '역할', sortable: true },
    {
      key: 'status',
      header: '상태',
      render: (row) => (
        <Badge variant={STATUS_MAP[row.status].variant} dot>
          {STATUS_MAP[row.status].label}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: 90,
      align: 'right',
      render: () => (
        <Button size="sm" variant="secondary" buttonStyle="ghost">상세보기</Button>
      ),
    },
  ]

  const scrollTo = (id: string) => {
    setActiveNav(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="sc-layout">
      {/* Sidebar */}
      <aside className="sc-sidebar">
        <div className="sc-sidebar__logo">IGT <span>DS</span> v2</div>
        <nav className="sc-sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeNav === item.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="sc-theme-toggle">
          <Button
            size="sm"
            variant="secondary"
            buttonStyle="outline"
            fullWidth
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="sc-main">

        {/* ===== BUTTON ===== */}
        <section className="sc-section" id="button">
          <h2 className="sc-section__title">Button</h2>
          <p className="sc-section__desc">variant × buttonStyle × size 조합. loading, icon 지원.</p>

          <div className="sc-block">
            <div className="sc-block__label">Primary</div>
            <div className="sc-row">
              <Button buttonStyle="fill">Fill</Button>
              <Button buttonStyle="soft">Soft</Button>
              <Button buttonStyle="outline">Outline</Button>
              <Button buttonStyle="ghost">Ghost</Button>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Secondary</div>
            <div className="sc-row">
              <Button variant="secondary" buttonStyle="fill">Fill</Button>
              <Button variant="secondary" buttonStyle="soft">Soft</Button>
              <Button variant="secondary" buttonStyle="outline">Outline</Button>
              <Button variant="secondary" buttonStyle="ghost">Ghost</Button>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Danger</div>
            <div className="sc-row">
              <Button variant="danger" buttonStyle="fill">Fill</Button>
              <Button variant="danger" buttonStyle="soft">Soft</Button>
              <Button variant="danger" buttonStyle="outline">Outline</Button>
              <Button variant="danger" buttonStyle="ghost">Ghost</Button>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Size</div>
            <div className="sc-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">States &amp; Icon</div>
            <div className="sc-row">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button iconLeft={<PlusIcon />}>추가</Button>
              <Button iconLeft={<SearchIcon />} buttonStyle="outline">검색</Button>
              <Button variant="danger" buttonStyle="soft" iconLeft={<TrashIcon />}>삭제</Button>
            </div>
          </div>
        </section>

        {/* ===== INPUT ===== */}
        <section className="sc-section" id="input">
          <h2 className="sc-section__title">Input</h2>
          <p className="sc-section__desc">outline / fill 스타일. label, hint, error, prefix/suffix 지원.</p>

          <div className="sc-form-grid">
            <Input label="이름" placeholder="이름을 입력하세요" />
            <Input label="이메일" type="email" placeholder="email@example.com" hint="로그인에 사용됩니다" />
            <Input label="검색" prefix={<SearchIcon />} placeholder="키워드 입력" />
            <Input label="금액" suffix="원" placeholder="0" />
            <Input label="오류 상태" error="필수 항목입니다" placeholder="입력해주세요" />
            <Input label="비활성" disabled placeholder="수정 불가" />
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>Fill style</div>
            <div className="sc-form-grid">
              <Input fieldStyle="fill" label="이름" placeholder="이름을 입력하세요" />
              <Input fieldStyle="fill" label="검색" prefix={<SearchIcon />} placeholder="키워드 입력" />
            </div>
          </div>
        </section>

        {/* ===== SELECT ===== */}
        <section className="sc-section" id="select">
          <h2 className="sc-section__title">Select</h2>
          <p className="sc-section__desc">outline / fill 스타일. placeholder, error, disabled 지원.</p>

          <div className="sc-form-grid">
            <Select
              label="상태"
              placeholder="선택하세요"
              options={[
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
                { value: 'pending', label: '대기' },
              ]}
            />
            <Select
              label="역할"
              options={[
                { value: 'admin', label: '관리자' },
                { value: 'operator', label: '운영자' },
                { value: 'viewer', label: '뷰어' },
              ]}
              defaultValue="operator"
            />
            <Select
              label="오류 상태"
              placeholder="선택하세요"
              error="필수 항목입니다"
              options={[{ value: '1', label: '옵션 1' }]}
            />
            <Select
              label="비활성"
              disabled
              options={[{ value: '1', label: '옵션 1' }]}
              defaultValue="1"
            />
          </div>
        </section>

        {/* ===== CHECKBOX / RADIO ===== */}
        <section className="sc-section" id="checkbox">
          <h2 className="sc-section__title">Checkbox / Radio</h2>

          <div className="sc-block">
            <div className="sc-block__label">Checkbox</div>
            <div className="sc-col">
              <Checkbox label="기본 체크박스" />
              <Checkbox
                label="전체 선택 (indeterminate)"
                indeterminate={someChecked && !allChecked}
                checked={allChecked}
                onChange={(e) => { setAllChecked(e.target.checked); setSomeChecked(false) }}
              />
              <Checkbox
                label="일부 선택 토글"
                checked={someChecked}
                onChange={(e) => setSomeChecked(e.target.checked)}
              />
              <Checkbox label="오류 상태" error="동의가 필요합니다" />
              <Checkbox label="비활성" disabled />
              <Checkbox label="비활성 + 체크됨" disabled checked readOnly />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Radio</div>
            <div className="sc-col">
              <Radio
                label="남성"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              />
              <Radio
                label="여성"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
              <Radio label="비활성" name="gender2" disabled />
            </div>
          </div>
        </section>

        {/* ===== BADGE ===== */}
        <section className="sc-section" id="badge">
          <h2 className="sc-section__title">Badge</h2>

          <div className="sc-block">
            <div className="sc-block__label">Soft (기본)</div>
            <div className="sc-row">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Fill</div>
            <div className="sc-row">
              <Badge variant="neutral" badgeStyle="fill">Neutral</Badge>
              <Badge variant="info" badgeStyle="fill">Info</Badge>
              <Badge variant="success" badgeStyle="fill">Success</Badge>
              <Badge variant="warning" badgeStyle="fill">Warning</Badge>
              <Badge variant="danger" badgeStyle="fill">Danger</Badge>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Outline</div>
            <div className="sc-row">
              <Badge variant="neutral" badgeStyle="outline">Neutral</Badge>
              <Badge variant="info" badgeStyle="outline">Info</Badge>
              <Badge variant="success" badgeStyle="outline">Success</Badge>
              <Badge variant="warning" badgeStyle="outline">Warning</Badge>
              <Badge variant="danger" badgeStyle="outline">Danger</Badge>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Dot + Size</div>
            <div className="sc-row">
              <Badge variant="success" dot>활성</Badge>
              <Badge variant="danger" dot>비활성</Badge>
              <Badge variant="warning" dot>대기</Badge>
              <Badge variant="info" size="sm">신규</Badge>
              <Badge variant="neutral" size="sm">기본</Badge>
            </div>
          </div>
        </section>

        {/* ===== TABLE ===== */}
        <section className="sc-section" id="table">
          <h2 className="sc-section__title">Table</h2>
          <p className="sc-section__desc">정렬, Badge 상태 표시, 행 클릭, 빈 상태, 로딩 지원.</p>

          <div className="sc-table-wrap">
            <Table
              columns={columns}
              data={USERS}
              rowKey="id"
              sortKey={sortKey}
              sortDirection={sortDir}
              onSort={handleSort}
              striped
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>빈 상태 / 로딩</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Table columns={columns} data={[]} emptyText="등록된 사용자가 없습니다." />
              <Table columns={columns} data={[]} loading />
            </div>
          </div>
        </section>

        {/* ===== MODAL ===== */}
        <section className="sc-section" id="modal">
          <h2 className="sc-section__title">Modal</h2>
          <p className="sc-section__desc">ESC·오버레이 클릭으로 닫힘. 스크롤 잠금.</p>

          <div className="sc-row">
            <Button onClick={() => setModalOpen(true)} iconLeft={<PlusIcon />}>
              모달 열기
            </Button>
          </div>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="사용자 정보 수정"
            size="md"
            footer={
              <>
                <Button variant="secondary" buttonStyle="outline" onClick={() => setModalOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => { setModalOpen(false); addToast('success') }}>
                  저장
                </Button>
              </>
            }
          >
            <div className="sc-form-grid">
              <Input label="이름" defaultValue="김민준" fullWidth />
              <Input label="이메일" type="email" defaultValue="minjun@igt.com" fullWidth />
              <Select
                label="역할"
                defaultValue="admin"
                options={[
                  { value: 'admin', label: '관리자' },
                  { value: 'operator', label: '운영자' },
                  { value: 'viewer', label: '뷰어' },
                ]}
                fullWidth
              />
              <Select
                label="상태"
                defaultValue="active"
                options={[
                  { value: 'active', label: '활성' },
                  { value: 'inactive', label: '비활성' },
                ]}
                fullWidth
              />
            </div>
          </Modal>
        </section>

        {/* ===== TOAST ===== */}
        <section className="sc-section" id="toast">
          <h2 className="sc-section__title">Toast</h2>
          <p className="sc-section__desc">4가지 타입. 4초 후 자동 닫힘.</p>

          <div className="sc-row">
            <Button variant="secondary" buttonStyle="soft" onClick={() => addToast('success')}>
              <Badge variant="success" size="sm" style={{ marginRight: 4 }}>✓</Badge> Success
            </Button>
            <Button variant="secondary" buttonStyle="soft" onClick={() => addToast('error')}>
              <Badge variant="danger" size="sm" style={{ marginRight: 4 }}>✕</Badge> Error
            </Button>
            <Button variant="secondary" buttonStyle="soft" onClick={() => addToast('warning')}>
              <Badge variant="warning" size="sm" style={{ marginRight: 4 }}>!</Badge> Warning
            </Button>
            <Button variant="secondary" buttonStyle="soft" onClick={() => addToast('info')}>
              <Badge variant="info" size="sm" style={{ marginRight: 4 }}>i</Badge> Info
            </Button>
          </div>
        </section>

        {/* ===== TOOLTIP ===== */}
        <section className="sc-section" id="tooltip">
          <h2 className="sc-section__title">Tooltip</h2>
          <p className="sc-section__desc">호버·포커스로 표시. 4방향 배치.</p>

          <div className="sc-row" style={{ paddingTop: 16, paddingBottom: 16 }}>
            <Tooltip content="상단 툴팁" placement="top">
              <Button buttonStyle="outline">Top</Button>
            </Tooltip>
            <Tooltip content="하단 툴팁" placement="bottom">
              <Button buttonStyle="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="좌측 툴팁" placement="left">
              <Button buttonStyle="outline">Left</Button>
            </Tooltip>
            <Tooltip content="우측 툴팁" placement="right">
              <Button buttonStyle="outline">Right</Button>
            </Tooltip>
            <Tooltip content="삭제할 수 없습니다" placement="top">
              <span>
                <Button variant="danger" buttonStyle="soft" disabled>비활성 버튼</Button>
              </span>
            </Tooltip>
          </div>
        </section>

      </main>

      {/* Toast Container */}
      <ToastContainer position="top-right">
        {toasts.map((t) => (
          <Toast key={t.id} type={t.type} message={t.message} onClose={() => removeToast(t.id)} />
        ))}
      </ToastContainer>
    </div>
  )
}

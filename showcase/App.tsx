import React, { useState } from 'react'
import { UserListPage } from './UserListPage'
import { Button } from '../src/components/Button'
import { Input } from '../src/components/Input'
import { Select } from '../src/components/Select'
import { Checkbox } from '../src/components/Checkbox/Checkbox'
import { CheckboxGroup } from '../src/components/Checkbox/CheckboxGroup'
import { Radio } from '../src/components/Checkbox/Radio'
import { RadioGroup, RadioGroupItem } from '../src/components/Checkbox/RadioGroup'
import { Alert } from '../src/components/Alert'
import { Avatar } from '../src/components/Avatar'
import { Switch, SwitchField } from '../src/components/Switch'
import { Divider } from '../src/components/Divider'
import { Label } from '../src/components/Label'
import { SkeletonText, SkeletonRect, SkeletonCircle } from '../src/components/Skeleton'
import { Badge, CountBadge, DotBadge } from '../src/components/Badge'
import { Table, TableColumn } from '../src/components/Table'
import { Modal } from '../src/components/Modal'
import { Toast, ToastContainer } from '../src/components/Toast'
import { Tooltip } from '../src/components/Tooltip'
import { Icon } from '../src/components/Icon'
import type { IconName } from '../src/components/Icon'
import { ChoiceChip, ChoiceChipGroup, ChoiceChipGroupItem } from '../src/components/ChoiceChip'
import { Pagination } from '../src/components/Pagination'
import { AppLayout } from '../src/components/AppLayout'
import { SideNavigation, SideNavigationList, NavItem, NavSectionHeader } from '../src/components/SideNavigation'
import { TextArea } from '../src/components/TextArea'
import { Breadcrumb } from '../src/components/Breadcrumb'
import { Tab } from '../src/components/Tab'
import { Accordion } from '../src/components/Accordion'
import { SegmentedControl } from '../src/components/SegmentedControl'
import { PageIndicator } from '../src/components/PageIndicator'
import { Popover, PopoverSection } from '../src/components/Popover'
import { NumberStepper } from '../src/components/NumberStepper'
import { Rating } from '../src/components/Rating'
import { Row } from '../src/components/Row'
import { TextButton } from '../src/components/TextButton'
import { IconButton } from '../src/components/IconButton'
import { Link } from '../src/components/Link'
import { ButtonGroup } from '../src/components/ButtonGroup'
import { ToggleButton } from '../src/components/ToggleButton'
import { FloatingButton } from '../src/components/FloatingButton'

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
interface Company {
  id: number
  name: string
  status: 'active' | 'ended'
  type: string
  bizNo: string
  address: string
}

const COMPANIES: Company[] = [
  { id: 1, name: '현대자동차그룹', status: 'active', type: '법인', bizNo: '110-82-1234567', address: '경기 성남시 분당구 황새울로 25번길 41 4층' },
  { id: 2, name: '포르쉐코리아', status: 'active', type: '법인', bizNo: '110-82-1234567', address: '서울시 강남구 삼성동 서울특별시 강남구' },
  { id: 3, name: '제네시스네스트', status: 'active', type: '개인사업자', bizNo: '110-82-1234567', address: '경기 성남시 분당구 황새울로' },
  { id: 4, name: '하이브랩', status: 'ended', type: '법인', bizNo: '110-82-1234567', address: '경기 성남시 분당구 황새울로' },
  { id: 5, name: '포르쉐코리아', status: 'ended', type: '법인', bizNo: '110-82-1234567', address: '서울시 강남구 삼성동 서울특별시 강남구 테헤란로 521 포르쉐코리아' },
  { id: 6, name: '하이브랩', status: 'ended', type: '법인', bizNo: '110-82-1234567', address: '경기 성남시 분당구 황새울로' },
]

const STATUS_MAP: Record<string, { variant: 'success' | 'neutral'; label: string }> = {
  active: { variant: 'success', label: '사용중' },
  ended: { variant: 'neutral', label: '종료' },
}

const ICON_LIST: IconName[] = [
  'chevron_up', 'chevron_down', 'chevron_left', 'chevron_right',
  'chevron_up_small', 'chevron_down_small',
  'arrow_up', 'arrow_down', 'arrow_left', 'arrow_right',
  'x', 'x_small', 'check', 'check_circle', 'x_circle',
  'information', 'warning', 'failure', 'question',
  'plus', 'minus', 'search', 'refresh', 'filter', 'setting', 'delete', 'write',
  'eyes_on', 'eyes_off', 'calendar', 'person', 'bell', 'bookmark',
  'star', 'more_horizontal', 'more_vertical', 'drag_dot',
]

const NAV_ITEMS = [
  { id: 'colors', label: 'Color Tokens' },
  { id: 'typography', label: 'Typography' },
  { id: 'icon', label: 'Icon' },
  { id: 'button', label: 'Button' },
  { id: 'input', label: 'Input' },
  { id: 'textarea', label: 'TextArea' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
  { id: 'tab', label: 'Tab' },
  { id: 'accordion', label: 'Accordion' },
  { id: 'segmentedcontrol', label: 'SegmentedControl' },
  { id: 'pageindicator', label: 'PageIndicator' },
  { id: 'popover', label: 'Popover' },
  { id: 'numberstepper', label: 'NumberStepper' },
  { id: 'rating', label: 'Rating' },
  { id: 'row', label: 'Row' },
  { id: 'select', label: 'Select' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'radio', label: 'Radio / RadioGroup' },
  { id: 'switch', label: 'Switch' },
  { id: 'badge', label: 'Badge' },
  { id: 'countbadge', label: 'CountBadge / DotBadge' },
  { id: 'label', label: 'Label' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'divider', label: 'Divider' },
  { id: 'alert', label: 'Alert' },
  { id: 'skeleton', label: 'Skeleton' },
  { id: 'choicechip', label: 'ChoiceChip' },
  { id: 'table', label: 'Table' },
  { id: 'pagination', label: 'Pagination' },
  { id: 'modal', label: 'Modal' },
  { id: 'toast', label: 'Toast' },
  { id: 'tooltip', label: 'Tooltip' },
  { id: 'applayout', label: 'AppLayout' },
  { id: 'sidenavigation', label: 'SideNavigation' },
]

/* ---- Color Token Swatch ---- */
const Swatch = ({ token, label }: { token: string; label?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 80 }}>
    <div style={{
      width: '100%',
      height: 36,
      borderRadius: 6,
      background: `var(${token})`,
      border: '1px solid var(--sys-border-neutral-subtle)',
    }} />
    <span style={{ fontSize: 10, color: 'var(--sys-content-neutral-muted)', fontFamily: 'monospace', lineHeight: 1.4 }}>
      {label ?? token.replace('--sys-', '')}
    </span>
  </div>
)

const SwatchRow = ({ tokens }: { tokens: Array<{ token: string; label?: string }> }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {tokens.map(t => <Swatch key={t.token} {...t} />)}
  </div>
)

/* ── Pagination Demo 헬퍼 ───────────────────────────────────── */
function PaginationDemo({
  total, pageSize, size, variant,
}: { total: number; pageSize: number; size: 'sm' | 'md'; variant: 'default' | 'minimal' }) {
  const [page, setPage] = React.useState(1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Pagination total={total} page={page} pageSize={pageSize} size={size} variant={variant} onChange={setPage} />
      <span style={{ fontSize: 12, color: 'var(--sys-content-neutral-muted)' }}>현재 페이지: {page} / {Math.ceil(total / pageSize)}</span>
    </div>
  )
}

const PAGINATION_DATA = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `거래처 ${String(i + 1).padStart(2, '0')}`,
  region: ['서울', '부산', '대구', '인천', '광주'][i % 5],
  status: i % 3 === 0 ? '활성' : i % 3 === 1 ? '대기' : '비활성',
}))

const PAGINATION_COLS = [
  { key: 'id', header: 'ID', width: 60 },
  { key: 'name', header: '거래처명' },
  { key: 'region', header: '지역' },
  { key: 'status', header: '상태' },
]

function TableWithPagination() {
  const [page, setPage] = React.useState(1)
  const pageSize = 5
  const sliced = PAGINATION_DATA.slice((page - 1) * pageSize, page * pageSize)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Table columns={PAGINATION_COLS} data={sliced} rowKey="id" bordered />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination total={PAGINATION_DATA.length} page={page} pageSize={pageSize} onChange={setPage} />
      </div>
    </div>
  )
}

export default function App() {
  // hash 기반 라우팅 — #userlist 이면 전체 화면 페이지
  const [hash, setHash] = useState(window.location.hash)
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash === '#userlist') {
    return <UserListPage onBack={() => { window.location.hash = ''; setHash('') }} />
  }

  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDangerOpen, setModalDangerOpen] = useState(false)
  const [modalNeutralOpen, setModalNeutralOpen] = useState(false)
  const [toasts, setToasts] = useState<{ id: number; type: 'success' | 'error' | 'warning' | 'info'; message: string }[]>([])
  const [activeNav, setActiveNav] = useState('button')
  const [sortKey, setSortKey] = useState<string | undefined>()
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)
  const [allChecked, setAllChecked] = useState(false)
  const [someChecked, setSomeChecked] = useState(false)
  const [gender, setGender] = useState('male')
  const [stepperOutlineMd, setStepperOutlineMd] = useState(1)
  const [stepperSoftMd, setStepperSoftMd] = useState(3)
  const [stepperSm, setStepperSm] = useState(0)
  const [rating, setRating] = useState(3)

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

  const columns: TableColumn<Company>[] = [
    {
      key: 'name',
      header: `거래처 · ${COMPANIES.length}개`,
      render: (row) => (
        <span style={{ fontWeight: 600 }}>{row.name}</span>
      ),
    },
    {
      key: 'status',
      header: '상태',
      width: 88,
      render: (row) => (
        <Badge variant={STATUS_MAP[row.status].variant} size="sm">
          {STATUS_MAP[row.status].label}
        </Badge>
      ),
    },
    { key: 'type', header: '타입', width: 108 },
    { key: 'bizNo', header: '사업자 등록번호', width: 153 },
    { key: 'address', header: '주소' },
    {
      key: 'actions',
      header: '연결',
      width: 97,
      render: () => (
        <Button size="sm" tone="secondary" variant="outline">버튼명</Button>
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
          <a
            href="#userlist"
            className="sc-sidebar__link"
            style={{ color: 'var(--sys-content-brand-default)', fontWeight: 'var(--ref-font-weight-600)', marginBottom: 8 }}
          >
            🧪 사용자 목록 검증
          </a>
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
            tone="secondary"
            variant="outline"
            fullWidth
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="sc-main">

        {/* ===== COLOR TOKENS ===== */}
        <section className="sc-section" id="colors">
          <h2 className="sc-section__title">Color Tokens</h2>
          <p className="sc-section__desc">Semantic 토큰 시각 검증. 다크 모드 토글 후 변화를 확인하세요.</p>

          <div className="sc-block">
            <div className="sc-block__label">Surface</div>
            <SwatchRow tokens={[
              { token: '--sys-surface-base', label: 'surface-base' },
              { token: '--sys-surface-subtle', label: 'surface-subtle' },
              { token: '--sys-surface-raised', label: 'surface-raised' },
              { token: '--sys-surface-overlay', label: 'surface-overlay' },
              { token: '--sys-surface-upper', label: 'surface-upper' },
              { token: '--sys-surface-floating', label: 'surface-floating' },
              { token: '--sys-surface-grouped-default', label: 'grouped-default' },
              { token: '--sys-background-base', label: 'bg-base' },
              { token: '--sys-background-subtle', label: 'bg-subtle' },
            ]} />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Content — Neutral</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { token: '--sys-content-neutral-strong', label: 'strong' },
                { token: '--sys-content-neutral-default', label: 'default' },
                { token: '--sys-content-neutral-muted', label: 'muted' },
                { token: '--sys-content-neutral-subtle', label: 'subtle' },
                { token: '--sys-content-neutral-weak', label: 'weak' },
                { token: '--sys-content-neutral-disabled', label: 'disabled' },
                { token: '--sys-content-neutral-placeholder', label: 'placeholder' },
              ].map(({ token, label }) => (
                <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: `var(${token})`, fontSize: 15, fontWeight: 500, minWidth: 200 }}>
                    텍스트 샘플 — {label}
                  </span>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--sys-content-neutral-subtle)' }}>{token}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Content — Brand &amp; Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { token: '--sys-content-brand-default', label: 'brand-default' },
                { token: '--sys-content-brand-strong', label: 'brand-strong' },
                { token: '--sys-content-status-danger-default', label: 'danger-default' },
                { token: '--sys-content-status-danger-strong', label: 'danger-strong' },
                { token: '--sys-content-status-warning-default', label: 'warning-default' },
                { token: '--sys-content-status-warning-strong', label: 'warning-strong' },
                { token: '--sys-content-status-success-default', label: 'success-default' },
                { token: '--sys-content-status-success-strong', label: 'success-strong' },
                { token: '--sys-content-status-info-default', label: 'info-default' },
              ].map(({ token, label }) => (
                <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: `var(${token})`, fontSize: 15, fontWeight: 500, minWidth: 200 }}>
                    텍스트 샘플 — {label}
                  </span>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--sys-content-neutral-subtle)' }}>{token}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Container — Neutral</div>
            <SwatchRow tokens={[
              { token: '--sys-container-neutral-solid-default', label: 'solid-default' },
              { token: '--sys-container-neutral-solid-strong', label: 'solid-strong' },
              { token: '--sys-container-neutral-solid-disabled', label: 'solid-disabled' },
              { token: '--sys-container-neutral-tint-default', label: 'tint-default' },
              { token: '--sys-container-neutral-tint-strong', label: 'tint-strong' },
            ]} />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Container — Brand</div>
            <SwatchRow tokens={[
              { token: '--sys-container-brand-solid-default', label: 'solid-default' },
              { token: '--sys-container-brand-solid-strong', label: 'solid-strong' },
              { token: '--sys-container-brand-solid-disabled', label: 'solid-disabled' },
              { token: '--sys-container-brand-tint-default', label: 'tint-default' },
              { token: '--sys-container-brand-tint-strong', label: 'tint-strong' },
            ]} />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Container — Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SwatchRow tokens={[
                { token: '--sys-container-danger-solid-default', label: 'danger-solid' },
                { token: '--sys-container-danger-solid-strong', label: 'danger-solid-strong' },
                { token: '--sys-container-danger-tint-default', label: 'danger-tint' },
                { token: '--sys-container-warning-solid-default', label: 'warning-solid' },
                { token: '--sys-container-warning-tint-default', label: 'warning-tint' },
                { token: '--sys-container-success-solid-default', label: 'success-solid' },
                { token: '--sys-container-success-tint-default', label: 'success-tint' },
              ]} />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Border</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { token: '--sys-border-neutral-heavy', label: 'neutral-heavy' },
                { token: '--sys-border-neutral-strong', label: 'neutral-strong' },
                { token: '--sys-border-neutral-default', label: 'neutral-default' },
                { token: '--sys-border-neutral-subtle', label: 'neutral-subtle' },
                { token: '--sys-border-neutral-weak', label: 'neutral-weak' },
                { token: '--sys-border-brand-default', label: 'brand-default' },
                { token: '--sys-border-danger-default', label: 'danger-default' },
                { token: '--sys-border-warning-default', label: 'warning-default' },
                { token: '--sys-border-success-default', label: 'success-default' },
              ].map(({ token, label }) => (
                <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 160, height: 1, background: `var(${token})` }} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--sys-content-neutral-subtle)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TYPOGRAPHY ===== */}
        <section className="sc-section" id="typography">
          <h2 className="sc-section__title">Typography</h2>
          <p className="sc-section__desc">IGTSans 폰트 기반 타입 스케일.</p>

          <div className="sc-typo-table">
            {[
              { role: '--text-display-lg', sample: '디스플레이 라지 텍스트', style: { fontSize: 'var(--text-display-lg-size)', fontWeight: 'var(--text-display-lg-weight)', lineHeight: 'var(--text-display-lg-line-height)' } },
              { role: '--text-display-md', sample: '디스플레이 미디엄 텍스트', style: { fontSize: 'var(--text-display-md-size)', fontWeight: 'var(--text-display-md-weight)', lineHeight: 'var(--text-display-md-line-height)' } },
              { role: '--text-display-sm', sample: '디스플레이 스몰 텍스트', style: { fontSize: 'var(--text-display-sm-size)', fontWeight: 'var(--text-display-sm-weight)', lineHeight: 'var(--text-display-sm-line-height)' } },
              { role: '--text-heading-lg', sample: '헤딩 라지 텍스트', style: { fontSize: 'var(--text-heading-lg-size)', fontWeight: 'var(--text-heading-lg-weight)', lineHeight: 'var(--text-heading-lg-line-height)' } },
              { role: '--text-heading-md', sample: '헤딩 미디엄 텍스트', style: { fontSize: 'var(--text-heading-md-size)', fontWeight: 'var(--text-heading-md-weight)', lineHeight: 'var(--text-heading-md-line-height)' } },
              { role: '--text-heading-sm', sample: '헤딩 스몰 텍스트', style: { fontSize: 'var(--text-heading-sm-size)', fontWeight: 'var(--text-heading-sm-weight)', lineHeight: 'var(--text-heading-sm-line-height)' } },
              { role: '--text-body-md', sample: '바디 미디엄 — 기본 본문 텍스트입니다. IGTSans Regular 16px.', style: { fontSize: 'var(--text-body-md-size)', fontWeight: 'var(--text-body-md-weight)', lineHeight: 'var(--text-body-md-line-height)' } },
              { role: '--text-body-sm', sample: '바디 스몰 — 보조 본문 텍스트입니다. IGTSans Regular 15px.', style: { fontSize: 'var(--text-body-sm-size)', fontWeight: 'var(--text-body-sm-weight)', lineHeight: 'var(--text-body-sm-line-height)' } },
              { role: '--text-body-xs', sample: '바디 엑스스몰 — 14px 설명 텍스트.', style: { fontSize: 'var(--text-body-xs-size)', fontWeight: 'var(--text-body-xs-weight)', lineHeight: 'var(--text-body-xs-line-height)' } },
              { role: '--text-label-md', sample: '라벨 미디엄 — 버튼·탭 레이블', style: { fontSize: 'var(--text-label-md-size)', fontWeight: 'var(--text-label-md-weight)', lineHeight: 'var(--text-label-md-line-height)' } },
              { role: '--text-label-sm', sample: '라벨 스몰 — 14px 미디엄', style: { fontSize: 'var(--text-label-sm-size)', fontWeight: 'var(--text-label-sm-weight)', lineHeight: 'var(--text-label-sm-line-height)' } },
              { role: '--text-label-xs', sample: '라벨 엑스스몰 — 배지·캡션', style: { fontSize: 'var(--text-label-xs-size)', fontWeight: 'var(--text-label-xs-weight)', lineHeight: 'var(--text-label-xs-line-height)' } },
              { role: '--text-caption-md', sample: '캡션 미디엄 — 보조 정보 12px', style: { fontSize: 'var(--text-caption-md-size)', fontWeight: 'var(--text-caption-md-weight)', lineHeight: 'var(--text-caption-md-line-height)' } },
              { role: '--text-caption-sm', sample: '캡션 스몰 — 최소 텍스트 11px', style: { fontSize: 'var(--text-caption-sm-size)', fontWeight: 'var(--text-caption-sm-weight)', lineHeight: 'var(--text-caption-sm-line-height)' } },
            ].map(({ role, sample, style }) => (
              <div key={role} className="sc-typo-row">
                <div className="sc-typo-meta">
                  <span className="sc-typo-role">{role}</span>
                </div>
                <span className="sc-typo-sample" style={style as React.CSSProperties}>{sample}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ICON ===== */}
        <section className="sc-section" id="icon">
          <h2 className="sc-section__title">Icon</h2>
          <p className="sc-section__desc">
            피그마 <code>igt_core_icon_*</code> 기준. variant: outline(기본) / outline_thin / solid. size: xs·sm·md·lg·xl
          </p>

          <div className="sc-block">
            <div className="sc-block__label">Size (outline, chevron_right)</div>
            <div className="sc-row" style={{ alignItems: 'center', gap: 16 }}>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <Icon name="chevron_right" size={s} />
                  <span style={{ fontSize: 11, color: 'var(--sys-content-neutral-muted)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Variant (information, size=lg)</div>
            <div className="sc-row" style={{ alignItems: 'center', gap: 24 }}>
              {(['outline', 'outline_thin', 'solid'] as const).map((v) => (
                <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <Icon name="information" variant={v} size="lg" />
                  <span style={{ fontSize: 11, color: 'var(--sys-content-neutral-muted)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">전체 아이콘 ({ICON_LIST.length}개, outline / md)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ICON_LIST.map((name) => (
                <Tooltip key={name} content={name} placement="top">
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40,
                    borderRadius: 6,
                    border: '1px solid var(--sys-border-neutral-subtle)',
                    cursor: 'default',
                  }}>
                    <Icon name={name} size="md" />
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BUTTON ===== */}
        <section className="sc-section" id="button">
          <h2 className="sc-section__title">Button</h2>
          <p className="sc-section__desc">variant × buttonStyle × size 조합. loading, icon 지원.</p>

          <div className="sc-block">
            <div className="sc-block__label">Primary</div>
            <div className="sc-row">
              <Button variant="fill">Fill</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Secondary</div>
            <div className="sc-row">
              <Button tone="secondary" variant="fill">Fill</Button>
              <Button tone="secondary" variant="soft">Soft</Button>
              <Button tone="secondary" variant="outline">Outline</Button>
              <Button tone="secondary" variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Danger</div>
            <div className="sc-row">
              <Button tone="danger" variant="fill">Fill</Button>
              <Button tone="danger" variant="soft">Soft</Button>
              <Button tone="danger" variant="outline">Outline</Button>
              <Button tone="danger" variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Size</div>
            <div className="sc-row" style={{ alignItems: 'center' }}>
              <Button size="xs">XSmall</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">States &amp; Icon</div>
            <div className="sc-row">
              <Button loading>Loading</Button>
              <Button loading leadingIcon={<PlusIcon />}>저장 중</Button>
              <Button loading variant="soft">처리 중</Button>
              <Button loading iconOnly leadingIcon={<SearchIcon />} variant="outline" />
              <Button disabled>Disabled</Button>
              <Button leadingIcon={<PlusIcon />}>추가</Button>
              <Button leadingIcon={<SearchIcon />} variant="outline">검색</Button>
              <Button tone="danger" variant="soft" leadingIcon={<TrashIcon />}>삭제</Button>
              <Button iconOnly leadingIcon={<SearchIcon />} variant="outline" />
              <Button iconOnly leadingIcon={<PlusIcon />} size="sm" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Disabled</div>
            <div className="sc-row">
              <Button variant="fill" disabled>Primary Fill</Button>
              <Button variant="soft" disabled>Primary Soft</Button>
              <Button tone="secondary" variant="outline" disabled>Secondary Outline</Button>
              <Button tone="danger" variant="fill" disabled>Danger Fill</Button>
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
            <Input label="읽기 전용" readOnly value="변경 불가 텍스트" />
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>Fill style</div>
            <div className="sc-form-grid">
              <Input fieldStyle="fill" label="이름" placeholder="이름을 입력하세요" />
              <Input fieldStyle="fill" label="검색" prefix={<SearchIcon />} placeholder="키워드 입력" />
              <Input fieldStyle="fill" label="읽기 전용 (fill)" readOnly value="변경 불가" />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>Clearable</div>
            <div className="sc-form-grid">
              <Input label="sm" size="sm" clearable placeholder="입력 후 × 버튼 확인" />
              <Input label="md" size="md" clearable placeholder="입력 후 × 버튼 확인" />
              <Input label="lg" size="lg" clearable placeholder="입력 후 × 버튼 확인" />
              <Input label="prefix + clearable" clearable prefix={<SearchIcon />} placeholder="검색어 입력" />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>Character Count</div>
            <div className="sc-form-grid">
              <Input label="글자 수만 표시" showCount placeholder="내용을 입력하세요" />
              <Input label="최대 글자 수 포함" showCount maxLength={50} placeholder="최대 50자" />
              <Input label="에러 상태" showCount maxLength={20} error="최대 글자 수를 초과했습니다" defaultValue="이 텍스트는 너무 길어요" />
            </div>
          </div>
        </section>

        {/* ===== TEXTAREA ===== */}
        <section className="sc-section" id="textarea">
          <h2 className="sc-section__title">TextArea</h2>
          <p className="sc-section__desc">멀티라인 텍스트 입력. outline/fill × md/lg.</p>

          <div className="sc-form-grid">
            <TextArea label="outline md" size="md" placeholder="내용을 입력하세요" />
            <TextArea label="outline lg" size="lg" placeholder="내용을 입력하세요" />
            <TextArea label="fill md" size="md" fieldStyle="fill" placeholder="내용을 입력하세요" />
            <TextArea label="fill lg" size="lg" fieldStyle="fill" placeholder="내용을 입력하세요" />
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>States</div>
            <div className="sc-form-grid">
              <TextArea label="에러" error="올바른 내용을 입력해 주세요" defaultValue="잘못된 내용" />
              <TextArea label="힌트" hint="최대 500자까지 입력할 수 있습니다" />
              <TextArea label="disabled" disabled placeholder="비활성 상태" />
              <TextArea label="readOnly" readOnly defaultValue="읽기 전용 텍스트입니다" />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>글자 수</div>
            <div className="sc-form-grid">
              <TextArea label="글자 수" showCount placeholder="내용을 입력하세요" />
              <TextArea label="최대 글자 수" showCount maxLength={200} placeholder="최대 200자" />
            </div>
          </div>
        </section>

        {/* ===== BREADCRUMB ===== */}
        <section className="sc-section" id="breadcrumb">
          <h2 className="sc-section__title">Breadcrumb</h2>
          <p className="sc-section__desc">separator(chevron/slash/dot) × leading(none/home).</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Breadcrumb
              items={[
                { label: '페이지' },
                { label: '페이지' },
                { label: '페이지' },
                { label: '현재 페이지' },
              ]}
              separator="chevron"
            />
            <Breadcrumb
              items={[
                { label: '페이지' },
                { label: '페이지' },
                { label: '페이지' },
                { label: '현재 페이지' },
              ]}
              separator="slash"
            />
            <Breadcrumb
              items={[
                { label: '페이지' },
                { label: '페이지' },
                { label: '페이지' },
                { label: '현재 페이지' },
              ]}
              separator="dot"
            />
            <Breadcrumb
              items={[
                { label: '홈' },
                { label: '목록' },
                { label: '상세' },
              ]}
              separator="chevron"
              leading="home"
            />
          </div>
        </section>

        {/* ===== TAB ===== */}
        <section className="sc-section" id="tab">
          <h2 className="sc-section__title">Tab</h2>
          <p className="sc-section__desc">distribution(equal/content) × size(sm/md/lg).</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Equal / lg (기본)</div>
              <Tab
                items={[
                  { key: 'all', label: '전체' },
                  { key: 'active', label: '활성' },
                  { key: 'ended', label: '종료' },
                ]}
                defaultActiveKey="all"
                size="lg"
                distribution="equal"
              />
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Equal / md</div>
              <Tab
                items={[
                  { key: 'a', label: '아이템 1' },
                  { key: 'b', label: '아이템 2' },
                  { key: 'c', label: '아이템 3' },
                  { key: 'd', label: '아이템 4' },
                ]}
                defaultActiveKey="a"
                size="md"
                distribution="equal"
              />
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Content / sm</div>
              <Tab
                items={[
                  { key: 'x', label: '회사 정보' },
                  { key: 'y', label: '계약 현황' },
                  { key: 'z', label: '정산 내역' },
                  { key: 'w', label: '담당자' },
                ]}
                defaultActiveKey="x"
                size="sm"
                distribution="content"
              />
            </div>
          </div>
        </section>

        {/* ===== ACCORDION ===== */}
        <section className="sc-section" id="accordion">
          <h2 className="sc-section__title">Accordion</h2>
          <p className="sc-section__desc">variation(plain/contained) × size(sm/md/lg).</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Plain / lg (기본)</div>
              <Accordion
                variation="plain"
                size="lg"
                items={[
                  { key: '1', label: '서비스 이용 약관이란 무엇인가요?', content: '서비스 이용 약관은 서비스를 이용하는 모든 사용자가 동의해야 하는 규칙과 조건을 명시한 문서입니다.' },
                  { key: '2', label: '계정을 삭제하면 데이터가 복구되나요?', content: '계정 삭제 후 30일 이내에는 복구가 가능합니다. 30일이 지나면 모든 데이터가 영구적으로 삭제됩니다.', defaultOpen: true },
                  { key: '3', label: '결제 수단은 어떤 것을 지원하나요?', content: '신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이) 등을 지원합니다.' },
                  { key: '4', label: '비활성화된 아이템', content: '이 내용은 표시되지 않습니다.', disabled: true },
                ]}
              />
            </div>

            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Plain / md</div>
              <Accordion
                variation="plain"
                size="md"
                items={[
                  { key: 'a', label: '배송 기간은 얼마나 걸리나요?', content: '일반 배송은 2~3일, 빠른 배송은 익일 도착입니다.' },
                  { key: 'b', label: '교환 및 반품 정책은 어떻게 되나요?', content: '수령 후 7일 이내에 교환 및 반품이 가능합니다.', defaultOpen: true },
                  { key: 'c', label: '고객센터 운영 시간은?', content: '평일 오전 9시 ~ 오후 6시 운영합니다. 주말 및 공휴일은 휴무입니다.' },
                ]}
              />
            </div>

            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Contained / lg</div>
              <Accordion
                variation="contained"
                size="lg"
                items={[
                  { key: 'x', label: '프리미엄 플랜 혜택', content: '무제한 프로젝트, 팀원 초대, 우선 고객 지원, 고급 분석 리포트 등의 혜택을 제공합니다.' },
                  { key: 'y', label: '요금제 변경은 언제 적용되나요?', content: '요금제 변경은 다음 결제 사이클부터 적용됩니다. 현재 사이클에는 변경이 적용되지 않습니다.', defaultOpen: true },
                  { key: 'z', label: '팀 플랜과 개인 플랜의 차이', content: '팀 플랜은 최대 50명의 팀원을 초대할 수 있으며, 관리자 권한과 팀 대시보드를 제공합니다.' },
                ]}
              />
            </div>

            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Contained / md</div>
              <Accordion
                variation="contained"
                size="md"
                allowMultiple={false}
                items={[
                  { key: 'p', label: '단일 열기 모드 (allowMultiple=false)', content: '하나를 열면 다른 항목은 자동으로 닫힙니다.' },
                  { key: 'q', label: '두 번째 항목', content: '이 항목을 클릭하면 위의 항목이 닫힙니다.' },
                  { key: 'r', label: '세 번째 항목', content: '마지막 항목입니다.' },
                ]}
              />
            </div>

            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Contained / sm</div>
              <Accordion
                variation="contained"
                size="sm"
                items={[
                  { key: 's1', label: '소형 사이즈 아코디언', content: 'sm 사이즈는 공간이 제한된 영역에서 사용합니다.' },
                  { key: 's2', label: '두 번째 항목', content: '14px 폰트 크기의 소형 아코디언입니다.' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ===== SEGMENTED CONTROL ===== */}
        <section className="sc-section" id="segmentedcontrol">
          <h2 className="sc-section__title">SegmentedControl</h2>
          <p className="sc-section__desc">size(sm/md) × width(equal/content).</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Equal / md (기본)</div>
              <SegmentedControl
                size="md"
                width="equal"
                defaultValue="all"
                items={[
                  { key: 'all', label: '전체' },
                  { key: 'active', label: '활성' },
                  { key: 'ended', label: '종료' },
                ]}
              />
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Equal / md — 4 segments</div>
              <SegmentedControl
                size="md"
                width="equal"
                defaultValue="a"
                items={[
                  { key: 'a', label: '아이템 1' },
                  { key: 'b', label: '아이템 2' },
                  { key: 'c', label: '아이템 3' },
                  { key: 'd', label: '아이템 4' },
                ]}
              />
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Equal / sm</div>
              <SegmentedControl
                size="sm"
                width="equal"
                defaultValue="x"
                items={[
                  { key: 'x', label: '월간' },
                  { key: 'y', label: '주간' },
                  { key: 'z', label: '일간' },
                ]}
              />
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Content / md</div>
              <SegmentedControl
                size="md"
                width="content"
                defaultValue="p"
                items={[
                  { key: 'p', label: '회사 정보' },
                  { key: 'q', label: '계약 현황' },
                  { key: 'r', label: '정산 내역' },
                ]}
              />
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Content / sm</div>
              <SegmentedControl
                size="sm"
                width="content"
                defaultValue="s1"
                items={[
                  { key: 's1', label: '전체' },
                  { key: 's2', label: '진행 중' },
                  { key: 's3', label: '완료' },
                  { key: 's4', label: '취소' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ===== PAGE INDICATOR ===== */}
        <section className="sc-section" id="pageindicator">
          <h2 className="sc-section__title">PageIndicator</h2>
          <p className="sc-section__desc">size(sm/md/lg) × appearance(default/onImage).</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Size lg — 5 dots</div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <PageIndicator key={i} count={5} activeIndex={i} size="lg" />
                ))}
              </div>
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Size md — 4 dots</div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[0, 1, 2, 3].map((i) => (
                  <PageIndicator key={i} count={4} activeIndex={i} size="md" />
                ))}
              </div>
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Size sm — 3 dots</div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[0, 1, 2].map((i) => (
                  <PageIndicator key={i} count={3} activeIndex={i} size="sm" />
                ))}
              </div>
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Appearance: onImage (lg)</div>
              <div style={{ display: 'flex', gap: 24, background: '#333', padding: '16px 20px', borderRadius: 12 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <PageIndicator key={i} count={5} activeIndex={i} size="lg" appearance="onImage" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== POPOVER ===== */}
        <section className="sc-section" id="popover">
          <h2 className="sc-section__title">Popover</h2>
          <p className="sc-section__desc">emphasis(default/inverse) — 정보 안내용 팝오버 컨테이너.</p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Popover emphasis="default">
              <PopoverSection title="알림 안내">
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  <li>일부 알림은 지연되어 도착할 수 있어요</li>
                  <li>설정에서 언제든지 끌 수 있어요</li>
                  <li>동일한 알림이 반복해서 표시될 수 있어요</li>
                </ul>
              </PopoverSection>
              <PopoverSection title="기능 사용 가이드">
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  <li>필요한 항목을 선택해 작업을 진행할 수 있어요</li>
                  <li>선택한 항목은 한 번에 처리할 수 있어요</li>
                </ul>
              </PopoverSection>
            </Popover>

            <Popover emphasis="inverse">
              <PopoverSection title="알림 안내">
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  <li>일부 알림은 지연되어 도착할 수 있어요</li>
                  <li>설정에서 언제든지 끌 수 있어요</li>
                  <li>동일한 알림이 반복해서 표시될 수 있어요</li>
                </ul>
              </PopoverSection>
              <PopoverSection title="기능 사용 가이드">
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  <li>필요한 항목을 선택해 작업을 진행할 수 있어요</li>
                  <li>선택한 항목은 한 번에 처리할 수 있어요</li>
                </ul>
              </PopoverSection>
            </Popover>
          </div>
        </section>

        {/* ===== NUMBER STEPPER ===== */}
        <section className="sc-section" id="numberstepper">
          <h2 className="sc-section__title">NumberStepper</h2>
          <p className="sc-section__desc">emphasis(outline/soft) × size(sm/md).</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Outline / md</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <NumberStepper
                  value={stepperOutlineMd}
                  onChange={setStepperOutlineMd}
                  min={0}
                  max={10}
                  emphasis="outline"
                  size="md"
                />
                <span style={{ fontSize: 15, color: 'var(--sys-content-neutral-default)' }}>{stepperOutlineMd}</span>
              </div>
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Soft / md</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <NumberStepper
                  value={stepperSoftMd}
                  onChange={setStepperSoftMd}
                  min={0}
                  max={10}
                  emphasis="soft"
                  size="md"
                />
                <span style={{ fontSize: 15, color: 'var(--sys-content-neutral-default)' }}>{stepperSoftMd}</span>
              </div>
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Outline / sm</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <NumberStepper
                  value={stepperSm}
                  onChange={setStepperSm}
                  emphasis="outline"
                  size="sm"
                />
                <span style={{ fontSize: 14, color: 'var(--sys-content-neutral-default)' }}>{stepperSm}</span>
              </div>
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Disabled</div>
              <NumberStepper
                value={5}
                onChange={() => {}}
                emphasis="outline"
                size="md"
                disabled
              />
            </div>
          </div>
        </section>

        {/* ===== RATING ===== */}
        <section className="sc-section" id="rating">
          <h2 className="sc-section__title">Rating</h2>
          <p className="sc-section__desc">size(xs/sm/md) × readOnly/interactive.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>Interactive / md</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Rating value={rating} onChange={setRating} size="md" />
                <span style={{ fontSize: 15, color: 'var(--sys-content-neutral-muted)' }}>{rating} / 5</span>
              </div>
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>ReadOnly — size md / sm / xs</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Rating value={4} size="md" readOnly />
                <Rating value={3} size="sm" readOnly />
                <Rating value={2} size="xs" readOnly />
              </div>
            </div>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 8 }}>다양한 값</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <Rating key={v} value={v} size="sm" readOnly />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== ROW ===== */}
        <section className="sc-section" id="row">
          <h2 className="sc-section__title">Row</h2>
          <p className="sc-section__desc">리스트 항목용 네비게이션 행.</p>

          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--sys-border-neutral-subtle)', borderRadius: 12, overflow: 'hidden' }}>
            <Row label="최선집행기준 설명서" onClick={() => {}} />
            <Row label="투자 위험 안내" onClick={() => {}} />
            <Row label="금융소비자보호 안내" onClick={() => {}} />
            <Row label="개인정보 처리방침" onClick={() => {}} />
            <Row
              label="trailing 커스텀"
              trailing={<span style={{ fontSize: 13, color: 'var(--sys-content-neutral-muted)' }}>보기</span>}
              onClick={() => {}}
            />
            <Row label="chevron 없음" showChevron={false} />
            <Row label="비활성화된 항목" onClick={() => {}} disabled />
          </div>
        </section>

        {/* ===== TEXTBUTTON ===== */}
        <section className="sc-section" id="textbutton">
          <h2 className="sc-section__title">TextButton</h2>
          <p className="sc-section__desc">텍스트 전용 버튼. variant(chevron/plain/underline) × tone × size.</p>

          <div className="sc-row" style={{ gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextButton variant="plain" tone="accent" size="lg">더 보기</TextButton>
            <TextButton variant="plain" tone="accent" size="md">더 보기</TextButton>
            <TextButton variant="plain" tone="accent" size="sm">더 보기</TextButton>
            <TextButton variant="plain" tone="accent" size="xs">더 보기</TextButton>
          </div>
          <div className="sc-row" style={{ gap: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
            <TextButton variant="chevron" tone="accent" size="md">전체보기</TextButton>
            <TextButton variant="chevron" tone="neutral" size="md">전체보기</TextButton>
            <TextButton variant="chevron" tone="neutralMuted" size="md">전체보기</TextButton>
            <TextButton variant="chevron" tone="danger" size="md">삭제하기</TextButton>
          </div>
          <div className="sc-row" style={{ gap: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
            <TextButton variant="underline" tone="accent" size="md">자세히 보기</TextButton>
            <TextButton variant="underline" tone="neutral" size="md">자세히 보기</TextButton>
            <TextButton variant="plain" tone="accent" size="md" disabled>비활성화</TextButton>
          </div>
        </section>

        {/* ===== ICONBUTTON ===== */}
        <section className="sc-section" id="iconbutton">
          <h2 className="sc-section__title">IconButton</h2>
          <p className="sc-section__desc">아이콘 전용 버튼. variant(soft/outline/ghost) × shape(circle/rounded) × size.</p>

          <div className="sc-row" style={{ gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <IconButton variant="soft" shape="circle" size="lg" aria-label="설정" icon={<Icon name="setting" size="md" />} />
            <IconButton variant="soft" shape="circle" size="md" aria-label="설정" icon={<Icon name="setting" size="sm" />} />
            <IconButton variant="soft" shape="circle" size="sm" aria-label="설정" icon={<Icon name="setting" size="sm" />} />
            <IconButton variant="soft" shape="circle" size="xs" aria-label="설정" icon={<Icon name="setting" size="xs" />} />
          </div>
          <div className="sc-row" style={{ gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
            <IconButton variant="outline" shape="circle" size="md" aria-label="닫기" icon={<Icon name="x" size="sm" />} />
            <IconButton variant="ghost" shape="circle" size="md" aria-label="더보기" icon={<Icon name="more_horizontal" size="sm" />} />
            <IconButton variant="soft" shape="rounded" size="md" aria-label="검색" icon={<Icon name="search" size="sm" />} />
            <IconButton variant="outline" shape="rounded" size="md" aria-label="필터" icon={<Icon name="filter" size="sm" />} />
            <IconButton variant="ghost" shape="rounded" size="md" emphasis="subdued" aria-label="편집" icon={<Icon name="write" size="sm" />} />
          </div>
          <div className="sc-row" style={{ gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
            <IconButton variant="soft" shape="circle" size="md" aria-label="비활성" disabled icon={<Icon name="setting" size="sm" />} />
            <IconButton variant="soft" shape="circle" size="md" aria-label="로딩" loading icon={<Icon name="setting" size="sm" />} />
          </div>
        </section>

        {/* ===== LINK ===== */}
        <section className="sc-section" id="link">
          <h2 className="sc-section__title">Link</h2>
          <p className="sc-section__desc">인라인 링크. tone(brand/neutral) × underline(always/auto/none).</p>

          <div className="sc-row" style={{ gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="#" tone="brand" underline="always">브랜드 링크 (always)</Link>
            <Link href="#" tone="brand" underline="auto">브랜드 링크 (auto)</Link>
            <Link href="#" tone="brand" underline="none">브랜드 링크 (none)</Link>
          </div>
          <div className="sc-row" style={{ gap: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
            <Link href="#" tone="neutral" underline="always">뉴트럴 링크 (always)</Link>
            <Link href="#" tone="neutral" underline="auto">뉴트럴 링크 (auto)</Link>
            <Link href="#" tone="neutral" underline="none">뉴트럴 링크 (none)</Link>
          </div>
          <div className="sc-row" style={{ gap: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
            <Link tone="brand" disabled>비활성 브랜드</Link>
            <Link tone="neutral" disabled>비활성 뉴트럴</Link>
          </div>
        </section>

        {/* ===== BUTTON GROUP ===== */}
        <section className="sc-section" id="buttongroup">
          <h2 className="sc-section__title">ButtonGroup</h2>
          <p className="sc-section__desc">버튼을 그룹화하는 레이아웃 컨테이너.</p>
          <div className="sc-row">
            <ButtonGroup layout="inline" size="md">
              <Button variant="fill" tone="primary" size="md">저장</Button>
              <Button variant="outline" tone="secondary" size="md">취소</Button>
            </ButtonGroup>
          </div>
          <div className="sc-row">
            <ButtonGroup layout="inline" distribution="equal" size="md" style={{ width: 320 }}>
              <Button variant="fill" tone="primary" size="md">확인</Button>
              <Button variant="outline" tone="secondary" size="md">취소</Button>
            </ButtonGroup>
          </div>
          <div className="sc-row">
            <ButtonGroup layout="stack" size="md" style={{ width: 200 }}>
              <Button variant="fill" tone="primary" size="md">저장</Button>
              <Button variant="outline" tone="secondary" size="md">취소</Button>
              <Button variant="ghost" tone="secondary" size="md">돌아가기</Button>
            </ButtonGroup>
          </div>
        </section>

        {/* ===== TOGGLE BUTTON ===== */}
        <section className="sc-section" id="togglebutton">
          <h2 className="sc-section__title">ToggleButton</h2>
          <p className="sc-section__desc">선택/미선택 두 가지 상태를 토글하는 버튼.</p>
          <div className="sc-row" style={{ gap: 8 }}>
            <ToggleButton emphasis="onDefault" size="md">미선택</ToggleButton>
            <ToggleButton emphasis="onDefault" size="md" selected>선택됨</ToggleButton>
            <ToggleButton emphasis="onDefault" size="sm">Small</ToggleButton>
            <ToggleButton emphasis="onDefault" size="xs">XSmall</ToggleButton>
          </div>
          <div className="sc-row" style={{ gap: 8 }}>
            <ToggleButton emphasis="onSelect" size="md">미선택</ToggleButton>
            <ToggleButton emphasis="onSelect" size="md" selected>선택됨</ToggleButton>
          </div>
          <div className="sc-row" style={{ gap: 8 }}>
            <ToggleButton emphasis="onDefault" size="md"
              leadingIcon={<Icon name="filter" size="sm" />}>필터</ToggleButton>
            <ToggleButton emphasis="onDefault" size="md" selected
              leadingIcon={<Icon name="filter" size="sm" />}>필터 ON</ToggleButton>
            <ToggleButton emphasis="onDefault" size="md" iconOnly
              leadingIcon={<Icon name="filter" size="sm" />} />
            <ToggleButton emphasis="onDefault" size="md" disabled>비활성</ToggleButton>
            <ToggleButton emphasis="onDefault" size="md" loading>로딩</ToggleButton>
          </div>
        </section>

        {/* ===== FLOATING BUTTON ===== */}
        <section className="sc-section" id="floatingbutton">
          <h2 className="sc-section__title">FloatingButton</h2>
          <p className="sc-section__desc">플로팅 액션 버튼 (FAB). 화면 위에 부유하는 주요 액션.</p>
          <div className="sc-row" style={{ gap: 16, alignItems: 'center' }}>
            <FloatingButton variant="primary" size="sm" icon={<Icon name="add" size="sm" />} aria-label="추가" />
            <FloatingButton variant="primary" size="md" icon={<Icon name="add" size="md" />} aria-label="추가" />
            <FloatingButton variant="primary" size="lg" icon={<Icon name="add" size="md" />} aria-label="추가" />
          </div>
          <div className="sc-row" style={{ gap: 16, alignItems: 'center' }}>
            <FloatingButton variant="secondary" size="md" icon={<Icon name="write" size="sm" />} aria-label="편집" />
            <FloatingButton variant="ghost" size="md" icon={<Icon name="write" size="sm" />} aria-label="편집" />
          </div>
          <div className="sc-row" style={{ gap: 16, alignItems: 'center' }}>
            <FloatingButton variant="primary" shape="extended" size="md" icon={<Icon name="add" size="sm" />} label="추가하기" />
            <FloatingButton variant="secondary" shape="extended" size="md" icon={<Icon name="write" size="sm" />} label="편집하기" />
          </div>
          <div className="sc-row" style={{ gap: 16, alignItems: 'center' }}>
            <FloatingButton variant="primary" size="md" icon={<Icon name="add" size="sm" />} loading aria-label="로딩" />
            <FloatingButton variant="primary" size="md" icon={<Icon name="add" size="sm" />} disabled aria-label="비활성" />
          </div>
        </section>

        {/* ===== SELECT ===== */}
        <section className="sc-section" id="select">
          <h2 className="sc-section__title">Select</h2>
          <p className="sc-section__desc">커스텀 드롭다운. searchable, multi-select 지원.</p>

          <div className="sc-form-grid">
            <Select
              label="기본"
              placeholder="선택하세요"
              options={[
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
                { value: 'pending', label: '대기' },
              ]}
            />
            <Select
              label="기본값 있음"
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
              options={[{ value: '1', label: '옵션 1' }, { value: '2', label: '옵션 2' }]}
            />
            <Select
              label="비활성"
              disabled
              options={[{ value: '1', label: '옵션 1' }]}
              defaultValue="1"
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>Searchable</div>
            <div className="sc-form-grid">
              <Select
                label="검색 가능"
                searchable
                placeholder="검색 후 선택"
                options={[
                  { value: 'seoul', label: '서울특별시' },
                  { value: 'busan', label: '부산광역시' },
                  { value: 'daegu', label: '대구광역시' },
                  { value: 'incheon', label: '인천광역시' },
                  { value: 'gwangju', label: '광주광역시' },
                  { value: 'daejeon', label: '대전광역시' },
                  { value: 'ulsan', label: '울산광역시' },
                ]}
              />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>Multi-select</div>
            <div className="sc-form-grid">
              <Select
                label="다중 선택"
                multiple
                placeholder="여러 개 선택 가능"
                options={[
                  { value: 'read', label: '읽기' },
                  { value: 'write', label: '쓰기' },
                  { value: 'delete', label: '삭제' },
                  { value: 'admin', label: '관리자' },
                ]}
              />
              <Select
                label="다중 + 검색"
                multiple
                searchable
                placeholder="검색 후 다중 선택"
                options={[
                  { value: 'seoul', label: '서울특별시' },
                  { value: 'busan', label: '부산광역시' },
                  { value: 'daegu', label: '대구광역시' },
                  { value: 'incheon', label: '인천광역시' },
                  { value: 'gwangju', label: '광주광역시' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ===== CHOICECHIP ===== */}
        <section className="sc-section" id="choicechip">
          <h2 className="sc-section__title">ChoiceChip</h2>
          <p className="sc-section__desc">칩 형태의 선택 컴포넌트. single / multiple 선택 타입, wrap / scroll 레이아웃 지원.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Multiple selection (wrap)</div>
              <ChoiceChipGroup
                label="관심 카테고리"
                hint="복수 선택 가능합니다"
                defaultValue={['sports']}
                selectionType="multiple"
                layout="wrap"
              >
                <ChoiceChipGroupItem value="sports" label="스포츠" />
                <ChoiceChipGroupItem value="music" label="음악" />
                <ChoiceChipGroupItem value="travel" label="여행" />
                <ChoiceChipGroupItem value="food" label="푸드" />
                <ChoiceChipGroupItem value="art" label="아트" />
                <ChoiceChipGroupItem value="tech" label="테크" />
              </ChoiceChipGroup>
            </div>

            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Single selection</div>
              <ChoiceChipGroup
                label="정렬 기준"
                defaultValue={['latest']}
                selectionType="single"
                layout="wrap"
              >
                <ChoiceChipGroupItem value="latest" label="최신순" />
                <ChoiceChipGroupItem value="popular" label="인기순" />
                <ChoiceChipGroupItem value="price-asc" label="가격 낮은순" />
                <ChoiceChipGroupItem value="price-desc" label="가격 높은순" />
              </ChoiceChipGroup>
            </div>

            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Size variants (xs / sm / md)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <ChoiceChipGroup defaultValue={['a']} selectionType="multiple" size="xs">
                  <ChoiceChipGroupItem value="a" label="XS 칩" />
                  <ChoiceChipGroupItem value="b" label="XS 미선택" />
                  <ChoiceChipGroupItem value="c" label="XS 비활성" disabled />
                </ChoiceChipGroup>
                <ChoiceChipGroup defaultValue={['a']} selectionType="multiple" size="sm">
                  <ChoiceChipGroupItem value="a" label="SM 칩" />
                  <ChoiceChipGroupItem value="b" label="SM 미선택" />
                  <ChoiceChipGroupItem value="c" label="SM 비활성" disabled />
                </ChoiceChipGroup>
                <ChoiceChipGroup defaultValue={['a']} selectionType="multiple" size="md">
                  <ChoiceChipGroupItem value="a" label="MD 칩" />
                  <ChoiceChipGroupItem value="b" label="MD 미선택" />
                  <ChoiceChipGroupItem value="c" label="MD 비활성" disabled />
                </ChoiceChipGroup>
              </div>
            </div>

            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Scroll layout</div>
              <div style={{ maxWidth: 320 }}>
                <ChoiceChipGroup defaultValue={['c']} selectionType="multiple" layout="scroll">
                  <ChoiceChipGroupItem value="a" label="아이템 1" />
                  <ChoiceChipGroupItem value="b" label="아이템 2" />
                  <ChoiceChipGroupItem value="c" label="아이템 3" />
                  <ChoiceChipGroupItem value="d" label="아이템 4" />
                  <ChoiceChipGroupItem value="e" label="아이템 5" />
                  <ChoiceChipGroupItem value="f" label="아이템 6" />
                  <ChoiceChipGroupItem value="g" label="아이템 7" />
                </ChoiceChipGroup>
              </div>
            </div>

            <div>
              <div className="sc-block__label" style={{ marginBottom: 12 }}>Standalone ChoiceChip</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <ChoiceChip label="선택됨" value="a" selected />
                <ChoiceChip label="미선택" value="b" />
                <ChoiceChip label="비활성" value="c" disabled />
                <ChoiceChip label="선택+비활성" value="d" selected disabled />
              </div>
            </div>
          </div>
        </section>

        {/* ===== CHECKBOX ===== */}
        <section className="sc-section" id="checkbox">
          <h2 className="sc-section__title">Checkbox</h2>
          <p className="sc-section__desc">indeterminate, readOnly, error, disabled 상태 지원.</p>

          <div className="sc-block">
            <div className="sc-block__label">md (기본)</div>
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
            <div className="sc-block__label">ReadOnly</div>
            <div className="sc-row">
              <Checkbox label="읽기 전용 (미선택)" readOnly />
              <Checkbox label="읽기 전용 (선택됨)" readOnly checked defaultChecked />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">sm</div>
            <div className="sc-col">
              <Checkbox label="sm 체크박스" size="sm" />
              <Checkbox label="sm indeterminate" size="sm" indeterminate />
              <Checkbox label="sm 비활성" size="sm" disabled />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">CheckboxGroup — 전체선택 포함</div>
            <CheckboxGroup
              label="권한 설정"
              selectAll
              options={[
                { value: 'read', label: '읽기' },
                { value: 'write', label: '쓰기' },
                { value: 'delete', label: '삭제' },
                { value: 'admin', label: '관리자', disabled: true },
              ]}
              defaultValue={['read']}
            />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">CheckboxGroup — 수평 / 오류</div>
            <div className="sc-col">
              <CheckboxGroup
                label="알림 방법"
                direction="horizontal"
                options={[
                  { value: 'email', label: '이메일' },
                  { value: 'sms', label: 'SMS' },
                  { value: 'push', label: '푸시' },
                ]}
                defaultValue={['email']}
              />
              <CheckboxGroup
                label="필수 동의"
                options={[
                  { value: 'terms', label: '이용약관 동의' },
                  { value: 'privacy', label: '개인정보 수집 동의' },
                ]}
                error="필수 항목을 모두 선택해주세요"
              />
            </div>
          </div>
        </section>

        {/* ===== RADIO / RADIOGROUP ===== */}
        <section className="sc-section" id="radio">
          <h2 className="sc-section__title">Radio / RadioGroup</h2>
          <p className="sc-section__desc">단독 Radio와 그룹 제어를 위한 RadioGroup. readOnly, disabled, description 지원.</p>

          <div className="sc-block">
            <div className="sc-block__label">Radio 단독</div>
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
              <Radio label="읽기 전용 (선택됨)" name="gender3" readOnly checked defaultChecked />
              <Radio label="설명 포함" description="추가 설명 텍스트입니다" name="gender4" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">RadioGroup</div>
            <div className="sc-row" style={{ gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <RadioGroup label="결제수단 선택" hint="주문 완료 후 변경할 수 없어요" defaultValue="card">
                <RadioGroupItem value="card" label="신용카드" description="간단한 설명" />
                <RadioGroupItem value="transfer" label="계좌이체" description="간단한 설명" />
                <RadioGroupItem value="cash" label="무통장 입금" description="간단한 설명" />
                <RadioGroupItem value="kakao" label="간편결제 (카카오페이)" description="간단한 설명" />
              </RadioGroup>
              <RadioGroup label="sm 사이즈" size="sm" defaultValue="card">
                <RadioGroupItem value="card" label="신용카드" />
                <RadioGroupItem value="transfer" label="계좌이체" />
                <RadioGroupItem value="cash" label="무통장 입금" />
              </RadioGroup>
              <RadioGroup label="비활성" disabled defaultValue="card">
                <RadioGroupItem value="card" label="신용카드" />
                <RadioGroupItem value="transfer" label="계좌이체" />
              </RadioGroup>
              <RadioGroup label="읽기 전용" readOnly value="card">
                <RadioGroupItem value="card" label="신용카드" />
                <RadioGroupItem value="transfer" label="계좌이체" />
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* ===== SWITCH ===== */}
        <section className="sc-section" id="switch">
          <h2 className="sc-section__title">Switch</h2>
          <p className="sc-section__desc">토글 스위치. 단독(Switch)과 레이블 포함(SwitchField) 두 가지.</p>

          <div className="sc-block">
            <div className="sc-block__label">Switch 단독</div>
            <div className="sc-row">
              <Switch />
              <Switch defaultChecked />
              <Switch size="sm" />
              <Switch size="sm" defaultChecked />
              <Switch disabled />
              <Switch disabled defaultChecked />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">SwitchField (md)</div>
            <div className="sc-col" style={{ maxWidth: 320 }}>
              <SwitchField label="알림 받기" defaultChecked />
              <SwitchField label="마케팅 수신" description="이벤트 및 혜택 정보를 받습니다" />
              <SwitchField label="비활성" disabled />
              <SwitchField label="비활성 + 켜짐" disabled defaultChecked />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">SwitchField (sm)</div>
            <div className="sc-col" style={{ maxWidth: 320 }}>
              <SwitchField size="sm" label="알림 받기" defaultChecked />
              <SwitchField size="sm" label="마케팅 수신" description="이벤트 및 혜택 정보를 받습니다" />
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

        {/* ===== COUNTBADGE / DOTBADGE ===== */}
        <section className="sc-section" id="countbadge">
          <h2 className="sc-section__title">CountBadge / DotBadge</h2>
          <p className="sc-section__desc">숫자 카운트와 점 형태의 상태 뱃지. urgent / accent / neutral 3가지 톤.</p>

          <div className="sc-block">
            <div className="sc-block__label">CountBadge — Tone</div>
            <div className="sc-row" style={{ alignItems: 'center' }}>
              <CountBadge count={9} tone="urgent" />
              <CountBadge count={9} tone="accent" />
              <CountBadge count={9} tone="neutral" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">CountBadge — Size</div>
            <div className="sc-row" style={{ alignItems: 'center' }}>
              <CountBadge count={9} size="sm" />
              <CountBadge count={9} size="md" />
              <CountBadge count={9} size="lg" />
              <CountBadge count={99} size="md" />
              <CountBadge count={100} max={99} size="md" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">DotBadge — Tone</div>
            <div className="sc-row" style={{ alignItems: 'center' }}>
              <DotBadge tone="urgent" aria-label="긴급" />
              <DotBadge tone="accent" aria-label="강조" />
              <DotBadge tone="neutral" aria-label="기본" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">DotBadge — Size</div>
            <div className="sc-row" style={{ alignItems: 'center' }}>
              <DotBadge size="sm" />
              <DotBadge size="md" />
              <DotBadge size="lg" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Avatar에 얹은 예시</div>
            <div className="sc-row" style={{ alignItems: 'center', gap: 24 }}>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <Avatar fallback="A" size="md" />
                <CountBadge count={3} tone="urgent" size="sm" style={{ position: 'absolute', top: -4, right: -4 }} />
              </div>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <Avatar fallback="B" size="md" />
                <DotBadge tone="urgent" size="md" style={{ position: 'absolute', top: 0, right: 0 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ===== LABEL ===== */}
        <section className="sc-section" id="label">
          <h2 className="sc-section__title">Label</h2>
          <p className="sc-section__desc">상태 표시용 pill 레이블. soft / fill 톤, 5가지 사이즈.</p>

          <div className="sc-block">
            <div className="sc-block__label">Soft (기본)</div>
            <div className="sc-row">
              <Label color="info">Info</Label>
              <Label color="success">Success</Label>
              <Label color="warning">Warning</Label>
              <Label color="danger">Danger</Label>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Fill</div>
            <div className="sc-row">
              <Label tone="fill" color="info">Info</Label>
              <Label tone="fill" color="success">Success</Label>
              <Label tone="fill" color="warning">Warning</Label>
              <Label tone="fill" color="danger">Danger</Label>
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Size</div>
            <div className="sc-row" style={{ alignItems: 'center' }}>
              <Label size="xs" color="info">xs</Label>
              <Label size="sm" color="info">sm</Label>
              <Label size="md" color="info">md</Label>
              <Label size="lg" color="info">lg</Label>
              <Label size="xl" color="info">xl</Label>
            </div>
          </div>
        </section>

        {/* ===== AVATAR ===== */}
        <section className="sc-section" id="avatar">
          <h2 className="sc-section__title">Avatar</h2>
          <p className="sc-section__desc">이미지 / 이니셜 폴백. circle / rounded 형태. 온라인 상태 뱃지.</p>

          <div className="sc-block">
            <div className="sc-block__label">Size</div>
            <div className="sc-row" style={{ alignItems: 'center' }}>
              <Avatar size="xs" fallback="A" alt="User A" />
              <Avatar size="sm" fallback="B" alt="User B" />
              <Avatar size="md" fallback="C" alt="User C" />
              <Avatar size="lg" fallback="D" alt="User D" />
              <Avatar size="xl" fallback="E" alt="User E" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Shape</div>
            <div className="sc-row">
              <Avatar shape="circle" fallback="C" alt="Circle" />
              <Avatar shape="rounded" fallback="R" alt="Rounded" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Status</div>
            <div className="sc-row">
              <Avatar fallback="O" status="online" alt="online" />
              <Avatar fallback="B" status="busy" alt="busy" />
              <Avatar fallback="A" status="away" alt="away" />
              <Avatar fallback="F" status="offline" alt="offline" />
            </div>
          </div>
        </section>

        {/* ===== DIVIDER ===== */}
        <section className="sc-section" id="divider">
          <h2 className="sc-section__title">Divider</h2>
          <p className="sc-section__desc">수평 / 수직 구분선. tone, emphasis, lineStyle, inset 지원.</p>

          <div className="sc-block">
            <div className="sc-block__label">Emphasis</div>
            <div className="sc-col" style={{ gap: 16 }}>
              <Divider emphasis="weak" />
              <Divider emphasis="default" />
              <Divider emphasis="strong" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Tone</div>
            <div className="sc-col" style={{ gap: 16 }}>
              <Divider tone="neutral" />
              <Divider tone="accent" />
              <Divider tone="danger" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Style</div>
            <div className="sc-col" style={{ gap: 16 }}>
              <Divider lineStyle="solid" />
              <Divider lineStyle="dashed" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Vertical</div>
            <div className="sc-row" style={{ height: 40, alignItems: 'stretch' }}>
              <span style={{ fontSize: 14 }}>항목 A</span>
              <Divider orientation="vertical" />
              <span style={{ fontSize: 14 }}>항목 B</span>
              <Divider orientation="vertical" />
              <span style={{ fontSize: 14 }}>항목 C</span>
            </div>
          </div>
        </section>

        {/* ===== ALERT ===== */}
        <section className="sc-section" id="alert">
          <h2 className="sc-section__title">Alert</h2>
          <p className="sc-section__desc">인라인 알림. 5가지 타입. 닫기 버튼 옵션.</p>

          <div className="sc-block">
            <div className="sc-block__label">Type</div>
            <div className="sc-col">
              <Alert type="neutral" title="안내" description="일반 안내 메시지입니다." />
              <Alert type="info" title="정보" description="참고할 정보가 있습니다." />
              <Alert type="success" title="완료" description="작업이 성공적으로 완료됐습니다." />
              <Alert type="warning" title="주의" description="확인이 필요한 사항이 있습니다." />
              <Alert type="danger" title="오류" description="문제가 발생했습니다. 다시 시도해 주세요." />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Dismissible</div>
            <div className="sc-col">
              <Alert type="info" title="닫을 수 있는 알림" description="우측 X 버튼으로 닫을 수 있습니다." dismissible onDismiss={() => {}} />
              <Alert type="success" title="완료" dismissible onDismiss={() => {}} />
            </div>
          </div>
        </section>

        {/* ===== SKELETON ===== */}
        <section className="sc-section" id="skeleton">
          <h2 className="sc-section__title">Skeleton</h2>
          <p className="sc-section__desc">콘텐츠 로딩 중 플레이스홀더. Text / Rect / Circle 세 가지.</p>

          <div className="sc-block">
            <div className="sc-block__label">SkeletonText</div>
            <div className="sc-col" style={{ gap: 8 }}>
              <SkeletonText size="xs" width={120} />
              <SkeletonText size="sm" width={200} />
              <SkeletonText size="md" width={280} />
              <SkeletonText size="lg" width={200} />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">SkeletonRect</div>
            <div className="sc-row" style={{ alignItems: 'flex-end' }}>
              <SkeletonRect width={80} height={80} radius="sm" />
              <SkeletonRect width={120} height={60} radius="md" />
              <SkeletonRect width={200} height={40} radius="lg" />
              <SkeletonRect width={160} height={100} radius="none" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">SkeletonCircle</div>
            <div className="sc-row" style={{ alignItems: 'center' }}>
              <SkeletonCircle size="xs" />
              <SkeletonCircle size="sm" />
              <SkeletonCircle size="md" />
              <SkeletonCircle size="lg" />
              <SkeletonCircle size="xl" />
            </div>
          </div>

          <div className="sc-block">
            <div className="sc-block__label">카드 예시</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0' }}>
              <SkeletonCircle size="md" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SkeletonText size="md" width={160} />
                <SkeletonText size="sm" width={100} />
              </div>
            </div>
          </div>
        </section>

        {/* ===== TABLE ===== */}
        <section className="sc-section" id="table">
          <h2 className="sc-section__title">Table</h2>
          <p className="sc-section__desc">정렬, Badge 상태 표시, 행 클릭, 빈 상태, 로딩 지원.</p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span className="sc-code">border: --sys-border-neutral-weak</span>
            <span className="sc-code">header text: --sys-content-neutral-default</span>
            <span className="sc-code">padding: 4px 20px</span>
          </div>

          <div className="sc-table-wrap">
            <Table
              columns={columns}
              data={COMPANIES}
              rowKey="id"
              sortKey={sortKey}
              sortDirection={sortDir}
              onSort={handleSort}
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>bordered prop</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div className="sc-block__label" style={{ marginBottom: 8, fontSize: 12 }}>기본 (bordered 없음)</div>
                <Table columns={columns} data={COMPANIES.slice(0, 3)} rowKey="id" />
              </div>
              <div>
                <div className="sc-block__label" style={{ marginBottom: 8, fontSize: 12 }}>bordered</div>
                <Table columns={columns} data={COMPANIES.slice(0, 3)} rowKey="id" bordered />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>빈 상태 / 로딩</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Table<Company> columns={columns} data={[]} emptyText="등록된 거래처가 없습니다." bordered />
              <Table<Company> columns={columns} data={[]} loading bordered />
            </div>
          </div>
        </section>

        {/* ===== PAGINATION ===== */}
        <section className="sc-section" id="pagination">
          <h2 className="sc-section__title">Pagination</h2>
          <p className="sc-section__desc">페이지 탐색. default(숫자 목록) / minimal(N/총) 두 variant.</p>

          <div className="sc-block">
            <div className="sc-block__label">default — md (총 100개, pageSize 10)</div>
            <PaginationDemo total={100} pageSize={10} size="md" variant="default" />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">default — sm</div>
            <PaginationDemo total={100} pageSize={10} size="sm" variant="default" />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">minimal — md</div>
            <PaginationDemo total={80} pageSize={10} size="md" variant="minimal" />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">minimal — sm</div>
            <PaginationDemo total={80} pageSize={10} size="sm" variant="minimal" />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">페이지 수 적음 (5페이지) — ellipsis 없음</div>
            <PaginationDemo total={50} pageSize={10} size="md" variant="default" />
          </div>

          <div className="sc-block">
            <div className="sc-block__label">Table + Pagination 연동 예시</div>
            <TableWithPagination />
          </div>
        </section>

        {/* ===== MODAL ===== */}
        <section className="sc-section" id="modal">
          <h2 className="sc-section__title">Modal</h2>
          <p className="sc-section__desc">ESC·오버레이 클릭으로 닫힘. 스크롤 잠금.</p>

          <div className="sc-row">
            <Button onClick={() => setModalOpen(true)} iconLeft={<PlusIcon />}>
              Primary (커스텀 footer)
            </Button>
            <Button tone="secondary" variant="outline" onClick={() => setModalNeutralOpen(true)}>
              Neutral footer
            </Button>
            <Button tone="danger" onClick={() => setModalDangerOpen(true)}>
              Danger footer
            </Button>
          </div>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="사용자 정보 수정"
            subtitle="변경된 내용은 즉시 반영됩니다."
            size="md"
            footer={
              <>
                <Button tone="secondary" variant="outline" onClick={() => setModalOpen(false)}>
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

          <Modal
            open={modalNeutralOpen}
            onClose={() => setModalNeutralOpen(false)}
            title="알림"
            subtitle="확인 후 닫아주세요."
            size="sm"
            footerVariation="neutral"
            primaryLabel="확인"
            showSecondaryAction={false}
            onPrimaryAction={() => setModalNeutralOpen(false)}
          >
            <p>처리가 완료되었습니다.</p>
          </Modal>

          <Modal
            open={modalDangerOpen}
            onClose={() => setModalDangerOpen(false)}
            title="사용자 삭제"
            subtitle="이 작업은 되돌릴 수 없습니다."
            size="sm"
            footerVariation="danger"
            primaryLabel="삭제"
            secondaryLabel="취소"
            onPrimaryAction={() => { setModalDangerOpen(false); addToast('error') }}
            onSecondaryAction={() => setModalDangerOpen(false)}
          >
            <p>정말로 이 사용자를 삭제하시겠습니까?</p>
          </Modal>
        </section>

        {/* ===== TOAST ===== */}
        <section className="sc-section" id="toast">
          <h2 className="sc-section__title">Toast</h2>
          <p className="sc-section__desc">4가지 타입. 4초 후 자동 닫힘.</p>

          <div className="sc-row">
            <Button tone="secondary" variant="soft" onClick={() => addToast('success')}>
              <Badge variant="success" size="sm" style={{ marginRight: 4 }}>✓</Badge> Success
            </Button>
            <Button tone="secondary" variant="soft" onClick={() => addToast('error')}>
              <Badge variant="danger" size="sm" style={{ marginRight: 4 }}>✕</Badge> Error
            </Button>
            <Button tone="secondary" variant="soft" onClick={() => addToast('warning')}>
              <Badge variant="warning" size="sm" style={{ marginRight: 4 }}>!</Badge> Warning
            </Button>
            <Button tone="secondary" variant="soft" onClick={() => addToast('info')}>
              <Badge variant="info" size="sm" style={{ marginRight: 4 }}>i</Badge> Info
            </Button>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="sc-block__label" style={{ marginBottom: 12 }}>Action Button</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
              <Toast
                type="info"
                message="새로운 버전이 출시되었습니다."
                actionLabel="업데이트"
                onAction={() => alert('업데이트 클릭')}
                onClose={() => {}}
                duration={0}
              />
              <Toast
                type="success"
                title="저장 완료"
                message="변경 사항이 저장되었습니다."
                actionLabel="실행 취소"
                onAction={() => alert('실행 취소 클릭')}
                onClose={() => {}}
                duration={0}
              />
            </div>
          </div>
        </section>

        {/* ===== TOOLTIP ===== */}
        <section className="sc-section" id="tooltip">
          <h2 className="sc-section__title">Tooltip</h2>
          <p className="sc-section__desc">호버·포커스로 표시. 12방향 배치.</p>

          {/* 12방향 격자 — 각 셀에 충분한 여백을 줘서 툴팁이 잘려나가지 않도록 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            padding: '60px 120px',
          }}>
            {(
              [
                'top-start', 'top', 'top-end',
                'left-start', null, 'right-start',
                'left', null, 'right',
                'left-end', null, 'right-end',
                'bottom-start', 'bottom', 'bottom-end',
              ] as (string | null)[]
            ).map((p, i) =>
              p ? (
                <div key={p} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
                  <Tooltip content={p} placement={p as Parameters<typeof Tooltip>[0]['placement']} delay={0}>
                    <Button variant="outline" size="sm">{p}</Button>
                  </Tooltip>
                </div>
              ) : (
                <div key={i} />
              )
            )}
          </div>

          <div className="sc-row" style={{ paddingTop: 8 }}>
            <Tooltip content="삭제할 수 없습니다" placement="top">
              <span>
                <Button tone="danger" variant="soft" disabled>비활성 버튼</Button>
              </span>
            </Tooltip>
          </div>
        </section>

        {/* ===== APP LAYOUT ===== */}
        <section className="sc-section" id="applayout">
          <h2 className="sc-section__title">AppLayout</h2>
          <p className="sc-section__desc">백오피스 기본 레이아웃. Top Nav 56px + Side Nav 250px + Content 영역. 최소 너비 1600px.</p>

          <div style={{ border: '1px solid var(--sys-border-neutral-default)', borderRadius: 8, overflow: 'hidden', height: 400, resize: 'horizontal', minWidth: 400 }}>
            <AppLayout
              topNav={
                <div style={{ height: '100%', background: 'var(--sys-surface-base)', borderBottom: '1px solid var(--sys-border-neutral-default)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12 }}>
                  <div style={{ width: 80, height: 20, background: 'var(--sys-container-neutral-tint-default)', borderRadius: 4 }} />
                  <div style={{ flex: 1 }} />
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--sys-container-neutral-tint-strong)' }} />
                </div>
              }
              sideNav={
                <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {['대시보드', '회사 관리', '계약 관리', '정산 관리', '설정'].map((item, i) => (
                    <div key={item} style={{
                      padding: '10px 24px',
                      background: i === 0 ? 'var(--sys-container-neutral-tint-default)' : 'transparent',
                      fontSize: 14,
                      color: i === 0 ? 'var(--sys-content-neutral-strong)' : 'var(--sys-content-neutral-muted)',
                      cursor: 'pointer',
                      borderRadius: 6,
                      margin: '0 8px',
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ width: 200, height: 20, background: 'var(--sys-container-neutral-tint-default)', borderRadius: 4 }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ background: 'var(--sys-surface-base)', borderRadius: 8, padding: 20, height: 80, border: '1px solid var(--sys-border-neutral-subtle)' }} />
                  ))}
                </div>
                <div style={{ background: 'var(--sys-surface-base)', borderRadius: 8, height: 120, border: '1px solid var(--sys-border-neutral-subtle)' }} />
              </div>
            </AppLayout>
          </div>
          <p style={{ marginTop: 8, fontSize: 12, color: 'var(--sys-content-neutral-muted)' }}>* 우측 하단 드래그로 width 변경 가능</p>
        </section>

        {/* ── SideNavigation ─────────────────────────────────── */}
        <section className="sc-section" id="sidenavigation">
          <h2 className="sc-section__title">SideNavigation</h2>
          <p className="sc-section__desc">사이드 네비게이션. tone(neutral/accent) × size(md/sm) × depth(1/2/3) 조합.</p>

          {/* Tone × Size 그리드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 32, alignItems: 'start' }}>
            {(['neutral', 'accent'] as const).map(tone =>
              (['md', 'sm'] as const).map(size => (
                <div key={`${tone}-${size}`}>
                  <p style={{ marginBottom: 8, fontSize: 12, color: 'var(--sys-content-neutral-muted)' }}>
                    tone={tone} / size={size}
                  </p>
                  <SideNavigation tone={tone} size={size} style={{ width: 200 }}>
                    <NavSectionHeader>섹션 헤더</NavSectionHeader>
                    <SideNavigationList>
                      <li><NavItem tone={tone} size={size} depth={1} current as="button">현재 메뉴</NavItem></li>
                      <li><NavItem tone={tone} size={size} depth={1} as="button">일반 메뉴</NavItem></li>
                      <li><NavItem tone={tone} size={size} depth={2} as="button">하위 메뉴 1</NavItem></li>
                      <li><NavItem tone={tone} size={size} depth={2} as="button">하위 메뉴 2</NavItem></li>
                      <li><NavItem tone={tone} size={size} depth={3} as="button">3단계 메뉴</NavItem></li>
                      <li><NavItem tone={tone} size={size} depth={1} disabled as="button">비활성 메뉴</NavItem></li>
                    </SideNavigationList>
                  </SideNavigation>
                </div>
              ))
            )}
          </div>

          {/* 아이콘 포함 예시 */}
          <div style={{ marginTop: 32 }}>
            <p style={{ marginBottom: 8, fontSize: 12, color: 'var(--sys-content-neutral-muted)' }}>Leading Icon 포함</p>
            <SideNavigation tone="neutral" size="md" style={{ width: 220 }}>
              <NavSectionHeader>메뉴</NavSectionHeader>
              <SideNavigationList>
                <li>
                  <NavItem tone="neutral" size="md" current as="button"
                    leadingIcon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>}
                  >대시보드</NavItem>
                </li>
                <li>
                  <NavItem tone="neutral" size="md" as="button"
                    leadingIcon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L10.5 5H13.5L11.5 7.5L12.5 11L8 9L3.5 11L4.5 7.5L2.5 5H5.5L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>}
                  >회사 관리</NavItem>
                </li>
                <li>
                  <NavItem tone="neutral" size="md" depth={2} as="button">계약 목록</NavItem>
                </li>
                <li>
                  <NavItem tone="neutral" size="md" depth={2} as="button">계약 등록</NavItem>
                </li>
                <li>
                  <NavItem tone="neutral" size="md" disabled as="button"
                    leadingIcon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  >비활성 메뉴</NavItem>
                </li>
              </SideNavigationList>
            </SideNavigation>
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

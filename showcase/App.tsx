import React, { useState } from 'react'
import { UserListPage } from './UserListPage'
import { Button } from '../src/components/Button'
import { Input } from '../src/components/Input'
import { Select } from '../src/components/Select'
import { Checkbox } from '../src/components/Checkbox/Checkbox'
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
import { AppLayout } from '../src/components/AppLayout'
import { SideNavigation, SideNavigationList, NavItem, NavSectionHeader } from '../src/components/SideNavigation'

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
        </section>

        {/* ===== TOOLTIP ===== */}
        <section className="sc-section" id="tooltip">
          <h2 className="sc-section__title">Tooltip</h2>
          <p className="sc-section__desc">호버·포커스로 표시. 4방향 배치.</p>

          <div className="sc-row" style={{ paddingTop: 16, paddingBottom: 16 }}>
            <Tooltip content="상단 툴팁" placement="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="하단 툴팁" placement="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="좌측 툴팁" placement="left">
              <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="우측 툴팁" placement="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
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

import React, { useState, useMemo, useCallback } from 'react'
import {
  AppLayout, TopNavigation,
  SideNavigation, SideNavigationList, NavSectionHeader, NavItem, Icon,
  PageHeader, KpiCard,
  Autocomplete, type AutocompleteOption,
  Button, IconButton,
  Switch,
  Tooltip,
  Table, type TableColumn,
  Badge,
  Pagination,
  StateView,
} from 'igt-design-system'
import './CasePage.css'

// ── 타입 ────────────────────────────────────────────
type CaseCategory = '기술지원' | '계정' | '결제' | '배송'
type CasePriority = '긴급' | '높음' | '보통' | '낮음'
type CaseStatus   = '접수' | '처리중' | '완료' | '보류'

interface CaseItem {
  id: string
  title: string
  category: CaseCategory
  priority: CasePriority
  status: CaseStatus
  assignee: string
  createdAt: string
}

// ── 목업 데이터 ─────────────────────────────────────
const MOCK_CASES: CaseItem[] = [
  { id: 'CS-001', title: '결제 실패 반복 발생',       category: '결제',   priority: '긴급', status: '처리중', assignee: '김민준', createdAt: '2026-04-23' },
  { id: 'CS-002', title: '비밀번호 재설정 불가',       category: '계정',   priority: '높음', status: '접수',  assignee: '이서연', createdAt: '2026-04-23' },
  { id: 'CS-003', title: '배송 주소 변경 요청',        category: '배송',   priority: '보통', status: '완료',  assignee: '박지훈', createdAt: '2026-04-22' },
  { id: 'CS-004', title: 'API 호출 오류 500',          category: '기술지원', priority: '긴급', status: '처리중', assignee: '최예린', createdAt: '2026-04-22' },
  { id: 'CS-005', title: '앱 로그인 화면 멈춤',        category: '기술지원', priority: '높음', status: '접수',  assignee: '정우성', createdAt: '2026-04-21' },
  { id: 'CS-006', title: '이중 결제 환불 요청',        category: '결제',   priority: '긴급', status: '완료',  assignee: '김민준', createdAt: '2026-04-21' },
  { id: 'CS-007', title: '이메일 수신 안 됨',          category: '계정',   priority: '보통', status: '보류',  assignee: '이서연', createdAt: '2026-04-20' },
  { id: 'CS-008', title: '상품 배송 지연 문의',        category: '배송',   priority: '낮음', status: '완료',  assignee: '박지훈', createdAt: '2026-04-20' },
  { id: 'CS-009', title: '데이터 동기화 실패',         category: '기술지원', priority: '높음', status: '처리중', assignee: '최예린', createdAt: '2026-04-19' },
  { id: 'CS-010', title: '계정 잠금 해제 요청',        category: '계정',   priority: '높음', status: '완료',  assignee: '정우성', createdAt: '2026-04-19' },
  { id: 'CS-011', title: '카드 등록 오류',             category: '결제',   priority: '보통', status: '접수',  assignee: '김민준', createdAt: '2026-04-18' },
  { id: 'CS-012', title: '운송장 번호 확인 요청',      category: '배송',   priority: '낮음', status: '완료',  assignee: '이서연', createdAt: '2026-04-18' },
  { id: 'CS-013', title: '파일 업로드 용량 초과',      category: '기술지원', priority: '보통', status: '보류',  assignee: '박지훈', createdAt: '2026-04-17' },
  { id: 'CS-014', title: 'SNS 연동 로그인 실패',       category: '계정',   priority: '보통', status: '처리중', assignee: '최예린', createdAt: '2026-04-17' },
  { id: 'CS-015', title: '정기결제 취소 불가',         category: '결제',   priority: '높음', status: '접수',  assignee: '정우성', createdAt: '2026-04-16' },
  { id: 'CS-016', title: '해외 배송 미도착',           category: '배송',   priority: '높음', status: '처리중', assignee: '김민준', createdAt: '2026-04-16' },
  { id: 'CS-017', title: '웹훅 이벤트 미수신',         category: '기술지원', priority: '긴급', status: '완료',  assignee: '이서연', createdAt: '2026-04-15' },
  { id: 'CS-018', title: '프로필 사진 업로드 오류',    category: '계정',   priority: '낮음', status: '완료',  assignee: '박지훈', createdAt: '2026-04-15' },
  { id: 'CS-019', title: '부분 환불 처리 오류',        category: '결제',   priority: '높음', status: '보류',  assignee: '최예린', createdAt: '2026-04-14' },
  { id: 'CS-020', title: '반품 접수 후 업데이트 없음', category: '배송',   priority: '보통', status: '처리중', assignee: '정우성', createdAt: '2026-04-14' },
]

// ── Autocomplete 옵션 (제목 + 담당자) ───────────────
const AC_OPTIONS: AutocompleteOption[] = [
  ...MOCK_CASES.map(c => ({ value: `title:${c.id}`, label: c.title })),
  ...Array.from(new Set(MOCK_CASES.map(c => c.assignee)))
    .map(name => ({ value: `assignee:${name}`, label: name })),
]

// ── 뱃지 변환 ────────────────────────────────────────
function priorityVariant(p: CasePriority): 'danger' | 'warning' | 'info' | 'neutral' {
  if (p === '긴급') return 'danger'
  if (p === '높음') return 'warning'
  if (p === '보통') return 'info'
  return 'neutral'
}
function statusVariant(s: CaseStatus): 'info' | 'neutral' | 'success' | 'warning' {
  if (s === '처리중') return 'info'
  if (s === '완료')   return 'success'
  if (s === '보류')   return 'warning'
  return 'neutral'
}

// ── renderOption 하이라이트 ──────────────────────────
// Autocomplete renderOption prop 활용 (catalog-inputs.md 미문서화 — 소스 검증 완료)
function HighlightMatch({ text, query }: { text: string; query: string }) {
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  const idx = lower.indexOf(q)
  if (!query || idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <span className="sbc__highlight">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </span>
  )
}

// ── localStorage 헬퍼 ────────────────────────────────
const RECENT_KEY = 'igt_case_recent'
const MAX_RECENT = 10

function loadRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') }
  catch { return [] }
}
function persistRecent(items: string[]) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(items))
}

// ────────────────────────────────────────────────────
// 페이지
// ────────────────────────────────────────────────────
export default function CasePage() {
  const [keyword, setKeyword]           = useState('')
  const [activeKeyword, setActiveKeyword] = useState('')
  const [recentItems, setRecentItems]   = useState<string[]>(loadRecent)
  const [recentOn, setRecentOn]         = useState(true)
  const [page, setPage]                 = useState(1)
  const PAGE_SIZE = 10

  // 검색 실행 (최근 검색어 저장 + 필터 적용)
  const runSearch = useCallback((kw: string) => {
    const q = kw.trim()
    setActiveKeyword(q)
    setPage(1)
    if (!q) return
    setRecentItems(prev => {
      const next = [q, ...prev.filter(k => k !== q)].slice(0, MAX_RECENT)
      persistRecent(next)
      return next
    })
  }, [])

  const handleDeleteRecent = (kw: string) => {
    setRecentItems(prev => {
      const next = prev.filter(k => k !== kw)
      persistRecent(next)
      return next
    })
  }

  const handleClearAllRecent = () => {
    setRecentItems([])
    persistRecent([])
  }

  const handleReset = () => {
    setKeyword('')
    setActiveKeyword('')
    setPage(1)
  }

  // 필터링
  const filtered = useMemo(() => {
    if (!activeKeyword) return MOCK_CASES
    const q = activeKeyword.toLowerCase()
    return MOCK_CASES.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.assignee.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q),
    )
  }, [activeKeyword])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // KPI
  const cntTotal    = MOCK_CASES.length
  const cntOpen     = MOCK_CASES.filter(c => c.status === '접수').length
  const cntProgress = MOCK_CASES.filter(c => c.status === '처리중').length
  const cntUrgent   = MOCK_CASES.filter(c => c.priority === '긴급').length

  // 테이블 컬럼
  const columns: TableColumn<CaseItem>[] = [
    { key: 'id',       header: '케이스 ID', width: 110 },
    { key: 'title',    header: '제목' },
    {
      key: 'category', header: '카테고리', width: 110, align: 'center',
      render: row => <Badge variant="neutral" badgeStyle="soft">{row.category}</Badge>,
    },
    {
      key: 'priority', header: '우선순위', width: 100, align: 'center',
      render: row => <Badge variant={priorityVariant(row.priority)} badgeStyle="soft">{row.priority}</Badge>,
    },
    {
      key: 'status',   header: '상태', width: 100, align: 'center',
      render: row => <Badge variant={statusVariant(row.status)} badgeStyle="soft">{row.status}</Badge>,
    },
    { key: 'assignee',  header: '담당자',  width: 110 },
    { key: 'createdAt', header: '등록일',  width: 120 },
    {
      key: 'actions' as keyof CaseItem, header: '', width: 72, align: 'center',
      render: () => (
        <Tooltip content="상세 보기" placement="top">
          <IconButton
            icon={<Icon name="open_in_new" size="sm" />}
            aria-label="상세 보기"
            variant="ghost"
            size="sm"
          />
        </Tooltip>
      ),
    },
  ]

  return (
    <AppLayout
      topNav={
        <TopNavigation
          brand="ignite"
          trailing="userActions"
          onAvatarClick={() => {}}
          onNotificationClick={() => {}}
          onSettingsClick={() => {}}
        />
      }
      sideNav={
        <SideNavigation tone="accent">
          <SideNavigationList>
            <NavSectionHeader>고객 지원</NavSectionHeader>
            <NavItem as="button" tone="accent" current
              leadingIcon={<Icon name="folder" size="sm" />}
              onClick={() => {}}>케이스 관리</NavItem>
            <NavItem as="button" tone="accent"
              leadingIcon={<Icon name="analytics" size="sm" />}
              onClick={() => {}}>통계</NavItem>
            <NavSectionHeader>설정</NavSectionHeader>
            <NavItem as="button" tone="accent"
              leadingIcon={<Icon name="setting" size="sm" />}
              onClick={() => {}}>환경 설정</NavItem>
          </SideNavigationList>
        </SideNavigation>
      }
    >
      {/* 섹션 간 gap 관리 — AppLayout padding(50px) 위에 추가 padding 없음 */}
      <div className="sbc__page">

        <PageHeader
          title="케이스 관리"
          subtitle="고객 지원 케이스를 검색하고 관리합니다."
          actions={
            <Button leadingIcon={<Icon name="plus" size="sm" />}>
              케이스 등록
            </Button>
          }
        />

        {/* KPI */}
        <div className="sbc__kpi-grid">
          <KpiCard label="전체 케이스"  value={String(cntTotal)}    unit="건" trend="neutral" description="이번 달" />
          <KpiCard label="접수"         value={String(cntOpen)}     unit="건" trend="neutral" description="처리 대기" />
          <KpiCard label="처리중"       value={String(cntProgress)} unit="건" trend="up" change="+2" description="전일 대비" />
          <KpiCard label="긴급"         value={String(cntUrgent)}   unit="건" trend="up" description="즉시 대응 필요" />
        </div>

        {/* ─────────────────────────────────────────────
            searchbar-skill-plan 구현 영역
            영역 1 + 2-1 + 2-2 통합 (Autocomplete)
        ───────────────────────────────────────────── */}
        <div className="sbc__search-card">

          {/* 영역 2-1 — 사용자 ON/OFF 설정 */}
          <div className="sbc__search-settings">
            <Switch
              label="최근 검색어 저장"
              size="md"
              checked={recentOn}
              onChange={(e) => {
                setRecentOn(e.target.checked)
                if (!e.target.checked) handleClearAllRecent()
              }}
            />
          </div>

          {/* 영역 1 — 입력창 + 검색 버튼
              Enter 키: Autocomplete 내부에서 onKeyDown 미노출(GAP 4)
              → onSelect + 검색 버튼 클릭으로 모든 검색 경로 커버 */}
          <div className="sbc__search-row">
            <Autocomplete
              options={AC_OPTIONS}
              value={keyword}
              onChange={setKeyword}
              onSelect={(_value, label) => {
                setKeyword(label)
                runSearch(label)
              }}
              placeholder="케이스 제목, 담당자, 케이스 ID 검색"
              freeText
              clearable
              showChevron={false}
              minChars={2}
              noOptionsText="일치하는 항목이 없습니다."
              fullWidth
              /* 영역 2-1 — 최근 검색어
                 recentItems prop: catalog-inputs.md 미문서화, 소스 검증 완료 */
              recentItems={recentOn ? recentItems : undefined}
              recentSectionLabel="최근 검색어"
              onRecentSelect={(kw) => { setKeyword(kw); runSearch(kw) }}
              onRecentDelete={handleDeleteRecent}
              onRecentClearAll={handleClearAllRecent}
              /* 영역 2-2 — 하이라이트
                 renderOption prop: catalog-inputs.md 미문서화, 소스 검증 완료 */
              renderOption={(opt, query) => (
                <HighlightMatch text={opt.label} query={query} />
              )}
            />
            <Button
              tone="secondary"
              variant="fill"
              leadingIcon={<Icon name="search" size="sm" />}
              onClick={() => runSearch(keyword)}
            >
              검색
            </Button>
            {activeKeyword && (
              <Button
                tone="secondary"
                variant="outline"
                onClick={handleReset}
              >
                초기화
              </Button>
            )}
          </div>

          {/* GAP 1 시연: recentOn=true + recentItems=[] → 드롭다운 미노출
              Autocomplete가 빈 배열일 때 "최근 검색어 없음" 안내를 드롭다운 내부에 표시할 수 없음
              → 입력 영역 하단에 외부 텍스트로 대신 표시 */}
          {recentOn && recentItems.length === 0 && (
            <div className="sbc__recent-notice">
              <Icon name="time" size="xs" />
              최근 검색어가 없습니다. 검색을 실행하면 자동으로 저장됩니다.
            </div>
          )}

        </div>

        {/* 테이블 */}
        <div className="sbc__table-section">
          <div className="sbc__table-toolbar">
            <span className="sbc__record-count">
              {activeKeyword
                ? <><span className="sbc__kw">"{activeKeyword}"</span> 검색 결과</>
                : '전체'
              }
              &nbsp;{filtered.length}건
            </span>
          </div>

          {filtered.length === 0 ? (
            <StateView
              variant="empty"
              title="검색 결과가 없습니다"
              description={`"${activeKeyword}"에 해당하는 케이스를 찾을 수 없습니다.`}
              actionLabel="검색 초기화"
              onAction={handleReset}
              icon={<Icon name="search" size="xl" />}
            />
          ) : (
            <Table
              columns={columns}
              data={paginated}
              rowKey="id"
              emptyText="케이스가 없습니다."
            />
          )}
        </div>

        {/* 페이지네이션 */}
        {filtered.length > PAGE_SIZE && (
          <div className="sbc__pagination">
            <Pagination
              total={filtered.length}
              page={page}
              pageSize={PAGE_SIZE}
              onChange={setPage}
              size="md"
            />
          </div>
        )}

      </div>
    </AppLayout>
  )
}

import React, { useState, useMemo } from 'react'
import {
  AppLayout, TopNavigation,
  SideNavigation, SideNavigationList, NavSectionHeader, NavItem, Icon,
  PageHeader, KpiCard,
  Searchbox, SearchboxGroup, DateRangePicker, Select, Autocomplete, Button,
  Table, type TableColumn, Badge, Pagination,
} from 'igt-design-system'
import './FinancePage.css'

type TxType = '매출' | '지출' | '정산' | '환불'
type TxStatus = '완료' | '대기' | '취소'

interface Transaction {
  id: string
  datetime: string
  type: TxType
  partner: string
  item: string
  amount: number
  status: TxStatus
}

const MOCK_DATA: Transaction[] = [
  { id: 'TX001', datetime: '2026-04-23 09:12', type: '매출', partner: '삼성전자', item: '소프트웨어 라이선스', amount: 4500000, status: '완료' },
  { id: 'TX002', datetime: '2026-04-23 10:05', type: '지출', partner: '사무용품몰', item: '사무용품 구입', amount: -85000, status: '완료' },
  { id: 'TX003', datetime: '2026-04-22 14:30', type: '매출', partner: '현대자동차', item: '컨설팅 서비스', amount: 12000000, status: '완료' },
  { id: 'TX004', datetime: '2026-04-22 16:00', type: '지출', partner: 'KT', item: '통신비', amount: -320000, status: '완료' },
  { id: 'TX005', datetime: '2026-04-21 11:20', type: '정산', partner: 'LG전자', item: '프로젝트 정산', amount: 7800000, status: '대기' },
  { id: 'TX006', datetime: '2026-04-21 13:45', type: '지출', partner: '임대관리', item: '사무실 임대료', amount: -2500000, status: '완료' },
  { id: 'TX007', datetime: '2026-04-20 09:00', type: '매출', partner: '네이버', item: '광고 대행', amount: 3200000, status: '완료' },
  { id: 'TX008', datetime: '2026-04-20 15:30', type: '환불', partner: '삼성전자', item: '라이선스 환불', amount: -500000, status: '취소' },
  { id: 'TX009', datetime: '2026-04-19 10:10', type: '지출', partner: '카카오', item: '마케팅 비용', amount: -1800000, status: '완료' },
  { id: 'TX010', datetime: '2026-04-19 11:30', type: '매출', partner: 'SK하이닉스', item: '유지보수', amount: 2400000, status: '완료' },
  { id: 'TX011', datetime: '2026-04-18 14:00', type: '지출', partner: '인재개발원', item: '교육비', amount: -960000, status: '완료' },
  { id: 'TX012', datetime: '2026-04-18 16:20', type: '정산', partner: '포스코', item: '월간 정산', amount: 9100000, status: '대기' },
  { id: 'TX013', datetime: '2026-04-17 09:30', type: '매출', partner: '셀트리온', item: '데이터 분석', amount: 5600000, status: '완료' },
  { id: 'TX014', datetime: '2026-04-17 13:00', type: '지출', partner: '한국전력', item: '전기요금', amount: -430000, status: '완료' },
  { id: 'TX015', datetime: '2026-04-16 10:45', type: '매출', partner: 'KB금융', item: 'API 연동', amount: 6700000, status: '완료' },
  { id: 'TX016', datetime: '2026-04-16 15:00', type: '환불', partner: '현대자동차', item: '부분 환불', amount: -1200000, status: '취소' },
  { id: 'TX017', datetime: '2026-04-15 09:00', type: '지출', partner: '복리후생', item: '팀 식대', amount: -240000, status: '완료' },
  { id: 'TX018', datetime: '2026-04-15 11:00', type: '매출', partner: '신한금융', item: '시스템 구축', amount: 18000000, status: '대기' },
  { id: 'TX019', datetime: '2026-04-14 14:20', type: '지출', partner: 'GS칼텍스', item: '출장비', amount: -380000, status: '완료' },
  { id: 'TX020', datetime: '2026-04-14 16:50', type: '매출', partner: 'LG화학', item: '분석 보고서', amount: 4200000, status: '완료' },
]

const SEARCH_OPTIONS = [
  ...new Set(MOCK_DATA.map(t => t.partner)),
  ...new Set(MOCK_DATA.map(t => t.item)),
].map(label => ({ value: label, label }))

const TYPE_OPTIONS = [
  { value: '', label: '전체' },
  { value: '매출', label: '매출' },
  { value: '지출', label: '지출' },
  { value: '정산', label: '정산' },
  { value: '환불', label: '환불' },
]

function formatAmount(amount: number): string {
  return Math.abs(amount).toLocaleString('ko-KR') + '원'
}

function typeVariant(type: TxType): 'info' | 'danger' | 'neutral' | 'warning' {
  if (type === '매출') return 'info'
  if (type === '지출') return 'danger'
  if (type === '환불') return 'warning'
  return 'neutral'
}

function statusVariant(status: TxStatus): 'success' | 'warning' | 'danger' {
  if (status === '완료') return 'success'
  if (status === '대기') return 'warning'
  return 'danger'
}

export default function FinancePage() {
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({})
  const [typeFilter, setTypeFilter] = useState('')
  const [keyword, setKeyword] = useState('')
  const [activeKeyword, setActiveKeyword] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const handleSearch = () => {
    setActiveKeyword(keyword.trim())
    setPage(1)
  }

  const handleReset = () => {
    setDateRange({})
    setTypeFilter('')
    setKeyword('')
    setActiveKeyword('')
    setPage(1)
  }

  const filtered = useMemo(() => {
    return MOCK_DATA.filter(tx => {
      if (typeFilter && tx.type !== typeFilter) return false
      if (activeKeyword) {
        const q = activeKeyword.toLowerCase()
        if (!tx.partner.toLowerCase().includes(q) && !tx.item.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [typeFilter, activeKeyword])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalRevenue = MOCK_DATA.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const totalExpense = MOCK_DATA.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)
  const netProfit = totalRevenue - totalExpense

  const columns: TableColumn<Transaction>[] = [
    { key: 'datetime', header: '거래일시', width: 170 },
    {
      key: 'type', header: '거래유형', width: 100, align: 'center',
      render: row => <Badge variant={typeVariant(row.type)} badgeStyle="soft">{row.type}</Badge>,
    },
    { key: 'partner', header: '거래처', width: 160 },
    { key: 'item', header: '항목' },
    {
      key: 'amount', header: '금액', width: 160, align: 'right',
      render: row => (
        <span className={row.amount >= 0 ? 'finance-amount-pos' : 'finance-amount-neg'}>
          {row.amount >= 0 ? '+' : '-'}{formatAmount(row.amount)}
        </span>
      ),
    },
    {
      key: 'status', header: '상태', width: 100, align: 'center',
      render: row => <Badge variant={statusVariant(row.status)} badgeStyle="soft">{row.status}</Badge>,
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
            <NavSectionHeader>재무</NavSectionHeader>
            <NavItem as="button" tone="accent" current
              leadingIcon={<Icon name="receipt_long" size="sm" />}
              onClick={() => {}}>재무 관리</NavItem>
            <NavItem as="button" tone="accent"
              leadingIcon={<Icon name="analytics" size="sm" />}
              onClick={() => {}}>통계 분석</NavItem>
            <NavSectionHeader>설정</NavSectionHeader>
            <NavItem as="button" tone="accent"
              leadingIcon={<Icon name="setting" size="sm" />}
              onClick={() => {}}>환경 설정</NavItem>
          </SideNavigationList>
        </SideNavigation>
      }
    >
      <div className="finance-content">
        <PageHeader
          title="재무 관리"
          subtitle="거래 내역 및 정산 현황을 조회합니다."
        />

        <div className="finance-kpi-grid">
          <KpiCard label="총 매출" value={totalRevenue.toLocaleString('ko-KR')} unit="원"
            trend="up" change="+8.3%" description="전월 대비" />
          <KpiCard label="총 지출" value={totalExpense.toLocaleString('ko-KR')} unit="원"
            trend="down" change="-2.1%" description="전월 대비" />
          <KpiCard label="순이익" value={netProfit.toLocaleString('ko-KR')} unit="원"
            trend="up" change="+12.4%" description="전월 대비" />
          <KpiCard label="거래 건수" value={String(MOCK_DATA.length)} unit="건"
            trend="neutral" description="이번 달" />
        </div>

        <Searchbox
          columns={3}
          actions={
            <>
              <Button variant="outline" size="md" tone="secondary" onClick={handleReset}>초기화</Button>
              <Button variant="fill" size="md" tone="secondary" onClick={handleSearch}>검색</Button>
            </>
          }
        >
          <SearchboxGroup label="거래일" direction="inline">
            <DateRangePicker value={dateRange} onChange={setDateRange} fullWidth />
          </SearchboxGroup>
          <SearchboxGroup label="거래유형">
            <Select
              options={TYPE_OPTIONS}
              value={typeFilter}
              onChange={v => { setTypeFilter(v as string); setPage(1) }}
              placeholder="전체"
            />
          </SearchboxGroup>
          <SearchboxGroup label="검색">
            <Autocomplete
              options={SEARCH_OPTIONS}
              value={keyword}
              onChange={setKeyword}
              onSelect={(_value, label) => {
                setKeyword(label)
                setActiveKeyword(label)
                setPage(1)
              }}
              placeholder="거래처 또는 항목명 검색"
              freeText
              clearable
              noOptionsText="일치하는 항목이 없습니다."
              fullWidth
            />
          </SearchboxGroup>
        </Searchbox>

        <div>
          <div className="finance-table-toolbar">
            <span className="finance-record-count">전체 {filtered.length}건</span>
          </div>
          <Table
            columns={columns}
            data={paginated}
            rowKey="id"
            emptyText="조회된 거래 내역이 없습니다."
          />
        </div>

        <div className="finance-pagination">
          <Pagination
            total={filtered.length}
            page={page}
            pageSize={PAGE_SIZE}
            onChange={setPage}
            size="md"
          />
        </div>
      </div>
    </AppLayout>
  )
}

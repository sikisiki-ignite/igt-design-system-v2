import React, { useState, useCallback } from 'react'
import {
  Pagination,
  Button,
  StateView,
  Icon,
  Table,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  PageHeader,
  Divider,
} from 'igt-design-system'
import type { TableColumn } from 'igt-design-system'
import './PaginationDemo.css'

// ── 타입 / 목업 ──────────────────────────────────────────────
const TOTAL_ITEMS = 120

type Item = {
  id: number
  name: string
  amount: string
  date: string
  status: '승인' | '대기' | '취소'
}

function generateItems(start: number, count: number): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i + 1,
    name: `결제 내역 #${String(start + i + 1).padStart(4, '0')}`,
    amount: `${((start + i + 1) * 13700).toLocaleString()}원`,
    date: `2026-04-${String(((start + i) % 28) + 1).padStart(2, '0')}`,
    status: (['승인', '대기', '취소'] as const)[(start + i) % 3],
  }))
}

const STATUS_VARIANT: Record<Item['status'], 'success' | 'warning' | 'danger'> = {
  승인: 'success',
  대기: 'warning',
  취소: 'danger',
}

const COLUMNS: TableColumn<Item>[] = [
  { key: 'id', header: 'ID', width: 60 },
  { key: 'name', header: '내역' },
  { key: 'amount', header: '금액', align: 'right' },
  { key: 'date', header: '날짜' },
  {
    key: 'status',
    header: '상태',
    align: 'center',
    render: (row) => (
      <Badge variant={STATUS_VARIANT[row.status]} badgeStyle="soft" size="sm">
        {row.status}
      </Badge>
    ),
  },
]

// ── 유형 A: 숫자 버튼 페이지네이션 ──────────────────────────
function TypeADemo() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Item[]>(() => generateItems(0, 10))

  const handlePageChange = useCallback((newPage: number) => {
    setLoading(true)
    setTimeout(() => {
      const start = (newPage - 1) * pageSize
      setItems(generateItems(start, Math.min(pageSize, TOTAL_ITEMS - start)))
      setPage(newPage)
      setLoading(false)
    }, 500)
  }, [pageSize])

  const handlePageSizeChange = useCallback((newSize: number) => {
    setLoading(true)
    setTimeout(() => {
      setPageSize(newSize)
      setItems(generateItems(0, Math.min(newSize, TOTAL_ITEMS)))
      setPage(1)
      setLoading(false)
    }, 400)
  }, [])

  return (
    <Card bordered shadow={false} padding="none">
      <CardHeader
        title="유형 A — 숫자 버튼"
        description={`전체 ${TOTAL_ITEMS.toLocaleString()}건`}
      />
      <CardBody>
        <Table
          columns={COLUMNS}
          data={items}
          rowKey="id"
          loading={loading}
          emptyText="결제 내역이 없습니다"
          striped
        />
      </CardBody>
      <CardFooter>
        <Pagination
          total={TOTAL_ITEMS}
          page={page}
          pageSize={pageSize}
          onChange={handlePageChange}
          pageSizeOptions={[10, 20, 50]}
          onPageSizeChange={handlePageSizeChange}
          siblingCount={2}
        />
      </CardFooter>
    </Card>
  )
}

// ── 유형 B: 더보기 버튼 ─────────────────────────────────────
function TypeBDemo() {
  const PAGE_SIZE = 20
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)
  const items = generateItems(0, loadedCount)
  const isComplete = loadedCount >= TOTAL_ITEMS

  const handleLoadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setLoadedCount((prev) => Math.min(prev + PAGE_SIZE, TOTAL_ITEMS))
      setLoading(false)
    }, 800)
  }

  return (
    <Card bordered shadow={false} padding="none">
      <CardHeader
        title="유형 B — 더보기 버튼"
        description={`${loadedCount}/${TOTAL_ITEMS}건 표시 중`}
      />
      <CardBody>
        <Table
          columns={COLUMNS}
          data={items}
          rowKey="id"
          emptyText="결제 내역이 없습니다"
          striped
        />
      </CardBody>
      <CardFooter>
        {isComplete ? (
          <div className="demo-loadmore-done">
            <Icon name="check_circle" size="sm" />
            전체 {TOTAL_ITEMS}건 모두 표시되었습니다
          </div>
        ) : (
          <Button
            tone="secondary"
            variant="outline"
            loading={loading}
            onClick={handleLoadMore}
            leadingIcon={<Icon name="add" size="sm" />}
          >
            {PAGE_SIZE}개 더보기
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// ── 결과 0건 상태 ────────────────────────────────────────────
function EmptyStateDemo() {
  return (
    <Card bordered shadow={false} padding="none">
      <CardHeader title="결과 0건 처리" />
      <CardBody className="demo-body-padded">
        <StateView
          variant="empty"
          title="검색 결과가 없습니다"
          description="입력한 조건과 일치하는 결제 내역이 없어요. 검색어를 변경하거나 필터를 다시 설정해보세요."
          actionLabel="필터 초기화"
          onAction={() => alert('필터 초기화')}
        />
      </CardBody>
    </Card>
  )
}

// ── variant/size 쇼케이스 ─────────────────────────────────────
function VariantShowcase() {
  const [page, setPage] = useState(5)

  const rows: { label: string; node: React.ReactNode }[] = [
    {
      label: 'default / md',
      node: <Pagination total={90} page={page} pageSize={10} onChange={setPage} siblingCount={1} size="md" variant="default" />,
    },
    {
      label: 'default / sm',
      node: <Pagination total={90} page={page} pageSize={10} onChange={setPage} siblingCount={1} size="sm" variant="default" />,
    },
    {
      label: 'minimal / md',
      node: <Pagination total={90} page={page} pageSize={10} onChange={setPage} size="md" variant="minimal" />,
    },
    {
      label: 'minimal / sm',
      node: <Pagination total={90} page={page} pageSize={10} onChange={setPage} size="sm" variant="minimal" />,
    },
  ]

  return (
    <Card bordered shadow={false} padding="none">
      <CardHeader title="variant / size 쇼케이스" description="동일한 페이지 상태를 공유합니다" />
      <CardBody>
        <div className="demo-variant-list">
          {rows.map(({ label, node }, i) => (
            <React.Fragment key={label}>
              {i > 0 && <Divider orientation="horizontal" emphasis="weak" />}
              <div className="demo-variant-row">
                <span className="demo-variant-label">{label}</span>
                {node}
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

// ── 갭 분석 패널 ─────────────────────────────────────────────
type GapStatus = 'ok' | 'missing'

const GAP_ITEMS: { status: GapStatus; title: string; desc: string }[] = [
  {
    status: 'ok',
    title: '첫/마지막 페이지 이동 버튼',
    desc: 'Figma 반영 완료. << >> 버튼이 prev/next 그룹으로 항상 표시됨',
  },
  {
    status: 'missing',
    title: 'prev/next 표시 여부 제어',
    desc: 'showPrevNext prop 미지원 — 항상 표시됨',
  },
  {
    status: 'ok',
    title: '숫자 버튼 페이지네이션',
    desc: 'variant="default" — 말줄임, siblingCount, pageSizeOptions 지원',
  },
  {
    status: 'ok',
    title: '더보기 버튼 로딩 상태',
    desc: 'Button(loading) + Table 조합으로 구현',
  },
  {
    status: 'ok',
    title: '결과 0건 처리',
    desc: 'StateView(variant="empty") — 안내 문구 + 액션 버튼',
  },
]

function GapPanel() {
  return (
    <Card bordered shadow={false} padding="none">
      <CardHeader
        title="디자인시스템 갭 분석"
        description="컴포넌트 구현 현황 및 미지원 항목"
      />
      <CardBody>
        <div className="demo-gap-list">
          {GAP_ITEMS.map(({ status, title, desc }, i) => (
            <React.Fragment key={title}>
              {i > 0 && <Divider orientation="horizontal" emphasis="weak" />}
              <div className="demo-gap-row">
                <Badge
                  variant={status === 'ok' ? 'success' : 'warning'}
                  badgeStyle="soft"
                  size="sm"
                >
                  {status === 'ok' ? '완료' : '미지원'}
                </Badge>
                <div className="demo-gap-content">
                  <span className="demo-gap-title">{title}</span>
                  <span className="demo-gap-desc">{desc}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

// ── 메인 ─────────────────────────────────────────────────────
export default function PaginationDemo() {
  return (
    <div className="demo-root">
      <PageHeader
        title="페이지네이션 컴포넌트 쇼케이스"
        subtitle="IGT 디자인시스템 Pagination — variant / size / 사용 패턴"
      />
      <Divider orientation="horizontal" />

      <div className="demo-main">
        <GapPanel />
        <VariantShowcase />
        <TypeADemo />
        <TypeBDemo />
        <EmptyStateDemo />
      </div>
    </div>
  )
}

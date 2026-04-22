# Listing Page Pattern — Backoffice

> AI 코드 생성 기준 문서.
> 백오피스 리스팅 페이지 전체 구조를 정의한다.

---

## 레퍼런스 샘플

**Figma:** `node-id=15035-29959` / fileKey: `pTCGG9i5xgx1HiVQ6EFJRt`

---

## 페이지 전체 구조

```
AppLayout
  topNav: TopNav 영역 (높이 전체 채움)
  sideNav: LNB 영역 → app-layout-lnb.md 참조
  children:
    페이지 헤더
    Filter Box       → filter-box.md 참조
    적용 필터 태그 행
    결과 요약 행
    Table
    Pagination
```

---

## 1. 페이지 헤더

```tsx
<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
  <div>
    <h1 style={{
      margin: 0,
      fontSize: 'var(--ref-font-size-20)',
      fontWeight: 'var(--ref-font-weight-600)',
      color: 'var(--sys-content-neutral-strong)',
    }}>
      페이지 제목
    </h1>
    <p style={{
      margin: '4px 0 0',
      fontSize: 'var(--ref-font-size-14)',
      color: 'var(--sys-content-neutral-muted)',
    }}>
      총 {totalCount}건
    </p>
  </div>
  <Button leadingIcon={<Icon name="plus" size="sm" />}>
    등록
  </Button>
</div>
```

---

## 2. Filter Box

`ai-guide/patterns/filter-box.md` 참조.

필터 타입 매핑:
| 필터 성격 | 사용 타입 |
|---------|---------|
| 키워드 검색 | TYPE 1 — text-search |
| 고정 옵션 복수 선택 (5개 이하) | TYPE 2 — choice-chip |
| 드롭다운 단일 선택 | TYPE 3 — single-select |
| 날짜 범위 | TYPE 6 — date-range |

---

## 3. 적용 필터 태그 행

필터가 하나라도 활성화되어 있을 때만 렌더링.

```tsx
{filterTags.length > 0 && (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
    <span style={{
      fontSize: 'var(--ref-font-size-12)',
      color: 'var(--sys-content-neutral-muted)',
      flexShrink: 0,
    }}>
      적용 필터:
    </span>

    {filterTags.map((tag) => (
      <div
        key={tag.key}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 8px 3px 10px',
          background: 'var(--sys-surface-brand-subtle)',
          border: '1px solid var(--sys-border-brand)',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--ref-font-size-12)',
        }}
      >
        <span style={{ color: 'var(--sys-content-neutral-muted)' }}>{tag.label}:</span>
        <span style={{ fontWeight: 'var(--ref-font-weight-500)', color: 'var(--sys-content-brand-default)' }}>
          {tag.value}
        </span>
        {/* 고정값 필터(날짜 기본값 등)는 X 버튼 생략 가능 */}
        <button
          type="button"
          onClick={() => removeTag(tag.key)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--sys-content-neutral-muted)' }}
          aria-label={`${tag.label} ${tag.value} 필터 제거`}
        >
          <Icon name="x_small" size="xs" />
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={handleReset}
      style={{ background: 'none', border: 'none', padding: '3px 8px', cursor: 'pointer', fontSize: 'var(--ref-font-size-12)', color: 'var(--sys-content-neutral-muted)', textDecoration: 'underline' }}
    >
      전체 초기화
    </button>
  </div>
)}
```

---

## 4. 결과 요약 행

```tsx
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <span style={{ fontSize: 'var(--ref-font-size-13)', color: 'var(--sys-content-neutral-muted)' }}>
    총 <strong style={{ color: 'var(--sys-content-neutral-strong)' }}>{totalCount}</strong>건
  </span>
  <Button
    tone="secondary"
    variant="outline"
    size="sm"
    leadingIcon={<Icon name="refresh" size="sm" />}
    onClick={handleRefresh}
  >
    새로고침
  </Button>
</div>
```

---

## 5. Table

```tsx
<Table
  columns={columns}
  data={pageData}
  rowKey="id"
  loading={loading}
  striped
  emptyText="조건에 맞는 결과가 없습니다."
  onRowClick={(row) => openDetail(row)}
/>
```

---

## 6. Pagination

> ⚠️ **props 이름 주의** — `currentPage`/`totalPages`/`onPageChange` 는 존재하지 않음

```tsx
const PAGE_SIZE = 10
const [currentPage, setCurrentPage] = useState(1)

// 페이지 데이터 슬라이싱
const pageData = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

// 렌더링 — totalCount > PAGE_SIZE 일 때만 표시
{totalCount > PAGE_SIZE && (
  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
    <Pagination
      total={totalCount}        // ✅ 전체 아이템 수
      page={currentPage}        // ✅ 현재 페이지 (1-based)
      pageSize={PAGE_SIZE}      // ✅ 페이지당 아이템 수
      onChange={setCurrentPage} // ✅ 페이지 변경 콜백
    />
  </div>
)}
```

---

## 상태 구조 예시

```tsx
// 필터 입력 상태 (컨트롤 바인딩용)
const [keyword, setKeyword] = useState('')
const [selectedTypes, setSelectedTypes] = useState<string[]>([])

// 적용된 필터 상태 (검색 버튼 클릭 시 반영)
const [appliedKeyword, setAppliedKeyword] = useState('')
const [appliedTypes, setAppliedTypes] = useState<string[]>([])

// 검색 실행
const handleSearch = () => {
  setAppliedKeyword(keyword)
  setAppliedTypes([...selectedTypes])
  setCurrentPage(1) // 검색 시 항상 1페이지로 초기화
  // ...
}

// 필터링
const filtered = useMemo(() =>
  MOCK_DATA.filter((item) => {
    if (appliedKeyword && !item.name.includes(appliedKeyword)) return false
    if (appliedTypes.length > 0 && !appliedTypes.includes(item.type)) return false
    return true
  }),
  [appliedKeyword, appliedTypes]
)
```

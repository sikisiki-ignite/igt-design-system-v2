import React from 'react'
import clsx from 'clsx'
import { Checkbox } from '../Checkbox/Checkbox'
import { Radio } from '../Checkbox/Radio'
import './Table.css'

export type SortDirection = 'asc' | 'desc' | null

export interface TableColumn<T = Record<string, unknown>> {
  key: string
  header: React.ReactNode
  render?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  /** 셀 직접 편집 허용. onCellEdit과 함께 사용 */
  editable?: boolean
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
  rowKey?: keyof T | ((row: T) => string)
  sortKey?: string
  sortDirection?: SortDirection
  onSort?: (key: string, direction: SortDirection) => void
  loading?: boolean
  emptyText?: string
  className?: string
  striped?: boolean
  stickyHeader?: boolean
  bordered?: boolean
  onRowClick?: (row: T, index: number) => void
  /** 선택된 행의 key 집합 (controlled). 지정 시 체크박스 열 자동 표시 */
  selectedKeys?: Set<string>
  /** 선택 변경 콜백 */
  onSelectionChange?: (keys: Set<string>) => void
  /** 단일 선택된 행의 key (controlled). 지정 시 라디오 열 자동 표시 */
  selectedKey?: string
  /** 단일 선택 변경 콜백 */
  onSelectedKeyChange?: (key: string) => void
  /** 행 확장 설정. expandedRowRender 지정 시 확장 토글 열 자동 표시 */
  expandable?: {
    expandedRowRender: (row: T, index: number) => React.ReactNode
    rowExpandable?: (row: T) => boolean
    defaultExpandedKeys?: string[]
  }
  /** 셀 편집 완료 콜백 (rowKey, colKey, newValue) */
  onCellEdit?: (rowKey: string, colKey: string, newValue: string) => void
}

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  rowKey,
  sortKey,
  sortDirection,
  onSort,
  loading = false,
  emptyText = '데이터가 없습니다.',
  className,
  striped = false,
  stickyHeader = false,
  bordered = false,
  onRowClick,
  selectedKeys,
  onSelectionChange,
  selectedKey,
  onSelectedKeyChange,
  expandable,
  onCellEdit,
}: TableProps<T>) {
  const selectable = selectedKeys !== undefined && onSelectionChange !== undefined
  const radioSelectable = selectedKey !== undefined && onSelectedKeyChange !== undefined
  const allKeys = data.map((row, i) => getRowKey(row, i))
  const selectedCount = selectedKeys ? selectedKeys.size : 0
  const allSelected = selectable && data.length > 0 && selectedCount === data.length
  const someSelected = selectable && selectedCount > 0 && selectedCount < data.length

  // ── 행 확장 상태 ─────────────────────────────────────────
  const [expandedKeys, setExpandedKeys] = React.useState<Set<string>>(
    new Set(expandable?.defaultExpandedKeys ?? []),
  )
  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // ── 인라인 편집 상태 ──────────────────────────────────────
  const [editingCell, setEditingCell] = React.useState<{ rowKey: string; colKey: string } | null>(null)
  const [editingValue, setEditingValue] = React.useState('')

  const startEdit = (rowKey: string, colKey: string, currentValue: string) => {
    setEditingCell({ rowKey, colKey })
    setEditingValue(currentValue)
  }

  const commitEdit = () => {
    if (editingCell) {
      onCellEdit?.(editingCell.rowKey, editingCell.colKey, editingValue)
    }
    setEditingCell(null)
  }

  const cancelEdit = () => setEditingCell(null)

  function getRowKey(row: T, index: number): string {
    if (!rowKey) return String(index)
    if (typeof rowKey === 'function') return rowKey(row)
    return String(row[rowKey])
  }

  const handleHeaderCheck = () => {
    if (!onSelectionChange) return
    if (allSelected) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(allKeys))
    }
  }

  const handleRowCheck = (key: string) => {
    if (!selectedKeys || !onSelectionChange) return
    const next = new Set(selectedKeys)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    onSelectionChange(next)
  }

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable || !onSort) return
    let next: SortDirection
    if (sortKey !== col.key) next = 'asc'
    else if (sortDirection === 'asc') next = 'desc'
    else next = null
    onSort(col.key, next)
  }

  const colSpanTotal = columns.length + (selectable ? 1 : 0) + (radioSelectable ? 1 : 0) + (expandable ? 1 : 0)

  return (
    <div
      className={clsx('igt-table-wrap', bordered && 'igt-table-wrap--bordered', className)}
      data-loading={loading || undefined}
      data-sticky-header={stickyHeader || undefined}
    >
      <table className="igt-table">
        <thead className="igt-table__head">
          <tr>
            {expandable && <th className="igt-table__th igt-table__th--expand" />}
            {radioSelectable && (
              <th className="igt-table__th igt-table__th--check" />
            )}
            {selectable && (
              <th className="igt-table__th igt-table__th--check">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleHeaderCheck}
                  aria-label="전체 선택"
                  size="md"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx('igt-table__th', col.sortable && 'igt-table__th--sortable')}
                style={{ width: col.width, textAlign: col.align || 'left' }}
                onClick={() => handleSort(col)}
                aria-sort={
                  sortKey === col.key && sortDirection
                    ? sortDirection === 'asc' ? 'ascending' : 'descending'
                    : undefined
                }
              >
                <span className="igt-table__th-inner">
                  {col.header}
                  {col.sortable && (
                    <span className="igt-table__sort-icon" aria-hidden="true">
                      {sortKey === col.key && sortDirection === 'asc' && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 3l4 6H2l4-6z" fill="currentColor" />
                        </svg>
                      )}
                      {sortKey === col.key && sortDirection === 'desc' && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 9L2 3h8L6 9z" fill="currentColor" />
                        </svg>
                      )}
                      {(sortKey !== col.key || !sortDirection) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2l3 4H3l3-4zm0 8L3 6h6L6 10z" fill="currentColor" opacity="0.4" />
                        </svg>
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="igt-table__body">
          {loading && (
            <tr>
              <td colSpan={colSpanTotal} className="igt-table__loading-cell">
                <span className="igt-table__spinner" />
              </td>
            </tr>
          )}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={colSpanTotal} className="igt-table__empty-cell">
                {emptyText}
              </td>
            </tr>
          )}
          {!loading &&
            data.map((row, rowIndex) => {
              const key = getRowKey(row, rowIndex)
              const isSelected = selectable && selectedKeys!.has(key)
              const isRadioSelected = radioSelectable && selectedKey === key
              const isExpandable = expandable
                ? (expandable.rowExpandable ? expandable.rowExpandable(row) : true)
                : false
              const isExpanded = expandable ? expandedKeys.has(key) : false

              return (
                <React.Fragment key={key}>
                  <tr
                    className={clsx(
                      'igt-table__row',
                      striped && rowIndex % 2 === 1 && 'igt-table__row--striped',
                      onRowClick && 'igt-table__row--clickable',
                      (isSelected || isRadioSelected) && 'igt-table__row--selected',
                      isExpanded && 'igt-table__row--expanded',
                    )}
                    aria-selected={selectable || radioSelectable ? (isSelected || isRadioSelected) : undefined}
                    onClick={() => onRowClick?.(row, rowIndex)}
                  >
                    {expandable && (
                      <td className="igt-table__td igt-table__td--expand" onClick={(e) => e.stopPropagation()}>
                        {isExpandable && (
                          <button
                            type="button"
                            className={clsx('igt-table__expand-btn', isExpanded && 'igt-table__expand-btn--open')}
                            onClick={() => toggleExpand(key)}
                            aria-label={isExpanded ? '접기' : '펼치기'}
                            aria-expanded={isExpanded}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        )}
                      </td>
                    )}
                    {radioSelectable && (
                      <td className="igt-table__td igt-table__td--check" onClick={(e) => e.stopPropagation()}>
                        <Radio
                          checked={isRadioSelected}
                          onChange={() => onSelectedKeyChange!(key)}
                          aria-label={`${rowIndex + 1}행 선택`}
                          size="md"
                        />
                      </td>
                    )}
                    {selectable && (
                      <td className="igt-table__td igt-table__td--check" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleRowCheck(key)}
                          aria-label={`${rowIndex + 1}행 선택`}
                          size="md"
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const rawValue = String((row as Record<string, unknown>)[col.key] ?? '')
                      const isEditing =
                        col.editable && editingCell?.rowKey === key && editingCell?.colKey === col.key
                      return (
                        <td
                          key={col.key}
                          className={clsx('igt-table__td', col.editable && 'igt-table__td--editable')}
                          style={{ textAlign: col.align || 'left' }}
                          onClick={(e) => {
                            if (col.editable && onCellEdit && !isEditing) {
                              e.stopPropagation()
                              startEdit(key, col.key, rawValue)
                            }
                          }}
                        >
                          {isEditing ? (
                            <input
                              className="igt-table__cell-input"
                              value={editingValue}
                              autoFocus
                              onChange={(e) => setEditingValue(e.target.value)}
                              onBlur={commitEdit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') commitEdit()
                                if (e.key === 'Escape') cancelEdit()
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : col.render ? (
                            col.render(row, rowIndex)
                          ) : (
                            rawValue
                          )}
                        </td>
                      )
                    })}
                  </tr>
                  {expandable && isExpanded && (
                    <tr className="igt-table__expanded-row">
                      <td colSpan={colSpanTotal} className="igt-table__expanded-cell">
                        {expandable.expandedRowRender(row, rowIndex)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

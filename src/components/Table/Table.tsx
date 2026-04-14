import React from 'react'
import clsx from 'clsx'
import './Table.css'

export type SortDirection = 'asc' | 'desc' | null

export interface TableColumn<T = Record<string, unknown>> {
  key: string
  header: React.ReactNode
  render?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
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
}: TableProps<T>) {
  const getRowKey = (row: T, index: number): string => {
    if (!rowKey) return String(index)
    if (typeof rowKey === 'function') return rowKey(row)
    return String(row[rowKey])
  }

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable || !onSort) return
    let next: SortDirection
    if (sortKey !== col.key) next = 'asc'
    else if (sortDirection === 'asc') next = 'desc'
    else next = null
    onSort(col.key, next)
  }

  return (
    <div
      className={clsx('igt-table-wrap', bordered && 'igt-table-wrap--bordered', className)}
      data-loading={loading || undefined}
      data-sticky-header={stickyHeader || undefined}
    >
      <table className="igt-table">
        <thead className="igt-table__head">
          <tr>
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
              <td colSpan={columns.length} className="igt-table__loading-cell">
                <span className="igt-table__spinner" />
              </td>
            </tr>
          )}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="igt-table__empty-cell">
                {emptyText}
              </td>
            </tr>
          )}
          {!loading &&
            data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className={clsx(
                  'igt-table__row',
                  striped && rowIndex % 2 === 1 && 'igt-table__row--striped',
                  onRowClick && 'igt-table__row--clickable'
                )}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="igt-table__td"
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

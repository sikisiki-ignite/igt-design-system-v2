import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Pagination.css'

/* ============================================================
   IGT Pagination Component
   피그마: 3 Pagination (240:19710)
   variant(default/minimal) × size(sm/md)
   ============================================================ */

export type PaginationSize = 'sm' | 'md'
export type PaginationVariant = 'default' | 'minimal'

export interface PaginationProps {
  /** 전체 아이템 수 */
  total: number
  /** 현재 페이지 (1-based) */
  page: number
  /** 페이지당 아이템 수 */
  pageSize?: number
  /** 페이지 변경 콜백 */
  onChange: (page: number) => void
  size?: PaginationSize
  variant?: PaginationVariant
  /** 현재 페이지 양쪽에 표시할 페이지 버튼 수 */
  siblingCount?: number
  className?: string
}

const ELLIPSIS = '...' as const

function buildPageRange(
  totalPages: number,
  page: number,
  siblingCount: number
): (number | typeof ELLIPSIS)[] {
  // 총 페이지가 적으면 전부 표시
  const totalButtons = siblingCount * 2 + 5 // siblings + current + 2 ends + 2 ellipsis slots
  if (totalPages <= totalButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(page - siblingCount, 1)
  const rightSibling = Math.min(page + siblingCount, totalPages)

  const showLeadingEllipsis = leftSibling > 2
  const showTrailingEllipsis = rightSibling < totalPages - 1

  if (!showLeadingEllipsis && showTrailingEllipsis) {
    const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1)
    return [...leftRange, ELLIPSIS, totalPages]
  }

  if (showLeadingEllipsis && !showTrailingEllipsis) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => totalPages - (3 + siblingCount * 2) + 1 + i
    )
    return [1, ELLIPSIS, ...rightRange]
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  )
  return [1, ELLIPSIS, ...middleRange, ELLIPSIS, totalPages]
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      total,
      page,
      pageSize = 10,
      onChange,
      size = 'md',
      variant = 'default',
      siblingCount = 1,
      className,
    },
    ref
  ) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const isFirst = page <= 1
    const isLast = page >= totalPages

    const pages = useMemo(
      () => buildPageRange(totalPages, page, siblingCount),
      [totalPages, page, siblingCount]
    )

    const handlePrev = () => { if (!isFirst) onChange(page - 1) }
    const handleNext = () => { if (!isLast) onChange(page + 1) }

    return (
      <div
        ref={ref}
        className={clsx('igt-pagination', className)}
        data-size={size}
        data-variant={variant}
        role="navigation"
        aria-label="페이지 탐색"
      >
        {/* Prev */}
        <button
          type="button"
          className="igt-pagination__nav"
          onClick={handlePrev}
          disabled={isFirst}
          aria-label="이전 페이지"
        >
          <Icon name={size === 'sm' ? 'chevron_left_small' : 'chevron_left'} size={size === 'sm' ? 'sm' : 'md'} />
        </button>

        {variant === 'default' && pages.map((p, i) =>
          p === ELLIPSIS ? (
            <span key={`ellipsis-${i}`} className="igt-pagination__ellipsis">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className="igt-pagination__page"
              data-current={p === page || undefined}
              onClick={() => onChange(p as number)}
              aria-label={`${p}페이지`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        {variant === 'minimal' && (
          <span className="igt-pagination__minimal">
            <span className="igt-pagination__minimal-current">{page}</span>
            <span className="igt-pagination__minimal-sep">/</span>
            <span className="igt-pagination__minimal-total">{totalPages}</span>
          </span>
        )}

        {/* Next */}
        <button
          type="button"
          className="igt-pagination__nav"
          onClick={handleNext}
          disabled={isLast}
          aria-label="다음 페이지"
        >
          <Icon name={size === 'sm' ? 'chevron_right_small' : 'chevron_right'} size={size === 'sm' ? 'sm' : 'md'} />
        </button>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'

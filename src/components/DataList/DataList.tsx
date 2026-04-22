import React from 'react'
import clsx from 'clsx'
import './DataList.css'

/* ============================================================
   IGT DataList Component
   레이블-값 쌍 목록 (Description List)
   상세 페이지 데이터 표시에 사용
   ============================================================ */

export type DataListLayout = 'vertical' | 'horizontal'
export type DataListSize = 'sm' | 'md'

export interface DataItem {
  label: React.ReactNode
  value: React.ReactNode
  /** 값이 없을 때 표시할 내용. default: '—' */
  emptyText?: string
  /** 전체 너비 점유 (horizontal 레이아웃에서 사용) */
  fullWidth?: boolean
}

export interface DataListProps {
  items: DataItem[]
  /** 레이블-값 배치 방향. default: 'horizontal' */
  layout?: DataListLayout
  /** 크기. default: 'md' */
  size?: DataListSize
  /** 항목 사이 구분선 표시. default: true */
  divider?: boolean
  /** 열 수 (horizontal 레이아웃에서 grid columns). default: 2 */
  columns?: 1 | 2 | 3
  className?: string
}

export const DataList: React.FC<DataListProps> = ({
  items,
  layout = 'horizontal',
  size = 'md',
  divider = true,
  columns = 2,
  className,
}) => (
  <dl
    className={clsx('igt-data-list', className)}
    data-layout={layout}
    data-size={size}
    data-divider={divider || undefined}
    data-columns={columns}
  >
    {items.map((item, index) => (
      <div
        key={index}
        className="igt-data-list__item"
        data-full-width={item.fullWidth || undefined}
      >
        <dt className="igt-data-list__label">{item.label}</dt>
        <dd className="igt-data-list__value">
          {item.value !== undefined && item.value !== null && item.value !== ''
            ? item.value
            : (item.emptyText ?? '—')}
        </dd>
      </div>
    ))}
  </dl>
)

DataList.displayName = 'DataList'

import React from 'react'
import clsx from 'clsx'
import './FilterBar.css'

/* ── FilterGroup ──────────────────────────────────────────── */
export interface FilterGroupProps {
  /** 필터 그룹 레이블 */
  label: string
  children: React.ReactNode
  className?: string
}

export function FilterGroup({ label, children, className }: FilterGroupProps) {
  return (
    <div className={clsx('igt-filter-group', className)}>
      <span className="igt-filter-group__label">{label}</span>
      <div className="igt-filter-group__content">{children}</div>
    </div>
  )
}

/* ── FilterBar ────────────────────────────────────────────── */
export interface FilterBarProps {
  /** 검색 인풋 왼쪽 영역 (Input, Select, FilterGroup 등) */
  filters?: React.ReactNode
  /** 우측 고정 액션 영역 (버튼, 정렬 Select 등) */
  actions?: React.ReactNode
  /** 활성 필터 칩 영역 (FilterChip 등) — filters 하단에 표시 */
  chips?: React.ReactNode
  className?: string
}

export function FilterBar({ filters, actions, chips, className }: FilterBarProps) {
  return (
    <div className={clsx('igt-filter-bar', className)}>
      {(filters || actions) && (
        <div className="igt-filter-bar__row">
          {filters && <div className="igt-filter-bar__filters">{filters}</div>}
          {actions && <div className="igt-filter-bar__actions">{actions}</div>}
        </div>
      )}
      {chips && <div className="igt-filter-bar__chips">{chips}</div>}
    </div>
  )
}

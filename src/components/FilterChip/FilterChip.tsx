import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './FilterChip.css'

/* ============================================================
   IGT FilterChip
   피그마: 2146:22989 — FilterChip
   선택 가능 필터 chip — 선택 시 "label · value" 표시 + accent
   size(xs/sm/md) × selected × disabled
   ============================================================ */

export type FilterChipSize = 'xs' | 'sm' | 'md'

export interface FilterChipProps {
  label: string
  value?: string
  /** 선택된 상태에서 표시할 값 */
  selectedValue?: string
  selected?: boolean
  size?: FilterChipSize
  leading?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selectedValue,
  selected = false,
  size = 'md',
  leading,
  disabled = false,
  onClick,
  className,
}) => {
  const iconSize = size === 'xs' ? 'xs' : size === 'sm' ? 'xs' : 'sm'

  return (
    <button
      type="button"
      className={clsx('igt-filter-chip', className)}
      data-size={size}
      data-selected={selected || undefined}
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => !disabled && onClick?.()}
    >
      {leading && <span className="igt-filter-chip__leading">{leading}</span>}
      <span className="igt-filter-chip__label-wrap">
        <span className="igt-filter-chip__label">{label}</span>
        {selected && selectedValue && (
          <>
            <span className="igt-filter-chip__dot">·</span>
            <span className="igt-filter-chip__value">{selectedValue}</span>
          </>
        )}
      </span>
      <span className="igt-filter-chip__trailing">
        <Icon name="chevron_down" size={iconSize} />
      </span>
    </button>
  )
}

FilterChip.displayName = 'FilterChip'

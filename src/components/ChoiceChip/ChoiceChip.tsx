import React from 'react'
import clsx from 'clsx'
import './ChoiceChip.css'

/* ============================================================
   IGT ChoiceChip
   피그마: ChoiceChip (2139:47039)
   단일 선택 칩 — ChoiceChipGroup 내부에서 사용
   size(xs/sm/md) × selected × disabled
   ============================================================ */

export type ChoiceChipSize = 'xs' | 'sm' | 'md'

export interface ChoiceChipProps {
  label: string
  value: string
  selected?: boolean
  disabled?: boolean
  size?: ChoiceChipSize
  onClick?: (value: string) => void
  className?: string
}

export const ChoiceChip: React.FC<ChoiceChipProps> = ({
  label,
  value,
  selected = false,
  disabled = false,
  size = 'md',
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      className={clsx('igt-chip', className)}
      data-size={size}
      data-selected={selected || undefined}
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => !disabled && onClick?.(value)}
    >
      {label}
    </button>
  )
}

ChoiceChip.displayName = 'ChoiceChip'

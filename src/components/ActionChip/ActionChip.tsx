import React from 'react'
import clsx from 'clsx'
import './ActionChip.css'

/* ============================================================
   IGT ActionChip
   피그마: 628:33260 — ActionChip
   클릭 액션용 chip — leading/trailing icon 옵션
   size(xs/sm/md) × disabled
   ============================================================ */

export type ActionChipSize = 'xs' | 'sm' | 'md'

export interface ActionChipProps {
  label: string
  size?: ActionChipSize
  leading?: React.ReactNode
  trailing?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export const ActionChip: React.FC<ActionChipProps> = ({
  label,
  size = 'md',
  leading,
  trailing,
  disabled = false,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      className={clsx('igt-action-chip', className)}
      data-size={size}
      disabled={disabled}
      onClick={() => !disabled && onClick?.()}
    >
      {leading && <span className="igt-action-chip__leading">{leading}</span>}
      <span className="igt-action-chip__label">{label}</span>
      {trailing && <span className="igt-action-chip__trailing">{trailing}</span>}
    </button>
  )
}

ActionChip.displayName = 'ActionChip'

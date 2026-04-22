import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './InputChip.css'

/* ============================================================
   IGT InputChip
   피그마: 2146:25765 — InputChip
   선택된 필터 태그 — X 버튼 항상 내장
   size(xs/sm/md) × variation(neutral/accent) × disabled
   ============================================================ */

export type InputChipSize = 'xs' | 'sm' | 'md'
export type InputChipVariation = 'neutral' | 'accent'

export interface InputChipProps {
  label: string
  value: string
  size?: InputChipSize
  variation?: InputChipVariation
  /** 좌측 아이콘 (ReactNode) */
  leading?: React.ReactNode
  disabled?: boolean
  onRemove?: (value: string) => void
  className?: string
}

export const InputChip: React.FC<InputChipProps> = ({
  label,
  value,
  size = 'md',
  variation = 'neutral',
  leading,
  disabled = false,
  onRemove,
  className,
}) => {
  return (
    <div
      className={clsx('igt-input-chip', className)}
      data-size={size}
      data-variation={variation}
      data-disabled={disabled || undefined}
      aria-disabled={disabled}
    >
      {leading && (
        <span className="igt-input-chip__leading">{leading}</span>
      )}
      <span className="igt-input-chip__label">{label}</span>
      <button
        type="button"
        className="igt-input-chip__remove"
        aria-label={`${label} 제거`}
        disabled={disabled}
        onClick={() => !disabled && onRemove?.(value)}
      >
        <Icon name="x_small" size={size === 'xs' ? 'xs' : size === 'sm' ? 'xs' : 'sm'} />
      </button>
    </div>
  )
}

InputChip.displayName = 'InputChip'

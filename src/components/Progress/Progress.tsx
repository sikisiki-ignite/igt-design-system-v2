import React from 'react'
import clsx from 'clsx'
import './Progress.css'

/* ============================================================
   IGT Progress Component
   선형 진행바 — value/max 기반 또는 indeterminate
   ============================================================ */

export type ProgressSize = 'xs' | 'sm' | 'md'
export type ProgressTone = 'primary' | 'success' | 'warning' | 'danger'

export interface ProgressProps {
  /** 현재 값 (0 ~ max). 미지정 시 indeterminate */
  value?: number
  /** 최대 값. default: 100 */
  max?: number
  size?: ProgressSize
  tone?: ProgressTone
  /** 레이블 (스크린리더 용) */
  label?: string
  /** 진행률 텍스트 표시 여부 */
  showValue?: boolean
  className?: string
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size = 'sm',
      tone = 'primary',
      label,
      showValue = false,
      className,
    },
    ref
  ) => {
    const isIndeterminate = value === undefined
    const percentage = isIndeterminate ? undefined : Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div ref={ref} className={clsx('igt-progress-wrap', className)}>
        {(label || showValue) && (
          <div className="igt-progress__header">
            {label && <span className="igt-progress__label">{label}</span>}
            {showValue && !isIndeterminate && (
              <span className="igt-progress__value">{Math.round(percentage!)}%</span>
            )}
          </div>
        )}
        <div
          className="igt-progress"
          data-size={size}
          data-tone={tone}
          data-indeterminate={isIndeterminate || undefined}
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        >
          <div
            className="igt-progress__bar"
            style={isIndeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

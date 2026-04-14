import React from 'react'
import clsx from 'clsx'
import './CountBadge.css'

/* ============================================================
   IGT CountBadge
   피그마: CountBadge (649:256039)
   숫자 카운트 표시용 원형 뱃지
   tone(urgent/accent/neutral) × size(sm/md/lg)
   ============================================================ */

export type CountBadgeTone = 'urgent' | 'accent' | 'neutral'
export type CountBadgeSize = 'sm' | 'md' | 'lg'

export interface CountBadgeProps {
  /** 표시할 숫자 */
  count: number
  /** 최대 표시 숫자 (초과 시 max+ 표시) */
  max?: number
  tone?: CountBadgeTone
  size?: CountBadgeSize
  className?: string
}

export const CountBadge: React.FC<CountBadgeProps> = ({
  count,
  max = 99,
  tone = 'urgent',
  size = 'md',
  className,
}) => {
  const label = count > max ? `${max}+` : String(count)

  return (
    <span
      className={clsx('igt-count-badge', className)}
      data-tone={tone}
      data-size={size}
      aria-label={`${count}개`}
    >
      {label}
    </span>
  )
}

CountBadge.displayName = 'CountBadge'

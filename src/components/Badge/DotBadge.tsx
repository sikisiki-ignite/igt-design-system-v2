import React from 'react'
import clsx from 'clsx'
import './DotBadge.css'

/* ============================================================
   IGT DotBadge
   피그마: DotBadge (2240:53824)
   상태 표시용 점 뱃지
   tone(urgent/accent/neutral) × size(sm/md/lg)
   ============================================================ */

export type DotBadgeTone = 'urgent' | 'accent' | 'neutral'
export type DotBadgeSize = 'sm' | 'md' | 'lg'

export interface DotBadgeProps {
  tone?: DotBadgeTone
  size?: DotBadgeSize
  className?: string
  'aria-label'?: string
}

export const DotBadge: React.FC<DotBadgeProps> = ({
  tone = 'urgent',
  size = 'md',
  className,
  'aria-label': ariaLabel,
}) => {
  return (
    <span
      className={clsx('igt-dot-badge', className)}
      data-tone={tone}
      data-size={size}
      aria-label={ariaLabel}
      role={ariaLabel ? 'status' : undefined}
    />
  )
}

DotBadge.displayName = 'DotBadge'

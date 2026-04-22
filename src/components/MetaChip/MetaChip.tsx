import React from 'react'
import clsx from 'clsx'
import './MetaChip.css'

/* ============================================================
   IGT MetaChip
   피그마: 2287:28130 — MetaChip
   메타 정보 표시용 chip — label + value(brand색), pill 모양
   size(xs/sm/md), 클릭 없는 표시 전용
   ============================================================ */

export type MetaChipSize = 'xs' | 'sm' | 'md'

export interface MetaChipProps {
  label: string
  value?: string
  size?: MetaChipSize
  leading?: React.ReactNode
  className?: string
}

export const MetaChip: React.FC<MetaChipProps> = ({
  label,
  value,
  size = 'md',
  leading,
  className,
}) => {
  return (
    <div
      className={clsx('igt-meta-chip', className)}
      data-size={size}
    >
      {leading && <span className="igt-meta-chip__leading">{leading}</span>}
      <span className="igt-meta-chip__content">
        <span className="igt-meta-chip__label">{label}</span>
        {value && <span className="igt-meta-chip__value">{value}</span>}
      </span>
    </div>
  )
}

MetaChip.displayName = 'MetaChip'

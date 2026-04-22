import React from 'react'
import clsx from 'clsx'
import './InputChipGroup.css'

/* ============================================================
   IGT InputChipGroup
   피그마: 2146:26735 — InputChipGroup
   InputChip 목록 컨테이너 — wrap / scroll 레이아웃
   ============================================================ */

export type InputChipGroupLayout = 'wrap' | 'scroll'
export type InputChipGroupSize = 'xs' | 'sm' | 'md'

export interface InputChipGroupProps {
  layout?: InputChipGroupLayout
  size?: InputChipGroupSize
  children: React.ReactNode
  className?: string
}

export function InputChipGroup({
  layout = 'wrap',
  size = 'md',
  children,
  className,
}: InputChipGroupProps) {
  return (
    <div
      className={clsx('igt-input-chip-group', className)}
      data-layout={layout}
      data-size={size}
    >
      {children}
    </div>
  )
}

InputChipGroup.displayName = 'InputChipGroup'

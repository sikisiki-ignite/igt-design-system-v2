import React from 'react'
import clsx from 'clsx'
import './ActionChipGroup.css'

export type ActionChipGroupLayout = 'wrap' | 'scroll'
export type ActionChipGroupSize = 'xs' | 'sm' | 'md'

export interface ActionChipGroupProps {
  layout?: ActionChipGroupLayout
  size?: ActionChipGroupSize
  children: React.ReactNode
  className?: string
}

export function ActionChipGroup({
  layout = 'wrap',
  size = 'md',
  children,
  className,
}: ActionChipGroupProps) {
  return (
    <div
      className={clsx('igt-action-chip-group', className)}
      data-layout={layout}
      data-size={size}
    >
      {children}
    </div>
  )
}

ActionChipGroup.displayName = 'ActionChipGroup'

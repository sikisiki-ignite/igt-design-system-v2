import React from 'react'
import clsx from 'clsx'
import './FilterChipGroup.css'

export type FilterChipGroupLayout = 'wrap' | 'scroll'
export type FilterChipGroupSize = 'xs' | 'sm' | 'md'

export interface FilterChipGroupProps {
  layout?: FilterChipGroupLayout
  size?: FilterChipGroupSize
  children: React.ReactNode
  className?: string
}

export function FilterChipGroup({
  layout = 'wrap',
  size = 'md',
  children,
  className,
}: FilterChipGroupProps) {
  return (
    <div
      className={clsx('igt-filter-chip-group', className)}
      data-layout={layout}
      data-size={size}
    >
      {children}
    </div>
  )
}

FilterChipGroup.displayName = 'FilterChipGroup'

import React from 'react'
import clsx from 'clsx'
import './MetaChipGroup.css'

export type MetaChipGroupLayout = 'wrap' | 'scroll'
export type MetaChipGroupSize = 'xs' | 'sm' | 'md'

export interface MetaChipGroupProps {
  layout?: MetaChipGroupLayout
  size?: MetaChipGroupSize
  children: React.ReactNode
  className?: string
}

export function MetaChipGroup({
  layout = 'wrap',
  size = 'md',
  children,
  className,
}: MetaChipGroupProps) {
  return (
    <div
      className={clsx('igt-meta-chip-group', className)}
      data-layout={layout}
      data-size={size}
    >
      {children}
    </div>
  )
}

MetaChipGroup.displayName = 'MetaChipGroup'

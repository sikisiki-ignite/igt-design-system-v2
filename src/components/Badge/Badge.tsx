import React from 'react'
import clsx from 'clsx'
import './Badge.css'

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
export type BadgeStyle = 'fill' | 'soft' | 'outline'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
  variant?: BadgeVariant
  badgeStyle?: BadgeStyle
  size?: BadgeSize
  dot?: boolean
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  badgeStyle = 'soft',
  size = 'md',
  dot = false,
  children,
  className,
}) => {
  return (
    <span
      className={clsx('igt-badge', className)}
      data-variant={variant}
      data-style={badgeStyle}
      data-size={size}
    >
      {dot && <span className="igt-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}

import React from 'react'
import clsx from 'clsx'
import './Label.css'

export type LabelSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type LabelTone = 'soft' | 'fill'
export type LabelColor = 'info' | 'success' | 'warning' | 'danger'

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: LabelSize
  tone?: LabelTone
  color?: LabelColor
  icon?: React.ReactNode
  children: React.ReactNode
}

export const Label = React.forwardRef<HTMLSpanElement, LabelProps>(
  ({ size = 'md', tone = 'soft', color = 'info', icon, children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx('igt-label', className)}
        data-size={size}
        data-tone={tone}
        data-color={color}
        {...props}
      >
        {icon && <span className="igt-label__icon">{icon}</span>}
        {children}
      </span>
    )
  }
)

Label.displayName = 'Label'

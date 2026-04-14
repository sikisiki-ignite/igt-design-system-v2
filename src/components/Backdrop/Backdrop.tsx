import React from 'react'
import clsx from 'clsx'
import './Backdrop.css'

export type BackdropTone = 'dark' | 'light'
export type BackdropStrength = 'default' | 'strong'

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: BackdropTone
  strength?: BackdropStrength
  visible?: boolean
}

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      tone = 'dark',
      strength = 'default',
      visible = true,
      className,
      ...props
    },
    ref
  ) => {
    if (!visible) return null

    return (
      <div
        ref={ref}
        className={clsx('igt-backdrop', className)}
        data-tone={tone}
        data-strength={strength}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Backdrop.displayName = 'Backdrop'

import React from 'react'
import clsx from 'clsx'
import './Divider.css'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerTone = 'neutral' | 'accent' | 'danger'
export type DividerEmphasis = 'weak' | 'default' | 'strong'
export type DividerStyle = 'solid' | 'dashed'
export type DividerInset = 'none' | 'sm' | 'md' | 'lg'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation
  tone?: DividerTone
  emphasis?: DividerEmphasis
  lineStyle?: DividerStyle
  inset?: DividerInset
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      tone = 'neutral',
      emphasis = 'default',
      lineStyle = 'solid',
      inset = 'none',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <hr
        ref={ref}
        className={clsx(
          'igt-divider',
          `igt-divider--${orientation}`,
          className
        )}
        data-tone={tone}
        data-emphasis={emphasis}
        data-style={lineStyle}
        data-inset={inset !== 'none' ? inset : undefined}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'

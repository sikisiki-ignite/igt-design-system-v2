import React from 'react'
import clsx from 'clsx'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonStyle = 'fill' | 'soft' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  buttonStyle?: ButtonStyle
  size?: ButtonSize
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      buttonStyle = 'fill',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx('igt-btn', className)}
        data-variant={variant}
        data-style={buttonStyle}
        data-size={size}
        data-loading={loading || undefined}
        data-full-width={fullWidth || undefined}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="igt-btn__spinner" aria-hidden="true" />
        )}
        {!loading && iconLeft && (
          <span className="igt-btn__icon igt-btn__icon--left">{iconLeft}</span>
        )}
        {children && <span className="igt-btn__label">{children}</span>}
        {!loading && iconRight && (
          <span className="igt-btn__icon igt-btn__icon--right">{iconRight}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

import React from 'react'
import clsx from 'clsx'
import './Button.css'

/** 피그마 Tone prop (구 variant) */
export type ButtonTone = 'primary' | 'secondary' | 'danger'
/** 피그마 Variant prop (구 buttonStyle) */
export type ButtonVariant = 'fill' | 'soft' | 'outline' | 'ghost'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 색상 의미. default: 'primary' */
  tone?: ButtonTone
  /** 스타일 변형. default: 'fill' */
  variant?: ButtonVariant
  /** 크기. default: 'md' */
  size?: ButtonSize
  /** 로딩 상태 — spinner 표시, 클릭 불가 */
  loading?: boolean
  /** 앞 아이콘 */
  leadingIcon?: React.ReactNode
  /** 뒤 아이콘 */
  trailingIcon?: React.ReactNode
  /** 아이콘만 표시 (children 없이 leadingIcon만) */
  iconOnly?: boolean
  /** 너비 100% */
  fullWidth?: boolean

  /** @deprecated buttonStyle → variant 로 변경됨 */
  buttonStyle?: ButtonVariant
  /** @deprecated variant → tone 으로 변경됨 */
  iconLeft?: React.ReactNode
  /** @deprecated iconRight → trailingIcon 으로 변경됨 */
  iconRight?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      tone = 'primary',
      variant,
      buttonStyle,
      size = 'md',
      loading = false,
      leadingIcon,
      trailingIcon,
      iconOnly = false,
      fullWidth = false,
      disabled,
      children,
      className,
      iconLeft,
      iconRight,
      ...props
    },
    ref
  ) => {
    // deprecated prop fallback
    const resolvedVariant = variant ?? buttonStyle ?? 'fill'
    const resolvedLeading = leadingIcon ?? iconLeft
    const resolvedTrailing = trailingIcon ?? iconRight

    return (
      <button
        ref={ref}
        className={clsx('igt-btn', className)}
        data-tone={tone}
        data-variant={resolvedVariant}
        data-size={size}
        data-loading={loading || undefined}
        data-icon-only={(iconOnly || (!children && !!resolvedLeading)) || undefined}
        data-full-width={fullWidth || undefined}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="igt-btn__spinner" aria-hidden="true" />
        ) : (
          <>
            {resolvedLeading && (
              <span className="igt-btn__icon igt-btn__icon--leading" aria-hidden="true">
                {resolvedLeading}
              </span>
            )}
            {children && <span className="igt-btn__label">{children}</span>}
            {resolvedTrailing && (
              <span className="igt-btn__icon igt-btn__icon--trailing" aria-hidden="true">
                {resolvedTrailing}
              </span>
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

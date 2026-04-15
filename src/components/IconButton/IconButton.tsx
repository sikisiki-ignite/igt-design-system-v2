import React from 'react'
import clsx from 'clsx'
import './IconButton.css'

export type IconButtonVariant = 'soft' | 'outline' | 'ghost'
export type IconButtonShape = 'circle' | 'rounded'
export type IconButtonEmphasis = 'default' | 'subdued'
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 스타일 변형. default: 'ghost' */
  variant?: IconButtonVariant
  /** 모양. default: 'circle' */
  shape?: IconButtonShape
  /** 강조 수준. default: 'default' */
  emphasis?: IconButtonEmphasis
  /** 크기. default: 'md' */
  size?: IconButtonSize
  /** 로딩 상태 */
  loading?: boolean
  /** 아이콘 (필수) */
  icon: React.ReactNode
  /** 스크린리더용 레이블 (필수) */
  'aria-label': string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'ghost',
      shape = 'circle',
      emphasis = 'default',
      size = 'md',
      loading = false,
      icon,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx('igt-ibtn', className)}
        data-variant={variant}
        data-shape={shape}
        data-emphasis={emphasis}
        data-size={size}
        data-loading={loading || undefined}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="igt-ibtn__spinner" aria-hidden="true" />
        ) : (
          <span className="igt-ibtn__icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

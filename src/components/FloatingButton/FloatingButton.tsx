import React from 'react'
import clsx from 'clsx'
import './FloatingButton.css'

export type FloatingButtonVariant = 'primary' | 'secondary' | 'ghost'
export type FloatingButtonShape = 'circle' | 'extended'
export type FloatingButtonSize = 'sm' | 'md' | 'lg'

export interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 색상 변형. default: 'primary' */
  variant?: FloatingButtonVariant
  /** 형태. circle=아이콘만 원형 / extended=아이콘+레이블 pill. default: 'circle' */
  shape?: FloatingButtonShape
  /** 크기. default: 'md' */
  size?: FloatingButtonSize
  /** 아이콘 (필수) */
  icon: React.ReactNode
  /** extended shape일 때 표시할 레이블 */
  label?: React.ReactNode
  /** 로딩 상태 */
  loading?: boolean
}

export const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      variant = 'primary',
      shape = 'circle',
      size = 'md',
      icon,
      label,
      loading = false,
      disabled,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx('igt-fab', className)}
        data-variant={variant}
        data-shape={shape}
        data-size={size}
        data-loading={loading || undefined}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading ? (
          <span className="igt-fab__spinner" aria-hidden="true">
            <span /><span /><span />
          </span>
        ) : (
          <>
            <span className="igt-fab__icon" aria-hidden="true">{icon}</span>
            {shape === 'extended' && label && (
              <span className="igt-fab__label">{label}</span>
            )}
          </>
        )}
      </button>
    )
  }
)

FloatingButton.displayName = 'FloatingButton'

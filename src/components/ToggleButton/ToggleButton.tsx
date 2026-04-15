import React from 'react'
import clsx from 'clsx'
import './ToggleButton.css'

export type ToggleButtonEmphasis = 'onDefault' | 'onSelect'
export type ToggleButtonSize = 'xs' | 'sm' | 'md'

export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택 상태. default: false */
  selected?: boolean
  /** 강조 방식.
   *  onDefault: 선택=primary fill, 미선택=ghost
   *  onSelect: 선택=accent soft, 미선택=neutral ghost
   * default: 'onDefault' */
  emphasis?: ToggleButtonEmphasis
  /** 크기. default: 'md' */
  size?: ToggleButtonSize
  /** 아이콘만 표시. default: false */
  iconOnly?: boolean
  /** 앞 아이콘 */
  leadingIcon?: React.ReactNode
  /** 로딩 상태 */
  loading?: boolean
  /** 선택 상태 변경 콜백 */
  onSelectedChange?: (selected: boolean) => void
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      selected = false,
      emphasis = 'onDefault',
      size = 'md',
      iconOnly = false,
      leadingIcon,
      loading = false,
      disabled,
      children,
      className,
      onClick,
      onSelectedChange,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        onSelectedChange?.(!selected)
      }
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        className={clsx('igt-toggle-btn', className)}
        data-emphasis={emphasis}
        data-size={size}
        data-selected={selected || undefined}
        data-icon-only={iconOnly || undefined}
        data-loading={loading || undefined}
        disabled={disabled || loading}
        aria-pressed={selected}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <span className="igt-toggle-btn__spinner" aria-hidden="true" />
        ) : (
          <>
            {leadingIcon && (
              <span className="igt-toggle-btn__icon" aria-hidden="true">
                {leadingIcon}
              </span>
            )}
            {!iconOnly && children && (
              <span className="igt-toggle-btn__label">{children}</span>
            )}
            {iconOnly && children}
          </>
        )}
      </button>
    )
  }
)

ToggleButton.displayName = 'ToggleButton'

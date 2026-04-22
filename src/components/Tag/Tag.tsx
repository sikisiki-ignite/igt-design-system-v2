import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Tag.css'

export type TagSize = 'sm' | 'md'
export type TagTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: TagSize
  tone?: TagTone
  /** 삭제 버튼 표시 */
  onRemove?: () => void
  /** 삭제 버튼 aria-label */
  removeLabel?: string
  /** 앞 아이콘 */
  icon?: React.ReactNode
  disabled?: boolean
  children: React.ReactNode
}

export const Tag: React.FC<TagProps> = ({
  size = 'md',
  tone = 'neutral',
  onRemove,
  removeLabel = '삭제',
  icon,
  disabled = false,
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={clsx('igt-tag', className)}
      data-size={size}
      data-tone={tone}
      data-disabled={disabled || undefined}
      {...props}
    >
      {icon && <span className="igt-tag__icon" aria-hidden="true">{icon}</span>}
      <span className="igt-tag__label">{children}</span>
      {onRemove && !disabled && (
        <button
          type="button"
          className="igt-tag__remove"
          aria-label={`${String(children)} ${removeLabel}`}
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
        >
          <Icon name="x_small" size="xs" />
        </button>
      )}
    </span>
  )
}

Tag.displayName = 'Tag'

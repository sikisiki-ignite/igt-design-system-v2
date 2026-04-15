import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './TextButton.css'

export type TextButtonVariant = 'chevron' | 'plain' | 'underline'
export type TextButtonTone = 'accent' | 'neutral' | 'neutralMuted' | 'danger'
export type TextButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 스타일 변형. default: 'plain' */
  variant?: TextButtonVariant
  /** 색상 의미. default: 'accent' */
  tone?: TextButtonTone
  /** 크기. default: 'md' */
  size?: TextButtonSize
  /** 앞 아이콘 (plain/underline variant에서 사용) */
  leadingIcon?: React.ReactNode
  /** href 제공 시 <a> 태그로 렌더링 */
  href?: string
  /** anchor target */
  target?: string
  /** anchor rel */
  rel?: string
}

export const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      variant = 'plain',
      tone = 'accent',
      size = 'md',
      leadingIcon,
      disabled,
      children,
      className,
      href,
      target,
      rel,
      onClick,
      ...props
    },
    ref
  ) => {
    const classes = clsx('igt-tbtn', className)
    const dataAttrs = {
      'data-variant': variant,
      'data-tone': tone,
      'data-size': size,
    }

    if (href && !disabled) {
      return (
        <a
          href={href}
          target={target}
          rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={classes}
          {...dataAttrs}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {leadingIcon && (
            <span className="igt-tbtn__icon igt-tbtn__icon--leading" aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <span className="igt-tbtn__label">{children}</span>
          {variant === 'chevron' && (
            <span className="igt-tbtn__icon igt-tbtn__icon--trailing" aria-hidden="true">
              <Icon name="chevron_right_small" size={size === 'xs' ? 'xs' : 'sm'} />
            </span>
          )}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        {...dataAttrs}
        {...props}
      >
        {leadingIcon && (
          <span className="igt-tbtn__icon igt-tbtn__icon--leading" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <span className="igt-tbtn__label">{children}</span>
        {variant === 'chevron' && (
          <span className="igt-tbtn__icon igt-tbtn__icon--trailing" aria-hidden="true">
            <Icon name="chevron_right_small" size={size === 'xs' ? 'xs' : 'sm'} />
          </span>
        )}
      </button>
    )
  }
)

TextButton.displayName = 'TextButton'

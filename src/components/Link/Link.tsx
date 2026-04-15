import React from 'react'
import clsx from 'clsx'
import './Link.css'

export type LinkTone = 'brand' | 'neutral'
export type LinkUnderline = 'always' | 'auto' | 'none'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 색상 의미. default: 'brand' */
  tone?: LinkTone
  /** 밑줄 표시 방식. default: 'always' */
  underline?: LinkUnderline
  /** 비활성 상태 */
  disabled?: boolean
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      tone = 'brand',
      underline = 'always',
      disabled = false,
      children,
      className,
      onClick,
      href,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={clsx('igt-link', className)}
        data-tone={tone}
        data-underline={underline}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'

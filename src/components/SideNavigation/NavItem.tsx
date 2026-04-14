import React from 'react'
import clsx from 'clsx'

export type NavItemTone = 'neutral' | 'accent'
export type NavItemDepth = 1 | 2 | 3
export type NavItemSize = 'md' | 'sm'

type NavItemBaseProps = {
  tone?: NavItemTone
  depth?: NavItemDepth
  size?: NavItemSize
  current?: boolean
  disabled?: boolean
  leadingIcon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export type NavItemProps =
  | (NavItemBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' })
  | (NavItemBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' })

export const NavItem = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, NavItemProps>(
  (
    {
      tone = 'neutral',
      depth = 1,
      size = 'md',
      current = false,
      disabled = false,
      leadingIcon,
      children,
      className,
      as: Tag = 'a',
      ...props
    },
    ref
  ) => {
    const commonProps = {
      className: clsx('igt-nav-item', className),
      'data-tone': tone,
      'data-size': size,
      'data-depth': depth,
      'data-current': current || undefined,
      'data-disabled': disabled || undefined,
      'aria-current': current ? ('page' as const) : undefined,
      'aria-disabled': disabled || undefined,
      tabIndex: disabled ? -1 : 0,
    }

    const inner = (
      <>
        {leadingIcon && (
          <span className="igt-nav-item__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <span className="igt-nav-item__label">{children}</span>
      </>
    )

    if (Tag === 'button') {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          {...commonProps}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {inner}
        </button>
      )
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...commonProps}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    )
  }
)

NavItem.displayName = 'NavItem'

import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Breadcrumb.css'

export type BreadcrumbSeparator = 'chevron' | 'slash' | 'dot'
export type BreadcrumbLeading = 'none' | 'home'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: BreadcrumbSeparator
  leading?: BreadcrumbLeading
  className?: string
  /** aria-label (접근성) */
  'aria-label'?: string
}

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
)

const SlashSeparator = () => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
    <path d="M5 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const DotSeparator = () => (
  <svg width="4" height="4" viewBox="0 0 4 4" fill="currentColor" aria-hidden="true">
    <circle cx="2" cy="2" r="2" />
  </svg>
)

function Separator({ type }: { type: BreadcrumbSeparator }) {
  if (type === 'chevron') {
    return (
      <span className="igt-breadcrumb__sep" aria-hidden="true">
        <Icon name="chevron_right" variant="outline" size="sm" />
      </span>
    )
  }
  if (type === 'slash') {
    return (
      <span className="igt-breadcrumb__sep" aria-hidden="true">
        <SlashSeparator />
      </span>
    )
  }
  return (
    <span className="igt-breadcrumb__sep igt-breadcrumb__sep--dot" aria-hidden="true">
      <DotSeparator />
    </span>
  )
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = 'chevron',
  leading = 'none',
  className,
  'aria-label': ariaLabel = '탐색경로',
}) => {
  return (
    <nav className={clsx('igt-breadcrumb', className)} aria-label={ariaLabel}>
      <ol className="igt-breadcrumb__list" data-separator={separator}>
        {leading === 'home' && (
          <li className="igt-breadcrumb__item igt-breadcrumb__item--home" aria-hidden="true">
            <span className="igt-breadcrumb__home-icon">
              <HomeIcon />
            </span>
          </li>
        )}
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={index}>
              {(index > 0 || leading === 'home') && (
                <li className="igt-breadcrumb__sep-item" aria-hidden="true">
                  <Separator type={separator} />
                </li>
              )}
              <li className="igt-breadcrumb__item">
                {isLast ? (
                  <span className="igt-breadcrumb__label igt-breadcrumb__label--current" aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="igt-breadcrumb__label igt-breadcrumb__label--link"
                    onClick={item.onClick}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className="igt-breadcrumb__label igt-breadcrumb__label--link"
                    role={item.onClick ? 'button' : undefined}
                    tabIndex={item.onClick ? 0 : undefined}
                    onClick={item.onClick}
                    onKeyDown={item.onClick ? (e) => e.key === 'Enter' && item.onClick?.(e as any) : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

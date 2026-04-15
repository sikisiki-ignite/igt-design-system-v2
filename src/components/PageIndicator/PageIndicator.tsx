import React from 'react'
import clsx from 'clsx'
import './PageIndicator.css'

export type PageIndicatorSize = 'sm' | 'md' | 'lg'
export type PageIndicatorAppearance = 'default' | 'onImage'

export interface PageIndicatorProps {
  count: number
  activeIndex: number
  size?: PageIndicatorSize
  appearance?: PageIndicatorAppearance
  className?: string
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  count,
  activeIndex,
  size = 'md',
  appearance = 'default',
  className,
}) => {
  return (
    <div
      className={clsx(
        'igt-page-indicator',
        `igt-page-indicator--${size}`,
        `igt-page-indicator--${appearance}`,
        className
      )}
      role="tablist"
      aria-label="페이지 표시"
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={clsx(
            'igt-page-indicator__dot',
            i === activeIndex && 'igt-page-indicator__dot--active'
          )}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`${i + 1} / ${count}`}
        />
      ))}
    </div>
  )
}

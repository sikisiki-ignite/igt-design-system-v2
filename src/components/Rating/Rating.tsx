import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Rating.css'

export type RatingSize = 'xs' | 'sm' | 'md'

export interface RatingProps {
  value: number
  onChange?: (value: number) => void
  count?: number
  size?: RatingSize
  readOnly?: boolean
  className?: string
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  count = 5,
  size = 'md',
  readOnly = false,
  className,
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const isInteractive = !readOnly && !!onChange
  const displayValue = hoverValue ?? value

  const iconSize = size === 'md' ? 'md' : 'sm'

  return (
    <div
      className={clsx(
        'igt-rating',
        `igt-rating--${size}`,
        isInteractive && 'igt-rating--interactive',
        className
      )}
      role={isInteractive ? 'group' : undefined}
      aria-label={isInteractive ? '별점' : `별점 ${value}/${count}`}
    >
      {Array.from({ length: count }, (_, i) => {
        const starValue = i + 1
        const isFilled = starValue <= displayValue
        return (
          <button
            key={i}
            type="button"
            className={clsx(
              'igt-rating__star',
              isFilled ? 'igt-rating__star--filled' : 'igt-rating__star--empty'
            )}
            onClick={isInteractive ? () => onChange!(starValue) : undefined}
            onMouseEnter={isInteractive ? () => setHoverValue(starValue) : undefined}
            onMouseLeave={isInteractive ? () => setHoverValue(null) : undefined}
            disabled={!isInteractive}
            aria-label={`${starValue}점`}
            aria-pressed={isFilled}
          >
            <Icon
              name="star_rounded"
              variant={isFilled ? 'solid' : 'outline'}
              size={iconSize}
            />
          </button>
        )
      })}
    </div>
  )
}

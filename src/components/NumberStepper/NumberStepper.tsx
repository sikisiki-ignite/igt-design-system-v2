import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './NumberStepper.css'

export type NumberStepperEmphasis = 'outline' | 'soft'
export type NumberStepperSize = 'sm' | 'md'

export interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  emphasis?: NumberStepperEmphasis
  size?: NumberStepperSize
  disabled?: boolean
  className?: string
}

export const NumberStepper: React.FC<NumberStepperProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  emphasis = 'outline',
  size = 'md',
  disabled = false,
  className,
}) => {
  const canDecrement = !disabled && (min === undefined || value - step >= min)
  const canIncrement = !disabled && (max === undefined || value + step <= max)

  const iconSize = size === 'sm' ? 'sm' : 'sm'

  return (
    <div
      className={clsx(
        'igt-number-stepper',
        `igt-number-stepper--${emphasis}`,
        `igt-number-stepper--${size}`,
        disabled && 'igt-number-stepper--disabled',
        className
      )}
    >
      <button
        type="button"
        className="igt-number-stepper__btn"
        onClick={() => canDecrement && onChange(value - step)}
        disabled={!canDecrement}
        aria-label="감소"
      >
        <Icon name="minus" variant="outline" size={iconSize} />
      </button>

      <span className="igt-number-stepper__divider" aria-hidden="true" />

      <button
        type="button"
        className="igt-number-stepper__btn"
        onClick={() => canIncrement && onChange(value + step)}
        disabled={!canIncrement}
        aria-label="증가"
      >
        <Icon name="plus" variant="outline" size={iconSize} />
      </button>
    </div>
  )
}

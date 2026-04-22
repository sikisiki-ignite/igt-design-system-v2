import React from 'react'
import clsx from 'clsx'
import './Slider.css'

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** 최솟값. default: 0 */
  min?: number
  /** 최댓값. default: 100 */
  max?: number
  /** 현재 값 */
  value?: number
  /** 기본값 (비제어) */
  defaultValue?: number
  /** 증가 단위. default: 1 */
  step?: number
  /** 비활성화 */
  disabled?: boolean
  /** 값 변경 콜백 */
  onChange?: (value: number) => void
  /** 트랙 앞 아이콘 (볼륨 최소 등) */
  leadingIcon?: React.ReactNode
  /** 트랙 뒤 아이콘 (볼륨 최대 등) */
  trailingIcon?: React.ReactNode
  className?: string
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      value,
      defaultValue,
      step = 1,
      disabled = false,
      onChange,
      leadingIcon,
      trailingIcon,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? value ?? min
    )

    const currentValue = value !== undefined ? value : internalValue

    const fillPercent = ((currentValue - min) / (max - min)) * 100

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value)
      if (value === undefined) setInternalValue(next)
      onChange?.(next)
    }

    return (
      <div className={clsx('igt-slider', className)} style={style}>
        {leadingIcon && (
          <span className="igt-slider__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        <div className="igt-slider__track">
          <input
            ref={ref}
            type="range"
            className="igt-slider__input"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            onChange={handleChange}
            style={{ '--slider-fill': `${fillPercent}%` } as React.CSSProperties}
            {...props}
          />
        </div>

        {trailingIcon && (
          <span className="igt-slider__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>
    )
  }
)

Slider.displayName = 'Slider'

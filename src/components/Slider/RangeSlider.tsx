import React from 'react'
import clsx from 'clsx'
import './RangeSlider.css'

export interface RangeSliderValue {
  min: number
  max: number
}

export interface RangeSliderProps {
  /** 슬라이더 최솟값. default: 0 */
  min?: number
  /** 슬라이더 최댓값. default: 100 */
  max?: number
  /** 현재 범위 (controlled) */
  value?: RangeSliderValue
  /** 기본 범위 (uncontrolled) */
  defaultValue?: RangeSliderValue
  /** 증가 단위. default: 1 */
  step?: number
  /** 비활성화 */
  disabled?: boolean
  /** 값 변경 콜백 */
  onChange?: (value: RangeSliderValue) => void
  /** 트랙 앞 아이콘 */
  leadingIcon?: React.ReactNode
  /** 트랙 뒤 아이콘 */
  trailingIcon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
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
}) => {
  const [internal, setInternal] = React.useState<RangeSliderValue>(
    defaultValue ?? { min, max }
  )
  const current = value !== undefined ? value : internal

  // min 핸들이 max를 넘지 않도록, max 핸들이 min 아래로 내려가지 않도록 클램핑
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.min(Number(e.target.value), current.max - step)
    const newVal = { min: next, max: current.max }
    if (value === undefined) setInternal(newVal)
    onChange?.(newVal)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(Number(e.target.value), current.min + step)
    const newVal = { min: current.min, max: next }
    if (value === undefined) setInternal(newVal)
    onChange?.(newVal)
  }

  const minPercent = ((current.min - min) / (max - min)) * 100
  const maxPercent = ((current.max - min) / (max - min)) * 100

  return (
    <div className={clsx('igt-range-slider', className)} style={style}>
      {leadingIcon && (
        <span className="igt-range-slider__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}

      <div
        className="igt-range-slider__track"
        style={{
          '--range-min': `${minPercent}%`,
          '--range-max': `${maxPercent}%`,
        } as React.CSSProperties}
      >
        {/* min 핸들 */}
        <input
          type="range"
          className="igt-range-slider__input igt-range-slider__input--min"
          min={min}
          max={max}
          step={step}
          value={current.min}
          disabled={disabled}
          onChange={handleMinChange}
          aria-label="최솟값"
          aria-valuenow={current.min}
          aria-valuemin={min}
          aria-valuemax={current.max}
        />
        {/* max 핸들 */}
        <input
          type="range"
          className="igt-range-slider__input igt-range-slider__input--max"
          min={min}
          max={max}
          step={step}
          value={current.max}
          disabled={disabled}
          onChange={handleMaxChange}
          aria-label="최댓값"
          aria-valuenow={current.max}
          aria-valuemin={current.min}
          aria-valuemax={max}
        />
      </div>

      {trailingIcon && (
        <span className="igt-range-slider__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </div>
  )
}

RangeSlider.displayName = 'RangeSlider'

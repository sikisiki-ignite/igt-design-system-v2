import React from 'react'
import clsx from 'clsx'
import './SegmentedControl.css'

export type SegmentedControlSize = 'sm' | 'md'
export type SegmentedControlWidth = 'equal' | 'content'

export interface SegmentItem {
  key: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps {
  items: SegmentItem[]
  size?: SegmentedControlSize
  width?: SegmentedControlWidth
  value?: string
  defaultValue?: string
  onChange?: (key: string) => void
  className?: string
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  items,
  size = 'md',
  width = 'equal',
  value,
  defaultValue,
  onChange,
  className,
}) => {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue ?? (items[0]?.key ?? '')
  )
  const activeKey = isControlled ? value : internalValue

  const handleSelect = (key: string, disabled?: boolean) => {
    if (disabled) return
    if (!isControlled) setInternalValue(key)
    onChange?.(key)
  }

  return (
    <div
      className={clsx(
        'igt-segmented',
        `igt-segmented--${size}`,
        `igt-segmented--${width}`,
        className
      )}
      role="group"
    >
      {items.map((item) => {
        const isActive = item.key === activeKey
        return (
          <button
            key={item.key}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={item.disabled}
            className={clsx(
              'igt-segmented__item',
              isActive && 'igt-segmented__item--active'
            )}
            onClick={() => handleSelect(item.key, item.disabled)}
          >
            <span className="igt-segmented__label">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

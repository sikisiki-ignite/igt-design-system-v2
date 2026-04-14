import React, { createContext, useContext, useState } from 'react'
import clsx from 'clsx'
import { ChoiceChip, ChoiceChipSize } from './ChoiceChip'
import './ChoiceChipGroup.css'

/* ============================================================
   IGT ChoiceChipGroup
   피그마: SelectionType=multiple/single, Layout=wrap/scroll (2141:23000)
   selectionType(single/multiple) × layout(wrap/scroll) × size(xs/sm/md)
   ============================================================ */

type SelectionType = 'single' | 'multiple'
type ChipLayout = 'wrap' | 'scroll'

interface ChoiceChipGroupContextValue {
  selectedValues: string[]
  selectionType: SelectionType
  size: ChoiceChipSize
  disabled: boolean
  onToggle: (value: string) => void
}

const ChoiceChipGroupContext = createContext<ChoiceChipGroupContextValue | null>(null)

/* ── ChoiceChipGroupItem ───────────────────────────────────── */
export interface ChoiceChipGroupItemProps {
  value: string
  label: string
  disabled?: boolean
  className?: string
}

export const ChoiceChipGroupItem: React.FC<ChoiceChipGroupItemProps> = ({
  value,
  label,
  disabled,
  className,
}) => {
  const ctx = useContext(ChoiceChipGroupContext)
  if (!ctx) throw new Error('ChoiceChipGroupItem must be used within ChoiceChipGroup')

  return (
    <ChoiceChip
      label={label}
      value={value}
      selected={ctx.selectedValues.includes(value)}
      disabled={disabled || ctx.disabled}
      size={ctx.size}
      onClick={ctx.onToggle}
      className={className}
    />
  )
}

ChoiceChipGroupItem.displayName = 'ChoiceChipGroupItem'

/* ── ChoiceChipGroup ───────────────────────────────────────── */
export interface ChoiceChipGroupProps {
  label?: string
  hint?: string
  error?: string
  selectionType?: SelectionType
  layout?: ChipLayout
  size?: ChoiceChipSize
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export const ChoiceChipGroup: React.FC<ChoiceChipGroupProps> = ({
  label,
  hint,
  error,
  selectionType = 'multiple',
  layout = 'wrap',
  size = 'md',
  value,
  defaultValue = [],
  onChange,
  disabled = false,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const selectedValues = value ?? internalValue

  const onToggle = (val: string) => {
    if (disabled) return
    let next: string[]
    if (selectionType === 'single') {
      next = selectedValues.includes(val) ? [] : [val]
    } else {
      next = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val]
    }
    if (value === undefined) setInternalValue(next)
    onChange?.(next)
  }

  return (
    <div className={clsx('igt-chip-group', className)}>
      {label && <span className="igt-chip-group__label">{label}</span>}
      <ChoiceChipGroupContext.Provider
        value={{ selectedValues, selectionType, size, disabled, onToggle }}
      >
        <div
          className="igt-chip-group__items"
          data-layout={layout}
          role={selectionType === 'single' ? 'radiogroup' : 'group'}
        >
          {children}
        </div>
      </ChoiceChipGroupContext.Provider>
      {error && <span className="igt-chip-group__error">{error}</span>}
      {!error && hint && <span className="igt-chip-group__hint">{hint}</span>}
    </div>
  )
}

ChoiceChipGroup.displayName = 'ChoiceChipGroup'

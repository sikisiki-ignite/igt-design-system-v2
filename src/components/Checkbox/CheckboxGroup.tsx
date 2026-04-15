import React, { useId } from 'react'
import clsx from 'clsx'
import { Checkbox } from './Checkbox'
import type { CheckboxSize } from './Checkbox'
import './CheckboxGroup.css'

export interface CheckboxGroupOption {
  value: string
  label: string
  hint?: string
  disabled?: boolean
}

export interface CheckboxGroupProps {
  /** 그룹 제목 */
  label?: string
  /** 하단 helper text */
  hint?: string
  /** 오류 메시지 */
  error?: string
  /** 옵션 목록 */
  options: CheckboxGroupOption[]
  /** controlled 선택값 */
  value?: string[]
  /** uncontrolled 기본값 */
  defaultValue?: string[]
  /** 크기 */
  size?: CheckboxSize
  /** 전체 비활성화 */
  disabled?: boolean
  /** 전체 읽기 전용 */
  readOnly?: boolean
  /** "전체 선택" 헤더 표시 */
  selectAll?: boolean
  /** 전체 선택 헤더 레이블 */
  selectAllLabel?: string
  /** 나열 방향 */
  direction?: 'vertical' | 'horizontal'
  onChange?: (value: string[]) => void
  className?: string
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      hint,
      error,
      options,
      value,
      defaultValue,
      size = 'md',
      disabled,
      readOnly,
      selectAll = false,
      selectAllLabel = '전체 선택',
      direction = 'vertical',
      onChange,
      className,
    },
    ref
  ) => {
    const groupId = useId()

    // controlled / uncontrolled
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<string[]>(
      defaultValue ?? []
    )
    const selected = isControlled ? (value ?? []) : internalValue

    const handleChange = (next: string[]) => {
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    }

    const toggleItem = (itemValue: string) => {
      const next = selected.includes(itemValue)
        ? selected.filter((v) => v !== itemValue)
        : [...selected, itemValue]
      handleChange(next)
    }

    // 전체선택 헤더 상태 계산
    const enabledOptions = options.filter((o) => !o.disabled)
    const enabledValues = enabledOptions.map((o) => o.value)
    const selectedEnabledCount = enabledValues.filter((v) => selected.includes(v)).length
    const allChecked = enabledValues.length > 0 && selectedEnabledCount === enabledValues.length
    const isIndeterminate = selectedEnabledCount > 0 && !allChecked

    const handleSelectAll = () => {
      if (allChecked) {
        // 전체 해제: enabled 항목만 해제, disabled 선택 유지
        const disabledSelected = selected.filter((v) => !enabledValues.includes(v))
        handleChange(disabledSelected)
      } else {
        // 전체 선택: 기존 + enabled 모두
        const next = Array.from(new Set([...selected, ...enabledValues]))
        handleChange(next)
      }
    }

    return (
      <div
        ref={ref}
        className={clsx('igt-checkbox-group', className)}
        data-size={size}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        data-state={error ? 'error' : undefined}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
      >
        {label && (
          <span id={`${groupId}-label`} className="igt-checkbox-group__label">
            {label}
          </span>
        )}

        {selectAll && (
          <>
            <Checkbox
              size={size}
              checked={allChecked}
              indeterminate={isIndeterminate}
              disabled={disabled || enabledOptions.length === 0}
              readOnly={readOnly}
              label={selectAllLabel}
              className="igt-checkbox-group__select-all"
              onChange={handleSelectAll}
            />
            <div className="igt-checkbox-group__divider" aria-hidden="true" />
          </>
        )}

        <div
          className={clsx(
            'igt-checkbox-group__list',
            direction === 'horizontal' && 'igt-checkbox-group__list--horizontal'
          )}
        >
          {options.map((opt) => (
            <Checkbox
              key={opt.value}
              size={size}
              checked={selected.includes(opt.value)}
              disabled={disabled || opt.disabled}
              readOnly={readOnly}
              label={opt.label}
              hint={opt.hint}
              onChange={() => toggleItem(opt.value)}
            />
          ))}
        </div>

        {error && (
          <span className="igt-checkbox-group__error">{error}</span>
        )}
        {!error && hint && (
          <span className="igt-checkbox-group__hint">{hint}</span>
        )}
      </div>
    )
  }
)

CheckboxGroup.displayName = 'CheckboxGroup'

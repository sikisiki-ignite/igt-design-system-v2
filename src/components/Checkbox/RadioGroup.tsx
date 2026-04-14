import React, { createContext, useContext, useId } from 'react'
import clsx from 'clsx'
import './RadioGroup.css'

/* ============================================================
   RadioGroup Context
   ============================================================ */
interface RadioGroupContextValue {
  name: string
  value?: string
  size: 'sm' | 'md'
  readOnly?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export const useRadioGroupContext = () => useContext(RadioGroupContext)

/* ============================================================
   RadioGroupItem
   피그마: RadioItem — Radio 컨트롤 + label + description 조합
   ============================================================ */
export interface RadioGroupItemProps {
  value: string
  label: string
  description?: string
  disabled?: boolean
  className?: string
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  value,
  label,
  description,
  disabled,
  className,
}) => {
  const ctx = useRadioGroupContext()
  const itemId = useId()

  const isDisabled = disabled || ctx?.disabled
  const isReadOnly = ctx?.readOnly
  const isChecked = ctx?.value === value
  const size = ctx?.size ?? 'md'

  const handleChange = () => {
    if (!isDisabled && !isReadOnly && ctx?.onChange) {
      ctx.onChange(value)
    }
  }

  return (
    <div
      className={clsx('igt-radio-group-item', className)}
      data-size={size}
      data-disabled={isDisabled || undefined}
      data-readonly={isReadOnly || undefined}
    >
      <span className="igt-radio-group-item__dot-wrap">
        <input
          type="radio"
          id={itemId}
          name={ctx?.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-readonly={isReadOnly}
          onChange={handleChange}
          className="igt-radio-group-item__input"
        />
        <span className="igt-radio-group-item__dot" aria-hidden="true" />
      </span>
      <div className="igt-radio-group-item__text">
        <label className="igt-radio-group-item__label" htmlFor={itemId}>
          {label}
        </label>
        {description && (
          <span className="igt-radio-group-item__description">{description}</span>
        )}
      </div>
    </div>
  )
}

RadioGroupItem.displayName = 'RadioGroupItem'

/* ============================================================
   RadioGroup
   피그마: RadioGroup — label + optionList + hint
   ============================================================ */
export interface RadioGroupProps {
  /** 그룹 제목 */
  label?: string
  /** 하단 helper text */
  hint?: string
  /** 오류 메시지 */
  error?: string
  /** 크기 — 하위 아이템에 전파 */
  size?: 'sm' | 'md'
  /** radio name attribute (접근성, 미입력 시 자동 생성) */
  name?: string
  /** controlled 선택값 */
  value?: string
  /** uncontrolled 기본값 */
  defaultValue?: string
  /** 전체 비활성화 */
  disabled?: boolean
  /** 전체 읽기 전용 */
  readOnly?: boolean
  onChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      name,
      value,
      defaultValue,
      disabled,
      readOnly,
      onChange,
      children,
      className,
    },
    ref
  ) => {
    const autoName = useId()
    const resolvedName = name ?? autoName

    // uncontrolled 지원
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = (val: string) => {
      if (!isControlled) setInternalValue(val)
      onChange?.(val)
    }

    return (
      <RadioGroupContext.Provider
        value={{
          name: resolvedName,
          value: currentValue,
          size,
          readOnly,
          disabled,
          onChange: handleChange,
        }}
      >
        <div
          ref={ref}
          className={clsx('igt-radio-group', className)}
          data-size={size}
          data-disabled={disabled || undefined}
          data-readonly={readOnly || undefined}
          data-state={error ? 'error' : undefined}
          role="radiogroup"
          aria-label={label}
        >
          {label && (
            <span className="igt-radio-group__label">{label}</span>
          )}
          <div className="igt-radio-group__list">
            {children}
          </div>
          {error && <span className="igt-radio-group__error">{error}</span>}
          {!error && hint && <span className="igt-radio-group__hint">{hint}</span>}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

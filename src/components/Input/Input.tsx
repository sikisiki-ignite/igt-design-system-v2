import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Input.css'

export type InputFieldStyle = 'outline' | 'fill'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  label?: string
  hint?: string
  error?: string
  fieldStyle?: InputFieldStyle
  size?: InputSize
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  fullWidth?: boolean
  /** 읽기 전용 — 시각적으로 비활성화처럼 보이나 클릭 불가, 값 변경 없음 */
  readOnly?: boolean
  /** 값이 있을 때 clear(×) 버튼 표시 */
  clearable?: boolean
  /** clear 버튼 클릭 시 콜백 */
  onClear?: () => void
  /** 글자 수 표시 — maxLength와 함께 사용 시 "현재/최대" 형식 */
  showCount?: boolean
}

// 피그마: clear 아이콘 sm=14px, md=16px, lg=18px → CSS로 크기 제어
// Icon 컴포넌트는 size prop 대신 data-size 활용, CSS에서 override

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      fieldStyle = 'outline',
      size = 'md',
      prefix,
      suffix,
      fullWidth = false,
      disabled,
      readOnly,
      clearable = false,
      onClear,
      showCount = false,
      className,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `igt-input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    // controlled vs uncontrolled 값 추적
    const isControlled = props.value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      String(props.defaultValue ?? '')
    )
    const currentValue = isControlled ? String(props.value ?? '') : uncontrolledValue
    const showClear =
      clearable &&
      !disabled &&
      !readOnly &&
      currentValue.length > 0

    const internalRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!isControlled) setUncontrolledValue(e.target.value)
      onChange?.(e)
    }

    function handleClear() {
      if (!isControlled) setUncontrolledValue('')
      if (inputRef.current) {
        const nativeInput = inputRef.current
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set
        nativeSetter?.call(nativeInput, '')
        nativeInput.dispatchEvent(new Event('input', { bubbles: true }))
      }
      onClear?.()
      inputRef.current?.focus()
    }

    return (
      <div
        className={clsx('igt-field', className)}
        data-style={fieldStyle}
        data-size={size}
        data-state={error ? 'error' : undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        data-full-width={fullWidth || undefined}
      >
        {label && (
          <label className="igt-field__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className="igt-field__input-wrap">
          {prefix && <span className="igt-field__prefix">{prefix}</span>}
          <input
            ref={inputRef}
            id={inputId}
            className="igt-field__input"
            disabled={disabled}
            readOnly={readOnly}
            aria-readonly={readOnly}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            onChange={handleChange}
            {...props}
          />
          {showClear && (
            <button
              type="button"
              className="igt-field__clear"
              aria-label="입력 내용 지우기"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()} // blur 방지
              onClick={handleClear}
            >
              <Icon name="x_circle" variant="solid" size="sm" />
            </button>
          )}
          {suffix && <span className="igt-field__suffix">{suffix}</span>}
        </div>
        {/* hint / error + count 행 */}
        {(error || hint || showCount) && (
          <div className="igt-field__footer">
            <span>
              {error && (
                <span id={`${inputId}-error`} className="igt-field__error">
                  {error}
                </span>
              )}
              {!error && hint && (
                <span id={`${inputId}-hint`} className="igt-field__hint">
                  {hint}
                </span>
              )}
            </span>
            {showCount && (
              <span className={clsx('igt-field__count', error && 'igt-field__count--error')}>
                {currentValue.length}
                {props.maxLength != null && `/${props.maxLength}`}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

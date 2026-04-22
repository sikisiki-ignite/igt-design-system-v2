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
  /** 텍스트 정렬 — 금액/숫자 입력 시 'right' 사용 */
  textAlign?: 'left' | 'right'
  /** 비밀번호 표시 토글 버튼 — type="password"와 함께 사용 */
  showPasswordToggle?: boolean
  /** 검색 전용 preset — 돋보기 아이콘 prefix 자동 추가, clearable 기본 활성 */
  search?: boolean
  /** 전화번호 자동 포맷 — 입력 시 010-1234-5678 형태로 변환 */
  phone?: boolean
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
      textAlign,
      showPasswordToggle = false,
      search = false,
      phone = false,
      className,
      id,
      onChange,
      type,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `igt-input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    // 비밀번호 표시 토글 상태
    const [showPassword, setShowPassword] = React.useState(false)

    // controlled vs uncontrolled 값 추적
    const isControlled = props.value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      String(props.defaultValue ?? '')
    )
    const currentValue = isControlled ? String(props.value ?? '') : uncontrolledValue

    // search preset: clearable 기본 활성
    const resolvedClearable = search ? true : clearable
    const showClear =
      resolvedClearable &&
      !disabled &&
      !readOnly &&
      currentValue.length > 0

    // search preset: 검색 아이콘 prefix 자동 추가
    const resolvedPrefix = search && !prefix
      ? <Icon name="search" size={size === 'lg' ? 'md' : 'sm'} />
      : prefix

    // search preset: placeholder 기본값
    const resolvedPlaceholder = phone && !placeholder
      ? '010-0000-0000'
      : search && !placeholder
      ? '검색'
      : placeholder

    // 비밀번호 토글: 실제 input type 결정
    const resolvedType = showPasswordToggle && type === 'password'
      ? (showPassword ? 'text' : 'password')
      : type

    const internalRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef

    // 전화번호 포맷: 숫자만 추출 후 xxx-xxxx-xxxx 패턴 적용
    function formatPhone(raw: string): string {
      const digits = raw.replace(/\D/g, '').slice(0, 11)
      if (digits.length <= 3) return digits
      if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (phone) {
        const formatted = formatPhone(e.target.value)
        if (!isControlled) setUncontrolledValue(formatted)
        // 포맷된 값으로 synthetic event 재생성
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        )?.set
        nativeSetter?.call(e.target, formatted)
        e.target.dispatchEvent(new Event('input', { bubbles: true }))
        onChange?.({ ...e, target: { ...e.target, value: formatted } } as React.ChangeEvent<HTMLInputElement>)
        return
      }
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
          {resolvedPrefix && <span className="igt-field__prefix">{resolvedPrefix}</span>}
          <input
            ref={inputRef}
            id={inputId}
            className="igt-field__input"
            type={resolvedType}
            placeholder={resolvedPlaceholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-readonly={readOnly}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            style={textAlign ? { textAlign } : undefined}
            inputMode={phone ? 'tel' : props.inputMode}
            value={phone && !isControlled ? uncontrolledValue : props.value}
            onChange={handleChange}
            {...props}
          />
          {showClear && (
            <button
              type="button"
              className="igt-field__clear"
              aria-label="입력 내용 지우기"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <Icon name="x_circle" variant="solid" size="sm" />
            </button>
          )}
          {/* 비밀번호 토글 버튼 — clear 버튼 뒤에 위치 */}
          {showPasswordToggle && type === 'password' && !disabled && !readOnly && (
            <button
              type="button"
              className="igt-field__password-toggle"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((v) => !v)}
            >
              <Icon name={showPassword ? 'eyes_off' : 'eyes_on'} size="sm" />
            </button>
          )}
          {suffix && <span className="igt-field__suffix">{suffix}</span>}
        </div>
        {/* hint / error + count 행 */}
        {(error || hint || (showCount && props.maxLength != null)) && (
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
            {showCount && props.maxLength != null && (
              <span className={clsx('igt-field__count', error && 'igt-field__count--error')}>
                {currentValue.length}/{props.maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

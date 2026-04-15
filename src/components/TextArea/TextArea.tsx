import React from 'react'
import clsx from 'clsx'
import './TextArea.css'

export type TextAreaFieldStyle = 'outline' | 'fill'
export type TextAreaSize = 'md' | 'lg'

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'prefix'> {
  label?: string
  hint?: string
  error?: string
  fieldStyle?: TextAreaFieldStyle
  size?: TextAreaSize
  fullWidth?: boolean
  readOnly?: boolean
  /** 글자 수 표시 — maxLength와 함께 사용 시 "현재/최대" 형식 */
  showCount?: boolean
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      hint,
      error,
      fieldStyle = 'outline',
      size = 'lg',
      fullWidth = false,
      disabled,
      readOnly,
      showCount = false,
      className,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || (label ? `igt-textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    const isControlled = props.value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      String(props.defaultValue ?? '')
    )
    const currentValue = isControlled ? String(props.value ?? '') : uncontrolledValue

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      if (!isControlled) setUncontrolledValue(e.target.value)
      onChange?.(e)
    }

    return (
      <div
        className={clsx('igt-textarea-field', className)}
        data-style={fieldStyle}
        data-size={size}
        data-state={error ? 'error' : undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        data-full-width={fullWidth || undefined}
      >
        {label && (
          <label className="igt-textarea-field__label" htmlFor={textareaId}>
            {label}
          </label>
        )}
        <div className="igt-textarea-field__wrap">
          <textarea
            ref={ref}
            id={textareaId}
            className="igt-textarea-field__textarea"
            disabled={disabled}
            readOnly={readOnly}
            aria-readonly={readOnly}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${textareaId}-error`
                : hint
                ? `${textareaId}-hint`
                : undefined
            }
            onChange={handleChange}
            {...props}
          />
        </div>

        {(error || hint || showCount) && (
          <div className="igt-textarea-field__footer">
            <span>
              {error && (
                <span id={`${textareaId}-error`} className="igt-textarea-field__error">
                  {error}
                </span>
              )}
              {!error && hint && (
                <span id={`${textareaId}-hint`} className="igt-textarea-field__hint">
                  {hint}
                </span>
              )}
            </span>
            {showCount && (
              <span
                className={clsx(
                  'igt-textarea-field__count',
                  error && 'igt-textarea-field__count--error'
                )}
              >
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

TextArea.displayName = 'TextArea'

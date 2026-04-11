import React from 'react'
import clsx from 'clsx'
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
}

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
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `igt-input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    return (
      <div
        className={clsx('igt-field', className)}
        data-style={fieldStyle}
        data-size={size}
        data-state={error ? 'error' : undefined}
        data-disabled={disabled || undefined}
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
            ref={ref}
            id={inputId}
            className="igt-field__input"
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />
          {suffix && <span className="igt-field__suffix">{suffix}</span>}
        </div>
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
      </div>
    )
  }
)

Input.displayName = 'Input'

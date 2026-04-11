import React from 'react'
import clsx from 'clsx'
import './Select.css'

export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectFieldStyle = 'outline' | 'fill'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  fieldStyle?: SelectFieldStyle
  size?: SelectSize
  fullWidth?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      hint,
      error,
      options,
      placeholder,
      fieldStyle = 'outline',
      size = 'md',
      fullWidth = false,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? `igt-select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    return (
      <div
        className={clsx('igt-select-field', className)}
        data-style={fieldStyle}
        data-size={size}
        data-state={error ? 'error' : undefined}
        data-disabled={disabled || undefined}
        data-full-width={fullWidth || undefined}
      >
        {label && (
          <label className="igt-select-field__label" htmlFor={selectId}>
            {label}
          </label>
        )}
        <div className="igt-select-field__wrap">
          <select
            ref={ref}
            id={selectId}
            className="igt-select-field__select"
            disabled={disabled}
            aria-invalid={!!error}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="igt-select-field__chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {error && <span className="igt-select-field__error">{error}</span>}
        {!error && hint && <span className="igt-select-field__hint">{hint}</span>}
      </div>
    )
  }
)

Select.displayName = 'Select'

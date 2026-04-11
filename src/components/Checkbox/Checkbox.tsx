import React from 'react'
import clsx from 'clsx'
import './Checkbox.css'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  hint?: string
  error?: string
  indeterminate?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hint, error, indeterminate = false, disabled, className, id, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) || inputRef

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate
      }
    }, [indeterminate, resolvedRef])

    const checkboxId = id || (label ? `igt-cb-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    return (
      <div
        className={clsx('igt-checkbox', className)}
        data-disabled={disabled || undefined}
        data-state={error ? 'error' : undefined}
      >
        <div className="igt-checkbox__control-row">
          <span className="igt-checkbox__box-wrap">
            <input
              ref={resolvedRef}
              type="checkbox"
              id={checkboxId}
              className="igt-checkbox__input"
              disabled={disabled}
              aria-invalid={!!error}
              {...props}
            />
            <span className="igt-checkbox__box" aria-hidden="true">
              {indeterminate ? (
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                  <rect x="0" y="0.5" width="10" height="1" rx="0.5" fill="currentColor" />
                </svg>
              ) : (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </span>
          {label && (
            <label className="igt-checkbox__label" htmlFor={checkboxId}>
              {label}
            </label>
          )}
        </div>
        {error && <span className="igt-checkbox__error">{error}</span>}
        {!error && hint && <span className="igt-checkbox__hint">{hint}</span>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

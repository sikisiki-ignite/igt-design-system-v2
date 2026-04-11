import React from 'react'
import clsx from 'clsx'
import './Radio.css'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  hint?: string
  error?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, hint, error, disabled, className, id, ...props }, ref) => {
    const radioId = id || (label ? `igt-radio-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    return (
      <div
        className={clsx('igt-radio', className)}
        data-disabled={disabled || undefined}
        data-state={error ? 'error' : undefined}
      >
        <div className="igt-radio__control-row">
          <span className="igt-radio__dot-wrap">
            <input
              ref={ref}
              type="radio"
              id={radioId}
              className="igt-radio__input"
              disabled={disabled}
              aria-invalid={!!error}
              {...props}
            />
            <span className="igt-radio__dot" aria-hidden="true" />
          </span>
          {label && (
            <label className="igt-radio__label" htmlFor={radioId}>
              {label}
            </label>
          )}
        </div>
        {error && <span className="igt-radio__error">{error}</span>}
        {!error && hint && <span className="igt-radio__hint">{hint}</span>}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

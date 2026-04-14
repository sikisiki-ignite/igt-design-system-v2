import React from 'react'
import clsx from 'clsx'
import './Radio.css'

export type RadioSize = 'sm' | 'md'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  /** label 아래 보조 설명 (피그마 description) */
  description?: string
  hint?: string
  error?: string
  size?: RadioSize
  /** 읽기 전용 — 시각적으로 비활성화처럼 보이나 클릭 불가, 값 변경 없음 */
  readOnly?: boolean
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, hint, error, size = 'md', disabled, readOnly, className, id, ...props }, ref) => {
    const radioId = id || (label ? `igt-radio-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    return (
      <div
        className={clsx('igt-radio', className)}
        data-size={size}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
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
              readOnly={readOnly}
              aria-readonly={readOnly}
              aria-invalid={!!error}
              {...props}
            />
            <span className="igt-radio__dot" aria-hidden="true" />
          </span>
          {label && (
            <div className="igt-radio__text">
              <label className="igt-radio__label" htmlFor={radioId}>
                {label}
              </label>
              {description && (
                <span className="igt-radio__description">{description}</span>
              )}
            </div>
          )}
        </div>
        {error && <span className="igt-radio__error">{error}</span>}
        {!error && hint && <span className="igt-radio__hint">{hint}</span>}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

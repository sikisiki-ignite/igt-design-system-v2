import React from 'react'
import clsx from 'clsx'
import './Switch.css'

export type SwitchSize = 'sm' | 'md'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: SwitchSize
  label?: string
  description?: string
}

/** Standalone switch control (no label) */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ size = 'md', disabled, className, id, ...props }, ref) => {
    return (
      <div
        className={clsx('igt-switch', className)}
        data-size={size}
        data-disabled={disabled || undefined}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className="igt-switch__input"
          disabled={disabled}
          {...props}
        />
        <span className="igt-switch__track" />
        <span className="igt-switch__thumb" />
      </div>
    )
  }
)

Switch.displayName = 'Switch'

/** Switch with label and optional description */
export interface SwitchFieldProps extends SwitchProps {
  label: string
  description?: string
}

export const SwitchField = React.forwardRef<HTMLInputElement, SwitchFieldProps>(
  ({ size = 'md', label, description, disabled, className, id, ...props }, ref) => {
    const switchId = id || `igt-switch-${label.replace(/\s+/g, '-').toLowerCase()}`

    return (
      <label
        className={clsx('igt-switch-field', className)}
        htmlFor={switchId}
        data-size={size}
        data-disabled={disabled || undefined}
      >
        <div className="igt-switch-field__text">
          <span className="igt-switch-field__label">{label}</span>
          {description && (
            <span className="igt-switch-field__description">{description}</span>
          )}
        </div>
        <Switch ref={ref} id={switchId} size={size} disabled={disabled} {...props} />
      </label>
    )
  }
)

SwitchField.displayName = 'SwitchField'

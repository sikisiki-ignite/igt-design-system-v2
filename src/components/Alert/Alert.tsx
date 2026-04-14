import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Alert.css'

export type AlertType = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType
  title: string
  description?: string
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

/* 피그마 아이콘명 기준:
 *   neutral  → igt_core_icon_blank_outline_2dp  (단순 원 outline 유지)
 *   info     → igt_core_icon_information_solid
 *   success  → igt_core_icon_check_circle       (solid)
 *   warning  → igt_core_icon_warning            (solid)
 *   danger   → igt_core_icon_failure_solid      (시각 = ×, x_circle solid)
 */
const defaultIcons: Record<AlertType, React.ReactNode> = {
  neutral: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  info:    <Icon name="information" variant="solid" size="md" />,
  success: <Icon name="check_circle" variant="solid" size="md" />,
  warning: <Icon name="warning" variant="solid" size="md" />,
  danger:  <Icon name="x_circle" variant="solid" size="md" />,
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type = 'neutral',
      title,
      description,
      icon,
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx('igt-alert', className)}
        data-type={type}
        role="alert"
        {...props}
      >
        <div className="igt-alert__content">
          <span className="igt-alert__icon">{icon ?? defaultIcons[type]}</span>
          <div className="igt-alert__text">
            <span className="igt-alert__title">{title}</span>
            {description && (
              <span className="igt-alert__description">{description}</span>
            )}
          </div>
        </div>
        {dismissible && (
          <button
            type="button"
            className="igt-alert__dismiss"
            onClick={onDismiss}
            aria-label="닫기"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M15 5 5 15M5 5l10 10" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

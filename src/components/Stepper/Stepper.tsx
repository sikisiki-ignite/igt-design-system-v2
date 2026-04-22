import React from 'react'
import clsx from 'clsx'
import './Stepper.css'

/* ============================================================
   IGT Stepper Component
   다단계 폼 진행 표시 (Wizard)
   ============================================================ */

export type StepStatus = 'completed' | 'current' | 'upcoming' | 'error'
export type StepperOrientation = 'horizontal' | 'vertical'
export type StepperSize = 'sm' | 'md'

export interface StepItem {
  key: string
  label: string
  description?: string
  status?: StepStatus
}

export interface StepperProps {
  steps: StepItem[]
  /** 현재 활성 step key (controlled) */
  activeKey?: string
  /** 초기 step key (uncontrolled) */
  defaultActiveKey?: string
  onChange?: (key: string) => void
  orientation?: StepperOrientation
  size?: StepperSize
  /** 완료 단계 클릭 허용 */
  clickable?: boolean
  className?: string
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 3v4M6 9h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeKey: activeKeyProp,
  defaultActiveKey,
  onChange,
  orientation = 'horizontal',
  size = 'md',
  clickable = false,
  className,
}) => {
  const [internalKey, setInternalKey] = React.useState(
    defaultActiveKey ?? steps[0]?.key ?? ''
  )
  const isControlled = activeKeyProp !== undefined
  const activeKey = isControlled ? activeKeyProp : internalKey

  const activeIndex = steps.findIndex((s) => s.key === activeKey)

  const getStatus = (step: StepItem, index: number): StepStatus => {
    if (step.status) return step.status
    if (index < activeIndex) return 'completed'
    if (index === activeIndex) return 'current'
    return 'upcoming'
  }

  const handleClick = (step: StepItem, index: number) => {
    const status = getStatus(step, index)
    if (!clickable && status !== 'completed') return
    if (!isControlled) setInternalKey(step.key)
    onChange?.(step.key)
  }

  return (
    <ol
      className={clsx('igt-stepper', className)}
      data-orientation={orientation}
      data-size={size}
      aria-label="진행 단계"
    >
      {steps.map((step, index) => {
        const status = getStatus(step, index)
        const isLast = index === steps.length - 1
        const isClickable = clickable || status === 'completed'

        return (
          <li
            key={step.key}
            className="igt-stepper__step"
            data-status={status}
          >
            {/* Connector: step(li) 기준 absolute */}
            {!isLast && <div className="igt-stepper__connector" />}

            <div
              className={clsx('igt-stepper__item', isClickable && 'igt-stepper__item--clickable')}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={() => handleClick(step, index)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(step, index)}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              {/* Step indicator — circle만 */}
              <div className="igt-stepper__indicator">
                <div className="igt-stepper__circle">
                  {status === 'completed' && <CheckIcon />}
                  {status === 'error' && <ErrorIcon />}
                  {(status === 'current' || status === 'upcoming') && (
                    <span className="igt-stepper__number">{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Step content */}
              <div className="igt-stepper__content">
                <div className="igt-stepper__label-row">
                  <span className="igt-stepper__label">{step.label}</span>
                </div>
                {step.description && (
                  <span className="igt-stepper__description">{step.description}</span>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

Stepper.displayName = 'Stepper'

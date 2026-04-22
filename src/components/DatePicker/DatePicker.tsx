import React, { useRef, useEffect } from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import { DateCalendar } from './DateCalendar'
import './DatePicker.css'

/* ============================================================
   IGT DatePicker — 단일 날짜 선택
   피그마: DateField (2084:30005)
   ============================================================ */

const SEP_STYLE: React.CSSProperties = { color: 'var(--sys-content-neutral-subtle, rgba(3,24,50,0.46))' }
const PH_STYLE: React.CSSProperties = { color: 'var(--field-text-placeholder, rgba(0,25,54,0.31))' }

/** 값이 있을 때: 2025 . 01 . 06 */
function DateText({ date }: { date: Date }) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return (
    <>
      <span>{y}</span>
      <span style={SEP_STYLE}>.</span>
      <span>{m}</span>
      <span style={SEP_STYLE}>.</span>
      <span>{d}</span>
    </>
  )
}

/** 값이 없을 때: YYYY . MM . DD */
function DatePlaceholder() {
  return (
    <>
      <span style={PH_STYLE}>YYYY</span>
      <span style={SEP_STYLE}>.</span>
      <span style={PH_STYLE}>MM</span>
      <span style={SEP_STYLE}>.</span>
      <span style={PH_STYLE}>DD</span>
    </>
  )
}

export interface DatePickerProps {
  label?: string
  value?: Date
  defaultValue?: Date
  /** md(기본): 36px / lg: 40px */
  size?: 'md' | 'lg'
  hint?: string
  error?: string
  disabled?: boolean
  /** Input trigger width 100% */
  fullWidth?: boolean
  onChange?: (date: Date) => void
  className?: string
  style?: React.CSSProperties
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  defaultValue,
  size = 'md',
  hint,
  error,
  disabled,
  fullWidth,
  onChange,
  className,
  style,
}) => {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleSelect = (date: Date) => {
    if (!isControlled) setInternal(date)
    onChange?.(date)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  return (
    <div
      className={clsx('igt-date-picker', className)}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-disabled={disabled || undefined}
      style={style}
    >
      {label && <span className="igt-date-picker__label">{label}</span>}
      <div className="igt-date-picker__wrapper" ref={wrapperRef}>
        <button
          type="button"
          className={clsx(
            'igt-date-picker__trigger',
            open && 'igt-date-picker__trigger--open'
          )}
          onClick={() => !disabled && setOpen(v => !v)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          {/* 텍스트 (leading) */}
          <span className="igt-date-picker__trigger-text">
            {current ? <DateText date={current} /> : <DatePlaceholder />}
          </span>
          {/* 캘린더 아이콘 (trailing, 28×28 컨테이너) */}
          <span className="igt-date-picker__trigger-icon">
            <Icon name="calendar" variant="solid" size={size === 'lg' ? 'sm' : 'sm'} />
          </span>
        </button>
        {open && (
          <div className="igt-date-picker__popover" role="dialog" aria-modal="false">
            <DateCalendar
              value={current}
              onDateClick={handleSelect}
            />
          </div>
        )}
      </div>
      {error && <span className="igt-date-picker__error">{error}</span>}
      {!error && hint && <span className="igt-date-picker__hint">{hint}</span>}
    </div>
  )
}

DatePicker.displayName = 'DatePicker'

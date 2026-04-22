import React, { useRef, useEffect } from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import { DateCalendar } from './DateCalendar'

/* ============================================================
   IGT DateRangePicker — 기간(시작~종료) 선택
   피그마: DateField range (2084:30005)
   ============================================================ */

const SEP_STYLE: React.CSSProperties = { color: 'var(--sys-content-neutral-subtle, rgba(3,24,50,0.46))' }
const PH_STYLE: React.CSSProperties = { color: 'var(--field-text-placeholder, rgba(0,25,54,0.31))' }

function DateText({ date }: { date: Date }) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      <span>{y}</span><span style={SEP_STYLE}>.</span>
      <span>{m}</span><span style={SEP_STYLE}>.</span>
      <span>{d}</span>
    </span>
  )
}

function DatePlaceholder() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      <span style={PH_STYLE}>YYYY</span><span style={SEP_STYLE}>.</span>
      <span style={PH_STYLE}>MM</span><span style={SEP_STYLE}>.</span>
      <span style={PH_STYLE}>DD</span>
    </span>
  )
}

export interface DateRange {
  start?: Date
  end?: Date
}

export interface DateRangePickerProps {
  label?: string
  value?: DateRange
  defaultValue?: DateRange
  hint?: string
  error?: string
  disabled?: boolean
  fullWidth?: boolean
  onChange?: (range: DateRange) => void
  className?: string
  style?: React.CSSProperties
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  value,
  defaultValue,
  hint,
  error,
  disabled,
  fullWidth,
  onChange,
  className,
  style,
}) => {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<DateRange>(defaultValue ?? {})
  const [hoverDate, setHoverDate] = React.useState<Date | undefined>()

  const isControlled = value !== undefined
  const current = isControlled ? value : internal
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [viewYear, setViewYear] = React.useState(new Date().getFullYear())
  const [viewMonth, setViewMonth] = React.useState(new Date().getMonth())
  const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear
  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1

  const handleDateClick = (date: Date) => {
    const { start, end } = current
    let newRange: DateRange

    if (!start || (start && end)) {
      newRange = { start: date, end: undefined }
    } else {
      if (date < start) {
        newRange = { start: date, end: start }
      } else {
        newRange = { start, end: date }
      }
      setOpen(false)
    }

    if (!isControlled) setInternal(newRange)
    onChange?.(newRange)
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

  const hasValue = !!(current.start || current.end)

  return (
    <div
      className={clsx('igt-date-range-picker', className)}
      data-full-width={fullWidth || undefined}
      data-disabled={disabled || undefined}
      style={style}
    >
      {label && <span className="igt-date-range-picker__label">{label}</span>}
      <div className="igt-date-range-picker__wrapper" ref={wrapperRef}>
        <button
          type="button"
          className={clsx(
            'igt-date-range-picker__trigger',
            open && 'igt-date-range-picker__trigger--open'
          )}
          onClick={() => !disabled && setOpen(v => !v)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          {/* 텍스트 (leading) */}
          <span className={clsx('igt-date-range-picker__text', !hasValue && 'igt-date-range-picker__text--placeholder')}>
            {current.start ? <DateText date={current.start} /> : <DatePlaceholder />}
            <span className="igt-date-range-picker__separator">~</span>
            {current.end ? <DateText date={current.end} /> : <DatePlaceholder />}
          </span>
          {/* 캘린더 아이콘 (trailing) */}
          <span className="igt-date-range-picker__trigger-icon">
            <Icon name="calendar" variant="solid" size="sm" />
          </span>
        </button>
        {open && (
          <div className="igt-date-range-picker__popover" role="dialog">
            <DateCalendar
              viewYear={viewYear}
              viewMonth={viewMonth}
              rangeStart={current.start}
              rangeEnd={current.end}
              hoverDate={hoverDate}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
              onNavChange={(y, m) => { setViewYear(y); setViewMonth(m) }}
              hideNavNext
            />
            <DateCalendar
              viewYear={nextYear}
              viewMonth={nextMonth}
              rangeStart={current.start}
              rangeEnd={current.end}
              hoverDate={hoverDate}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
              onNavChange={(y, m) => {
                // 두 번째 캘린더 기준 month로부터 첫 번째 캘린더(month-1) 계산
                const prevM = m === 0 ? 11 : m - 1
                const prevY = m === 0 ? y - 1 : y
                setViewYear(prevY)
                setViewMonth(prevM)
              }}
              hideNavPrev
            />
          </div>
        )}
      </div>
      {error && <span className="igt-date-picker__error">{error}</span>}
      {!error && hint && <span className="igt-date-picker__hint">{hint}</span>}
    </div>
  )
}

DateRangePicker.displayName = 'DateRangePicker'

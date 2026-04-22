import React from 'react'
import clsx from 'clsx'

/* Figma: icon_calendar_chevron_left/right — filled path, viewBox 기준 원본 크기 */
const CalendarChevronLeft = () => (
  <svg width="7.1" height="12.18" viewBox="0 0 7.10224 12.1824" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 6.09006C0 5.83131 0.097875 5.57256 0.295875 5.37456L5.35838 0.312057C5.61263 0.0476815 5.9895 -0.0603187 6.345 0.0330563C6.7005 0.125306 6.97725 0.402056 7.0695 0.757556C7.16175 1.11193 7.056 1.48993 6.7905 1.74418L2.4435 6.09118L6.7905 10.4382C7.05487 10.6924 7.16175 11.0704 7.0695 11.4248C6.97725 11.7803 6.7005 12.0571 6.345 12.1493C5.9895 12.2427 5.61263 12.1347 5.35838 11.8703L0.295875 6.80781C0.106875 6.61768 0 6.36006 0 6.09231" fill="currentColor" />
  </svg>
)

const CalendarChevronRight = () => (
  <svg width="7.08" height="12.14" viewBox="0 0 7.08122 12.1412" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.01499 12.1412C0.756237 12.1412 0.497487 12.04 0.294987 11.8487C0.106066 11.659 0 11.4021 0 11.1344C0 10.8666 0.106066 10.6097 0.294987 10.42L4.64874 6.06624L0.294987 1.72374C0.106066 1.53399 0 1.27713 0 1.00936C0 0.7416 0.106066 0.484739 0.294987 0.294987C0.484739 0.106066 0.741599 0 1.00936 0C1.27712 0 1.53399 0.106066 1.72374 0.294987L6.78624 5.35749C6.97516 5.54724 7.08122 5.8041 7.08122 6.07186C7.08122 6.33963 6.97516 6.59649 6.78624 6.78624L1.72374 11.8487C1.53249 12.04 1.27374 12.1412 1.01499 12.1412Z" fill="currentColor" />
  </svg>
)

/* ============================================================
   IGT DateCalendar
   피그마: DatePickerPanel (15133:96408)
   독립적으로 사용 가능한 캘린더 패널
   ============================================================ */

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay() // 0=일
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function isInRange(date: Date, start?: Date, end?: Date) {
  if (!start || !end) return false
  const d = date.getTime()
  const s = start.getTime()
  const e = end.getTime()
  return d > Math.min(s, e) && d < Math.max(s, e)
}

export interface DateCalendarProps {
  /** 표시할 연/월 (제어 시 사용) */
  viewYear?: number
  viewMonth?: number
  /** 단일 선택값 */
  value?: Date
  /** 범위 선택: 시작일 */
  rangeStart?: Date
  /** 범위 선택: 종료일 */
  rangeEnd?: Date
  /** hover 중인 날짜 (범위 프리뷰용) */
  hoverDate?: Date
  /** 날짜 클릭 */
  onDateClick?: (date: Date) => void
  /** 날짜 hover */
  onDateHover?: (date: Date | undefined) => void
  /** 월 이동 시 콜백 (범위피커에서 두 캘린더 동기화용) */
  onNavChange?: (year: number, month: number) => void
  /** 이전 달 버튼 숨김 (범위피커 두 번째 캘린더용) */
  hideNavPrev?: boolean
  /** 다음 달 버튼 숨김 (범위피커 첫 번째 캘린더용) */
  hideNavNext?: boolean
  className?: string
}

export const DateCalendar: React.FC<DateCalendarProps> = ({
  viewYear: propYear,
  viewMonth: propMonth,
  value,
  rangeStart,
  rangeEnd,
  hoverDate,
  onDateClick,
  onDateHover,
  onNavChange,
  hideNavPrev,
  hideNavNext,
  className,
}) => {
  const today = new Date()
  const [internalYear, setInternalYear] = React.useState(
    propYear ?? today.getFullYear()
  )
  const [internalMonth, setInternalMonth] = React.useState(
    propMonth ?? today.getMonth()
  )

  const year = propYear ?? internalYear
  const month = propMonth ?? internalMonth

  const setYear = propYear !== undefined ? () => {} : setInternalYear
  const setMonth = propMonth !== undefined ? () => {} : setInternalMonth

  const handlePrevMonth = () => {
    const newYear = month === 0 ? year - 1 : year
    const newMonth = month === 0 ? 11 : month - 1
    setYear(newYear); setMonth(newMonth)
    onNavChange?.(newYear, newMonth)
  }
  const handleNextMonth = () => {
    const newYear = month === 11 ? year + 1 : year
    const newMonth = month === 11 ? 0 : month + 1
    setYear(newYear); setMonth(newMonth)
    onNavChange?.(newYear, newMonth)
  }

  // 캘린더 셀 계산
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1)

  // 6주 × 7일 = 42칸
  const cells: { date: Date; isOtherMonth: boolean }[] = []
  for (let i = 0; i < firstDay; i++) {
    const d = prevMonthDays - firstDay + 1 + i
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    cells.push({ date: new Date(prevYear, prevMonth, d), isOtherMonth: true })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), isOtherMonth: false })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    cells.push({ date: new Date(nextYear, nextMonth, d), isOtherMonth: true })
  }

  const weeks: typeof cells[] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  // 범위 프리뷰 계산
  const effectiveEnd = rangeStart && !rangeEnd ? hoverDate : rangeEnd

  return (
    <div className={clsx('igt-date-calendar', className)}>
      {/* Header */}
      <div className="igt-date-calendar__header">
        {hideNavPrev
          ? <span className="igt-date-calendar__nav-placeholder" />
          : (
            <button
              type="button"
              className="igt-date-calendar__nav-btn"
              onClick={handlePrevMonth}
              aria-label="이전 달"
            >
              <CalendarChevronLeft />
            </button>
          )
        }
        <span className="igt-date-calendar__title">
          {year}년 {month + 1}월
        </span>
        {hideNavNext
          ? <span className="igt-date-calendar__nav-placeholder" />
          : (
            <button
              type="button"
              className="igt-date-calendar__nav-btn"
              onClick={handleNextMonth}
              aria-label="다음 달"
            >
              <CalendarChevronRight />
            </button>
          )
        }
      </div>

      {/* Grid */}
      <div className="igt-date-calendar__grid">
        {/* Day labels */}
        <div className="igt-date-calendar__day-row">
          {DAY_LABELS.map((d, i) => (
            <div
              key={d}
              className={clsx(
                'igt-date-calendar__day-cell',
                i === 0 && 'igt-date-calendar__day-cell--sunday'
              )}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Week rows */}
        {weeks.map((week, wi) => (
          <div key={wi} className="igt-date-calendar__week-row">
            {week.map(({ date, isOtherMonth }, di) => {
              const isToday = isSameDay(date, today)
              const isSelected = value ? isSameDay(date, value) :
                (rangeStart && isSameDay(date, rangeStart)) ||
                (rangeEnd && isSameDay(date, rangeEnd))
              const inRange = isInRange(date, rangeStart, effectiveEnd)
              const isRangeStart = rangeStart && isSameDay(date, rangeStart)
              const isRangeEnd = (rangeEnd && isSameDay(date, rangeEnd)) ||
                (!rangeEnd && hoverDate && isSameDay(date, hoverDate))

              return (
                <div
                  key={di}
                  className={clsx(
                    'igt-date-calendar__date-cell',
                    inRange && 'igt-date-calendar__date-cell--in-range',
                    isRangeStart && !isOtherMonth && 'igt-date-calendar__date-cell--range-start',
                    isRangeEnd && !isOtherMonth && 'igt-date-calendar__date-cell--range-end',
                  )}
                >
                  <button
                    type="button"
                    className={clsx(
                      'igt-date-calendar__date-btn',
                      isOtherMonth && 'igt-date-calendar__date-btn--other-month',
                      isToday && !isSelected && 'igt-date-calendar__date-btn--today',
                      isSelected && 'igt-date-calendar__date-btn--selected',
                    )}
                    onClick={() => !isOtherMonth && onDateClick?.(date)}
                    onMouseEnter={() => onDateHover?.(date)}
                    onMouseLeave={() => onDateHover?.(undefined)}
                    tabIndex={isOtherMonth ? -1 : 0}
                    aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
                    aria-pressed={isSelected}
                  >
                    {date.getDate()}
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

DateCalendar.displayName = 'DateCalendar'

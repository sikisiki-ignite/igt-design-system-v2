import React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Autocomplete.css'

export interface AutocompleteOption {
  value: string
  label: string
  disabled?: boolean
}

export type AutocompleteSize = 'sm' | 'md' | 'lg'
export type AutocompleteFieldStyle = 'outline' | 'fill'

export interface AutocompleteProps {
  /** 제안 옵션 목록 */
  options: AutocompleteOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** 옵션 선택 시 콜백 (value, label) */
  onSelect?: (value: string, label: string) => void
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  size?: AutocompleteSize
  fieldStyle?: AutocompleteFieldStyle
  fullWidth?: boolean
  disabled?: boolean
  /** 일치 항목 없을 때 "직접 입력" 허용 여부 (기본 true) */
  freeText?: boolean
  /** 제안 없을 때 표시 문구 */
  noOptionsText?: string
  clearable?: boolean
  className?: string
  id?: string
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue = '',
      onChange,
      onSelect,
      label,
      placeholder,
      hint,
      error,
      size = 'md',
      fieldStyle = 'outline',
      fullWidth = false,
      disabled = false,
      freeText = true,
      noOptionsText = '일치하는 항목이 없습니다.',
      clearable = false,
      className,
      id: idProp,
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const inputValue = isControlled ? valueProp : internalValue

    const [open, setOpen] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(-1)
    const [dropdownStyle, setDropdownStyle] = React.useState<React.CSSProperties>({})

    const wrapperRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const id = idProp ?? React.useId()

    // 필터링
    const filtered = React.useMemo(() => {
      const q = inputValue.trim().toLowerCase()
      if (!q) return options
      return options.filter((o) => o.label.toLowerCase().includes(q))
    }, [options, inputValue])

    const updatePosition = React.useCallback(() => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const maxH = 280
      const spaceBelow = window.innerHeight - rect.bottom
      const openUpward = spaceBelow < maxH && rect.top > spaceBelow
      setDropdownStyle({
        position: 'fixed',
        left: rect.left,
        width: rect.width,
        zIndex: 200,
        ...(openUpward
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
      })
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      if (!isControlled) setInternalValue(v)
      onChange?.(v)
      setOpen(true)
      setActiveIndex(-1)
    }

    const handleSelect = (opt: AutocompleteOption) => {
      if (!isControlled) setInternalValue(opt.label)
      onChange?.(opt.label)
      onSelect?.(opt.value, opt.label)
      setOpen(false)
      setActiveIndex(-1)
    }

    const handleClear = () => {
      if (!isControlled) setInternalValue('')
      onChange?.('')
      setOpen(false)
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          setOpen(true)
          updatePosition()
          return
        }
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, -1))
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && filtered[activeIndex] && !filtered[activeIndex].disabled) {
          e.preventDefault()
          handleSelect(filtered[activeIndex])
        } else if (freeText) {
          setOpen(false)
        }
      } else if (e.key === 'Escape') {
        setOpen(false)
        setActiveIndex(-1)
      }
    }

    // click outside
    React.useEffect(() => {
      if (!open) return
      const handler = (e: MouseEvent) => {
        if (
          !wrapperRef.current?.contains(e.target as Node) &&
          !dropdownRef.current?.contains(e.target as Node)
        ) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }, [open])

    React.useEffect(() => {
      if (open) updatePosition()
    }, [open, updatePosition])

    const hasValue = inputValue.length > 0
    const showClear = clearable && hasValue && !disabled

    const dropdown =
      open && !disabled
        ? createPortal(
            <div
              ref={dropdownRef}
              className="igt-autocomplete__dropdown"
              style={dropdownStyle}
              role="listbox"
              id={`${id}-listbox`}
            >
              {filtered.length === 0 ? (
                <div className="igt-autocomplete__no-options">{noOptionsText}</div>
              ) : (
                <ul className="igt-autocomplete__list">
                  {filtered.map((opt, idx) => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={idx === activeIndex}
                      aria-disabled={opt.disabled}
                      className={clsx(
                        'igt-autocomplete__option',
                        idx === activeIndex && 'igt-autocomplete__option--active',
                        opt.disabled && 'igt-autocomplete__option--disabled',
                      )}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        if (!opt.disabled) handleSelect(opt)
                      }}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>,
            document.body,
          )
        : null

    return (
      <div
        className={clsx(
          'igt-autocomplete',
          fullWidth && 'igt-autocomplete--full-width',
          className,
        )}
      >
        {label && (
          <label className="igt-autocomplete__label" htmlFor={id}>
            {label}
          </label>
        )}
        <div
          ref={wrapperRef}
          className={clsx(
            'igt-autocomplete__field',
            `igt-autocomplete__field--${fieldStyle}`,
            `igt-autocomplete__field--${size}`,
            error && 'igt-autocomplete__field--error',
            disabled && 'igt-autocomplete__field--disabled',
            open && 'igt-autocomplete__field--open',
          )}
        >
          <input
            ref={(node) => {
              ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
              if (typeof ref === 'function') ref(node)
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
            }}
            id={id}
            type="text"
            className="igt-autocomplete__input"
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls={`${id}-listbox`}
            aria-activedescendant={activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
            onChange={handleInputChange}
            onFocus={() => {
              updatePosition()
              setOpen(true)
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="igt-autocomplete__trailing">
            {showClear && (
              <button
                type="button"
                className="igt-autocomplete__clear"
                tabIndex={-1}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleClear()
                }}
                aria-label="지우기"
              >
                <Icon name="x_circle" size="sm" />
              </button>
            )}
            <Icon name="chevron_down" size="sm" className={clsx('igt-autocomplete__chevron', open && 'igt-autocomplete__chevron--open')} />
          </div>
        </div>
        {(error || hint) && (
          <p className={clsx('igt-autocomplete__message', error && 'igt-autocomplete__message--error')}>
            {error ?? hint}
          </p>
        )}
        {dropdown}
      </div>
    )
  },
)

Autocomplete.displayName = 'Autocomplete'

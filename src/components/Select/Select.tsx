import React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Select.css'

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg'
export type SelectFieldStyle = 'outline' | 'fill' | 'plain'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectOptionGroup {
  /** 그룹 헤더 레이블 */
  group: string
  options: SelectOption[]
}

export type SelectOptionOrGroup = SelectOption | SelectOptionGroup

function isGroup(item: SelectOptionOrGroup): item is SelectOptionGroup {
  return 'group' in item
}

/** options 배열에서 모든 SelectOption을 flat하게 추출 */
function flattenOptions(items: SelectOptionOrGroup[]): SelectOption[] {
  return items.flatMap((item) => (isGroup(item) ? item.options : [item]))
}

interface SelectBaseProps {
  label?: string
  hint?: string
  error?: string
  /** SelectOption 배열 또는 SelectOptionGroup 배열(그룹 헤더 포함) 혼합 가능 */
  options: SelectOptionOrGroup[]
  placeholder?: string
  fieldStyle?: SelectFieldStyle
  size?: SelectSize
  fullWidth?: boolean
  disabled?: boolean
  /** 드롭다운 내 검색 입력 활성화 */
  searchable?: boolean
  /** 옵션 로딩 중 상태 — 드롭다운에 spinner 표시 */
  loading?: boolean
  /** 로딩 중 표시 텍스트 */
  loadingText?: string
  /** 검색어가 기존 옵션에 없을 때 "직접 입력" 옵션 추가 */
  creatable?: boolean
  /** creatable 옵션 생성 시 콜백 */
  onCreateOption?: (value: string) => void
  className?: string
  id?: string
}

interface SelectSingleProps extends SelectBaseProps {
  multiple?: false
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

interface SelectMultipleProps extends SelectBaseProps {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
}

export type SelectProps = SelectSingleProps | SelectMultipleProps

function isMultiple(props: SelectProps): props is SelectMultipleProps {
  return props.multiple === true
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (props, ref) => {
    const {
      label,
      hint,
      error,
      options,
      placeholder = '선택하세요',
      fieldStyle = 'outline',
      size = 'md',
      fullWidth = false,
      disabled = false,
      searchable = false,
      loading = false,
      loadingText = '불러오는 중...',
      creatable = false,
      onCreateOption,
      className,
      id,
    } = props

    const selectId = id || (label ? `igt-select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    // ── value state ──────────────────────────────────────────
    const isControlled = props.value !== undefined
    const getInitial = (): string[] => {
      if (isMultiple(props)) {
        return (isControlled ? props.value : props.defaultValue) ?? []
      }
      const v = isControlled ? props.value : (props as SelectSingleProps).defaultValue
      return v ? [v] : []
    }
    const [internalSelected, setInternalSelected] = React.useState<string[]>(getInitial)
    const selected: string[] = isControlled
      ? (isMultiple(props) ? (props.value ?? []) : props.value ? [props.value] : [])
      : internalSelected

    // ── open / search state ──────────────────────────────────
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')

    // ── refs & positioning ───────────────────────────────────
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const searchRef = React.useRef<HTMLInputElement>(null)
    const [dropdownStyle, setDropdownStyle] = React.useState<React.CSSProperties>({})

    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current) return
      const rect = triggerRef.current.getBoundingClientRect()
      const maxH = size === 'sm' ? 280 : 320
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
    }, [size])

    React.useEffect(() => {
      if (open) {
        updatePosition()
        if (searchable) setTimeout(() => searchRef.current?.focus(), 0)
      } else {
        setSearch('')
      }
    }, [open, updatePosition, searchable])

    // ── click outside ────────────────────────────────────────
    React.useEffect(() => {
      if (!open) return
      const handler = (e: MouseEvent) => {
        if (
          !triggerRef.current?.contains(e.target as Node) &&
          !dropdownRef.current?.contains(e.target as Node)
        ) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }, [open])

    // ── keyboard ─────────────────────────────────────────────
    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }

    // ── selection ────────────────────────────────────────────
    const toggleOption = (value: string) => {
      if (isMultiple(props)) {
        const next = selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value]
        if (!isControlled) setInternalSelected(next)
        props.onChange?.(next)
      } else {
        if (!isControlled) setInternalSelected([value])
        ;(props as SelectSingleProps).onChange?.(value)
        setOpen(false)
      }
    }

    const removeChip = (value: string, e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isMultiple(props)) return
      const next = selected.filter((v) => v !== value)
      if (!isControlled) setInternalSelected(next)
      props.onChange?.(next)
    }

    // ── flat 옵션 (value 조회·선택에 사용) ──────────────────────
    const allOptions = flattenOptions(options)

    // ── filtered options (그룹 구조 유지, 검색 시 매칭 옵션만) ──
    const filtered: SelectOptionOrGroup[] = searchable && search
      ? options.reduce<SelectOptionOrGroup[]>((acc, item) => {
          if (isGroup(item)) {
            const matched = item.options.filter((o) =>
              o.label.toLowerCase().includes(search.toLowerCase())
            )
            if (matched.length > 0) acc.push({ group: item.group, options: matched })
          } else if (item.label.toLowerCase().includes(search.toLowerCase())) {
            acc.push(item)
          }
          return acc
        }, [])
      : options

    // ── creatable: 검색어가 기존 옵션에 없을 때 생성 옵션 표시 ──
    const showCreateOption = creatable && searchable && search.trim() !== '' &&
      !allOptions.some((o) => o.label.toLowerCase() === search.trim().toLowerCase())

    const handleCreateOption = () => {
      const newValue = search.trim()
      onCreateOption?.(newValue)
      if (!isMultiple(props)) {
        if (!isControlled) setInternalSelected([newValue])
        ;(props as SelectSingleProps).onChange?.(newValue)
        setOpen(false)
      } else {
        const next = [...selected, newValue]
        if (!isControlled) setInternalSelected(next)
        props.onChange?.(next)
      }
      setSearch('')
    }

    // ── display value ────────────────────────────────────────
    const selectedOptions = allOptions.filter((o) => selected.includes(o.value))
    const hasValue = selected.length > 0

    // 피그마 SelectItem size: md=36px, sm=32px
    // trigger size와 popover item size 매핑
    const itemSize: 'md' | 'sm' = size === 'lg' || size === 'md' ? 'md' : 'sm'

    // ── trigger content ──────────────────────────────────────
    const triggerContent = isMultiple(props) && hasValue ? (
      <div className="igt-select__chips">
        {selectedOptions.map((opt) => (
          <span key={opt.value} className="igt-select__chip">
            <span className="igt-select__chip-label">{opt.label}</span>
            <button
              type="button"
              className="igt-select__chip-remove"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => removeChip(opt.value, e)}
              aria-label={`${opt.label} 제거`}
              tabIndex={-1}
            >
              <Icon name="x_small" size="xs" />
            </button>
          </span>
        ))}
      </div>
    ) : (
      <span className={clsx('igt-select__value', !hasValue && 'igt-select__value--placeholder')}>
        {hasValue ? selectedOptions[0]?.label : placeholder}
      </span>
    )

    // ── option 단일 아이템 렌더러 ────────────────────────────────
    const renderOption = (opt: SelectOption) => {
      const isSelected = selected.includes(opt.value)
      return (
        <li
          key={opt.value}
          role="option"
          aria-selected={isSelected}
          aria-disabled={opt.disabled}
          className={clsx(
            'igt-select__item',
            `igt-select__item--${itemSize}`,
            isSelected && 'igt-select__item--selected',
            opt.disabled && 'igt-select__item--disabled',
          )}
          onClick={() => !opt.disabled && toggleOption(opt.value)}
          onKeyDown={(e) => e.key === 'Enter' && !opt.disabled && toggleOption(opt.value)}
          tabIndex={opt.disabled ? -1 : 0}
        >
          {isMultiple(props) && (
            <span
              className={clsx('igt-select__item-checkbox', isSelected && 'igt-select__item-checkbox--checked')}
              aria-hidden="true"
            >
              {isSelected && <Icon name="check" size="xs" />}
            </span>
          )}
          <span className="igt-select__item-label">{opt.label}</span>
          {!isMultiple(props) && (
            <Icon
              name="check"
              size={itemSize === 'md' ? 'sm' : 'xs'}
              className={clsx('igt-select__item-check', isSelected && 'igt-select__item-check--visible')}
            />
          )}
        </li>
      )
    }

    // ── dropdown portal ──────────────────────────────────────
    const dropdown = open ? createPortal(
      <div
        ref={dropdownRef}
        className={clsx('igt-select__popover', `igt-select__popover--${itemSize}`)}
        style={dropdownStyle}
        role="listbox"
        aria-multiselectable={isMultiple(props)}
      >
        {searchable && (
          <div className="igt-select__search-wrap">
            <Icon name="search" size="sm" className="igt-select__search-icon" />
            <input
              ref={searchRef}
              className="igt-select__search"
              type="text"
              placeholder="검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
            />
          </div>
        )}
        <ul className="igt-select__list">
          {loading ? (
            <li className="igt-select__loading">
              <span className="igt-select__spinner" />
              {loadingText}
            </li>
          ) : filtered.length === 0 ? (
            <li className="igt-select__empty">검색 결과가 없습니다</li>
          ) : (
            <>
            {showCreateOption && (
              <li
                className={clsx('igt-select__item', `igt-select__item--${itemSize}`, 'igt-select__item--create')}
                onClick={handleCreateOption}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateOption()}
                tabIndex={0}
                role="option"
                aria-selected={false}
              >
                <span className="igt-select__item-create-label">"{search.trim()}" 추가</span>
              </li>
            )}
            {filtered.map((item, idx) => {
            if (isGroup(item)) {
              return (
                <React.Fragment key={`group-${idx}`}>
                  <li className="igt-select__group-label" role="presentation">
                    {item.group}
                  </li>
                  {item.options.map((opt) => renderOption(opt))}
                </React.Fragment>
              )
            }
            return renderOption(item)
          })}
            </>
          )}
        </ul>
      </div>,
      document.body
    ) : null

    return (
      <div
        ref={ref}
        className={clsx('igt-select-field', className)}
        data-style={fieldStyle}
        data-size={size}
        data-state={error ? 'error' : undefined}
        data-disabled={disabled || undefined}
        data-full-width={fullWidth || undefined}
      >
        {label && (
          <label className="igt-select-field__label" htmlFor={selectId}>
            {label}
          </label>
        )}
        <div
          ref={triggerRef}
          id={selectId}
          className={clsx('igt-select__trigger', open && 'igt-select__trigger--open')}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          aria-invalid={!!error}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={handleTriggerKeyDown}
        >
          {triggerContent}
          <span
            className={clsx('igt-select__chevron', open && 'igt-select__chevron--open')}
            aria-hidden="true"
          >
            <Icon name="chevron_down" size={size === 'xs' ? 'xs' : 'sm'} />
          </span>
        </div>
        {error && <span className="igt-select-field__error">{error}</span>}
        {!error && hint && <span className="igt-select-field__hint">{hint}</span>}
        {dropdown}
      </div>
    )
  }
)

Select.displayName = 'Select'

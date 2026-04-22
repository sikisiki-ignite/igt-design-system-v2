import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './TagInput.css'

export type TagInputSize = 'sm' | 'md' | 'lg'
export type TagInputFieldStyle = 'outline' | 'fill'

export interface TagInputProps {
  /** 현재 태그 목록 */
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  size?: TagInputSize
  fieldStyle?: TagInputFieldStyle
  fullWidth?: boolean
  disabled?: boolean
  /** 최대 태그 수 */
  maxTags?: number
  /** 중복 태그 허용 여부 (기본 false) */
  allowDuplicate?: boolean
  /** 태그 생성 트리거 키 (기본: Enter, Comma) */
  separators?: string[]
  className?: string
  id?: string
}

export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value: valueProp,
      defaultValue = [],
      onChange,
      label,
      placeholder,
      hint,
      error,
      size = 'md',
      fieldStyle = 'outline',
      fullWidth = false,
      disabled = false,
      maxTags,
      allowDuplicate = false,
      separators = ['Enter', ','],
      className,
      id: idProp,
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internalTags, setInternalTags] = React.useState<string[]>(defaultValue)
    const tags = isControlled ? valueProp : internalTags

    const [inputValue, setInputValue] = React.useState('')
    const inputValueRef = React.useRef('')
    const [focused, setFocused] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const id = idProp ?? React.useId()

    const setTags = (next: string[]) => {
      if (!isControlled) setInternalTags(next)
      onChange?.(next)
    }

    const addTag = (raw: string) => {
      const tag = raw.trim()
      if (!tag) return
      if (maxTags !== undefined && tags.length >= maxTags) return
      if (!allowDuplicate && tags.includes(tag)) {
        setInputValue('')
        inputValueRef.current = ''
        return
      }
      setTags([...tags, tag])
      setInputValue('')
      inputValueRef.current = ''
    }

    const removeTag = (index: number) => {
      setTags(tags.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (separators.includes(e.key)) {
        if (e.nativeEvent.isComposing) return
        e.preventDefault()
        addTag(inputValue)
        return
      }
      if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
        removeTag(tags.length - 1)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      // 콤마 포함 시 즉시 분리
      if (separators.includes(',') && v.includes(',')) {
        const parts = v.split(',')
        parts.slice(0, -1).forEach((p) => addTag(p))
        const remaining = parts[parts.length - 1]
        setInputValue(remaining)
        inputValueRef.current = remaining
        return
      }
      setInputValue(v)
      inputValueRef.current = v
    }

    const handleBlur = () => {
      setFocused(false)
      if (inputValueRef.current.trim()) addTag(inputValueRef.current)
    }

    const isAtMax = maxTags !== undefined && tags.length >= maxTags

    return (
      <div
        className={clsx(
          'igt-tag-input',
          fullWidth && 'igt-tag-input--full-width',
          className,
        )}
      >
        {label && (
          <label className="igt-tag-input__label" htmlFor={id}>
            {label}
          </label>
        )}
        <div
          className={clsx(
            'igt-tag-input__field',
            `igt-tag-input__field--${fieldStyle}`,
            `igt-tag-input__field--${size}`,
            focused && 'igt-tag-input__field--focused',
            error && 'igt-tag-input__field--error',
            disabled && 'igt-tag-input__field--disabled',
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {tags.map((tag, idx) => (
            <span key={idx} className="igt-tag-input__tag">
              <span className="igt-tag-input__tag-label">{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  className="igt-tag-input__tag-remove"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    removeTag(idx)
                  }}
                  aria-label={`${tag} 제거`}
                >
                  <Icon name="x_small" size="xs" />
                </button>
              )}
            </span>
          ))}
          {!isAtMax && (
            <input
              ref={(node) => {
                ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
              }}
              id={id}
              type="text"
              className="igt-tag-input__input"
              value={inputValue}
              placeholder={tags.length === 0 ? placeholder : undefined}
              disabled={disabled}
              autoComplete="off"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={handleBlur}
            />
          )}
        </div>
        {(error || hint) && (
          <p className={clsx('igt-tag-input__message', error && 'igt-tag-input__message--error')}>
            {error ?? hint}
          </p>
        )}
      </div>
    )
  },
)

TagInput.displayName = 'TagInput'

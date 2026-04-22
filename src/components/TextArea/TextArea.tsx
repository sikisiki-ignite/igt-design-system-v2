import React from 'react'
import clsx from 'clsx'
import './TextArea.css'

export type TextAreaFieldStyle = 'outline' | 'fill'
export type TextAreaSize = 'md' | 'lg'

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'prefix'> {
  label?: string
  hint?: string
  error?: string
  fieldStyle?: TextAreaFieldStyle
  size?: TextAreaSize
  fullWidth?: boolean
  readOnly?: boolean
  /** 글자 수 표시 — maxLength와 함께 사용 시 "현재/최대" 형식 */
  showCount?: boolean
  /** 리사이즈 방향 제어. 기본: 'vertical' */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  /** 입력 내용에 따라 높이 자동 조정. 활성화 시 resize는 무시됨 */
  autoResize?: boolean
  /** autoResize 사용 시 최소 높이 (px). 기본: textarea의 초기 높이 */
  minHeight?: number
  /** autoResize 사용 시 최대 높이 (px). 초과 시 스크롤 */
  maxHeight?: number
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      hint,
      error,
      fieldStyle = 'outline',
      size = 'lg',
      fullWidth = false,
      disabled,
      readOnly,
      showCount = false,
      resize = 'vertical',
      autoResize = false,
      minHeight,
      maxHeight,
      className,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || (label ? `igt-textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

    const isControlled = props.value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      String(props.defaultValue ?? '')
    )
    const currentValue = isControlled ? String(props.value ?? '') : uncontrolledValue

    // auto-resize: 내부 ref로 DOM에 직접 접근
    const innerRef = React.useRef<HTMLTextAreaElement>(null)
    const combinedRef = (node: HTMLTextAreaElement | null) => {
      (innerRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
    }

    const adjustHeight = React.useCallback(() => {
      const el = innerRef.current
      if (!el || !autoResize) return
      el.style.height = 'auto'
      const next = el.scrollHeight
      const min = minHeight ?? 0
      const clamped = maxHeight ? Math.min(next, maxHeight) : next
      el.style.height = `${Math.max(clamped, min)}px`
      el.style.overflowY = maxHeight && next > maxHeight ? 'auto' : 'hidden'
    }, [autoResize, minHeight, maxHeight])

    // 초기값 및 value 변경 시 높이 조정
    React.useLayoutEffect(() => {
      adjustHeight()
    }, [currentValue, adjustHeight])

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      if (!isControlled) setUncontrolledValue(e.target.value)
      onChange?.(e)
    }

    return (
      <div
        className={clsx('igt-textarea-field', className)}
        data-style={fieldStyle}
        data-size={size}
        data-state={error ? 'error' : undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        data-full-width={fullWidth || undefined}
      >
        {label && (
          <label className="igt-textarea-field__label" htmlFor={textareaId}>
            {label}
          </label>
        )}
        <div className="igt-textarea-field__wrap">
          <textarea
            ref={combinedRef}
            id={textareaId}
            className="igt-textarea-field__textarea"
            style={{ resize: autoResize ? 'none' : resize }}
            disabled={disabled}
            readOnly={readOnly}
            aria-readonly={readOnly}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${textareaId}-error`
                : hint
                ? `${textareaId}-hint`
                : undefined
            }
            onChange={handleChange}
            {...props}
          />
        </div>

        {(error || hint || showCount) && (
          <div className="igt-textarea-field__footer">
            <span>
              {error && (
                <span id={`${textareaId}-error`} className="igt-textarea-field__error">
                  {error}
                </span>
              )}
              {!error && hint && (
                <span id={`${textareaId}-hint`} className="igt-textarea-field__hint">
                  {hint}
                </span>
              )}
            </span>
            {showCount && (
              <span
                className={clsx(
                  'igt-textarea-field__count',
                  error && 'igt-textarea-field__count--error'
                )}
              >
                {currentValue.length}
                {props.maxLength != null && `/${props.maxLength}`}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

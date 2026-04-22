import React from 'react'
import clsx from 'clsx'
import './FormLayout.css'

/* ── FormItem ─────────────────────────────────────────────── */
export interface FormItemProps {
  /** 레이블 텍스트 */
  label?: string
  /** 필수 여부 표시 (*) */
  required?: boolean
  /** 힌트 텍스트 */
  hint?: string
  /** 에러 메시지 */
  error?: string
  /** 레이블 너비 (수평 layout 시 적용) */
  labelWidth?: string | number
  children: React.ReactNode
  className?: string
}

export function FormItem({
  label,
  required,
  hint,
  error,
  labelWidth,
  children,
  className,
}: FormItemProps) {
  return (
    <div className={clsx('igt-form-item', error && 'igt-form-item--error', className)}>
      {label && (
        <label
          className="igt-form-item__label"
          style={labelWidth ? { width: labelWidth, flexShrink: 0 } : undefined}
        >
          {label}
          {required && <span className="igt-form-item__required" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="igt-form-item__control">
        {children}
        {error && <p className="igt-form-item__error">{error}</p>}
        {!error && hint && <p className="igt-form-item__hint">{hint}</p>}
      </div>
    </div>
  )
}

/* ── FormSection ──────────────────────────────────────────── */
export interface FormSectionProps {
  /** 섹션 제목 */
  title?: string
  /** 섹션 설명 */
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={clsx('igt-form-section', className)}>
      {(title || description) && (
        <div className="igt-form-section__header">
          {title && <h3 className="igt-form-section__title">{title}</h3>}
          {description && <p className="igt-form-section__description">{description}</p>}
        </div>
      )}
      <div className="igt-form-section__body">{children}</div>
    </div>
  )
}

/* ── FormLayout ───────────────────────────────────────────── */
export interface FormLayoutProps {
  /** 폼 전체 레이아웃 방향 */
  layout?: 'vertical' | 'horizontal'
  /** FormItem 간 세로 간격 */
  gap?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export function FormLayout({ layout = 'vertical', gap = 'md', children, className }: FormLayoutProps) {
  return (
    <div
      className={clsx('igt-form-layout', className)}
      data-layout={layout}
      data-gap={gap}
    >
      {children}
    </div>
  )
}

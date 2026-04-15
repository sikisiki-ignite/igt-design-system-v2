import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import './Modal.css'

export type ModalSize = 'sm' | 'md' | 'lg'
export type ModalFooterVariation = 'primary' | 'neutral' | 'danger'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
  /** footer variation으로 표준 버튼 구성을 사용할 때 */
  footerVariation?: ModalFooterVariation
  primaryLabel?: string
  secondaryLabel?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  showSecondaryAction?: boolean
  /** 커스텀 footer가 필요할 때 직접 주입 (footerVariation 무시됨) */
  footer?: React.ReactNode
  size?: ModalSize
  closeOnOverlayClick?: boolean
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footerVariation,
  primaryLabel = '확인',
  secondaryLabel = '취소',
  onPrimaryAction,
  onSecondaryAction,
  showSecondaryAction = true,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const resolvedFooter = footer ?? (footerVariation ? (
    <div className="igt-modal__footer-inner">
      {footerVariation === 'danger' ? (
        <>
          <button
            type="button"
            className="igt-modal__footer-btn igt-modal__footer-btn--secondary"
            onClick={onSecondaryAction ?? onClose}
          >
            {secondaryLabel}
          </button>
          <button
            type="button"
            className="igt-modal__footer-btn igt-modal__footer-btn--danger"
            onClick={onPrimaryAction}
          >
            {primaryLabel}
          </button>
        </>
      ) : (
        <>
          {showSecondaryAction && (
            <button
              type="button"
              className="igt-modal__footer-btn igt-modal__footer-btn--secondary"
              onClick={onSecondaryAction ?? onClose}
            >
              {secondaryLabel}
            </button>
          )}
          <button
            type="button"
            className={clsx(
              'igt-modal__footer-btn',
              footerVariation === 'neutral'
                ? 'igt-modal__footer-btn--secondary'
                : 'igt-modal__footer-btn--primary'
            )}
            onClick={onPrimaryAction}
          >
            {primaryLabel}
          </button>
        </>
      )}
    </div>
  ) : null)

  return (
    <div
      className="igt-modal-overlay"
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={clsx('igt-modal', className)}
        data-size={size}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'igt-modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {(title !== undefined || subtitle !== undefined) && (
          <div className="igt-modal__header">
            <div className="igt-modal__header-text">
              {title && (
                <h2 id="igt-modal-title" className="igt-modal__title">{title}</h2>
              )}
              {subtitle && (
                <p className="igt-modal__subtitle">{subtitle}</p>
              )}
            </div>
            <div className="igt-modal__header-right">
              <button
                className="igt-modal__close"
                onClick={onClose}
                aria-label="닫기"
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
        {children && (
          <div className="igt-modal__body">{children}</div>
        )}
        {resolvedFooter && (
          <div className="igt-modal__footer">{resolvedFooter}</div>
        )}
      </div>
    </div>
  )
}

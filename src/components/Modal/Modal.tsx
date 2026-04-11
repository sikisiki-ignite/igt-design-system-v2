import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import './Modal.css'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  size?: ModalSize
  closeOnOverlayClick?: boolean
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Trap focus & close on Escape
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

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
        {title !== undefined && (
          <div className="igt-modal__header">
            <h2 id="igt-modal-title" className="igt-modal__title">{title}</h2>
            <button
              className="igt-modal__close"
              onClick={onClose}
              aria-label="닫기"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div className="igt-modal__body">{children}</div>
        {footer && <div className="igt-modal__footer">{footer}</div>}
      </div>
    </div>
  )
}

import React, { useEffect, useCallback } from 'react'
import clsx from 'clsx'
import './Toast.css'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface ToastProps {
  id?: string
  type?: ToastType
  title?: string
  message: React.ReactNode
  duration?: number
  onClose?: () => void
  /** 액션 버튼 레이블 */
  actionLabel?: string
  /** 액션 버튼 클릭 콜백 */
  onAction?: () => void
  className?: string
}

const ICONS: Record<ToastType, React.ReactNode> = {
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5M10 7v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3L17.66 16H2.34L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v4M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  duration = 4000,
  onClose,
  actionLabel,
  onAction,
  className,
}) => {
  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(handleClose, duration)
    return () => clearTimeout(timer)
  }, [duration, handleClose])

  return (
    <div
      className={clsx('igt-toast', className)}
      data-type={type}
      role="alert"
      aria-live="polite"
    >
      <span className="igt-toast__icon">{ICONS[type]}</span>
      <div className="igt-toast__content">
        {title && <p className="igt-toast__title">{title}</p>}
        <p className="igt-toast__message">{message}</p>
      </div>
      {actionLabel && (
        <button
          type="button"
          className="igt-toast__action"
          onClick={() => { onAction?.(); handleClose() }}
        >
          {actionLabel}
        </button>
      )}
      {onClose && (
        <button className="igt-toast__close" onClick={handleClose} aria-label="닫기" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

/* ---- Toast Container ---- */
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

export interface ToastContainerProps {
  position?: ToastPosition
  children: React.ReactNode
  className?: string
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  children,
  className,
}) => {
  return (
    <div
      className={clsx('igt-toast-container', className)}
      data-position={position}
      aria-live="polite"
      aria-atomic="false"
    >
      {children}
    </div>
  )
}

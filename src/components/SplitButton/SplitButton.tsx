import React, { useRef, useState, useEffect } from 'react'
import clsx from 'clsx'
import { Button, ButtonTone, ButtonVariant, ButtonSize } from '../Button/Button'
import './SplitButton.css'

/* ============================================================
   IGT SplitButton Component
   기본 액션(Button) + 드롭다운 트리거(커스텀) 조합
   ============================================================ */

export interface SplitButtonMenuItem {
  key: string
  label: React.ReactNode
  disabled?: boolean
  danger?: boolean
}

export interface SplitButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  menuItems: SplitButtonMenuItem[]
  onMenuSelect?: (key: string) => void
  tone?: ButtonTone
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  className?: string
}

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const SplitButton: React.FC<SplitButtonProps> = ({
  children,
  onClick,
  menuItems,
  onMenuSelect,
  tone = 'primary',
  variant = 'fill',
  size = 'md',
  disabled = false,
  loading = false,
  className,
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleMenuSelect = (key: string) => {
    setOpen(false)
    onMenuSelect?.(key)
  }

  return (
    <div ref={containerRef} className={clsx('igt-split-btn', className)}>
      {/* 기본 액션 — Button 컴포넌트 그대로, 우측 radius만 제거 */}
      <Button
        tone={tone}
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        className="igt-split-btn__main"
      >
        {children}
      </Button>


      {/* 드롭다운 트리거 — Button과 동일한 data 속성 사용, 좌측 radius만 제거 */}
      <button
        type="button"
        className="igt-btn igt-split-btn__trigger"
        data-tone={tone}
        data-variant={variant}
        data-size={size}
        disabled={disabled || loading}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="더 많은 옵션"
      >
        <ChevronDown />
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <ul className="igt-split-btn__menu" role="menu">
          {menuItems.map((item) => (
            <li key={item.key} role="none">
              <button
                type="button"
                className="igt-split-btn__menu-item"
                data-danger={item.danger || undefined}
                disabled={item.disabled}
                role="menuitem"
                onClick={() => handleMenuSelect(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

SplitButton.displayName = 'SplitButton'

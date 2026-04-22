import React, { useRef, useState, useEffect } from 'react'
import clsx from 'clsx'
import { Button, ButtonTone, ButtonVariant, ButtonSize } from '../Button/Button'
import './DropdownButton.css'

/* ============================================================
   IGT DropdownButton Component
   Button(trailingIcon) + 드롭다운 메뉴
   ============================================================ */

export interface DropdownButtonMenuItem {
  key: string
  label: React.ReactNode
  leadingIcon?: React.ReactNode
  disabled?: boolean
  danger?: boolean
  divider?: boolean
}

export interface DropdownButtonProps {
  children: React.ReactNode
  menuItems: DropdownButtonMenuItem[]
  onMenuSelect?: (key: string) => void
  tone?: ButtonTone
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  leadingIcon?: React.ReactNode
  menuAlign?: 'left' | 'right'
  className?: string
}

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  menuItems,
  onMenuSelect,
  tone = 'secondary',
  variant = 'fill',
  size = 'md',
  disabled = false,
  loading = false,
  leadingIcon,
  menuAlign = 'left',
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

  return (
    <div ref={containerRef} className={clsx('igt-dropdown-btn', className)}>
      <Button
        tone={tone}
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        leadingIcon={leadingIcon}
        trailingIcon={<ChevronDown />}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {children}
      </Button>

      {open && (
        <ul className="igt-dropdown-btn__menu" data-align={menuAlign} role="menu">
          {menuItems.map((item) => {
            if (item.divider) {
              return <li key={item.key} className="igt-dropdown-btn__divider" role="separator" />
            }
            return (
              <li key={item.key} role="none">
                <button
                  type="button"
                  className="igt-dropdown-btn__menu-item"
                  data-danger={item.danger || undefined}
                  disabled={item.disabled}
                  role="menuitem"
                  onClick={() => { setOpen(false); onMenuSelect?.(item.key) }}
                >
                  {item.leadingIcon && (
                    <span className="igt-dropdown-btn__menu-icon">{item.leadingIcon}</span>
                  )}
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

DropdownButton.displayName = 'DropdownButton'

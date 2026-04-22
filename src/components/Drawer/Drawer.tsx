import React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { Icon } from '../Icon'
import { Button } from '../Button'
import './Drawer.css'

export type DrawerSize = 'sm' | 'md' | 'lg'
export type DrawerPlacement = 'left' | 'right'
export type DrawerFooterLayout = 'inlineEnd' | 'stack' | 'between'
export type DrawerFooterVariation = 'primary' | 'neutral' | 'danger'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  /** 제목 */
  title: React.ReactNode
  /** 부제목/설명 */
  description?: React.ReactNode
  /** 패널 너비. 기본: 'sm' (360px) */
  size?: DrawerSize
  /** 슬라이드 방향. 기본: 'right' */
  placement?: DrawerPlacement
  /** 본문 영역 슬롯 */
  children?: React.ReactNode
  /** footer 버튼 레이아웃 */
  footerLayout?: DrawerFooterLayout
  /** footer 버튼 색상 */
  footerVariation?: DrawerFooterVariation
  /** 주요 액션 레이블 */
  primaryLabel?: string
  /** 보조 액션 레이블 */
  secondaryLabel?: string
  /** 주요 액션 콜백 */
  onPrimaryAction?: () => void
  /** 보조 액션 콜백 */
  onSecondaryAction?: () => void
  /** between 레이아웃의 좌측 위험 액션 레이블 */
  dangerLabel?: string
  /** between 레이아웃의 좌측 위험 액션 콜백 */
  onDangerAction?: () => void
  /** 커스텀 footer */
  footer?: React.ReactNode
  /** backdrop 클릭 시 닫기. 기본: true */
  closeOnBackdropClick?: boolean
  className?: string
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  description,
  size = 'sm',
  placement = 'right',
  children,
  footerLayout = 'inlineEnd',
  footerVariation = 'primary',
  primaryLabel = '확인',
  secondaryLabel = '취소',
  onPrimaryAction,
  onSecondaryAction,
  dangerLabel = '삭제',
  onDangerAction,
  footer,
  closeOnBackdropClick = true,
  className,
}) => {
  // ESC 키로 닫기
  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // body 스크롤 잠금
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  /**
   * 푸터 버튼 tone/variant 매핑 (Figma 스펙 기준)
   *
   * inlineEnd / between 우측:
   *   primary  → secondary(soft) + primary(fill)
   *   neutral  → secondary(soft) + secondary(soft)
   *   danger   → secondary(soft) + danger(fill)
   *
   * stack:
   *   primary  → primary(fill, full) + secondary(soft, full)
   *   neutral  → secondary(soft, full) × 2
   *   danger   → danger(fill, full) + secondary(soft, full)
   *
   * between 좌측: 항상 danger(ghost)
   */
  const primaryBtnTone = footerVariation === 'danger' ? 'danger'
    : footerVariation === 'neutral' ? 'secondary'
    : 'primary'
  const primaryBtnVariant = footerVariation === 'neutral' ? 'soft' : 'fill'

  const resolvedFooter = footer ?? (
    <div className={clsx('igt-drawer__footer-inner', `igt-drawer__footer-inner--${footerLayout}`)}>

      {/* ── inlineEnd: [취소(soft)] [주액션(fill)] — 동일 너비 분할 ── */}
      {footerLayout === 'inlineEnd' && (
        <div className="igt-drawer__footer-actions">
          <Button tone="secondary" variant="soft" size="md" onClick={onSecondaryAction ?? onClose}>
            {secondaryLabel}
          </Button>
          <Button tone={primaryBtnTone} variant={primaryBtnVariant} size="md" onClick={onPrimaryAction}>
            {primaryLabel}
          </Button>
        </div>
      )}

      {/* ── stack: [주액션(fill, full)] [취소(soft, full)] — 세로 쌓기 ── */}
      {footerLayout === 'stack' && (
        <div className="igt-drawer__footer-actions">
          <Button tone={primaryBtnTone} variant={primaryBtnVariant} size="md" onClick={onPrimaryAction} fullWidth>
            {primaryLabel}
          </Button>
          <Button tone="secondary" variant="soft" size="md" onClick={onSecondaryAction ?? onClose} fullWidth>
            {secondaryLabel}
          </Button>
        </div>
      )}

      {/* ── between: [삭제(danger ghost)] — [취소(soft)] [주액션(fill)] ── */}
      {footerLayout === 'between' && (
        <>
          <Button tone="danger" variant="ghost" size="md" onClick={onDangerAction}>
            {dangerLabel}
          </Button>
          <div className="igt-drawer__footer-actions">
            <Button tone="secondary" variant="soft" size="md" onClick={onSecondaryAction ?? onClose}>
              {secondaryLabel}
            </Button>
            <Button tone={primaryBtnTone} variant={primaryBtnVariant} size="md" onClick={onPrimaryAction}>
              {primaryLabel}
            </Button>
          </div>
        </>
      )}

    </div>
  )

  return createPortal(
    <div
      className={clsx('igt-drawer-overlay', `igt-drawer-overlay--${placement}`)}
      role="presentation"
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        className={clsx('igt-drawer', className)}
        data-size={size}
        data-placement={placement}
        role="dialog"
        aria-modal="true"
        aria-labelledby="igt-drawer-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="igt-drawer__header">
          <div className="igt-drawer__header-content">
            <p id="igt-drawer-title" className="igt-drawer__title">{title}</p>
            {description && (
              <p className="igt-drawer__description">{description}</p>
            )}
          </div>
          <button
            type="button"
            className="igt-drawer__close"
            aria-label="닫기"
            onClick={onClose}
          >
            <Icon name="x_small" size="md" />
          </button>
        </div>

        {/* Body */}
        <div className="igt-drawer__body">
          {children}
        </div>

        {/* Footer */}
        <div className="igt-drawer__footer">
          {resolvedFooter}
        </div>
      </div>
    </div>,
    document.body
  )
}

Drawer.displayName = 'Drawer'

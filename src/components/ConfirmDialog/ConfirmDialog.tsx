import React from 'react'
import { Modal } from '../Modal/Modal'

export type ConfirmDialogTone = 'danger' | 'primary'

export interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  /** 다이얼로그 제목 */
  title: string
  /** 본문 설명 */
  description?: React.ReactNode
  /** 확인 버튼 레이블. 기본: tone에 따라 자동 */
  confirmLabel?: string
  /** 취소 버튼 레이블. 기본: '취소' */
  cancelLabel?: string
  /** 버튼 색상 의미. 기본: 'danger' */
  tone?: ConfirmDialogTone
  /** 확인 버튼 로딩 상태 */
  loading?: boolean
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel = '취소',
  tone = 'danger',
  loading = false,
}) => {
  const defaultConfirmLabel = tone === 'danger' ? '삭제' : '확인'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      subtitle={description}
      size="sm"
      footerVariation={tone}
      primaryLabel={confirmLabel ?? defaultConfirmLabel}
      secondaryLabel={cancelLabel}
      onPrimaryAction={onConfirm}
      onSecondaryAction={onClose}
      closeOnOverlayClick={!loading}
    />
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'

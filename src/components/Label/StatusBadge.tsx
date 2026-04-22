import React from 'react'
import { Label, LabelProps } from './Label'

export type StatusBadgeStatus =
  | 'active'    // 활성 → success
  | 'inactive'  // 비활성 → danger
  | 'pending'   // 대기 → warning
  | 'draft'     // 임시저장 → info
  | 'closed'    // 종료 → neutral (danger soft)

const STATUS_MAP: Record<StatusBadgeStatus, { color: LabelProps['color']; label: string }> = {
  active:   { color: 'success', label: '활성' },
  inactive: { color: 'danger',  label: '비활성' },
  pending:  { color: 'warning', label: '대기' },
  draft:    { color: 'info',    label: '임시저장' },
  closed:   { color: 'danger',  label: '종료' },
}

export interface StatusBadgeProps extends Omit<LabelProps, 'color' | 'children'> {
  status: StatusBadgeStatus
  /** 기본 레이블 대신 커스텀 텍스트 사용 */
  label?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  tone = 'soft',
  size = 'sm',
  ...props
}) => {
  const { color, label: defaultLabel } = STATUS_MAP[status]
  return (
    <Label color={color} tone={tone} size={size} {...props}>
      {label ?? defaultLabel}
    </Label>
  )
}

StatusBadge.displayName = 'StatusBadge'

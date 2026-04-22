import React from 'react'
import clsx from 'clsx'
import { Button } from '../Button'
import { Icon } from '../Icon'
import './StateView.css'

export type StateViewVariant = 'error' | 'empty'

export interface StateViewProps {
  /** 상태 유형. default: 'error' */
  variant?: StateViewVariant
  /** 헤드라인 텍스트 */
  title?: string
  /** 본문 설명 텍스트 */
  description?: React.ReactNode
  /** 액션 버튼 레이블 */
  actionLabel?: string
  /** 액션 버튼 클릭 핸들러 */
  onAction?: () => void
  /** 아이콘 오버라이드 (기본: variant에 따라 자동 결정) */
  icon?: React.ReactNode
  className?: string
}

const DEFAULT_TITLES: Record<StateViewVariant, string> = {
  error: '일시적으로 정보를 불러오지 못했어요',
  empty: '검색 결과가 없어요',
}

const DEFAULT_DESCRIPTIONS: Record<StateViewVariant, React.ReactNode> = {
  error: (
    <>
      시스템에 문제가 생겨 정보를 불러오지 못했어요.
      <br />
      잠시 후 다시 시도해 주세요.
    </>
  ),
  empty: (
    <>
      입력한 조건과 일치하는 항목이 없어요.
      <br />
      검색어를 변경하거나 필터를 다시 설정해보세요.
    </>
  ),
}

const DEFAULT_ACTION_LABELS: Record<StateViewVariant, string> = {
  error: '다시 불러오기',
  empty: '다시 불러오기',
}

export const StateView: React.FC<StateViewProps> = ({
  variant = 'error',
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}) => {
  const resolvedTitle = title ?? DEFAULT_TITLES[variant]
  const resolvedDescription = description ?? DEFAULT_DESCRIPTIONS[variant]
  const resolvedActionLabel = actionLabel ?? DEFAULT_ACTION_LABELS[variant]

  const defaultIcon =
    icon !== undefined ? icon : variant === 'error' ? (
      <Icon name="warning" variant="solid" size="xl" />
    ) : (
      <Icon name="document_paper_solid" variant="solid" size="xl" />
    )

  return (
    <div
      className={clsx('igt-state-view', className)}
      data-variant={variant}
    >
      <div className="igt-state-view__icon">{defaultIcon}</div>

      <div className="igt-state-view__text">
        <div className="igt-state-view__headline">{resolvedTitle}</div>
        <div className="igt-state-view__body">{resolvedDescription}</div>
      </div>

      {(onAction || actionLabel) && (
        <div className="igt-state-view__action">
          <Button
            tone="secondary"
            variant="soft"
            size="sm"
            onClick={onAction}
          >
            {resolvedActionLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

StateView.displayName = 'StateView'

import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import type { IconName } from '../Icon'
import './Timeline.css'

export type TimelineItemStatus = 'default' | 'success' | 'warning' | 'error' | 'pending'

export interface TimelineItem {
  /** 제목 */
  title: React.ReactNode
  /** 부가 설명 */
  description?: React.ReactNode
  /** 시간/날짜 문자열 */
  time?: string
  /** dot 상태 색상 */
  status?: TimelineItemStatus
  /** 커스텀 dot (아이콘 이름 또는 ReactNode) */
  icon?: IconName | React.ReactNode
  /** key (map용) */
  key?: string | number
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const STATUS_ICON: Record<TimelineItemStatus, IconName | null> = {
  default: null,
  success: 'check_circle',
  warning: 'warning',
  error: 'x_circle',
  pending: null,
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <ol className={clsx('igt-timeline', className)}>
      {items.map((item, idx) => {
        const status = item.status ?? 'default'
        const isLast = idx === items.length - 1
        const defaultIcon = STATUS_ICON[status]

        const dot =
          item.icon != null ? (
            typeof item.icon === 'string' ? (
              <Icon name={item.icon as IconName} size="sm" />
            ) : (
              item.icon
            )
          ) : defaultIcon ? (
            <Icon name={defaultIcon} size="sm" />
          ) : null

        return (
          <li
            key={item.key ?? idx}
            className={clsx(
              'igt-timeline__item',
              `igt-timeline__item--${status}`,
              isLast && 'igt-timeline__item--last',
            )}
          >
            {/* 왼쪽: dot + 수직선 */}
            <div className="igt-timeline__aside">
              <div className={clsx('igt-timeline__dot', dot ? 'igt-timeline__dot--icon' : 'igt-timeline__dot--plain')}>
                {dot}
              </div>
              {!isLast && <div className="igt-timeline__line" />}
            </div>

            {/* 오른쪽: 콘텐츠 */}
            <div className="igt-timeline__content">
              <div className="igt-timeline__header">
                <span className="igt-timeline__title">{item.title}</span>
                {item.time && <span className="igt-timeline__time">{item.time}</span>}
              </div>
              {item.description && (
                <div className="igt-timeline__desc">{item.description}</div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

Timeline.displayName = 'Timeline'

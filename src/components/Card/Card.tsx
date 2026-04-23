import React from 'react'
import clsx from 'clsx'
import './Card.css'

/* ============================================================
   IGT Card Component
   기본 컨테이너 카드 + KPI 통계 카드
   ============================================================ */

/* ── 기본 Card ─────────────────────────────────────────────── */

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 패딩 크기. default: 'md' */
  padding?: CardPadding
  /** 테두리 표시. default: true */
  bordered?: boolean
  /** 그림자. default: false */
  shadow?: boolean
  children: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', bordered = true, shadow = false, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('igt-card', className)}
      data-padding={padding}
      data-bordered={bordered || undefined}
      data-shadow={shadow || undefined}
      {...props}
    >
      {children}
    </div>
  )
)
Card.displayName = 'Card'

/* ── Card subcomponents ────────────────────────────────────── */

export interface CardHeaderProps {
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, description, children, className, style }) => (
  <div className={clsx('igt-card__header', className)} style={style}>
    {title && <div className="igt-card__header-title">{title}</div>}
    {description && <div className="igt-card__header-description">{description}</div>}
    {children}
  </div>
)
CardHeader.displayName = 'CardHeader'

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={clsx('igt-card__body', className)} {...props}>{children}</div>
)
CardBody.displayName = 'CardBody'

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={clsx('igt-card__footer', className)} {...props}>{children}</div>
)
CardFooter.displayName = 'CardFooter'

/* ── KPI Card ──────────────────────────────────────────────── */

export type KpiCardTrend = 'up' | 'down' | 'neutral'

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 지표 라벨 */
  label: string
  /** 주요 수치 */
  value: React.ReactNode
  /** 단위 (선택) */
  unit?: string
  /** 이전 대비 변화율 텍스트 (예: "+12.3%") */
  change?: string
  /** 변화 방향 */
  trend?: KpiCardTrend
  /** 아이콘 영역 */
  icon?: React.ReactNode
  /** 보조 설명 */
  description?: string
}

export const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  ({ label, value, unit, change, trend = 'neutral', icon, description, className, ...props }, ref) => (
    <div ref={ref} className={clsx('igt-kpi-card', className)} {...props}>
      <div className="igt-kpi-card__top">
        <span className="igt-kpi-card__label">{label}</span>
        {icon && <span className="igt-kpi-card__icon">{icon}</span>}
      </div>
      <div className="igt-kpi-card__value-row">
        <span className="igt-kpi-card__value">{value}</span>
        {unit && <span className="igt-kpi-card__unit">{unit}</span>}
      </div>
      {(change || description) && (
        <div className="igt-kpi-card__bottom">
          {change && (
            <span className="igt-kpi-card__change" data-trend={trend}>
              {change}
            </span>
          )}
          {description && <span className="igt-kpi-card__description">{description}</span>}
        </div>
      )}
    </div>
  )
)
KpiCard.displayName = 'KpiCard'

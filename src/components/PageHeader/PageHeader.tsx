import React from 'react'
import clsx from 'clsx'
import './PageHeader.css'

export interface PageHeaderProps {
  /** 페이지 제목 */
  title: string
  /** 부제목 / 설명 텍스트 */
  subtitle?: string
  /** 우측 액션 영역 (Button, IconButton 등) */
  actions?: React.ReactNode
  /** 제목 왼쪽 뒤로가기 등 leading 영역 */
  leading?: React.ReactNode
  /** 하단 보조 영역 (Breadcrumb, Tab 등) */
  footer?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  actions,
  leading,
  footer,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={clsx('igt-page-header', className)}
    >
      <div className="igt-page-header__main">
        {leading && <div className="igt-page-header__leading">{leading}</div>}
        <div className="igt-page-header__title-wrap">
          <h1 className="igt-page-header__title">{title}</h1>
          {subtitle && <p className="igt-page-header__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="igt-page-header__actions">{actions}</div>}
      </div>
      {footer && <div className="igt-page-header__footer">{footer}</div>}
    </div>
  )
}

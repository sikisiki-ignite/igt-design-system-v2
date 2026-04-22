import React from 'react'
import clsx from 'clsx'
import './SideNavigation.css'

export type SideNavigationTone = 'neutral' | 'accent'
export type SideNavigationSize = 'md' | 'sm'

export interface SideNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** 색상 의미 — NavItem에 상속됨. default: 'neutral' */
  tone?: SideNavigationTone
  /** 크기 — NavItem에 상속됨. default: 'md' */
  size?: SideNavigationSize
  /** 접힘 상태 — true이면 라벨 숨김, 아이콘만 표시. default: false */
  collapsed?: boolean
  /** 컨테이너 태그. default: 'nav' */
  as?: 'nav' | 'div' | 'aside'
  children: React.ReactNode
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  tone = 'neutral',
  size = 'md',
  collapsed = false,
  as: Tag = 'nav',
  children,
  className,
  ...props
}) => {
  return (
    <Tag
      className={clsx('igt-side-nav', className)}
      data-tone={tone}
      data-size={size}
      data-collapsed={collapsed || undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}

SideNavigation.displayName = 'SideNavigation'

/** NavItem 목록을 감싸는 래퍼 */
export const SideNavigationList: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({
  children,
  className,
  ...props
}) => (
  <ul role="list" className={clsx('igt-side-nav__list', className)} {...props}>
    {children}
  </ul>
)

SideNavigationList.displayName = 'SideNavigationList'

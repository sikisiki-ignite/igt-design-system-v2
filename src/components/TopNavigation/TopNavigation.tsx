import React from 'react'
import clsx from 'clsx'
import { IconButton } from '../IconButton'
import { Button } from '../Button'
import { Avatar } from '../Avatar'
import { Icon } from '../Icon'
import './TopNavigation.css'

/* ── Types ────────────────────────────────────────────────── */

export type TopNavSize = 'sm' | 'md'

export interface TopNavItem {
  label: string
  href?: string
  current?: boolean
  disabled?: boolean
  onClick?: () => void
}

export interface TopNavigationProps {
  /** 전체 사이즈. default: 'sm' (height 56px) */
  size?: TopNavSize
  /** 로고 브랜드. default: 'mgWrap' */
  brand?: 'mgWrap' | 'ignite'
  /** 로고 커스텀 이미지 src (brand 무시하고 직접 지정 시) */
  logoSrc?: string
  /** 로고 클릭 핸들러 */
  onLogoClick?: () => void
  /** 네비게이션 아이템 목록 */
  items?: TopNavItem[]
  /**
   * trailing 영역 변형.
   * - 'userActions': 아이콘 버튼들 + 아바타 (기본 로그인 상태)
   * - 'authActions': 로그인 버튼 (비로그인 상태)
   * default: 'userActions'
   */
  trailing?: 'userActions' | 'authActions'
  /** 스크롤 시 overlay 표시 여부 */
  scrolled?: boolean
  /** [userActions] 알림 버튼 클릭 핸들러 */
  onNotificationClick?: () => void
  /** [userActions] 설정 버튼 클릭 핸들러 */
  onSettingsClick?: () => void
  /** [userActions] 아바타 이미지 src */
  avatarSrc?: string
  /** [userActions] 아바타 클릭 핸들러 */
  onAvatarClick?: () => void
  /** [authActions] 로그인 버튼 클릭 핸들러 */
  onLoginClick?: () => void
  className?: string
}

/* ── Component ────────────────────────────────────────────── */

export const TopNavigation = React.forwardRef<HTMLElement, TopNavigationProps>(
  (
    {
      size = 'sm',
      brand = 'mgWrap',
      logoSrc,
      onLogoClick,
      items = [],
      trailing = 'userActions',
      scrolled = false,
      onNotificationClick,
      onSettingsClick,
      avatarSrc,
      onAvatarClick,
      onLoginClick,
      className,
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={clsx('igt-top-nav', className)}
        data-size={size}
      >
        {scrolled && <div className="igt-top-nav__scrolled-overlay" aria-hidden="true" />}

        <div className="igt-top-nav__content">
          {/* Leading: Logo + NavGroup */}
          <div className="igt-top-nav__leading">
            {/* Logo */}
            <div
              className="igt-top-nav__logo"
              role={onLogoClick ? 'button' : undefined}
              tabIndex={onLogoClick ? 0 : undefined}
              onClick={onLogoClick}
              style={{ cursor: onLogoClick ? 'pointer' : 'default' }}
            >
              {logoSrc ? (
                <img src={logoSrc} alt="logo" height={28} />
              ) : (
                <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: 1 }}>
                  {brand === 'ignite' ? 'IGNITE' : 'LOGO'}
                </span>
              )}
            </div>

            {/* NavGroup */}
            {items.length > 0 && (
              <nav className="igt-top-nav__nav-group" aria-label="주요 네비게이션">
                {items.map((item, index) => {
                  const Tag = item.href ? 'a' : 'button'
                  return (
                    <Tag
                      key={index}
                      className="igt-top-nav__nav-item"
                      href={item.href}
                      data-current={item.current ? '' : undefined}
                      data-disabled={item.disabled ? '' : undefined}
                      aria-current={item.current ? 'page' : undefined}
                      disabled={Tag === 'button' && item.disabled ? true : undefined}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </Tag>
                  )
                })}
              </nav>
            )}
          </div>

          {/* Center spacer */}
          <div className="igt-top-nav__center" aria-hidden="true" />

          {/* Trailing */}
          <div className="igt-top-nav__trailing">
            {trailing === 'userActions' ? (
              <div className="igt-top-nav__trailing-actions" data-variant="userActions">
                <div className="igt-top-nav__icon-buttons">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    shape="circle"
                    icon={<Icon name="bell" size="sm" />}
                    aria-label="알림"
                    onClick={onNotificationClick}
                  />
                  <IconButton
                    size="sm"
                    variant="ghost"
                    shape="circle"
                    icon={<Icon name="setting" size="sm" />}
                    aria-label="설정"
                    onClick={onSettingsClick}
                  />
                </div>
                <Avatar
                  size="sm"
                  src={avatarSrc}
                  onClick={onAvatarClick}
                  style={{ cursor: onAvatarClick ? 'pointer' : 'default' }}
                />
              </div>
            ) : (
              <div className="igt-top-nav__trailing-actions" data-variant="authActions">
                <Button
                  size="sm"
                  tone="primary"
                  variant="fill"
                  onClick={onLoginClick}
                >
                  로그인
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }
)

TopNavigation.displayName = 'TopNavigation'

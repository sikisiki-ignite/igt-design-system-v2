import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Row.css'

export interface RowProps {
  /** 주 텍스트 */
  label: React.ReactNode
  /** 좌측 아이콘/아바타 등 */
  leading?: React.ReactNode
  /** 우측 커스텀 trailing — 제공 시 기본 chevron 대체 */
  trailing?: React.ReactNode
  /** chevron 표시 여부 (기본: true, trailing 없을 때) */
  showChevron?: boolean
  onClick?: () => void
  href?: string
  disabled?: boolean
  className?: string
}

export const Row: React.FC<RowProps> = ({
  label,
  leading,
  trailing,
  showChevron = true,
  onClick,
  href,
  disabled = false,
  className,
}) => {
  const hasTrailing = trailing !== undefined || showChevron
  const Tag = href ? 'a' : onClick ? 'button' : 'div'

  const props: React.HTMLAttributes<HTMLElement> & { href?: string; type?: string } = {
    className: clsx(
      'igt-row',
      (href || onClick) && 'igt-row--clickable',
      disabled && 'igt-row--disabled',
      className
    ),
    onClick: disabled ? undefined : onClick,
    ...(href && { href }),
    ...(Tag === 'button' && { type: 'button', disabled }),
  }

  return React.createElement(
    Tag,
    props,
    <>
      {leading && <span className="igt-row__leading">{leading}</span>}
      <span className="igt-row__content">{label}</span>
      {hasTrailing && (
        <span className="igt-row__trailing">
          {trailing ?? (
            showChevron && <Icon name="chevron_right" variant="outline" size="sm" />
          )}
        </span>
      )}
    </>
  )
}

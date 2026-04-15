import React from 'react'
import clsx from 'clsx'
import './Tab.css'

export type TabSize = 'sm' | 'md' | 'lg'
export type TabDistribution = 'equal' | 'content'

export interface TabItem {
  key: string
  label: React.ReactNode
  /** trailing element (count badge 등) */
  trailing?: React.ReactNode
  disabled?: boolean
}

export interface TabProps {
  items: TabItem[]
  /** 현재 활성 탭 key (controlled) */
  activeKey?: string
  /** 초기 활성 탭 key (uncontrolled) */
  defaultActiveKey?: string
  onChange?: (key: string) => void
  size?: TabSize
  distribution?: TabDistribution
  className?: string
}

export const Tab: React.FC<TabProps> = ({
  items,
  activeKey: activeKeyProp,
  defaultActiveKey,
  onChange,
  size = 'lg',
  distribution = 'equal',
  className,
}) => {
  const [internalKey, setInternalKey] = React.useState(
    defaultActiveKey ?? items[0]?.key ?? ''
  )
  const isControlled = activeKeyProp !== undefined
  const activeKey = isControlled ? activeKeyProp : internalKey

  const handleClick = (key: string, disabled?: boolean) => {
    if (disabled) return
    if (!isControlled) setInternalKey(key)
    onChange?.(key)
  }

  return (
    <div
      className={clsx('igt-tab', className)}
      data-size={size}
      data-distribution={distribution}
      role="tablist"
    >
      {/* 하단 track 라인 */}
      <div className="igt-tab__track" aria-hidden="true" />

      {items.map((item) => {
        const isActive = item.key === activeKey
        return (
          <button
            key={item.key}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-disabled={item.disabled || undefined}
            tabIndex={isActive ? 0 : -1}
            className={clsx(
              'igt-tab__item',
              isActive && 'igt-tab__item--active',
              item.disabled && 'igt-tab__item--disabled'
            )}
            onClick={() => handleClick(item.key, item.disabled)}
          >
            <span className="igt-tab__label">{item.label}</span>
            {item.trailing && (
              <span className="igt-tab__trailing">{item.trailing}</span>
            )}
            {/* 선택 인디케이터 */}
            <span className="igt-tab__indicator" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

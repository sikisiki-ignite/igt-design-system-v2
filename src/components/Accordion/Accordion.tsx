import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import './Accordion.css'

export type AccordionVariation = 'plain' | 'contained'
export type AccordionSize = 'sm' | 'md' | 'lg'

export interface AccordionItem {
  key: string
  label: React.ReactNode
  content: React.ReactNode
  /** 헤더 앞에 표시할 아이콘 */
  leading?: React.ReactNode
  /** 기본 열림 여부 */
  defaultOpen?: boolean
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  variation?: AccordionVariation
  size?: AccordionSize
  /** 여러 아이템 동시 열기 허용 (기본: true) */
  allowMultiple?: boolean
  className?: string
}

function AccordionItemComponent({
  item,
  variation,
  size,
  open,
  onToggle,
}: {
  item: AccordionItem
  variation: AccordionVariation
  size: AccordionSize
  open: boolean
  onToggle: () => void
}) {
  const iconSize = size === 'sm' ? 'sm' : size === 'md' ? 'sm' : 'sm'

  return (
    <div
      className={clsx(
        'igt-accordion__item',
        `igt-accordion__item--${variation}`,
        open && 'igt-accordion__item--open',
        item.disabled && 'igt-accordion__item--disabled'
      )}
    >
      <button
        type="button"
        className="igt-accordion__header"
        onClick={onToggle}
        disabled={item.disabled}
        aria-expanded={open}
      >
        {item.leading && (
          <span className="igt-accordion__leading" aria-hidden="true">
            {item.leading}
          </span>
        )}
        <span className="igt-accordion__label">{item.label}</span>
        <span className="igt-accordion__chevron" aria-hidden="true">
          <Icon name="chevron_down" variant="outline" size={iconSize} />
        </span>
      </button>

      <div className="igt-accordion__body" aria-hidden={!open}>
        <div className="igt-accordion__content">
          <div className="igt-accordion__content-inner">{item.content}</div>
        </div>
      </div>
    </div>
  )
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variation = 'plain',
  size = 'lg',
  allowMultiple = true,
  className,
}) => {
  const [openKeys, setOpenKeys] = React.useState<Set<string>>(
    () => new Set(items.filter((i) => i.defaultOpen).map((i) => i.key))
  )

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        if (!allowMultiple) next.clear()
        next.add(key)
      }
      return next
    })
  }

  return (
    <div
      className={clsx('igt-accordion', className)}
      data-variation={variation}
      data-size={size}
    >
      {items.map((item) => (
        <AccordionItemComponent
          key={item.key}
          item={item}
          variation={variation}
          size={size}
          open={openKeys.has(item.key)}
          onToggle={() => toggle(item.key)}
        />
      ))}
    </div>
  )
}

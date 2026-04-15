import React from 'react'
import clsx from 'clsx'
import './Popover.css'

export type PopoverEmphasis = 'default' | 'inverse'

export interface PopoverSection {
  title?: React.ReactNode
  body: React.ReactNode
}

export interface PopoverProps {
  /** 강조 스타일: default(흰 배경) | inverse(어두운 배경) */
  emphasis?: PopoverEmphasis
  /** 자유 콘텐츠 슬롯 */
  children?: React.ReactNode
  className?: string
}

export const Popover: React.FC<PopoverProps> = ({
  emphasis = 'default',
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        'igt-popover',
        `igt-popover--${emphasis}`,
        className
      )}
    >
      <div className="igt-popover__slot">{children}</div>
    </div>
  )
}

export interface PopoverSectionProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const PopoverSection: React.FC<PopoverSectionProps> = ({ title, children }) => (
  <div className="igt-popover__section">
    {title && <div className="igt-popover__section-title">{title}</div>}
    <div className="igt-popover__section-body">{children}</div>
  </div>
)

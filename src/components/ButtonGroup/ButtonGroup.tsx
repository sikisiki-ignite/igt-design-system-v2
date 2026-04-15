import React from 'react'
import clsx from 'clsx'
import './ButtonGroup.css'

export type ButtonGroupLayout = 'inline' | 'stack'
export type ButtonGroupDistribution = 'content' | 'equal'
export type ButtonGroupSize = 'xs' | 'sm' | 'md' | 'lg'

export interface ButtonGroupProps {
  /** 배치 방향. default: 'inline' */
  layout?: ButtonGroupLayout
  /** 너비 분배. content=내용 기준 / equal=균등 분배. default: 'content' */
  distribution?: ButtonGroupDistribution
  /** 버튼 크기 — 내부 Button에 전달할 기준 크기. default: 'md' */
  size?: ButtonGroupSize
  /** 버튼 목록 */
  children: React.ReactNode
  className?: string
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  layout = 'inline',
  distribution = 'content',
  size = 'md',
  children,
  className,
}) => {
  return (
    <div
      className={clsx('igt-btn-group', className)}
      data-layout={layout}
      data-distribution={distribution}
      data-size={size}
    >
      {children}
    </div>
  )
}

ButtonGroup.displayName = 'ButtonGroup'

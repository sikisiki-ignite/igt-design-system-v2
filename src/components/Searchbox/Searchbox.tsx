import React from 'react'
import clsx from 'clsx'
import './Searchbox.css'

/* ── SearchboxGroup ───────────────────────────────────────── */
export interface SearchboxGroupProps {
  /** 필터 레이블 */
  label: string
  /**
   * inline: 컨트롤 가로 나열 (기본)
   * block: Select 상단 + chip 목록 하단 (수직 스택)
   */
  direction?: 'inline' | 'block'
  /** block 모드일 때 chip 영역 */
  chips?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SearchboxGroup({
  label,
  direction = 'inline',
  chips,
  children,
  className,
}: SearchboxGroupProps) {
  return (
    <div className={clsx('igt-searchbox-group', className)}>
      <span className="igt-searchbox-group__label">{label}</span>
      <div
        className={clsx(
          'igt-searchbox-group__content',
          direction === 'block' && 'igt-searchbox-group__content--block'
        )}
      >
        {children}
        {direction === 'block' && chips && (
          <div className="igt-searchbox-group__chips">{chips}</div>
        )}
      </div>
    </div>
  )
}

/* ── Searchbox ────────────────────────────────────────────── */
export interface SearchboxProps {
  /** SearchboxGroup 목록 */
  children: React.ReactNode
  /** 그리드 컬럼 수 (기본 2) */
  columns?: 1 | 2 | 3 | 4
  /** 하단 액션 버튼 영역 (초기화, 검색 등) */
  actions?: React.ReactNode
  className?: string
}

export function Searchbox({ children, columns = 2, actions, className }: SearchboxProps) {
  return (
    <div className={clsx('igt-searchbox', className)} data-columns={columns}>
      <div className="igt-searchbox__grid">{children}</div>
      {actions && (
        <>
          <div className="igt-searchbox__divider" />
          <div className="igt-searchbox__actions">{actions}</div>
        </>
      )}
    </div>
  )
}

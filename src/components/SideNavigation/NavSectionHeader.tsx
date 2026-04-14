import React from 'react'
import clsx from 'clsx'

export interface NavSectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const NavSectionHeader: React.FC<NavSectionHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('igt-nav-section-header', className)}
      {...props}
    >
      {children}
    </div>
  )
}

NavSectionHeader.displayName = 'NavSectionHeader'

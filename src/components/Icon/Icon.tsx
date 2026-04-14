import React from 'react'
import { ICON_PATHS, type IconName, type IconVariant } from './icons'
import './Icon.css'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IconProps {
  /** 피그마 igt_core_icon_* 네이밍 기준 아이콘 이름 */
  name: IconName
  /** solid | outline(기본) | outline_thin */
  variant?: IconVariant
  /** xs=12 sm=16 md=20 lg=24 xl=28 */
  size?: IconSize
  /** aria-label (접근성) */
  label?: string
  className?: string
  style?: React.CSSProperties
}

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, variant = 'outline', size = 'md', label, className, style }, ref) => {
    const iconData = ICON_PATHS[name]
    if (!iconData) return null

    // variant fallback: solid → outline → outline_thin
    const paths =
      iconData[variant] ??
      iconData['outline'] ??
      iconData['outline_thin'] ??
      ''

    const px = SIZE_MAP[size]

    return (
      <svg
        ref={ref}
        className={['igt-icon', className].filter(Boolean).join(' ')}
        width={px}
        height={px}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={label ? undefined : true}
        aria-label={label}
        role={label ? 'img' : undefined}
        data-name={name}
        data-variant={variant}
        data-size={size}
        style={style}
        dangerouslySetInnerHTML={{ __html: paths }}
      />
    )
  }
)

Icon.displayName = 'Icon'

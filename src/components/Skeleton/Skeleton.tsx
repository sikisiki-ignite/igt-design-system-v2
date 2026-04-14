import React from 'react'
import clsx from 'clsx'
import './Skeleton.css'

export type SkeletonTextSize = 'xs' | 'sm' | 'md' | 'lg'
export type SkeletonRectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SkeletonRectRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg'
export type SkeletonCircleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SkeletonTextSize
  width?: string | number
}

export const SkeletonText = React.forwardRef<HTMLSpanElement, SkeletonTextProps>(
  ({ size = 'md', width, style, className, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx('igt-skeleton', 'igt-skeleton--text', className)}
      data-size={size}
      style={width !== undefined ? { width, ...style } : style}
      aria-hidden="true"
      {...props}
    />
  )
)
SkeletonText.displayName = 'SkeletonText'

export interface SkeletonRectProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SkeletonRectSize
  radius?: SkeletonRectRadius
  width?: string | number
  height?: string | number
}

export const SkeletonRect = React.forwardRef<HTMLSpanElement, SkeletonRectProps>(
  ({ size = 'md', radius = 'md', width, height, style, className, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx('igt-skeleton', 'igt-skeleton--rect', className)}
      data-size={size}
      data-radius={radius}
      style={{
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  )
)
SkeletonRect.displayName = 'SkeletonRect'

export interface SkeletonCircleProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SkeletonCircleSize
}

export const SkeletonCircle = React.forwardRef<HTMLSpanElement, SkeletonCircleProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx('igt-skeleton', 'igt-skeleton--circle', className)}
      data-size={size}
      aria-hidden="true"
      {...props}
    />
  )
)
SkeletonCircle.displayName = 'SkeletonCircle'

import React from 'react'
import clsx from 'clsx'
import './Avatar.css'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'rounded'
export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: AvatarSize
  shape?: AvatarShape
  status?: AvatarStatus
  fallback?: React.ReactNode
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      size = 'md',
      shape = 'circle',
      status,
      fallback,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx('igt-avatar', className)}
        data-size={size}
        data-shape={shape}
        {...props}
      >
        {src ? (
          <img className="igt-avatar__img" src={src} alt={alt} />
        ) : (
          <div className="igt-avatar__fallback" aria-label={alt}>
            {fallback || alt.charAt(0).toUpperCase()}
          </div>
        )}
        {status && (
          <span
            className={`igt-avatar__status igt-avatar__status--${status}`}
            aria-label={status}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import type { IconVariant } from '../Icon'
import './FileUpload.css'

export interface UploadFile {
  id: string
  file: File
  progress?: number
  status?: 'uploading' | 'done' | 'error'
  errorMessage?: string
}

export interface RejectedFile {
  file: File
  reason: string
}

/**
 * 파일 유효성 검사 유틸리티
 * allowedTypes: MIME 타입 또는 확장자 (예: ['image/*', 'application/pdf', '.zip'])
 */
export function validateFiles(
  files: File[],
  allowedTypes?: string[],
  maxSizeBytes?: number,
): { valid: File[]; rejected: RejectedFile[] } {
  const valid: File[] = []
  const rejected: RejectedFile[] = []

  for (const file of files) {
    if (allowedTypes && allowedTypes.length > 0) {
      const accepted = allowedTypes.some((pattern) => {
        if (pattern.startsWith('.')) {
          return file.name.toLowerCase().endsWith(pattern.toLowerCase())
        }
        if (pattern.endsWith('/*')) {
          return file.type.startsWith(pattern.slice(0, -1))
        }
        return file.type === pattern
      })
      if (!accepted) {
        rejected.push({ file, reason: '파일 형식이 지원되지 않습니다.' })
        continue
      }
    }
    if (maxSizeBytes !== undefined && file.size > maxSizeBytes) {
      rejected.push({ file, reason: `파일 크기가 ${(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB를 초과합니다.` })
      continue
    }
    valid.push(file)
  }

  return { valid, rejected }
}

// ── FileUploadButton (#45) ────────────────────────────────────────────
export interface FileUploadButtonProps {
  /** 허용 파일 타입 (accept 속성 및 클라이언트 검증용) */
  accept?: string
  /** 클라이언트 검증용 허용 타입 (MIME 또는 확장자). 미지정 시 검증 안 함 */
  allowedTypes?: string[]
  /** 최대 파일 크기 (bytes). 미지정 시 검증 안 함 */
  maxSizeBytes?: number
  /** 다중 파일 선택 허용 */
  multiple?: boolean
  /** 비활성화 */
  disabled?: boolean
  /** 버튼 레이블 */
  label?: string
  /** 아이콘 variant. default: 'outline' */
  iconVariant?: IconVariant
  /** 유효한 파일 선택 콜백 */
  onFilesSelected?: (files: File[]) => void
  /** 검증 실패 파일 콜백 */
  onFilesRejected?: (rejected: RejectedFile[]) => void
  className?: string
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  accept,
  allowedTypes,
  maxSizeBytes,
  multiple = false,
  disabled = false,
  label = '파일 첨부',
  iconVariant = 'outline',
  onFilesSelected,
  onFilesRejected,
  className,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    const { valid, rejected } = validateFiles(files, allowedTypes, maxSizeBytes)
    if (valid.length > 0) onFilesSelected?.(valid)
    if (rejected.length > 0) onFilesRejected?.(rejected)
    e.target.value = ''
  }

  return (
    <div className={clsx('igt-file-upload-btn', className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="igt-file-upload-btn__input"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        className="igt-file-upload-btn__trigger"
        onClick={handleClick}
        disabled={disabled}
      >
        <Icon name="document_paper_solid" size="sm" variant={iconVariant} />
        <span>{label}</span>
      </button>
    </div>
  )
}

FileUploadButton.displayName = 'FileUploadButton'

// ── Dropzone (#46) ────────────────────────────────────────────────────
export interface DropzoneProps {
  accept?: string
  /** 클라이언트 검증용 허용 타입 (MIME 또는 확장자). 미지정 시 검증 안 함 */
  allowedTypes?: string[]
  /** 최대 파일 크기 (bytes). 미지정 시 검증 안 함 */
  maxSizeBytes?: number
  multiple?: boolean
  disabled?: boolean
  /** 유효한 파일 선택 콜백 */
  onFilesSelected?: (files: File[]) => void
  /** 검증 실패 파일 콜백 */
  onFilesRejected?: (rejected: RejectedFile[]) => void
  className?: string
  children?: React.ReactNode
}

export const Dropzone: React.FC<DropzoneProps> = ({
  accept,
  allowedTypes,
  maxSizeBytes,
  multiple = false,
  disabled = false,
  onFilesSelected,
  onFilesRejected,
  className,
  children,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleFiles = (files: File[]) => {
    if (files.length === 0) return
    const { valid, rejected } = validateFiles(files, allowedTypes, maxSizeBytes)
    if (valid.length > 0) onFilesSelected?.(valid)
    if (rejected.length > 0) onFilesRejected?.(rejected)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    handleFiles(Array.from(e.dataTransfer.files))
  }

  const handleClick = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(Array.from(e.target.files ?? []))
    e.target.value = ''
  }

  return (
    <div
      className={clsx(
        'igt-dropzone',
        dragging && 'igt-dropzone--dragging',
        disabled && 'igt-dropzone--disabled',
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label="파일을 드래그하거나 클릭하여 업로드"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="igt-dropzone__input"
        aria-hidden="true"
        tabIndex={-1}
      />
      {children ?? (
        <div className="igt-dropzone__content">
          <Icon name="arrow_up" size="lg" />
          <span className="igt-dropzone__label">파일을 드래그하거나 클릭하여 업로드</span>
          <span className="igt-dropzone__hint">또는 클릭하여 파일 선택</span>
        </div>
      )}
    </div>
  )
}

Dropzone.displayName = 'Dropzone'

// ── FileList (#47) — 다중 파일 + 진행률 ────────────────────────────
export interface FileListProps {
  files: UploadFile[]
  onRemove?: (id: string) => void
  className?: string
}

export const FileList: React.FC<FileListProps> = ({ files, onRemove, className }) => {
  if (files.length === 0) return null

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <ul className={clsx('igt-file-list', className)}>
      {files.map((f) => (
        <li key={f.id} className={clsx('igt-file-list__item', f.status && `igt-file-list__item--${f.status}`)}>
          <div className="igt-file-list__row">
            <Icon name="document_paper_solid" size="sm" className="igt-file-list__icon" />
            <span className="igt-file-list__name">{f.file.name}</span>
            <span className="igt-file-list__size">{formatSize(f.file.size)}</span>
            {onRemove && (
              <button
                type="button"
                className="igt-file-list__remove"
                onClick={() => onRemove(f.id)}
                aria-label={`${f.file.name} 제거`}
              >
                <Icon name="delete" size="sm" />
              </button>
            )}
          </div>

          {f.status === 'uploading' && f.progress !== undefined && (
            <div className="igt-file-list__progress-wrap">
              <div
                className="igt-file-list__progress-bar"
                style={{ width: `${Math.min(100, f.progress)}%` }}
              />
            </div>
          )}

          {f.status === 'error' && f.errorMessage && (
            <span className="igt-file-list__error">{f.errorMessage}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

FileList.displayName = 'FileList'

// ── ImageUpload (#48) — 이미지 프리뷰 ───────────────────────────────
export interface ImageUploadProps {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  onFilesSelected?: (files: File[]) => void
  previewUrls?: string[]
  onRemovePreview?: (index: number) => void
  className?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  accept = 'image/*',
  multiple = false,
  disabled = false,
  onFilesSelected,
  previewUrls = [],
  onRemovePreview,
  className,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length > 0) onFilesSelected?.(files)
    e.target.value = ''
  }

  return (
    <div className={clsx('igt-image-upload', className)}>
      <div className="igt-image-upload__grid">
        {previewUrls.map((url, i) => (
          <div key={i} className="igt-image-upload__preview">
            <img src={url} alt={`preview-${i}`} className="igt-image-upload__img" />
            {onRemovePreview && (
              <button
                type="button"
                className="igt-image-upload__remove"
                onClick={() => onRemovePreview(i)}
                aria-label="이미지 제거"
              >
                <Icon name="x_small" size="xs" />
              </button>
            )}
          </div>
        ))}

        {!disabled && (
          <button
            type="button"
            className="igt-image-upload__add"
            onClick={() => inputRef.current?.click()}
          >
            <Icon name="plus" size="md" />
            <span>사진 추가</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="igt-dropzone__input"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  )
}

ImageUpload.displayName = 'ImageUpload'

import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import type { IconName } from '../Icon'
import './TreeView.css'

export interface TreeNode {
  /** 고유 키 */
  key: string
  /** 표시 레이블 */
  label: React.ReactNode
  /** 자식 노드 */
  children?: TreeNode[]
  /** 비활성화 */
  disabled?: boolean
  /** 왼쪽 아이콘 */
  icon?: IconName
  /** 추가 데이터 */
  data?: unknown
}

export interface TreeViewProps {
  nodes: TreeNode[]
  /** 선택된 키 (단일) */
  selectedKey?: string
  onSelect?: (key: string, node: TreeNode) => void
  /** 기본 펼쳐진 키 목록 */
  defaultExpandedKeys?: string[]
  /** 제어형 펼침 상태 */
  expandedKeys?: string[]
  onExpandedKeysChange?: (keys: string[]) => void
  /** 들여쓰기 단위 (px) */
  indent?: number
  className?: string
}

interface TreeNodeItemProps {
  node: TreeNode
  depth: number
  indent: number
  selectedKey?: string
  expandedKeys: string[]
  onSelect?: (key: string, node: TreeNode) => void
  onToggle: (key: string) => void
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  depth,
  indent,
  selectedKey,
  expandedKeys,
  onSelect,
  onToggle,
}) => {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expandedKeys.includes(node.key)
  const isSelected = selectedKey === node.key

  const handleClick = () => {
    if (node.disabled) return
    if (hasChildren) onToggle(node.key)
    onSelect?.(node.key, node)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
    if (e.key === 'ArrowRight' && hasChildren && !isExpanded) onToggle(node.key)
    if (e.key === 'ArrowLeft' && hasChildren && isExpanded) onToggle(node.key)
  }

  return (
    <li className="igt-tree__node-wrapper" role="none">
      <div
        className={clsx(
          'igt-tree__node',
          isSelected && 'igt-tree__node--selected',
          node.disabled && 'igt-tree__node--disabled',
        )}
        style={{ paddingLeft: depth * indent + 8 }}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-disabled={node.disabled}
        tabIndex={node.disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {/* 토글 화살표 */}
        <span className="igt-tree__toggle">
          {hasChildren && (
            <Icon
              name="chevron_right"
              size="xs"
              className={clsx('igt-tree__chevron', isExpanded && 'igt-tree__chevron--open')}
            />
          )}
        </span>

        {/* 아이콘 */}
        {node.icon && (
          <Icon name={node.icon} size="sm" className="igt-tree__icon" />
        )}

        {/* 레이블 */}
        <span className="igt-tree__label">{node.label}</span>
      </div>

      {/* 자식 노드 */}
      {hasChildren && isExpanded && (
        <ul className="igt-tree__children" role="group">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.key}
              node={child}
              depth={depth + 1}
              indent={indent}
              selectedKey={selectedKey}
              expandedKeys={expandedKeys}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  selectedKey,
  onSelect,
  defaultExpandedKeys = [],
  expandedKeys: expandedKeysProp,
  onExpandedKeysChange,
  indent = 16,
  className,
}) => {
  const isControlled = expandedKeysProp !== undefined
  const [internalExpanded, setInternalExpanded] = React.useState<string[]>(defaultExpandedKeys)
  const expandedKeys = isControlled ? expandedKeysProp : internalExpanded

  const handleToggle = (key: string) => {
    const next = expandedKeys.includes(key)
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key]
    if (!isControlled) setInternalExpanded(next)
    onExpandedKeysChange?.(next)
  }

  return (
    <ul className={clsx('igt-tree', className)} role="tree">
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.key}
          node={node}
          depth={0}
          indent={indent}
          selectedKey={selectedKey}
          expandedKeys={expandedKeys}
          onSelect={onSelect}
          onToggle={handleToggle}
        />
      ))}
    </ul>
  )
}

TreeView.displayName = 'TreeView'

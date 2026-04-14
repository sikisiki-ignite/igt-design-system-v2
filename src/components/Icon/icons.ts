/**
 * IGT Icon Registry
 * 피그마: 8 Icons (622:35860) — igt_core_icon_* 네이밍 기준
 * 모든 아이콘은 24×24 viewBox 기준. stroke는 currentColor 사용.
 *
 * 변형(variant):
 *   solid        — 채워진 형태
 *   outline      — stroke 기반 (기본, 2dp 두께)
 *   outline_thin — stroke 기반 (1dp 두께)
 */

export type IconName =
  // Navigation
  | 'chevron_up'
  | 'chevron_down'
  | 'chevron_left'
  | 'chevron_right'
  | 'chevron_up_small'
  | 'chevron_down_small'
  | 'arrow_up'
  | 'arrow_down'
  | 'arrow_left'
  | 'arrow_right'
  | 'x'
  | 'x_small'
  // Status / Feedback
  | 'check'
  | 'check_circle'
  | 'x_circle'
  | 'information'
  | 'warning'
  | 'failure'
  | 'question'
  // Action
  | 'plus'
  | 'minus'
  | 'search'
  | 'refresh'
  | 'filter'
  | 'setting'
  | 'delete'
  | 'write'
  // Content
  | 'eyes_on'
  | 'eyes_off'
  | 'calendar'
  | 'person'
  | 'bell'
  | 'bookmark'
  | 'star'
  | 'more_horizontal'
  | 'more_vertical'
  | 'drag_dot'

export type IconVariant = 'solid' | 'outline' | 'outline_thin'

/** SVG path data: [solid?, outline, outline_thin?] */
type IconData = {
  solid?: string
  outline: string
  outline_thin?: string
}

/**
 * SVG path/group strings for each icon.
 * stroke은 currentColor, fill은 none (outline) 또는 currentColor (solid).
 * viewBox="0 0 24 24"
 */
export const ICON_PATHS: Record<IconName, IconData> = {
  // ── Navigation ─────────────────────────────────────────────────────────
  chevron_up: {
    solid:        `<path d="M5 15L12 8L19 15" fill="currentColor"/>`,
    outline:      `<path d="M5 15L12 8L19 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M5 15L12 8L19 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_down: {
    solid:        `<path d="M5 9L12 16L19 9" fill="currentColor"/>`,
    outline:      `<path d="M5 9L12 16L19 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M5 9L12 16L19 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_left: {
    solid:        `<path d="M15 5L8 12L15 19" fill="currentColor"/>`,
    outline:      `<path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_right: {
    solid:        `<path d="M9 5L16 12L9 19" fill="currentColor"/>`,
    outline:      `<path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_up_small: {
    outline:      `<path d="M7 13L12 8L17 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M7 13L12 8L17 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_down_small: {
    outline:      `<path d="M7 11L12 16L17 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M7 11L12 16L17 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_up: {
    outline:      `<path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_down: {
    outline:      `<path d="M12 5V19M19 12L12 19L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M12 5V19M19 12L12 19L5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_left: {
    outline:      `<path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_right: {
    outline:      `<path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  x: {
    outline:      `<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  x_small: {
    outline:      `<path d="M16 8L8 16M8 8L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M16 8L8 16M8 8L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },

  // ── Status / Feedback ───────────────────────────────────────────────────
  check: {
    outline:      `<path d="M4 12L9 17L20 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M4 12L9 17L20 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  check_circle: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 7.293a1 1 0 0 0-1.414 0L10 14.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0 0-1.414z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7.5 12L10.5 15L16.5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7.5 12L10.5 15L16.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  x_circle: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 6.293a1 1 0 0 0-1.414 0L12 10.586 9.707 8.293a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0 0-1.414z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 9L15 15M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9 9L15 15M15 9L9 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  information: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm1 4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0v-5z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 11V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="8" r="1" fill="currentColor"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 11V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="8" r="0.75" fill="currentColor"/>`,
  },
  warning: {
    solid:        `<path d="M12 2L2 20h20L12 2z" fill="currentColor"/><path d="M12 9V13" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16.5" r="1" fill="white"/>`,
    outline:      `<path d="M12 3L2 20h20L12 3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16.5" r="1" fill="currentColor"/>`,
    outline_thin: `<path d="M12 3L2 20h20L12 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M12 9V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16.5" r="0.75" fill="currentColor"/>`,
  },
  failure: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1zm1 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="1" fill="currentColor"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 7V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="0.75" fill="currentColor"/>`,
  },
  question: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4c-1.657 0-3 1.343-3 3a1 1 0 1 0 2 0 1 1 0 1 1 2 0c0 .55-.226 1.05-.587 1.41L11 11.83V13a1 1 0 1 0 2 0v-1.586l1-1A2.999 2.999 0 0 0 12 6zm1 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9.5 9.5C9.5 8.119 10.619 7 12 7s2.5 1.119 2.5 2.5c0 1.062-.659 1.969-1.594 2.333L12 12v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="1" fill="currentColor"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9.5 9.5C9.5 8.119 10.619 7 12 7s2.5 1.119 2.5 2.5c0 1.062-.659 1.969-1.594 2.333L12 12v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="0.75" fill="currentColor"/>`,
  },

  // ── Action ──────────────────────────────────────────────────────────────
  plus: {
    outline:      `<path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  minus: {
    outline:      `<path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  search: {
    outline:      `<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  refresh: {
    outline:      `<path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 6.219 2.5L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M21 3v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 6.219 2.5L21 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M21 3v5h-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  filter: {
    outline:      `<path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  setting: {
    outline:      `<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  delete: {
    outline:      `<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  write: {
    outline:      `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },

  // ── Content ─────────────────────────────────────────────────────────────
  eyes_on: {
    outline:      `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  eyes_off: {
    outline:      `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  calendar: {
    outline:      `<rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  person: {
    solid:        `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  bell: {
    solid:        `<path d="M12 2a7 7 0 0 0-7 7v4l-2 2v1h18v-1l-2-2V9a7 7 0 0 0-7-7zm0 20a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z" fill="currentColor"/>`,
    outline:      `<path d="M18 16v-5a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M18 16v-5a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  bookmark: {
    solid:        `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" fill="currentColor"/>`,
    outline:      `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  star: {
    solid:        `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>`,
    outline:      `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  more_horizontal: {
    solid:        `<circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/>`,
    outline:      `<circle cx="5" cy="12" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="19" cy="12" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    outline_thin: `<circle cx="5" cy="12" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="12" cy="12" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="19" cy="12" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/>`,
  },
  more_vertical: {
    solid:        `<circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="5" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="19" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="5" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="12" cy="12" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="12" cy="19" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/>`,
  },
  drag_dot: {
    solid:        `<circle cx="9" cy="6" r="1.5" fill="currentColor"/><circle cx="15" cy="6" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="18" r="1.5" fill="currentColor"/><circle cx="15" cy="18" r="1.5" fill="currentColor"/>`,
    outline:      `<circle cx="9" cy="6" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="15" cy="6" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="9" cy="12" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="15" cy="12" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="9" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="15" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    outline_thin: `<circle cx="9" cy="6" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="15" cy="6" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="9" cy="12" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="15" cy="12" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="9" cy="18" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="15" cy="18" r="1.5" stroke="currentColor" stroke-width="1" fill="none"/>`,
  },
}

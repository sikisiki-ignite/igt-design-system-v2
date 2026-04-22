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
  | 'calendar_chevron_left'
  | 'calendar_chevron_right'
  | 'chevron_up'
  | 'chevron_down'
  | 'chevron_left'
  | 'chevron_right'
  | 'chevron_up_small'
  | 'chevron_down_small'
  | 'chevron_left_small'
  | 'chevron_right_small'
  | 'chevron_double_left'
  | 'chevron_double_right'
  | 'arrow_up'
  | 'arrow_down'
  | 'arrow_left'
  | 'arrow_right'
  | 'arrow_right_top'
  | 'arrow_upload'
  | 'arrow_download'
  | 'arrow_updown'
  | 'arrow_right_left'
  | 'arrow_reply'
  | 'x'
  | 'x_small'
  | 'home'
  | 'undo'
  | 'repeat'
  // Status / Feedback
  | 'check'
  | 'check_circle'
  | 'x_circle'
  | 'information'
  | 'warning'
  | 'failure'
  | 'question'
  | 'lock'
  | 'unlock'
  | 'prohibition'
  | 'speaker_on'
  | 'speaker_off'
  // Action
  | 'plus'
  | 'minus'
  | 'search'
  | 'refresh'
  | 'filter'
  | 'setting'
  | 'delete'
  | 'write'
  | 'send_message'
  | 'share'
  | 'plus_circle'
  | 'plus_square'
  | 'minus_circle'
  | 'menu'
  | 'list'
  | 'link'
  | 'attachment'
  | 'pin'
  | 'hash'
  | 'qrcode'
  // Media
  | 'camera'
  | 'picture'
  | 'play_circle'
  | 'mic'
  | 'music'
  | 'video_play'
  // Time
  | 'time'
  // Object / Content
  | 'eyes_on'
  | 'eyes_off'
  | 'calendar'
  | 'person'
  | 'person_group'
  | 'bell'
  | 'bookmark'
  | 'star'
  | 'star_rounded'
  | 'more_horizontal'
  | 'more_vertical'
  | 'drag_dot'
  | 'mail'
  | 'message'
  | 'map'
  | 'map_location'
  | 'building'
  | 'globe'
  | 'device_mobile'
  | 'device_pc'
  | 'folder'
  | 'document'
  | 'heart'
  | 'thumb_up'
  | 'thumb_down'
  | 'tag'
  | 'ticket'
  | 'won'
  // Document
  | 'document_paper_solid'
  // Shape
  | 'circle'
  | 'triangle'

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
  // ── Calendar Navigation (Figma: icon_calendar_chevron_left/right) ───────
  // Figma 원본 filled shape — viewBox 기준 스케일 변환
  // solid = Figma 원본 filled, outline = stroke 버전
  calendar_chevron_left: {
    solid:   `<g transform="translate(5 0) scale(1.9701)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.09006C0 5.83131 0.097875 5.57256 0.295875 5.37456L5.35838 0.312057C5.61263 0.0476815 5.9895 -0.0603187 6.345 0.0330563C6.7005 0.125306 6.97725 0.402056 7.0695 0.757556C7.16175 1.11193 7.056 1.48993 6.7905 1.74418L2.4435 6.09118L6.7905 10.4382C7.05487 10.6924 7.16175 11.0704 7.0695 11.4248C6.97725 11.7803 6.7005 12.0571 6.345 12.1493C5.9895 12.2427 5.61263 12.1347 5.35838 11.8703L0.295875 6.80781C0.106875 6.61768 0 6.36006 0 6.09231" fill="currentColor"/></g>`,
    outline: `<path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  calendar_chevron_right: {
    solid:   `<g transform="translate(5 0) scale(1.9769)"><path d="M1.01499 12.1412C0.756237 12.1412 0.497487 12.04 0.294987 11.8487C0.106066 11.659 0 11.4021 0 11.1344C0 10.8666 0.106066 10.6097 0.294987 10.42L4.64874 6.06624L0.294987 1.72374C0.106066 1.53399 0 1.27713 0 1.00936C0 0.7416 0.106066 0.484739 0.294987 0.294987C0.484739 0.106066 0.741599 0 1.00936 0C1.27712 0 1.53399 0.106066 1.72374 0.294987L6.78624 5.35749C6.97516 5.54724 7.08122 5.8041 7.08122 6.07186C7.08122 6.33963 6.97516 6.59649 6.78624 6.78624L1.72374 11.8487C1.53249 12.04 1.27374 12.1412 1.01499 12.1412Z" fill="currentColor"/></g>`,
    outline: `<path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  // ── Navigation ─────────────────────────────────────────────────────────
  chevron_up: {
    // Figma: 622:36243 solid / 622:36255 outline_2dp
    solid:        `<g transform="translate(5.5968,6.5856) scale(1.0001,1.0001)"><path d="M4.85084 0.738323C5.6512 -0.2461 7.15401 -0.246116 7.95436 0.738323L12.3538 6.15336C13.4154 7.46029 12.4857 9.41378 10.802 9.4141H2.00318C0.319456 9.41381 -0.610165 7.46029 0.451426 6.15336L4.85084 0.738323Z" fill="currentColor"/></g>`,
    outline:      `<path d="M5 15L12 8L19 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M5 15L12 8L19 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_down: {
    // Figma: 622:36270 solid / 622:36275 outline_2dp
    solid:        `<g transform="translate(5.5968,7.9992) scale(1.0001,1.0001)"><path d="M10.802 0C12.4857 0.000319506 13.4153 1.95382 12.3538 3.26074L7.95436 8.67578C7.15401 9.66023 5.6512 9.66022 4.85084 8.67578L0.451426 3.26074C-0.610165 1.95381 0.319455 0.000297268 2.00318 0H10.802Z" fill="currentColor"/></g>`,
    outline:      `<path d="M5 9L12 16L19 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M5 9L12 16L19 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_left: {
    // Figma: 622:36290 solid / 622:36295 outline_2dp
    solid:        `<g transform="translate(6.0864,5.5968) scale(0.9999,1.0001)"><path d="M6.15329 0.451321C7.46015 -0.610113 9.41353 0.31955 9.41403 2.00308V10.8019C9.41374 12.4856 7.46022 13.4153 6.15329 12.3537L0.738252 7.95425C-0.246023 7.15386 -0.246145 5.65104 0.738252 4.85073L6.15329 0.451321Z" fill="currentColor"/></g>`,
    outline:      `<path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_right: {
    // Figma: 622:36364 solid / 622:36369 outline_2dp
    solid:        `<g transform="translate(8.5008,5.5968) scale(0.9999,1.0001)"><path d="M0 2.00305C0.000497903 0.319538 1.95388 -0.610083 3.26074 0.451291L8.67578 4.8507C9.66019 5.65102 9.66011 7.15384 8.67578 7.95422L3.26074 12.3536C1.95381 13.4152 0.000297342 12.4856 0 10.8019V2.00305Z" fill="currentColor"/></g>`,
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
  chevron_left_small: {
    outline:      `<path d="M13 7L8 12L13 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M13 7L8 12L13 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_right_small: {
    outline:      `<path d="M11 7L16 12L11 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M11 7L16 12L11 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_double_left: {
    outline:      `<path d="M11 5L4 12L11 19M19 5L12 12L19 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M11 5L4 12L11 19M19 5L12 12L19 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  chevron_double_right: {
    outline:      `<path d="M13 5L20 12L13 19M5 5L12 12L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M13 5L20 12L13 19M5 5L12 12L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_up: {
    // Figma: 622:35880 solid / 622:35886 outline_2dp
    solid:        `<g transform="translate(4.2048,3.2088) scale(0.9999,0.9999)"><path d="M6.84941 0.336529C7.43855 -0.143953 8.30708 -0.11006 8.85624 0.439068L15.1492 6.73204C16.0934 7.67698 15.4246 9.29236 14.0887 9.29258H8.79569V16.7926C8.79536 17.3445 8.34768 17.7925 7.79569 17.7926C7.24361 17.7926 6.79602 17.3446 6.79569 16.7926V9.29258H1.50273C0.16653 9.29252 -0.502404 7.677 0.442179 6.73204L6.73515 0.439068L6.84941 0.336529Z" fill="currentColor"/></g>`,
    outline:      `<path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_down: {
    // Figma: 622:35898 solid / 622:35904 outline_2dp
    solid:        `<g transform="translate(4.2048,3.0000) scale(0.9999,1.0001)"><path d="M7.79584 0C8.34808 5.36058e-05 8.79584 0.447749 8.79584 1V8.5H14.0888C15.425 8.50014 16.0941 10.1156 15.1494 11.0605L8.85639 17.3535L8.74213 17.4561C8.15301 17.9365 7.28446 17.9026 6.7353 17.3535L0.442327 11.0605C-0.502545 10.1156 0.166584 8.50006 1.50287 8.5H6.79584V1C6.79584 0.447716 7.24356 4.82823e-08 7.79584 0Z" fill="currentColor"/></g>`,
    outline:      `<path d="M12 5V19M19 12L12 19L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M12 5V19M19 12L12 19L5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_left: {
    // Figma: 622:35916 solid / 622:35922 outline_2dp
    solid:        `<g transform="translate(3.2088,4.2048) scale(0.9999,0.9999)"><path d="M6.73204 0.442183C7.677 -0.502409 9.29252 0.166532 9.29258 1.50273V6.7957H16.7926C17.3446 6.79602 17.7926 7.24361 17.7926 7.7957C17.7925 8.34768 17.3445 8.79538 16.7926 8.7957H9.29258V14.0887C9.29234 15.4246 7.67697 16.0934 6.73204 15.1492L0.439068 8.85625C-0.110059 8.30708 -0.143953 7.43856 0.336529 6.84941L0.439068 6.73515L6.73204 0.442183Z" fill="currentColor"/></g>`,
    outline:      `<path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_right: {
    // Figma: 622:35934 solid / 622:35946 outline_2dp
    solid:        `<g transform="translate(3.0000,4.2048) scale(1.0000,0.9999)"><path d="M8.5 1.50291C8.50002 0.166571 10.1156 -0.502563 11.0605 0.442359L17.3535 6.73533C17.9392 7.32112 17.9393 8.27066 17.3535 8.85642L11.0605 15.1494C10.1156 16.0942 8.50011 15.4251 8.5 14.0888V8.79587H1C0.447736 8.79587 3.35012e-05 8.34813 0 7.79587C-6.79613e-08 7.24359 0.447715 6.79587 1 6.79587H8.5V1.50291Z" fill="currentColor"/></g>`,
    outline:      `<path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  x: {
    outline:      `<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  x_small: {
    outline:      `<path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  arrow_right_top: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M13 5V7H17.586L7 17.586L8.414 19L19 8.414V13H21V5H13Z" fill="currentColor"/>`,
    outline:      `<path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_upload: {
    solid:        `<path d="M12 3L6 9H9V17H15V9H18L12 3ZM5 20H19V22H5V20Z" fill="currentColor"/>`,
    outline:      `<path d="M12 3L6 9H9V17H15V9H18L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M5 20H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M12 3L6 9H9V17H15V9H18L12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M5 20H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  arrow_download: {
    solid:        `<path d="M12 21L6 15H9V7H15V15H18L12 21ZM5 4H19V2H5V4Z" fill="currentColor"/>`,
    outline:      `<path d="M12 21L6 15H9V7H15V15H18L12 21Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M5 4H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M12 21L6 15H9V7H15V15H18L12 21Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M5 4H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  arrow_updown: {
    solid:        `<path d="M8 3L4 8H7V16H5L9 21L13 16H11V8H14L10 3ZM17 3L21 8H19V19H17V8H15L17 3Z" fill="currentColor"/>`,
    outline:      `<path d="M7 3L3 8H6V18H8V8H11L7 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M17 21L21 16H18V6H16V16H13L17 21Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M7 3L3 8H6V18H8V8H11L7 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M17 21L21 16H18V6H16V16H13L17 21Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_right_left: {
    solid:        `<path d="M15 4L21 10H17V14H15V10H11L15 4Z" fill="currentColor"/><path d="M9 20L3 14H7V10H9V14H13L9 20Z" fill="currentColor"/>`,
    outline:      `<path d="M7 16H20L16 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M17 8H4L8 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M7 16H20L16 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M17 8H4L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  arrow_reply: {
    outline:      `<path d="M9 10H5V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M5 10C7 6 10 4 14 4C18.418 4 22 7.582 22 12C22 16.418 18.418 20 14 20H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M9 10H5V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M5 10C7 6 10 4 14 4C18.418 4 22 7.582 22 12C22 16.418 18.418 20 14 20H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  home: {
    // Figma: 622:38836 solid
    solid:        `<g transform="translate(3.0000,3.0000) scale(1.000000,0.999994)"><path d="M7.2002 0.599719C8.26671 -0.199906 9.73329 -0.199906 10.7998 0.599719L16 4.50011L16.2295 4.6837C17.3483 5.63031 18 7.0247 18 8.50011V15.5001C18 16.8808 16.8807 18.0001 15.5 18.0001H13.5C12.1193 18.0001 11 16.8808 11 15.5001V14.0001C10.9999 13.1717 10.3284 12.5001 9.5 12.5001H8.5C7.67162 12.5001 7.00007 13.1717 7 14.0001V15.5001C6.99999 16.8808 5.8807 18.0001 4.5 18.0001H2.5C1.1193 18.0001 1.33966e-05 16.8808 0 15.5001V8.50011C4.06831e-05 6.92638 0.741013 5.44436 2 4.50011L7.2002 0.599719Z" fill="currentColor"/></g>`,
    outline:      `<path d="M3 12L12 3L21 12V20C21 20.552 20.552 21 20 21H15V15H9V21H4C3.448 21 3 20.552 3 20V12Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M3 12L12 3L21 12V20C21 20.552 20.552 21 20 21H15V15H9V21H4C3.448 21 3 20.552 3 20V12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  undo: {
    outline:      `<path d="M3 7v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M3 12c2-5 7-7 12-5s7 7 5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M3 7v5h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M3 12c2-5 7-7 12-5s7 7 5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  repeat: {
    outline:      `<path d="M17 1L21 5L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M3 11V9a4 4 0 014-4h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M7 23L3 19L7 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M21 13v2a4 4 0 01-4 4H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M17 1L21 5L17 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M3 11V9a4 4 0 014-4h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M7 23L3 19L7 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M21 13v2a4 4 0 01-4 4H3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
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
    // Figma: 622:36628 solid
    solid:        `<g transform="translate(1.9992,1.9992) scale(1.000080,1.000080)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 9C9.44772 9 9 9.44772 9 10V13.5C9 14.0523 9.44772 14.5 10 14.5C10.5523 14.5 11 14.0523 11 13.5V10C11 9.44772 10.5523 9 10 9ZM10 5.25C9.30964 5.25 8.75 5.80964 8.75 6.5C8.75 7.19036 9.30964 7.75 10 7.75C10.6904 7.75 11.25 7.19036 11.25 6.5C11.25 5.80964 10.6904 5.25 10 5.25Z" fill="currentColor"/></g>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 11V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="8" r="1" fill="currentColor"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 11V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="8" r="0.75" fill="currentColor"/>`,
  },
  warning: {
    // Figma: 622:36698 solid
    solid:        `<g transform="translate(1.8312,2.4912) scale(0.999936,0.999951)"><path d="M7.14009 1.74607C8.48827 -0.58197 11.8506 -0.582076 13.1987 1.74607L19.8627 13.2558C21.2135 15.589 19.5293 18.5093 16.8335 18.5097H3.50533C0.809575 18.5093 -0.874574 15.589 0.476029 13.2558L7.14009 1.74607ZM10.1694 12.2597C9.47914 12.2598 8.91954 12.8195 8.91939 13.5097C8.91939 14.2001 9.47904 14.7597 10.1694 14.7597C10.8597 14.7597 11.4194 14.2001 11.4194 13.5097C11.4192 12.8195 10.8597 12.2597 10.1694 12.2597ZM10.1694 5.50974C9.61721 5.50975 9.16954 5.95759 9.16939 6.50974V10.0097C9.16939 10.562 9.61711 11.0097 10.1694 11.0097C10.7217 11.0097 11.1694 10.562 11.1694 10.0097V6.50974C11.1692 5.95758 10.7216 5.50974 10.1694 5.50974Z" fill="currentColor"/></g>`,
    outline:      `<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/>`,
    outline_thin: `<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M12 9V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="17" r="0.75" fill="currentColor"/>`,
  },
  failure: {
    // Figma: 622:36659 solid
    solid:        `<g transform="translate(1.9992,1.9992) scale(1.000080,1.000080)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 12.25C9.30964 12.25 8.75 12.8096 8.75 13.5C8.75 14.1904 9.30964 14.75 10 14.75C10.6904 14.75 11.25 14.1904 11.25 13.5C11.25 12.8096 10.6904 12.25 10 12.25ZM10 5.5C9.44772 5.5 9 5.94772 9 6.5V10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10V6.5C11 5.94772 10.5523 5.5 10 5.5Z" fill="currentColor"/></g>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="1" fill="currentColor"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 7V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="0.75" fill="currentColor"/>`,
  },
  question: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4c-1.657 0-3 1.343-3 3a1 1 0 1 0 2 0 1 1 0 1 1 2 0c0 .55-.226 1.05-.587 1.41L11 11.83V13a1 1 0 1 0 2 0v-1.586l1-1A2.999 2.999 0 0 0 12 6zm1 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9.5 9.5C9.5 8.119 10.619 7 12 7s2.5 1.119 2.5 2.5c0 1.062-.659 1.969-1.594 2.333L12 12v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="1" fill="currentColor"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9.5 9.5C9.5 8.119 10.619 7 12 7s2.5 1.119 2.5 2.5c0 1.062-.659 1.969-1.594 2.333L12 12v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="0.75" fill="currentColor"/>`,
  },
  lock: {
    // Figma: 622:36803 solid
    solid:        `<g transform="translate(4.2504,2.2512) scale(0.999948,0.999877)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.75 0C10.3734 0 12.5 2.12665 12.5 4.75V7.5H12.75C14.2688 7.5 15.5 8.73122 15.5 10.25V16.75C15.5 18.2688 14.2688 19.5 12.75 19.5H2.75C1.23122 19.5 0 18.2688 0 16.75V10.25C0 8.73122 1.23122 7.5 2.75 7.5H3V4.75C3 2.12665 5.12665 0 7.75 0ZM7.75 12C7.33579 12 7 12.3358 7 12.75V14.25C7 14.6642 7.33579 15 7.75 15C8.16421 15 8.5 14.6642 8.5 14.25V12.75C8.5 12.3358 8.16421 12 7.75 12ZM7.75 1.5C5.95507 1.5 4.5 2.95507 4.5 4.75V7.5H11V4.75C11 2.95507 9.54493 1.5 7.75 1.5Z" fill="currentColor"/></g>`,
    outline:      `<rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="1" fill="currentColor"/>`,
    outline_thin: `<rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="0.75" fill="currentColor"/>`,
  },
  unlock: {
    // Figma: 622:36810 solid
    solid:        `<g transform="translate(4.0008,1.9992) scale(0.999900,1.000080)"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C10.7614 0 13 2.23858 13 5H11C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5V7.5H13C14.6569 7.5 16 8.84315 16 10.5V17C16 18.6569 14.6569 20 13 20H3C1.34315 20 0 18.6569 0 17V10.5C0 8.84315 1.34315 7.5 3 7.5V5C3 2.23858 5.23858 0 8 0ZM8 12C7.44772 12 7 12.4477 7 13V14.5C7 15.0523 7.44772 15.5 8 15.5C8.55228 15.5 9 15.0523 9 14.5V13C9 12.4477 8.55228 12 8 12Z" fill="currentColor"/></g>`,
    outline:      `<rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7 11V7a5 5 0 019.9-1" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="1" fill="currentColor"/>`,
    outline_thin: `<rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 11V7a5 5 0 019.9-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="16" r="0.75" fill="currentColor"/>`,
  },
  prohibition: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-6.364 3.222L18.778 18.364A8 8 0 015.636 5.222zm12.728 13.556L5.222 5.636A8 8 0 0118.364 18.778z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M5.636 5.636L18.364 18.364" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5.636 5.636L18.364 18.364" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  speaker_on: {
    solid:        `<path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/><path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline:      `<path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  speaker_off: {
    outline:      `<path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M23 9L17 15M17 9L23 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M23 9L17 15M17 9L23 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
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
    // Figma: no solid variant (622:37532 outline only)
    outline:      `<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  refresh: {
    outline:      `<path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 6.219 2.5L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M21 3v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 6.219 2.5L21 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M21 3v5h-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  filter: {
    // Figma: no solid variant (622:37834 outline only)
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
  send_message: {
    solid:        `<path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor"/>`,
    outline:      `<path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  share: {
    solid:        `<circle cx="18" cy="5" r="3" fill="currentColor"/><circle cx="6" cy="12" r="3" fill="currentColor"/><circle cx="18" cy="19" r="3" fill="currentColor"/><path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline:      `<circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  plus_circle: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 7a1 1 0 10-2 0v2H9a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V9z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  plus_square: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm10 4a1 1 0 10-2 0v2H9a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V9z" fill="currentColor"/>`,
    outline:      `<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  minus_circle: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8 11a1 1 0 100 2h8a1 1 0 100-2H8z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  menu: {
    outline:      `<path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  list: {
    outline:      `<path d="M8 6H21M8 12H21M8 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/>`,
    outline_thin: `<path d="M8 6H21M8 12H21M8 18H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="4" cy="6" r="0.75" fill="currentColor"/><circle cx="4" cy="12" r="0.75" fill="currentColor"/><circle cx="4" cy="18" r="0.75" fill="currentColor"/>`,
  },
  link: {
    outline:      `<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  attachment: {
    outline:      `<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  pin: {
    solid:        `<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zm-9 3a3 3 0 100-6 3 3 0 000 6z" fill="currentColor"/>`,
    outline:      `<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  hash: {
    outline:      `<path d="M4 9H20M4 15H20M10 3L8 21M16 3L14 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M4 9H20M4 15H20M10 3L8 21M16 3L14 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  qrcode: {
    outline:      `<rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><rect x="5" y="5" width="3" height="3" fill="currentColor"/><rect x="16" y="5" width="3" height="3" fill="currentColor"/><rect x="5" y="16" width="3" height="3" fill="currentColor"/><path d="M14 14H17V17H14V14ZM17 17H21V21H17V17ZM14 17H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="5" y="5" width="3" height="3" fill="currentColor"/><rect x="16" y="5" width="3" height="3" fill="currentColor"/><rect x="5" y="16" width="3" height="3" fill="currentColor"/>`,
  },

  // ── Media ────────────────────────────────────────────────────────────────
  camera: {
    solid:        `<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11zm-11-3a4 4 0 100-8 4 4 0 000 8z" fill="currentColor"/>`,
    outline:      `<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  picture: {
    solid:        `<path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="currentColor"/>`,
    outline:      `<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  play_circle: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 6.5l6 3.5-6 3.5V8.5z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M10 8L16 12L10 16V8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 8L16 12L10 16V8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  mic: {
    solid:        `<path d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4zm6 9a1 1 0 012 0 8 8 0 01-7 7.938V20h2a1 1 0 010 2H9a1 1 0 010-2h2v-2.062A8 8 0 014 10a1 1 0 012 0 6 6 0 0012 0z" fill="currentColor"/>`,
    outline:      `<rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M5 10a7 7 0 0014 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M12 19v3M9 22h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5 10a7 7 0 0014 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M12 19v3M9 22h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  music: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M21 3.5L9 5.5V18a3 3 0 11-2-2.83V7.277L21 5.277V3.5zM6 21a1 1 0 100-2 1 1 0 000 2zm12-2a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>`,
    outline:      `<path d="M9 18V6l12-2v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M9 18V6l12-2v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  video_play: {
    solid:        `<path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14H4a1 1 0 01-1-1V7a1 1 0 011-1h11v4z" fill="currentColor"/>`,
    outline:      `<rect x="2" y="7" width="13" height="10" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M15 10l5.553-2.776A.5.5 0 0121 7.723v8.554a.5.5 0 01-.724.447L15 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<rect x="2" y="7" width="13" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M15 10l5.553-2.776A.5.5 0 0121 7.723v8.554a.5.5 0 01-.724.447L15 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },

  // ── Time ─────────────────────────────────────────────────────────────────
  time: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 5a1 1 0 10-2 0v5.586l-2.707 2.707a1 1 0 001.414 1.414L13 13.414V7z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 7V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
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
    // Figma: 622:38012 solid (accurate transform from Figma insets)
    solid:        `<g transform="translate(3.0000,1.5000) scale(1.000000,1.000000)"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 0C13.0523 0 13.5 0.447715 13.5 1V1.5H13.7998C14.3434 1.5 14.8117 1.49893 15.1953 1.53027C15.5906 1.56259 15.984 1.63441 16.3623 1.82715C16.9265 2.11473 17.3853 2.57348 17.6729 3.1377C17.8656 3.51599 17.9374 3.90943 17.9697 4.30469C18.0011 4.68836 18 5.15665 18 5.7002V15.2998C18 15.8434 18.0011 16.3116 17.9697 16.6953C17.9374 17.0906 17.8656 17.484 17.6729 17.8623C17.3853 18.4265 16.9265 18.8853 16.3623 19.1729C15.984 19.3656 15.5906 19.4374 15.1953 19.4697C14.8116 19.5011 14.3434 19.5 13.7998 19.5H4.2002C3.65666 19.5 3.18836 19.5011 2.80469 19.4697C2.40944 19.4374 2.01599 19.3656 1.6377 19.1729C1.07348 18.8853 0.614726 18.4265 0.327153 17.8623C0.134403 17.484 0.0625898 17.0906 0.0302782 16.6953C-0.00106974 16.3116 6.72588e-06 15.8434 4.73493e-06 15.2998V5.7002C2.73834e-06 5.15664 -0.00106758 4.68836 0.0302782 4.30469C0.0625884 3.90944 0.134406 3.51599 0.327153 3.1377C0.614733 2.57347 1.07347 2.11472 1.6377 1.82715C2.01601 1.63439 2.40942 1.56258 2.80469 1.53027C3.18836 1.49893 3.65665 1.5 4.2002 1.5H4.5V1C4.5 0.44772 4.94773 7.71315e-06 5.5 0C6.05229 0 6.5 0.447715 6.5 1V1.5H11.5V1C11.5 0.44772 11.9477 7.71315e-06 12.5 0ZM4.2002 3.5C3.62366 3.5 3.25111 3.50126 2.96778 3.52441C2.69617 3.54661 2.59534 3.58418 2.5459 3.60938C2.35793 3.70521 2.20523 3.85793 2.10938 4.0459C2.08419 4.09534 2.04564 4.19614 2.02344 4.46777C2.00029 4.75111 2 5.12364 2 5.7002V7.5H16V5.7002C16 5.12365 15.9987 4.75111 15.9756 4.46777C15.9534 4.19619 15.9158 4.09534 15.8906 4.0459C15.7948 3.85794 15.6421 3.70522 15.4541 3.60938C15.4047 3.58419 15.3037 3.54661 15.0322 3.52441C14.7489 3.50127 14.3763 3.5 13.7998 3.5H13.5V4C13.5 4.55228 13.0523 5 12.5 5C11.9477 4.99999 11.5 4.55228 11.5 4V3.5H6.5V4C6.5 4.55228 6.05229 5 5.5 5C4.94773 4.99999 4.5 4.55228 4.5 4V3.5H4.2002Z" fill="currentColor"/></g>`,
    outline:      `<rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  person: {
    // Figma: 622:38175 solid
    solid:        `<g transform="translate(4.2192,1.9992) scale(1.000013,1.000080)"><path d="M10.2316 13.5C12.8487 13.5 15.0973 15.3578 15.5919 17.9277C15.7986 19.0026 14.9755 19.9997 13.881 20H1.7794C0.62105 19.9997 -0.228259 18.9095 0.0547934 17.7861L0.119247 17.5527C0.831984 15.1578 3.03792 13.5 5.55577 13.5H10.2316Z" fill="currentColor"/><path d="M7.78038 0C11.0941 1.74988e-05 13.7804 2.6863 13.7804 6C13.7804 9.3137 11.0941 12 7.78038 12C4.46672 11.9999 1.78038 9.31367 1.78038 6C1.78038 2.68633 4.46672 6.35888e-05 7.78038 0Z" fill="currentColor"/></g>`,
    outline:      `<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  bell: {
    // Figma: 622:38351 solid
    solid:        `<g transform="translate(2.5008,1.9992) scale(0.999916,1.000080)"><path d="M11.5 18C12.0523 18 12.5 18.4477 12.5 19C12.5 19.5523 12.0523 20 11.5 20H7.5C6.94772 20 6.5 19.5523 6.5 19C6.5 18.4477 6.94772 18 7.5 18H11.5Z" fill="currentColor"/><path d="M9.5 0C13.9183 0 17.5 3.58172 17.5 8V11C17.5 11.847 17.715 12.7163 17.9854 13.3652C18.121 13.6908 18.2552 13.9243 18.3545 14.0566C18.3577 14.0609 18.3613 14.0645 18.3643 14.0684C18.7364 14.214 19 14.5762 19 15C19 15.5523 18.5523 16 18 16H1C0.447715 16 0 15.5523 0 15C0 14.5762 0.263573 14.214 0.635742 14.0684C0.638692 14.0645 0.64231 14.0609 0.645508 14.0566C0.744762 13.9243 0.879014 13.6908 1.01465 13.3652C1.28502 12.7163 1.5 11.847 1.5 11V8C1.5 3.58172 5.08172 0 9.5 0Z" fill="currentColor"/></g>`,
    outline:      `<path d="M18 16v-5a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M18 16v-5a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  bookmark: {
    // Figma: 622:37783 solid
    solid:        `<g transform="translate(3.4992,3.0000) scale(1.000094,0.999995)"><path d="M15 0C16.1046 0 17 0.895431 17 2V17.0859C16.9999 18.8676 14.8458 19.7598 13.5859 18.5L8.5 13.4141L3.41406 18.5C2.15416 19.7598 0.000121446 18.8676 0 17.0859V2C0 0.895431 0.89543 0 2 0H15Z" fill="currentColor"/></g>`,
    outline:      `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  star: {
    solid:        `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>`,
    outline:      `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  // Figma: 622:37431 star_rounded solid — accurate transform from Figma insets
  star_rounded: {
    solid:        `<g transform="translate(1.6464,1.1928) scale(0.999995,1.000096)"><path d="M8.99001 0.87152C9.50937 -0.254303 11.076 -0.289292 11.6609 0.766051L11.7146 0.87152L13.9871 5.80121L19.3797 6.44086C20.6507 6.59156 21.1612 8.16262 20.2215 9.03168L16.2351 12.7172L17.2937 18.0424C17.5432 19.2979 16.2065 20.2692 15.0896 19.644L10.3523 16.9907L5.61501 19.644C4.49812 20.2691 3.16146 19.2978 3.41091 18.0424L4.46853 12.7172L0.483177 9.03168C-0.456204 8.16263 0.0541409 6.5917 1.32497 6.44086L6.71658 5.80121L8.99001 0.87152Z" fill="currentColor"/></g>`,
    outline:      `<g transform="translate(1.6464,1.1928) scale(0.999995,1.000096)"><path d="M8.99001 0.87152C9.50937 -0.254303 11.076 -0.289292 11.6609 0.766051L11.7146 0.87152L13.9871 5.80121L19.3797 6.44086C20.6507 6.59156 21.1612 8.16262 20.2215 9.03168L16.2351 12.7172L17.2937 18.0424C17.5432 19.2979 16.2065 20.2692 15.0896 19.644L10.3523 16.9907L5.61501 19.644C4.49812 20.2691 3.16146 19.2978 3.41091 18.0424L4.46853 12.7172L0.483177 9.03168C-0.456204 8.16263 0.0541409 6.5917 1.32497 6.44086L6.71658 5.80121L8.99001 0.87152Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/></g>`,
    outline_thin: `<g transform="translate(1.6464,1.1928) scale(0.999995,1.000096)"><path d="M8.99001 0.87152C9.50937 -0.254303 11.076 -0.289292 11.6609 0.766051L11.7146 0.87152L13.9871 5.80121L19.3797 6.44086C20.6507 6.59156 21.1612 8.16262 20.2215 9.03168L16.2351 12.7172L17.2937 18.0424C17.5432 19.2979 16.2065 20.2692 15.0896 19.644L10.3523 16.9907L5.61501 19.644C4.49812 20.2691 3.16146 19.2978 3.41091 18.0424L4.46853 12.7172L0.483177 9.03168C-0.456204 8.16263 0.0541409 6.5917 1.32497 6.44086L6.71658 5.80121L8.99001 0.87152Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round" fill="none"/></g>`,
  },
  more_horizontal: {
    // Figma: no solid variant — dots are filled circles in outline style (622:38722 outline)
    outline:      `<circle cx="5" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="19" cy="12" r="2" fill="currentColor"/>`,
    outline_thin: `<circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/>`,
  },
  more_vertical: {
    // Figma: no solid variant — dots are filled circles in outline style (622:38701 outline)
    outline:      `<circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/>`,
    outline_thin: `<circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/>`,
  },
  drag_dot: {
    // Figma: no solid variant — dots are filled circles in outline style (622:38796 outline)
    outline:      `<circle cx="9" cy="6" r="2" fill="currentColor"/><circle cx="15" cy="6" r="2" fill="currentColor"/><circle cx="9" cy="12" r="2" fill="currentColor"/><circle cx="15" cy="12" r="2" fill="currentColor"/><circle cx="9" cy="18" r="2" fill="currentColor"/><circle cx="15" cy="18" r="2" fill="currentColor"/>`,
    outline_thin: `<circle cx="9" cy="6" r="1.5" fill="currentColor"/><circle cx="15" cy="6" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="18" r="1.5" fill="currentColor"/><circle cx="15" cy="18" r="1.5" fill="currentColor"/>`,
  },
  person_group: {
    solid:        `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h16zm-5-10a4 4 0 100-8 4 4 0 000 8zm5 2a4 4 0 100-8 4 4 0 000 8zm3 10v-2a4 4 0 00-3-3.87" fill="currentColor"/>`,
    outline:      `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  mail: {
    solid:        `<path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>`,
    outline:      `<rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M2 8L12 14L22 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 8L12 14L22 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  message: {
    solid:        `<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="currentColor"/>`,
    outline:      `<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  map: {
    solid:        `<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" fill="currentColor"/>`,
    outline:      `<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zm7-4v16M15 6v16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zm7-4v16M15 6v16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  map_location: {
    solid:        `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="currentColor"/>`,
    outline:      `<path d="M12 22s8-5.6 8-12a8 8 0 10-16 0c0 6.4 8 12 8 12z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M12 22s8-5.6 8-12a8 8 0 10-16 0c0 6.4 8 12 8 12z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  building: {
    solid:        `<path d="M3 21V3h12v5h6v13H3zm5-14H6v2h2V7zm0 4H6v2h2v-2zm0 4H6v2h2v-2zm4-8h-2v2h2V7zm0 4h-2v2h2v-2zm3 4h-5v6h5v-6zm2-4h-2v2h2v-2zm0-4h-2v2h2V7zm2 4h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="currentColor"/>`,
    outline:      `<rect x="3" y="3" width="12" height="18" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><rect x="15" y="8" width="6" height="13" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7 7H9M7 11H9M7 15H9M11 7H13M11 11H13M17 12H19M17 16H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<rect x="3" y="3" width="12" height="18" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="15" y="8" width="6" height="13" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 7H9M7 11H9M7 15H9M11 7H13M11 11H13M17 12H19M17 16H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  globe: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-1.18 0-2.31-1.27-3.05-3.35A18.43 18.43 0 0112 16c1.08 0 2.11.11 3.05.65C14.31 18.73 13.18 20 12 20zm4.93-3.68A20.4 20.4 0 0012 14a20.4 20.4 0 00-4.93.32C6.39 13.56 6 12.82 6 12c0-.82.39-1.56 1.07-2.32A20.4 20.4 0 0012 10a20.4 20.4 0 004.93-.32C17.61 10.44 18 11.18 18 12c0 .82-.39 1.56-1.07 2.32zM12 8c-1.08 0-2.11-.11-3.05-.65C9.69 5.27 10.82 4 12 4s2.31 1.27 3.05 3.35A18.43 18.43 0 0112 8zM4 12c0-1.17.27-2.28.74-3.27A22.34 22.34 0 004 12c0 1.17.27 2.28.74 3.27A22.34 22.34 0 004 12zm16 0c0 1.17-.27 2.28-.74 3.27A22.34 22.34 0 0020 12c0-1.17-.27-2.28-.74-3.27A22.34 22.34 0 0020 12z" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 3c-2.761 0-5 4.03-5 9s2.239 9 5 9 5-4.03 5-9-2.239-9-5-9z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 12h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 3c-2.761 0-5 4.03-5 9s2.239 9 5 9 5-4.03 5-9-2.239-9-5-9z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 12h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  device_mobile: {
    solid:        `<path d="M17 1H7a2 2 0 00-2 2v18a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2zm-5 19a1 1 0 110-2 1 1 0 010 2zm4-4H8V4h8v12z" fill="currentColor"/>`,
    outline:      `<rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="18" r="1" fill="currentColor"/>`,
    outline_thin: `<rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="18" r="0.75" fill="currentColor"/>`,
  },
  device_pc: {
    solid:        `<path d="M20 3H4a1 1 0 00-1 1v13a1 1 0 001 1h7v2H8a1 1 0 000 2h8a1 1 0 000-2h-3v-2h7a1 1 0 001-1V4a1 1 0 00-1-1zm-1 13H5V5h14v11z" fill="currentColor"/>`,
    outline:      `<rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 21H16M12 17V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 21H16M12 17V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  folder: {
    solid:        `<path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" fill="currentColor"/>`,
    outline:      `<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  document: {
    solid:        `<path fill-rule="evenodd" clip-rule="evenodd" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm0 1.5V8h4.5L14 3.5z" fill="currentColor"/>`,
    outline:      `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  heart: {
    // Figma: 622:38756 solid
    solid:        `<g transform="translate(0.7896,2.6328) scale(1.000004,0.999944)"><path d="M16.4687 0C18.4715 0.000121823 20.3276 1.09853 21.4345 2.94043C22.7633 5.15137 22.7522 7.98751 21.4032 10.5264C19.4302 14.2402 15.0433 17.5033 12.6054 19.1162C12.1814 19.3962 11.6968 19.5371 11.2109 19.5371C10.725 19.537 10.2411 19.3961 9.8173 19.1162C7.37838 17.5033 2.99254 14.2402 1.01945 10.5264C-0.328472 7.98751 -0.340571 5.15138 0.988202 2.94043C2.09614 1.09953 3.95114 0.000115437 5.95402 0C8.92256 0 10.5027 1.8645 11.2109 3.06152C11.9189 1.86452 13.4998 0 16.4687 0Z" fill="currentColor"/></g>`,
    outline:      `<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
  thumb_up: {
    solid:        `<path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zm-7 11H5a2 2 0 01-2-2v-7a2 2 0 012-2h2v11z" fill="currentColor"/>`,
    outline:      `<path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M7 22H5a2 2 0 01-2-2v-7a2 2 0 012-2h2" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M7 22H5a2 2 0 01-2-2v-7a2 2 0 012-2h2" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  thumb_down: {
    solid:        `<path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10zm7-13h2a2 2 0 012 2v7a2 2 0 01-2 2h-2V2z" fill="currentColor"/>`,
    outline:      `<path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M17 2H19a2 2 0 012 2v7a2 2 0 01-2 2H17" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M17 2H19a2 2 0 012 2v7a2 2 0 01-2 2H17" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  tag: {
    solid:        `<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill="currentColor"/><circle cx="7" cy="7" r="1.5" fill="white"/>`,
    outline:      `<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/>`,
    outline_thin: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><circle cx="7" cy="7" r="1" fill="currentColor"/>`,
  },
  ticket: {
    solid:        `<path d="M2 9a3 3 0 010-6h20a3 3 0 010 6v1a3 3 0 010 6H2a3 3 0 010-6V9zM14 4H2v3h12V4zM2 17h12v3H2v-3zm14-13v16h6V4h-6z" fill="currentColor"/>`,
    outline:      `<path d="M15 5H19a2 2 0 012 2v3a3 3 0 000 4v3a2 2 0 01-2 2h-4M9 5H5a2 2 0 00-2 2v3a3 3 0 000 4v3a2 2 0 002 2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M9 5v14M15 5v14" stroke="currentColor" stroke-width="2" stroke-dasharray="2 2" fill="none"/>`,
    outline_thin: `<path d="M15 5H19a2 2 0 012 2v3a3 3 0 000 4v3a2 2 0 01-2 2h-4M9 5H5a2 2 0 00-2 2v3a3 3 0 000 4v3a2 2 0 002 2h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M9 5v14M15 5v14" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2" fill="none"/>`,
  },
  won: {
    outline:      `<path d="M4 7L8.5 17L12 9L15.5 17L20 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M3 11H21M3 15H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    outline_thin: `<path d="M4 7L8.5 17L12 9L15.5 17L20 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M3 11H21M3 15H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  },
  // ── Document ────────────────────────────────────────────────────────────
  // igt_core_icon_document_paper_solid — Figma 원본 viewBox 30×33.333
  // 균등 스케일: 세로 기준 ×0.72 (24/33.333), 가로 중앙 정렬 offset +1.2
  // matrix(0.9, 0, 0, 1, 1.2, 0) = 기존 비균등(×0.8 X, ×0.72 Y) paths를 균등 비율로 보정
  document_paper_solid: {
    solid: `<g transform="matrix(0.9,0,0,1,1.2,0)"><path d="M12 6C12 8.651 14.388 10.8 17.333 10.8H24V20.4C24 22.388 22.209 24 20 24H4C1.791 24 0 22.388 0 20.4V3.6C0 1.612 1.791 0 4 0H12V6Z" fill="currentColor"/><path d="M14.823 0.0914C15.321 -0.0943 15.895 0.00837 16.276 0.3515L23.609 6.952C23.991 7.295 24.105 7.811 23.898 8.26C23.692 8.708 23.206 9 22.667 9H17.333C15.492 9 14 7.657 14 6V1.2C14 0.715 14.325 0.277 14.823 0.0914Z" fill="currentColor"/></g>`,
    outline: `<g transform="matrix(0.9,0,0,1,1.2,0)"><path d="M12 6C12 8.651 14.388 10.8 17.333 10.8H24V20.4C24 22.388 22.209 24 20 24H4C1.791 24 0 22.388 0 20.4V3.6C0 1.612 1.791 0 4 0H12V6Z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M14.823 0.0914C15.321 -0.0943 15.895 0.00837 16.276 0.3515L23.609 6.952C23.991 7.295 24.105 7.811 23.898 8.26C23.692 8.708 23.206 9 22.667 9H17.333C15.492 9 14 7.657 14 6V1.2C14 0.715 14.325 0.277 14.823 0.0914Z" stroke="currentColor" stroke-width="1.5" fill="none"/></g>`,
  },

  // ── Shape ────────────────────────────────────────────────────────────────
  circle: {
    solid:        `<circle cx="12" cy="12" r="9" fill="currentColor"/>`,
    outline:      `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/>`,
    outline_thin: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  },
  triangle: {
    solid:        `<path d="M12 3L22 20H2L12 3Z" fill="currentColor"/>`,
    outline:      `<path d="M12 3L22 20H2L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
    outline_thin: `<path d="M12 3L22 20H2L12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  },
}

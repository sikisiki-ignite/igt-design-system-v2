# IGT Design System — 토큰 네이밍 컨벤션

> 작성: 2026-04-12  
> 모든 CSS Custom Property는 이 규칙을 따른다.

---

## 계층 구조

```
Layer 1: Primitive   --ref-[palette]-[scale]
Layer 2: Semantic    --sys-[category]-[variant]-[property]
Layer 3: Component   --[comp]-[variant]-[property]
```

**참조 방향은 반드시 위에서 아래로만:**
```
Component → Semantic → Primitive
```

컴포넌트 CSS에서 직접 `--ref-*` 또는 hex 값 사용 금지.  
단, `transparent` / `currentColor` / `inherit`은 허용.

---

## Layer 1: Primitive (--ref-*)

### 색상
```
--ref-[color]-[scale]
--ref-[color]-opacity-[scale]
--ref-[color]-variation-[scale]
```

| 예시 | 설명 |
|------|------|
| `--ref-blue-500` | 파란색 500단계 |
| `--ref-blue-opacity-100` | 파란색 투명도 변형 100 |
| `--ref-grey-variation-80` | 그레이 variation |
| `--ref-white` | 흰색 |
| `--ref-black` | 검정 |
| `--ref-transparent` | 투명 |

사용 가능한 팔레트: `grey`, `blue`, `red`, `green`, `yellow`, `orange`, `teal`, `purple`

### 공간 (spacing)
```
--ref-space-[value]
```
| 예시 | 값 |
|------|----|
| `--ref-space-0` | 0px |
| `--ref-space-2` | 2px |
| `--ref-space-4` | 4px |
| `--ref-space-8` | 8px |
| `--ref-space-12` | 12px |
| `--ref-space-16` | 16px |
| `--ref-space-20` | 20px |
| `--ref-space-24` | 24px |
| `--ref-space-32` | 32px |
| `--ref-space-40` | 40px |
| `--ref-space-48` | 48px |
| `--ref-space-56` | 56px |
| `--ref-space-64` | 64px |

### 폰트
```
--ref-font-weight-[value]
```
| 예시 | 값 |
|------|----|
| `--ref-font-weight-400` | Regular |
| `--ref-font-weight-500` | Medium |
| `--ref-font-weight-600` | Semibold |
| `--ref-font-weight-700` | Bold |

---

## Layer 2: Semantic (--sys-*)

### 패턴
```
--sys-[category]-[variant]-[state]
```

### 카테고리 목록

| 카테고리 | 의미 | 예시 |
|---------|------|------|
| `surface` | 배경면 | `--sys-surface-base` |
| `background` | 페이지 배경 | `--sys-background-base` |
| `content` | 텍스트/아이콘 색상 | `--sys-content-neutral-default` |
| `border` | 선/테두리 색상 | `--sys-border-neutral-subtle` |
| `container` | 채움 배경 | `--sys-container-brand-solid-default` |
| `interactive` | 인터랙션 오버레이 | `--sys-interactive-hover-overlay-neutral` |

### Variant 목록

| variant | 의미 |
|---------|------|
| `brand` | 브랜드 (파란색) |
| `neutral` | 중립 (회색) |
| `danger` | 위험 (빨간색) |
| `success` | 성공 (초록색) |
| `warning` | 경고 (노란색) |
| `on-brand` | 브랜드 위의 텍스트 |
| `on-neutral` | 중립 위의 텍스트 |
| `on-danger` | 위험 위의 텍스트 |

### State suffix

| suffix | 의미 |
|--------|------|
| `default` | 기본 |
| `subtle` | 약함 |
| `strong` | 강함 |
| `muted` | 흐릿함 |
| `disabled` | 비활성 |
| `hover` | 호버 |
| `focus` | 포커스 |

---

## Layer 3: Component (--[comp]-*)

### 패턴
```
--[comp]-[variant]-[property]
--[comp]-[variant]-[property]-[state]
```

### comp 약어 목록

| 약어 | 컴포넌트 |
|------|---------|
| `btn` | Button |
| `field` | Input, Select, TextArea (공유) |
| `checkbox` | Checkbox |
| `badge` | Badge |
| `table` | Table |
| `modal` | Modal |
| `toast` | Toast |
| `chip` | Chip |
| `avatar` | Avatar |
| `label` | Label |
| `tab` | Tab |
| `nav` | Navigation |
| `alert` | Alert |
| `skeleton` | Skeleton |
| `divider` | Divider |
| `accordion` | Accordion |
| `pagination` | Pagination |
| `slider` | Slider |
| `switch` | Switch |
| `radio` | Radio |
| `rating` | Rating |
| `popover` | Popover |
| `overlay` | Overlay / Backdrop |

### property 목록

| property | 의미 |
|---------|------|
| `bg` | 배경색 |
| `text` | 텍스트 색상 |
| `border` | 테두리 색상 |
| `icon` | 아이콘 색상 |
| `placeholder` | 플레이스홀더 색상 |

### 예시

```css
/* Button */
--btn-primary-fill-bg: var(--sys-container-brand-solid-default);
--btn-primary-fill-bg-hover: var(--sys-container-brand-solid-strong);
--btn-primary-fill-text: var(--sys-content-on-brand-solid);
--btn-primary-fill-border: transparent;

/* Field (Input/Select 공유) */
--field-outline-bg: var(--sys-surface-base);
--field-outline-border: var(--sys-border-neutral-subtle);
--field-outline-border-focus: var(--sys-border-brand-default);
--field-outline-border-error: var(--sys-border-danger-default);
--field-text-value: var(--sys-content-neutral-default);
--field-text-placeholder: var(--sys-content-neutral-subtle);
```

---

## 타이포그래피 토큰 (--text-*)

```
--text-[role]-[scale]-[property]
```

| role | 의미 |
|------|------|
| `heading` | 제목 |
| `body` | 본문 |
| `label` | 레이블/버튼 텍스트 |
| `caption` | 캡션/도움말 |

| scale | 크기 |
|-------|------|
| `xs` | 가장 작음 |
| `sm` | 작음 |
| `md` | 중간 |
| `lg` | 큼 |
| `xl` | 가장 큼 |

| property | 의미 |
|---------|------|
| `size` | font-size |
| `line-height` | line-height |
| `weight` | font-weight |

예: `--text-label-md-size`, `--text-body-sm-line-height`

---

## 크기 토큰 (--size-*)

```
--size-comp-[role]-[scale]    ← 컴포넌트 크기
--size-icon-[scale]           ← 아이콘 크기
```

| 예시 | 값 |
|------|----|
| `--size-comp-height-xs` | 24px |
| `--size-comp-height-sm` | 32px |
| `--size-comp-height-md` | 40px |
| `--size-comp-height-lg` | 48px |
| `--size-comp-height-xl` | 56px |
| `--size-comp-padding-sm` | 8px |
| `--size-comp-padding-md` | 12px |
| `--size-comp-padding-lg` | 16px |
| `--size-icon-sm` | 16px |
| `--size-icon-md` | 20px |
| `--size-icon-lg` | 24px |

---

## Radius 토큰 (--radius-*)

```
--radius-[scale]
```

| 토큰 | 의미 |
|------|------|
| `--radius-none` | 0px |
| `--radius-xs` | 2px |
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-full` | 9999px (pill) |

---

## Z-index 토큰 (--z-*)

| 토큰 | 값 | 용도 |
|------|----|----|
| `--z-dropdown` | 100 | 드롭다운, 셀렉트 |
| `--z-sticky` | 200 | Sticky 헤더 |
| `--z-overlay` | 300 | Backdrop |
| `--z-modal` | 400 | Modal, Dialog |
| `--z-toast` | 500 | Toast |
| `--z-tooltip` | 600 | Tooltip |

---

## Elevation 토큰 (--elevation-*)

| 토큰 | 용도 |
|------|------|
| `--elevation-floating` | 플로팅 요소 (Toast) |
| `--elevation-popover` | Popover, Tooltip |
| `--elevation-dialog` | Modal, Dialog |

---

## 금지 사항

```css
/* ❌ 금지: hex 직접 사용 */
.igt-button { background: #3485fa; }

/* ❌ 금지: ref 토큰 직접 사용 */
.igt-button { background: var(--ref-blue-500); }

/* ✅ 허용: 컴포넌트 토큰 사용 */
.igt-button { background: var(--btn-primary-fill-bg); }

/* ✅ 허용: transparent / currentColor */
.igt-button { border-color: transparent; }
.igt-icon { color: currentColor; }
```

# IGT Design System — Design Tokens 가이드

> AI 바이브 코딩 시 색상, 폰트, 간격 등 모든 스타일 값은 이 문서의 토큰을 사용한다.
> hex 값이나 px 하드코딩 금지. `globals.css`가 단일 소스.

> **hex 참고값 안내**
> 아래 표의 hex 값은 **라이트/다크 모드 참고값**입니다. 실제 코드에는 반드시 CSS 변수를 사용하세요.
> 토큰 체계 변경 시 실제 값은 [`src/styles/globals.css`](../src/styles/globals.css)를 확인하세요.

---

## 토큰 계층 규칙

```
--ref-*   →  원시값 (색상 팔레트, 수치). 컴포넌트에서 직접 사용 금지.
--sys-*   →  시맨틱 토큰 (용도 기반). 컴포넌트에서 기본 참조.
--[comp]- →  컴포넌트 전용 토큰 (btn-, input- 등). 해당 컴포넌트 내부에서만.
```

---

## 색상 토큰 (Semantic)

### 텍스트 (Content)

| 토큰 | hex (라이트) | hex (다크) | 용도 |
|------|-------------|-----------|------|
| `--sys-content-neutral-strong` | `#191f28` | `#ffffff` | 제목, 강조 텍스트 |
| `--sys-content-neutral-default` | `#000c1ecc` | `#fdfdfee3` | 일반 본문 텍스트 |
| `--sys-content-neutral-muted` | `#00132b94` | `#f8f8ffab` | 보조 텍스트 |
| `--sys-content-neutral-subtle` | `#03183275` | `#f2f2ff78` | 약한 보조 텍스트 |
| `--sys-content-neutral-weak` | `#0019364f` | `#e8e8fd5c` | 비활성 힌트 텍스트 |
| `--sys-content-neutral-disabled` | `#001d3a2e` | `#e0e0ff45` | disabled 상태 텍스트 |
| `--sys-content-neutral-placeholder` | `#0019364f` | `#e8e8fd5c` | input placeholder |
| `--sys-content-brand-default` | `#3182f6` | `#3485fa` | 브랜드 링크/강조 |
| `--sys-content-brand-strong` | `#2272eb` | `#449bff` | 브랜드 강조 (hover 등) |
| `--sys-content-status-danger-default` | `#f04452` | `#f04251` | 에러 텍스트 |
| `--sys-content-status-danger-strong` | `#d22030` | `#ff7a84` | 에러 강조 텍스트 |
| `--sys-content-status-warning-default` | `#ee8f11` | `#ffb84a` | 경고 텍스트 |
| `--sys-content-status-success-default` | `#02a262` | `#02a262` | 성공 텍스트 |
| `--sys-content-status-info-default` | `#3182f6` | `#3485fa` | 정보 텍스트 |

### 배경 (Surface / Background)

| 토큰 | hex (라이트) | hex (다크) | 용도 |
|------|-------------|-----------|------|
| `--sys-surface-base` | `#ffffff` | `#17171c` | 페이지 기본 배경 |
| `--sys-surface-subtle` | `#f2f4f6` | `#2c2c35` | 카드, 패널 배경 |
| `--sys-surface-overlay` | `#ffffff` | `#2c2c35` | 모달, 드롭다운 배경 |
| `--sys-surface-raised` | `#ffffff` | `#1c1c22` | 부유 엘리먼트 배경 |
| `--sys-surface-floating` | `#191f28` | `#4d4d59` | 툴팁 배경 (어두운 색) |
| `--sys-surface-grouped-default` | `#f9fafb` | `#202027` | 그룹 영역 배경 |
| `--sys-background-base` | `#ffffff` | `#17171c` | 앱 전체 배경 |
| `--sys-background-subtle` | `#f6f7f9` | `#101013` | 사이드바, 헤더 배경 |
| `--sys-background-inverse` | `#191f28` | `#ffffff` | 반전 배경 (어두운 칩 등) |

### 컨테이너 (버튼/배지 배경)

> tint 토큰은 Alert 배경에도 사용됩니다. 다크 모드에서 값이 달라지므로 주의.

| 토큰 | hex (라이트) | hex (다크) | 용도 |
|------|-------------|-----------|------|
| `--sys-container-brand-solid-default` | `#3182f6` | `#3485fa` | 브랜드 채움 버튼 배경 |
| `--sys-container-brand-solid-strong` | `#2272eb` | `#449bff` | 브랜드 채움 버튼 hover |
| `--sys-container-brand-tint-default` | `#64a8ff26` | `#3485fa33` | 브랜드 소프트 배경 (Alert info) |
| `--sys-container-neutral-solid-default` | `#4e5968` | `#62626d` | 회색 채움 배경 |
| `--sys-container-neutral-tint-default` | `#0220470d` | `#d9d9ff1c` | 회색 소프트 배경 (Alert neutral) |
| `--sys-container-danger-solid-default` | `#f04452` | `#f04251` | 위험 채움 배경 |
| `--sys-container-danger-tint-default` | `#fb889026` | `#f0425133` | 위험 소프트 배경 (Alert danger) |
| `--sys-container-warning-solid-default` | `#ffc342` | `#ffc342` | 경고 채움 배경 |
| `--sys-container-warning-tint-default` | `#ffc34233` | `#ffc34226` | 경고 소프트 배경 (Alert warning) |
| `--sys-container-success-solid-default` | `#03b26c` | `#03b26c` | 성공 채움 배경 |
| `--sys-container-success-tint-default` | `#3fd59926` | `#03b26c26` | 성공 소프트 배경 (Alert success) |

### 테두리 (Border)

| 토큰 | hex (라이트) | hex (다크) | 용도 |
|------|-------------|-----------|------|
| `--sys-border-neutral-default` | `#001d3a2e` | `#e0e0ff45` | 일반 테두리 |
| `--sys-border-neutral-subtle` | `#001b371a` | `#dedeff30` | 약한 테두리 |
| `--sys-border-neutral-strong` | `#0019364f` | `#e8e8fd5c` | 강한 테두리 |
| `--sys-border-neutral-disabled` | `#00173305` | `#d1d1fd0d` | disabled 테두리 |
| `--sys-border-brand-default` | `#3182f6` | `#3485fa` | 포커스/선택 테두리 |
| `--sys-border-danger-default` | `#f04452` | `#f04251` | 에러 테두리 |
| `--sys-border-warning-default` | `#faa131` | `#ffc342` | 경고 테두리 |
| `--sys-border-success-default` | `#03b26c` | `#02a262` | 성공 테두리 |

### 컬러드 배경 위 텍스트 (ContentOn)

| 토큰 | hex (라이트) | hex (다크) | 용도 |
|------|-------------|-----------|------|
| `--sys-content-on-brand-solid` | `#ffffff` | `#ffffff` | 브랜드 채움 배경 위 텍스트 (흰색) |
| `--sys-content-on-brand-tint` | `#2272eb` | `#449bff` | 브랜드 소프트 배경 위 텍스트 |
| `--sys-content-on-neutral-solid` | `#ffffff` | `#ffffff` | 회색 채움 배경 위 텍스트 (흰색) |
| `--sys-content-on-neutral-tint` | — | `#e4e4e5` | 회색 소프트 배경 위 텍스트 (다크 전용) |
| `--sys-content-on-danger-solid` | `#ffffff` | `#ffffff` | 위험 채움 배경 위 텍스트 (흰색) |
| `--sys-content-on-danger-tint` | `#e42939` | `#fa616d` | 위험 소프트 배경 위 텍스트 |

### 인터랙션

| 토큰 | hex (라이트) | hex (다크) | 용도 |
|------|-------------|-----------|------|
| `--sys-interactive-hover-overlay-neutral` | `#0220470d` | `#d9d9ff1c` | 회색 hover 오버레이 |
| `--sys-interactive-hover-overlay-accent` | `#64a8ff26` | `#3485fa33` | 브랜드 hover 오버레이 |
| `--sys-interactive-hover-overlay-danger` | `#fb889026` | `#f0425133` | 위험 hover 오버레이 |
| `--sys-interactive-focus-border-accent` | `#3182f6` | `#3485fa` | 포커스 링 (기본) |
| `--sys-interactive-focus-border-danger` | `#f04452` | `#f04251` | 포커스 링 (에러) |

### 오버레이

| 토큰 | hex | 용도 |
|------|-----|------|
| `--sys-overlay-backdrop-dark-default` | `#0000007a` | 모달 백드롭 |
| `--sys-overlay-backdrop-dark-strong` | `#000000a3` | 강한 백드롭 |

---

## 타이포그래피

### 폰트 패밀리

```css
font-family: 'IGTSans', sans-serif;  /* 단일 폰트 사용 */
```

### 폰트 사이즈

| 토큰 | 값 | 주 용도 |
|------|----|--------|
| `--ref-font-size-9` | 9px | - |
| `--ref-font-size-10` | 10px | 뱃지, 극소 레이블 |
| `--ref-font-size-11` | 11px | 보조 캡션 |
| `--ref-font-size-12` | 12px | 캡션, 헬퍼 텍스트 |
| `--ref-font-size-13` | 13px | 소형 레이블 |
| `--ref-font-size-14` | 14px | **본문 기본** |
| `--ref-font-size-15` | 15px | 본문 중간 |
| `--ref-font-size-16` | 16px | 소제목 |
| `--ref-font-size-18` | 18px | 중제목 |
| `--ref-font-size-20` | 20px | 대제목 |
| `--ref-font-size-24` | 24px | 페이지 제목 |

> 컴포넌트 내부에서는 `--ref-font-size-*` 직접 참조 허용 (sys 타이포 토큰 미정의).

### 폰트 굵기

| 토큰 | 값 | 용도 |
|------|----|------|
| `--ref-font-weight-400` | 400 | 일반 본문 |
| `--ref-font-weight-500` | 500 | 중간 강조 |
| `--ref-font-weight-600` | 600 | 레이블, 버튼 |
| `--ref-font-weight-700` | 700 | 제목, 강한 강조 |

### 줄 높이

| 토큰 | 값 |
|------|----|
| `--ref-line-height-16` | 16px |
| `--ref-line-height-18` | 18px |
| `--ref-line-height-20` | 20px |
| `--ref-line-height-22` | 22px |
| `--ref-line-height-24` | 24px |
| `--ref-line-height-26` | 26px |
| `--ref-line-height-28` | 28px |

---

## 간격 (Spacing)

> 레이아웃 간격, padding, gap에는 아래 값을 사용한다.

| 값 | 주 용도 |
|----|--------|
| `4px` | 아이콘-텍스트 간격, 인라인 소간격 |
| `8px` | 소형 패딩, 관련 요소 묶음 |
| `12px` | 컴포넌트 내부 패딩 (sm) |
| `16px` | 컴포넌트 내부 패딩 (md), 섹션 내 간격 |
| `20px` | 컴포넌트 내부 패딩 (lg) |
| `24px` | 카드 패딩, 섹션 간격 |
| `32px` | 대형 섹션 간격 |
| `40px` | 페이지 레벨 간격 |
| `48px` | 최대 섹션 여백 |

---

## 컴포넌트 크기 (Size Scale)

### 높이

| 토큰 | 값 | 컴포넌트 |
|------|----|--------|
| `--size-comp-height-xs` | 24px | 소형 배지, 태그 |
| `--size-comp-height-sm` | 32px | sm 버튼/인풋 |
| `--size-comp-height-md` | 36px | **기본(md) 버튼/인풋** |
| `--size-comp-height-lg` | 40px | lg 버튼/인풋 |

### 수평 패딩

| 토큰 | 값 |
|------|----|
| `--size-comp-padding-xs` | 8px |
| `--size-comp-padding-sm` | 12px |
| `--size-comp-padding-md` | 16px |
| `--size-comp-padding-lg` | 20px |

### 아이콘 크기

| 토큰 | 값 |
|------|----|
| `--size-icon-xs` | 12px |
| `--size-icon-sm` | 16px |
| `--size-icon-md` | 20px |
| `--size-icon-lg` | 24px |
| `--size-icon-xl` | 28px |

---

## 테두리 반경 (Radius)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--radius-none` | 0px | 테두리 없음 |
| `--radius-xs` | 2px | 배지, 태그 |
| `--radius-sm` | 6px | 버튼, 인풋 |
| `--radius-md` | 8px | 카드, 드롭다운 |
| `--radius-lg` | 10px | 패널 |
| `--radius-xl` | 12px | 모달 |
| `--radius-2xl` | 16px | 대형 카드 |
| `--radius-3xl` | 24px | 바텀시트 |
| `--radius-full` | 9999px | 칩, 알약형 |

---

## 테두리 굵기

| 토큰 | 값 |
|------|----|
| `--border-width-none` | 0px |
| `--border-width-default` | 1px |
| `--border-width-thick` | 2px |

---

## SideNavigation 컴포넌트 토큰

| 토큰 | 용도 |
|------|------|
| `--nav-item-bg-hover` | NavItem hover 배경 |
| `--nav-item-bg-pressed` | NavItem active/pressed 배경 |
| `--nav-item-bg-current-neutral` | neutral tone 현재 메뉴 배경 |
| `--nav-item-bg-current-accent` | accent tone 현재 메뉴 배경 (brand 파란색) |
| `--nav-item-text-normal` | NavItem 기본 텍스트 |
| `--nav-item-text-current-neutral` | neutral 현재 메뉴 텍스트 |
| `--nav-item-text-current-accent` | accent 현재 메뉴 텍스트 (brand) |
| `--nav-item-text-disabled` | 비활성 NavItem 텍스트 |
| `--nav-section-header-text` | NavSectionHeader 텍스트 |

---

## Typography Scale

> 텍스트 크기/굵기/줄높이는 아래 토큰 조합을 사용. `--ref-font-size-*` 대신 가능하면 scale 토큰 사용.

| 토큰 그룹 | size | weight | line-height | 용도 |
|-----------|------|--------|-------------|------|
| `--text-display-sm-*` | 32px | 600 | 40px | 대형 디스플레이 |
| `--text-display-md-*` | 40px | 700 | 52px | |
| `--text-display-lg-*` | 48px | 700 | 56px | |
| `--text-heading-sm-*` | 18px | 600 | 26px | 섹션 제목 |
| `--text-heading-md-*` | 20px | 600 | 28px | 페이지 제목 |
| `--text-heading-lg-*` | 24px | 600 | 34px | |
| `--text-body-xs-*` | 14px | 400 | 20px | 본문 소 |
| `--text-body-sm-*` | 15px | 400 | 22px | 본문 |
| `--text-body-md-*` | 16px | 400 | 24px | 본문 기본 |
| `--text-label-xs-*` | 12px | 500 | 16px | 라벨 소 |
| `--text-label-sm-*` | 14px | 500 | 20px | 라벨 |
| `--text-label-md-*` | 15px | 500 | 22px | 라벨 기본 |
| `--text-caption-sm-*` | 11px | 400 | 16px | 캡션 소 |
| `--text-caption-md-*` | 12px | 400 | 16px | 캡션 |

```css
/* 사용 예: 페이지 제목 */
h1 {
  font-size: var(--text-heading-md-size);
  font-weight: var(--text-heading-md-weight);
  line-height: var(--text-heading-md-line-height);
}
```

| 토큰 | 값 |
|------|----|
| `--font-family-base` | `'IGTSans', -apple-system, BlinkMacSystemFont, sans-serif` |

---

## Elevation (그림자)

| 토큰 | 용도 |
|------|------|
| `--elevation-subtle` | 카드, 상단 네비게이션 등 약한 그림자 |
| `--elevation-floating` | 드롭다운, 팝오버 등 부유 요소 |
| `--elevation-popover` | 툴팁, 컨텍스트 메뉴 |
| `--elevation-dialog` | 모달, 대화상자 |

---

## 사용 예시

```css
/* ✅ 올바른 사용 */
.my-card {
  background: var(--sys-surface-subtle);
  border: var(--border-width-default) solid var(--sys-border-neutral-default);
  border-radius: var(--radius-md);
  padding: 16px 24px;
  color: var(--sys-content-neutral-default);
  font-size: var(--ref-font-size-14);
  font-weight: var(--ref-font-weight-400);
}

/* ❌ 금지 */
.my-card {
  background: #f2f4f6;       /* ref 직접 금지 */
  border: 1px solid #d1d6db; /* hex 하드코딩 금지 */
  color: rgba(0,0,0,0.8);    /* 임의 색상 금지 */
  font-size: 14px;           /* px 하드코딩 금지 */
}
```

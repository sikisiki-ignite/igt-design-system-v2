# IGT Typography Hierarchy

> 소스: `src/styles/globals.css` · 폰트: IGTSans (300/400/500/600/700)
> 토큰을 변경하지 말 것. 이 문서는 기존 토큰의 활용 기준을 정리한 것이다.

---

## 1. Full Scale

| 토큰 | Size | Weight | Line Height | 역할 |
|------|------|--------|-------------|------|
| `--text-display-lg-*` | 48px | 700 | 56px | Hero 타이틀, 랜딩 최상단 |
| `--text-display-md-*` | 40px | 700 | 52px | 대시보드 KPI 숫자, 마케팅 섹션 |
| `--text-display-sm-*` | 32px | 600 | 40px | 페이지 최상단 제목, 설정 페이지 헤더 |
| `--text-heading-lg-*` | 24px | 600 | 34px | Dialog title, Side panel header |
| `--text-heading-md-*` | 20px | 600 | 28px | 카드 그룹 제목, 폼 섹션 헤더 |
| `--text-heading-sm-*` | 18px | 600 | 26px | Card title, Sidebar section, Table caption |
| `--text-body-md-*`    | 16px | 400 | 24px | **기본값** — body 태그, 모달 본문, 설명글 |
| `--text-body-sm-*`    | 15px | 400 | 22px | Card body, Article paragraph, Tooltip body |
| `--text-body-xs-*`    | 14px | 400 | 20px | Table cell, List item, Input value |
| `--text-label-md-*`   | 15px | 500 | 22px | Button lg, Nav primary item |
| `--text-label-sm-*`   | 14px | 500 | 20px | Button md, Form label, Badge, Tab |
| `--text-label-xs-*`   | 12px | 500 | 16px | Button sm, Table header, Tag |
| `--text-caption-md-*` | 12px | 400 | 16px | Helper text, Error msg, Timestamp, Tooltip |
| `--text-caption-sm-*` | 11px | 400 | 16px | Badge count, Footnote, Overline label |

각 토큰은 `-size` / `-weight` / `-line-height` 3개 세트로 구성된다.

```css
/* 사용 예시 */
.card-title {
  font-size:   var(--text-heading-sm-size);
  font-weight: var(--text-heading-sm-weight);
  line-height: var(--text-heading-sm-line-height);
}
```

---

## 2. Hierarchy Map (AI 우선순위 기준)

레벨이 낮을수록 UI에서 사용 빈도가 높아야 한다. display는 한 페이지에 최대 1회.

| 레벨 | 토큰 | 용도 |
|------|------|------|
| 1 | `display-lg / md` | Hero, KPI 대형 숫자 — 페이지당 최대 1회 |
| 2 | `display-sm` | 페이지 제목 (h1 수준) |
| 3 | `heading-lg` | 모달 제목, 사이드 패널 헤더 |
| 4 | `heading-md` | 카드 그룹 헤더, 폼 섹션 구분자 (h2 수준) |
| 5 | `heading-sm` | 개별 카드 제목, 사이드바 섹션명 (h3 수준) |
| — | **`body-md`** | **기본값. body 전체 기준** |
| 6 | `body-sm` | 카드 내부 설명, 목록 항목, 툴팁 본문 |
| 7 | `body-xs` | 테이블 셀, 인풋 값 — 밀집 레이아웃 |
| 8 | `label-md / sm / xs` | 버튼, 폼 라벨, 탭, 뱃지, 테이블 헤더 |
| 9 | `caption-md / sm` | 도움말, 에러 메시지, 타임스탬프 |

---

## 3. 컴포넌트별 토큰 매핑

| 컴포넌트 / 요소 | 토큰 | 비고 |
|----------------|------|------|
| Page title (h1) | `display-sm` | 페이지당 1회 |
| Modal / Drawer title | `heading-lg` | |
| Card title | `heading-sm` | |
| Section divider | `heading-md` | 폼 / 콘텐츠 그룹 구분 |
| Button lg | `label-md` | |
| Button md (기본) | `label-sm` | |
| Button sm | `label-xs` | |
| Form label | `label-sm` | |
| Input / Select value | `body-xs` | placeholder 동일, 색상만 muted |
| Helper / Error text | `caption-md` | error: danger색, helper: ink-3 |
| Table header (th) | `label-xs` | uppercase + letter-spacing 권장 |
| Table cell (td) | `body-xs` | |
| Tab label | `label-sm` | |
| Badge / Tag | `label-xs` or `caption-md` | label-xs: 인터랙티브, caption: 정적 |
| Tooltip | `caption-md` | |
| Toast message | `body-xs` | 제목 있으면 label-sm + body-xs |
| KPI 대형 숫자 | `display-md` | 단위/라벨은 label-xs 또는 caption-md |
| Breadcrumb | `body-xs` | current 페이지는 weight 500 |
| Sidebar nav item | `body-sm` or `label-sm` | active: weight 600 |
| Empty state title | `heading-md` | 설명: body-sm |
| Dropdown item | `body-xs` | |

---

## 4. 패턴별 위계 조합

### Dashboard KPI Card
```
label-xs (uppercase)  ← 카드 레이블 "월간 매출"
display-md            ← KPI 숫자 "₩ 48,320,000"
label-sm              ← 변화량 "↑ 12.4%"
caption-md            ← 기준 날짜
```

### Modal
```
heading-lg  ← 모달 제목
body-sm     ← 본문 설명
label-sm    ← 버튼
```

### Form
```
heading-sm  ← 섹션 제목 "계정 정보"
label-sm    ← 필드 라벨
body-xs     ← 인풋 값
caption-md  ← 도움말 / 에러 메시지
```

### Table
```
heading-sm  ← 카드/섹션 제목
label-xs    ← th (테이블 헤더)
body-xs     ← td (테이블 셀)
caption-md  ← 부가 정보 (날짜, 메모)
```

---

## 5. 규칙

### DO
- CSS에서 `--text-{role}-{size}-{prop}` 변수만 참조
- font-size, font-weight, line-height를 항상 3개 세트로 적용
- body 기본값은 body-md — 이미 `body` 태그에 설정됨
- label 계열은 인터랙티브 요소(버튼·탭·폼 라벨)에만 사용
- 한 컴포넌트에서 최대 2~3단계 위계만 사용

### DON'T
- `font-size: 14px` 등 px/rem 하드코딩 금지
- `--ref-font-*` 프리미티브 토큰을 컴포넌트에서 직접 사용 금지
- display 계열을 본문/카드/폼 내부에 사용 금지
- font-weight만 임의로 바꿔 강조 — 토큰 role을 전환해야
- 한 뷰에 display 3개 이상 중첩 사용 금지

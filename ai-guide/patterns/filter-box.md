# Filter Box Pattern — Backoffice

> AI 코드 생성 기준 문서. 모든 케이스를 열거하지 않는다.
> 컴포넌트 조합 규칙과 타입 정의만 제공하면 AI가 나머지를 조합한다.

---

## 레퍼런스 샘플

**Figma:** `node-id=15063-27577` / fileKey: `pTCGG9i5xgx1HiVQ6EFJRt`

이 샘플 하나에 아래 필터 타입이 모두 포함되어 있다.

---

## 레이아웃 규칙

```
컨테이너
  background: var(--sys-background-subtle)
  padding: 24px
  border-radius: 4px

라벨 열
  width: 112px (고정)
  padding-top: 8px (인라인 정렬) / 10px (블록 정렬)
  typography: label/md/semibold
  color: var(--sys-content-neutral-default)

필터 행
  layout: 2컬럼 (gap: 80px)
  각 컬럼: flex-1, gap: 9px (라벨과 인풋 사이)
  단일 필터가 넓은 경우: width: 528px 고정

하단 버튼 영역
  separator: Divider (emphasis="default", inset="none")
  layout: 우측 정렬
  버튼 순서: Reset(variant="outline") → Search(variant="fill", leadingIcon=<SearchIcon />)
```

> spacing은 `--ref-space-*` 토큰으로 표현한다 (예: padding: 24px → `var(--ref-space-24)`).
> `--sys-space-*`가 미정의이므로 예외적으로 `--ref-space-*` 직접 참조를 허용한다.
> 주요 값 매핑: 6px=`--ref-space-6`, 8px=`--ref-space-8`, 9px=px 그대로(토큰 없음),
> 10px=`--ref-space-10`, 24px=`--ref-space-24`, 80px=px 그대로(토큰 없음)

---

## 필터 타입 정의

### TYPE 1 — text-search
카테고리 선택 후 텍스트 검색. 가장 기본형.

```
구성: Select(카테고리) + Input(검색어 입력)
Select: width shrink, placeholder="카테고리명"
Input: flex-1, label 없음, hint/error 없음, prefix/suffix 없음
```

**사용 예:** 딜러 번호 검색, 사용자 이름 검색

---

### TYPE 2 — choice-chip
고정 옵션 중 단일/복수 선택. 옵션이 5개 이하일 때.

```
구성: ChoiceChipGroup + ChoiceChipGroupItem × N (gap: 6px)
단일 선택: selectionType="single"
복수 선택: selectionType="multiple"
```

> ⚠️ selectionType은 ChoiceChip 개별 prop이 아니라 ChoiceChipGroup의 prop이다.
> ChoiceChip 단독 사용 시에는 selected 상태를 부모에서 직접 관리한다.

**사용 예:** Business ending in (아이템A / 아이템B)

---

### TYPE 3 — single-select
드롭다운 단일 선택. 옵션이 많거나 동적일 때.

```
구성: Select (flex-1)
placeholder="Select"
선택값 없음 상태: placeholder 색상 = var(--sys-content-neutral-subtle)
```

**사용 예:** Status 선택

---

### TYPE 4 — multi-select-with-chips
드롭다운 복수 선택. 선택된 항목을 InputChip으로 표시.

```
구성:
  Select (multiple, w-full)
  InputChip 목록 (flex-wrap, gap: 8px, size="sm", onRemove 연결)

InputChip 사용 방법:
  <InputChip label={item.label} value={item.value} onRemove={(val) => removeSelected(val)} size="sm" />
```

**사용 예:** Group 복수 선택

---

### TYPE 5 — radio-group
상호 배타적 옵션 선택. 옵션이 2~4개의 짧은 레이블일 때.

```
⚠️ Radio / RadioItem 컴포넌트 미구현 — 구현 전까지 아래 대안 사용:
  - ChoiceChipGroup selectionType="single"로 대체

목표 구성 (Radio 구현 후):
  RadioItem × N (gap: 8px, 인라인)
  RadioItem = Radio(size="md") + label 텍스트
```

**사용 예:** Setting — All / ON / OFF

---

### TYPE 6 — date-range
날짜 범위 선택.

```
구성:
  Select(날짜 기준) — Updated date / Created date 등 (선택적)
  DateRangePicker — 시작일 ~ 종료일 한 번에 선택

날짜 포맷: YYYY . MM . DD ~ YYYY . MM . DD (컴포넌트 내장)
trailing: calendar icon (컴포넌트 내장)
```

```tsx
// 단독 기간 선택
<DateRangePicker
  label="조회 기간"
  value={dateRange}
  onChange={setDateRange}
  fullWidth
/>

// 기준 Select + DateRangePicker 조합
<SearchboxGroup label="등록일">
  <Select options={dateTypeOptions} value={dateType} onChange={(v) => setDateType(v as string)} />
  <DateRangePicker value={dateRange} onChange={setDateRange} />
</SearchboxGroup>
```

**사용 예:** 업데이트 날짜 범위 지정

---

## 컴포넌트 Props 요약

| 컴포넌트 | 주요 Props | 비고 |
|----------|-----------|------|
| `Input` | `size="md"` | 필터에서는 `label` 없음, `hint`/`error` 없음 |
| `Select` | `size="md"`, `placeholder`, `multiple` | flex-1 or 고정폭 |
| `ChoiceChipGroup` | `selectionType("single"/"multiple")`, `size` | 그룹 단위 사용 권장 |
| `ChoiceChipGroupItem` | `value`, `label` | ChoiceChipGroup 내부에서 사용 |
| `InputChip` | `label`, `value`, `size="sm"`, `onRemove` | TYPE 4에서 선택 항목 표시 |
| `Button` | `variant("fill"/"outline")`, `size="md"`, `leadingIcon` | Search=fill+leadingIcon, Reset=outline |
| `Divider` | `emphasis="default"`, `inset="none"`, `orientation="horizontal"` | 버튼 영역 구분선 |
| `Radio` | — | **미구현** — ChoiceChipGroup으로 대체 |
| `DatePicker` | `label`, `value`, `onChange`, `fullWidth` | 단일 날짜 선택 |
| `DateRangePicker` | `label`, `value: DateRange`, `onChange`, `fullWidth` | TYPE 6 기간 선택 |

---

## AI 사용 가이드

이 문서를 컨텍스트로 제공하고 아래와 같이 요청한다:

```
ai-guide/patterns/filter-box.md 기준으로
다음 필터 조건을 가진 Filter Box를 구현해줘:

- 검색어: TYPE 1 (카테고리: 회원번호 / 이름)
- 가입 채널: TYPE 2 (Web / App / Admin)
- 상태: TYPE 3
- 권한 그룹: TYPE 4
- 등록일: TYPE 6
```

---

## 확장 케이스 (다른 레이아웃)

| 케이스 | 대응 방법 |
|--------|----------|
| 모달 안 필터 | 컨테이너 padding 조정, 컬럼 1개로 축소 |
| 사이드바 필터 | 컬럼 1개, 라벨 위 배치 (블록형) |
| 필터 수 1~2개 | 인라인 단일 행, 컨테이너 border-radius: 10px |
| 모바일 대응 | 미정 (backoffice = desktop only 기준) |

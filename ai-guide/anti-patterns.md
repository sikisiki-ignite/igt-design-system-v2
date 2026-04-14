# IGT Design System — Anti-patterns

> 하면 안 되는 것들. AI가 잘못된 방향으로 구현하는 걸 사전에 차단한다.
> 아래 패턴이 감지되면 즉시 수정할 것.

---

## 목차

1. [토큰 무시하고 값 하드코딩](#1-토큰-무시하고-값-하드코딩)
2. [구현된 컴포넌트 무시하고 새로 만들기](#2-구현된-컴포넌트-무시하고-새로-만들기)
3. [내부 CSS 클래스 외부에서 직접 사용](#3-내부-css-클래스-외부에서-직접-사용)
4. [잘못된 컴포넌트 선택](#4-잘못된-컴포넌트-선택)
5. [폼 에러 처리 잘못하기](#5-폼-에러-처리-잘못하기)
6. [로딩/빈 상태 직접 구현](#6-로딩빈-상태-직접-구현)
7. [버튼 조합 규칙 무시](#7-버튼-조합-규칙-무시)
8. [접근성 속성 누락](#8-접근성-속성-누락)

---

## 1. 토큰 무시하고 값 하드코딩

### ❌ 금지

```tsx
// hex 직접 사용
<div style={{ color: '#191f28', background: '#f2f4f6' }}>

// px 하드코딩
<div style={{ fontSize: '14px', fontWeight: 600, borderRadius: '8px' }}>

// rgba 임의 생성
<div style={{ color: 'rgba(0,0,0,0.8)', border: '1px solid rgba(0,0,0,0.1)' }}>

// ref 토큰 직접 참조 (컴포넌트에서)
<div style={{ background: 'var(--ref-grey-100)' }}>
```

### ✅ 올바른 방법

```tsx
<div style={{
  color: 'var(--sys-content-neutral-strong)',
  background: 'var(--sys-surface-subtle)',
  fontSize: 'var(--ref-font-size-14)',
  fontWeight: 'var(--ref-font-weight-600)',
  borderRadius: 'var(--radius-md)',
}}>
```

**규칙**: 색상은 `--sys-*`, 폰트/간격/반경은 `--ref-*` 또는 컴포넌트 토큰 사용.

---

## 2. 구현된 컴포넌트 무시하고 새로 만들기

### ❌ 금지

```tsx
// Button이 있는데 직접 만들기
<button className="my-btn" style={{ background: '#3182f6', color: '#fff', padding: '8px 16px' }}>
  저장
</button>

// Badge가 있는데 직접 만들기
<span style={{ background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '4px' }}>
  활성
</span>

// Input이 있는데 직접 만들기
<div>
  <label>이름</label>
  <input style={{ border: '1px solid #d1d6db', borderRadius: '6px', padding: '8px 12px' }} />
</div>
```

### ✅ 올바른 방법

```tsx
<Button>저장</Button>
<Badge variant="success">활성</Badge>
<Input label="이름" />
```

**규칙**: UI 구현 전 반드시 `component-catalog.md` 확인. 있으면 무조건 재사용.

---

## 3. 내부 CSS 클래스 외부에서 직접 사용

### ❌ 금지

```tsx
// igt-* 내부 클래스를 컴포넌트 외부에서 직접 사용
<div className="igt-btn igt-btn--primary">직접 버튼</div>
<span className="igt-badge igt-badge--success">직접 배지</span>

// 내부 구조 클래스 직접 참조
<div className="igt-field__input-wrap">
  <input className="igt-field__input" />
</div>
```

### ✅ 올바른 방법

```tsx
// 항상 컴포넌트를 통해 사용
<Button tone="primary">버튼</Button>
<Badge variant="success">배지</Badge>
<Input label="필드" />
```

**규칙**: `igt-*` 클래스는 내부 구현 세부사항. 외부에서 직접 사용하면 내부 리팩터링 시 깨짐.

---

## 4. 잘못된 컴포넌트 선택

### ❌ 금지

```tsx
// on/off 토글에 Checkbox 쓰기 (Switch 사용해야 함)
<Checkbox label="알림 활성화" checked={notify} onChange={...} />

// 단일 선택에 Checkbox 쓰기 (Radio 사용해야 함)
<Checkbox label="신용카드" />
<Checkbox label="계좌이체" />

// 즉시 사라지지 않는 알림에 Toast 쓰기 (Alert 사용해야 함)
<Toast message="시스템 점검 중입니다" />  // 페이지에 고정 안내인데 Toast 사용

// 행동 유도가 필요한 곳에 Alert 쓰기 (Toast 사용해야 함)
<Alert type="success" title="저장되었습니다" />  // 일시적 피드백인데 Alert 사용

// 숫자 카운트에 Badge 쓰기 (CountBadge 사용해야 함)
<Badge variant="danger">99+</Badge>
```

### ✅ 올바른 선택

| 상황 | 사용할 컴포넌트 |
|------|--------------|
| on/off 즉시 적용 토글 | `Switch` |
| 하나만 선택 | `Radio` / `RadioGroup` |
| 여러 개 선택 가능 | `Checkbox` |
| 일시적 액션 피드백 | `Toast` |
| 페이지 고정 안내 | `Alert` |
| 숫자 카운트 표시 | `CountBadge` |
| 상태/카테고리 텍스트 | `Badge` |

---

## 5. 폼 에러 처리 잘못하기

### ❌ 금지

```tsx
// 에러 텍스트를 컴포넌트 밖에 직접 추가
<Input label="이메일" value={email} />
{errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}

// 에러 상태를 className으로 제어
<Input label="이메일" className={errors.email ? 'error' : ''} />

// 에러가 있어도 hint 함께 표시
<Input label="이메일" hint="이메일 형식으로 입력" error={errors.email} />
// ← error가 있으면 hint는 자동으로 숨겨지므로 둘 다 넣어도 무방하지만,
//   에러 텍스트와 hint를 동시에 보여주려는 의도라면 설계 자체가 잘못됨
```

### ✅ 올바른 방법

```tsx
// error prop에 에러 메시지 전달
<Input
  label="이메일"
  hint="이메일 형식으로 입력하세요"
  error={errors.email}  // 에러 있으면 hint 자동 숨김
  value={email}
  onChange={...}
/>
```

**규칙**: 에러는 반드시 `error` prop으로. 컴포넌트가 스타일과 레이아웃을 처리함.

---

## 6. 로딩/빈 상태 직접 구현

### ❌ 금지

```tsx
// Table 로딩을 별도 스피너로 구현
{isLoading ? (
  <div className="spinner-wrapper">
    <div className="spinner" />
  </div>
) : (
  <Table columns={columns} data={data} />
)}

// Table 빈 상태를 별도 컴포넌트로 구현
{data.length === 0 && !isLoading && (
  <div style={{ textAlign: 'center', padding: '40px' }}>데이터 없음</div>
)}
<Table columns={columns} data={data} />

// 버튼 로딩을 disabled + 외부 스피너로 처리
<Button disabled={isSubmitting}>저장</Button>
{isSubmitting && <Spinner />}
```

### ✅ 올바른 방법

```tsx
// Table의 내장 기능 사용
<Table
  columns={columns}
  data={data}
  loading={isLoading}
  emptyText="등록된 데이터가 없습니다."
/>

// Button의 내장 loading 사용
<Button loading={isSubmitting}>저장</Button>
```

---

## 7. 버튼 조합 규칙 무시

### ❌ 금지

```tsx
// 취소/확인 순서 반대로
<Button onClick={handleConfirm}>확인</Button>
<Button tone="secondary" onClick={onCancel}>취소</Button>

// 삭제 버튼에 primary 사용
<Button onClick={handleDelete}>삭제</Button>

// 모달 footer를 왼쪽 정렬
<div style={{ display: 'flex' }}>  {/* justifyContent 없음 */}
  <Button tone="secondary" onClick={onCancel}>취소</Button>
  <Button onClick={handleConfirm}>확인</Button>
</div>

// 위험 액션에 secondary 사용
<Button tone="secondary" onClick={handleDelete}>삭제하기</Button>
```

### ✅ 올바른 방법

```tsx
// 취소 먼저, 확인/실행 나중 / 우측 정렬
<div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
  <Button tone="secondary" variant="outline" onClick={onCancel}>취소</Button>
  <Button tone="danger" onClick={handleDelete}>삭제</Button>
</div>
```

**규칙**:
- 취소는 항상 왼쪽, 주요 액션은 오른쪽
- 삭제/비활성화 등 위험 액션은 `tone="danger"`
- 버튼 그룹은 항상 우측 정렬 (`justifyContent: 'flex-end'`)

---

## 8. 접근성 속성 누락

### ❌ 금지

```tsx
// 아이콘 버튼에 label 없음
<Button iconOnly leadingIcon={<Icon name="trash" size="sm" />} />
// ← 스크린 리더가 버튼 목적을 알 수 없음

// 상태 dot에 aria-label 없음
<DotBadge tone="accent" />
// ← 온라인/오프라인 등 상태를 스크린 리더가 알 수 없음

// 아이콘에 label 없음 (의미 있는 아이콘)
<Icon name="warning" size="md" />
// ← 경고 의미인데 스크린 리더가 무시함
```

### ✅ 올바른 방법

```tsx
// 아이콘 버튼에 aria-label 추가
<Button
  iconOnly
  leadingIcon={<Icon name="trash" size="sm" />}
  aria-label="삭제"
/>

// 상태 dot에 aria-label 추가
<DotBadge tone="accent" aria-label="온라인" />

// 의미 있는 아이콘에 label 추가
<Icon name="warning" size="md" label="경고" />
```

---

> **업데이트 기록**
> - 2026-04-14: 초기 작성 (토큰, 재사용, 클래스, 컴포넌트 선택, 에러 처리, 로딩, 버튼, 접근성)

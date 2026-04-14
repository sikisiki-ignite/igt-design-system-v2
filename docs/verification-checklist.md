# IGT Design System — 컴포넌트 검증 체크리스트

> 작성: 2026-04-12  
> 모든 컴포넌트는 이 체크리스트를 100% 통과한 후에만 "완료" 선언 가능.

---

## 사용 방법

각 컴포넌트 구현 후 아래 체크리스트를 복사해 `[ComponentName].spec.md` 하단에 붙여넣고 항목을 채운다.

---

## 체크리스트

### A. 피그마 스펙 일치

- [ ] **Size variants** — 피그마에 정의된 모든 size(xs/sm/md/lg/xl) 구현됨
- [ ] **Style variants** — 피그마의 모든 variant(fill/soft/outline/ghost 등) 구현됨
- [ ] **Tone variants** — 피그마의 모든 tone(primary/secondary/danger 등) 구현됨
- [ ] **크기 수치** — height, padding, gap이 피그마 수치와 일치함
- [ ] **타이포그래피** — font-size, line-height, font-weight가 피그마와 일치함
- [ ] **반경** — border-radius가 피그마와 일치함
- [ ] **아이콘 크기** — 아이콘 사이즈가 피그마와 일치함

### B. 상태 (States)

- [ ] **normal** — 기본 상태 구현됨
- [ ] **hover** — hover 상태 구현됨 (`:hover`)
- [ ] **focus** — focus 상태 구현됨 (`:focus-visible`)
- [ ] **active** — active 상태 구현됨 (`:active`, 해당하는 경우)
- [ ] **disabled** — disabled 상태 구현됨 (`disabled` 속성 또는 `aria-disabled`)
- [ ] **loading** — loading 상태 구현됨 (해당하는 경우)
- [ ] **error** — error 상태 구현됨 (input류)
- [ ] **selected/checked** — 선택 상태 구현됨 (checkbox, radio, tab 등)

### C. 토큰 정합성

- [ ] **미정의 변수 0개** — 아래 스크립트 실행 후 해당 컴포넌트 미정의 0개 확인

```bash
cd /Users/sikisiki/Documents/IGTdesignsystem
python3 -c "
import re
with open('src/styles/globals.css') as f: g = f.read()
tokens = set(re.findall(r'(--[\w-]+)\s*:', g))
with open('src/components/[ComponentName]/[ComponentName].css') as f: c = f.read()
used = set(re.findall(r'var\((--[^)]+)\)', c))
missing = [t for t in used if t not in tokens]
print('미정의:', missing if missing else '없음 ✅')
"
```

- [ ] **컴포넌트 토큰 → sys 참조** — globals.css에서 해당 `--[comp]-*` 토큰이 `var(--sys-*)` 참조함
- [ ] **light/dark 양쪽 정의** — 다크 모드에서 달라지는 토큰이 `[data-theme="dark"]` 섹션에 재정의됨

### D. 테마 시각 대조

- [ ] **Light 테마** — showcase에서 light 테마로 전환 후 피그마 라이트 스크린샷과 육안 대조 통과
- [ ] **Dark 테마** — showcase에서 dark 테마로 전환 후 피그마 다크 스크린샷과 육안 대조 통과
- [ ] **테마 전환 시 깨짐 없음** — 실시간 테마 전환 시 레이아웃 이상 없음

### E. 코드 품질

- [ ] **TypeScript 오류 없음** — `tsc --noEmit` 통과
- [ ] **빌드 통과** — `npm run build` 오류 없음
- [ ] **Props 타입** — 모든 prop이 union type 또는 명확한 타입으로 정의됨
- [ ] **ref forwarding** — `forwardRef` 적용됨 (해당하는 경우)
- [ ] **접근성** — `role`, `aria-*`, keyboard navigation 처리됨

### F. showcase

- [ ] **섹션 추가됨** — `showcase/App.tsx`에 해당 컴포넌트 섹션 추가됨
- [ ] **모든 variant 표시** — size, tone, style, state 조합이 showcase에 표시됨
- [ ] **네비게이션 링크 추가** — `NAV_ITEMS`에 항목 추가됨 (해당하는 경우)

### G. 문서화

- [ ] **[ComponentName].spec.md 작성 완료** — `docs/spec-template.md` 기반으로 작성됨
- [ ] **PLAN.md 업데이트** — 해당 컴포넌트 완료 표시
- [ ] **PROJECT.md 업데이트** — 최종 업데이트 날짜 및 현황 반영

---

## 시각 대조 방법

### 피그마 스크린샷 획득
```
mcp__figma__get_screenshot(nodeId="<nodeId>", fileKey="pTCGG9i5xgx1HiVQ6EFJRt")
```

### showcase 접속
```bash
cd /Users/sikisiki/Documents/IGTdesignsystem
npm run showcase
# → http://localhost:5173
```

### 대조 기준
| 항목 | 허용 오차 |
|------|---------|
| 색상 | 0 (완전 일치) |
| 크기 (height/width) | ±1px |
| 간격 (padding/gap) | ±1px |
| 폰트 크기 | 0 |
| 폰트 굵기 | 0 |
| 반경 | 0 |

---

## 빠른 실행 체크

```bash
# 1. 토큰 감사
cd /Users/sikisiki/Documents/IGTdesignsystem
python3 -c "
import re, os
with open('src/styles/globals.css') as f: g = f.read()
tokens = set(re.findall(r'(--[\w-]+)\s*:', g))
for comp in os.listdir('src/components'):
    css = f'src/components/{comp}/{comp}.css'
    if not os.path.exists(css): continue
    with open(css) as f: c = f.read()
    used = set(re.findall(r'var\((--[^)]+)\)', c))
    missing = [t for t in used if t not in tokens]
    if missing: print(f'[{comp}]', missing)
print('감사 완료')
"

# 2. TS 타입 체크
npx tsc --noEmit

# 3. 빌드
npm run build
```

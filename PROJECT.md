# IGT Design System — 프로젝트 현황

> 마지막 업데이트: 2026-04-13  
> Figma fileKey: `pTCGG9i5xgx1HiVQ6EFJRt`  
> 구현 경로: `/Users/sikisiki/Documents/IGTdesignsystem/`  
> 전체 계획: `/Users/sikisiki/Documents/igt-ai-studio_v2/PLAN.md`

---

## 프로젝트 정의

**IGT 백오피스 전용 React 컴포넌트 라이브러리**  
Figma가 단일 소스 오브 트루스. 별도 프로젝트 분리 없이 단일 저장소에서 관리.

---

## 전체 구조 목표

```
Layer A: src/components/     ← 컴포넌트 구현 (Phase 2~6 진행 중)
Layer B: ai-guide/           ← AI 바이브 코딩 지침서 (컴포넌트 완성 시마다 업데이트)
스킬:    ds-architect        ← 컴포넌트 구현용
         backoffice-dev      ← 바이브 코딩용 (추후 제작)
```

---

## 구현 현황

### 완료된 Phase
| Phase | 내용 | 완료일 |
|-------|------|--------|
| Phase 0 | 거버넌스 세팅 (템플릿, 토큰 컨벤션, 폰트, 테마 토글) | 2026-04-12 |
| Phase 1 | 아이콘 시스템 (Icon 컴포넌트 + 37개 아이콘) | 2026-04-12 |

### 현재: Phase 2 — 기존 컴포넌트 보완

| 컴포넌트 | 상태 | 남은 작업 |
|---------|------|---------|
| Button | ⬜ | xs/xl size, IconOnly, loading state |
| Input | ⬜ | leading/trailing icon, clearable, character count |
| Select | ⬜ | multi-select, searchable, 드롭다운 애니메이션 |
| Checkbox | ⬜ | indeterminate state 검증 |
| Radio / RadioGroup | ⬜ | 완성 검증 |
| Badge | ⬜ | dot variant, count variant |
| Table | ⬜ | sortable, pagination, empty state |
| Modal | ⬜ | size variant (sm/md/lg), scrollable body |
| Toast | ⬜ | position variant, action button |
| Tooltip | ⬜ | placement 12방향 |

### 구현된 컴포넌트 전체 목록 (18개)
Alert, Avatar, Backdrop, Badge, Button, Checkbox, Divider, Icon, Input, Label, Modal, Radio, RadioGroup, Select, Skeleton, Switch, Table, Toast, Tooltip

---

## 주요 결정 사항

| 날짜 | 결정 |
|------|------|
| 2026-04-13 | IGTdesignsystem을 IGT 백오피스 전용 시스템으로 공식 선언 |
| 2026-04-13 | Layer C(백오피스 모듈) 별도 분리 없이 단일 저장소로 관리 |
| 2026-04-13 | CLAUDE.md 생성 — AI 작업 시 자동 로드되는 핵심 규칙 |
| 2026-04-13 | ai-guide/ 도입 결정 — 컴포넌트 완성 시마다 점진적 업데이트 |
| 2026-04-13 | backoffice-dev 스킬은 ai-guide 충분히 쌓인 후 제작 |

---

## 다음 할 일

1. Phase 2 컴포넌트 보완 작업 계속
2. 컴포넌트 완성될 때마다 `ai-guide/component-catalog.md` 항목 추가
3. Phase 2 완료 후 Phase 3 진입

---

## 파일 구조

```
IGTdesignsystem/
├── CLAUDE.md                    ← AI 핵심 규칙 (자동 로드)
├── PROJECT.md                   ← 현황 트래킹 (이 파일)
├── src/
│   ├── components/              ← 컴포넌트 구현
│   └── styles/globals.css       ← 토큰 소스
├── docs/                        ← 컴포넌트 스펙 문서
├── ai-guide/                    ← AI 바이브 코딩 지침서
│   ├── component-catalog.md     ← (생성 예정)
│   ├── usage-patterns.md        ← (생성 예정)
│   └── anti-patterns.md         ← (생성 예정)
└── showcase/                    ← 개발용 데모 앱
```

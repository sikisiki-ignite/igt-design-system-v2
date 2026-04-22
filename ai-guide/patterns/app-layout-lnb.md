# AppLayout + LNB Pattern — Backoffice

> AI 코드 생성 기준 문서.
> AppLayout과 SideNavigation을 조합하는 올바른 방법을 정의한다.

---

## 레퍼런스

**Figma:** `node-id=15035-29959` / fileKey: `pTCGG9i5xgx1HiVQ6EFJRt`

---

## 치수 (Figma 실측)

| 영역 | 값 |
|-----|---|
| AppLayout side-nav 슬롯 | `250px` |
| LNB 내부 padding | `24px` (상하좌우 동일) |
| SideNavigation 실제 너비 | `202px` (= 250 − 24×2) |
| NavItem 너비 | `202px` (100%) |
| NavItem 높이 | `36px` (size="md") |
| NavItem 내부 padding | `8px 12px` |

---

## ⚠️ 필수 규칙

```
sideNav 슬롯에 반드시 padding: '24px' wrapper를 사용한다.
wrapper 없이 SideNavigation을 직접 배치하면
NavItem 활성 배경이 슬롯 좌우에서 비대칭으로 잘린다.
```

---

## 전체 코드 구조

```tsx
export function SomePage({ onBack }) {
  /* ---- Top Nav ---- */
  const topNav = (
    <div style={{
      height: '100%',
      background: 'var(--sys-surface-base)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 12,
    }}>
      {/* 로고 */}
      <div style={{
        fontWeight: 'var(--ref-font-weight-700)',
        fontSize: 'var(--ref-font-size-16)',
        color: 'var(--sys-content-brand-default)',
        marginRight: 16,
      }}>
        IGT Backoffice
      </div>

      <div style={{ flex: 1 }} />

      {/* 알림 */}
      <div style={{ position: 'relative' }}>
        <Button tone="secondary" variant="ghost" size="sm" iconOnly
          leadingIcon={<Icon name="bell" size="sm" />} aria-label="알림" />
        <div style={{ position: 'absolute', top: 2, right: 2 }}>
          <CountBadge count={3} size="sm" />
        </div>
      </div>

      <Avatar fallback="관" size="sm" status="online" />
    </div>
  )

  /* ---- Side Nav (LNB) ---- */
  // ✅ padding: '24px' wrapper 필수
  const sideNav = (
    <div style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <SideNavigation tone="accent" style={{ flex: 1 }}>

        <SideNavigationList>
          <NavSectionHeader>섹션명</NavSectionHeader>
          <NavItem
            as="button"
            tone="accent"
            current
            leadingIcon={<Icon name="more_horizontal" size="sm" />}
          >
            현재 메뉴
          </NavItem>
          <NavItem
            as="button"
            tone="accent"
            leadingIcon={<Icon name="calendar" size="sm" />}
          >
            다른 메뉴
          </NavItem>
        </SideNavigationList>

        <SideNavigationList>
          <NavSectionHeader>설정</NavSectionHeader>
          <NavItem
            as="button"
            tone="accent"
            leadingIcon={<Icon name="setting" size="sm" />}
          >
            설정
          </NavItem>
        </SideNavigationList>

      </SideNavigation>

      <Divider />

      {/* 하단 사용자 정보 */}
      <div style={{ paddingTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar fallback="관" size="sm" status="online" />
        <div>
          <div style={{ fontSize: 'var(--ref-font-size-13)', fontWeight: 'var(--ref-font-weight-500)', color: 'var(--sys-content-neutral-strong)' }}>
            관리자
          </div>
          <div style={{ fontSize: 'var(--ref-font-size-11)', color: 'var(--sys-content-neutral-muted)' }}>
            admin@igt.com
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      <AppLayout topNav={topNav} sideNav={sideNav}>
        {/* 페이지 콘텐츠 */}
      </AppLayout>
    </div>
  )
}
```

---

## 아이콘 선택 규칙

NavItem의 `leadingIcon`에는 반드시 `component-catalog.md`의 **Icon 전체 목록**에 있는 이름만 사용한다.

목록에 없는 이름(`chart_bar`, `home`, `truck` 등)은 렌더링되지 않는다.

**권장 메뉴 아이콘:**

| 용도 | 아이콘 이름 |
|-----|-----------|
| 리스팅/목록 | `more_horizontal` |
| 현황판/달력 | `calendar` |
| 통계 | `bookmark` |
| 사람/사용자 | `person` |
| 설정 | `setting` |
| 별/즐겨찾기 | `star` |
| 알림 | `bell` |

---

## ❌ 잘못된 패턴

```tsx
// padding 없이 직접 배치 → 좌우 여백 비대칭
sideNav={
  <SideNavigation tone="accent">
    ...
  </SideNavigation>
}

// padding: '8px' → 좌측 8px, 우측 22px 비대칭
sideNav={
  <div style={{ padding: '8px' }}>
    <SideNavigation tone="accent">
      ...
    </SideNavigation>
  </div>
}

// 존재하지 않는 아이콘 이름 사용
leadingIcon={<Icon name="chart_bar" size="sm" />}  // ❌ 렌더링 안 됨
```

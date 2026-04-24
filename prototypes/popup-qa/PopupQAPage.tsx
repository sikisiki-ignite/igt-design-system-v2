import React, { useState } from 'react'
import {
  Modal,
  ConfirmDialog,
  Drawer,
  Toast,
  ToastContainer,
  Alert,
  Tooltip,
  Popover,
  PopoverSection,
  Button,
  Input,
  Select,
  FormLayout,
  FormItem,
  Badge,
  Icon,
} from 'igt-design-system'
import './PopupQAPage.css'

/* ─────────────────────────────────────────────
   Toast 상태 타입
───────────────────────────────────────────── */
interface ToastItem {
  id: number
  type: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message: string
  actionLabel?: string
  duration?: number
}

let toastSeq = 0

/* ─────────────────────────────────────────────
   케이스 섹션 레이블 컴포넌트
───────────────────────────────────────────── */
function SectionHeader({ no, title, desc }: { no: string; title: string; desc: string }) {
  return (
    <div className="qa-section-header">
      <span className="qa-section-no">{no}</span>
      <div>
        <p className="qa-section-title">{title}</p>
        <p className="qa-section-desc">{desc}</p>
      </div>
    </div>
  )
}

function CaseRow({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="qa-case-row">
      <span className="qa-case-id">{id}</span>
      <span className="qa-case-label">{label}</span>
      <div className="qa-case-trigger">{children}</div>
    </div>
  )
}

export default function PopupQAPage() {
  /* ── Modal 상태 ── */
  const [modal, setModal] = useState<string | null>(null)

  /* ── ConfirmDialog 상태 ── */
  const [confirm, setConfirm] = useState<string | null>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)

  /* ── Drawer 상태 ── */
  const [drawer, setDrawer] = useState<string | null>(null)

  /* ── Toast 상태 ── */
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const addToast = (item: Omit<ToastItem, 'id'>) => {
    const id = ++toastSeq
    setToasts(prev => [...prev, { ...item, id }])
  }
  const removeToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id))

  /* ── Alert 상태 ── */
  const [hiddenAlerts, setHiddenAlerts] = useState<Set<string>>(new Set())
  const dismissAlert = (key: string) => setHiddenAlerts(prev => new Set([...prev, key]))

  /* ── 확인 버튼 로딩 시뮬레이션 ── */
  const handleConfirmWithLoading = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
      setConfirm(null)
    }, 2000)
  }

  return (
    <div className="qa-root">
      {/* ── 헤더 ── */}
      <div className="qa-header">
        <h1 className="qa-title">팝업 컴포넌트 디자인 QA</h1>
        <p className="qa-subtitle">IGT Design System — 오버레이 전체 케이스 검증</p>
      </div>

      <div className="qa-body">

        {/* ══════════════════════════════════════════
            SECTION 1 · Modal
        ══════════════════════════════════════════ */}
        <section className="qa-section">
          <SectionHeader
            no="01"
            title="Modal"
            desc="일반 대화상자 — size(sm/md/lg) × footerVariation(primary/neutral/danger) × 특수 케이스"
          />

          <div className="qa-case-group">
            {/* ── size ── */}
            <CaseRow id="M-01" label="size=sm · footerVariation=primary">
              <Button size="sm" onClick={() => setModal('m-sm-primary')}>열기</Button>
            </CaseRow>
            <CaseRow id="M-02" label="size=md · footerVariation=primary (기본)">
              <Button size="sm" onClick={() => setModal('m-md-primary')}>열기</Button>
            </CaseRow>
            <CaseRow id="M-03" label="size=lg · footerVariation=primary">
              <Button size="sm" onClick={() => setModal('m-lg-primary')}>열기</Button>
            </CaseRow>

            {/* ── footerVariation ── */}
            <CaseRow id="M-04" label="footerVariation=neutral (중립 — 보조 버튼 2개)">
              <Button size="sm" onClick={() => setModal('m-md-neutral')}>열기</Button>
            </CaseRow>
            <CaseRow id="M-05" label="footerVariation=danger (위험 액션 — 빨간 확인 버튼)">
              <Button size="sm" onClick={() => setModal('m-md-danger')}>열기</Button>
            </CaseRow>

            {/* ── showSecondaryAction ── */}
            <CaseRow id="M-06" label="showSecondaryAction=false (확인 버튼만)">
              <Button size="sm" onClick={() => setModal('m-single-action')}>열기</Button>
            </CaseRow>

            {/* ── footer 없음 ── */}
            <CaseRow id="M-07" label="footer 없음 (content-only 모달)">
              <Button size="sm" onClick={() => setModal('m-no-footer')}>열기</Button>
            </CaseRow>

            {/* ── 커스텀 footer ── */}
            <CaseRow id="M-08" label="footer 커스텀 (버튼 3개)">
              <Button size="sm" onClick={() => setModal('m-custom-footer')}>열기</Button>
            </CaseRow>

            {/* ── title 없음 ── */}
            <CaseRow id="M-09" label="title 없음 (header 미노출)">
              <Button size="sm" onClick={() => setModal('m-no-title')}>열기</Button>
            </CaseRow>

            {/* ── 긴 본문 스크롤 ── */}
            <CaseRow id="M-10" label="긴 본문 — 스크롤 확인">
              <Button size="sm" onClick={() => setModal('m-long-body')}>열기</Button>
            </CaseRow>

            {/* ── 폼 포함 ── */}
            <CaseRow id="M-11" label="본문에 폼 포함 (FormLayout + FormItem)">
              <Button size="sm" onClick={() => setModal('m-form')}>열기</Button>
            </CaseRow>

            {/* ── closeOnOverlayClick=false ── */}
            <CaseRow id="M-12" label="closeOnOverlayClick=false (오버레이 클릭 무시)">
              <Button size="sm" onClick={() => setModal('m-no-overlay-close')}>열기</Button>
            </CaseRow>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 · ConfirmDialog
        ══════════════════════════════════════════ */}
        <section className="qa-section">
          <SectionHeader
            no="02"
            title="ConfirmDialog"
            desc="확인/취소 다이얼로그 — tone(primary/danger) × loading 상태"
          />
          <div className="qa-case-group">
            <CaseRow id="C-01" label="tone=danger (삭제 확인 — 기본)">
              <Button size="sm" tone="danger" variant="soft" onClick={() => setConfirm('danger')}>열기</Button>
            </CaseRow>
            <CaseRow id="C-02" label="tone=primary (일반 확인)">
              <Button size="sm" onClick={() => setConfirm('primary')}>열기</Button>
            </CaseRow>
            <CaseRow id="C-03" label="loading=true (확인 버튼 로딩 — 2초 후 닫힘)">
              <Button size="sm" onClick={() => setConfirm('loading')}>열기</Button>
            </CaseRow>
            <CaseRow id="C-04" label="description 없음 (title만)">
              <Button size="sm" onClick={() => setConfirm('no-desc')}>열기</Button>
            </CaseRow>
            <CaseRow id="C-05" label="description에 ReactNode (강조 텍스트 포함)">
              <Button size="sm" onClick={() => setConfirm('rich-desc')}>열기</Button>
            </CaseRow>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 · Drawer
        ══════════════════════════════════════════ */}
        <section className="qa-section">
          <SectionHeader
            no="03"
            title="Drawer"
            desc="슬라이드 패널 — size(sm/md/lg) × footerLayout(inlineEnd/stack/between) × placement(right/left)"
          />
          <div className="qa-case-group">
            {/* ── size ── */}
            <CaseRow id="D-01" label="size=sm · placement=right · footerLayout=inlineEnd (기본)">
              <Button size="sm" onClick={() => setDrawer('sm-right-inlineEnd')}>열기</Button>
            </CaseRow>
            <CaseRow id="D-02" label="size=md · placement=right · footerLayout=inlineEnd">
              <Button size="sm" onClick={() => setDrawer('md-right-inlineEnd')}>열기</Button>
            </CaseRow>
            <CaseRow id="D-03" label="size=lg · placement=right · footerLayout=inlineEnd">
              <Button size="sm" onClick={() => setDrawer('lg-right-inlineEnd')}>열기</Button>
            </CaseRow>

            {/* ── footerLayout ── */}
            <CaseRow id="D-04" label="footerLayout=stack (세로 쌓기 — 모바일형)">
              <Button size="sm" onClick={() => setDrawer('sm-right-stack')}>열기</Button>
            </CaseRow>
            <CaseRow id="D-05" label="footerLayout=between (좌측 삭제 + 우측 취소/확인)">
              <Button size="sm" onClick={() => setDrawer('sm-right-between')}>열기</Button>
            </CaseRow>

            {/* ── footerVariation ── */}
            <CaseRow id="D-06" label="footerVariation=neutral (보조 톤 버튼)">
              <Button size="sm" onClick={() => setDrawer('neutral')}>열기</Button>
            </CaseRow>
            <CaseRow id="D-07" label="footerVariation=danger (위험 톤 확인 버튼)">
              <Button size="sm" tone="danger" variant="soft" onClick={() => setDrawer('danger')}>열기</Button>
            </CaseRow>

            {/* ── placement ── */}
            <CaseRow id="D-08" label="placement=left (좌측 슬라이드)">
              <Button size="sm" onClick={() => setDrawer('left')}>열기</Button>
            </CaseRow>

            {/* ── 폼 포함 ── */}
            <CaseRow id="D-09" label="본문에 폼 포함 + description">
              <Button size="sm" onClick={() => setDrawer('form')}>열기</Button>
            </CaseRow>

            {/* ── 커스텀 footer ── */}
            <CaseRow id="D-10" label="커스텀 footer (footer prop 직접 주입)">
              <Button size="sm" onClick={() => setDrawer('custom-footer')}>열기</Button>
            </CaseRow>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4 · Toast
        ══════════════════════════════════════════ */}
        <section className="qa-section">
          <SectionHeader
            no="04"
            title="Toast"
            desc="알림 토스트 — type(info/success/warning/error) × title 유무 × 액션 버튼 × 지속 토스트"
          />
          <div className="qa-case-group">
            <CaseRow id="T-01" label="type=info · title 없음">
              <Button size="sm" onClick={() => addToast({ type: 'info', message: '업데이트가 있습니다.' })}>트리거</Button>
            </CaseRow>
            <CaseRow id="T-02" label="type=success · title 있음">
              <Button size="sm" onClick={() => addToast({ type: 'success', title: '저장 완료', message: '변경사항이 저장되었습니다.' })}>트리거</Button>
            </CaseRow>
            <CaseRow id="T-03" label="type=warning · title 있음">
              <Button size="sm" onClick={() => addToast({ type: 'warning', title: '주의', message: '일부 항목이 누락되었습니다.' })}>트리거</Button>
            </CaseRow>
            <CaseRow id="T-04" label="type=error · title 있음">
              <Button size="sm" tone="danger" variant="soft" onClick={() => addToast({ type: 'error', title: '오류 발생', message: '서버와 통신에 실패했습니다.' })}>트리거</Button>
            </CaseRow>
            <CaseRow id="T-05" label="actionLabel 포함 (실행 취소 버튼)">
              <Button size="sm" onClick={() => addToast({ type: 'info', title: '삭제됨', message: '항목이 삭제되었습니다.', actionLabel: '실행 취소' })}>트리거</Button>
            </CaseRow>
            <CaseRow id="T-06" label="duration=0 (자동 닫힘 없음 — 수동 닫기)">
              <Button size="sm" onClick={() => addToast({ type: 'warning', title: '세션 만료 예정', message: '10분 후 자동 로그아웃됩니다.', duration: 0 })}>트리거</Button>
            </CaseRow>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5 · Alert
        ══════════════════════════════════════════ */}
        <section className="qa-section">
          <SectionHeader
            no="05"
            title="Alert"
            desc="인라인 알림 — type(neutral/info/success/warning/danger) × dismissible"
          />
          <div className="qa-case-group qa-case-group--vertical">
            {!hiddenAlerts.has('a-neutral') && (
              <CaseRow id="A-01" label="type=neutral">
                <Alert
                  type="neutral"
                  title="안내"
                  description="중립 상태 알림입니다."
                />
              </CaseRow>
            )}
            {!hiddenAlerts.has('a-info') && (
              <CaseRow id="A-02" label="type=info">
                <Alert
                  type="info"
                  title="정보"
                  description="처리 중인 요청이 있습니다."
                />
              </CaseRow>
            )}
            {!hiddenAlerts.has('a-success') && (
              <CaseRow id="A-03" label="type=success">
                <Alert
                  type="success"
                  title="성공"
                  description="모든 데이터가 동기화되었습니다."
                />
              </CaseRow>
            )}
            {!hiddenAlerts.has('a-warning') && (
              <CaseRow id="A-04" label="type=warning">
                <Alert
                  type="warning"
                  title="경고"
                  description="저장되지 않은 변경사항이 있습니다."
                />
              </CaseRow>
            )}
            {!hiddenAlerts.has('a-danger') && (
              <CaseRow id="A-05" label="type=danger">
                <Alert
                  type="danger"
                  title="오류"
                  description="데이터를 불러오는 데 실패했습니다."
                />
              </CaseRow>
            )}
            {!hiddenAlerts.has('a-dismissible') && (
              <CaseRow id="A-06" label="dismissible=true (X 버튼으로 닫기)">
                <Alert
                  type="info"
                  title="닫을 수 있는 알림"
                  description="우측 X 버튼을 클릭하면 사라집니다."
                  dismissible
                  onDismiss={() => dismissAlert('a-dismissible')}
                />
              </CaseRow>
            )}
            {!hiddenAlerts.has('a-desc-only') && (
              <CaseRow id="A-07" label="description 없음 (title만)">
                <Alert type="warning" title="저장 전 확인이 필요합니다." />
              </CaseRow>
            )}
            <CaseRow id="A-08" label="닫힌 Alert 복구">
              <Button size="sm" variant="soft" onClick={() => setHiddenAlerts(new Set())}>
                모두 복구
              </Button>
            </CaseRow>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6 · Tooltip
        ══════════════════════════════════════════ */}
        <section className="qa-section">
          <SectionHeader
            no="06"
            title="Tooltip"
            desc="툴팁 — placement(top/bottom/left/right)"
          />
          <div className="qa-case-group">
            <CaseRow id="TT-01" label="placement=top (기본)">
              <Tooltip content="상단 툴팁입니다." placement="top">
                <Button size="sm" variant="soft">Hover</Button>
              </Tooltip>
            </CaseRow>
            <CaseRow id="TT-02" label="placement=bottom">
              <Tooltip content="하단 툴팁입니다." placement="bottom">
                <Button size="sm" variant="soft">Hover</Button>
              </Tooltip>
            </CaseRow>
            <CaseRow id="TT-03" label="placement=left">
              <Tooltip content="좌측 툴팁입니다." placement="left">
                <Button size="sm" variant="soft">Hover</Button>
              </Tooltip>
            </CaseRow>
            <CaseRow id="TT-04" label="placement=right">
              <Tooltip content="우측 툴팁입니다." placement="right">
                <Button size="sm" variant="soft">Hover</Button>
              </Tooltip>
            </CaseRow>
            <CaseRow id="TT-05" label="긴 툴팁 텍스트">
              <Tooltip content="이것은 매우 긴 툴팁 텍스트입니다. 줄바꿈 처리 방식을 확인해주세요." placement="top">
                <Button size="sm" variant="soft">Hover (긴 텍스트)</Button>
              </Tooltip>
            </CaseRow>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 7 · Popover
        ══════════════════════════════════════════ */}
        <section className="qa-section">
          <SectionHeader
            no="07"
            title="Popover / PopoverSection"
            desc="팝오버 컨테이너 — emphasis(default/inverse) × PopoverSection 조합"
          />
          <div className="qa-alert-note">
            <Alert
              type="warning"
              title="구현 Gap 확인 필요"
              description="Popover는 레이아웃 컨테이너만 제공합니다. trigger prop과 floating positioning이 없어 직접 구현 필요합니다."
            />
          </div>
          <div className="qa-case-group qa-case-group--vertical">
            <CaseRow id="P-01" label="emphasis=default · PopoverSection 1개">
              <div className="qa-popover-preview">
                <Popover emphasis="default">
                  <PopoverSection title="섹션 제목">
                    <p style={{ color: 'var(--sys-color-text-primary)', fontSize: 'var(--ref-font-size-sm)' }}>
                      팝오버 본문 텍스트입니다.
                    </p>
                  </PopoverSection>
                </Popover>
              </div>
            </CaseRow>
            <CaseRow id="P-02" label="emphasis=default · PopoverSection 2개">
              <div className="qa-popover-preview">
                <Popover emphasis="default">
                  <PopoverSection title="1번 섹션">
                    <p style={{ color: 'var(--sys-color-text-primary)', fontSize: 'var(--ref-font-size-sm)' }}>
                      첫 번째 섹션 내용
                    </p>
                  </PopoverSection>
                  <PopoverSection title="2번 섹션">
                    <p style={{ color: 'var(--sys-color-text-primary)', fontSize: 'var(--ref-font-size-sm)' }}>
                      두 번째 섹션 내용
                    </p>
                  </PopoverSection>
                </Popover>
              </div>
            </CaseRow>
            <CaseRow id="P-03" label="emphasis=inverse (어두운 배경)">
              <div className="qa-popover-preview">
                <Popover emphasis="inverse">
                  <PopoverSection>
                    <p style={{ fontSize: 'var(--ref-font-size-sm)' }}>
                      inverse 강조 스타일
                    </p>
                  </PopoverSection>
                </Popover>
              </div>
            </CaseRow>
          </div>
        </section>

      </div>

      {/* ══════════════════════════════════════════
          Toast Container (항상 마운트)
      ══════════════════════════════════════════ */}
      <ToastContainer position="top-right">
        {toasts.map(t => (
          <Toast
            key={t.id}
            type={t.type}
            title={t.title}
            message={t.message}
            duration={t.duration}
            actionLabel={t.actionLabel}
            onAction={t.actionLabel ? () => removeToast(t.id) : undefined}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </ToastContainer>

      {/* ══════════════════════════════════════════
          Modal 인스턴스
      ══════════════════════════════════════════ */}

      {/* M-01 sm + primary */}
      <Modal open={modal === 'm-sm-primary'} onClose={() => setModal(null)}
        title="작은 모달 (sm)" subtitle="size=sm, footerVariation=primary"
        size="sm" footerVariation="primary"
        primaryLabel="확인" secondaryLabel="취소"
        onPrimaryAction={() => setModal(null)} onSecondaryAction={() => setModal(null)}>
        <p className="qa-modal-body-text">작은 사이즈 모달입니다. 간단한 안내 또는 단순 확인에 사용됩니다.</p>
      </Modal>

      {/* M-02 md + primary */}
      <Modal open={modal === 'm-md-primary'} onClose={() => setModal(null)}
        title="기본 모달 (md)" subtitle="size=md, footerVariation=primary"
        size="md" footerVariation="primary"
        primaryLabel="확인" secondaryLabel="취소"
        onPrimaryAction={() => setModal(null)} onSecondaryAction={() => setModal(null)}>
        <p className="qa-modal-body-text">중간 사이즈 모달입니다. 가장 일반적인 크기입니다.</p>
      </Modal>

      {/* M-03 lg + primary */}
      <Modal open={modal === 'm-lg-primary'} onClose={() => setModal(null)}
        title="큰 모달 (lg)" subtitle="size=lg, footerVariation=primary"
        size="lg" footerVariation="primary"
        primaryLabel="확인" secondaryLabel="취소"
        onPrimaryAction={() => setModal(null)} onSecondaryAction={() => setModal(null)}>
        <p className="qa-modal-body-text">큰 사이즈 모달입니다. 상세 정보 표시나 복잡한 콘텐츠에 사용됩니다.</p>
      </Modal>

      {/* M-04 neutral */}
      <Modal open={modal === 'm-md-neutral'} onClose={() => setModal(null)}
        title="중립 모달" subtitle="footerVariation=neutral — 두 버튼 모두 보조 톤"
        size="md" footerVariation="neutral"
        primaryLabel="닫기" secondaryLabel="뒤로"
        onPrimaryAction={() => setModal(null)} onSecondaryAction={() => setModal(null)}>
        <p className="qa-modal-body-text">neutral 변형은 확인/취소가 아닌 두 보조 액션이 있을 때 사용합니다.</p>
      </Modal>

      {/* M-05 danger */}
      <Modal open={modal === 'm-md-danger'} onClose={() => setModal(null)}
        title="위험 액션 모달" subtitle="footerVariation=danger — 빨간 확인 버튼"
        size="md" footerVariation="danger"
        primaryLabel="삭제" secondaryLabel="취소"
        onPrimaryAction={() => setModal(null)} onSecondaryAction={() => setModal(null)}>
        <p className="qa-modal-body-text">이 작업은 되돌릴 수 없습니다. danger 변형은 파괴적 액션에 사용합니다.</p>
      </Modal>

      {/* M-06 단일 액션 */}
      <Modal open={modal === 'm-single-action'} onClose={() => setModal(null)}
        title="단일 액션" subtitle="showSecondaryAction=false — 확인 버튼만 노출"
        size="sm" footerVariation="primary"
        primaryLabel="확인" showSecondaryAction={false}
        onPrimaryAction={() => setModal(null)}>
        <p className="qa-modal-body-text">취소가 필요 없는 단순 안내 모달입니다.</p>
      </Modal>

      {/* M-07 footer 없음 */}
      <Modal open={modal === 'm-no-footer'} onClose={() => setModal(null)}
        title="footer 없는 모달" subtitle="footerVariation, footer 모두 undefined"
        size="md">
        <div className="qa-modal-no-footer-body">
          <p className="qa-modal-body-text">footer가 없는 content-only 모달입니다. 닫기는 우측 상단 X 버튼 또는 오버레이 클릭으로만 가능합니다.</p>
          <Button size="sm" variant="soft" onClick={() => setModal(null)}>본문 내 닫기 버튼 (커스텀)</Button>
        </div>
      </Modal>

      {/* M-08 커스텀 footer */}
      <Modal open={modal === 'm-custom-footer'} onClose={() => setModal(null)}
        title="커스텀 footer" subtitle="footer prop으로 3개 버튼 직접 주입"
        size="md"
        footer={
          <div className="qa-modal-custom-footer">
            <Button size="sm" tone="danger" variant="ghost" onClick={() => setModal(null)}>삭제</Button>
            <div className="qa-modal-custom-footer-right">
              <Button size="sm" variant="soft" onClick={() => setModal(null)}>취소</Button>
              <Button size="sm" onClick={() => setModal(null)}>저장</Button>
            </div>
          </div>
        }>
        <p className="qa-modal-body-text">footerVariation으로 처리할 수 없는 버튼 구성은 footer prop으로 직접 주입합니다.</p>
      </Modal>

      {/* M-09 title 없음 */}
      <Modal open={modal === 'm-no-title'} onClose={() => setModal(null)}
        size="md" footerVariation="primary"
        primaryLabel="확인" showSecondaryAction={false}
        onPrimaryAction={() => setModal(null)}>
        <p className="qa-modal-body-text">title prop이 없으면 header 영역(타이틀 + 닫기 버튼)이 렌더링되지 않습니다.</p>
      </Modal>

      {/* M-10 긴 본문 */}
      <Modal open={modal === 'm-long-body'} onClose={() => setModal(null)}
        title="긴 본문 스크롤 확인" subtitle="본문 높이 초과 시 스크롤 동작 확인"
        size="md" footerVariation="primary"
        primaryLabel="확인" secondaryLabel="취소"
        onPrimaryAction={() => setModal(null)} onSecondaryAction={() => setModal(null)}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="qa-modal-body-text" style={{ marginBottom: 8 }}>
            {i + 1}번째 줄입니다. 본문이 길어질 때 모달 내부 스크롤이 발생하는지 확인합니다.
          </p>
        ))}
      </Modal>

      {/* M-11 폼 포함 */}
      <Modal open={modal === 'm-form'} onClose={() => setModal(null)}
        title="사용자 정보 수정" subtitle="본문에 FormLayout + FormItem 조합"
        size="md" footerVariation="primary"
        primaryLabel="저장" secondaryLabel="취소"
        onPrimaryAction={() => setModal(null)} onSecondaryAction={() => setModal(null)}>
        <FormLayout>
          <FormItem label="이름" required>
            <Input placeholder="이름을 입력하세요" />
          </FormItem>
          <FormItem label="이메일" required>
            <Input placeholder="이메일을 입력하세요" type="email" />
          </FormItem>
          <FormItem label="역할">
            <Select
              options={[
                { value: 'admin', label: '관리자' },
                { value: 'editor', label: '편집자' },
                { value: 'viewer', label: '열람자' },
              ]}
              placeholder="역할 선택"
            />
          </FormItem>
        </FormLayout>
      </Modal>

      {/* M-12 closeOnOverlayClick=false */}
      <Modal open={modal === 'm-no-overlay-close'} onClose={() => setModal(null)}
        title="오버레이 클릭 무시" subtitle="closeOnOverlayClick=false — X 버튼만 닫기 가능"
        size="sm" footerVariation="primary"
        primaryLabel="확인" showSecondaryAction={false}
        closeOnOverlayClick={false}
        onPrimaryAction={() => setModal(null)}>
        <p className="qa-modal-body-text">오버레이(배경) 클릭 시 모달이 닫히지 않습니다. 우측 상단 X 버튼 또는 확인 버튼으로만 닫을 수 있습니다.</p>
      </Modal>

      {/* ══════════════════════════════════════════
          ConfirmDialog 인스턴스
      ══════════════════════════════════════════ */}

      <ConfirmDialog open={confirm === 'danger'} onClose={() => setConfirm(null)}
        onConfirm={() => setConfirm(null)}
        title="항목을 삭제하시겠습니까?"
        description="이 작업은 되돌릴 수 없습니다. 삭제된 데이터는 복구할 수 없습니다."
        tone="danger" confirmLabel="삭제" cancelLabel="취소" />

      <ConfirmDialog open={confirm === 'primary'} onClose={() => setConfirm(null)}
        onConfirm={() => setConfirm(null)}
        title="변경사항을 저장하시겠습니까?"
        description="저장하면 기존 데이터가 변경됩니다."
        tone="primary" confirmLabel="저장" cancelLabel="취소" />

      <ConfirmDialog open={confirm === 'loading'} onClose={() => !confirmLoading && setConfirm(null)}
        onConfirm={handleConfirmWithLoading}
        title="처리 중 로딩 확인"
        description="확인 버튼을 클릭하면 2초간 로딩 상태가 표시됩니다."
        tone="primary" confirmLabel="확인" cancelLabel="취소"
        loading={confirmLoading} />

      <ConfirmDialog open={confirm === 'no-desc'} onClose={() => setConfirm(null)}
        onConfirm={() => setConfirm(null)}
        title="로그아웃하시겠습니까?"
        tone="primary" confirmLabel="로그아웃" cancelLabel="취소" />

      <ConfirmDialog open={confirm === 'rich-desc'} onClose={() => setConfirm(null)}
        onConfirm={() => setConfirm(null)}
        title="멤버를 강제 탈퇴시키겠습니까?"
        description={
          <span>
            <strong>홍길동</strong>님의 모든 접근 권한이 즉시 해제됩니다.
          </span>
        }
        tone="danger" confirmLabel="탈퇴 처리" cancelLabel="취소" />

      {/* ══════════════════════════════════════════
          Drawer 인스턴스
      ══════════════════════════════════════════ */}

      <Drawer open={drawer === 'sm-right-inlineEnd'} onClose={() => setDrawer(null)}
        title="상세 정보 (sm)" description="size=sm · placement=right · footerLayout=inlineEnd"
        size="sm" placement="right" footerLayout="inlineEnd"
        primaryLabel="저장" secondaryLabel="취소"
        onPrimaryAction={() => setDrawer(null)} onSecondaryAction={() => setDrawer(null)}>
        <p className="qa-drawer-body-text">우측 슬라이드 패널 기본 케이스입니다.</p>
      </Drawer>

      <Drawer open={drawer === 'md-right-inlineEnd'} onClose={() => setDrawer(null)}
        title="상세 정보 (md)" description="size=md · placement=right · footerLayout=inlineEnd"
        size="md" placement="right" footerLayout="inlineEnd"
        primaryLabel="저장" secondaryLabel="취소"
        onPrimaryAction={() => setDrawer(null)} onSecondaryAction={() => setDrawer(null)}>
        <p className="qa-drawer-body-text">중간 너비 Drawer입니다.</p>
      </Drawer>

      <Drawer open={drawer === 'lg-right-inlineEnd'} onClose={() => setDrawer(null)}
        title="상세 정보 (lg)" description="size=lg · placement=right · footerLayout=inlineEnd"
        size="lg" placement="right" footerLayout="inlineEnd"
        primaryLabel="저장" secondaryLabel="취소"
        onPrimaryAction={() => setDrawer(null)} onSecondaryAction={() => setDrawer(null)}>
        <p className="qa-drawer-body-text">큰 너비 Drawer입니다.</p>
      </Drawer>

      <Drawer open={drawer === 'sm-right-stack'} onClose={() => setDrawer(null)}
        title="세로 쌓기 footer" description="footerLayout=stack — 주액션 위, 보조 액션 아래"
        size="sm" placement="right" footerLayout="stack"
        primaryLabel="저장" secondaryLabel="취소"
        onPrimaryAction={() => setDrawer(null)} onSecondaryAction={() => setDrawer(null)}>
        <p className="qa-drawer-body-text">stack 레이아웃은 버튼을 세로로 쌓아 모바일에서 자주 사용됩니다.</p>
      </Drawer>

      <Drawer open={drawer === 'sm-right-between'} onClose={() => setDrawer(null)}
        title="삭제 포함 footer" description="footerLayout=between — 좌측 삭제(ghost) + 우측 취소/확인"
        size="sm" placement="right" footerLayout="between"
        primaryLabel="저장" secondaryLabel="취소" dangerLabel="삭제"
        onPrimaryAction={() => setDrawer(null)}
        onSecondaryAction={() => setDrawer(null)}
        onDangerAction={() => setDrawer(null)}>
        <p className="qa-drawer-body-text">between 레이아웃은 수정 + 삭제가 모두 필요한 편집 폼에 사용합니다.</p>
      </Drawer>

      <Drawer open={drawer === 'neutral'} onClose={() => setDrawer(null)}
        title="중립 톤 footer" description="footerVariation=neutral — 두 버튼 모두 soft"
        size="sm" placement="right" footerLayout="inlineEnd" footerVariation="neutral"
        primaryLabel="닫기" secondaryLabel="이전"
        onPrimaryAction={() => setDrawer(null)} onSecondaryAction={() => setDrawer(null)}>
        <p className="qa-drawer-body-text">neutral 변형은 read-only 상세 보기 패널에 사용합니다.</p>
      </Drawer>

      <Drawer open={drawer === 'danger'} onClose={() => setDrawer(null)}
        title="위험 톤 footer" description="footerVariation=danger — 확인 버튼이 danger 색상"
        size="sm" placement="right" footerLayout="inlineEnd" footerVariation="danger"
        primaryLabel="삭제" secondaryLabel="취소"
        onPrimaryAction={() => setDrawer(null)} onSecondaryAction={() => setDrawer(null)}>
        <p className="qa-drawer-body-text">danger 변형은 패널 내에서 파괴적 액션을 실행할 때 사용합니다.</p>
      </Drawer>

      <Drawer open={drawer === 'left'} onClose={() => setDrawer(null)}
        title="좌측 Drawer" description="placement=left"
        size="sm" placement="left" footerLayout="inlineEnd"
        primaryLabel="확인" secondaryLabel="닫기"
        onPrimaryAction={() => setDrawer(null)} onSecondaryAction={() => setDrawer(null)}>
        <p className="qa-drawer-body-text">좌측에서 슬라이드인 되는 Drawer입니다. 주로 사이드 메뉴에 사용됩니다.</p>
      </Drawer>

      <Drawer open={drawer === 'form'} onClose={() => setDrawer(null)}
        title="사용자 편집" description="본문에 FormLayout 포함 케이스"
        size="md" placement="right" footerLayout="between"
        primaryLabel="저장" secondaryLabel="취소" dangerLabel="삭제"
        onPrimaryAction={() => setDrawer(null)}
        onSecondaryAction={() => setDrawer(null)}
        onDangerAction={() => setDrawer(null)}>
        <FormLayout>
          <FormItem label="이름" required>
            <Input placeholder="이름을 입력하세요" />
          </FormItem>
          <FormItem label="이메일" required>
            <Input placeholder="이메일" type="email" />
          </FormItem>
          <FormItem label="상태">
            <Select
              options={[
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
              ]}
              placeholder="상태 선택"
            />
          </FormItem>
        </FormLayout>
      </Drawer>

      <Drawer open={drawer === 'custom-footer'} onClose={() => setDrawer(null)}
        title="커스텀 footer" description="footer prop으로 직접 주입"
        size="sm" placement="right"
        footer={
          <div className="qa-drawer-custom-footer">
            <Badge variant="neutral">임시 저장됨</Badge>
            <Button size="sm" onClick={() => setDrawer(null)}>닫기</Button>
          </div>
        }>
        <p className="qa-drawer-body-text">footer prop으로 완전히 커스텀한 footer입니다.</p>
      </Drawer>

    </div>
  )
}

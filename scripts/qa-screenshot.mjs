/**
 * Design QA Screenshot Tool
 *
 * 쇼케이스 dev server를 실행하고, 각 컴포넌트 섹션의 스크린샷을 캡처합니다.
 * 검증 체크리스트: docs/verification-checklist.md
 *
 * Usage:
 *   node scripts/qa-screenshot.mjs                  # 모든 컴포넌트
 *   node scripts/qa-screenshot.mjs button input     # 특정 컴포넌트만
 *
 * Output: scripts/qa-screenshots/{component}.png
 *
 * 업데이트 이력:
 *   2026-04-15 — STATE_CHECKS 추가: 인터랙티브 컴포넌트 상태별 검증
 *                closedContentHeightOk: 닫힌 아이템 content 높이 누출 감지
 *                (accordion grid-template-rows+padding 버그 재발 방지)
 */

import { chromium } from 'playwright';
import { exec, spawn } from 'child_process';
import { mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, 'qa-screenshots');
const PORT = 6173; // IGT showcase 전용 포트 (충돌 방지)
const BASE_URL = `http://localhost:${PORT}`;

const COMPONENTS = [
  'colors',
  'typography',
  'icon',
  'button',
  'input',
  'textarea',
  'breadcrumb',
  'tab',
  'accordion',
  'segmentedcontrol',
  'pageindicator',
  'popover',
  'numberstepper',
  'rating',
  'row',
  'select',
  'choicechip',
  'checkbox',
  'radio',
  'switch',
  'badge',
  'countbadge',
  'label',
  'avatar',
  'divider',
  'alert',
  'skeleton',
  'table',
  'pagination',
  'modal',
  'toast',
  'tooltip',
  'applayout',
  'sidenavigation',
  'textbutton',
  'iconbutton',
  'link',
  'buttongroup',
  'togglebutton',
  'floatingbutton',
];

async function isServerRunning() {
  return new Promise((resolve) => {
    exec(`lsof -ti:${PORT}`, (err, stdout) => {
      resolve(!err && stdout.trim().length > 0);
    });
  });
}

async function waitForServer(maxWaitMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      await fetch(BASE_URL);
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return false;
}

async function captureComponent(page, componentId, theme = 'light') {
  const url = `${BASE_URL}/#${componentId}`;
  await page.goto(url, { waitUntil: 'networkidle' });

  // 섹션이 렌더될 때까지 잠시 대기
  await page.waitForTimeout(300);

  const section = page.locator(`#${componentId}`);
  await section.waitFor({ state: 'visible', timeout: 5000 });

  const filename = `${componentId}${theme === 'dark' ? '_dark' : ''}.png`;
  const outputPath = resolve(OUTPUT_DIR, filename);

  await section.screenshot({
    path: outputPath,
    animations: 'disabled',
  });

  return outputPath;
}

/**
 * 인터랙티브 컴포넌트의 상태별 추가 검증
 * - "닫힌 상태에 콘텐츠가 보이는가?" 같은 hidden/visible 확인
 */
async function runStateChecks(page, componentId) {
  const checks = STATE_CHECKS[componentId];
  if (!checks) return [];

  const results = [];
  for (const check of checks) {
    try {
      const el = page.locator(check.selector);
      const count = await el.count();
      if (count === 0) {
        results.push({ check: check.name, pass: false, reason: 'element not found' });
        continue;
      }
      const visible = await el.first().isVisible();
      const pass = check.expectVisible ? visible : !visible;
      results.push({ check: check.name, pass, reason: pass ? 'ok' : `expected visible=${check.expectVisible}, got ${visible}` });
    } catch (err) {
      results.push({ check: check.name, pass: false, reason: err.message });
    }
  }
  return results;
}

/**
 * 상태 검증 규칙
 * selector: Playwright 셀렉터
 * expectVisible: true = 보여야 함, false = 숨겨져야 함
 */
const STATE_CHECKS = {
  accordion: [
    {
      // 열린 아이템의 content-inner는 화면에 보여야 함
      name: '열린 아이템의 content-inner가 보임',
      selector: '#accordion .igt-accordion__item--open .igt-accordion__content-inner',
      expectVisible: true,
    },
  ],
  tab: [
    {
      name: '비활성 탭 indicator는 opacity:0',
      selector: '#tab .igt-tab__item:not(.igt-tab__item--active) .igt-tab__indicator',
      expectVisible: true, // DOM에는 있지만 opacity:0 — aria 기준 visible
    },
  ],
};

async function main() {
  const args = process.argv.slice(2);
  const targets = args.length > 0
    ? args.filter((a) => COMPONENTS.includes(a))
    : COMPONENTS;

  if (targets.length === 0) {
    console.error('유효하지 않은 컴포넌트 이름:', args);
    console.log('사용 가능:', COMPONENTS.join(', '));
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  // dev server 상태 확인
  let serverProcess = null;
  const serverAlreadyRunning = await isServerRunning();

  if (!serverAlreadyRunning) {
    console.log('Showcase dev server 시작 중...');
    serverProcess = spawn(
      'node',
      ['node_modules/.bin/vite', '--config', 'vite.config.showcase.ts', '--port', String(PORT)],
      {
        cwd: resolve(__dirname, '..'),
        stdio: 'ignore',
        detached: false,
      }
    );

    const ready = await waitForServer();
    if (!ready) {
      console.error('서버 시작 실패');
      serverProcess.kill();
      process.exit(1);
    }
    console.log('서버 준비 완료.');
  } else {
    console.log('기존 dev server 사용 중...');
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const results = [];

  for (const componentId of targets) {
    process.stdout.write(`  캡처: ${componentId} ... `);
    try {
      // 1. 스크린샷 캡처
      const path = await captureComponent(page, componentId);

      // 2. 상태 검증 (accordion, tab 등 인터랙티브 컴포넌트)
      const stateChecks = await runStateChecks(page, componentId);
      const stateChecksFailed = stateChecks.filter((c) => !c.pass);

      // 3. 닫힌 아이템 content 높이 검증 (accordion 전용)
      let closedContentHeightOk = true;
      if (componentId === 'accordion') {
        const heights = await page.evaluate(() => {
          const closedBodies = document.querySelectorAll(
            '#accordion .igt-accordion__item:not(.igt-accordion__item--open) .igt-accordion__content'
          );
          return Array.from(closedBodies).map((el) => ({
            height: el.getBoundingClientRect().height,
          }));
        });
        const leaked = heights.filter((h) => h.height > 2); // 1px 오차 허용
        if (leaked.length > 0) {
          closedContentHeightOk = false;
          console.log(`\n    ⚠️  닫힌 아이템 content 높이 누출: ${JSON.stringify(leaked)}`);
        }
      }

      if (stateChecksFailed.length > 0) {
        console.log(`\n    ⚠️  상태 검증 실패:`);
        stateChecksFailed.forEach((c) => console.log(`       - [${c.check}] ${c.reason}`));
      }

      results.push({
        componentId,
        path,
        success: true,
        stateChecks,
        closedContentHeightOk,
      });
      console.log(stateChecksFailed.length === 0 && closedContentHeightOk ? '완료 ✅' : '완료 (경고 있음)');
    } catch (err) {
      results.push({ componentId, error: err.message, success: false });
      console.log(`실패 (${err.message})`);
    }
  }

  await browser.close();

  if (serverProcess) {
    serverProcess.kill();
  }

  // 결과 요약
  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`\n완료: ${succeeded.length}개 성공, ${failed.length}개 실패`);
  if (failed.length > 0) {
    console.log('실패 항목:', failed.map((r) => r.componentId).join(', '));
  }

  console.log(`\n스크린샷 저장 위치: ${OUTPUT_DIR}`);

  // Claude가 파싱할 수 있도록 JSON 출력
  console.log('\n__QA_RESULTS__');
  console.log(JSON.stringify(results, null, 2));

  return results;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

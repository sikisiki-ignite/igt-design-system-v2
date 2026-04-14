import { chromium } from 'playwright';

const url = 'http://localhost:5189/';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// 폰트 로드 실패 감지
const failedFonts = [];
page.on('response', (res) => {
  if (res.url().includes('.otf') && res.status() !== 200) {
    failedFonts.push({ url: res.url(), status: res.status() });
  }
});
const loadedFonts = [];
page.on('response', (res) => {
  if (res.url().includes('.otf') && res.status() === 200) {
    loadedFonts.push(res.url().split('/').pop());
  }
});

await page.goto(url, { waitUntil: 'networkidle' });

// 폰트 패밀리 확인
const fontFamily = await page.evaluate(() => {
  return getComputedStyle(document.body).fontFamily;
});

const resolvedFont = await page.evaluate(() => {
  const el = document.querySelector('.igt-btn__label') || document.querySelector('button');
  if (!el) return null;
  return getComputedStyle(el).fontFamily;
});

// CSS 변수 확인
const tokens = await page.evaluate(() => {
  const style = getComputedStyle(document.documentElement);
  return {
    sizeCompHeightMd: style.getPropertyValue('--size-comp-height-md').trim(),
    btnPrimaryFillBg: style.getPropertyValue('--btn-primary-fill-bg').trim(),
    zModal: style.getPropertyValue('--z-modal').trim(),
    fontFamilyBase: style.getPropertyValue('--font-family-base').trim(),
  };
});

// 스크린샷
await page.screenshot({ path: '/tmp/showcase-full.png', fullPage: false });

console.log('\n=== 폰트 로드 결과 ===');
if (loadedFonts.length > 0) {
  console.log('✅ 로드 성공:', loadedFonts.join(', '));
} else {
  console.log('❌ 로드된 폰트 없음');
}
if (failedFonts.length > 0) {
  console.log('❌ 로드 실패:', failedFonts);
}

console.log('\n=== font-family 적용 확인 ===');
console.log('body font-family:', fontFamily);
console.log('버튼 font-family:', resolvedFont);

console.log('\n=== 주요 CSS 토큰 확인 ===');
console.log('--size-comp-height-md:', tokens.sizeCompHeightMd || '❌ 없음');
console.log('--btn-primary-fill-bg:', tokens.btnPrimaryFillBg || '❌ 없음');
console.log('--z-modal:', tokens.zModal || '❌ 없음');
console.log('--font-family-base:', tokens.fontFamilyBase || '❌ 없음');

console.log('\n스크린샷 저장: /tmp/showcase-full.png');

await browser.close();

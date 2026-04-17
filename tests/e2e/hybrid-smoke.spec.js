import { test, expect } from '@playwright/test';

const PAGE_ORDER = ['Program', 'Geçmiş', 'Skill', 'Plan', 'Durum', 'Beslenme'];

async function goToPage(page, label) {
  for (let index = 0; index < PAGE_ORDER.length + 1; index += 1) {
    const current = await page.getByTestId('page-nav-current').textContent();
    if ((current || '').includes(label)) return;
    await page.getByTestId('page-nav-next').click();
  }
  throw new Error(`Page not reached: ${label}`);
}

async function goToDay(page, dayKey) {
  for (let index = 0; index < 8; index += 1) {
    const currentKey = await page.getByTestId('day-nav-current').getAttribute('data-day-key');
    if (currentKey === dayKey) return;
    await page.getByTestId('day-nav-next').click();
  }
  throw new Error(`Day not reached: ${dayKey}`);
}

function localDateOffset(days = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('yb_e2e_seeded') === '1') return;
    localStorage.clear();
    localStorage.setItem('yb_e2e_auth_bypass', '1');
    localStorage.setItem('yb_program_mode', 'hybrid');
    sessionStorage.setItem('yb_e2e_seeded', '1');
  });
});

test('hybrid app shell loads with primary navigation', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  await expect(page.getByText('YEAHH BODY')).toBeVisible();
  await expect(page.getByTestId('program-selector-toggle')).toBeVisible();
  await expect(page.getByTestId('page-nav-prev')).toBeVisible();
  await expect(page.getByTestId('page-nav-current')).toContainText('Program');
  await expect(page.getByTestId('page-nav-next')).toBeVisible();
  await expect(page.getByTestId('day-nav-prev')).toBeVisible();
  await expect(page.getByTestId('day-nav-current')).toBeVisible();
  await expect(page.getByTestId('day-nav-next')).toBeVisible();
  await expect(page.getByTestId('program-start-button')).toBeVisible();
});

test('program start flow opens workout timer and next step', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  await goToDay(page, 'SALI');

  await page.getByTestId('program-start-button').click();
  await expect(page.getByText('🏁 8 Haftalık Programa Başla')).toHaveCount(0);

  await page.getByTestId('workout-start').click();
  await expect(page.getByTestId('workout-active-timer')).toBeVisible();
  await expect(page.getByTestId('next-step-button')).toBeVisible();

  await page.getByTestId('next-step-button').click();
  await expect(page.getByText('YAPILIŞ')).toBeVisible();
});

test('mode switch and tab navigation work across hybrid pages', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  await page.getByRole('button', { name: '🏋️ Macfit' }).click();
  await expect(page.locator('.day-meta')).toContainText('Macfit versiyonu');

  await page.getByRole('button', { name: '🏠 Ev' }).click();
  await expect(page.locator('.day-meta')).toContainText('Ev versiyonu');

  await goToPage(page, 'Skill');
  await expect(page.getByText('Skill İlerleme')).toBeVisible();

  await goToPage(page, 'Plan');
  await expect(page.getByText('Program Çizelgesi')).toBeVisible();

  await goToPage(page, 'Durum');
  await expect(page.getByText('Haftalık Özet')).toBeVisible();

  await goToPage(page, 'Beslenme');
  await expect(page.getByRole('button', { name: /Hibrit Gününe Göre Öğün Önerisi/i })).toBeVisible();
});

test('checkout flow completes and saves the session', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  await goToDay(page, 'SALI');
  await page.getByTestId('program-start-button').click();
  await page.getByTestId('workout-start').click();

  await expect(page.getByTestId('checkout-jump-button')).toBeVisible();
  await page.getByTestId('checkout-jump-button').click();
  await expect(page.getByTestId('checkout-panel')).toBeVisible();

  await page.getByTestId('checkout-complete-button').click();
  await expect(page.getByText('Seans kaydedildi')).toBeVisible();

  const entries = await page.evaluate(() => JSON.parse(localStorage.getItem('yb_hybrid_entries_v1') || '{}'));
  const values = Object.values(entries);
  expect(values.some((entry) => entry?.post?.completed === true)).toBeTruthy();
});

test('weekly progression prompt can advance the active week', async ({ page }) => {
  const startDate = localDateOffset(-6);
  const entries = {
    [`${localDateOffset(-6)}|SALI|home`]: { date: localDateOffset(-6), day: 'SALI', mode: 'home', post: { completed: true, rpe: '7', cardio: 'uygun', nextAction: 'aynı' } },
    [`${localDateOffset(-4)}|PERŞEMBE|home`]: { date: localDateOffset(-4), day: 'PERŞEMBE', mode: 'home', post: { completed: true, rpe: '7', cardio: 'uygun', nextAction: 'aynı' } },
    [`${localDateOffset(-2)}|CUMARTESİ|home`]: { date: localDateOffset(-2), day: 'CUMARTESİ', mode: 'home', post: { completed: true, rpe: '7', cardio: 'uygun', nextAction: 'aynı' } },
    [`${localDateOffset(0)}|PAZAR|home`]: { date: localDateOffset(0), day: 'PAZAR', mode: 'home', post: { completed: true, rpe: '7', cardio: 'uygun', nextAction: 'aynı' } },
  };

  await page.addInitScript(({ startDate, entries }) => {
    sessionStorage.setItem('yb_e2e_seeded', '1');
    localStorage.setItem('yb_hybrid_start', JSON.stringify(startDate));
    localStorage.setItem('yb_hybrid_week_v1', JSON.stringify(1));
    localStorage.setItem('yb_hybrid_week_log', JSON.stringify([]));
    localStorage.setItem('yb_hybrid_entries_v1', JSON.stringify(entries));
  }, { startDate, entries });

  await page.goto('/?e2eAuth=1');

  await expect(page.getByTestId('week-advance-prompt')).toBeVisible();
  await expect(page.getByText(/Hafta 1 tamamlandı/i)).toBeVisible();
  await page.getByTestId('week-advance-button').click();
  await expect(page.getByTestId('week-advance-prompt')).toHaveCount(0);
  await expect(page.getByText(/Hafta 2 ·/i)).toBeVisible();

  const activeWeek = await page.evaluate(() => JSON.parse(localStorage.getItem('yb_hybrid_week_v1') || '0'));
  expect(activeWeek).toBe(2);
});

test('nutrition quick add flow logs a food entry', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  await goToPage(page, 'Beslenme');
  await expect(page.getByTestId('nutrition-page')).toBeVisible();

  await page.getByTestId('nutrition-quick-toggle').click();
  await page.getByTestId('nutrition-food-0').click();
  await expect(page.getByTestId('nutrition-multiplier-overlay')).toBeVisible();
  await page.getByTestId('nutrition-multiplier-add').click();

  await expect(page.getByTestId('nutrition-log')).toBeVisible();
  await expect(page.getByTestId('nutrition-log').getByText(/Yumurta \(1 adet\)/i)).toBeVisible();
});

test('skill logging updates weekly contacts and persists the entry', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  await goToDay(page, 'SALI');
  await page.getByTestId('program-start-button').click();
  await page.getByTestId('workout-start').click();
  await page.getByTestId('checkout-jump-button').click();

  await page.getByTestId('checkout-skill-summary').click();
  await expect(page.getByTestId('skill-log-handstand')).toBeVisible();
  await page.getByTestId('skill-log-toggle-handstand').click();
  await page.getByTestId('skill-log-input-handstand').fill('12');
  await page.getByTestId('checkout-complete-button').click();

  await goToPage(page, 'Skill');
  await expect(page.getByTestId('skill-page')).toBeVisible();
  await expect(page.getByTestId('skill-contacts-handstand')).toContainText('1');
  await expect(page.getByTestId('skill-card-handstand')).toContainText('12 sn');

  const entries = await page.evaluate(() => JSON.parse(localStorage.getItem('yb_hybrid_entries_v1') || '{}'));
  const values = Object.values(entries);
  expect(values.some((entry) => entry?.post?.skillWork?.handstand?.done === true && Number(entry?.post?.skillWork?.handstand?.seconds) === 12)).toBeTruthy();
});

test('selected hybrid mode persists after reload', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  const gymModeButton = page.getByRole('button', { name: '🏋️ Macfit', exact: true });

  await gymModeButton.click();
  await expect(gymModeButton).toHaveClass(/panel-mode-btn-active/);
  await expect.poll(async () => page.evaluate(() => localStorage.getItem('yb_hybrid_mode'))).toBe('gym');

  await page.reload();

  await expect(gymModeButton).toHaveClass(/panel-mode-btn-active/);
  const savedMode = await page.evaluate(() => localStorage.getItem('yb_hybrid_mode'));
  expect(savedMode).toBe('gym');
});

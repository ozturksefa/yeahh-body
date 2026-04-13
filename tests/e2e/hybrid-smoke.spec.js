import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('yb_e2e_auth_bypass', '1');
    localStorage.setItem('yb_program_mode', 'hybrid');
  });
});

test('hybrid app shell loads with primary navigation', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  await expect(page.getByText('YEAHH BODY')).toBeVisible();
  await expect(page.getByTestId('program-selector-toggle')).toBeVisible();
  await expect(page.getByTestId('page-tab-program')).toBeVisible();
  await expect(page.getByTestId('page-tab-skill')).toBeVisible();
  await expect(page.getByTestId('page-tab-plan')).toBeVisible();
  await expect(page.getByTestId('page-tab-status')).toBeVisible();
  await expect(page.getByTestId('page-tab-nutrition')).toBeVisible();
  await expect(page.getByTestId('program-start-button')).toBeVisible();
});

test('program start flow opens workout timer and next step', async ({ page }) => {
  await page.goto('/?e2eAuth=1');

  await page.getByRole('button', { name: /SAL Ana Gün/i }).click();

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
  await expect(page.getByText('Macfit versiyonu')).toBeVisible();

  await page.getByRole('button', { name: '🏠 Ev' }).click();
  await expect(page.getByText('Ev versiyonu')).toBeVisible();

  await page.getByTestId('page-tab-skill').click();
  await expect(page.getByText('Skill İlerleme')).toBeVisible();

  await page.getByTestId('page-tab-plan').click();
  await expect(page.getByText('Program Çizelgesi')).toBeVisible();

  await page.getByTestId('page-tab-status').click();
  await expect(page.getByText('Haftalık Özet')).toBeVisible();

  await page.getByTestId('page-tab-nutrition').click();
  await expect(page.getByRole('button', { name: /Hibrit Gününe Göre Öğün Önerisi/i })).toBeVisible();
});

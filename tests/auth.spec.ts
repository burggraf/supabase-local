import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('landing page to login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('login page elements', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
  });

  test('register page elements', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
  });

  test('recovery page elements', async ({ page }) => {
    await page.goto('/recovery');
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Reset Link' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
  });
});

test.describe('Mobile View', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('landing page mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Supabase Dashboard Scaffold' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  });

  test('login page mobile', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});

test.describe('Theme Contrast', () => {
  test('dark mode contrast check on login', async ({ page }) => {
    await page.goto('/login');
    const toggle = page.getByRole('button', { name: 'Toggle theme' });
    await toggle.click();
    await page.getByRole('menuitem', { name: 'Dark' }).click();
    
    const card = page.locator('.rounded-xl.border');
    await expect(card.first()).toBeVisible();
    
    // Simple check for text visibility in dark mode
    const title = page.locator('.text-2xl.font-bold');
    await expect(title.first()).toBeVisible();
    const color = await title.first().evaluate((el) => window.getComputedStyle(el).color);
    // In dark mode, text should be light (rgb values high)
    // This is a naive check but helpful
    const rgb = color.match(/\d+/g)?.map(Number);
    if (rgb) {
      expect(rgb[0] + rgb[1] + rgb[2]).toBeGreaterThan(300);
    }
  });
});

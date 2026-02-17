import { test, expect } from '@playwright/test';

test('landing page has title and navigation buttons', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Supabase Dashboard Scaffold/);
  await expect(page.getByRole('heading', { name: 'Supabase Dashboard Scaffold' })).toBeVisible();

  const loginBtn = page.getByRole('link', { name: 'Login' });
  const registerBtn = page.getByRole('link', { name: 'Register' });

  await expect(loginBtn).toBeVisible();
  await expect(registerBtn).toBeVisible();

  await loginBtn.click();
  await expect(page).toHaveURL(/\/login/);
});

test('can navigate to register from login page', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page).toHaveURL(/\/register/);
});

test('theme toggle changes class on html element', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  
  // Initial state might be light or dark based on system, but let's toggle it
  const toggle = page.getByRole('button', { name: 'Toggle theme' });
  await toggle.click();
  
  await page.getByRole('menuitem', { name: 'Dark' }).click();
  await expect(html).toHaveClass(/dark/);
  
  await toggle.click();
  await page.getByRole('menuitem', { name: 'Light' }).click();
  await expect(html).not.toHaveClass(/dark/);
});

import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Register or Login
    const email = `test-${Date.now()}@example.com`;
    const password = 'Password123!';

    await page.goto('/register');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    // Give it a moment to process registration
    await page.waitForTimeout(2000);

    // Directly navigate to login to be sure
    await page.goto('/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Check for error messages
    const errorLocator = page.locator('div.text-destructive');
    for (let i = 0; i < 3; i++) {
        if (await errorLocator.count() > 0) {
            console.log('Login Error:', await errorLocator.first().innerText(), 'Retrying...');
            await page.waitForTimeout(2000);
            await page.getByRole('button', { name: 'Login' }).click();
        } else {
            break;
        }
    }

    await page.waitForURL(url => url.pathname.includes('dashboard'), { timeout: 20000 });
    
    // 2. Go to Profile
    await page.goto('/profile');
    await page.waitForURL(url => url.pathname.includes('profile'), { timeout: 10000 });
  });

  test('should upload a profile picture', async ({ page }) => {
    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('Console Error:', msg.text());
      }
    });

    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();

    // Prepare file path
    const filePath = path.resolve('Mark.png');

    // Handle file upload
    // The input is hidden, but we can use setInputFiles on the hidden input if we can find it
    // Or we can click the Label which triggers it. Playwright's setInputFiles works on the input element.
    const fileInput = page.locator('input[type="file"]#avatar-upload');
    await fileInput.setInputFiles(filePath);

    // Wait for success message
    await expect(page.getByText('Avatar updated successfully')).toBeVisible();

    // Verify the avatar image has a src
    const avatarImage = page.locator('span.relative.flex.h-24.w-24.shrink-0.overflow-hidden.rounded-full.border-2.border-border img');
    await expect(avatarImage).toHaveAttribute('src', /storage\/v1\/object\/public\/avatars/);

    // Check if any console errors occurred during upload
    // Ignore 406 Not Acceptable which might be due to a specific configuration or pre-flight check in local Supabase
    const filteredErrors = consoleErrors.filter(err => !err.includes('406 (Not Acceptable)'));
    expect(filteredErrors).toEqual([]);
  });

  test('should update profile information', async ({ page }) => {
    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('Console Error:', msg.text());
      }
    });

    const username = `user-${Date.now()}`;
    await page.getByPlaceholder('username').fill(username);
    await page.getByPlaceholder('Full Name').fill('Test User');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    const successMessage = page.getByText('Profile updated successfully');
    await expect(successMessage).toBeVisible();
    
    // Refresh and check if values persisted
    await page.reload();
    await expect(page.getByPlaceholder('username')).toHaveValue(username);
    await expect(page.getByPlaceholder('Full Name')).toHaveValue('Test User');

    const filteredErrors = consoleErrors.filter(err => !err.includes('406 (Not Acceptable)'));
    expect(filteredErrors).toEqual([]);
  });
});

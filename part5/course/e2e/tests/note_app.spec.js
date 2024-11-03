const { test, expect, describe, beforeEach } = require('@playwright/test');
const { loginWith, createNote } = require('./helper');

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Admin',
        username: 'admin',
        password: 'admin'
      }
    });
    await page.goto('/');
  });

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes');
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2024'
      )
    ).toBeVisible();
  });

  test('login form can be opened', async ({ page }) => {
    await loginWith(page, 'admin', 'admin');
    await expect(page.getByText('Admin logged-in')).toBeVisible();
  });

  test('login fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'wrong', 'wrong');

    const notificationDiv = await page.locator('.notification');
    await expect(notificationDiv).toContainText('Invalid username or password');

    await expect(page.getByText('Admin logged-in')).not.toBeVisible();
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'admin', 'admin');
    });

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright');
      await expect(
        page.getByText('a note created by playwright')
      ).toBeVisible();
    });

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'another note created by playwright');
      });

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click();
        await expect(page.getByText('make important')).toBeVisible();
      });
    });

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note');
        await createNote(page, 'second note ');
        await createNote(page, 'third note ');
      });

      test('importance can be changed on one of those', async ({ page }) => {
        let button = await page
          .locator('li')
          .filter({ hasText: 'second note make not important' })
          .getByRole('button');
        await button.click();
        button = await page
          .locator('li')
          .filter({ hasText: 'second note make important' })
          .getByRole('button');
        await expect(button).toBeVisible();
      });
    });
  });
});

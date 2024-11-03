const { test, expect, describe, beforeEach } = require('@playwright/test');
const { loginWith, createBlog, likeBlog, openBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Admin',
        username: 'admin',
        password: 'admin'
      }
    });

    await request.post('/api/users', {
      data: {
        name: 'User',
        username: 'user',
        password: 'user'
      }
    });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    const loginButton = await page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    const usernameField = await page.getByLabel('Username');
    await expect(usernameField).toBeVisible();
    const passwordField = await page.getByLabel('Password');
    await expect(passwordField).toBeVisible();
    const submitLoginButton = await page.getByRole('button', { name: 'Login' });
    await expect(submitLoginButton).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'admin', 'admin');
      await expect(page.getByText('Admin logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wrong', 'wrong');
      await expect(
        page.getByText('Invalid username or password')
      ).toBeVisible();
      await expect(page.getByText('Admin logged-in')).not.toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'admin', 'admin');
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'author', 'title', 'url');
      await expect(page.getByText('title author')).toBeVisible();
    });

    test('a new blog can be liked', async ({ page }) => {
      await createBlog(page, 'author', 'title', 'url');
      await page.getByRole('button', { name: 'view' }).click();
      await page.getByRole('button', { name: 'Like' }).click();
      await expect(page.locator('.likes')).toHaveText('1 Like');
    });

    test('a new blog can be deleted', async ({ page }) => {
      await createBlog(page, 'author', 'title', 'url');
      await page.getByRole('button', { name: 'view' }).click();
      page.on('dialog', (dialog) => dialog.accept());
      await page.getByRole('button', { name: 'Remove' }).click();
      await expect(page.getByText('title author')).not.toBeVisible();
    });

    test('cannot delete blog of another user', async ({ page }) => {
      await createBlog(page, 'author', 'title', 'url');
      await page.getByRole('button', { name: 'logout' }).click();
      await loginWith(page, 'user', 'user');
      await page.getByRole('button', { name: 'view' }).click();
      await expect(
        page.getByRole('button', { name: 'Remove' })
      ).not.toBeVisible();
    });

    test('blogs are sorted by likes descending', async ({ page }) => {
      await createBlog(page, 'first', 'first', 'url');
      await createBlog(page, 'second', 'second', 'url');
      await createBlog(page, 'third', 'third', 'url');

      await openBlog(page, 'second', 'second');
      for (let i = 0; i < 10; i++) {
        await likeBlog(page, 'second', 'second');
      }

      await openBlog(page, 'first', 'first');
      for (let i = 0; i < 50; i++) {
        await likeBlog(page, 'first', 'first');
      }

      await openBlog(page, 'third', 'third');
      for (let i = 0; i < 100; i++) {
        await likeBlog(page, 'third', 'third');
      }

      const likesLocators = await page.locator('.likes').allTextContents();
      let descending = true;
      let currentValue = Number.MAX_SAFE_INTEGER;

      for (const likesText of likesLocators) {
        const likesCount = parseInt(likesText.match(/\d+/)[0]);
        console.log(likesCount);
        if (likesCount <= currentValue) {
          currentValue = likesCount;
        } else {
          descending = false;
          break;
        }
      }
      expect(descending).toBeTruthy();
    });
  });
});

const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
};

const createBlog = async (page, author, title, url) => {
  await page.getByRole('button', { name: 'Add blog' }).click();
  await page.getByLabel('Author').fill(author);
  await page.getByLabel('Title').fill(title);
  await page.getByLabel('Url').fill(url);
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByText(`${author} ${author}`).waitFor();
};

const openBlog = async (page, title, author) => {
  const blog = await page
    .locator('div')
    .filter({ hasText: new RegExp(`^${title} ${author}`) });
  await blog.getByRole('button', { name: 'view' }).click();
};

const likeBlog = async (page, title, author) => {
  const blog = await page
    .locator('div')
    .filter({ hasText: new RegExp(`^${title} ${author}`) });
  await blog.getByRole('button', { name: 'Like' }).click();
};

export { loginWith, createBlog, openBlog, likeBlog };

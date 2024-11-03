const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'create new note' }).click();
  await page.getByPlaceholder('write note content here').fill(content);
  await page.getByRole('button', { name: 'save' }).click();
  await page.getByText(content).waitFor();
};

export { loginWith, createNote };

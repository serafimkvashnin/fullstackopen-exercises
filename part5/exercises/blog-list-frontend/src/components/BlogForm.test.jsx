import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';

test('Create blog event handler gets called with correct data', async () => {
  const blog = {
    title: 'blog blog',
    author: 'author author',
    url: 'url url'
  };

  const user = userEvent.setup();

  const handleAddBlog = vi.fn();
  render(<BlogForm blog={blog} onAddBlog={handleAddBlog} />);

  const titleInput = screen.getByLabelText('Title');
  await user.type(titleInput, blog.title);

  const authorInput = screen.getByLabelText('Author');
  await user.type(authorInput, blog.author);

  const urlInput = screen.getByLabelText('Url');
  await user.type(urlInput, blog.url);

  const addButton = screen.getByText('Create');
  await user.click(addButton);

  expect(handleAddBlog.mock.calls).toHaveLength(1);
  expect(handleAddBlog.mock.calls[0][0]).toStrictEqual(blog);
});

import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

test('Renders component correctly', async () => {
  const blog = {
    title: 'blog blog',
    author: 'author author',
    url: 'url url',
    likes: 999
  };

  render(<Blog blog={blog} />);

  let element = screen.getByText(blog.title, { exact: false });
  expect(element).toBeDefined();

  element = screen.getByText(blog.author, { exact: false });
  expect(element).toBeDefined();

  element = screen.queryByText(blog.url);
  expect(element).toBeNull();

  element = screen.queryByText(blog.likes);
  expect(element).toBeNull();
});

test('Expands and renders additional info', async () => {
  const blogData = {
    title: 'blog blog',
    author: 'author author',
    url: 'url url',
    likes: 999,
    user: {
      name: 'name',
      username: 'username'
    }
  };

  const userData = {
    name: 'name',
    username: 'username'
  };

  render(<Blog blog={blogData} user={userData} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText('view');

  await user.click(viewButton);

  let element = screen.getByText(blogData.url);
  expect(element).toBeDefined();

  element = screen.getByText(blogData.likes);
  expect(element).toBeDefined();
});

test('Like button clicked twice calls event handler twice', async () => {
  const blogData = {
    title: 'blog blog',
    author: 'author author',
    url: 'url url',
    likes: 999,
    user: {
      name: 'name',
      username: 'username'
    }
  };

  const userData = {
    name: 'name',
    username: 'username'
  };

  const user = userEvent.setup();

  const handleLike = vi.fn();

  render(<Blog blog={blogData} user={userData} onLike={handleLike} />);

  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = screen.getByText('Like');
  await user.click(likeButton);
  expect(handleLike.mock.calls).toHaveLength(1);

  await user.click(likeButton);
  expect(handleLike.mock.calls).toHaveLength(2);
});

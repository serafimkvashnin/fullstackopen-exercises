import { render, screen } from '@testing-library/react';
import Note from './Note';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  render(<Note note={note} onToggleImportance={() => {}} />);

  const element = await screen.findByText(note.content, { exact: false });
  expect(element).toBeDefined();
});

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  const mockHandler = vi.fn();

  render(<Note note={note} onToggleImportance={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText('make not important');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  };

  render(<Note note={note} onToggleImportance={() => {}} />);

  const element = screen.queryByText('do not want this thing to be rendered');
  expect(element).toBeNull();
});

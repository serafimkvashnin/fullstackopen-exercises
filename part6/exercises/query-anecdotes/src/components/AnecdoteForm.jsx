import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onError: (error) => {
          notificationDispatch({
            type: 'SET',
            payload: error.response.data.error
          });
        },
        onSuccess: (newAnecdote) => {
          notificationDispatch({
            type: 'SET',
            payload: `New anecdote created '${newAnecdote.content}'`
          });
        }
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

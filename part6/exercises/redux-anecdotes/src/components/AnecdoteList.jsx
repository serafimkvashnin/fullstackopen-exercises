import { useDispatch, useSelector } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, onVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={onVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id));
    dispatch(showNotification(`You voted for '${anecdote.content}'`));
  };

  return anecdotes.map((anecdote) => (
    <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
      onVote={() => vote(anecdote)}
    />
  ));
};

export default AnecdoteList;

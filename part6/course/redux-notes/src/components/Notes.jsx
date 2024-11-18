import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

const Note = ({ note, onClick }) => {
  return (
    <li key={note.id}>
      {note.content}{' '}
      <button onClick={onClick}>
        <strong>{note.important ? 'important' : 'not important'}</strong>
      </button>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    if (state.filter === 'IMPORTANT') {
      return state.notes.filter((note) => note.important);
    } else if (state.filter === 'NONIMPORTANT') {
      return state.notes.filter((note) => !note.important);
    }
    return state.notes;
  });

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onClick={() => toggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;

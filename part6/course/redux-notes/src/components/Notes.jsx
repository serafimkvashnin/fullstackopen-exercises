import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from './reducers/noteReducer';

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
  const notes = useSelector((state) => state);

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => toggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;

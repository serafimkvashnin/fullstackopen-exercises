import PropTypes from 'prop-types';

const Note = ({ note, onToggleImportance }) => (
  <li className="note">
    <span>
      {note.important ? <strong>{note.content}</strong> : note.content}
    </span>
    <button onClick={() => onToggleImportance(note)}>
      {note.important ? 'make not important' : 'make important'}
    </button>
  </li>
);

Note.propTypes = {
  note: PropTypes.object.isRequired,
  onToggleImportance: PropTypes.func.isRequired
};

export default Note;

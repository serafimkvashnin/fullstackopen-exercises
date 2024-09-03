const Note = ({ note, onToggleImportance }) => <li>
  {note.important ? <strong>{note.content}</strong> : note.content}
  <button onClick={() => onToggleImportance(note)}>
    {note.important ? 'make not important' : 'make important'}
  </button>
</li>

export default Note
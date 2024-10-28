import { useState } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import { useEffect } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';
import { useRef } from 'react';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((returnedNotes) => setNotes([...returnedNotes]));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const createNote = (note) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(note).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const handleToggleImportance = (note) => {
    const newNote = {
      ...note,
      important: !note.important
    };
    noteService
      .put(note.id, newNote)
      .then((returnedNote) =>
        setNotes(notes.map((n) => (n.id !== note.id ? n : returnedNote)))
      )
      .catch((error) => {
        setErrorMessage(
          `The note '${note.content}' was already deleted from server!`
        );
        setNotes(notes.filter((n) => n.id !== note.id));
      });
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      noteService.setToken(user.token);
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    noteService.setToken('');
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm onLogin={handleLogin} />
      </Togglable>
    );
  };

  const noteForm = () => (
    <Togglable buttonLabel="create new note" ref={noteFormRef}>
      <NoteForm createNote={createNote} />
    </Togglable>
  );

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <>
      <h1>Notes</h1>

      <Notification
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in<button onClick={handleLogout}>logout</button>
          </p>
          {noteForm()}
        </div>
      )}

      <div>
        <label>
          <input
            type="checkbox"
            onChange={() => setShowAll(!showAll)}
            checked={showAll}
          />
          Show all
        </label>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            onToggleImportance={handleToggleImportance}
          />
        ))}
      </ul>
      <Footer />
    </>
  );
};

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  );
};

export default App;

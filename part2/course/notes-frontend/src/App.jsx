import { useState } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import { useEffect } from 'react';
import noteService from './services/notes';
import loginService from './services/login';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const addNote = (event) => {
    event.preventDefault();
    const newNote = {
      content: newNoteText,
      important: Math.random() > 0.5
    };

    noteService.create(newNote).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNoteText('');
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      noteService.setToken(user.token);
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
    setUsername('');
    setPassword('');
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNoteText}
        onChange={(event) => setNewNoteText(event.target.value)}
      />
      <button type="submit">Save</button>
    </form>
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
          <p>{user.name} logged-in</p>
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

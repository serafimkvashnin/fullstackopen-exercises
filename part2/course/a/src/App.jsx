import { useState } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import { useEffect } from 'react'
import noteService from './services/notes'

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNoteText, setNewNoteText ] = useState("a new note...")
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState('Error occured.')

  useEffect(() => {
    noteService
      .getAll()
      .then(returnedNotes => setNotes([...returnedNotes]))
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()
    const newNote = {
      content: newNoteText,
      important: Math.random() > 0.5
    }
    
    noteService
      .create(newNote)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNoteText("")
      })
  }

  const handleToggleImportance = (note) => {
    const newNote = {
      important: !note.important
    }
    noteService
      .patch(note.id, newNote)
      .then(returnedNote => setNotes(notes.map(n => n.id !== note.id ? n : returnedNote)))
      .catch(error => {
        setErrorMessage(`The note '${note.content}' was already deleted from server!`)
        setNotes(notes.filter(n => n.id !== note.id))
      })
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
      <Notification 
        message={errorMessage} 
        onClose={() => setErrorMessage(null)}
      />
      <div>
        <label>
          <input 
            type="checkbox"
            onChange={(_) => setShowAll(!showAll)}
            checked={showAll}
          />
          Show all
        </label>
      </div>
      <ul>
        {notesToShow.map((note) => 
          <Note 
            key={note.id} 
            note={note}
            onToggleImportance={handleToggleImportance}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNoteText} 
          onChange={(event) => 
            setNewNoteText(event.target.value)
          }
        />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

export default App
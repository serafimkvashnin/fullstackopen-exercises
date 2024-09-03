import { useState } from 'react'
import Note from './components/Note'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNoteText, setNewNoteText ] = useState("a new note...")
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3001/notes').then(response => {
      setNotes(response.data)
    })
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()
    const newNote = {
      id: notes.length + 1,
      content: newNoteText,
      important: Math.random() > 0.5
    }
    setNotes(notes.concat(newNote))
    setNewNoteText("")
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
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
    </>
  )
}

export default App
import Note from './components/Note'

const App = (props) => {
  const { notes } = props

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => 
          <Note 
            key={note.id} 
            text={note.content}
          />
        )}
      </ul>
    </>
  )
}

export default App
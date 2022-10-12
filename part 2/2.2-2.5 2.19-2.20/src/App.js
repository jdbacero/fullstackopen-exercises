import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './component/Note'
import Notification from './component/Notification'
import './index.css'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(allNotes => {
        console.log('promised fulfilled')
        setNotes(allNotes)
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    const note = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5
    }

    noteService.create(note)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        console.log(returnedNote)
      })
    // setNotes(notes.concat(note))
    setNewNote('')
    console.log('Submit clicked.', e.target)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(e => {
        setErrorMsg(`The note ${note.content} does not exist in the server.`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "Important" : "All"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
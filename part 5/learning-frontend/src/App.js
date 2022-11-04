import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import Note from './component/Note'
import Notification from './component/Notification'
import './index.css'
import loginService from './services/login'
import LoginForm from './component/Login'
import Togglable from './component/Togglable'
import NoteForm from './component/NoteForm'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll()
      .then(allNotes => {
        console.log('promised fulfilled')
        setNotes(allNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (noteObject) => {

    noteService.create(noteObject)
      .then(returnedNote => {
        noteFormRef.current.toggleVisibility()
        setNotes(notes.concat(returnedNote))
        console.log(returnedNote)
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(e => {
        console.log(e)
        setErrorMsg(`The note ${note.content} does not exist in the server.`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      noteService.setToken(user.token)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMsg('Wrong credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      {user === null
      }
      <Togglable buttonLabel='Login'>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Togglable>
      <Togglable buttonLabel="New Note" ref={noteFormRef}>
        <NoteForm
          createNote={addNote}
        />
      </Togglable>
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
    </div>
  )
}

export default App
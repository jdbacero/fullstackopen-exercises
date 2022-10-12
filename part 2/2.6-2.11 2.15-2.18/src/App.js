import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import phonebookService from './service/phonebook'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    phonebookService.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }, [notification.message !== null])

  const [nameFilter, setNameFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification} />

      <h2>Numbers</h2>
      <Numbers setPersons={setPersons} persons={persons} nameFilter={nameFilter} setNotification={setNotification} />
    </div>
  )
}

export default App
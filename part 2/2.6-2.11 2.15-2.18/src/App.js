import { useState, useEffect, useRef } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import phonebookService from './service/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    phonebookService.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const [nameFilter, setNameFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Numbers setPersons={setPersons} persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App
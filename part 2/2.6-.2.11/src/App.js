import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [nameFilter, setNameFilter] = useState('')

  const personToShow = nameFilter.length === 0 ? persons : persons.filter(value => value.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Numbers personToShow={personToShow} />
    </div>
  )
}

export default App
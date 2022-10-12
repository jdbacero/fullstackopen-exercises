import { useState } from "react"
import phonebookService from "../service/phonebook"
const PersonForm = ({ persons, setPersons }) => {

    const [newPerson, setNewPerson] = useState({ name: '', number: '' })

    const handlePersonChange = (e) => setNewPerson({ ...newPerson, [e.target.name]: e.target.value, id: persons.length + 1 })

    const addPhonebook = (e) => {
        e.preventDefault()
        if (persons.some(el => el.name === newPerson.name)) {
            const update = window.confirm(`${newPerson.name} already exists. Replace the old number with a new one?`)
            if (update) {
                const person = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
                console.log(person.id)
                phonebookService.update(person.id, { ...person, number: newPerson.number })
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
                    })
            }
            setNewPerson({ name: '', number: '' })
            return
        }

        phonebookService.create(newPerson)
            .then(person => {
                setPersons(persons.concat({ ...person }))
                setNewPerson({ name: '', number: '' })
            })
    }

    return (
        <form>
            <h3>Add New</h3>
            <div>
                Name: <input onChange={handlePersonChange} name="name" value={newPerson.name} />
            </div>
            <div>
                Number: <input onChange={handlePersonChange} name="number" value={newPerson.number} />
            </div>
            <div>
                <button type="submit" onClick={addPhonebook}>Add</button>
            </div>
        </form>
    )

}

export default PersonForm
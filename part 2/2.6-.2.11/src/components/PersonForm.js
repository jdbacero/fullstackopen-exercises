import { useState } from "react"
const PersonForm = ({ persons, setPersons }) => {

    const [newPerson, setNewPerson] = useState({ name: '', number: '' })

    const handlePersonChange = (e) => setNewPerson({ ...newPerson, [e.target.name]: e.target.value, id: persons.length + 1 })

    const addPhonebook = (e) => {
        e.preventDefault()
        if (persons.some(el => el.name === newPerson.name)) {
            alert(`${newPerson.name} is already added to phonebook.`)
            setNewPerson({ name: '', number: '' })
            return
        }

        setPersons(persons.concat({ ...newPerson }))
        setNewPerson({ name: '', number: '' })
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
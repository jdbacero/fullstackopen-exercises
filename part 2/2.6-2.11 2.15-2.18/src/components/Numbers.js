import phonebookService from "../service/phonebook"
import { useEffect, useState } from "react"
const Numbers = ({ setPersons, persons, nameFilter }) => {
    const [personToShow, setPersonToShow] = useState(persons)
    // let personToShow = nameFilter.length === 0 ? persons : persons.filter(value => value.name.toLowerCase().includes(nameFilter.toLowerCase()))
    useEffect(() => {
        setPersonToShow(nameFilter.length === 0 ? persons : persons.filter(value => value.name.toLowerCase().includes(nameFilter.toLowerCase())))
        console.log(personToShow)
    }, [persons, nameFilter])

    const deletePerson = id => {
        return () => {
            const personIndex = personToShow.findIndex(person => person.id === id)
            if (window.confirm(`Are you sure you want to delete ${personToShow[personIndex].name}?`)) {
                phonebookService.remove(id)
                    .then(() => {
                        console.log("deleting")
                        setPersons(persons.flatMap(person => person.id !== id ? person : []))
                        console.log(personIndex, persons)
                    })
                    .catch(e => {
                        console.log(e)
                        alert("Something went wrong.")
                    })
            }
        }
    }
    return (
        <div>
            {personToShow.map((person) => {
                return (
                    <div key={person.id}>
                        <p>
                            {person.name} | {person.number}
                            <button onClick={deletePerson(person.id)}>Delete</button>
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default Numbers
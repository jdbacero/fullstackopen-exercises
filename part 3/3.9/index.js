const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let phonebook = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
    {
        name: "Jorex D Bacero",
        number: "112",
        id: 5
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(person => person.id === id)
    if (person) return response.json(person)
    else return response.status(404).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    // TODO: Add constraints and checkers

    // ENDTODO:
    const id = Math.max(...phonebook.map(person => person.id))
    const person = {
        name: body.name,
        number: body.number,
        id: id + 1
    }
    phonebook = phonebook.concat(person)
    response.json(phonebook)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204)
})

const PORT = 3001
app.listen(PORT)
console.log(`Listening to port ${PORT}.`)
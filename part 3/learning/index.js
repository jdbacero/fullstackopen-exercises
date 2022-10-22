// const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

const errorHandler = (error, request, response, next) => {
    console.log('---')
    console.error(error.message)
    console.log('---')
    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' })
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send("<h1>Hellooo world!</h1>")
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) response.json(note)
            else response.status(404).end()
        })
        .catch(err => {
            return next(err)
            // console.log(err)
            // response.status(400).send({ error: 'Malformatted ID' })
        })
    // const id = Number(request.params.id)
    // console.log(id)
    // const note = notes.find(note => note.id === id)
    // console.log(note)
    // if (note) response.json(note)
    // else response.status(404).end()
})

app.delete('/api/notes/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // notes = notes.filter(note => note.id !== id)

    // response.status(204).end()
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            console.log("Deleted note:", result)
            if (result) response.status(204).end()
            else response.status(410).end()
        })
        .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(404).json({
            error: "content missing"
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
        // id: generateId()
    })

    console.log(note)

    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(err => next(err))
    // notes = notes.concat(note)
})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    Note.findByIdAndUpdate(request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(err => next(err))
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id)) : 0

    return maxId + 1
}


app.use(unknownEndpoint)

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

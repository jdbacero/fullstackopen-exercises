const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('Connecting to...', url)
mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(err => console.log('Error connecting to MongoDB:', err))

const noteSchema = mongoose.Schema({
    content: { type: String, required: true, minLength: 5 },
    date: { type: Date, default: Date.now() },
    important: Boolean
})

noteSchema.set('toJSON', {
    transform(document, returnedObject) {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
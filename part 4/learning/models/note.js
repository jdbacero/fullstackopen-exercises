const mongoose = require('mongoose')

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
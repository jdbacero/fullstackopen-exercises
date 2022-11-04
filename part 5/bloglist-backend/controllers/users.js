const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
        .populate('blogs', { title: 1, author: 1, likes: 1, url: 1 })
    response.json(users)
})

usersRouter.post('/', [
    body('username').notEmpty().withMessage('Username should not be empty'),
    body('password').notEmpty().withMessage('Password should not be empty'),
    body('username').isLength({ min: 3 }).withMessage('username must be at least 3 chars long.'),
    body('password').isLength({ min: 3 }).withMessage('password must be at least 3 chars long.'),
], async (request, response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { username, name, password } = request.body
    // console.log({ username, password })
    if (!username || !password) {
        return response.status(400).json({
            error: 'Username and password must be provided.'
        })
    }

    if (password.length < 3) {
        return response.status(400).json({
            error: 'Password must contain at least 3 characters'
        })
    }
    console.log('Passed through password constraint validator')
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return response.status(400).json({
                error: 'Username already taken.'
            })
        }
        console.log('Existing user validator')

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        console.log('Hashed password.')
        const user = new User({ username, name, passwordHash })
        console.log('saving user..')
        const savedUser = await user.save()
        console.log('saved')

        response.status(201).json(savedUser)

    } catch (exception) {
        console.log(exception)
        response.status(400).json({
            error: exception.name
        })
    }
})

usersRouter.delete('/:id', async (request, response) => {
    const { id } = request.body
    await User.findByIdAndDelete(id)
    response.status(204).end()
})

module.exports = usersRouter
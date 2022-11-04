const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const new_user = new User({
        name: 'Steve',
        username: 'steve',
        passwordHash
    })
    await new_user.save()
})

describe('Creating invalid users', () => {
    test('Invalid users with invalid usernames', async () => {
        const invalidUsers = [
            {
                name: 'Invalid username length',
                username: 'as',
                password: 'password'
            },
            {
                name: 'Not unique username',
                username: 'steve',
                password: 'password'
            }
        ]

        await api.post('/api/users')
            .send(invalidUsers[0])
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(invalid1.body.error).toContain('ValidationError')

        await api.post('/api/users')
            .send(invalidUsers[1])
            .expect(400)
            .expect('Content-Type', /application\/json/)

    }, 10000)
});

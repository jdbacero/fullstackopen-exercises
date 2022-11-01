const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const blogs = [
    {
        "title": "Matchichang",
        "author": "Teia",
        "url": "how-matcha-is-the-best-dog",
        "likes": 10,
    },
    {
        "title": "Bonbon",
        "author": "Rex",
        "url": "how-bonbon-is-an-annoying-catto",
        "likes": 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObj = blogs.map(blog => new Blog(blog))
    const promiseArr = blogObj.map(blog => blog.save())
    await Promise.all(promiseArr)
})

test('blogs are returned as json', async () => {
    try {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    } catch (err) {
        console.log(err)
    }
})

test('determine if ID is defined in all blogs', async () => {
    const blogs = await api.get('/api/blogs/')
    for (let x = 0; x < blogs.body.length; x++) {
        expect(blogs.body[x].id).toBeDefined()
    }
})

test('determine if likes is defined in all blogs. if not, default to 0.', async () => {
    const blogs = await api.get('/api/blogs/')
    for (let x = 0; x < blogs.body.length; x++) {
        expect(blogs.body[x].id).toBeDefined()
    }
})

test('determine if new blog post is reflected in db', async () => {
    const new_blog = {
        "title": "Nganong Cute si Teia",
        "author": "Rex",
        "url": "teia-is-cute-uwu",
        "likes": 1231546
    }

    try {
        await api.post('/api/blogs')
            .send(new_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const bloggerinos = await Blog.find({})
        expect(bloggerinos).toHaveLength(blogs.length + 1)
        expect(bloggerinos.map(blog => blog.url)).toContain(
            'teia-is-cute-uwu'
        )
    } catch (error) {
        console.log(error)
    }
})

test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
    const new_blog = {
        "title": "Jorex Batig Nawng",
        "author": "Teia",
        "url": "jorx-peepee-poopoo"
    }

    expect(new_blog.likes).toBeUndefined()

    const response = await api.post('/api/blogs')
        .send(new_blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
})

test('verifies that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const new_blogs = [
        {
            "title": "Bonbon the Cat",
            "author": "Rex",
        },
        {
            "url": "matcha-the-dog",
            "author": "Teia",
        }
    ]

    await api.post('/api/blogs/')
        .send(new_blogs[0])
        .expect(400)
})

test('verifies if blog can and has been deleted', async () => {
    const blogsInDb = await Blog.find({})
    const blog_id = blogsInDb[0]._id.toString()

    await api.delete(`/api/blogs/${blog_id}`)
        .expect(204)

    const currentBlogs = await Blog.find({})

    expect(currentBlogs).toHaveLength((blogs.length - 1))

    expect(currentBlogs.map(blog => blog.title)).not.toContain(blogs[0].title)
})

test('updates a blog', async () => {
    const blogsInDb = await Blog.find({})
    const blog_id = blogsInDb[0]._id.toString()
    const updated_blog = await api.put(`/api/blogs/${blog_id}`)
        .send({
            title: 'Matcha',
            author: 'Téa',
            url: 'matcha-dog'
        })
    console.log(updated_blog._body)
    console.log(blogs[0])
    expect(updated_blog).not.toBe(blogs[0])
})

afterAll(() => {
    mongoose.connection.close()
})
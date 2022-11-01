const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        response.status(400).json({
            error: "Blog must have title and URL."
        })
    }
    try {
        const blog = new Blog(request.body)

        await blog.save()
            .then(result => {
                response.status(201).json(result)
            })
    } catch (exception) {
        console.log(exception)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (err) {
        console.log(err)
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true })
        response.json(updatedBlog)
    } catch (e) {
        console.log(e)
    }
})

module.exports = blogsRouter
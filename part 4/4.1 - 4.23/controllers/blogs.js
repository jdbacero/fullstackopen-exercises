const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).populate('user', { username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
    try {
        console.log('inserting blog..')
        const body = request.body
        const user = request.user
        console.log(user)
        if (!body.title || !body.url) {
            response.status(400).json({
                error: "Blog must have title and URL."
            })
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user._id
        })

        const saved_blog = await blog.save()
        user.blogs = user.blogs.concat(saved_blog)
        await user.save()
        response.status(201).json(saved_blog)

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    try {
        const user = request.user
        const blog = await Blog.findById(request.params.id)

        if (blog.user && blog.user.toString() === user.id) {
            console.log('same user')
            await Blog.findByIdAndRemove(request.params.id)

            response.status(204).end()
        } else {
            response.status(401).json({
                error: 'You are not authorized to delete this blog.'
            })
        }
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
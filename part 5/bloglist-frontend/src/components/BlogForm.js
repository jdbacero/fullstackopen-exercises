import { useState } from "react"

const BlogForm = ({ submitNewBlog }) => {
    const [new_blog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const submitHandler = (e) => {
        e.preventDefault()
        submitNewBlog(new_blog)
        setNewBlog({ title: '', url: '', author: '' })
    }

    const handleNewBlog = (e) => {
        setNewBlog({ ...new_blog, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={submitHandler}>
            <h1>Create new</h1>
            <div>
                <label htmlFor="title">Title:</label>
                <input type='text' name='title' id='title' value={new_blog.title} onChange={handleNewBlog} />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input type='text' name='author' id='author' value={new_blog.author} onChange={handleNewBlog} />
            </div>
            <div>
                <label htmlFor="url">URL:</label>
                <input type='text' name='url' id='url' value={new_blog.url} onChange={handleNewBlog} />
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default BlogForm
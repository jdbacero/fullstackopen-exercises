import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggle from './components/Toggle'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const logged_user = await loginService.login({ username, password })
      setUser(logged_user)
      console.log(user)
      blogService.setToken(logged_user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(logged_user)
      )
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ type: 'error', message: error.response.data.error })
      setTimeout(() => {
        setNotification({ type: '', message: '' })
      }, 5000)
      console.log(error)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="login">Login: </label>
          <input type="text" name="login" id="login" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form >
    )
  }

  const blogsList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }


  const submitNewBlog = (blog_object) => {
    blogService.create(blog_object)
      .then(returned_blog => {
        setBlogs(blogs.concat(returned_blog))
        setNotification({ type: 'success', message: `A new blog ${returned_blog.title} by ${returned_blog.author} has been added.` })
        setTimeout(() => {
          setNotification({ type: '', message: '' })
        }, 5000)
      })
      .catch(error => {
        setNotification({ type: 'error', message: error.response.data.error })
        setTimeout(() => {
          setNotification({ type: '', message: '' })
        }, 5000)
        console.log(error.response.data.error)
      })
  }

  const Notification = ({ message }) => {
    if (message === null || message === '') {
      return null
    }

    return (
      <div className={`notification ${notification.type}`}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification.message} />
      {
        user === null
          ? loginForm()
          : <div>
            {blogsList()}
            <p>{user.name} logged in</p>
            <button onClick={() => {
              setUser(null)
              window.localStorage.removeItem('loggedBlogUser')
            }
            }>Logout</button>
          </div>
      }


      <Toggle ref={blogFormRef} buttonName="New Blog">
        <BlogForm submitNewBlog={submitNewBlog} />
      </Toggle>
    </div>
  )
}

export default App

import Toggle from "./Toggle"
import { useRef } from "react"

const Blog = ({ blog }) => {

  const blogDetailsRef = useRef()
  const user = blog.user ? blog.user.username : ''
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
      </p>

      <Toggle ref={blogDetailsRef} buttonName='View'>
        <p>likes: {blog.likes} <button>like</button></p>
        <p>url: {blog.url}</p>
        <p>{user}</p>
      </Toggle>
    </div>
  )
}

export default Blog
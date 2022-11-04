const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, current) => {
        return sum + current.likes
    }, 0)

    return total
}

const favoriteBlog = (blogs) => {
    const max = blogs.reduce((currentMaxIndex, currentItem, currentIndex, array) => {
        return currentItem.likes > array[currentMaxIndex].likes
            ? currentIndex
            : currentMaxIndex
    }, 0)
    const { title, author, likes } = blogs[max]
    return { title, author, likes }
}

const mostBlogs = (blogs) => {
    let authors = {}
    // Assign all authors in an obj and count their blogs
    blogs.forEach(blog => {
        authors[blog.author] = (authors[blog.author] | 0) + 1
    })
    // Get author name
    const authorName = Object.keys(authors)
        .reduce((prev, current) => {
            return authors[prev] > authors[current]
                ? prev
                : current
        })
    return {
        author: authorName,
        blogs: authors[authorName]
    }
}

const mostLikes = (blogs) => {
    let authors = {}
    // Assign all authors in an obj and count their likes
    blogs.forEach(blog => {
        authors[blog.author] = (authors[blog.author] | 0) + blog.likes
    })
    // Get author name
    const authorName = Object.keys(authors)
        .reduce((prev, current) => {
            return authors[prev] > authors[current]
                ? prev
                : current
        })
    return {
        author: authorName,
        likes: authors[authorName]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
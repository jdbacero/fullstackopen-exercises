import axios from "axios"
const baseUrl = 'http://localhost:3001/api/notes/'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    }
    return axios.get(baseUrl).then(response => response.data.concat(nonExisting))
}

const create = (newNote) => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.post(baseUrl, newNote, config).then(response => response.data)
}

const update = (id, note) => {
    return axios.put(baseUrl + id, note).then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    setToken
}
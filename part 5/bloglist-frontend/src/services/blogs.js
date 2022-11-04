import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = new_token => {
  token = `bearer ${new_token}`
  console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = new_blog => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(baseUrl, new_blog, config).then(response => response.data)
}

export default {
  getAll,
  setToken,
  create
}
import axios from "axios"
const baseURL = 'http://localhost:3001/api/login'

// const login = async credentials => {
//     const response = await axios.post(baseURL, credentials)
//     return response.data
// }
const login = credentials => {
    return axios.post(baseURL, credentials).then(response => response.data)

}

export default { login }
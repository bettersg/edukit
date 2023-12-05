import axios from 'axios'

const baseUrl = '/api/login'

export const login = async (userObj) => {
    const res = await axios.post(baseUrl, userObj)
    return res.data
}
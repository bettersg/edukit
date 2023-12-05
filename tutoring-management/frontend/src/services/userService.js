import axios from 'axios'

const baseUrl = '/api/users'

let token = null

export const setUserToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllUsers = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(baseUrl, config)
    return res.data
}

export const getUserId = async (username) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}?username=${username}`, config)
    if (res.data.length === 0) {
        throw new Error('Volunteer manager does not exist')
    }
    return Number(res.data[0].id)
}
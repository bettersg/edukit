import axios from 'axios'

const baseUrl = '/api/sessions'

let token = null

export const setSessionToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllSession = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(baseUrl, config)
    return res.data
}

export const createSession = async (session) => {
    const res = await axios.post(baseUrl, session)
    return res.data
}
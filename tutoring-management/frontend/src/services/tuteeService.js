import axios from 'axios'

const baseUrl = '/api/tutees'

let token = null

export const setTuteeToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllTutees = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(baseUrl, config)
    return res.data
}

export const getTuteeId = async (name) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}?name=${name}`, config)
    return Number(res.data[0].id)
}

export const createTutee = async (tutee) => {
    const res = await axios.post(baseUrl, tutee)
    return res.data
}
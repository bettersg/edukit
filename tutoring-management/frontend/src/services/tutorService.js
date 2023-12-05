import axios from 'axios'

const baseUrl = '/api/tutors'

let token = null

export const setTutorToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getTutorId = async (name) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}?name=${name}`, config)
    return Number(res.data[0].id)
}

export const createTutor = async (tutor) => {
    const res = await axios.post(baseUrl, tutor)
    return res.data
}
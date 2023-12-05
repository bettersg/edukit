import axios from 'axios'

const baseUrl = '/api/pairings'

let token = null

export const setPairingToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getMasterPairings = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(baseUrl, config)
    return res.data
}

export const getAllPairings = async (userId) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}/${userId}`, config)
    return res.data
}

export const getPairing = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}/user/${id}`, config)
    return res.data
}

export const getPairingId = async (tutee, tutor) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}?tutee=${tutee}&tutor=${tutor}`, config)
    if (res.data.length === 0) {
        throw new Error('Tutee and/or tutor does not exist. Maybe try their first names?')
    }
    return Number(res.data[0].id)
}

export const createPairing = async (pairing) => {
    const res = await axios.post(baseUrl, pairing)
    return res.data
}
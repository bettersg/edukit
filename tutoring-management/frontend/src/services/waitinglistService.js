import axios from 'axios'

const baseUrl = '/api/waitinglist'

export const createWaitingList = async (item) => {
    const res = await axios.post(baseUrl, item)
    return res.data
}
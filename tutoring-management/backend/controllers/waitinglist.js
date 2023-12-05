const router = require('express').Router()

const { WaitingList } = require('../models')

router.post('/', async (req, res) => {
    const email = await WaitingList.create(req.body)
    res.status(201).json(email)
})

module.exports = router
const router = require('express').Router()

const { Session } = require('../models')
const tokenExtractor = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const sessions = await Session.findAll()
    res.json(sessions)
})

router.post('/', async (req, res) => {
    const session = await Session.create(req.body)
    res.status(201).json(session)
})

module.exports = router
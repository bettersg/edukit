const router = require('express').Router()

const { Subject } = require('../models')
const tokenExtractor = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const subjects = await Subject.findAll()
    res.json(subjects)
})

router.post('/', async (req, res) => {
    const subject = await Subject.create(req.body)
    res.status(201).json(subject)
})

module.exports = router
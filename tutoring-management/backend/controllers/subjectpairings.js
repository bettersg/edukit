const router = require('express').Router()

const { SubjectPairing } = require('../models')

router.get('/', async (req, res) => {
    const subjpairs = await SubjectPairing.findAll()
    res.json(subjpairs)
})

router.post('/', async (req, res) => {
    const subjpair = await SubjectPairing.create(req.body)
    res.status(201).json(subjpair)
})

router.delete('/:id', async (req, res) => {
    const subjpair = await SubjectPairing.findByPk(req.params.id)
    if (subjpair) {
        await subjpair.destroy()
    }
    res.status(204).end()
})

module.exports = router

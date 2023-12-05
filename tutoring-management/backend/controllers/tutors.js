const router = require('express').Router()

const { Tutor, Tutee } = require('../models')
const { Op } = require('sequelize')
const tokenExtractor = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const tutors = await Tutor.findAll({
        where: {
            name: req.query.name ? {[Op.iLike]: '%' + req.query.name + '%'} : {[Op.substring]: ''}
        }
    })
    res.json(tutors)
})

router.get('/:id', tokenExtractor, async (req, res) => {
    const tutor = await Tutor.findByPk(req.params.id, {
        include: {
            model: Tutee
        }
    })
    res.json(tutor)
})

router.post('/', async (req, res) => {
    const tutor = await Tutor.create(req.body)
    res.status(201).json(tutor)
})

module.exports = router
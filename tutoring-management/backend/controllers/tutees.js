const router = require('express').Router()

const { Tutee, Tutor } = require('../models')
const { Op } = require('sequelize')
const { sequelize } = require('../util/db')
const tokenExtractor = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const tutees = await Tutee.findAll({
        include: {
            model: Tutor
        },
        where: {
            name: req.query.name ? {[Op.iLike]: '%' + req.query.name + '%'} : {[Op.substring]: ''}
        }
    })
    res.json(tutees)
})

router.get('/:id', tokenExtractor, async (req, res) => {
    const tutee = await Tutee.findByPk(req.params.id, {
        include: {
            model: Tutor
        }
    })
    res.json(tutee)
})

router.post('/', async (req, res) => {
    const tutee = await Tutee.create(req.body)
    res.status(201).json(tutee)
})

module.exports = router
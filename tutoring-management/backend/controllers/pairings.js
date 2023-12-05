const router = require('express').Router()

const { Pairing, Session, User, Subject, Tutee, Tutor } = require('../models')
const { Op } = require('sequelize')
const tokenExtractor = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const pairings = await Pairing.findAll({
        include: [
            {
                model: User
            },
            {
                model: Session
            },
            {
                model: Subject,
                through: {
                    attributes: []
                }
            },
            {
                model: Tutee,
                where: {
                    name: req.query.tutee ? {[Op.iLike]: '%' + req.query.tutee + '%'} : {[Op.substring]: ''}
                }
            },
            {
                model: Tutor,
                where: {
                    name: req.query.tutor ? {[Op.iLike]: '%' + req.query.tutor + '%'} : {[Op.substring]: ''}
                }
            }
        ]
    })
    res.json(pairings)
})

router.get('/:userId', tokenExtractor, async (req, res) => {
    if (req.decodedToken.id !== Number(req.params.userId)) {
        throw new Error('Forbidden: You do not have access to this information.')
    }
    const pairings = await Pairing.findAll({
        include: [
            {
                model: User
            },
            {
                model: Session
            },
            {
                model: Subject,
                through: {
                    attributes: []
                }
            },
            {
                model: Tutee
            },
            {
                model: Tutor
            }
        ],
        where: {
            userId: req.params.userId
        }
    })
    res.json(pairings)
})

router.get('/user/:id', tokenExtractor, async (req, res) => {
    const pairing = await Pairing.findByPk(req.params.id, {
        include: [
            {
                model: User
            },
            {
                model: Session
            },
            {
                model: Subject,
                through: {
                    attributes: []
                }
            },
            {
                model: Tutee
            },
            {
                model: Tutor
            }
        ]
    })
    res.json(pairing)
})

router.post('/', async (req, res) => {
    const pairing = await Pairing.create(req.body)
    res.status(201).json(pairing)
})

router.put('/:id', tokenExtractor, async (req, res) => {  
    const pairing = await Pairing.findByPk(req.params.id)
    if (pairing) {
        pairing.userId = req.body.userId
        await pairing.save()
        res.json(pairing)
    } else {
        res.status(404).end()
    }
})

module.exports = router
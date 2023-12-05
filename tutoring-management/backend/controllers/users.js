const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Pairing } = require('../models')
const { Op } = require('sequelize')
const tokenExtractor = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const users = await User.findAll({
        where: {
            username: req.query.username ? {[Op.iLike]: '%' + req.query.username + '%'} : {[Op.substring]: ''}
        }})
    res.json(users)
})

router.get('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: {
            model: Pairing
        }
    })
    res.json(user)
})

router.post('/', tokenExtractor, async (req, res) => {
    const { username, name, password, email, organisation } = req.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({ username, name, password: passwordHash, email, organisation })
    res.status(201).json(user)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
        user.password = passwordHash
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = router
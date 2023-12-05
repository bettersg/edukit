const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User } = require('../models')

router.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({
        where: {
            username: username
        }
    })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60*24 })

    res.status(200).send({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = router
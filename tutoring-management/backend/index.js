const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const path = require('path')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const usersRouter = require('./controllers/users')
const tuteesRouter = require('./controllers/tutees')
const tutorsRouter = require('./controllers/tutors')
const pairingsRouter = require('./controllers/pairings')
const sessionsRouter = require('./controllers/sessions')
const subjectsRouter = require('./controllers/subjects')
const subjectPairingsRouter = require('./controllers/subjectpairings')
const loginRouter = require('./controllers/login')
const waitingListRouter = require('./controllers/waitinglist')

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/users', usersRouter)
app.use('/api/tutees', tuteesRouter)
app.use('/api/tutors', tutorsRouter)
app.use('/api/pairings', pairingsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/subjects', subjectsRouter)
app.use('/api/subjectpairings', subjectPairingsRouter)
app.use('/api/login', loginRouter)
app.use('/api/waitinglist', waitingListRouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
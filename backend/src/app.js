const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const protectedRoutes = require('./routes/protectedRoutes')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const requestLogger = require('./middleware/requestLogger')

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/api/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'QuickAppointment API is running.',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api', protectedRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app

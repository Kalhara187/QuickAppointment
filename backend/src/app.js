const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')
const servicesRoutes = require('./routes/servicesRoutes')
const appointmentsRoutes = require('./routes/appointmentsRoutes')
const testimonialsRoutes = require('./routes/testimonialsRoutes')
const homeRoutes = require('./routes/homeRoutes')
const protectedRoutes = require('./routes/protectedRoutes')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const requestLogger = require('./middleware/requestLogger')

const app = express()

app.use(cors())
app.use(express.json({ limit: '20kb' }))
app.use(requestLogger)

app.get('/api/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'QuickAppointment API is running.',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/testimonials', testimonialsRoutes)
app.use('/api/home', homeRoutes)
app.use('/api', protectedRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app

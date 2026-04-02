const dotenv = require('dotenv')

dotenv.config()

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required. Add it to your .env file.')
}

const app = require('./app')
const pool = require('./config/db')

const PORT = Number(process.env.PORT || 8000)

async function startServer() {
  try {
    await pool.query('SELECT 1')
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the other process or change PORT in .env.`)
        process.exit(1)
      }

      console.error('Server error:', error.message)
      process.exit(1)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()

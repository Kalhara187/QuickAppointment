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
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
  )
}

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required.',
    })
  }

  if (!EMAIL_REGEX.test(String(email).trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    })
  }

  if (String(password).length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long.',
    })
  }

  const [existing] = await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [String(email).trim().toLowerCase()])

  if (existing.length > 0) {
    return res.status(409).json({
      success: false,
      message: 'User already exists with this email.',
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [String(name).trim(), String(email).trim().toLowerCase(), hashedPassword, 'user'],
  )

  return res.status(201).json({
    success: true,
    message: 'Registration successful.',
    data: {
      id: result.insertId,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      role: 'user',
    },
  })
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    })
  }

  const [rows] = await pool.execute(
    'SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1',
    [String(email).trim().toLowerCase()],
  )

  if (rows.length === 0) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials.',
    })
  }

  const user = rows[0]
  const passwordMatched = await bcrypt.compare(password, user.password)

  if (!passwordMatched) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials.',
    })
  }

  const token = signToken(user)

  return res.status(200).json({
    success: true,
    message: 'Login successful.',
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  })
})

module.exports = {
  register,
  login,
}

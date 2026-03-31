const bcrypt = require('bcryptjs')
const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeName(value) {
  return String(value || '')
    .replace(/\0/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

function sanitizeEmail(value) {
  return String(value || '')
    .replace(/\0/g, '')
    .trim()
    .toLowerCase()
}

function mapUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.createdAt,
  }
}

const getMyProfile = asyncHandler(async (req, res) => {
  const userId = Number(req.user?.id)

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    })
  }

  const [rows] = await pool.execute(
    'SELECT id, name, email, role, created_at AS createdAt FROM users WHERE id = ? LIMIT 1',
    [userId],
  )

  if (rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    })
  }

  return res.status(200).json({
    success: true,
    data: {
      user: mapUser(rows[0]),
    },
  })
})

const updateMyProfile = asyncHandler(async (req, res) => {
  const userId = Number(req.user?.id)

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    })
  }

  const updates = {}

  if (req.body.name !== undefined) {
    const name = sanitizeName(req.body.name)
    if (!name || name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters.',
      })
    }
    updates.name = name
  }

  if (req.body.email !== undefined) {
    const email = sanitizeEmail(req.body.email)
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ? AND id <> ? LIMIT 1', [email, userId])
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email is already in use by another account.',
      })
    }

    updates.email = email
  }

  if (req.body.password !== undefined && String(req.body.password).trim() !== '') {
    const password = String(req.body.password)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.',
      })
    }

    updates.password = await bcrypt.hash(password, 10)
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No valid fields provided for update.',
    })
  }

  const setClause = Object.keys(updates)
    .map((field) => `${field} = ?`)
    .join(', ')
  const values = Object.values(updates)
  values.push(userId)

  await pool.execute(`UPDATE users SET ${setClause} WHERE id = ?`, values)

  const [rows] = await pool.execute(
    'SELECT id, name, email, role, created_at AS createdAt FROM users WHERE id = ? LIMIT 1',
    [userId],
  )

  return res.status(200).json({
    success: true,
    message: 'Profile updated successfully.',
    data: {
      user: mapUser(rows[0]),
    },
  })
})

const getUsers = asyncHandler(async (req, res) => {
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 100, 1), 200)
  const [rows] = await pool.execute(
    'SELECT id, name, email, role, created_at AS createdAt FROM users ORDER BY id DESC LIMIT ?',
    [limit],
  )

  return res.status(200).json({
    success: true,
    data: {
      users: rows.map(mapUser),
    },
  })
})

const updateUserRole = asyncHandler(async (req, res) => {
  const userId = Number.parseInt(req.params.id, 10)
  const role = String(req.body?.role || '').trim().toLowerCase()

  if (Number.isNaN(userId) || userId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID.',
    })
  }

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Role must be either user or admin.',
    })
  }

  const [existing] = await pool.execute('SELECT id FROM users WHERE id = ? LIMIT 1', [userId])
  if (existing.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    })
  }

  await pool.execute('UPDATE users SET role = ? WHERE id = ?', [role, userId])

  return res.status(200).json({
    success: true,
    message: 'User role updated successfully.',
  })
})

module.exports = {
  getMyProfile,
  updateMyProfile,
  getUsers,
  updateUserRole,
}
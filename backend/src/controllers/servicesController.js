const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

const VALIDATION_LIMITS = {
  nameMin: 3,
  nameMax: 120,
  descriptionMin: 10,
  descriptionMax: 2000,
  priceMax: 999999.99,
  categoryMax: 80,
}

function sanitizeName(value) {
  return String(value || '')
    .replace(/\0/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

function sanitizeDescription(value) {
  return String(value || '')
    .replace(/\0/g, '')
    .trim()
}

function sanitizeCategory(value) {
  return String(value || '')
    .replace(/\0/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

function validateServiceInput(name, description, price, category) {
  const errors = []

  if (!name || name.length < VALIDATION_LIMITS.nameMin || name.length > VALIDATION_LIMITS.nameMax) {
    errors.push(`Service name must be between ${VALIDATION_LIMITS.nameMin} and ${VALIDATION_LIMITS.nameMax} characters.`)
  }

  if (!description || description.length < VALIDATION_LIMITS.descriptionMin || description.length > VALIDATION_LIMITS.descriptionMax) {
    errors.push(`Description must be between ${VALIDATION_LIMITS.descriptionMin} and ${VALIDATION_LIMITS.descriptionMax} characters.`)
  }

  if (price !== null && price !== undefined) {
    const parsedPrice = Number(price)
    if (Number.isNaN(parsedPrice) || parsedPrice < 0 || parsedPrice > VALIDATION_LIMITS.priceMax) {
      errors.push(`Price must be a valid number between 0 and ${VALIDATION_LIMITS.priceMax}.`)
    }
  }

  if (category !== null && category.length > VALIDATION_LIMITS.categoryMax) {
    errors.push(`Category must not exceed ${VALIDATION_LIMITS.categoryMax} characters.`)
  }

  return errors
}

function mapService(service) {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    price: service.price === null ? null : Number(service.price),
    image: service.image,
    icon: service.icon,
    category: service.category,
    isAvailable: Boolean(service.isAvailable),
    isFeatured: Boolean(service.isFeatured),
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
  }
}

const getServices = asyncHandler(async (req, res) => {
  const limit = Number.parseInt(req.query.limit, 10) || 30
  const actualLimit = Math.min(Math.max(limit, 1), 50)
  const category = req.query.category ? sanitizeCategory(req.query.category) : null
  const search = req.query.search ? String(req.query.search).trim() : null
  const sortBy = req.query.sortBy || 'id'
  const sortOrder = (req.query.sortOrder || 'DESC').toUpperCase()

  if (!['ASC', 'DESC'].includes(sortOrder)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid sortOrder. Use ASC or DESC.',
    })
  }

  const validSortColumns = ['id', 'name', 'price', 'created_at', 'updated_at']
  const safeSort = validSortColumns.includes(sortBy) ? sortBy : 'id'

  let sql = `
    SELECT
      id,
      name,
      description,
      price,
      image_url AS image,
      icon,
      category,
      availability_status AS isAvailable,
      is_featured AS isFeatured,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM services
    WHERE 1=1
  `
  const params = []

  if (category) {
    sql += ' AND category = ?'
    params.push(category)
  }

  if (search) {
    sql += ' AND (name LIKE ? OR description LIKE ?)'
    params.push(`%${search}%`, `%${search}%`)
  }

  sql += ` ORDER BY ${safeSort} ${sortOrder} LIMIT ?`
  params.push(actualLimit)

  const [rows] = await pool.execute(sql, params)

  return res.status(200).json({
    success: true,
    message: rows.length ? 'Services fetched successfully.' : 'No services found.',
    data: {
      services: rows.map(mapService),
    },
  })
})

const getServiceById = asyncHandler(async (req, res) => {
  const serviceId = Number.parseInt(req.params.id, 10)

  if (Number.isNaN(serviceId) || serviceId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid service ID.',
    })
  }

  const sql = `
    SELECT
      id,
      name,
      description,
      price,
      image_url AS image,
      icon,
      category,
      availability_status AS isAvailable,
      is_featured AS isFeatured,
      featured_rank AS featuredRank,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM services
    WHERE id = ? LIMIT 1
  `

  const [rows] = await pool.execute(sql, [serviceId])

  if (rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Service not found.',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Service fetched successfully.',
    data: {
      service: mapService(rows[0]),
    },
  })
})

const createService = asyncHandler(async (req, res) => {
  const name = sanitizeName(req.body?.name)
  const description = sanitizeDescription(req.body?.description)
  const price = req.body?.price !== undefined && req.body?.price !== null ? Number(req.body.price) : null
  const imageUrl = req.body?.imageUrl ? String(req.body.imageUrl).trim() : null
  const icon = req.body?.icon ? String(req.body.icon).trim() : null
  const category = req.body?.category ? sanitizeCategory(req.body.category) : null
  const isFeatured = Boolean(req.body?.isFeatured)

  const validationErrors = validateServiceInput(name, description, price, category)

  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: validationErrors,
    })
  }

  const sql = `
    INSERT INTO services (name, description, price, image_url, icon, category, availability_status, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?)
  `

  const [result] = await pool.execute(sql, [name, description, price, imageUrl, icon, category, isFeatured ? 1 : 0])

  return res.status(201).json({
    success: true,
    message: 'Service created successfully.',
    data: {
      serviceId: result.insertId,
    },
  })
})

const updateService = asyncHandler(async (req, res) => {
  const serviceId = Number.parseInt(req.params.id, 10)

  if (Number.isNaN(serviceId) || serviceId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid service ID.',
    })
  }

  const [existing] = await pool.execute('SELECT id FROM services WHERE id = ?', [serviceId])

  if (existing.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Service not found.',
    })
  }

  const updates = {}

  if (req.body.name !== undefined) {
    const sanitized = sanitizeName(req.body.name)
    if (sanitized.length < VALIDATION_LIMITS.nameMin || sanitized.length > VALIDATION_LIMITS.nameMax) {
      return res.status(400).json({
        success: false,
        message: `Service name must be between ${VALIDATION_LIMITS.nameMin} and ${VALIDATION_LIMITS.nameMax} characters.`,
      })
    }
    updates.name = sanitized
  }

  if (req.body.description !== undefined) {
    const sanitized = sanitizeDescription(req.body.description)
    if (sanitized.length < VALIDATION_LIMITS.descriptionMin || sanitized.length > VALIDATION_LIMITS.descriptionMax) {
      return res.status(400).json({
        success: false,
        message: `Description must be between ${VALIDATION_LIMITS.descriptionMin} and ${VALIDATION_LIMITS.descriptionMax} characters.`,
      })
    }
    updates.description = sanitized
  }

  if (req.body.price !== undefined) {
    if (req.body.price !== null) {
      const parsed = Number(req.body.price)
      if (Number.isNaN(parsed) || parsed < 0 || parsed > VALIDATION_LIMITS.priceMax) {
        return res.status(400).json({
          success: false,
          message: `Price must be a valid number between 0 and ${VALIDATION_LIMITS.priceMax}.`,
        })
      }
      updates.price = parsed
    } else {
      updates.price = null
    }
  }

  if (req.body.imageUrl !== undefined) {
    updates.image_url = req.body.imageUrl ? String(req.body.imageUrl).trim() : null
  }

  if (req.body.icon !== undefined) {
    updates.icon = req.body.icon ? String(req.body.icon).trim() : null
  }

  if (req.body.category !== undefined) {
    const category = req.body.category ? sanitizeCategory(req.body.category) : null

    if (category && category.length > VALIDATION_LIMITS.categoryMax) {
      return res.status(400).json({
        success: false,
        message: `Category must not exceed ${VALIDATION_LIMITS.categoryMax} characters.`,
      })
    }

    updates.category = category
  }

  if (req.body.isAvailable !== undefined) {
    updates.availability_status = Boolean(req.body.isAvailable) ? 1 : 0
  }

  if (req.body.isFeatured !== undefined) {
    updates.is_featured = Boolean(req.body.isFeatured) ? 1 : 0
  }

  if (req.body.featuredRank !== undefined) {
    const rank = Number.parseInt(req.body.featuredRank, 10)
    if (!Number.isNaN(rank) && rank >= 0) {
      updates.featured_rank = rank
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No fields to update.',
    })
  }

  const setParts = Object.keys(updates).map((key) => `${key} = ?`)
  const setValues = Object.values(updates)

  const sql = `UPDATE services SET ${setParts.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
  setValues.push(serviceId)

  await pool.execute(sql, setValues)

  return res.status(200).json({
    success: true,
    message: 'Service updated successfully.',
  })
})

const deleteService = asyncHandler(async (req, res) => {
  const serviceId = Number.parseInt(req.params.id, 10)

  if (Number.isNaN(serviceId) || serviceId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid service ID.',
    })
  }

  const [existing] = await pool.execute('SELECT id FROM services WHERE id = ?', [serviceId])

  if (existing.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Service not found.',
    })
  }

  await pool.execute('DELETE FROM services WHERE id = ?', [serviceId])

  return res.status(200).json({
    success: true,
    message: 'Service deleted successfully.',
  })
})

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
}

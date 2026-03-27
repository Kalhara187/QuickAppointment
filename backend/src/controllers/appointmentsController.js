const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

const APPOINTMENT_STATUSES = ['pending', 'confirmed', 'cancelled']
const MIN_NOTES_LENGTH = 0
const MAX_NOTES_LENGTH = 1000

function normalizeText(value) {
  return String(value || '')
    .replace(/\0/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

function normalizeNotes(value) {
  return String(value || '').replace(/\0/g, '').trim()
}

function parseDateOnly(dateValue) {
  if (!dateValue) {
    return null
  }

  const date = new Date(`${dateValue}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return dateValue
}

function parseTimeTo24Hour(timeValue) {
  const source = String(timeValue || '').trim()

  if (!source) {
    return null
  }

  const hhmmPattern = /^([01]\d|2[0-3]):([0-5]\d)$/
  const hhmmMatch = source.match(hhmmPattern)
  if (hhmmMatch) {
    return `${hhmmMatch[1]}:${hhmmMatch[2]}:00`
  }

  const ampmPattern = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i
  const ampmMatch = source.match(ampmPattern)

  if (!ampmMatch) {
    return null
  }

  let hours = Number(ampmMatch[1])
  const minutes = ampmMatch[2]
  const meridiem = ampmMatch[3].toUpperCase()

  if (meridiem === 'PM' && hours !== 12) {
    hours += 12
  }

  if (meridiem === 'AM' && hours === 12) {
    hours = 0
  }

  return `${String(hours).padStart(2, '0')}:${minutes}:00`
}

function toIsoDateString(dateValue) {
  return new Date(dateValue).toISOString().slice(0, 10)
}

function mapAppointment(row) {
  return {
    id: row.id,
    userId: row.userId,
    userName: row.userName,
    serviceId: row.serviceId,
    serviceName: row.serviceName,
    date: row.date,
    time: row.time,
    status: row.status,
    notes: row.notes,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

async function ensureServiceExists(serviceId) {
  const [rows] = await pool.execute('SELECT id FROM services WHERE id = ? AND availability_status = 1 LIMIT 1', [serviceId])
  return rows.length > 0
}

async function ensureAppointmentExists(appointmentId) {
  const [rows] = await pool.execute('SELECT id, user_id AS userId, status FROM appointments WHERE id = ? LIMIT 1', [appointmentId])
  return rows[0] || null
}

async function hasConflictingSlot({ date, time, excludeId = null }) {
  const sql = `
    SELECT id
    FROM appointments
    WHERE appointment_date = ?
      AND appointment_time = ?
      AND status IN ('pending', 'confirmed')
      AND (? IS NULL OR id <> ?)
    LIMIT 1
  `

  const [rows] = await pool.execute(sql, [date, time, excludeId, excludeId])
  return rows.length > 0
}

const createAppointment = asyncHandler(async (req, res) => {
  const userId = req.user?.id
  const serviceId = Number.parseInt(req.body?.serviceId, 10)
  const date = parseDateOnly(req.body?.date)
  const time = parseTimeTo24Hour(req.body?.time)
  const notes = normalizeNotes(req.body?.notes)

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    })
  }

  if (Number.isNaN(serviceId) || serviceId <= 0 || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'serviceId, date, and time are required and must be valid.',
    })
  }

  if (notes.length < MIN_NOTES_LENGTH || notes.length > MAX_NOTES_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Notes must be between ${MIN_NOTES_LENGTH} and ${MAX_NOTES_LENGTH} characters.`,
    })
  }

  const today = toIsoDateString(new Date())
  if (date < today) {
    return res.status(400).json({
      success: false,
      message: 'Appointment date cannot be in the past.',
    })
  }

  const serviceExists = await ensureServiceExists(serviceId)
  if (!serviceExists) {
    return res.status(404).json({
      success: false,
      message: 'Selected service is unavailable or does not exist.',
    })
  }

  const slotTaken = await hasConflictingSlot({ date, time })
  if (slotTaken) {
    return res.status(409).json({
      success: false,
      message: 'Selected time slot is already booked. Please choose another slot.',
    })
  }

  const sql = `
    INSERT INTO appointments (user_id, service_id, appointment_date, appointment_time, status, notes)
    VALUES (?, ?, ?, ?, 'pending', ?)
  `

  const [result] = await pool.execute(sql, [userId, serviceId, date, time, notes || null])

  return res.status(201).json({
    message: 'Appointment booked successfully',
    appointmentId: result.insertId,
  })
})

const getAllAppointments = asyncHandler(async (req, res) => {
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 100, 1), 200)

  const sql = `
    SELECT
      a.id,
      a.user_id AS userId,
      u.name AS userName,
      a.service_id AS serviceId,
      s.name AS serviceName,
      DATE_FORMAT(a.appointment_date, '%Y-%m-%d') AS date,
      TIME_FORMAT(a.appointment_time, '%H:%i') AS time,
      a.status,
      a.notes,
      a.created_at AS createdAt,
      a.updated_at AS updatedAt
    FROM appointments a
    INNER JOIN users u ON u.id = a.user_id
    INNER JOIN services s ON s.id = a.service_id
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
    LIMIT ?
  `

  const [rows] = await pool.execute(sql, [limit])

  return res.status(200).json({
    success: true,
    data: {
      appointments: rows.map(mapAppointment),
    },
  })
})

const getUserAppointments = asyncHandler(async (req, res) => {
  const userId = req.user?.id

  const sql = `
    SELECT
      a.id,
      a.user_id AS userId,
      u.name AS userName,
      a.service_id AS serviceId,
      s.name AS serviceName,
      DATE_FORMAT(a.appointment_date, '%Y-%m-%d') AS date,
      TIME_FORMAT(a.appointment_time, '%H:%i') AS time,
      a.status,
      a.notes,
      a.created_at AS createdAt,
      a.updated_at AS updatedAt
    FROM appointments a
    INNER JOIN users u ON u.id = a.user_id
    INNER JOIN services s ON s.id = a.service_id
    WHERE a.user_id = ?
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
  `

  const [rows] = await pool.execute(sql, [userId])

  return res.status(200).json({
    success: true,
    data: {
      appointments: rows.map(mapAppointment),
    },
  })
})

const updateAppointment = asyncHandler(async (req, res) => {
  const appointmentId = Number.parseInt(req.params.id, 10)
  const userId = req.user?.id
  const userRole = req.user?.role

  if (Number.isNaN(appointmentId) || appointmentId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid appointment ID.',
    })
  }

  const existing = await ensureAppointmentExists(appointmentId)
  if (!existing) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found.',
    })
  }

  const isOwner = Number(existing.userId) === Number(userId)
  const isAdmin = userRole === 'admin'

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'You are not allowed to update this appointment.',
    })
  }

  const updates = {}

  if (req.body.date !== undefined) {
    const nextDate = parseDateOnly(req.body.date)
    if (!nextDate) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format.',
      })
    }
    const today = toIsoDateString(new Date())
    if (nextDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date cannot be in the past.',
      })
    }
    updates.appointment_date = nextDate
  }

  if (req.body.time !== undefined) {
    const nextTime = parseTimeTo24Hour(req.body.time)
    if (!nextTime) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time format. Use HH:MM or HH:MM AM/PM.',
      })
    }
    updates.appointment_time = nextTime
  }

  if (req.body.serviceId !== undefined) {
    const serviceId = Number.parseInt(req.body.serviceId, 10)
    if (Number.isNaN(serviceId) || serviceId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID.',
      })
    }

    const serviceExists = await ensureServiceExists(serviceId)
    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: 'Selected service is unavailable or does not exist.',
      })
    }

    updates.service_id = serviceId
  }

  if (req.body.notes !== undefined) {
    const notes = normalizeNotes(req.body.notes)
    if (notes.length < MIN_NOTES_LENGTH || notes.length > MAX_NOTES_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Notes must be between ${MIN_NOTES_LENGTH} and ${MAX_NOTES_LENGTH} characters.`,
      })
    }
    updates.notes = notes || null
  }

  if (req.body.status !== undefined) {
    const status = normalizeText(req.body.status).toLowerCase()

    if (!APPOINTMENT_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${APPOINTMENT_STATUSES.join(', ')}.`,
      })
    }

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can update appointment status directly.',
      })
    }

    updates.status = status
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No valid fields provided for update.',
    })
  }

  const finalDate = updates.appointment_date || null
  const finalTime = updates.appointment_time || null

  if (finalDate || finalTime) {
    const [currentRows] = await pool.execute(
      'SELECT DATE_FORMAT(appointment_date, "%Y-%m-%d") AS date, TIME_FORMAT(appointment_time, "%H:%i:%s") AS time FROM appointments WHERE id = ? LIMIT 1',
      [appointmentId],
    )

    const current = currentRows[0]
    const candidateDate = finalDate || current.date
    const candidateTime = finalTime || current.time

    const slotTaken = await hasConflictingSlot({
      date: candidateDate,
      time: candidateTime,
      excludeId: appointmentId,
    })

    if (slotTaken) {
      return res.status(409).json({
        success: false,
        message: 'Selected time slot is already booked. Please choose another slot.',
      })
    }
  }

  const setClause = Object.keys(updates)
    .map((field) => `${field} = ?`)
    .join(', ')
  const values = Object.values(updates)
  values.push(appointmentId)

  const sql = `UPDATE appointments SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
  await pool.execute(sql, values)

  return res.status(200).json({
    success: true,
    message: 'Appointment updated successfully.',
  })
})

const cancelAppointment = asyncHandler(async (req, res) => {
  const appointmentId = Number.parseInt(req.params.id, 10)
  const userId = req.user?.id
  const userRole = req.user?.role

  if (Number.isNaN(appointmentId) || appointmentId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid appointment ID.',
    })
  }

  const existing = await ensureAppointmentExists(appointmentId)
  if (!existing) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found.',
    })
  }

  const isOwner = Number(existing.userId) === Number(userId)
  const isAdmin = userRole === 'admin'

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'You are not allowed to cancel this appointment.',
    })
  }

  if (existing.status === 'cancelled') {
    return res.status(200).json({
      success: true,
      message: 'Appointment is already cancelled.',
    })
  }

  await pool.execute(
    "UPDATE appointments SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [appointmentId],
  )

  return res.status(200).json({
    success: true,
    message: 'Appointment cancelled successfully.',
  })
})

module.exports = {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  updateAppointment,
  cancelAppointment,
}

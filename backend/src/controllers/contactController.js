const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')
const { sendContactNotification } = require('../utils/contactMailer')

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  nameMax: 100,
  emailMax: 120,
  subjectMax: 150,
  messageMin: 10,
  messageMax: 2000,
}

function sanitizeShortText(value) {
  return String(value || '')
    .replace(/\0/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

function sanitizeMessage(value) {
  return String(value || '').replace(/\0/g, '').trim()
}

const submitContact = asyncHandler(async (req, res) => {
  const name = sanitizeShortText(req.body?.name)
  const email = sanitizeShortText(req.body?.email).toLowerCase()
  const subject = sanitizeShortText(req.body?.subject)
  const message = sanitizeMessage(req.body?.message)

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields.',
    })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    })
  }

  if (name.length > LIMITS.nameMax) {
    return res.status(400).json({
      success: false,
      message: `Name must be ${LIMITS.nameMax} characters or fewer.`,
    })
  }

  if (email.length > LIMITS.emailMax) {
    return res.status(400).json({
      success: false,
      message: `Email must be ${LIMITS.emailMax} characters or fewer.`,
    })
  }

  if (subject.length > LIMITS.subjectMax) {
    return res.status(400).json({
      success: false,
      message: `Subject must be ${LIMITS.subjectMax} characters or fewer.`,
    })
  }

  if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax) {
    return res.status(400).json({
      success: false,
      message: `Message must be between ${LIMITS.messageMin} and ${LIMITS.messageMax} characters.`,
    })
  }

  const [result] = await pool.execute(
    'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message],
  )

  await sendContactNotification({
    id: result.insertId,
    name,
    email,
    subject,
    message,
  })

  return res.status(201).json({
    success: true,
    message: 'Message sent successfully.',
  })
})

module.exports = {
  submitContact,
}
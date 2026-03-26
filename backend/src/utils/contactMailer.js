const nodemailer = require('nodemailer')

let transporter = null

function canSendEmail() {
  return Boolean(
    process.env.CONTACT_ADMIN_EMAIL
      && process.env.SMTP_HOST
      && process.env.SMTP_PORT
      && process.env.SMTP_USER
      && process.env.SMTP_PASS,
  )
}

function getTransporter() {
  if (transporter) {
    return transporter
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  return transporter
}

async function sendContactNotification(contact) {
  if (!canSendEmail()) {
    return
  }

  try {
    await getTransporter().sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_ADMIN_EMAIL,
      subject: `New contact message: ${contact.subject}`,
      text: [
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Subject: ${contact.subject}`,
        '',
        'Message:',
        contact.message,
      ].join('\n'),
    })
  } catch (error) {
    console.error('Contact email notification failed:', error.message)
  }
}

module.exports = {
  sendContactNotification,
}
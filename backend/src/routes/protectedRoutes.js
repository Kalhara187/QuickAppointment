const express = require('express')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/appointments/me', protect, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Protected route accessed successfully.',
    data: {
      user: req.user,
      note: 'You can place appointment booking logic here.',
    },
  })
})

router.get('/admin/overview', protect, authorize('admin'), (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Admin protected route accessed successfully.',
    data: {
      user: req.user,
      note: 'You can place admin dashboard data logic here.',
    },
  })
})

module.exports = router

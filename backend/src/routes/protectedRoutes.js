const express = require('express')
const { protect, authorize } = require('../middleware/authMiddleware')
const { getAdminOverview } = require('../controllers/adminController')

const router = express.Router()

router.get('/admin/overview', protect, authorize('admin'), getAdminOverview)

module.exports = router

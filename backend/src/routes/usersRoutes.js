const express = require('express')
const { getMyProfile, updateMyProfile, getUsers, updateUserRole } = require('../controllers/usersController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/me', protect, getMyProfile)
router.put('/me', protect, updateMyProfile)
router.get('/', protect, authorize('admin'), getUsers)
router.put('/:id/role', protect, authorize('admin'), updateUserRole)

module.exports = router
const express = require('express')
const {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  updateAppointment,
  cancelAppointment,
} = require('../controllers/appointmentsController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createAppointment)
router.get('/', protect, authorize('admin'), getAllAppointments)
router.get('/user', protect, getUserAppointments)
router.put('/:id', protect, updateAppointment)
router.delete('/:id', protect, cancelAppointment)

module.exports = router

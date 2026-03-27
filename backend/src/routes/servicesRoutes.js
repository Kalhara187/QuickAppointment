const express = require('express')
const { getServices, getServiceById, createService, updateService, deleteService } = require('../controllers/servicesController')
const { getFeaturedServices } = require('../controllers/homeController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getServices)
router.get('/featured', getFeaturedServices)
router.post('/', protect, authorize('admin'), createService)
router.get('/:id', getServiceById)
router.put('/:id', protect, authorize('admin'), updateService)
router.delete('/:id', protect, authorize('admin'), deleteService)

module.exports = router

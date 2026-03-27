const express = require('express')
const { getServices, getFeaturedServices } = require('../controllers/homeController')

const router = express.Router()

router.get('/', getServices)
router.get('/featured', getFeaturedServices)

module.exports = router

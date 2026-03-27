const express = require('express')
const { getTestimonials } = require('../controllers/homeController')

const router = express.Router()

router.get('/', getTestimonials)

module.exports = router

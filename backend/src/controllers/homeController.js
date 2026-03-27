const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

const DEFAULT_LIMITS = {
  services: 30,
  featured: Number(process.env.HOMEPAGE_FEATURED_LIMIT || 6),
  testimonials: Number(process.env.HOMEPAGE_TESTIMONIALS_LIMIT || 6),
}

const MAX_LIMIT = 50
const CACHE_TTL_MS = Number(process.env.HOMEPAGE_CACHE_TTL_MS || 60_000)
const cacheStore = new Map()

function normalizeLimit(rawLimit, fallbackLimit) {
  const parsed = Number.parseInt(rawLimit, 10)

  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallbackLimit
  }

  return Math.min(parsed, MAX_LIMIT)
}

function getFromCache(key) {
  const cached = cacheStore.get(key)

  if (!cached) {
    return null
  }

  if (cached.expiresAt <= Date.now()) {
    cacheStore.delete(key)
    return null
  }

  return cached.value
}

function setCache(key, value) {
  cacheStore.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  })
}

function mapService(service) {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    price: service.price === null ? null : Number(service.price),
    image: service.image,
    icon: service.icon,
    isAvailable: Boolean(service.isAvailable),
    isFeatured: Boolean(service.isFeatured),
  }
}

function mapTestimonial(testimonial) {
  return {
    id: testimonial.id,
    userName: testimonial.userName,
    comment: testimonial.comment,
    rating: Number(testimonial.rating),
    createdAt: testimonial.createdAt,
  }
}

async function queryServices({ featuredOnly = false, limit = DEFAULT_LIMITS.services }) {
  const sql = `
    SELECT
      id,
      name,
      description,
      price,
      image_url AS image,
      icon,
      availability_status AS isAvailable,
      is_featured AS isFeatured,
      featured_rank AS featuredRank
    FROM services
    WHERE availability_status = 1
      AND (? = 0 OR is_featured = 1)
    ORDER BY
      is_featured DESC,
      featured_rank ASC,
      id DESC
    LIMIT ?
  `

  const [rows] = await pool.execute(sql, [featuredOnly ? 1 : 0, limit])
  return rows.map(mapService)
}

async function queryTestimonials(limit) {
  const sql = `
    SELECT
      id,
      user_name AS userName,
      comment,
      rating,
      created_at AS createdAt
    FROM testimonials
    WHERE is_published = 1
    ORDER BY
      featured_rank ASC,
      id DESC
    LIMIT ?
  `

  const [rows] = await pool.execute(sql, [limit])
  return rows.map(mapTestimonial)
}

const getServices = asyncHandler(async (req, res) => {
  const limit = normalizeLimit(req.query.limit, DEFAULT_LIMITS.services)
  const services = await queryServices({ featuredOnly: false, limit })

  return res.status(200).json({
    success: true,
    message: services.length ? 'Services fetched successfully.' : 'No services found.',
    data: {
      services,
    },
  })
})

const getFeaturedServices = asyncHandler(async (req, res) => {
  const limit = normalizeLimit(req.query.limit, DEFAULT_LIMITS.featured)
  const cacheKey = `featured:${limit}`
  const cached = getFromCache(cacheKey)

  if (cached) {
    return res.status(200).json({
      success: true,
      message: cached.length ? 'Featured services fetched successfully (cached).' : 'No featured services found.',
      data: {
        featured: cached,
      },
    })
  }

  const featured = await queryServices({ featuredOnly: true, limit })
  setCache(cacheKey, featured)

  return res.status(200).json({
    success: true,
    message: featured.length ? 'Featured services fetched successfully.' : 'No featured services found.',
    data: {
      featured,
    },
  })
})

const getTestimonials = asyncHandler(async (req, res) => {
  const limit = normalizeLimit(req.query.limit, DEFAULT_LIMITS.testimonials)
  const cacheKey = `testimonials:${limit}`
  const cached = getFromCache(cacheKey)

  if (cached) {
    return res.status(200).json({
      success: true,
      message: cached.length ? 'Testimonials fetched successfully (cached).' : 'No testimonials found.',
      data: {
        testimonials: cached,
      },
    })
  }

  const testimonials = await queryTestimonials(limit)
  setCache(cacheKey, testimonials)

  return res.status(200).json({
    success: true,
    message: testimonials.length ? 'Testimonials fetched successfully.' : 'No testimonials found.',
    data: {
      testimonials,
    },
  })
})

const getHomeData = asyncHandler(async (req, res) => {
  const servicesLimit = normalizeLimit(req.query.servicesLimit, DEFAULT_LIMITS.services)
  const featuredLimit = normalizeLimit(req.query.featuredLimit, DEFAULT_LIMITS.featured)
  const testimonialsLimit = normalizeLimit(req.query.testimonialsLimit, DEFAULT_LIMITS.testimonials)

  const [services, featured, testimonials] = await Promise.all([
    queryServices({ featuredOnly: false, limit: servicesLimit }),
    queryServices({ featuredOnly: true, limit: featuredLimit }),
    queryTestimonials(testimonialsLimit),
  ])

  return res.status(200).json({
    services,
    featured,
    testimonials,
  })
})

module.exports = {
  getServices,
  getFeaturedServices,
  getTestimonials,
  getHomeData,
}

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

const requestStore = new Map()

function contactRateLimiter(req, res, next) {
  const key = req.ip || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const entry = requestStore.get(key)

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    requestStore.set(key, { count: 1, windowStart: now })
    return next()
  }

  if (entry.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages from this IP. Please try again later.',
    })
  }

  entry.count += 1
  requestStore.set(key, entry)
  return next()
}

module.exports = contactRateLimiter
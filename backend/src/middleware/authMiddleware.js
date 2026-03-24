const jwt = require('jsonwebtoken')

function protect(req, res, next) {
  const authHeader = req.headers.authorization || ''

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authorization token is missing or invalid.',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    return next()
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    })
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to access this resource.',
      })
    }

    return next()
  }
}

module.exports = {
  protect,
  authorize,
}

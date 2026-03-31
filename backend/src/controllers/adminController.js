const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

const getAdminOverview = asyncHandler(async (req, res) => {
  const [usersCountRows] = await pool.execute('SELECT COUNT(*) AS total FROM users')
  const [servicesCountRows] = await pool.execute('SELECT COUNT(*) AS total FROM services WHERE availability_status = 1')
  const [appointmentsCountRows] = await pool.execute('SELECT COUNT(*) AS total FROM appointments')
  const [confirmedTodayRows] = await pool.execute(
    "SELECT COUNT(*) AS total FROM appointments WHERE status = 'confirmed' AND appointment_date = CURDATE()",
  )
  const [pendingRows] = await pool.execute("SELECT COUNT(*) AS total FROM appointments WHERE status = 'pending'")

  return res.status(200).json({
    success: true,
    message: 'Admin overview fetched successfully.',
    data: {
      user: req.user,
      stats: {
        totalBookings: Number(appointmentsCountRows[0]?.total || 0),
        confirmedToday: Number(confirmedTodayRows[0]?.total || 0),
        activeServices: Number(servicesCountRows[0]?.total || 0),
        registeredUsers: Number(usersCountRows[0]?.total || 0),
        pendingBookings: Number(pendingRows[0]?.total || 0),
      },
    },
  })
})

module.exports = {
  getAdminOverview,
}
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function getSessionUser() {
  const savedSession = localStorage.getItem('qaUserSession')
  if (!savedSession) {
    return null
  }

  try {
    return JSON.parse(savedSession)
  } catch {
    return null
  }
}

function ProtectedRoute({ allowedRoles }) {
  const location = useLocation()
  const user = getSessionUser()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
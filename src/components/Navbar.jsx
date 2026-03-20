import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsProfileOpen(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setUserName(null)
    setIsProfileOpen(false)
    closeMenu()
  }

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  const navSurfaceClass = isDarkMode
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white/90 border-slate-200 text-slate-900'

  const navLinkClass = isDarkMode
    ? 'text-slate-100 hover:text-sky-300 hover:border-sky-300'
    : 'text-slate-700 hover:text-sky-700 hover:border-sky-600'

  const activeNavLinkClass = isDarkMode ? 'text-sky-300 border-sky-300' : 'text-sky-700 border-sky-700'

  const menuPanelClass = isDarkMode
    ? 'bg-slate-900/95 border-slate-800'
    : 'bg-white/95 border-slate-200'

  const subtleTextClass = isDarkMode ? 'text-slate-300' : 'text-slate-600'

  const themeToggleClass = isDarkMode
    ? 'bg-slate-800 text-slate-100 hover:bg-slate-700 border-slate-700'
    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl shadow-sm ${navSurfaceClass}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="group flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight transition-all duration-300"
            >
              <span className="text-2xl md:text-3xl">QA</span>
              <span className={`bg-gradient-to-r ${isDarkMode ? 'from-sky-300 to-blue-500' : 'from-sky-600 to-blue-800'} bg-clip-text text-transparent group-hover:brightness-110`}>
                QuickAppointment
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-end gap-6">
            <div className="flex items-center gap-5 text-sm lg:text-base">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `border-b-2 pb-1 transition-all duration-300 ${isActive ? activeNavLinkClass : `border-transparent ${navLinkClass}`}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `border-b-2 pb-1 transition-all duration-300 ${isActive ? activeNavLinkClass : `border-transparent ${navLinkClass}`}`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/book-appointment"
                className={({ isActive }) =>
                  `border-b-2 pb-1 transition-all duration-300 ${isActive ? activeNavLinkClass : `border-transparent ${navLinkClass}`}`
                }
              >
                Book Appointment
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `border-b-2 pb-1 transition-all duration-300 ${isActive ? activeNavLinkClass : `border-transparent ${navLinkClass}`}`
                }
              >
                About Us
              </NavLink>
              {isAuthenticated && (
                <Link
                  to="/my-appointments"
                  className={`border-b-2 border-transparent pb-1 transition-all duration-300 ${navLinkClass}`}
                >
                  My Appointments
                </Link>
              )}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `border-b-2 pb-1 transition-all duration-300 ${isActive ? activeNavLinkClass : `border-transparent ${navLinkClass}`}`
                }
              >
                Contact
              </NavLink>
              {isAuthenticated && userRole === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className={`border-b-2 border-transparent pb-1 transition-all duration-300 ${isDarkMode ? 'text-amber-300 hover:text-amber-200 hover:border-amber-300' : 'text-amber-700 hover:text-amber-800 hover:border-amber-700'}`}
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${themeToggleClass}`}
                aria-label="Toggle dark and light mode"
                title="Toggle theme"
              >
                {isDarkMode ? 'L' : 'D'}
              </button>

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${isDarkMode ? 'border border-sky-400 text-sky-200 hover:bg-sky-500 hover:text-white' : 'border border-sky-600 text-sky-700 hover:bg-sky-600 hover:text-white'}`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${isDarkMode ? 'bg-sky-500 text-white hover:bg-sky-400' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-sky-200' : 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-sky-700'}`}
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                      {userName?.charAt(0) || 'U'}
                    </span>
                    <span>{userName}</span>
                  </button>

                  {isProfileOpen && (
                    <div className={`absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border shadow-lg ${menuPanelClass}`}>
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm transition-colors duration-300 ${subtleTextClass} ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                        onClick={closeMenu}
                      >
                        Profile
                      </Link>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-rose-300 hover:bg-slate-800' : 'text-rose-700 hover:bg-slate-100'}`}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${themeToggleClass}`}
              aria-label="Toggle dark and light mode"
            >
              {isDarkMode ? 'L' : 'D'}
            </button>

            <button
              className="flex flex-col gap-1.5 rounded-md p-1 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span
                className={`h-0.5 w-6 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-slate-700'} ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
              ></span>
              <span
                className={`h-0.5 w-6 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-slate-700'} ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`h-0.5 w-6 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-slate-700'} ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              ></span>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-[36rem]' : 'max-h-0'
          }`}
        >
          <div className={`space-y-2 border-t px-2 py-3 ${menuPanelClass}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition-colors duration-300 ${
                  isActive ? (isDarkMode ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700') : navLinkClass
                }`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition-colors duration-300 ${
                  isActive ? (isDarkMode ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700') : navLinkClass
                }`
              }
              onClick={closeMenu}
            >
              Services
            </NavLink>
            <NavLink
              to="/book-appointment"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition-colors duration-300 ${
                  isActive ? (isDarkMode ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700') : navLinkClass
                }`
              }
              onClick={closeMenu}
            >
              Book Appointment
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition-colors duration-300 ${
                  isActive ? (isDarkMode ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700') : navLinkClass
                }`
              }
              onClick={closeMenu}
            >
              About Us
            </NavLink>
            {isAuthenticated && (
              <Link
                to="/my-appointments"
                className={`block rounded-md px-3 py-2 text-sm transition-colors duration-300 ${navLinkClass}`}
                onClick={closeMenu}
              >
                My Appointments
              </Link>
            )}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition-colors duration-300 ${
                  isActive ? (isDarkMode ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700') : navLinkClass
                }`
              }
              onClick={closeMenu}
            >
              Contact
            </NavLink>

            {isAuthenticated && userRole === 'admin' && (
              <Link
                to="/admin/dashboard"
                className={`block rounded-md px-3 py-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-amber-300 hover:text-amber-200' : 'text-amber-700 hover:text-amber-800'}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}

            <div className={`mt-2 border-t pt-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    className={`rounded-lg px-3 py-2 text-center text-sm font-semibold transition-all duration-300 ${isDarkMode ? 'border border-sky-400 text-sky-200 hover:bg-sky-500 hover:text-white' : 'border border-sky-600 text-sky-700 hover:bg-sky-600 hover:text-white'}`}
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`rounded-lg px-3 py-2 text-center text-sm font-semibold transition-all duration-300 ${isDarkMode ? 'bg-sky-500 text-white hover:bg-sky-400' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className={`px-1 text-xs uppercase tracking-wide ${subtleTextClass}`}>
                    Signed in as {userName}
                  </p>
                  <Link
                    to="/profile"
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors duration-300 ${navLinkClass}`}
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  <button
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'bg-rose-500/20 text-rose-200 hover:bg-rose-500/30' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'}`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

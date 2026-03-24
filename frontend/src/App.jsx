import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Footer, Navbar } from './components'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'))
const BookAppointmentPage = lazy(() => import('./pages/BookAppointmentPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'))
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'))
const MyAppointmentsPage = lazy(() => import('./pages/MyAppointmentsPage.jsx'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'))
const ManageAppointmentsPage = lazy(() => import('./pages/ManageAppointmentsPage.jsx'))
const ManageServicesPage = lazy(() => import('./pages/ManageServicesPage.jsx'))
const ManageUsersPage = lazy(() => import('./pages/ManageUsersPage.jsx'))

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 px-5 sm:px-6 pt-24 sm:pt-20 pb-8 max-w-6xl mx-auto w-full">
          <Suspense
            fallback={
              <div className="flex min-h-[220px] items-center justify-center">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  Loading page...
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/book-appointment" element={<BookAppointmentPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/my-appointments" element={<MyAppointmentsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/appointments" element={<ManageAppointmentsPage />} />
              <Route path="/admin/services" element={<ManageServicesPage />} />
              <Route path="/admin/users" element={<ManageUsersPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
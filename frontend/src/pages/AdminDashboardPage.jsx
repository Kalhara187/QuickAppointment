import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../services/adminService'

function AdminDashboardPage() {
  const [stats, setStats] = useState([
    { title: 'Total Bookings', value: '0' },
    { title: 'Confirmed Today', value: '0' },
    { title: 'Active Services', value: '0' },
    { title: 'Registered Users', value: '0' },
  ])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const response = await adminService.getOverview()
        const overview = response?.data?.stats || {}

        setStats([
          { title: 'Total Bookings', value: String(overview.totalBookings || 0) },
          { title: 'Confirmed Today', value: String(overview.confirmedToday || 0) },
          { title: 'Active Services', value: String(overview.activeServices || 0) },
          { title: 'Registered Users', value: String(overview.registeredUsers || 0) },
        ])
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || 'Unable to load dashboard metrics.')
      }
    }

    loadOverview()
  }, [])

  return (
    <div className="page admin-dashboard-page px-4 pb-8 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-[#112642] via-[#1a4e7a] to-[#1d7a8f] px-6 py-12 text-white shadow-2xl sm:px-10 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Admin Dashboard</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">System overview and control</h1>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">{item.title}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{item.value}</p>
          </article>
        ))}
      </section>

      {errorMessage && (
        <section className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
          {errorMessage}
        </section>
      )}

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link to="/admin/appointments" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <h2 className="text-lg font-bold text-slate-900">Manage Appointments</h2>
          <p className="mt-2 text-sm text-slate-600">Approve, update, and cancel bookings.</p>
        </Link>

        <Link to="/admin/services" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <h2 className="text-lg font-bold text-slate-900">Manage Services</h2>
          <p className="mt-2 text-sm text-slate-600">Add, edit, and remove service offerings.</p>
        </Link>

        <Link to="/admin/users" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <h2 className="text-lg font-bold text-slate-900">Manage Users</h2>
          <p className="mt-2 text-sm text-slate-600">Review accounts and set roles.</p>
        </Link>
      </section>
    </div>
  )
}

export default AdminDashboardPage

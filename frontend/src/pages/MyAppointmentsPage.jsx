import { useEffect, useMemo, useState } from 'react'
import { appointmentService } from '../services/appointmentService'

const filters = ['all', 'pending', 'confirmed', 'cancelled']

function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const response = await appointmentService.getMyAppointments()
        const rows = response?.data?.appointments || []
        setAppointments(
          rows.map((item) => ({
            id: item.id,
            service: item.serviceName,
            date: item.date,
            time: item.time,
            status: item.status,
          })),
        )
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || 'Unable to load appointments.')
      } finally {
        setIsLoading(false)
      }
    }

    loadAppointments()
  }, [])

  const filteredAppointments = useMemo(() => {
    if (activeFilter === 'all') {
      return appointments
    }
    return appointments.filter((item) => item.status === activeFilter)
  }, [activeFilter, appointments])

  const updateStatus = async (id, status) => {
    try {
      if (status === 'cancelled') {
        await appointmentService.cancelAppointment(id)
      } else {
        await appointmentService.updateAppointment(id, { status })
      }
      setAppointments((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Unable to update appointment.')
    }
  }

  const requestReschedule = async (id) => {
    try {
      await appointmentService.updateAppointment(id, {
        notes: 'Reschedule requested by user.',
      })
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Unable to request reschedule.')
    }
  }

  const badgeClass = (status) => {
    if (status === 'confirmed') return 'bg-emerald-100 text-emerald-700'
    if (status === 'pending') return 'bg-amber-100 text-amber-700'
    return 'bg-rose-100 text-rose-700'
  }

  return (
    <div className="page my-appointments-page px-4 pb-8 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-[#0f2f51] via-[#16618a] to-[#1e8a9d] px-6 py-12 text-white shadow-2xl sm:px-10 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">My Appointments</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Track and manage bookings</h1>
        <p className="mt-4 max-w-2xl text-cyan-50">View statuses, cancel upcoming slots, or reschedule in one place.</p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                activeFilter === filter ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {isLoading && (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-600">
              Loading appointments...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-6 text-center text-sm text-rose-700">
              {errorMessage}
            </div>
          )}

          {filteredAppointments.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-600">
              No appointments found for this filter.
            </div>
          )}

          {filteredAppointments.map((appointment) => (
            <article key={appointment.id} className="rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{appointment.service}</h2>
                  <p className="mt-1 text-sm text-slate-600">{appointment.date} at {appointment.time}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-sky-600 hover:text-sky-700"
                  onClick={() => requestReschedule(appointment.id)}
                >
                  Reschedule
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                  onClick={() => updateStatus(appointment.id, 'cancelled')}
                >
                  Cancel
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MyAppointmentsPage

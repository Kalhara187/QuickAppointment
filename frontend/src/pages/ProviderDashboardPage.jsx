import { useEffect, useMemo, useState } from 'react'
import { appointmentService } from '../services/appointmentService'

function ProviderDashboardPage() {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const response = await appointmentService.getProviderAppointments()
        const rows = response?.data?.appointments || []
        setAppointments(
          rows.map((item) => ({
            id: item.id,
            client: item.userName,
            service: item.serviceName,
            slot: `${item.date} ${item.time}`,
            status: item.status,
            notes: item.notes || '',
          })),
        )
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || 'Unable to load assigned appointments.')
      } finally {
        setIsLoading(false)
      }
    }

    loadAppointments()
  }, [])

  const totals = useMemo(() => {
    const confirmed = appointments.filter((item) => item.status === 'confirmed').length
    const pending = appointments.filter((item) => item.status === 'pending').length
    return { total: appointments.length, confirmed, pending }
  }, [appointments])

  const updateStatus = async (id, status) => {
    try {
      if (status === 'cancelled') {
        await appointmentService.cancelAppointment(id)
      } else {
        await appointmentService.updateAppointment(id, { status })
      }

      setAppointments((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Unable to update appointment status.')
    }
  }

  const badgeClass = (status) => {
    if (status === 'confirmed') return 'bg-emerald-100 text-emerald-700'
    if (status === 'pending') return 'bg-amber-100 text-amber-700'
    return 'bg-rose-100 text-rose-700'
  }

  return (
    <div className="page provider-dashboard-page px-4 pb-8 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-[#0f2f51] via-[#0f5f73] to-[#15907f] px-6 py-12 text-white shadow-2xl sm:px-10 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Service Provider</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Assigned appointments</h1>
        <p className="mt-4 max-w-2xl text-cyan-50">Review your bookings, confirm jobs, and keep your schedule in sync.</p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { title: 'Total Assigned', value: String(totals.total) },
          { title: 'Pending', value: String(totals.pending) },
          { title: 'Confirmed', value: String(totals.confirmed) },
        ].map((item) => (
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

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Today&apos;s workload</h2>
        <p className="mt-2 text-sm text-slate-600">Only appointments assigned to your account appear here.</p>

        {isLoading && <p className="mt-4 text-sm text-slate-600">Loading assigned appointments...</p>}

        {!isLoading && appointments.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600">
            No appointments are currently assigned to you.
          </div>
        )}

        <div className="mt-6 space-y-4">
          {appointments.map((appointment) => (
            <article key={appointment.id} className="rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{appointment.service}</h3>
                  <p className="mt-1 text-sm text-slate-600">Client: {appointment.client}</p>
                  <p className="mt-1 text-sm text-slate-600">{appointment.slot}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>

              {appointment.notes && <p className="mt-3 text-sm text-slate-600">Notes: {appointment.notes}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(appointment.id, 'confirmed')}
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  Mark Confirmed
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(appointment.id, 'cancelled')}
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
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

export default ProviderDashboardPage
import { useEffect, useState } from 'react'
import { appointmentService } from '../services/appointmentService'

function ManageAppointmentsPage() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadRows = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const response = await appointmentService.getAdminAppointments()
        const appointments = response?.data?.appointments || []
        setRows(
          appointments.map((item) => ({
            id: item.id,
            user: item.userName,
            service: item.serviceName,
            slot: `${item.date} ${item.time}`,
            status: item.status,
          })),
        )
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || 'Unable to load appointments.')
      } finally {
        setIsLoading(false)
      }
    }

    loadRows()
  }, [])

  const setStatus = async (id, nextStatus) => {
    try {
      await appointmentService.updateAppointment(id, { status: nextStatus })
      setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: nextStatus } : row)))
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Unable to update status.')
    }
  }

  const statusClass = (status) => {
    if (status === 'confirmed') return 'bg-emerald-100 text-emerald-700'
    if (status === 'pending') return 'bg-amber-100 text-amber-700'
    return 'bg-rose-100 text-rose-700'
  }

  return (
    <div className="page manage-appointments-page px-4 pb-8 sm:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Appointments</h1>
        <p className="mt-2 text-sm text-slate-600">Approve or cancel appointment requests.</p>

        {errorMessage && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
            {errorMessage}
          </div>
        )}

        {isLoading && (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
            Loading appointments...
          </div>
        )}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-700">
                <th className="py-3 pr-4">User</th>
                <th className="py-3 pr-4">Service</th>
                <th className="py-3 pr-4">Slot</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">{row.user}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.service}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.slot}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setStatus(row.id, 'confirmed')}
                        className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus(row.id, 'cancelled')}
                        className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-rose-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default ManageAppointmentsPage

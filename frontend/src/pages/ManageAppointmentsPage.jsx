import { useEffect, useState } from 'react'
import { appointmentService } from '../services/appointmentService'
import { usersService } from '../services/usersService'

function ManageAppointmentsPage() {
  const [rows, setRows] = useState([])
  const [providers, setProviders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [providerSelections, setProviderSelections] = useState({})

  useEffect(() => {
    const loadRows = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const [appointmentsResponse, usersResponse] = await Promise.all([
          appointmentService.getAdminAppointments(),
          usersService.getUsers(),
        ])

        const appointments = appointmentsResponse?.data?.appointments || []
        const providerUsers = (usersResponse?.data?.users || []).filter((user) => user.role === 'provider')

        setProviders(providerUsers)
        setProviderSelections(
          appointments.reduce((accumulator, appointment) => {
            accumulator[appointment.id] = appointment.providerId || ''
            return accumulator
          }, {}),
        )
        setRows(
          appointments.map((item) => ({
            id: item.id,
            user: item.userName,
            service: item.serviceName,
            slot: `${item.date} ${item.time}`,
            status: item.status,
            providerId: item.providerId || '',
            providerName: item.providerName || 'Unassigned',
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

  const assignProvider = async (id) => {
    try {
      const selectedProviderId = providerSelections[id]
      await appointmentService.updateAppointment(id, {
        providerId: selectedProviderId === '' ? null : Number(selectedProviderId),
      })

      const providerName = providers.find((item) => String(item.id) === String(selectedProviderId))?.name || 'Unassigned'

      setRows((prev) =>
        prev.map((row) =>
          row.id === id
            ? {
                ...row,
                providerId: selectedProviderId,
                providerName,
              }
            : row,
        ),
      )
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Unable to assign provider.')
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
                <th className="py-3 pr-4">Provider</th>
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
                  <td className="py-3 pr-4 text-slate-700">
                    <div className="flex min-w-[180px] items-center gap-2">
                      <select
                        value={providerSelections[row.id] || ''}
                        onChange={(event) =>
                          setProviderSelections((prev) => ({
                            ...prev,
                            [row.id]: event.target.value,
                          }))
                        }
                        className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-xs"
                      >
                        <option value="">Unassigned</option>
                        {providers.map((provider) => (
                          <option key={provider.id} value={provider.id}>
                            {provider.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => assignProvider(row.id)}
                        className="rounded-md border border-sky-600 px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50"
                      >
                        Save
                      </button>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">Current: {row.providerName}</p>
                  </td>
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

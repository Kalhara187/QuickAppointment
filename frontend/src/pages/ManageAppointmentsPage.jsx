import { useState } from 'react'

const initialRows = [
  { id: 101, user: 'Aanya Verma', service: 'General Consultation', slot: '2026-03-26 09:30 AM', status: 'pending' },
  { id: 102, user: 'Daniel Brooks', service: 'Dental Care', slot: '2026-03-26 12:00 PM', status: 'confirmed' },
  { id: 103, user: 'Sofia Khan', service: 'Skin Treatment', slot: '2026-03-27 03:00 PM', status: 'pending' },
]

function ManageAppointmentsPage() {
  const [rows, setRows] = useState(initialRows)

  const setStatus = (id, nextStatus) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: nextStatus } : row)))
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

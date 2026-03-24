import { useState } from 'react'

const initialUsers = [
  { id: 1, name: 'Demo User', email: 'demo@quickappointment.com', role: 'user', active: true },
  { id: 2, name: 'Admin User', email: 'admin@quickappointment.com', role: 'admin', active: true },
  { id: 3, name: 'Sofia Khan', email: 'sofia@quickappointment.com', role: 'user', active: false },
]

function ManageUsersPage() {
  const [users, setUsers] = useState(initialUsers)

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, active: !user.active } : user)))
  }

  const toggleRole = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' } : user)),
    )
  }

  return (
    <div className="page manage-users-page px-4 pb-8 sm:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>
        <p className="mt-2 text-sm text-slate-600">View user accounts and adjust permissions.</p>

        <div className="mt-6 space-y-3">
          {users.map((user) => (
            <article key={user.id} className="rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-slate-900">{user.name}</h2>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                    {user.role}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {user.active ? 'active' : 'inactive'}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleRole(user.id)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-sky-600 hover:text-sky-700"
                >
                  Toggle Role
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(user.id)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-sky-600 hover:text-sky-700"
                >
                  Toggle Status
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ManageUsersPage

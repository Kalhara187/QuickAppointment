import { useEffect, useState } from 'react'
import { usersService } from '../services/usersService'

function ManageUsersPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const roleOptions = ['user', 'provider', 'admin']

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const response = await usersService.getUsers()
        setUsers(response?.data?.users || [])
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || 'Unable to load users.')
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  const updateRole = async (id, nextRole) => {
    if (!nextRole) return

    try {
      setErrorMessage('')
      await usersService.updateUserRole(id, nextRole)
      setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role: nextRole } : user)))
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Unable to update user role.')
    }
  }

  return (
    <div className="page manage-users-page px-4 pb-8 sm:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>
        <p className="mt-2 text-sm text-slate-600">View user accounts and adjust permissions.</p>

        {errorMessage && <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>}

        {isLoading && <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">Loading users...</p>}

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
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <select
                  value={user.role}
                  onChange={(event) => updateRole(user.id, event.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ManageUsersPage

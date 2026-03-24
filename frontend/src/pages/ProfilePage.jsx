import { useMemo, useState } from 'react'

const initialProfile = {
  fullName: 'Demo User',
  email: 'demo@quickappointment.com',
  phone: '+1 555 123 4567',
  city: 'New York',
  bio: 'I prefer morning appointments and SMS reminders.',
}

function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile)
  const [editing, setEditing] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const initials = useMemo(() => {
    const parts = profile.fullName.trim().split(' ')
    return `${parts[0]?.[0] || 'U'}${parts[1]?.[0] || ''}`.toUpperCase()
  }, [profile.fullName])

  const handleChange = (event) => {
    const { name, value } = event.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = (event) => {
    event.preventDefault()
    setEditing(false)
    setStatusMessage('Profile updated successfully.')
  }

  return (
    <div className="page profile-page px-4 pb-8 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-[#0c355b] via-[#17608a] to-[#2089a6] px-6 py-12 text-white shadow-2xl sm:px-10 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">User Profile</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Manage your account</h1>
        <p className="mt-4 max-w-2xl text-cyan-50">Update your details and preferences to book faster every time.</p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-sky-600 text-2xl font-bold text-white">
            {initials}
          </div>
          <h2 className="mt-4 text-center text-xl font-bold text-slate-900">{profile.fullName}</h2>
          <p className="text-center text-sm text-slate-600">{profile.email}</p>
          <button
            type="button"
            className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-600 hover:text-sky-700"
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </aside>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Personal Details</h2>
          <p className="mt-2 text-sm text-slate-600">Keep your information accurate for better appointment coordination.</p>

          {statusMessage && (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              {statusMessage}
            </p>
          )}

          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSave}>
            <label className="space-y-1 sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Full Name</span>
              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Phone</span>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">City</span>
              <input
                name="city"
                value={profile.city}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
              />
            </label>

            <label className="space-y-1 sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Bio</span>
              <textarea
                name="bio"
                rows="4"
                value={profile.bio}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
              />
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={!editing}
                className="rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                Save Changes
              </button>
            </div>
          </form>
        </article>
      </section>
    </div>
  )
}

export default ProfilePage

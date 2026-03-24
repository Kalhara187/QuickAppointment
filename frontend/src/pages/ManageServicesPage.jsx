import { useState } from 'react'

const initialServices = [
  { id: 1, name: 'General Consultation', duration: '30 min' },
  { id: 2, name: 'Dental Care', duration: '45 min' },
  { id: 3, name: 'Physiotherapy Session', duration: '60 min' },
]

function ManageServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [newService, setNewService] = useState({ name: '', duration: '' })

  const addService = (event) => {
    event.preventDefault()
    if (!newService.name || !newService.duration) {
      return
    }

    setServices((prev) => [
      ...prev,
      { id: Date.now(), name: newService.name, duration: newService.duration },
    ])
    setNewService({ name: '', duration: '' })
  }

  const removeService = (id) => {
    setServices((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="page manage-services-page px-4 pb-8 sm:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Services</h1>
        <p className="mt-2 text-sm text-slate-600">Create and maintain all bookable services.</p>

        <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_180px_auto]" onSubmit={addService}>
          <input
            value={newService.name}
            onChange={(event) => setNewService((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Service name"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={newService.duration}
            onChange={(event) => setNewService((prev) => ({ ...prev, duration: event.target.value }))}
            placeholder="Duration"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">
            Add Service
          </button>
        </form>

        <ul className="mt-6 space-y-3">
          {services.map((service) => (
            <li key={service.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <div>
                <p className="font-semibold text-slate-900">{service.name}</p>
                <p className="text-sm text-slate-600">{service.duration}</p>
              </div>
              <button
                type="button"
                onClick={() => removeService(service.id)}
                className="rounded-md border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default ManageServicesPage

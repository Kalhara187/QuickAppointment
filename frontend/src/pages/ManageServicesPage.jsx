import { useEffect, useState } from 'react'
import { servicesService } from '../services/servicesService'

function ManageServicesPage() {
  const [services, setServices] = useState([])
  const [newService, setNewService] = useState({ name: '', description: '', price: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true)
        const response = await servicesService.getServices({ limit: 50, sortBy: 'id', sortOrder: 'DESC' })
        setServices(response?.data?.services || [])
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || 'Unable to load services.')
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  const addService = async (event) => {
    event.preventDefault()
    if (!newService.name || !newService.description) {
      return
    }

    try {
      setErrorMessage('')
      const createResponse = await servicesService.createService({
        name: newService.name,
        description: newService.description,
        price: newService.price === '' ? null : Number(newService.price),
      })

      const serviceId = createResponse?.data?.serviceId
      if (serviceId) {
        const details = await servicesService.getServices({ limit: 50, sortBy: 'id', sortOrder: 'DESC' })
        setServices(details?.data?.services || [])
      }

      setStatusMessage('Service added successfully.')
      setNewService({ name: '', description: '', price: '' })
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Unable to add service.')
    }
  }

  const removeService = async (id) => {
    try {
      setErrorMessage('')
      await servicesService.deleteService(id)
      setServices((prev) => prev.filter((item) => item.id !== id))
      setStatusMessage('Service deleted successfully.')
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Unable to delete service.')
    }
  }

  return (
    <div className="page manage-services-page px-4 pb-8 sm:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Services</h1>
        <p className="mt-2 text-sm text-slate-600">Create and maintain all bookable services.</p>

        {statusMessage && <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{statusMessage}</p>}
        {errorMessage && <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>}

        <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_140px_auto]" onSubmit={addService}>
          <input
            value={newService.name}
            onChange={(event) => setNewService((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Service name"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={newService.description}
            onChange={(event) => setNewService((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="Description"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            value={newService.price}
            onChange={(event) => setNewService((prev) => ({ ...prev, price: event.target.value }))}
            placeholder="Price"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">
            Add Service
          </button>
        </form>

        <ul className="mt-6 space-y-3">
          {isLoading && <li className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600">Loading services...</li>}
          {services.map((service) => (
            <li key={service.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <div>
                <p className="font-semibold text-slate-900">{service.name}</p>
                <p className="text-sm text-slate-600">{service.description}</p>
                <p className="text-xs text-slate-500">{service.price !== null ? `$${Number(service.price).toFixed(2)}` : 'No price'}</p>
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

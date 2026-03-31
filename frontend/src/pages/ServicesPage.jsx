import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { servicesService } from '../services/servicesService'

function ServicesPage() {
  const [services, setServices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
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

  const categories = useMemo(() => ['All', ...new Set(services.map((item) => item.category).filter(Boolean))], [services])

  const filteredServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return services.filter((service) => {
      const categoryMatch = activeCategory === 'All' || service.category === activeCategory
      const searchMatch =
        !query || service.name.toLowerCase().includes(query) || service.description.toLowerCase().includes(query)
      return categoryMatch && searchMatch
    })
  }, [searchTerm, activeCategory, services])

  return (
    <div className="page services-page px-4 pb-8 sm:px-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d3359] via-[#145a8c] to-[#1c7c9c] px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-20">
        <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-20 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">QuickAppointment Services</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Built for fast and reliable scheduling.</h1>
          <p className="mt-6 max-w-2xl text-base text-cyan-50 sm:text-lg">
            Explore our comprehensive suite of features designed to simplify appointments for service providers and
            users alike.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Search Services</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by service name or feature"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeCategory === category
                    ? 'bg-sky-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <p className="text-sm text-slate-600">Loading services...</p>}
        {!isLoading && errorMessage && <p className="text-sm text-rose-700">{errorMessage}</p>}
        {filteredServices.map((service) => (
          <article
            key={service.id}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 p-4 text-sky-700 transition-all duration-300 group-hover:bg-sky-100 group-hover:scale-110">
              {service.icon || service.name.slice(0, 2).toUpperCase()}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{service.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">{service.category || 'General'}</span>
              <Link to="/book-appointment" state={{ service: service.name }} className="text-sm font-semibold text-sky-700 hover:text-sky-800">
                Book Now
              </Link>
            </div>
            <p className="mt-3 text-sm font-semibold text-emerald-700">
              {service.price !== null ? `$${Number(service.price).toFixed(2)}` : 'Contact for pricing'}
            </p>
          </article>
        ))}
      </section>

      {filteredServices.length === 0 && (
        <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
          <h3 className="text-lg font-bold text-slate-900">No services found</h3>
          <p className="mt-2 text-sm text-slate-600">Try a different keyword or select another category filter.</p>
        </section>
      )}
    </div>
  )
}

export default ServicesPage

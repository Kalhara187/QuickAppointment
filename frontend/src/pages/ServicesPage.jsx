import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const serviceCards = [
  {
    title: 'Clinic Scheduling',
    description: 'Manage doctor and patient bookings with clean daily and weekly slots.',
    category: 'Scheduling',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3.5V7M16 3.5V7M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Automated Reminders',
    description: 'Send confirmation and reminder notifications so fewer appointments are missed.',
    category: 'Communication',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path
          d="M18 8a6 6 0 01-7.5 5.9M9 18h6M7 18.5v2M17 18.5v2M8 8.5l-2-2M16 8.5l2-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Team Calendar Sync',
    description: 'Keep staff availability aligned across locations and service categories.',
    category: 'Scheduling',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Availability',
    description: 'Instant slot updates ensure no double bookings across your entire team.',
    category: 'Availability',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 6v6l4.24 2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Client Management',
    description: 'Organize client details, preferences, and history in one centralized hub.',
    category: 'Management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 20c0-3.5 4.5-7 9-7s9 3.5 9 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Analytics & Reports',
    description: 'Gain insights into booking trends and business performance metrics.',
    category: 'Analytics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M3 12h2v9H3zM7 8h2v13H7zM11 4h2v17h-2zM15 6h2v15h-2zM19 5h2v16h-2z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
]

function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => ['All', ...new Set(serviceCards.map((item) => item.category))], [])

  const filteredServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return serviceCards.filter((service) => {
      const categoryMatch = activeCategory === 'All' || service.category === activeCategory
      const searchMatch =
        !query || service.title.toLowerCase().includes(query) || service.description.toLowerCase().includes(query)
      return categoryMatch && searchMatch
    })
  }, [searchTerm, activeCategory])

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
        {filteredServices.map((service) => (
          <article
            key={service.title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="inline-flex rounded-xl bg-sky-50 p-4 text-sky-700 transition-all duration-300 group-hover:bg-sky-100 group-hover:scale-110">
              {service.icon}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">{service.category}</span>
              <Link to="/book-appointment" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
                Book Now
              </Link>
            </div>
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

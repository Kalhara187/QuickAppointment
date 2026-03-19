import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Lightning Fast',
    description: 'Book appointments in seconds with our streamlined interface.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Always Available',
    description: 'Access your appointments 24/7 on any device, anywhere.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 6v6l4 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Smart Reminders',
    description: 'Never miss an appointment again with automated notifications.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
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
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M12 2L3 6.5v6c0 6 9 8 9 8s9-2 9-8v-6L12 2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const stats = [
  { number: '50K+', label: 'Happy Users' },
  { number: '1M+', label: 'Appointments Booked' },
  { number: '99.9%', label: 'Uptime' },
]

function HomePage() {
  return (
    <div className="page home-page">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2f51] via-[#1247a0] to-[#1b7fa0] px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-20">
        <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-20 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Welcome to QuickAppointment</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Scheduling Made Simple & Smart
          </h1>
          <p className="mt-6 max-w-2xl text-base text-cyan-50 sm:text-lg">
            The all-in-one appointment platform for service providers and users who value their time. Book, manage, and
            stay organized with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/book-appointment"
              className="inline-flex items-center rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 hover:shadow-lg"
            >
              Get Started Today
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <p className="text-3xl font-bold text-sky-700 sm:text-4xl">{stat.number}</p>
            <p className="mt-2 text-sm font-medium text-slate-600">{stat.label}</p>
          </article>
        ))}
      </section>

      <section className="mt-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-700">Why Choose Us</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Powerful Features for Everyone</h2>
          <p className="mt-3 text-slate-600">Everything you need in one beautiful, intuitive platform</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex rounded-xl bg-sky-50 p-3 text-sky-700 transition-all duration-300 group-hover:bg-sky-100 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-8 shadow-sm sm:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Ready to transform your scheduling?</h2>
          <p className="mt-3 text-slate-600">Join thousands of users who are already saving time and improving organization.</p>
          <Link
            to="/book-appointment"
            className="mt-6 inline-flex items-center rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Start Booking Now
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
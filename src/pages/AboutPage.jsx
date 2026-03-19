const coreValues = [
  {
    title: 'Our Mission',
    description:
      'Make appointment booking effortless for everyone by combining speed, clarity, and dependable service tools.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M12 3l7 4v5c0 5-3.4 8.8-7 10-3.6-1.2-7-5-7-10V7l7-4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 12.5l1.8 1.8 3.4-3.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Our Vision',
    description:
      'Lead digital appointment management with thoughtful innovation, trusted reliability, and excellent user experience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: 'Our Services',
    description:
      'Smart scheduling, secure reminders, and centralized booking workflows for clinics, businesses, and service teams.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3.5V7M16 3.5V7M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

const teamMembers = [
  { name: 'Aisha Khan', role: 'Product Lead', initials: 'AK', color: 'bg-gradient-to-br from-sky-500 to-blue-600' },
  { name: 'Daniel Brooks', role: 'Engineering Lead', initials: 'DB', color: 'bg-gradient-to-br from-cyan-500 to-teal-600' },
  { name: 'Mina Carter', role: 'Customer Success', initials: 'MC', color: 'bg-gradient-to-br from-emerald-500 to-green-600' },
]

function AboutPage() {
  return (
    <div className="page about-page px-4 pb-8 sm:px-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2945] via-[#11456b] to-[#1a6f8f] px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-20">
        <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-20 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100">About QuickAppointment</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Built to simplify every appointment journey.</h1>
          <p className="mt-6 max-w-2xl text-base text-cyan-50 sm:text-lg">
            QuickAppointment helps users and service providers schedule with confidence through a fast, intuitive, and
            reliable platform designed for modern life.
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        {coreValues.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="inline-flex rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 p-4 text-sky-700 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
              {item.icon}
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-8 shadow-sm sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">People Behind The Platform</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Meet the team</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            We combine product strategy, engineering expertise, and customer-centric thinking to deliver a platform
            that our users love.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-base font-bold text-white transition-all duration-300 group-hover:scale-110 ${member.color}`}
              >
                {member.initials}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{member.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage

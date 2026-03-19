import { useState } from 'react'

const steps = [
  {
    number: '01',
    title: 'Pick Service',
    description: 'Choose the service type that best matches your needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3.5V7M16 3.5V7M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Select Time',
    description: 'Review availability and pick your most convenient slot.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 6v6l4 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Confirm & Done',
    description: 'Submit your details and receive immediate confirmation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
]

function BookAppointmentPage() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="page book-appointment-page px-4 pb-8 sm:px-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123b63] via-[#17648f] to-[#20908f] px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-20">
        <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-20 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Book Appointment</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Reserve your slot in minutes.</h1>
          <p className="mt-6 max-w-2xl text-base text-cyan-50 sm:text-lg">
            Choose your service, select a preferred time, and confirm your appointment quickly. It only takes three
            simple steps.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Simple 3-Step Process</h2>
          <p className="mt-2 text-slate-600">Get your appointment booked with ease</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              onClick={() => setActiveStep(index)}
              className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                activeStep === index
                  ? 'border-sky-600 bg-sky-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-sky-600 text-white scale-110'
                    : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                }`}
              >
                {step.number}
              </div>
              <div className={`mt-3 inline-flex rounded-lg p-2 ${activeStep === index ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-700'}`}>
                {step.icon}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 to-cyan-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Why Book With Us?</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-sm text-slate-700">Instant confirmation & email receipt</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-sm text-slate-700">Automatic reminders via email or SMS</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-sm text-slate-700">Easy rescheduling options available</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-sm text-slate-700">No hidden fees or surprise charges</span>
            </li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Quick Start</h3>
          <p className="mt-2 text-sm text-slate-600">Begin your booking journey right now:</p>
          <button className="mt-4 w-full rounded-lg bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700">
            Start Booking Now
          </button>
          <p className="mt-3 text-xs text-slate-500 text-center">Takes less than 2 minutes to complete</p>
        </article>
      </section>
    </div>
  )
}

export default BookAppointmentPage

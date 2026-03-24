import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const services = [
  {
    name: 'General Consultation',
    description: 'Fast appointments for checkups and everyday health concerns.',
    iconCode: 'GC',
    popularity: 'Most Booked',
    rating: 4.9,
  },
  {
    name: 'Dental Care',
    description: 'Professional cleaning, oral exams, and preventive dental treatment.',
    iconCode: 'DC',
    popularity: 'Trending',
    rating: 4.8,
  },
  {
    name: 'Physiotherapy Session',
    description: 'Personalized movement recovery and posture-focused rehabilitation.',
    iconCode: 'PT',
    popularity: 'Popular',
    rating: 4.7,
  },
  {
    name: 'Mental Wellness',
    description: 'Confidential counseling sessions for stress and emotional support.',
    iconCode: 'MW',
    popularity: 'Highly Rated',
    rating: 4.9,
  },
  {
    name: 'Skin Treatment',
    description: 'Dermatology appointments for skin health and cosmetic concerns.',
    iconCode: 'ST',
    popularity: 'Hot Right Now',
    rating: 4.8,
  },
  {
    name: 'Eye Examination',
    description: 'Vision assessment and specialist guidance for eye care.',
    iconCode: 'EE',
    popularity: 'Recommended',
    rating: 4.7,
  },
]

const steps = [
  {
    title: 'Choose a service',
    description: 'Pick what you need from our complete service catalog.',
  },
  {
    title: 'Select date & time',
    description: 'See real-time availability and book the slot that fits your day.',
  },
  {
    title: 'Confirm booking',
    description: 'Get instant confirmation and reminder alerts before your visit.',
  },
]

const testimonials = [
  {
    name: 'Aanya Verma',
    role: 'Working Professional',
    image: 'AV',
    quote: 'QuickAppointment saved me so much time. I booked my checkup in less than a minute.',
    rating: 5,
  },
  {
    name: 'Daniel Brooks',
    role: 'Parent',
    image: 'DB',
    quote: 'The date and time picker is super easy to use. Smooth and professional experience.',
    rating: 5,
  },
  {
    name: 'Sofia Khan',
    role: 'Student',
    image: 'SK',
    quote: 'I love how clear everything is. Services, pricing, and booking all in one place.',
    rating: 4,
  },
]

const quickTimes = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:30 PM', '06:00 PM']

function HomePage() {
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState(services[0].name)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState(quickTimes[0])
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const minDate = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = `${now.getMonth() + 1}`.padStart(2, '0')
    const day = `${now.getDate()}`.padStart(2, '0')
    return `${year}-${month}-${day}`
  }, [])

  const handleQuickBook = () => {
    navigate('/book-appointment', {
      state: {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
      },
    })
  }

  return (
    <div className="page home-page pb-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062d4f] via-[#0e5f8f] to-[#0ea5b7] px-6 py-14 text-white shadow-[0_30px_80px_rgba(7,52,77,0.35)] sm:px-10 sm:py-20">
        <div className="absolute -left-36 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-6 top-10 hidden h-40 w-40 rotate-12 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm lg:block" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-100/20 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100">Smart Scheduling Platform</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Book Your Appointment in Seconds
            </h1>
            <p className="mt-5 max-w-2xl text-base text-cyan-50 sm:text-lg">
              QuickAppointment helps you discover services, pick available time slots, and confirm appointments with a
              single smooth flow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book-appointment"
                className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-sky-800 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                Book Now
              </Link>
              <a
                href="#services-preview"
                className="inline-flex items-center rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-md sm:p-6">
            <p className="text-sm font-semibold text-cyan-100">Today on QuickAppointment</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-2xl font-extrabold">12k+</p>
                <p className="text-xs uppercase tracking-wide text-cyan-100">Monthly Bookings</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-2xl font-extrabold">98%</p>
                <p className="text-xs uppercase tracking-wide text-cyan-100">On-Time Visits</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-2xl font-extrabold">4.9/5</p>
                <p className="text-xs uppercase tracking-wide text-cyan-100">Average Rating</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-2xl font-extrabold">24/7</p>
                <p className="text-xs uppercase tracking-wide text-cyan-100">Booking Access</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-sky-100 bg-white p-4 shadow-lg shadow-sky-100/60 sm:p-6">
        <div className="grid gap-3 md:grid-cols-4 md:items-end">
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service</span>
            <select
              className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              value={selectedService}
              onChange={(event) => setSelectedService(event.target.value)}
            >
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Date</span>
            <input
              type="date"
              min={minDate}
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Time</span>
            <select
              className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
            >
              {quickTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={handleQuickBook}
            className="rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sky-800"
          >
            Book Appointment
          </button>
        </div>
      </section>

      <section id="services-preview" className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Services Preview</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Choose From Top Services</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
            View More
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sm font-bold text-sky-700">
                {service.iconCode}
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{service.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">{service.popularity}</span>
                <span className="text-sm font-semibold text-amber-600">{service.rating} stars</span>
              </div>
              <Link
                to="/book-appointment"
                className="mt-4 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition duration-300 group-hover:border-sky-500 group-hover:text-sky-700"
              >
                Book Now
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">How It Works</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900">Book in 3 Simple Steps</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition duration-300 hover:bg-sky-50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-700 text-sm font-bold text-white">
                0{index + 1}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Featured</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Popular Right Now</h2>
          </div>
          <Link to="/book-appointment" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
            Quick Booking
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <article
              key={`featured-${service.name}`}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-sky-50 p-5 shadow-sm"
            >
              <span className="absolute right-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {service.popularity}
              </span>
              <p className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sm font-bold text-sky-700 shadow-sm">
                {service.iconCode}
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">{service.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              <p className="mt-4 text-sm font-semibold text-amber-600">Rated {service.rating} out of 5</p>
              <Link
                to="/book-appointment"
                className="mt-4 inline-flex rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Book This Service
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <article className="rounded-3xl bg-gradient-to-br from-[#04243f] to-[#0f7493] p-7 text-white shadow-xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">Testimonials</p>
          <h2 className="mt-2 text-3xl font-black">What Our Users Say</h2>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-sky-800">
                {testimonials[activeTestimonial].image}
              </span>
              <div>
                <p className="font-bold">{testimonials[activeTestimonial].name}</p>
                <p className="text-xs text-cyan-100">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>

            <p className="mt-4 text-cyan-50">"{testimonials[activeTestimonial].quote}"</p>
            <p className="mt-3 text-sm text-amber-200">{'*'.repeat(testimonials[activeTestimonial].rating)}</p>
          </div>

          <div className="mt-4 flex gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeTestimonial ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">About QuickAppointment</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900">Scheduling Built For Real Life</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            We built QuickAppointment to make appointment booking feel effortless. Whether you are booking a single visit
            or managing ongoing sessions, the platform keeps everything organized and accessible.
          </p>
          <div className="mt-5 rounded-2xl bg-slate-100 p-5 text-center">
            <p className="text-sm font-semibold text-slate-700">Trusted by clinics, salons, consultants, and wellness teams.</p>
          </div>
          <Link
            to="/about"
            className="mt-5 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-500 hover:text-sky-700"
          >
            Read More
          </Link>
        </article>
      </section>

      <section className="mt-16 rounded-3xl bg-gradient-to-r from-sky-700 to-cyan-700 px-6 py-10 text-center text-white shadow-lg sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">Ready to Start?</p>
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Ready to book your appointment?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-cyan-50">
          Skip the waiting and reserve your preferred slot right now with just a few clicks.
        </p>
        <Link
          to="/book-appointment"
          className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-sky-800 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-50"
        >
          Get Started
        </Link>
      </section>

      <section className="mt-16 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-8">
        <article>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Contact Preview</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900">Need Help Before Booking?</h2>
          <p className="mt-3 text-sm text-slate-600">
            Reach out anytime and our team will guide you through services, timing, and next steps.
          </p>

          <ul className="mt-5 space-y-3 text-sm text-slate-700">
            <li className="rounded-xl bg-slate-100 px-4 py-3">Email: support@quickappointment.com</li>
            <li className="rounded-xl bg-slate-100 px-4 py-3">Phone: +1 (555) 123-4567</li>
          </ul>

          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-500 hover:text-sky-700"
          >
            Contact Us
          </Link>
        </article>

        <article className="rounded-2xl bg-slate-50 p-5">
          <h3 className="text-lg font-bold text-slate-900">Quick Message</h3>
          <p className="mt-1 text-sm text-slate-600">Want us to call you back?</p>
          <form className="mt-4 space-y-3" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            />
            <textarea
              rows="3"
              placeholder="How can we help?"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            />
            <Link
              to="/contact"
              className="inline-flex rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Send Via Contact Page
            </Link>
          </form>
        </article>
      </section>

    </div>
  )
}

export default HomePage
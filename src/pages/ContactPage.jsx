import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const contactDetails = [
  {
    label: 'Phone',
    value: '+1 (555) 123-4567',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M7.8 4.6l2.1 2.1a1 1 0 010 1.4L8.7 9.3a13.3 13.3 0 006 6l1.2-1.2a1 1 0 011.4 0l2.1 2.1a1 1 0 010 1.4l-1.1 1.1a2.5 2.5 0 01-2.6.6A17.8 17.8 0 014.7 8.4a2.5 2.5 0 01.6-2.6l1.1-1.1a1 1 0 011.4 0z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'support@quickappointment.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 7l7.5 5L19.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: '123 Health Avenue, Suite 400, New York, NY',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 20s6-4.7 6-10a6 6 0 10-12 0c0 5.3 6 10 6 10z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
]

function ContactPage() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields before sending your message.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      // Simulate a request until backend contact endpoint is available.
      await new Promise((resolve) => setTimeout(resolve, 800))
      setStatus({ type: 'success', message: 'Message sent successfully. We will get back to you soon.' })
      setFormData(initialForm)
    } catch {
      setStatus({ type: 'error', message: 'Unable to send message right now. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page contact-page px-4 pb-8 sm:px-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-700 via-cyan-700 to-teal-700 px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-20">
        <div className="absolute -right-40 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-12 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">QuickAppointment Support</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Get In Touch With Us</h1>
          <p className="mt-6 max-w-2xl text-base text-cyan-50 sm:text-lg">
            Have questions or feedback? We'd love to hear from you. Our support team is here to help.
          </p>
        </div>
      </section>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <section className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-3 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
          <p className="mt-2 text-slate-600">Fill out the form and we'll get back to you within 24 hours.</p>

          {status.message && (
            <div
              className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-rose-200 bg-rose-50 text-rose-800'
              }`}
              role="status"
            >
              {status.message}
            </div>
          )}

          <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                  placeholder="Your full name"
                />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="space-y-1 block">
              <span className="text-sm font-medium text-slate-700">Subject</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                placeholder="How can we help?"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-sm font-medium text-slate-700">Message</span>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                placeholder="Write your message here..."
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-cyan-400"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>

        <aside className="space-y-6 lg:col-span-2">
          <section className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">Get in touch</h2>
            <ul className="mt-5 space-y-4">
              {contactDetails.map((item) => (
                <li key={item.label} className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:bg-slate-100">
                  <span className="mt-0.5 flex-shrink-0 text-sky-700">{item.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-0.5 text-sm text-slate-600">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
              <h2 className="font-bold text-slate-900">Our location</h2>
            </div>
            <iframe
              title="QuickAppointment location map"
              src="https://maps.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
              width="100%"
              height="240"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </section>

          <section className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
            <h2 className="font-bold text-slate-900">Follow us</h2>
            <p className="mt-2 text-sm text-slate-600">Connect with us on social media</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-600 hover:text-sky-700 hover:bg-sky-50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-600 hover:text-sky-700 hover:bg-sky-50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.196-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.196 4.354 2.617 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.196 6.78-2.618 6.977-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.28-.059-1.688-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-600 hover:text-sky-700 hover:bg-sky-50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default ContactPage

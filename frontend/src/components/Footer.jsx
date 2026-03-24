import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-slate-900 px-6 py-10 text-slate-200 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-black text-white">QuickAppointment</h3>
          <p className="mt-3 text-sm text-slate-400">Modern scheduling for faster appointments and better experiences.</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link className="hover:text-white" to="/">Home</Link></li>
            <li><Link className="hover:text-white" to="/services">Services</Link></li>
            <li><Link className="hover:text-white" to="/book-appointment">Book Appointment</Link></li>
            <li><Link className="hover:text-white" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Account</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link className="hover:text-white" to="/profile">Profile</Link></li>
            <li><Link className="hover:text-white" to="/my-appointments">My Appointments</Link></li>
            <li><Link className="hover:text-white" to="/admin/dashboard">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Social</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><a className="hover:text-white" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a className="hover:text-white" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a className="hover:text-white" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-slate-800 pt-5 text-xs text-slate-500">
        (c) {new Date().getFullYear()} QuickAppointment. All rights reserved.
      </div>
    </footer>
  )
}

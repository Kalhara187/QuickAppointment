import { Link } from 'react-router-dom'

function AccessDeniedPage() {
  return (
    <div className="page px-4 pb-8 sm:px-6">
      <section className="mx-auto max-w-2xl rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-600">Access Denied</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">You do not have permission to view this page.</h1>
        <p className="mt-3 text-sm text-slate-600">
          Please sign in with an account that has the required role, or return to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800">
            Go Home
          </Link>
          <Link to="/login" className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-sky-600 hover:text-sky-700">
            Sign In
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AccessDeniedPage
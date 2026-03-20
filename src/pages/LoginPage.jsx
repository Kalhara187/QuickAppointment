import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthPages.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialFields = {
  identifier: '',
  password: '',
  remember: false,
}

function LoginPage() {
  const navigate = useNavigate()
  const [fields, setFields] = useState(initialFields)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEmailInput = useMemo(() => fields.identifier.includes('@'), [fields.identifier])

  const validateFields = () => {
    const nextErrors = {}

    if (!fields.identifier.trim()) {
      nextErrors.identifier = 'Email or username is required.'
    }

    if (isEmailInput && !EMAIL_REGEX.test(fields.identifier.trim())) {
      nextErrors.identifier = 'Enter a valid email address.'
    }

    if (!fields.password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    return nextErrors
  }

  const updateField = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setApiError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateFields()

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setApiError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1300))

    const id = fields.identifier.trim().toLowerCase()
    const isValidCredential =
      (id === 'demo@quickappointment.com' || id === 'demo') && fields.password === 'Pass@123'

    if (!isValidCredential) {
      setApiError('Incorrect login details. Use demo@quickappointment.com / Pass@123 for demo access.')
      setIsSubmitting(false)
      return
    }

    setSuccessMessage('Login successful. Redirecting to dashboard...')
    setIsSubmitting(false)

    setTimeout(() => {
      navigate('/')
    }, 850)
  }

  return (
    <section className="auth-shell page">
      <article className="auth-card">
        <header className="mb-6 space-y-3 text-center">
          <p className="inline-flex auth-badge">Secure Access</p>
          <h1 className="text-3xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-600">Login to manage appointments, reminders, and profile details.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="identifier" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Email / Username
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
              <input
                id="identifier"
                type="text"
                autoComplete="username"
                placeholder="demo@quickappointment.com"
                value={fields.identifier}
                onChange={(event) => updateField('identifier', event.target.value)}
                className="auth-input pl-8"
              />
            </div>
            {errors.identifier && <p className="mt-1.5 text-xs font-semibold text-rose-600">{errors.identifier}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">*</span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={fields.password}
                onChange={(event) => updateField('password', event.target.value)}
                className="auth-input pl-8 pr-24"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2.5 py-1 text-xs font-bold text-sky-700 transition hover:bg-sky-50"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-xs font-semibold text-rose-600">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="inline-flex cursor-pointer items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={fields.remember}
                onChange={(event) => updateField('remember', event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200"
              />
              Remember me
            </label>
            <Link to="/contact" className="font-semibold text-sky-700 hover:text-sky-800">
              Forgot Password?
            </Link>
          </div>

          {apiError && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">{apiError}</p>
          )}

          {successMessage && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
              {successMessage}
            </p>
          )}

          <button type="submit" disabled={isSubmitting} className="auth-submit flex w-full items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <span className="auth-spinner" aria-hidden="true" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="auth-divider my-5">or continue with</p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button type="button" className="auth-social-btn">
            Google
          </button>
          <button type="button" className="auth-social-btn">
            Facebook
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-bold text-sky-700 hover:text-sky-800">
            Register
          </Link>
        </p>
      </article>
    </section>
  )
}

export default LoginPage

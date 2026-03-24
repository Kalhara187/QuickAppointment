import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthPages.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialFields = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
}

function passwordScore(password) {
  let score = 0
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return score
}

function scoreLabel(score) {
  if (score <= 2) return 'Weak'
  if (score === 3 || score === 4) return 'Medium'
  return 'Strong'
}

function scoreTone(score) {
  if (score <= 2) return 'bg-rose-500'
  if (score === 3 || score === 4) return 'bg-amber-500'
  return 'bg-emerald-500'
}

function RegisterPage() {
  const navigate = useNavigate()
  const [fields, setFields] = useState(initialFields)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const score = useMemo(() => passwordScore(fields.password), [fields.password])
  const strengthLabel = useMemo(() => scoreLabel(score), [score])
  const strengthClass = useMemo(() => scoreTone(score), [score])

  const updateField = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateFields = () => {
    const nextErrors = {}

    if (!fields.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!fields.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(fields.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!fields.password) {
      nextErrors.password = 'Password is required.'
    } else if (fields.password.length < 8) {
      nextErrors.password = 'Use at least 8 characters.'
    }

    if (!fields.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (fields.password !== fields.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    if (!fields.termsAccepted) {
      nextErrors.termsAccepted = 'You must accept Terms & Conditions.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateFields()

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    setSuccessMessage('')

    await new Promise((resolve) => setTimeout(resolve, 1400))

    setIsSubmitting(false)
    setSuccessMessage('Account created successfully. Redirecting to login...')

    setTimeout(() => {
      navigate('/login')
    }, 900)
  }

  return (
    <section className="auth-shell page">
      <article className="auth-card max-w-[520px]">
        <header className="mb-5 space-y-3 text-center">
          <p className="inline-flex auth-badge">Join QuickAppointment</p>
          <h1 className="text-3xl font-black text-slate-900">Create Your Account</h1>
          <p className="text-sm text-slate-600">Register once and book appointments faster every time.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              value={fields.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              className="auth-input"
            />
            {errors.fullName && <p className="mt-1 text-xs font-semibold text-rose-600">{errors.fullName}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="john@email.com"
                value={fields.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="auth-input"
              />
              {errors.email && <p className="mt-1 text-xs font-semibold text-rose-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-800">
                Phone (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 987 654"
                value={fields.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                className="auth-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Create a strong password"
                value={fields.password}
                onChange={(event) => updateField('password', event.target.value)}
                className="auth-input pr-24"
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
            <div className="mt-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all duration-300 ${strengthClass}`}
                  style={{ width: `${Math.max(score, 1) * 20}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-600">Password strength: {strengthLabel}</p>
            </div>
            {errors.password && <p className="mt-1 text-xs font-semibold text-rose-600">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Re-enter password"
                value={fields.confirmPassword}
                onChange={(event) => updateField('confirmPassword', event.target.value)}
                className="auth-input pr-24"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2.5 py-1 text-xs font-bold text-sky-700 transition hover:bg-sky-50"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs font-semibold text-rose-600">{errors.confirmPassword}</p>}
          </div>

          <label className="mt-1 inline-flex cursor-pointer items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={fields.termsAccepted}
              onChange={(event) => updateField('termsAccepted', event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200"
            />
            <span>
              I agree to the Terms & Conditions and Privacy Policy.
            </span>
          </label>
          {errors.termsAccepted && <p className="-mt-2 text-xs font-semibold text-rose-600">{errors.termsAccepted}</p>}

          {successMessage && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
              {successMessage}
            </p>
          )}

          <button type="submit" disabled={isSubmitting} className="auth-submit flex w-full items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <span className="auth-spinner" aria-hidden="true" />
                Creating account...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="auth-divider my-5">or sign up with</p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button type="button" className="auth-social-btn">
            Google
          </button>
          <button type="button" className="auth-social-btn">
            Facebook
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-sky-700 hover:text-sky-800">
            Login
          </Link>
        </p>
      </article>
    </section>
  )
}

export default RegisterPage

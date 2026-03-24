import { useEffect } from 'react'

export function Toast({ open, type = 'success', message, onClose, duration = 2800 }) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      onClose?.()
    }, duration)

    return () => window.clearTimeout(timer)
  }, [open, duration, onClose])

  if (!open || !message) {
    return null
  }

  const toneClass =
    type === 'error'
      ? 'border-rose-200 bg-rose-50 text-rose-700'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700'

  return (
    <div className="fixed right-4 top-24 z-[60] max-w-sm animate-[fadeIn_0.25s_ease]">
      <div className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg ${toneClass}`} role="status" aria-live="polite">
        <div className="flex items-start justify-between gap-4">
          <p>{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-0.5 text-xs font-bold opacity-80 transition hover:opacity-100"
            aria-label="Dismiss notification"
          >
            x
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast

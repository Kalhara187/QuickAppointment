export function ErrorAlert({ title = 'Error', message, onClose }) {
  return (
    <div className="alert alert-error">
      <div className="alert-content">
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
      {onClose ? (
        <button className="alert-close" onClick={onClose}>
          ✕
        </button>
      ) : null}
    </div>
  )
}

export default ErrorAlert
export function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-content">
        <div className="spinner-animation"></div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
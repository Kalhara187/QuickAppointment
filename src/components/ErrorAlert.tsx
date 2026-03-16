import React from 'react'

interface ErrorAlertProps {
  title?: string
  message: string
  onClose?: () => void
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Error',
  message,
  onClose,
}) => {
  return (
    <div className="alert alert-error">
      <div className="alert-content">
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  )
}

export default ErrorAlert

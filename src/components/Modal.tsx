import React from 'react'

interface ModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>
  )
}

export default Modal

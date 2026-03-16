import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  ...props
}) => {
  const baseClass = `btn btn-${variant} btn-${size}`
  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button

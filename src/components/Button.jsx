export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  ...props
}) {
  const baseClass = `btn btn-${variant} btn-${size}`

  return (
    <button className={`${baseClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export default Button
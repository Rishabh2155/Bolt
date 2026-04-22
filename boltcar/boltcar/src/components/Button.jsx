import { Link } from 'react-router-dom'

const Button = ({ 
  children, 
  variant = 'primary', 
  href, 
  onClick, 
  className = '',
  disabled = false 
}) => {
  const baseClasses = `px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`
  
  const variantClasses = {
    primary: 'bg-electric-blue text-white hover:bg-blue-600',
    outline: 'border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link to={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button

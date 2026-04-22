import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const Navbar = () => {
  const { language, changeLanguage, t } = useLanguage()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
            <span className="text-electric-blue">⚡</span>
            <span>BoltCars.pt</span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-electric-blue' : 'text-gray-700 hover:text-electric-blue'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/inventory"
              className={`font-medium transition-colors ${
                isActive('/inventory') ? 'text-electric-blue' : 'text-gray-700 hover:text-electric-blue'
              }`}
            >
              {t('nav.inventory')}
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-electric-blue' : 'text-gray-700 hover:text-electric-blue'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-electric-blue' : 'text-gray-700 hover:text-electric-blue'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Language Switch */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                language === 'en'
                  ? 'bg-electric-blue text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('pt')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                language === 'pt'
                  ? 'bg-electric-blue text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              PT
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-electric-blue p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/') ? 'text-electric-blue bg-gray-50' : 'text-gray-700 hover:text-electric-blue hover:bg-gray-50'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/inventory"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/inventory') ? 'text-electric-blue bg-gray-50' : 'text-gray-700 hover:text-electric-blue hover:bg-gray-50'
              }`}
            >
              {t('nav.inventory')}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/about') ? 'text-electric-blue bg-gray-50' : 'text-gray-700 hover:text-electric-blue hover:bg-gray-50'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/contact') ? 'text-electric-blue bg-gray-50' : 'text-gray-700 hover:text-electric-blue hover:bg-gray-50'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

import React, { createContext, useContext, useState, useEffect } from 'react'

// Import translations
import enTranslations from '../locales/en.json'
import ptTranslations from '../locales/pt.json'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'en'
  })

  const translations = {
    en: enTranslations,
    pt: ptTranslations
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language
  }, [language])

  const value = {
    language,
    changeLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext

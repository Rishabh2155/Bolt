import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const SearchBar = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  
  const [searchData, setSearchData] = useState({
    brand: '',
    model: '',
    registrationYear: ''
  })

  const carBrands = [
    'Tesla', 'Ford', 'Audi', 'Rivian', 'Lucid', 'Porsche', 
    'BMW', 'Mercedes', 'Nissan', 'Chevrolet', 'Hyundai', 'Kia',
    'Volkswagen', 'Jaguar', 'Volvo'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i)

  const handleSearch = (e) => {
    e.preventDefault()
    
    const queryParams = new URLSearchParams()
    if (searchData.brand) queryParams.append('brand', searchData.brand)
    if (searchData.model) queryParams.append('model', searchData.model)
    if (searchData.registrationYear) queryParams.append('year', searchData.registrationYear)
    
    const queryString = queryParams.toString()
    navigate(`/inventory${queryString ? '?' + queryString : ''}`)
  }

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <select
              value={searchData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            >
              <option value="">Select Brand</option>
              {carBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Model Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <input
              type="text"
              value={searchData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="Enter model name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            />
          </div>

          {/* Registration Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Year
            </label>
            <select
              value={searchData.registrationYear}
              onChange={(e) => handleInputChange('registrationYear', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-electric-blue text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-lg"
        >
          Search Cars
        </button>
      </form>
    </div>
  )
}

export default SearchBar

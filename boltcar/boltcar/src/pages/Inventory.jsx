import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarCard from '../components/CarCard'
import FilterSidebar from '../components/FilterSidebar'
import Button from '../components/Button'
import { useLanguage } from '../contexts/LanguageContext'

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const Inventory = () => {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const carsPerPage = 6

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/cars`)
        const result = await response.json()
        
        if (result.success) {
          setCars(result.data)
          setFilteredCars(result.data)
        } else {
          console.error('Failed to fetch cars:', result.message)
        }
      } catch (error) {
        console.error('Error fetching cars:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  // Apply URL search parameters on component mount and when they change
  useEffect(() => {
    const brand = searchParams.get('brand')
    const model = searchParams.get('model')
    const year = searchParams.get('year')

    if (brand || model || year) {
      let filtered = [...cars]

      // Filter by brand
      if (brand) {
        filtered = filtered.filter(car => 
          car.brand.toLowerCase() === brand.toLowerCase()
        )
      }

      // Filter by model
      if (model) {
        filtered = filtered.filter(car => 
          car.model.toLowerCase().includes(model.toLowerCase())
        )
      }

      // Filter by registration year (extracted from title)
      if (year) {
        filtered = filtered.filter(car => 
          car.title.includes(year)
        )
      }

      setFilteredCars(filtered)
      setCurrentPage(1)
    } else {
      setFilteredCars(cars)
    }
  }, [searchParams, cars])

  const handleFilterChange = (filters) => {
    let filtered = [...cars]

    // Filter by listing type
    if (filters.listingType) {
      filtered = filtered.filter(car => 
        filters.listingType === 'owner' 
          ? car.tags.includes('Sold by Owner')
          : !car.tags.includes('Sold by Owner')
      )
    }

    // Filter by brands
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(car => 
        filters.brands.some(brand => 
          car.brand.toLowerCase() === brand.toLowerCase()
        )
      )
    }

    // Filter by max budget
    if (filters.maxBudget) {
      filtered = filtered.filter(car => car.priceValue <= filters.maxBudget)
    }

    // Filter by models
    if (filters.models && filters.models.length > 0) {
      filtered = filtered.filter(car => 
        filters.models.some(model => 
          car.model.toLowerCase().includes(model.toLowerCase())
        )
      )
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(car => 
        car.priceValue >= filters.priceRange[0] && 
        car.priceValue <= filters.priceRange[1]
      )
    }

    // Filter by battery health
    if (filters.batteryHealth) {
      if (filters.batteryHealth === '95+') {
        filtered = filtered.filter(car => parseInt(car.batteryHealth) >= 95)
      } else if (filters.batteryHealth === '90-95') {
        filtered = filtered.filter(car => {
          const health = parseInt(car.batteryHealth)
          return health >= 90 && health < 95
        })
      }
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(car => car.category === filters.category)
    }

    setFilteredCars(filtered)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredCars.length / carsPerPage)
  const startIndex = (currentPage - 1) * carsPerPage
  const displayedCars = filteredCars.slice(startIndex, startIndex + carsPerPage)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('inventory.title')}</h1>
          <p className="text-gray-600 mt-1">{filteredCars.length} {t('inventory.vehiclesAvailable')}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isFilterOpen ? 'Close Filters' : 'Filters'}
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue">
            <option>{t('inventory.sortBy')}</option>
            <option>{t('inventory.priceLowHigh')}</option>
            <option>{t('inventory.priceHighLow')}</option>
            <option>{t('inventory.mileageLowHigh')}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block lg:w-80 lg:flex-shrink-0`}>
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Right Content - Car Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {displayedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    currentPage === index + 1
                      ? 'bg-electric-blue text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Sell Card */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white rounded-xl shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-sm card-hover z-40">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{t('inventory.sellYourVehicle')}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-4">{t('inventory.sellDescription')}</p>
        <a 
          href="https://wa.me/351920651254" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button variant="primary" className="w-full text-sm">
            {t('inventory.getStarted')}
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Inventory

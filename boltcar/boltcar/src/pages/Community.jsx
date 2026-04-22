import { useState } from 'react'
import CarCard from '../components/CarCard'

// Sample community car data
const communityCars = [
  {
    id: 7,
    title: '2021 Tesla Model Y Performance',
    price: '$52,000',
    location: 'Portland, OR • 18,500 miles',
    range: '303 mi',
    battery: '95%',
    performance: '0-60: 3.5s',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Sold by Owner', 'Single Owner'],
    category: 'suv',
    batteryHealth: '95',
    priceValue: 52000
  },
  {
    id: 8,
    title: '2022 Polestar 2',
    price: '$45,999',
    location: 'Denver, CO • 12,300 miles',
    range: '270 mi',
    battery: '97%',
    performance: '408 HP',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Sold by Owner', 'Excellent Condition'],
    category: 'sedan',
    batteryHealth: '97',
    priceValue: 45999
  },
  {
    id: 9,
    title: '2021 Rivian R1S',
    price: '$78,500',
    location: 'Phoenix, AZ • 9,200 miles',
    range: '316 mi',
    battery: '96%',
    performance: '835 HP',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Sold by Owner', 'Family Used'],
    category: 'suv',
    batteryHealth: '96',
    priceValue: 78500
  },
  {
    id: 10,
    title: '2020 Hyundai Kona Electric',
    price: '$28,500',
    location: 'Chicago, IL • 25,800 miles',
    range: '258 mi',
    battery: '92%',
    performance: '201 HP',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Sold by Owner', 'Great Value'],
    category: 'suv',
    batteryHealth: '92',
    priceValue: 28500
  },
  {
    id: 11,
    title: '2022 Kia EV6 GT-Line',
    price: '$48,000',
    location: 'Atlanta, GA • 7,100 miles',
    range: '310 mi',
    battery: '98%',
    performance: '0-60: 3.4s',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Sold by Owner', 'Like New'],
    category: 'suv',
    batteryHealth: '98',
    priceValue: 48000
  },
  {
    id: 12,
    title: '2021 Chevrolet Bolt EUV',
    price: '$26,999',
    location: 'Boston, MA • 15,600 miles',
    range: '247 mi',
    battery: '91%',
    performance: '200 HP',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Sold by Owner', 'Commuter Special'],
    category: 'suv',
    batteryHealth: '91',
    priceValue: 26999
  }
]

const Community = () => {
  const [listingType, setListingType] = useState('owner')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [budget, setBudget] = useState('any')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('latest')

  const brands = ['Tesla', 'Rivian', 'Lucid', 'Polestar', 'Hyundai', 'Kia', 'Chevrolet', 'Ford', 'Audi', 'Porsche']

  const filteredCars = communityCars.filter(car => {
    if (listingType === 'owner' && !car.tags.includes('Sold by Owner')) return false
    if (listingType === 'dealer' && car.tags.includes('Sold by Owner')) return false
    if (selectedBrand && !car.title.toLowerCase().includes(selectedBrand.toLowerCase())) return false
    if (budget === 'under50k' && car.priceValue >= 50000) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Listings</h1>
            <p className="text-gray-600 mt-1">Premium EVs sold directly by owners</p>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            Certified Sustainable Inventory
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-electric-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-electric-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
          >
            <option value="latest">Latest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="mileage">Lowest Mileage</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Sidebar - Filters */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
            
            {/* Listing Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Listing Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="listingType"
                    value="owner"
                    checked={listingType === 'owner'}
                    onChange={(e) => setListingType(e.target.value)}
                    className="w-4 h-4 text-electric-blue focus:ring-electric-blue"
                  />
                  <span className="text-sm text-gray-700">Sold by Owner</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="listingType"
                    value="dealer"
                    checked={listingType === 'dealer'}
                    onChange={(e) => setListingType(e.target.value)}
                    className="w-4 h-4 text-electric-blue focus:ring-electric-blue"
                  />
                  <span className="text-sm text-gray-700">Dealer Inventory</span>
                </label>
              </div>
            </div>

            {/* Brand */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Budget
              </label>
              <div className="space-y-2">
                {[
                  { value: 'any', label: 'Any' },
                  { value: 'under50k', label: 'Under $50k' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value={option.value}
                      checked={budget === option.value}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-4 h-4 text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Model Chips */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Popular Models
              </label>
              <div className="flex flex-wrap gap-2">
                {['Model 3', 'Model Y', 'R1T', 'R1S', 'EV6', 'Bolt EUV'].map(model => (
                  <button
                    key={model}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-electric-blue hover:text-white transition-colors"
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Listings Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredCars.length} vehicles
          </div>
          
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCars.map((car) => (
              <CarCard 
                key={car.id} 
                car={car} 
                variant="community"
                showWishlist={false}
              />
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Community

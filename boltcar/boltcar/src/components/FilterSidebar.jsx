import { useState } from 'react'

const FilterSidebar = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([30000, 150000])
  const [batteryHealth, setBatteryHealth] = useState('')
  const [category, setCategory] = useState('')
  
  // New filter states
  const [listingType, setListingType] = useState('owner')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [maxBudget, setMaxBudget] = useState(null)
  const [selectedModels, setSelectedModels] = useState([])

  const brands = ['All Brands', 'Tesla', 'Rivian', 'Lucid', 'Polestar']
  const models = ['Model S', 'R1T', 'Air', 'Taycan']

  const handlePriceChange = (value, index) => {
    const newRange = [...priceRange]
    newRange[index] = value
    setPriceRange(newRange)
    onFilterChange({ priceRange: newRange })
  }

  const handleListingTypeChange = (type) => {
    setListingType(type)
    onFilterChange({ listingType: type })
  }

  const handleBrandToggle = (brand) => {
    if (brand === 'All Brands') {
      setSelectedBrands([])
      onFilterChange({ brands: [] })
      return
    }

    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand]
    
    setSelectedBrands(newBrands)
    onFilterChange({ brands: newBrands })
  }

  const handleMaxBudgetChange = (budget) => {
    setMaxBudget(budget)
    onFilterChange({ maxBudget: budget })
  }

  const handleModelToggle = (model) => {
    const newModels = selectedModels.includes(model)
      ? selectedModels.filter(m => m !== model)
      : [...selectedModels, model]
    
    setSelectedModels(newModels)
    onFilterChange({ models: newModels })
  }

  const handleReset = () => {
    setPriceRange([30000, 150000])
    setBatteryHealth('')
    setCategory('')
    setListingType('owner')
    setSelectedBrands([])
    setMaxBudget(null)
    setSelectedModels([])
    
    onFilterChange({
      priceRange: [30000, 150000],
      batteryHealth: '',
      category: '',
      listingType: 'owner',
      brands: [],
      maxBudget: null,
      models: []
    })
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Refine Gallery</h3>
        <button
          onClick={handleReset}
          className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          Reset
        </button>
      </div>
      
      {/* LISTING TYPE */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
          LISTING TYPE
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleListingTypeChange('owner')}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all ${
              listingType === 'owner'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sold by Owner
          </button>
          <button
            onClick={() => handleListingTypeChange('dealer')}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all ${
              listingType === 'dealer'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dealer Inventory
          </button>
        </div>
      </div>

      {/* BRAND FILTER */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
          BRAND
        </label>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandToggle(brand)}
              className={`py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all ${
                (brand === 'All Brands' && selectedBrands.length === 0) || selectedBrands.includes(brand)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* MAX BUDGET */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
          MAX BUDGET
        </label>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          <button
            onClick={() => handleMaxBudgetChange(null)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              maxBudget === null
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Any
          </button>
          <button
            onClick={() => handleMaxBudgetChange(50000)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              maxBudget === 50000
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Under $50k
          </button>
        </div>
      </div>

      {/* MODEL FILTER */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          MODEL
        </label>
        <div className="flex flex-wrap gap-2">
          {models.map((model) => (
            <button
              key={model}
              onClick={() => handleModelToggle(model)}
              className={`py-1 px-3 rounded-full text-xs font-medium transition-all ${
                selectedModels.includes(model)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Price Range
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">$</span>
            <input
              type="range"
              min="30000"
              max="150000"
              step="5000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value), 0)}
              className="flex-1"
            />
            <span className="text-sm font-medium text-gray-900 w-20">
              ${(priceRange[0] / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">to</span>
            <input
              type="range"
              min="30000"
              max="150000"
              step="5000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value), 1)}
              className="flex-1"
            />
            <span className="text-sm font-medium text-gray-900 w-20">
              {priceRange[1] >= 150000 ? '$150k+' : `$${(priceRange[1] / 1000).toFixed(0)}k`}
            </span>
          </div>
        </div>
      </div>

      {/* Battery Health */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Battery Health
        </label>
        <div className="space-y-2">
          {[
            { value: '95+', label: '95%+' },
            { value: '90-95', label: '90–95%' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="battery"
                value={option.value}
                checked={batteryHealth === option.value}
                onChange={(e) => {
                  setBatteryHealth(e.target.value)
                  onFilterChange({ batteryHealth: e.target.value })
                }}
                className="w-4 h-4 text-electric-blue focus:ring-electric-blue"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Category
        </label>
        <div className="space-y-2">
          {[
            { value: 'sedan', label: 'Sedan' },
            { value: 'suv', label: 'SUV' },
            { value: 'truck', label: 'Truck' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={option.value}
                checked={category === option.value}
                onChange={(e) => {
                  setCategory(e.target.value)
                  onFilterChange({ category: e.target.value })
                }}
                className="w-4 h-4 text-electric-blue focus:ring-electric-blue"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setPriceRange([30000, 150000])
          setBatteryHealth('')
          setCategory('')
          onFilterChange({ priceRange: [30000, 150000], batteryHealth: '', category: '' })
        }}
        className="w-full py-2 text-electric-blue border border-electric-blue rounded-lg hover:bg-electric-blue hover:text-white transition-colors"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FilterSidebar

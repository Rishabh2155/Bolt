import { useState } from 'react'
import { Link } from 'react-router-dom'

const CarCard = ({ car, variant = 'default' }) => {

  return (
    <Link 
      to={`/car/${car.id}`}
      className={`block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
        variant === 'community' ? 'border border-gray-100' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative">
        <img 
          src={car.image} 
          alt={car.title}
          className="w-full h-48 object-cover"
        />
        
      </div>

      {/* Car Info */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{car.title}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-electric-blue">{car.price}</span>
          <span className="text-sm text-gray-500">{car.location}</span>
        </div>

        {/* Specs Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{car.range}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{car.battery}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>{car.performance}</span>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default CarCard

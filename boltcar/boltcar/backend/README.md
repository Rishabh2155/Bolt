# BoltCar Backend API

A RESTful API backend for the BoltCar electric vehicle inventory management system.

## Features

- **Car Inventory Management**: CRUD operations for car listings
- **Advanced Search**: Filter by brand, model, price, category, and more
- **RESTful Design**: Clean API endpoints following REST principles
- **Error Handling**: Comprehensive error handling and validation
- **Rate Limiting**: Protection against abuse
- **Security**: Helmet.js for security headers, CORS enabled

## API Endpoints

### Cars
- `GET /api/cars` - Get all cars with optional filtering
- `GET /api/cars/:id` - Get single car by ID
- `POST /api/cars` - Create new car listing

### Search
- `GET /api/search` - Advanced search with multiple filters

### Utilities
- `GET /api/brands` - Get available car brands
- `GET /api/health` - Health check endpoint

## Query Parameters

### GET /api/cars
- `brand` - Filter by car brand
- `model` - Filter by car model (partial match)
- `year` - Filter by registration year
- `listingType` - Filter by listing type ('owner' or 'dealer')
- `maxBudget` - Maximum price filter
- `category` - Filter by car category ('sedan', 'suv', 'truck')
- `batteryHealth` - Filter by battery health ('95+', '90-95')
- `priceRange` - Filter by price range (format: 'min-max')

### GET /api/search
- `q` - General search query (searches title, brand, model, tags)
- `brand` - Filter by brand
- `model` - Filter by model
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `category` - Filter by category
- `listingType` - Filter by listing type

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Response Format

All responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 6
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Sample Data Structure

Each car object follows this structure:
```json
{
  "id": 1,
  "title": "2021 Tesla Model 3 Long Range",
  "price": "$42,999",
  "location": "San Francisco, CA \u2022 15,234 miles",
  "range": "358 mi",
  "battery": "92%",
  "performance": "0-60: 3.1s",
  "image": "https://...",
  "tags": ["Certified Pre-Owned", "Sold by Owner"],
  "category": "sedan",
  "batteryHealth": "92",
  "priceValue": 42999,
  "brand": "Tesla",
  "model": "Model 3",
  "listingType": "owner"
}
```

## Frontend Integration

This API is designed to work seamlessly with the existing BoltCar frontend without any modifications needed. The endpoints match exactly what the frontend expects:

- Search bar queries: `/api/cars?brand=Tesla&model=Model%203&year=2021`
- Inventory filtering: `/api/cars?listingType=owner&maxBudget=50000`
- Advanced search: `/api/search?q=Tesla&category=sedan`

## Security Features

- Rate limiting (100 requests per 15 minutes per IP)
- Security headers with Helmet.js
- CORS configuration
- Input validation and sanitization
- Error handling without exposing sensitive information

## Development

The server runs on port 5000 by default. You can change this by setting the `PORT` environment variable.

Health check endpoint: `http://localhost:5000/api/health`

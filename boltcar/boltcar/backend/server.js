const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const Car = require('./models/Car');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['https://boltcar-frontend.onrender.com', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);


// Routes
// GET /api/cars - Get all cars with optional filtering
app.get('/api/cars', async (req, res) => {
  try {
    const { brand, model, year, listingType, maxBudget, category, batteryHealth, priceRange } = req.query;
    
    // Build MongoDB query
    let query = { isAvailable: true };
    
    // Filter by brand
    if (brand) {
      query.brand = new RegExp(brand, 'i');
    }
    
    // Filter by model
    if (model) {
      query.model = new RegExp(model, 'i');
    }
    
    // Filter by registration year
    if (year) {
      query.year = parseInt(year);
    }
    
    // Filter by listing type
    if (listingType) {
      query.listingType = listingType;
    }
    
    // Filter by max budget
    if (maxBudget) {
      query.priceValue = { $lte: parseInt(maxBudget) };
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by battery health
    if (batteryHealth) {
      if (batteryHealth === '95+') {
        query.batteryHealth = { $gte: '95' };
      } else if (batteryHealth === '90-95') {
        query.batteryHealth = { $gte: '90', $lt: '95' };
      }
    }
    
    // Filter by price range
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(p => parseInt(p.replace('$', '').replace(',', '')));
      query.priceValue = { $gte: minPrice, $lte: maxPrice };
    }
    
    const cars = await Car.find(query).sort({ createdAt: -1 });
    
    // Transform data to match frontend format
    const transformedCars = cars.map(car => ({
      id: car._id,
      title: car.title,
      price: car.price,
      location: car.location,
      range: car.range,
      battery: car.battery,
      performance: car.performance,
      image: car.image,
      tags: car.tags,
      category: car.category,
      batteryHealth: car.batteryHealth,
      priceValue: car.priceValue,
      brand: car.brand,
      model: car.model,
      listingType: car.listingType
    }));
    
    res.json({
      success: true,
      data: transformedCars,
      count: transformedCars.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cars',
      error: error.message
    });
  }
});

// GET /api/cars/:id - Get single car by ID
app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    // Transform data to match frontend format
    const transformedCar = {
      id: car._id,
      title: car.title,
      price: car.price,
      location: car.location,
      range: car.range,
      battery: car.battery,
      performance: car.performance,
      image: car.image,
      tags: car.tags,
      category: car.category,
      batteryHealth: car.batteryHealth,
      priceValue: car.priceValue,
      brand: car.brand,
      model: car.model,
      listingType: car.listingType
    };
    
    res.json({
      success: true,
      data: transformedCar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching car',
      error: error.message
    });
  }
});

// GET /api/brands - Get available car brands
app.get('/api/brands', async (req, res) => {
  try {
    const brands = await Car.distinct('brand');
    res.json({
      success: true,
      data: brands.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching brands',
      error: error.message
    });
  }
});

// GET /api/search - Advanced search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const { q, brand, model, minPrice, maxPrice, category, listingType } = req.query;
    
    // Build MongoDB query
    let query = { isAvailable: true };
    
    // Text search across multiple fields
    if (q) {
      query.$text = { $search: q };
    }
    
    // Apply other filters
    if (brand) {
      query.brand = new RegExp(brand, 'i');
    }
    
    if (model) {
      query.model = new RegExp(model, 'i');
    }
    
    if (minPrice) {
      query.priceValue = { $gte: parseInt(minPrice) };
    }
    
    if (maxPrice) {
      query.priceValue = { ...query.priceValue, $lte: parseInt(maxPrice) };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (listingType) {
      query.listingType = listingType;
    }
    
    const cars = await Car.find(query).sort({ score: { $meta: 'textScore' }, createdAt: -1 });
    
    // Transform data to match frontend format
    const transformedCars = cars.map(car => ({
      id: car._id,
      title: car.title,
      price: car.price,
      location: car.location,
      range: car.range,
      battery: car.battery,
      performance: car.performance,
      image: car.image,
      tags: car.tags,
      category: car.category,
      batteryHealth: car.batteryHealth,
      priceValue: car.priceValue,
      brand: car.brand,
      model: car.model,
      listingType: car.listingType
    }));
    
    res.json({
      success: true,
      data: transformedCars,
      count: transformedCars.length,
      query: req.query
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while searching',
      error: error.message
    });
  }
});

// POST /api/cars - Add new car listing (for future use)
app.post('/api/cars', async (req, res) => {
  try {
    const newCar = req.body;
    
    // Validate required fields
    const requiredFields = ['title', 'price', 'location', 'range', 'battery', 'performance', 'brand', 'model'];
    const missingFields = requiredFields.filter(field => !newCar[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      });
    }
    
    // Create new car document
    const car = new Car({
      ...newCar,
      year: newCar.year || new Date().getFullYear(),
      mileage: newCar.mileage || 0,
      isAvailable: true
    });
    
    const savedCar = await car.save();
    
    // Transform data to match frontend format
    const transformedCar = {
      id: savedCar._id,
      title: savedCar.title,
      price: savedCar.price,
      location: savedCar.location,
      range: savedCar.range,
      battery: savedCar.battery,
      performance: savedCar.performance,
      image: savedCar.image,
      tags: savedCar.tags,
      category: savedCar.category,
      batteryHealth: savedCar.batteryHealth,
      priceValue: savedCar.priceValue,
      brand: savedCar.brand,
      model: savedCar.model,
      listingType: savedCar.listingType
    };
    
    res.status(201).json({
      success: true,
      message: 'Car listing created successfully',
      data: transformedCar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating car listing',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BoltCar API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\ud83d\ude97 BoltCar API Server running on port ${PORT}`);
  console.log(`\ud83d\udd0d Health check: http://localhost:${PORT}/api/health`);
  console.log(`\ud83d\udce6 Cars endpoint: http://localhost:${PORT}/api/cars`);
  console.log(`\ud83d\udd0d Search endpoint: http://localhost:${PORT}/api/search`);
});

module.exports = app;

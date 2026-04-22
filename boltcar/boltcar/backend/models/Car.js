const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  priceValue: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  range: {
    type: String,
    required: true
  },
  battery: {
    type: String,
    required: true
  },
  batteryHealth: {
    type: String,
    required: true
  },
  performance: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['sedan', 'suv', 'truck', 'coupe', 'hatchback']
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  listingType: {
    type: String,
    required: true,
    enum: ['owner', 'dealer']
  },
  year: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  features: [{
    type: String,
    default: []
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
carSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better search performance
carSchema.index({ brand: 1, model: 1 });
carSchema.index({ category: 1 });
carSchema.index({ listingType: 1 });
carSchema.index({ priceValue: 1 });
carSchema.index({ batteryHealth: 1 });
carSchema.index({ title: 'text', brand: 'text', model: 'text', tags: 'text' });

module.exports = mongoose.model('Car', carSchema);

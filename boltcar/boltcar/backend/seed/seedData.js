const mongoose = require('mongoose');
const Car = require('../models/Car');

// Sample car data matching frontend structure
const sampleCars = [
  {
    title: '2021 Tesla Model 3 Long Range',
    price: '$42,999',
    location: 'San Francisco, CA \u2022 15,234 miles',
    range: '358 mi',
    battery: '92%',
    performance: '0-60: 3.1s',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Certified Pre-Owned', 'Sold by Owner'],
    category: 'sedan',
    batteryHealth: '92',
    priceValue: 42999,
    brand: 'Tesla',
    model: 'Model 3',
    listingType: 'owner',
    year: 2021,
    mileage: 15234,
    description: 'Excellent condition Tesla Model 3 Long Range with full autopilot capabilities.',
    features: ['Autopilot', 'Full Self-Driving', 'Premium Interior', '19" Wheels']
  },
  {
    title: '2022 Ford Mustang Mach-E Premium',
    price: '$48,500',
    location: 'Austin, TX \u2022 8,765 miles',
    range: '270 mi',
    battery: '96%',
    performance: '346 HP',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Low Mileage'],
    category: 'suv',
    batteryHealth: '96',
    priceValue: 48500,
    brand: 'Ford',
    model: 'Mustang Mach-E',
    listingType: 'dealer',
    year: 2022,
    mileage: 8765,
    description: 'Like new Mustang Mach-E Premium with extended range battery.',
    features: ['Extended Range', 'Premium Audio', 'Panoramic Roof', 'All-Wheel Drive']
  },
  {
    title: '2020 Audi e-tron Sportback',
    price: '$65,000',
    location: 'Miami, FL \u2022 22,100 miles',
    range: '218 mi',
    battery: '91%',
    performance: '402 HP',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Luxury', 'Sold by Owner'],
    category: 'suv',
    batteryHealth: '91',
    priceValue: 65000,
    brand: 'Audi',
    model: 'e-tron',
    listingType: 'owner',
    year: 2020,
    mileage: 22100,
    description: 'Luxury Audi e-tron Sportback in pristine condition with full warranty.',
    features: ['Virtual Cockpit', 'Bang & Olufsen Sound', 'Air Suspension', 'Matrix LED']
  },
  {
    title: '2021 Rivian R1T Launch Edition',
    price: '$73,000',
    location: 'Seattle, WA \u2022 12,500 miles',
    range: '314 mi',
    battery: '94%',
    performance: '835 HP',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Adventure Ready', 'Sold by Owner'],
    category: 'truck',
    batteryHealth: '94',
    priceValue: 73000,
    brand: 'Rivian',
    model: 'R1T',
    listingType: 'owner',
    year: 2021,
    mileage: 12500,
    description: 'Launch Edition Rivian R1T with all adventure packages and camping gear.',
    features: ['Adventure Package', 'Camp Kitchen', 'Gear Guard', 'Off-Road Upgrade']
  },
  {
    title: '2022 Lucid Air Dream',
    price: '$89,999',
    location: 'Los Angeles, CA \u2022 5,200 miles',
    range: '516 mi',
    battery: '98%',
    performance: '0-60: 2.5s',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Ultra Range'],
    category: 'sedan',
    batteryHealth: '98',
    priceValue: 89999,
    brand: 'Lucid',
    model: 'Air',
    listingType: 'dealer',
    year: 2022,
    mileage: 5200,
    description: 'Ultra-range Lucid Air Dream Edition with unprecedented 516-mile range.',
    features: ['Dream Edition', 'Ultra Range', 'Executive Package', '21" Wheels']
  },
  {
    title: '2021 Porsche Taycan 4S',
    price: '$95,000',
    location: 'New York, NY \u2022 9,800 miles',
    range: '227 mi',
    battery: '93%',
    performance: '0-60: 3.8s',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    tags: ['Performance', 'Sold by Owner'],
    category: 'sedan',
    batteryHealth: '93',
    priceValue: 95000,
    brand: 'Porsche',
    model: 'Taycan',
    listingType: 'owner',
    year: 2021,
    mileage: 9800,
    description: 'High-performance Porsche Taycan 4S with sport chrono package.',
    features: ['Sport Chrono', 'Adaptive Suspension', 'Premium Audio', 'Leather Interior']
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      'mongodb+srv://rishabh2155be22_db_user:IhrDhNsbeNkfhoRX@cluster0.vy1drz6.mongodb.net/?appName=Cluster0',
      {
        dbName: 'boltcar',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('\ud83d\udd0d Connected to MongoDB Atlas');

    // Clear existing cars
    await Car.deleteMany({});
    console.log('\ud83d\uddd1\ufe0f Cleared existing cars');

    // Insert sample cars
    const insertedCars = await Car.insertMany(sampleCars);
    console.log(`\ud83d\ude97 Inserted ${insertedCars.length} sample cars`);

    // Display inserted cars
    console.log('\n\ud83d\udccb Inserted Cars:');
    insertedCars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.title} - ${car.price} (${car.brand} ${car.model})`);
    });

    console.log('\n\u2705 Database seeded successfully!');
    
  } catch (error) {
    console.error('\u274c Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\ud83d\udd0c Disconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase();

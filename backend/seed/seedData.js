const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

const seedData = async () => {
  let connection = null;
  try {
    // Connect to MongoDB
    connection = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/miraesta');
    console.log('MongoDB connected for seeding');
    
    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Seed categories
    const categories = [
      { name: 'New In', image: '/images/w1.png', description: 'Latest arrivals' },
      { name: 'Jackets', image: '/images/j10.png', description: 'Outerwear collection' },
      { name: 'Sweatshirts', image: '/images/M2.png', description: 'Comfortable sweatshirts' },
      { name: 'Tops', image: '/images/M10.png', description: 'T-shirts and tops' },
      { name: 'Bottoms', image: '/images/M6.png', description: 'Pants and shorts' },
      { name: "Women's Edit", image: '/images/w3.png', description: "Women's special collection" }
    ];
    
    const createdCategories = await Category.insertMany(categories);
    console.log(`Seeded ${createdCategories.length} categories`);
    
    // Map category names to IDs for product seeding
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name.toLowerCase()] = cat.name;
    });
    
    // Seed products (using data from frontend)
    const products = [
      {
        brand: 'MIRAESTA',
        name: 'Urban Utility Bomber Jacket',
        price: 5499,
        image: '/images/j10.png',
        images: [
          '/images/j10.png',
          '/images/j10_1.png',
          '/images/j10_2.png',
          '/images/j10_3.png',
          '/images/j10_4.png'
        ],
        category: 'Jackets',
        description: 'Premium bomber jacket with utility details'
      },
      {
        brand: 'MIRAESTA',
        name: 'Classic Field Shearling Jacket',
        price: 6299,
        image: '/images/j11.png',
        images: [
          '/images/j11.png',
          '/images/j11_1.png',
          '/images/j11_2.png',
          '/images/j11_3.png',
          '/images/j11_4.png'
        ],
        category: 'Jackets',
        description: 'Classic shearling jacket for cold weather'
      },
      {
        brand: 'MIRAESTA',
        name: 'Geometric Block Panel Tee',
        price: 2699,
        image: '/images/black-panel-tee.jpg',
        images: ['/images/black-panel-tee.jpg', '/images/M2.png'],
        category: 'Tops',
        description: 'Geometric design panel t-shirt'
      },
      {
        brand: 'MIRAESTA',
        name: 'Ocean Wave Graphic Tee',
        price: 2499,
        image: '/images/blue-street-tee.jpg',
        images: ['/images/blue-street-tee.jpg', '/images/M10.png'],
        category: 'Tops',
        description: 'Ocean wave graphic t-shirt'
      },
      {
        brand: 'MIRAESTA',
        name: 'Cropped Editorial Knit Vest',
        price: 2899,
        image: '/images/w1.png',
        images: ['/images/w1.png', '/images/w2.png'],
        category: 'Tops',
        description: 'Cropped knit vest for layering'
      },
      {
        brand: 'MIRAESTA',
        name: 'Off-White Cargo Pant Set',
        price: 4999,
        image: '/images/M6.png',
        images: ['/images/M6.png', '/images/M7.png'],
        category: 'Bottoms',
        description: 'Off-white cargo pants set'
      },
      {
        brand: 'MIRAESTA',
        name: 'Zip-Up Tactical Windbreaker',
        price: 5799,
        image: '/images/j8.png',
        images: [
          '/images/j8.png',
          '/images/j8_1.png',
          '/images/j8_2.png',
          '/images/j8_3.png',
          '/images/j8_4.png'
        ],
        category: 'Jackets',
        description: 'Tactical style zip-up windbreaker'
      },
      {
        brand: 'MIRAESTA',
        name: 'Heritage Canvas Workwear Jacket',
        price: 6499,
        image: '/images/j9.png',
        images: [
          '/images/j9.png',
          '/images/j9_1.png',
          '/images/j9_2.png',
          '/images/j9_3.png',
          '/images/j9_4.png'
        ],
        category: 'Jackets',
        description: 'Heritage canvas workwear jacket'
      },
      {
        brand: 'MIRAESTA',
        name: 'Lavender M Logo Street Tee',
        price: 2299,
        image: '/images/miraesta-5.jpg',
        images: ['/images/miraesta-5.jpg', '/images/honeycomb-tee.png'],
        category: 'Tops',
        description: 'Lavender t-shirt with M logo'
      },
      {
        brand: 'MIRAESTA',
        name: 'Neutral Minimalist Sweatshirt',
        price: 3299,
        image: '/images/M3.png',
        images: ['/images/M3.png', '/images/M4.png'],
        category: 'Sweatshirts',
        description: 'Neutral minimalist sweatshirt'
      },
      {
        brand: 'MIRAESTA',
        name: 'Urban Cargo Trousers',
        price: 3999,
        image: '/images/M5.png',
        images: ['/images/M5.png', '/images/M14.png'],
        category: 'Bottoms',
        description: 'Urban style cargo trousers'
      },
      {
        brand: 'MIRAESTA',
        name: 'Womens Utility Crop Shacket',
        price: 4299,
        image: '/images/w3.png',
        images: ['/images/w3.png', '/images/w2.png'],
        category: 'Jackets',
        description: "Women's utility crop shacket"
      }
    ];
    
    const createdProducts = await Product.insertMany(products);
    console.log(`Seeded ${createdProducts.length} products`);
    
    // Seed admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@miraesta.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Seeded admin user');
    
    // Seed regular user
    const regularUser = await User.create({
      name: 'Regular User',
      email: 'user@miraesta.com',
      password: 'user123',
      role: 'customer'
    });
    console.log('Seeded regular user');
    
    console.log('Database seeding completed successfully!');
    if (connection) {
      await mongoose.disconnect();
    }
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    if (connection) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};

// Call the seed function
seedData();
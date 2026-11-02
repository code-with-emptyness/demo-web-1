const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const User = require('./models/User');

const sampleProducts = [
  {
    name: 'Heavyweight Oversized Tee',
    description: 'Crafted from 280 GSM premium combed cotton with dropped shoulders and relaxed boxy silhouette. Pre-shrunk for zero deformation.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Off-White', 'Washed Olive'],
    stock: 50,
    featured: true
  },
  {
    name: 'Vintage Acid Wash Boxy Tee',
    description: 'Custom mineral acid-washed finish delivering an authentic vintage patina. 240 GSM breathable jersey fabric.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Faded Blue'],
    stock: 35,
    featured: true
  },
  {
    name: 'Cyberpunk Tokyo Graphic Tee',
    description: 'High-density screen print with futuristic cyberpunk typography and aesthetic neon iconography. Built to withstand 100+ washes.',
    price: 649,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    category: 'Graphic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Jet Black', 'Pure White'],
    stock: 40,
    featured: true
  },
  {
    name: 'Cropped Minimalist Tee',
    description: 'Slightly cropped raw-edge silhouette engineered from soft modal cotton blend for everyday luxury and effortless drape.',
    price: 449,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Sage', 'Black'],
    stock: 45,
    featured: true
  },
  {
    name: 'Architectural Monolith Tee',
    description: 'Subtle high-density micro-graphic along the spine. Reinforced ribbed crewneck with herringbone collar tape.',
    price: 549,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    category: 'Graphic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pitch Black'],
    stock: 30,
    featured: false
  },
  {
    name: 'Supima Cotton Essential Crew',
    description: '100% American Supima extra-long staple cotton. Incredible softness, luster, and superior color retention.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
    category: 'Premium',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Navy', 'Heather Grey'],
    stock: 60,
    featured: true
  },
  {
    name: 'Raw Hem Utility Tee',
    description: 'Relaxed drop-shoulder cut featuring distressed raw hems and garment-dyed textured slub cotton.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80',
    category: 'Plain',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Dusty Rose', 'Sand', 'Black'],
    stock: 25,
    featured: false
  },
  {
    name: 'French Terry Relaxed Top',
    description: 'Midweight French Terry knit with looped interior. Offers structured warmth with t-shirt breathability.',
    price: 749,
    image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&auto=format&fit=crop&q=80',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Oatmeal', 'Espresso'],
    stock: 20,
    featured: false
  }
];

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI is required to run the seed script.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected successfully.');

    // 1. Seed or verify Admin User
    let admin = await User.findOne({ email: 'admin@gmail.com' });
    if (!admin) {
      admin = new User({
        name: 'Administrator',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('Created default admin: admin@gmail.com / admin123');
    } else {
      console.log('Admin user already exists.');
    }

    // 2. Seed Products
    const count = await Product.countDocuments();
    const force = process.argv.includes('--force');

    if (count === 0 || force) {
      if (force) {
        await Product.deleteMany({});
        console.log('Cleared existing products (--force).');
      }
      await Product.insertMany(sampleProducts);
      console.log(`Successfully seeded ${sampleProducts.length} sample products!`);
    } else {
      console.log(`Database already contains ${count} products. Use --force to replace.`);
    }

    console.log('Database seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();

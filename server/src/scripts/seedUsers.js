const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const seedUsers = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not set in server/.env');
    process.exit(1);
  }

  if (uri.includes('<db_username>') || uri.includes('<db_password>')) {
    console.error('❌ Please replace <db_username> and <db_password> in server/.env with your real MongoDB Atlas credentials first!');
    process.exit(1);
  }

  console.log('🌱 Connecting to MongoDB Atlas...');
  try {
    const conn = await mongoose.connect(uri);
    console.log(`🌿 Connected to: ${conn.connection.host} [DB: ${conn.connection.name}]`);

    const usersToSeed = [
      {
        name: 'Florva Customer',
        email: 'customer@florva.com',
        password: 'Password123!',
        role: 'customer',
        phone: '+8801711000001',
        address: {
          street: 'House 42, Road 7, Banani',
          city: 'Dhaka',
          state: 'Dhaka',
          postalCode: '1213',
          country: 'Bangladesh'
        }
      },
      {
        name: 'Florva Master Gardener',
        email: 'gardener@florva.com',
        password: 'Password123!',
        role: 'gardener',
        phone: '+8801711000002',
        address: {
          street: 'Sector 10, Botanical Lane',
          city: 'Uttara, Dhaka',
          state: 'Dhaka',
          postalCode: '1230',
          country: 'Bangladesh'
        }
      },
      {
        name: 'Florva Administrator',
        email: 'admin@florva.com',
        password: 'Password123!',
        role: 'admin',
        phone: '+8801711000003',
        address: {
          street: 'Florva Operations Hub',
          city: 'Dhaka',
          state: 'Dhaka',
          postalCode: '1230',
          country: 'Bangladesh'
        }
      }
    ];

    console.log('🌱 Checking / Seeding default users...');

    for (const u of usersToSeed) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        await User.create(u);
        console.log(`  ✅ Created user: ${u.email} (${u.role})`);
      } else {
        console.log(`  ℹ️ User already exists: ${u.email} (${existing.role})`);
      }
    }

    const totalUsers = await User.countDocuments();
    console.log(`🎉 Seeding complete! Total users in database: ${totalUsers}`);
    await mongoose.disconnect();
    console.log('🌿 Disconnected from MongoDB cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedUsers();

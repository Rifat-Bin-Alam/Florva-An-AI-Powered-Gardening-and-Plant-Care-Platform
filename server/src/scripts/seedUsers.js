const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Controlled User Seeding Script — Florva V2
 * Safely provisions the initial Administrator account, along with standard
 * demonstration Gardener and Customer accounts.
 */
const seedUsers = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/florva';

  console.log('🌿 Connecting to MongoDB for user provisioning...');
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`🌿 Connected to database: ${conn.connection.name}`);

    const seedAccounts = [
      {
        name: 'Florva Administrator',
        email: 'admin@florva.com',
        password: 'Password123!',
        role: 'admin',
        phone: '+880 1700-000001',
        address: {
          street: 'Florva Central Operations, House 10, Road 1',
          city: 'Dhaka',
          state: 'Dhaka',
          postalCode: '1230',
          country: 'Bangladesh'
        }
      },
      {
        name: 'Md. Rafiqul Islam (Gardener)',
        email: 'gardener@florva.com',
        password: 'Password123!',
        role: 'gardener',
        phone: '+880 1812-998877',
        specialty: 'Head Horticulturist & Urban Garden Specialist',
        address: {
          street: 'Sector 10, Botanical Lane',
          city: 'Uttara, Dhaka',
          state: 'Dhaka',
          postalCode: '1230',
          country: 'Bangladesh'
        }
      },
      {
        name: 'Rifat Bin Alam (Customer)',
        email: 'customer@florva.com',
        password: 'Password123!',
        role: 'customer',
        phone: '+880 1711-223344',
        address: {
          street: 'House 42, Road 7, Banani',
          city: 'Dhaka',
          state: 'Dhaka',
          postalCode: '1213',
          country: 'Bangladesh'
        }
      }
    ];

    console.log('🌱 Checking / Seeding default role accounts...');

    for (const acc of seedAccounts) {
      const existing = await User.findOne({ email: acc.email });
      if (!existing) {
        await User.create(acc);
        console.log(`  ✅ Created [${acc.role.toUpperCase()}]: ${acc.email} (${acc.name})`);
      } else {
        console.log(`  ℹ️ Existing [${existing.role.toUpperCase()}]: ${acc.email}`);
      }
    }

    const total = await User.countDocuments();
    console.log(`🎉 Seeding complete! Total users in MongoDB: ${total}`);
    await mongoose.disconnect();
    console.log('🌿 MongoDB disconnected cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedUsers();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./server/models/User');
const connectDB = require('./server/config/db');

dotenv.config({ path: './server/.env' });

const email = process.argv[2];

if (!email) {
  console.log('Usage: node makeAdmin.js <email>');
  process.exit(1);
}

const makeAdmin = async () => {
    try {
        await connectDB();
        
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();
        console.log(`SUCCESS: User ${user.name} (${user.email}) is now an ADMIN.`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

makeAdmin();

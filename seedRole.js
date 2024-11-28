const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('./models/Role'); // Adjust path based on your project structure

dotenv.config(); // Load environment variables

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB for seeding roles'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Seed roles
const seedRoles = async () => {
  const roles = [
    { name: 'User', permissions: [] },
    { name: 'Admin', permissions: [] },
    { name: 'Moderator', permissions: [] },
  ];

  try {
    for (const role of roles) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        await new Role(role).save();
        console.log(`Role ${role.name} created.`);
      } else {
        console.log(`Role ${role.name} already exists.`);
      }
    }
    console.log('Roles seeding completed.');
    process.exit(0); // Exit process after seeding
  } catch (err) {
    console.error('Error seeding roles:', err);
    process.exit(1);
  }
};

seedRoles();
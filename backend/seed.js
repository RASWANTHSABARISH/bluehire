const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Job = require('./models/Job');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected for Seeding'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});
    
    // Create Employer
    const employer = await User.create({
      name: 'Taj Mahal Palace HR',
      phone: '9876543210',
      email: 'hr@taj.com',
      passwordHash: 'password123',
      role: 'employer',
      sector: 'restaurant',
      isVerified: true,
      employerProfile: {
        businessName: 'Taj Mahal Palace',
        businessType: 'restaurant'
      }
    });

    // Create Jobs
    const job1 = await Job.create({
      employerId: employer._id,
      title: 'Executive Head Chef',
      description: 'Looking for an experienced Executive Head Chef to manage our back of house operations.',
      sector: 'restaurant',
      jobType: 'full-time',
      shiftTiming: '10am to 10pm',
      salaryMin: 80000,
      salaryMax: 120000,
      location: { city: 'Mumbai', state: 'MH' },
      status: 'open',
      isActive: true,
      sectorMeta: { dept: 'Back of House' }
    });

    const job2 = await Job.create({
      employerId: employer._id,
      title: 'Wait Staff',
      description: 'Front of house waiting staff needed for busy evening shifts.',
      sector: 'restaurant',
      jobType: 'part-time',
      shiftTiming: '6pm to 11pm',
      salaryMin: 15000,
      salaryMax: 25000,
      location: { city: 'Mumbai', state: 'MH' },
      status: 'open',
      isActive: true,
      sectorMeta: { dept: 'Front of House' }
    });
    
    // Create Worker
    const worker = await User.create({
      name: 'Rahul Sharma',
      phone: '9988776655',
      email: 'rahul@example.com',
      passwordHash: 'password123',
      role: 'worker',
      sector: 'restaurant',
      isVerified: true,
      workerProfile: {
        jobTitle: 'Sous Chef',
        experienceYears: 5
      }
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
};

seedDB();

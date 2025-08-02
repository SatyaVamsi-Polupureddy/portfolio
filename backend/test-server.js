// Simple test script to verify server can start
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

console.log('Testing server startup...');

try {
  // Test database connection
  await connectDB();
  console.log('✅ Database connection successful');
  
  // Test Cloudinary configuration
  const { cloudinary } = await import('./config/cloudinary.js');
  console.log('✅ Cloudinary configuration successful');
  
  // Test model imports
  const Experience = (await import('./models/Experience.js')).default;
  const Project = (await import('./models/Project.js')).default;
  const Achievement = (await import('./models/Achievement.js')).default;
  console.log('✅ All models imported successfully');
  
  // Test route imports
  const experiencesRoutes = (await import('./routes/experiences.js')).default;
  const projectsRoutes = (await import('./routes/projects.js')).default;
  const achievementsRoutes = (await import('./routes/achievements.js')).default;
  console.log('✅ All routes imported successfully');
  
  console.log('✅ All tests passed! Server should start successfully.');
  process.exit(0);
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
} 
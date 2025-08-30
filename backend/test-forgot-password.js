const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farm_guardian', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test forgot password functionality
const testForgotPassword = async () => {
  try {
    console.log('\n🔍 Testing Forgot Password Functionality...\n');

    // Test 1: Check if users exist in database
    console.log('1. Checking users in database...');
    const allUsers = await User.find({}).select('email name');
    console.log(`   Found ${allUsers.length} users in database:`);
    allUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.name})`);
    });

    // Test 2: Test with the actual email from database
    const testEmail = 'gauravmittal939@gmail.com'; // Actual email from database
    console.log(`\n2. Testing with email: ${testEmail}`);
    
    const user = await User.findOne({ email: testEmail }).select('+password');
    if (user) {
      console.log(`   ✅ User found: ${user.name}`);
      console.log(`   ✅ Password field exists: ${user.password ? 'Yes' : 'No'}`);
      console.log(`   ✅ Password hash: ${user.password.substring(0, 20)}...`);
      
      // Test 3: Test password comparison with bcrypt
      console.log(`\n3. Testing password comparison...`);
      
      // You need to provide the actual plain text password that was used during registration
      // For testing, let's try some common passwords
      const testPasswords = [
        'password123',
        '123456',
        'gaurav123',
        'mittal123',
        'admin123',
        'test123'
      ];
      
      for (const testPassword of testPasswords) {
        try {
          const isPasswordValid = await user.comparePassword(testPassword);
          console.log(`   Testing "${testPassword}": ${isPasswordValid ? '✅ MATCH!' : '❌ No match'}`);
          if (isPasswordValid) {
            console.log(`   🎉 Found the correct password: "${testPassword}"`);
            break;
          }
        } catch (error) {
          console.log(`   ❌ Error testing "${testPassword}":`, error.message);
        }
      }
      
    } else {
      console.log(`   ❌ User not found with email: ${testEmail}`);
    }

    // Test 4: Test the actual forgot password logic
    console.log('\n4. Testing forgot password logic...');
    
    // First, let's find the user again
    const userToUpdate = await User.findOne({ email: testEmail }).select('+password');
    
    if (!userToUpdate) {
      console.log(`   ❌ Email not found: ${testEmail}`);
      return;
    }

    // You need to provide the correct current password here
    const currentPassword = 'password123'; // Replace with the actual password used during registration
    const newPassword = 'newpassword456';

    console.log(`   Testing with current password: "${currentPassword}"`);
    
    // Verify current password
    try {
      const isPasswordValid = await userToUpdate.comparePassword(currentPassword);
      if (!isPasswordValid) {
        console.log('   ❌ Current password is incorrect');
        console.log('   💡 Please provide the correct password that was used during registration');
        return;
      }
      
      console.log('   ✅ Current password verification successful');
      console.log('   ✅ Ready to update password');
      
      // Actually update the password
      userToUpdate.password = newPassword;
      await userToUpdate.save();
      console.log('   ✅ Password updated successfully in database');
      
    } catch (error) {
      console.log('   ❌ Error during password verification:', error.message);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

// Run tests
const runTests = async () => {
  await connectDB();
  await testForgotPassword();
  
  console.log('\n🏁 Tests completed');
  process.exit(0);
};

runTests();

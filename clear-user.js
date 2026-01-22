const mongoose = require('mongoose');

async function clearUser() {
  try {
    await mongoose.connect('mongodb://localhost:27017/fane-hotel');
    
    // Try to find and delete the user model
    const User = require('./HOTEL-2/dist/models/user.model').default;
    
    if (User) {
      await User.deleteOne({email: 'myoluwaseyi018@gmail.com'});
      console.log('✅ Deleted existing user: myoluwaseyi018@gmail.com');
    } else {
      console.log('❌ User model not found');
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearUser();

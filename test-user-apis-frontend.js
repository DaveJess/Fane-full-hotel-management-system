// Test user APIs from frontend directory
const { usersAPI, authAPI } = require('./Hotel-Manage-Frontend-Fane/lib/api-axios');

async function testUserAPIs() {
  console.log('🧪 TESTING USER APIs FROM FRONTEND...\n');
  
  try {
    // Test 1: Login first
    console.log('1️⃣ Logging in to get token...');
    const loginResponse = await authAPI.login({
      email: 'testuser@fane.com',
      password: 'TestUser123!'
    });
    
    console.log('✅ LOGIN SUCCESS');
    console.log('🔑 Token received');
    
    // Test 2: Get user profile
    console.log('\n2️⃣ Testing GET /api/users/profile...');
    const profileResponse = await usersAPI.getProfile();
    console.log('✅ PROFILE SUCCESS:', profileResponse.success);
    if (profileResponse.success) {
      console.log('👤 User:', profileResponse.data.firstname, profileResponse.data.email);
    }
    
    // Test 3: Update profile
    console.log('\n3️⃣ Testing PUT /api/users/profile...');
    const updateResponse = await usersAPI.updateProfile({
      firstname: 'Updated',
      lastname: 'Name'
    });
    console.log('✅ UPDATE SUCCESS:', updateResponse.success);
    
    // Test 4: Get all users (admin endpoint)
    console.log('\n4️⃣ Testing GET /api/users...');
    const allUsersResponse = await usersAPI.getAll();
    console.log('✅ GET ALL SUCCESS:', allUsersResponse.success);
    if (allUsersResponse.success) {
      console.log('📊 Total users:', allUsersResponse.data.length);
    }
    
    // Test 5: Create new user (admin endpoint)
    console.log('\n5️⃣ Testing POST /api/users...');
    const createResponse = await usersAPI.create({
      firstname: 'Test',
      lastname: 'API',
      email: 'testapi@example.com',
      password: 'password123',
      identification: 'PASSPORT',
      id_no: 987654321,
      nin: '12345678901'
    });
    console.log('✅ CREATE SUCCESS:', createResponse.success);
    if (createResponse.success) {
      console.log('🆕 New user created:', createResponse.data.email);
    }
    
    console.log('\n🎯 ALL USER API TESTS COMPLETED!');
    console.log('📋 Available Frontend Functions:');
    console.log('  usersAPI.getProfile()    - Get current user profile');
    console.log('  usersAPI.updateProfile() - Update user profile');
    console.log('  usersAPI.getAll()       - Get all users (Admin)');
    console.log('  usersAPI.getById()      - Get user by ID (Admin)');
    console.log('  usersAPI.create()      - Create new user (Admin)');
    console.log('  usersAPI.update()      - Update user (Admin)');
    console.log('  usersAPI.delete()      - Delete user (Admin)');
    
  } catch (error) {
    console.error('❌ API TEST FAILED:', error.message);
  }
}

// Run the tests
testUserAPIs();

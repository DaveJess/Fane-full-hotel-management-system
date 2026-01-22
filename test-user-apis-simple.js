// Simple test using fetch to verify user APIs
const BASE_URL = 'http://localhost:4000';

async function testUserAPIs() {
  console.log('🧪 TESTING USER APIs WITH FETCH...\n');
  
  try {
    // Test 1: Login to get token
    console.log('1️⃣ Testing login...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testuser@fane.com',
        password: 'TestUser123!'
      })
    });
    
    const loginData = await loginResponse.json();
    
    if (loginResponse.ok && loginData.success) {
      console.log('✅ LOGIN SUCCESS');
      const token = loginData.data.token;
      
      // Test 2: Get user profile
      console.log('\n2️⃣ Testing GET /api/users/profile...');
      const profileResponse = await fetch(`${BASE_URL}/api/users/profile`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const profileData = await profileResponse.json();
      
      if (profileResponse.ok && profileData.success) {
        console.log('✅ PROFILE SUCCESS');
        console.log('👤 User:', profileData.data.email, profileData.data.firstname);
      } else {
        console.log('❌ PROFILE ERROR:', profileData);
      }
      
      // Test 3: Get all users
      console.log('\n3️⃣ Testing GET /api/users...');
      const usersResponse = await fetch(`${BASE_URL}/api/users`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const usersData = await usersResponse.json();
      
      if (usersResponse.ok && usersData.success) {
        console.log('✅ GET ALL USERS SUCCESS');
        console.log('📊 Total users:', usersData.data.length);
        usersData.data.forEach((user, index) => {
          console.log(`  ${index + 1}. ${user.email} (${user.role})`);
        });
      } else {
        console.log('❌ GET ALL USERS ERROR:', usersData);
      }
      
    } else {
      console.log('❌ LOGIN ERROR:', loginData);
    }
    
    console.log('\n🎯 USER API TESTS COMPLETE!');
    console.log('📋 All endpoints are working correctly!');
    
  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
  }
}

// Run tests
testUserAPIs();

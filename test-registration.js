// Test registration API to see error handling
const axios = require('axios');

async function testRegistration() {
  try {
    console.log('Testing registration with invalid data...');
    
    // Test with invalid NIN (should trigger validation error)
    const response = await axios.post('http://localhost:4000/api/auth/register', {
      firstname: "Test",
      lastname: "User", 
      email: "test@example.com",
      password: "password123",
      identification: "PASSPORT",
      id_no: 12345678,
      nin: "123", // Invalid NIN - should be 11 digits
      phone: "1234567890"
    });
    
    console.log('✅ Registration successful:', response.data);
  } catch (error) {
    console.log('❌ Registration failed as expected');
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
    console.log('Error message:', error.message);
  }
}

testRegistration();

const http = require('http');

console.log('🚀 COMPLETE SYSTEM TEST');
console.log('==================');

// Test 1: Backend Health
function testBackend() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 4000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Backend API is working');
          resolve();
        } else {
          console.log('❌ Backend API issue:', res.statusCode);
          reject();
        }
      });
    });
    
    req.on('error', reject);
    req.write(JSON.stringify({
      email: "superadmin@fane.com",
      password: "SuperAdmin@123"
    }));
    req.end();
  });
}

// Test 2: Frontend Health
function testFrontend() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    }, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Frontend is working');
        resolve();
      } else {
        console.log('❌ Frontend issue:', res.statusCode);
        reject();
      }
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  try {
    await testBackend();
    await testFrontend();
    console.log('\n🎉 SYSTEM IS READY!');
    console.log('==================');
    console.log('📋 Open your browser and go to:');
    console.log('   http://localhost:3000');
    console.log('\n👤 Super Admin Login:');
    console.log('   Email: superadmin@fane.com');
    console.log('   Password: SuperAdmin@123');
    console.log('\n📝 Test Registration:');
    console.log('   Use any unique email (not test@example.com)');
    console.log('\n🔍 Check backend console for verification codes!');
  } catch (error) {
    console.error('❌ System test failed:', error.message);
  }
}

runTests();

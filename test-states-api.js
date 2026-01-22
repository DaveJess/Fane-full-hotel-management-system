// Test the Nigerian States API to see what data is available
const fetch = require('node-fetch');

async function testStatesAPI() {
  try {
    console.log('🧪 TESTING NIGERIAN STATES API...\n');
    
    // Test 1: Get all states
    console.log('1️⃣ Fetching all states...');
    const statesResponse = await fetch('https://nga-states-lga.onrender.com/fetch');
    const statesData = await statesResponse.json();
    
    console.log('✅ States Response:');
    console.log('Total States:', statesData.states?.length || 0);
    
    if (statesData.states && statesData.states.length > 0) {
      console.log('\nSample State Structure:');
      console.log(JSON.stringify(statesData.states[0], null, 2));
      
      // Test 2: Get LGAs for a specific state
      const firstState = statesData.states[0];
      console.log(`\n2️⃣ Fetching LGAs for ${firstState.name}...`);
      
      const lgasResponse = await fetch(`https://nga-states-lga.onrender.com/?state=${encodeURIComponent(firstState.name)}`);
      const lgasData = await lgasResponse.json();
      
      console.log('✅ LGAs Response:');
      console.log('Total LGAs:', lgasData.lga?.length || 0);
      
      if (lgasData.lga && lgasData.lga.length > 0) {
        console.log('\nSample LGA Structure:');
        console.log(JSON.stringify(lgasData.lga[0], null, 2));
        
        console.log('\n📋 Available LGAs:');
        lgasData.lga.slice(0, 5).forEach((lga, index) => {
          console.log(`  ${index + 1}. ${lga.name} (${lga.state_name})`);
        });
        
        if (lgasData.lga.length > 5) {
          console.log(`  ... and ${lgasData.lga.length - 5} more`);
        }
      }
    }
    
    console.log('\n🎯 API Test Complete!');
    console.log('📊 Available Data: States and LGAs');
    console.log('🏙️ Note: LGAs serve as cities/towns in Nigerian context');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testStatesAPI();

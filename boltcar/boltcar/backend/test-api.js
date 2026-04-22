const http = require('http');

// Test function to make HTTP requests
function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            data: jsonData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Test all endpoints
async function testEndpoints() {
  console.log('Testing BoltCar API endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing /api/health');
    const healthResponse = await makeRequest('/api/health');
    console.log(`Status: ${healthResponse.statusCode}`);
    console.log('Response:', JSON.stringify(healthResponse.data, null, 2));
    console.log('---\n');

    // Test cars endpoint
    console.log('2. Testing /api/cars');
    const carsResponse = await makeRequest('/api/cars');
    console.log(`Status: ${carsResponse.statusCode}`);
    console.log(`Cars count: ${carsResponse.data.count}`);
    console.log('First car:', JSON.stringify(carsResponse.data.data[0], null, 2));
    console.log('---\n');

    // Test filtered cars endpoint
    console.log('3. Testing /api/cars?brand=Tesla');
    const teslaResponse = await makeRequest('/api/cars?brand=Tesla');
    console.log(`Status: ${teslaResponse.statusCode}`);
    console.log(`Tesla cars count: ${teslaResponse.data.count}`);
    console.log('---\n');

    // Test search endpoint
    console.log('4. Testing /api/search?q=Tesla');
    const searchResponse = await makeRequest('/api/search?q=Tesla');
    console.log(`Status: ${searchResponse.statusCode}`);
    console.log(`Search results count: ${searchResponse.data.count}`);
    console.log('---\n');

    // Test brands endpoint
    console.log('5. Testing /api/brands');
    const brandsResponse = await makeRequest('/api/brands');
    console.log(`Status: ${brandsResponse.statusCode}`);
    console.log('Available brands:', brandsResponse.data.data);
    console.log('---\n');

    console.log('All API tests completed successfully! \ud83c\udf89');

  } catch (error) {
    console.error('Error testing endpoints:', error.message);
  }
}

// Run tests
testEndpoints();

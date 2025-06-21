/**
 * Test script to verify TheMealDB API integration
 * Run with: node test-meal-api.js
 */

const https = require('https');

function testAPI(url, testName) {
  return new Promise((resolve, reject) => {
    console.log(`\n=== ${testName} ===`);
    console.log(`Testing: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log('✅ Success:', Object.keys(json));
          if (json.meals) {
            console.log(`📝 Found ${json.meals.length} meals`);
            if (json.meals[0]) {
              console.log(`🍽️  Sample: ${json.meals[0].strMeal}`);
            }
          }
          resolve(json);
        } catch (error) {
          console.log('❌ JSON Parse Error:', error.message);
          reject(error);
        }
      });
    }).on('error', (err) => {
      console.log('❌ Network Error:', err.message);
      reject(err);
    });
  });
}

async function runTests() {
  console.log('🧪 Testing TheMealDB API Integration...\n');
  
  try {
    // Test 1: Search by name
    await testAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken', 'Search by name (chicken)');
    
    // Test 2: Random meal
    await testAPI('https://www.themealdb.com/api/json/v1/1/random.php', 'Random meal');
    
    // Test 3: Categories
    await testAPI('https://www.themealdb.com/api/json/v1/1/categories.php', 'Categories list');
    
    // Test 4: Category filter
    await testAPI('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood', 'Filter by category (Seafood)');
    
    // Test 5: Meal by ID
    await testAPI('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52874', 'Lookup by ID');
    
    console.log('\n🎉 All API tests completed successfully!');
    console.log('✅ TheMealDB API is working and accessible');
    
  } catch (error) {
    console.log('\n💥 Test failed:', error.message);
    process.exit(1);
  }
}

runTests();

// Test script to validate the Goldsky configuration structure
const fs = require('fs');
const path = require('path');

// Function to validate YAML structure
function validateYamlStructure() {
  try {
    const yamlContent = fs.readFileSync(path.join(__dirname, 'goldsky.yaml'), 'utf8');
    console.log('✅ goldsky.yaml exists');
    
    // Basic validation - check for required fields
    const requiredFields = ['name', 'network', 'dataSources', 'entities'];
    for (const field of requiredFields) {
      if (!yamlContent.includes(field)) {
        console.log(`❌ Missing required field: ${field}`);
        return false;
      }
    }
    console.log('✅ Required fields present in goldsky.yaml');
    return true;
  } catch (error) {
    console.log('❌ Error reading goldsky.yaml:', error.message);
    return false;
  }
}

// Function to validate GraphQL schema
function validateGraphQLSchema() {
  try {
    const schemaContent = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');
    console.log('✅ schema.graphql exists');
    
    // Basic validation - check for required type and fields
    if (!schemaContent.includes('type EscrowFundingEvent')) {
      console.log('❌ Missing EscrowFundingEvent type');
      return false;
    }
    
    const requiredFields = ['id', 'escrowAddress', 'from', 'amount', 'asset', 'ledger', 'timestamp'];
    for (const field of requiredFields) {
      if (!schemaContent.includes(field)) {
        console.log(`❌ Missing required field: ${field}`);
        return false;
      }
    }
    console.log('✅ Required fields present in schema.graphql');
    return true;
  } catch (error) {
    console.log('❌ Error reading schema.graphql:', error.message);
    return false;
  }
}

// Function to validate parsing logic
function validateParsingLogic() {
  try {
    const logicContent = fs.readFileSync(path.join(__dirname, 'parsing-logic.js'), 'utf8');
    console.log('✅ parsing-logic.js exists');
    
    // Basic validation - check for required functions
    const requiredFunctions = ['parseAccountCreditedEffect', 'isKnownEscrowContract', 'processEffects'];
    for (const func of requiredFunctions) {
      if (!logicContent.includes(func)) {
        console.log(`❌ Missing required function: ${func}`);
        return false;
      }
    }
    console.log('✅ Required functions present in parsing-logic.js');
    return true;
  } catch (error) {
    console.log('❌ Error reading parsing-logic.js:', error.message);
    return false;
  }
}

// Function to validate README
function validateREADME() {
  try {
    const readmeContent = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
    console.log('✅ README.md exists');
    
    // Basic validation - check for required sections
    const requiredSections = ['Overview', 'Observations', 'Implementation Details', 'Recommendations'];
    for (const section of requiredSections) {
      if (!readmeContent.includes(section)) {
        console.log(`❌ Missing required section: ${section}`);
        return false;
      }
    }
    console.log('✅ Required sections present in README.md');
    return true;
  } catch (error) {
    console.log('❌ Error reading README.md:', error.message);
    return false;
  }
}

// Run all validations
function runValidations() {
  console.log('Running configuration structure validation...\n');
  
  const validations = [
    validateYamlStructure(),
    validateGraphQLSchema(),
    validateParsingLogic(),
    validateREADME()
  ];
  
  const passed = validations.filter(v => v).length;
  const total = validations.length;
  
  console.log(`\nValidation Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log('🎉 All validations passed!');
    return true;
  } else {
    console.log('❌ Some validations failed. Please check the errors above.');
    return false;
  }
}

// Export for testing
module.exports = {
  validateYamlStructure,
  validateGraphQLSchema,
  validateParsingLogic,
  validateREADME,
  runValidations
};

// Run if called directly
if (require.main === module) {
  runValidations();
}
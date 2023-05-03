
try {

// Import the server file
require('./connectordb');

   // Import the setup file
require('./server');

// Import the routes file
require('./addelement');

  } catch (err) {
    console.error('Error executing JavaScript files:', err);
  }
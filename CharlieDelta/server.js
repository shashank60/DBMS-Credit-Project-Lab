// Importing required modules
const express = require('express');

// Creating an instance of the Express application
const app = express();

// Setting up a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Starting the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

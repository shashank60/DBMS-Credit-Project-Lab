const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');

const app = express();
const port = 3000;

// Set up the OracleDB connection
const dbConfig = {
  user: 'C##BUNNYDRIVE',
  password: 'newpassword',
  connectString: 'localhost'
};

// Enable parsing of JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML file
app.use(express.static('public'));

// Insert data into the Oracle database
app.post('/insertData', (req, res) => {
  const { name, age } = req.body;
  
  oracledb.getConnection(dbConfig, (err, connection) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to connect to the database.' });
    }
    
    const sql = 'INSERT INTO your_table (name, age) VALUES (:name, :age)';
    const bindParams = {
      name: name,
      age: age
    };
    
    connection.execute(sql, bindParams, (err, result) => {
      connection.release();
      
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to insert data into the database.' });
      }
      
      res.status(200).json({ message: 'Data inserted successfully.' });
    });
  });
});

// Retrieve data from the Oracle database
app.get('/displayData', (req, res) => {
  oracledb.getConnection(dbConfig, (err, connection) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to connect to the database.' });
    }
    
    const sql = 'SELECT * FROM your_table';
    
    connection.execute(sql, (err, result) => {
      connection.release();
      
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to retrieve data from the database.' });
      }
      
      const data = result.rows.map((row) => ({
        name: row[0],
        age: row[1]
      }));
      
      res.status(200).json(data);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

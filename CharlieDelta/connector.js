const oracledb = require('oracledb');

// Connection details

const dbConfig = {
  user: 'C##BUNNYDRIVE',
  password: 'Qwerty1',
  connectString: 'localhost'
};

async function testConnection() {
  let connection;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    console.log('Connected to Oracle Database');

    // Check if the connection is open
    if (connection && connection.isConnected()) {
      console.log('Connection is open');
    } 
    
    else {
      console.log('Connection is not open');
    }
  } catch (err) {
    console.error('Error connecting to Oracle Database:', err);
  } finally {
    // Release the connection
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed');
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}



 
testConnection()
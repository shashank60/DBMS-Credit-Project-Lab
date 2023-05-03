const oracledb = require('oracledb');
const readline = require('readline');

// Connection details
const dbConfig = {
  user: 'C##BUNNYDRIVE',
  password: 'newpassword',
  connectString: 'localhost'
};

let connection;

async function connect() {
  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    console.log('Connected to Oracle Database');

    // Execute a query to check if the connection is open
    const result = await connection.execute('SELECT 1 FROM DUAL');
    if (result.rows.length > 0) {
      console.log('Connection is open');
    } else {
      console.log('Connection is not open');
    }

    // Start listening for user input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Press any key to close the connection...', async () => {
      rl.close();
      await closeConnection();
      console.log('Connection closed');
    });
  } catch (err) {
    console.error('Error connecting to Oracle Database:', err);
  }
}

async function closeConnection() {
  try {
    // Release the connection
    if (connection) {
      await connection.close();
    }
  } catch (err) {
    console.error('Error closing connection:', err);
  }
}

connect();

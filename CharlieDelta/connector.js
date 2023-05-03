const oracledb = require('oracledb');

// Connection details
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  connectString: 'your_connect_string'
};

// Data to insert
const data = {
  TICKETID: '123456',
  STUDENT_NAME: 'John Doe',
  SEAT_NO: 'A12',
  BOOKING_DATE: new Date(),
  PAYMENT_STATUS: 'OK',
  REG_NO: '2023-123456'
};

async function insertData() {
  let connection;

  try {
    // Get a connection from the pool
    connection = await oracledb.getConnection(dbConfig);

    // Prepare the SQL statement
    const sql = `INSERT INTO C##BUNNYDRIVE.STUDENTDATA
                (TICKETID, STUDENT_NAME, SEAT_NO, BOOKING_DATE, PAYMENT_STATUS, REG_NO)
                VALUES
                (:ticketId, :studentName, :seatNo, :bookingDate, :paymentStatus, :regNo)`;

    // Bind the values
    const binds = {
      ticketId: data.TICKETID,
      studentName: data.STUDENT_NAME,
      seatNo: data.SEAT_NO,
      bookingDate: data.BOOKING_DATE,
      paymentStatus: data.PAYMENT_STATUS,
      regNo: data.REG_NO
    };

    // Execute the statement
    const result = await connection.execute(sql, binds);

    console.log('Data inserted successfully.');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    // Release the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Call the insertData function
insertData();

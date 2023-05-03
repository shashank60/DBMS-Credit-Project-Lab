// Add an element to the table
app.post('/api/table', async (req, res) => {
    try {
      const { element } = req.body;
  
      // Execute an INSERT statement to add the element to the table
      const result = await oracledb.getConnection().execute(
        'INSERT INTO your_table (column_name) VALUES (:element)',
        [element],
        { autoCommit: true }
      );
  
      console.log('Element added to the table:', element);
      res.sendStatus(200);
    } catch (err) {
      console.error('Error adding element to the table:', err);
      res.sendStatus(500);
    }
  });
  
  // Remove an element from the table
  app.delete('/api/table/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Execute a DELETE statement to remove the element from the table
      const result = await oracledb.getConnection().execute(
        'DELETE FROM your_table WHERE id = :id',
        [id],
        { autoCommit: true }
      );
  
      console.log('Element removed from the table:', id);
      res.sendStatus(200);
    } catch (err) {
      console.error('Error removing element from the table:', err);
      res.sendStatus(500);
    }
  });
  
// Add an element to the table



app.get('/api/table', async (req, res) => {
  try {
    // Execute a SELECT statement to retrieve all elements from the table
    const result = await oracledb.getConnection().execute(
      'SELECT * FROM your_table'
    );

    const elements = result.rows.map(row => row.column_name);
    res.json(elements);
  } catch (err) {
    console.error('Error retrieving elements from the table:', err);
    res.sendStatus(500);
  }
});

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
  



  app.controller('TableController', function($scope, $http) {
    $scope.elements = [];
  
    // Function to retrieve elements from the server
    $scope.fetchElements = function() {
      $http.get('/api/table')
        .then(function(response) {
          $scope.elements = response.data;
          updateTableSize();
        })
        .catch(function(error) {
          console.error('Error retrieving elements:', error);
        });
    };
  
    // Function to add an element to the table
    $scope.addElement = function(element) {
      $http.post('/api/table', { element })
        .then(function() {
          $scope.elements.push(element);
          updateTableSize();
        })
        .catch(function(error) {
          console.error('Error adding element:', error);
        });
    };
  
    // Function to remove an element from the table
    $scope.removeElement = function(element) {
      $http.delete('/api/table/' + element.id)
        .then(function() {
          const index = $scope.elements.indexOf(element);
          if (index !== -1) {
            $scope.elements.splice(index, 1);
            updateTableSize();
          }
        })
        .catch(function(error) {
          console.error('Error removing element:', error);
        });
    };
  
    // Function to update the table size based on the number of elements
    function updateTableSize() {
      const table = document.getElementById('your-table');
      table.style.height = ($scope.elements.length * 30) + 'px';
    }
  
    // Fetch the elements when the controller is initialized
    $scope.fetchElements();
  });
  
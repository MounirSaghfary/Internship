const { sql, connect, disconnect } = require('../../utils/SQL');

 async function handler(req, res) {
    console.log('HELLO');
    try {
      console.log('Handler function called');
      await connect();
      console.log('Connected to SQL Server');
      const result = await sql.query(
        'SELECT id, created_at, Task, ends_at, email FROM Tasks'
      );
      console.log('Retrieved data:', result.recordset);
      await disconnect();
      console.log('Disconnected from SQL Server');
      console.log('Sending API response');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error retrieving data from SQL Server:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
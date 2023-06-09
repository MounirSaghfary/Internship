const { sql, connect, disconnect } = require('../../utils/SQL');

async function handler(req, res) {
  try {
    await connect();
    console.log('Connected to SQL Server');

    if (req.method === 'DELETE') {
      const id = req.query.taskId;
      const query = `DELETE FROM Tasks WHERE id = '${id}'`;
      await sql.query(query);

      console.log('Task deleted:', taskId);
      await disconnect();
      console.log('Disconnected from SQL Server');
      console.log('Sending API response');
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      const email = req.query.email;
      const query = `SELECT id, created_at, Task, ends_at, priority FROM Tasks WHERE email = '${email}'`;
      const result = await sql.query(query);

      console.log('Retrieved data:', result.recordset);
      await disconnect();
      console.log('Disconnected from SQL Server');
      console.log('Sending API response');
      res.status(200).json(result.recordset);
    }
  } catch (error) {
    console.error('Error accessing SQL Server:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = handler;

const { sql, connect, disconnect } = require('../../utils/SQL');
const bodyParser = require('body-parser');

// Enable JSON parsing middleware
const jsonParser = bodyParser.json();

async function handler(req, res) {
  try {
    await connect();
    console.log('Connected to SQL Server');

    jsonParser(req, res, async () => {
      if (req.method === 'DELETE') {
        // Delete task logic
        const id = req.query.taskId;
        const query = `DELETE FROM Tasks WHERE id = '${id}'`;
        await sql.query(query);
        console.log('Task deleted:', id);
        await disconnect();
        console.log('Disconnected from SQL Server');
        console.log('Sending API response');
        res.status(200).json({ message: `Task ${id} deleted successfully` });
      } else if (req.method === 'POST') {
        // Insert task logic
        const { email, title, task, priority, ends_at } = req.body;
        const created_at = new Date().toISOString().split('T')[0];
        const query = `
          INSERT INTO Tasks (created_at, Title, Task, ends_at, priority, email, status)
          VALUES ('${created_at}', '${title}', '${task}', '${ends_at}', '${priority}', '${email}', 'In Progress')
        `;
        await sql.query(query);
        console.log('New task added');
        await disconnect();
        console.log('Disconnected from SQL Server');
        console.log('Sending API response');
        res.status(200).json({ message: 'Task added successfully' });
      } else if (req.method === 'PUT') {
        const taskId = req.query.taskId;
        const query = `UPDATE Tasks SET status = 'Completed' WHERE id = '${taskId}'`;
        await sql.query(query);
      
        console.log('Task status updated:', taskId);
        await disconnect();
        console.log('Disconnected from SQL Server');
        console.log('Sending API response');
        res.status(200).json({ message: `Task ${taskId} status updated successfully` });
      } else {
        // Retrieve tasks logic
        const email = req.query.email;
        const query = `SELECT id, created_at, Task, ends_at, priority, status FROM Tasks WHERE email = '${email}'`;
        const result = await sql.query(query);
        console.log('Retrieved data:', result.recordset);
        await disconnect();
        console.log('Disconnected from SQL Server');
        console.log('Sending API response');
        res.status(200).json(result.recordset);
      }
    });
  } catch (error) {
    console.error('Error accessing SQL Server:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = handler;

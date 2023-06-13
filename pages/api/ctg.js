const { sql, connect, disconnect } = require('../../utils/SQL');
const bodyParser = require('body-parser');

// Enable JSON parsing middleware
const jsonParser = bodyParser.json();

async function handler(req, res) {
  try {
    await connect();
    console.log('Connected to SQL Server');

    jsonParser(req, res, async () => {
      if (req.method === 'PUT') {
        const total = req.query.total;
        const category = req.query.category;
        const year = new Date().getFullYear(); // Get current year
        const query = `UPDATE Category SET Spent_Budget = Spent_Budget + ${total}, Rest_Budget = Rest_Budget - ${total} WHERE category = '${category}' AND year = '${year}'`;
        await sql.query(query);
        console.log('Category status updated:');
        await disconnect();
        console.log('Disconnected from SQL Server');
        console.log('Sending API response');
        res.status(200).json({ message: `Task status updated successfully` });
      }
      else{
          const query = `SELECT Year, Category, Initial_Budget, Spent_Budget, Rest_Budget FROM Category`;
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

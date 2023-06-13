const { sql, connect, disconnect } = require('../../utils/SQL');
const bodyParser = require('body-parser');

// Enable JSON parsing middleware
const jsonParser = bodyParser.json();

async function handler(req, res) {
  try {
    await connect();
    console.log('Connected to SQL Server');

    jsonParser(req, res, async () => {
        if(req.method === 'PUT'){
          const featureId = req.query.featureId;
          const change = req.query.change;
          if (change === 'Reject'){
            const query = `UPDATE Features SET confirmation = 'Rejected'  WHERE id = '${featureId}'`;
            await sql.query(query);
            console.log('Features status updated:', featureId);
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json({ message: `Task ${featureId} status updated successfully` });
          }else if(change === 'Accept'){
            const query = `UPDATE Features SET status = 'In Progress', confirmation = 'Accepted'  WHERE id = '${featureId}'`;
            await sql.query(query);
            console.log('Features status updated:', featureId);
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json({ message: `Features ${featureId} status updated successfully` });
          }else if(change === 'Complete'){
            const query = `UPDATE Features SET status = 'Complete' WHERE id = '${featureId}'`;
            await sql.query(query);
            console.log('Features status updated:', featureId);
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json({ message: `Features ${featureId} status updated successfully` });
          }
        }else if (req.method === 'POST') {
          // Insert task logic
          const { email, title, Justification, priority} = req.body;
          const created_at = new Date().toISOString().split('T')[0];
          const query = `
            INSERT INTO Features (created_at, Title, Justification, confirmation, status, priority, email)
            VALUES ('${created_at}', '${title}', '${Justification}', 'NULL', 'NULL','${priority}', '${email}')
          `;
          await sql.query(query);
          console.log('New Feature added');
          await disconnect();
          console.log('Disconnected from SQL Server');
          console.log('Sending API response');
          res.status(200).json({ message: 'Feature added successfully' });
      }
        else{
          // Retrieve tasks logic
          const s = req.query.s;
          if(s === 'dev')
          {
            const query = `SELECT id, created_at, Title,Justification, confirmation, status, priority, email FROM Features`;
            const result = await sql.query(query);
            console.log('Retrieved data:', result.recordset);
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json(result.recordset);
          }else{
            const email = req.query.email;
            const query = `SELECT id, created_at, Title,Justification, confirmation, status, priority, email FROM Features WHERE email = '${email}'`;
            const result = await sql.query(query);
            console.log('Retrieved data:', result.recordset);
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json(result.recordset);
          } 
        }
    });
  } catch (error) {
    console.error('Error accessing SQL Server:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = handler;

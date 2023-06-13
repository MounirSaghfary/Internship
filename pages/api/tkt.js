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
          const ticketId = req.query.ticketId;
          const change = req.query.change;
          if (change === 'Reject'){
            const query = `UPDATE Tickets SET confirmation = 'Rejected'  WHERE id = '${ticketId}'`;
            await sql.query(query);
            console.log('Tickets status updated:', ticketId);
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json({ message: `ticket ${ticketId} status updated successfully` });
          }else if(change === 'Accept'){
            const query = `UPDATE Tickets SET status = 'In Progress', confirmation = 'Accepted'  WHERE id = '${ticketId}'`;
            await sql.query(query);
            console.log('Tickets status updated:', ticketId);
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json({ message: `ticket ${ticketId} status updated successfully` });
          }else if(change === 'Complete'){
            const query = `UPDATE Tickets SET status = 'Complete' WHERE id = '${ticketId}'`;
            await sql.query(query);
            console.log('Tickets status updated:', ticketId);
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json({ message: `Tickets ${ticketId} status updated successfully` });
          }
        } else if (req.method === 'POST') {
            // Insert task logic
            const { email, title, Information, priority} = req.body;
            const created_at = new Date().toISOString().split('T')[0];
            const query = `
              INSERT INTO Tickets (created_at, Title, Information, confirmation, status, priority, email)
              VALUES ('${created_at}', '${title}', '${Information}', 'NULL', 'NULL','${priority}', '${email}')
            `;
            await sql.query(query);
            console.log('New Ticket added');
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json({ message: 'Ticket added successfully' });
        }
        else{
          // Retrieve tasks logic
          const s = req.query.s;
          if(s==='Res'){
              const query = `SELECT id, created_at, Title,Information, confirmation, status, priority, email FROM Tickets`;
              const result = await sql.query(query);
              console.log('Retrieved data:', result.recordset);
              await disconnect();
              console.log('Disconnected from SQL Server');
              console.log('Sending API response');
              res.status(200).json(result.recordset);
          }
          else{
              const email = req.query.email;
              const query = `SELECT id, created_at, Title,Information, confirmation, status, priority, email FROM Tickets WHERE email = '${email}'`;
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

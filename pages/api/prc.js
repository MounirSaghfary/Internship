const { sql, connect, disconnect } = require('../../utils/SQL');
const bodyParser = require('body-parser');

// Enable JSON parsing middleware
const jsonParser = bodyParser.json();

async function handler(req, res) {
  try {
    await connect();
    console.log('Connected to SQL Server');

    jsonParser(req, res, async () => {
        if(req.method==='POST'){
            const{reference,itemName,itemDescription,itemUP,itemQuantity,total,distributor,category,email}=req.body;
            const created_at = new Date().toISOString().split('T')[0];
            const year = new Date().getFullYear();
            const query = `
              INSERT INTO Purchases (purchaseyear,created_at, reference, item_name, item_description, item_UP, item_quantity,total, distributor, category, email)
              VALUES ('${year}','${created_at}', '${reference}', '${itemName}', '${itemDescription}', '${itemUP}', '${itemQuantity}', '${total}', '${distributor}', '${category}','${email}')
            `;
            await sql.query(query);
            console.log('New task added');
            await disconnect();
            console.log('Disconnected from SQL Server');
            console.log('Sending API response');
            res.status(200).json({ message: 'Task added successfully' });
        }else{
            const a = req.query.a;
            const email = req.query.email;
            if(a === 'a'){
              const query = `SELECT id,purchaseyear,created_at,reference,item_name, item_description, item_UP, item_quantity, total, distributor, category, email FROM Purchases`;
              const result = await sql.query(query);
              console.log('Retrieved data:', result.recordset);
              await disconnect();
              console.log('Disconnected from SQL Server');
              console.log('Sending API response');
              res.status(200).json(result.recordset);
            }
            else if(a === 'o'){
              const query = `SELECT id,purchaseyear,created_at,reference,item_name, item_description, item_UP, item_quantity, total, distributor, category, email FROM Purchases WHERE email = '${email}'`;
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

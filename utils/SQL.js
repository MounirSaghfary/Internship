const sql = require('mssql');
require('dotenv').config();

const config = {
  server: "DESKTOP-L71EKAJ\\MSSQLSERVER01",
  database: "Centrelec",
  user: "mounir",
  password: "mounir123",
  options: {
    encrypt: true,
    trustServerCertificate: true,
    MultipleActiveResultSets: true
  }
};

let pool;

async function connect() {
  try {
    pool = await sql.connect(config);
    console.log('Connected to SQL Server');
    return pool;
  } catch (error) {
    console.error('Error connecting to SQL Server:', error);
    throw error;
  }
}

async function disconnect() {
  try {
    if (pool) {
      await pool.close();
      console.log('Disconnected from SQL Server');
    }
  } catch (error) {
    console.error('Error disconnecting from SQL Server:', error);
    throw error;
  }
}

module.exports = {
  sql,
  connect,
  disconnect,
};
// db.js
export default async function executeQuery({ query, values }) {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });
  
  try {
    const [rows, fields] = await connection.execute(query, values);
    return JSON.stringify(rows);

  } catch (error) {
    throw error;
  }
}

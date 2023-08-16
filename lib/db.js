// db.js
export default async function executeQuery({ query, values }, debug) {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    ssl: {
      rejectUnauthorized: true
    }
  });

  try {
    if (debug === null) debug=false;

    if (debug) console.log(`Running SQL query: ${query}`);
    if (debug) console.log(`With values: ${values}`);
    
    const [rows, fields] = await connection.execute(query, values);
    
    return JSON.stringify(rows);
  } catch (error) {
    if (debug) console.error(`Encountered error: ${error}`);
    throw error;
  } finally {
    await connection.end();
  }
}

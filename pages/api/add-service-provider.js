import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  try {
    
    const { name, email } = req.query;

    const insert_user_query = `INSERT IGNORE INTO users (email, is_admin) VALUES (?,0)`;

    const insert_sp_query = `INSERT INTO service_providers (name, login_email) VALUES (?,?)`;

    const userValues = [email];
    const add_user = await executeQuery({query: insert_user_query, values: userValues});

    const spValues = [name, email];
    const serviceProviders = await executeQuery({query: insert_sp_query, values: spValues});

    res.send("Successfully added service provider").status(200);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
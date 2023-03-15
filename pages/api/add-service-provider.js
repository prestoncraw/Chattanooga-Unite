import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  try {
    const query = `INSERT INTO service_providers (logo_url, name, description, contact_phone_number, contact_email, website_url, address, login_email) VALUES (?,?,?,?,?,?,?,?)`;
    const serviceProviders = await executeQuery({ query });
    res.json(serviceProviders).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
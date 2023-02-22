import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  try {
    const query = `SELECT * FROM service_providers`;
    const serviceProviders = await executeQuery({ query });
    res.json(serviceProviders).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  try {
    // const query = `SELECT * FROM service_providers`;
    const query = `SELECT sp.*, u.email FROM service_providers sp JOIN users u ON sp.owner_id = u.id`;
    const serviceProviders = await executeQuery({ query });
    res.status(200).json(serviceProviders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

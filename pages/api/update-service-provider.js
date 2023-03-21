import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  try {
    
    const { logo_url, name, description, contact_phone_number, contact_email, website_url, address, id} = req.query;

    const update_sp_query = `UPDATE service_providers SET logo_url = ?, name = ?, description = ?, contact_phone_number = ?, contact_email = ?, website_url = ?, address = ?
      WHERE id = ?`;

    const spValues = [logo_url, name, description, contact_phone_number, contact_email, website_url, address, id];
    const serviceProviders = await executeQuery({query: update_sp_query, values: spValues});

    res.send("Successfully updated service provider").status(200);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
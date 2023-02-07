import executeQuery from '../../lib/db';

export default async function handler(req, res) {
    const { service_id, county_id } = req.query;

    const query = 
    `SELECT sp.* FROM service_providers sp JOIN sp_services s ON sp.id = s.service_provider_id 
    JOIN sp_counties c ON sp.id = c.service_provider_id 
    JOIN service se ON s.service_id = se.id JOIN county co ON c.county_id = co.id 
    WHERE se.id = ? AND co.id = ?`;

    const values = [service_id, county_id];
    const serviceProviders = await executeQuery({query, values});

    res.status(200).json({ data: serviceProviders }) 
}
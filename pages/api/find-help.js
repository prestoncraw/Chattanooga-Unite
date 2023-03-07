import executeQuery from '../../lib/db';

export default async function handler(req, res) {
    const { service_id, county_id } = req.query;
    
    const selectQuery = `
      SELECT sp.* 
      FROM service_providers sp 
      JOIN sp_services s ON sp.id = s.service_provider_id 
      JOIN sp_counties c ON sp.id = c.service_provider_id 
      JOIN service se ON s.service_id = se.id 
      JOIN county co ON c.county_id = co.id 
      WHERE se.id = ? AND co.id = ?
    `;
    const selectValues = [service_id, county_id];
    const serviceProviders = await executeQuery({query: selectQuery, values: selectValues});

    const foundMatch = serviceProviders.length - 2 > 0 ? 1 : 0;
    const insertQuery = `
      INSERT INTO sp_search_metrics (search_timestamp, county_id, service_id, found_match) 
      VALUES (NOW(), ?, ?, ?)
    `;
    const insertValues = [county_id, service_id, foundMatch];
    executeQuery({query: insertQuery, values: insertValues});

    res.status(200).json({ data: serviceProviders });
}
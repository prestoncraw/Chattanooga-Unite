import executeQuery from '../../lib/db';
import moment from 'moment';

export default async function handler(req, res) {
    const { service_id, county_id } = req.query;
    const search_timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

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

    const foundMatch = serviceProviders.length > 0 ? 1 : 0;
    const insertQuery = `
      INSERT INTO sp_search_metrics (search_timestamp, county_id, service_id, found_match) 
      VALUES (?, ?, ?, ?)
    `;
    const insertValues = [search_timestamp, county_id, service_id, foundMatch];
    const insertData = await executeQuery({query: insertQuery, values: insertValues});

    res.status(200).json({ data: serviceProviders });
}

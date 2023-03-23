import executeQuery from '../../lib/db';

export default async function handler(req, res) {
    try {
    const { service_id, county_id, service_provider_id } = req.query;
    
    const insertQuery = `
      INSERT INTO search_metrics (search_timestamp, service_id, county_id, service_provider_id) 
      VALUES (NOW(), ?, ?, ?)
    `;
    const insertValues = [county_id, service_id, service_provider_id];
    console.log(insertValues)
    executeQuery({query: insertQuery, values: insertValues});

    res.send("Successfully inserted metrics").status(200);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
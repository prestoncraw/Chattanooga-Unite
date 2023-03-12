import executeQuery from '../../lib/db';

export default async function handler(req, res) {
    const { days } = req.query;
    const msSinceDay = Date.now() - (86400000 * days);
    const query = 
    `SELECT * FROM sp_search_metrics WHERE (unix_timestamp(search_timestamp) * 1000) > ?`;

    const values = [msSinceDay];
    const metrics = await executeQuery({query, values});

    res.status(200).json({ data: JSON.parse(metrics) }) 
}
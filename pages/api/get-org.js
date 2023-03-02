import executeQuery from '../../lib/db';

export default async function handler(req, res) {
    const { sp_id } = req.query;

    const query = 
    `SELECT sp.* FROM service_providers sp  WHERE sp.id = ?`;

    const values = [sp_id];
    const org = await executeQuery({query, values});

    res.status(200).json({ data: org }) 
}
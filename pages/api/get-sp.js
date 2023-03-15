import executeQuery from '../../lib/db';

export default async function handler(req, res) {
    const { sp_email } = req.query;

    const query = 
    `SELECT sp.* FROM service_providers sp  WHERE sp.login_email = ?`;

    const values = [sp_email];
    const org = await executeQuery({query, values});

    res.status(200).json({ data: org }) 
}
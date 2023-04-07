import executeQuery from '../../lib/db';
import getAuthUser from '../../lib/get-auth-user';
import authorizeUser from '../../lib/authorize-user';
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {

    const session = await getServerSession(req, res)
    if (!session) {
      res.status(401).send("Access Denied")
    }

    const { days } = req.query;
    const msSinceDay = Date.now() - (86400000 * days);
    const user = await getAuthUser(session.user);
    const isAuthorized = await authorizeUser(user, 0);

    if (isAuthorized == false) {
        res.status(401).send("Access Denied")
    }

    const query = 
    `SELECT * FROM sp_search_metrics WHERE (unix_timestamp(search_timestamp) * 1000) > ?`;

    const values = [msSinceDay];

    if(isAuthorized == true){
        const metrics = await executeQuery({query, values});
        res.status(200).json({ data: JSON.parse(metrics) }) 
      }
}
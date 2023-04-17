import executeQuery from '../../lib/db';
import { authorizeRequest } from '../../lib/authorize-request';

export default async function handler(req, res) {

  if (!(await authorizeRequest(req, res, "admin"))) {
    res.status(401).send("Access Denied")
  }

  else {
    const query = `SELECT * FROM users`;
    const log = await executeQuery({ query });
    const activityLog = JSON.parse(log)
    res.json(activityLog);
  }
}

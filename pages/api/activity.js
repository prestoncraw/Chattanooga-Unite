import executeQuery from '../../lib/db';
import { authorizeRequest } from '../../lib/authorize-request';

export default async function handler(req, res) {

  if (!(await authorizeRequest(req, res, "admin"))) {
    res.status(401).send("Access Denied");
  }

  else {
    const query = `SELECT a.*, u.* FROM activity_log a JOIN users u ON a.user_id = u.id ORDER BY a.action_timestamp DESC LIMIT 100`;
    const log = await executeQuery({ query });
    const activityLog = JSON.parse(log)
    res.status(200).json(activityLog);
  }
}

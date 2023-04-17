import executeQuery from '../../lib/db';
import { authorizeRequest } from '../../lib/authorize-request';

export default async function handler(req, res) {

  if (!(await authorizeRequest(req, res, "admin"))) {
    console.log("Access denied to api/part-orgs user does not haver permission to access this route");
    res.status(401).send("Access Denied")
  }

  else {
    const query = `SELECT sp.*, u.email FROM service_providers sp JOIN users u ON sp.owner_id = u.id`;
    const serviceProviders = await executeQuery({ query });
    res.json(serviceProviders);
  }
}

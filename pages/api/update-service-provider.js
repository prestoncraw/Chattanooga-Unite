import executeQuery from '../../lib/db';
import authorizeRequest from '../../lib/authorize-request';

export default async function handler(req, res) {

  if (!(await authorizeRequest(req, res, "admin"))) {
    res.status(401).send("Access Denied")
  }

  else {
    const { logo_url, name, description, contact_phone_number, contact_email, website_url, address, id } = req.query;

    const update_sp_query = `UPDATE service_providers SET logo_url = ?, name = ?, description = ?, contact_phone_number = ?, contact_email = ?, website_url = ?, address = ?
      WHERE id = ?`;
    const spValues = [logo_url, name, description, contact_phone_number, contact_email, website_url, address, id];

    const serviceProviders = await executeQuery({ query: update_sp_query, values: spValues });
    res.status(200).send("Successfully updated service provider");

    const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
    const activityLogValues = [user.id, `Updated service provider: '${name}'`];

    const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });
    res.status(200).send("Successfully inserted activity log.");
  }
}

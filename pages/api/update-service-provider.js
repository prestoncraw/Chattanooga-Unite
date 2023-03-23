import executeQuery from '../../lib/db';
import getAuthUser from '../../lib/get-auth-user';
import authorizeUser from '../../lib/authorize-user';
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {

  
    const session = await getServerSession(req, res)
    if (!session) {
      res.send("Access Denied").status(401)
    }

    const { logo_url, name, description, contact_phone_number, contact_email, website_url, address, id } = req.query;
    const user = await getAuthUser(session.user);
    const isAuthorized = await authorizeUser(user, id);

    if (isAuthorized == false) {
      res.status(401).send("Access Denied")
    }

    const update_sp_query = `UPDATE service_providers SET logo_url = ?, name = ?, description = ?, contact_phone_number = ?, contact_email = ?, website_url = ?, address = ?
      WHERE id = ?`;

    const spValues = [logo_url, name, description, contact_phone_number, contact_email, website_url, address, id];
    
    if(isAuthorized == true){
      const serviceProviders = await executeQuery({ query: update_sp_query, values: spValues });
      res.status(200).send("Successfully updated service provider");
    }
   
    const activityLogQuery = "INSERT INTO activity_log (search_timestamp, email, action) VALUES(NOW(), ?, ?)";
    const activityLogValues = [user.user_email, `Updated service provider: '${name}'`];

    if(isAuthorized == true){
      const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });
      res.status(200).send("Successfully inserted activity log.");
    }
}
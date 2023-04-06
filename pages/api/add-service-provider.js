import executeQuery from '../../lib/db';
import getAuthUser from '../../lib/get-auth-user';
import authorizeUser from '../../lib/authorize-user';
import { getServerSession } from "next-auth/next";

export default async function addServiceProvider(req, res) {
 
    const session = await getServerSession(req, res)
    if (!session) {
      res.status(401).send("Access Denied")
    }
    
    const { name, email } = req.query;
    const user = await getAuthUser(session.user);
    const isAuthorized = await authorizeUser(user, 0);

    if (isAuthorized == false) {
      res.status(401).send("Access Denied")
    }

    const insert_user_query = `INSERT IGNORE INTO users (email, is_admin) VALUES (?,0)`;
    const get_new_user_id_query = `SELECT users.id FROM users WHERE users.email = ?`;

    const insert_sp_query = `INSERT INTO service_providers (name, owner_id) VALUES (?,?)`;

    const userValues = [email];
    // const spValues = [name, email];

    if(isAuthorized == true){
      const add_user = await executeQuery({query: insert_user_query, values: userValues});
      const get_new_id = await executeQuery({query: get_new_user_id_query, values: [email]})
      const new_id = JSON.parse(get_new_id)[0].id;
      const serviceProviders = await executeQuery({ query: insert_sp_query, values: [name, new_id] });
      res.status(200).send("Successfully updated service provider");
    }

    const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
    const activityLogValues = [user.id, `Added new service provider: '${name}'`];

    if(isAuthorized == true){
      const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });
      res.status(200).send("Successfully inserted activity log.");
    }
  }

import executeQuery from '../../lib/db';
import getAuthUser from '../../lib/get-auth-user';
import authorizeUser from '../../lib/authorize-user';
import { getServerSession } from "next-auth/next";
import { URLSearchParams } from 'url';

export default async function addServiceProvider(req, res) {
 
    const session = await getServerSession(req, res)
    try{
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

    if(isAuthorized == true){
      const add_user = await executeQuery({query: insert_user_query, values: userValues});
      const get_new_id = await executeQuery({query: get_new_user_id_query, values: [email]})
      const new_id = JSON.parse(get_new_id)[0].id;
      const serviceProviders = await executeQuery({ query: insert_sp_query, values: [name, new_id] });
    }

    const accessRequest = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
      audience: `${process.env.AUTH0_ISSUER}/api/v2/`
    }),
   };

    const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
    const activityLogValues = [user.id, `Added new service provider: '${name}'`];

    if(isAuthorized == true){
      const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });
    }

    const getAccess = await fetch(`${process.env.AUTH0_ISSUER}/oauth/token`, accessRequest);
    const accessData = await getAccess.json();
    const access_token = accessData.access_token;
    const userRequest = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${access_token}` },
        body: new URLSearchParams({
        email: email,
        password: process.env.NEW_USER_TEMP_PASSWORD,
        connection: 'Username-Password-Authentication'
      }),
    };
    
    const resetPasswordRequest = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
      client_id: process.env.AUTH0_CLIENT_ID,
      connection: 'Username-Password-Authentication',
      email: email
    }),
   };



    //console.log(access_token);
    const response = await fetch(`${process.env.AUTH0_ISSUER}/api/v2/users`, userRequest);
    const passwordReset = await fetch(`${process.env.AUTH0_ISSUER}/dbconnections/change_password`, resetPasswordRequest);
    console.log(passwordReset);
    const data = await response.json();
    res.status(200).json(data);

  }
  
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}
import executeQuery from '../../lib/db';
import { URLSearchParams } from 'url';
import { authorizeRequest, getAuthUserID } from '../../lib/authorize-request';

export default async function addServiceProvider(req, res) {

  if (!(await authorizeRequest(req, res, "admin"))) {
    res.status(401).send("Access Denied")
  }

  else {
    const { id, name } = req.query;;

    // get auth0 access token 
    const auth0AccessTokenRequest = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER}/api/v2/`
      }),
    };

    // GET auth0 access token
    const auth0AccessRequest = await fetch(`${process.env.AUTH0_ISSUER}/oauth/token`, auth0AccessTokenRequest);
    const auth0AccessToken = await auth0AccessRequest.json();

    if (auth0AccessRequest.status == 200) {
      console.log(`Successfully obtained access token from Auth0`);
    }
    else {
      console.error(`Error getting access token from Auth0: ${auth0AccessToken}`);
      res.status(500).send("Unable to delete user account. The system was unable to get an access token from Auth0.");
    }

    const deleteSpServicesQuery = `DELETE sp_services FROM sp_services WHERE service_provider_id = ?`;
    const deleteSpCountiesQuery = `DELETE sp_counties FROM sp_counties WHERE service_provider_id = ?`;
    const deleteServiceProviderQuery = `DELETE FROM service_providers WHERE id = ?`;
    const spValues = [id];

    const deleteSpServices = await executeQuery({ query: deleteSpServicesQuery, values: spValues });
    //Console.log("Deleting spServices");
    const deleteSpCounties = await executeQuery({ query: deleteSpCountiesQuery, values: spValues });
    //Console.log("Deleting spCounties");
    const deleteServiceProvider = await executeQuery({ query: deleteServiceProviderQuery, values: spValues });
    //Console.log("Deleting Service Provider");


    const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
    const activityLogValues = [(await getAuthUserID(req, res)), `Deleted Auth0 Service Prover ${name}`];
    const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });

    res.status(200).send("Successfully deleted service provider.");
  }

}
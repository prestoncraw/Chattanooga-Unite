import executeQuery from '../../lib/db';
import { URLSearchParams } from 'url';
import { authorizeRequest, getAuthUserID } from '../../lib/authorize-request';
import { randomBytes } from 'crypto';

export default async function addServiceProvider(req, res) {

  if (!(await authorizeRequest(req, res, "admin"))) {
    res.status(401).send("Access Denied")
  }

  else {
    const { email } = req.query;

    // getting auth0 id 
    const checkAuth0UserQuery = `SELECT auth0_id FROM users WHERE email = ?`;
    const auth0Id = await executeQuery({ query: checkAuth0UserQuery, values: [email] });

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

      const auth0DeleteUserRequest = {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${auth0AccessToken.access_token}` },
        body: new URLSearchParams({
          id: auth0Id
        }),
      };

      // DELETE (DELETE) user in auth0
      const auth0DeleteUserAccountRequest = await fetch(`${process.env.AUTH0_ISSUER}/api/v2/users/${auth0Id}`, auth0DeleteUserRequest);
    
      if (auth0DeleteUserAccountRequest.status == 204) {
        console.log(`Successfully deleted user in Auth0`);
        const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
        const activityLogValues = [(await getAuthUserID(req, res)), `Deleted Auth0 user ID: ${auth0Id}`];
        const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });
      }
      else {
        console.error(`Error deleting user in Auth0:`);
        console.error(auth0DeleteUserAccountRequest);

        res.status(500).send("Unable to delete user account. The system received an error from Auth0 when attempting to delete the account.");
      }

      // Delete user from database
      const spOwnerIdQuery = `SELECT u.*, sp.name, sp.id FROM users u JOIN service_providers sp ON sp.owner_id = u.id WHERE u.email = ?;`
      const deleteUserQuery = `DELETE FROM users WHERE email = ?`;
      const deleteUserValues = [email];
      const spOwnerIdValues = [email];

      const getOwnerId = await executeQuery({ query: spOwnerIdQuery, values: [spOwnerIdValues]})
      const deleteUserDB = await executeQuery({ query: deleteUserQuery, values: [deleteUserValues] });
      console.log("deleting user from the database.");
    }

    res.status(200).send("Successfully deleted user.");
  }


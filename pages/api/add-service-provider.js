import executeQuery from '../../lib/db';
import { URLSearchParams } from 'url';
import { authorizeRequest, getAuthUserID } from '../../lib/authorize-request';
import { randomBytes } from 'crypto';

export default async function addServiceProvider(req, res) {

  if (!(await authorizeRequest(req, res, "admin"))) {
    res.status(401).send("Access Denied")
  }

  else {
    const { name, email } = req.query;
    const emailNormalized = email.toLowerCase();
    let userID;

    // Check if user already exists
    console.log(`Checking if email: ${emailNormalized} is already registered in system.`);
    const checkUserQuery = `SELECT * FROM users WHERE email = ?`;
    const userContent = JSON.parse(await executeQuery({ query: checkUserQuery, values: [emailNormalized] }));

    // if user does not exist in database, create new user
    if (userContent.length == 0) {
      console.log(`User does not exist in system, creating new user.`);

      // first create user in Auth0
      const passwordToken = "_" + randomBytes(48).toString('hex');

      console.log(`Requesting access token from Auth0`);

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
        res.status(500).send("Unable to create user account. The system was unable to get an access token from Auth0.");
      }

      const auth0CreateUserRequest = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${auth0AccessToken.access_token}` },
        body: new URLSearchParams({
          email: emailNormalized,
          password: passwordToken,
          connection: 'Username-Password-Authentication'
        }),
      };

      // // CREATE (POST) new user in auth0
      const auth0NewUserAccountRequest = await fetch(`${process.env.AUTH0_ISSUER}/api/v2/users`, auth0CreateUserRequest);
      const auth0NewUserAccount = await auth0NewUserAccountRequest.json();

      if (auth0NewUserAccountRequest.status == 201) {
        console.log(`Successfully created user in Auth0: ${auth0NewUserAccount.user_id}`);
        const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
        const activityLogValues = [(await getAuthUserID(req, res)), `Created new Auth0 user: '${auth0NewUserAccount.user_id}'`];
        const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });
      }
      else {
        console.error(`Error creating user in Auth0:`);
        console.error(auth0NewUserAccountRequest);
        console.error(auth0NewUserAccount);

        res.status(500).send("Unable to create user account. The system received an error from Auth0 when attempting to create the account.");
      }

      // TRIGGER password reset email
      const auth0TriggerResetPasswordRequest = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.AUTH0_CLIENT_ID,
          connection: 'Username-Password-Authentication',
          email: emailNormalized
        }),
      };

      const auth0ResetPassword = await fetch(`${process.env.AUTH0_ISSUER}/dbconnections/change_password`, auth0TriggerResetPasswordRequest);

      if (auth0ResetPassword.status == 200) {
        console.log(`Successfully sent ${emailNormalized} a password reset link`);
      }
      else {
        console.error(`Error triggering password reset in Auth0:`);
        console.error(auth0ResetPassword);
      }

      // INSERT user into our database
      const insertUserQuery = `INSERT IGNORE INTO users (email, auth0_id, is_admin) VALUES (?,?,0)`;
      const insertUserValues = [emailNormalized, auth0NewUserAccount.user_id];

      const addUserDB = await executeQuery({ query: insertUserQuery, values: insertUserValues });

      const getNewUserIDQuery = `SELECT users.id FROM users WHERE users.email = ?`;
      const getNewUserID = await executeQuery({ query: getNewUserIDQuery, values: [emailNormalized] })
      userID = JSON.parse(getNewUserID)[0].id;

      // Log new user creation in activity log
      const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
      const activityLogValues = [(await getAuthUserID(req, res)), `Created new user account in system for ${emailNormalized} (id:  '${userID})'`];
      const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });

    }
    else {
      console.log(`User already exists in system. User ID: ${userContent[0].id}`);
      userID = userContent[0].id;
    }

    // Create new Service provider
    const createSPQuery = `INSERT INTO service_providers (name, owner_id) VALUES (?,?)`;
    const createServiceProvider = await executeQuery({ query: createSPQuery, values: [name, userID] });

    const getNewSPID = 'SELECT id FROM service_providers WHERE name = ? AND owner_id = ?'
    const newSPID = JSON.parse(await executeQuery({query: getNewSPID, values: [name, userID]}));

    const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
    const activityLogValues = [(await getAuthUserID(req, res)), `Added new service provider: '${name}' (ID: ${newSPID[0].id})`];
    const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });


    res.send(`Successfully created new service provider, ID: ${newSPID[0].id}`);
  }
}

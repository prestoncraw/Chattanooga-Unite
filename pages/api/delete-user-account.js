import executeQuery from '../../lib/db';
import { URLSearchParams } from 'url';
import { authorizeRequest, getAuthUserID } from '../../lib/authorize-request';

export default async function handler(req, res) {

    // require that the user requesting deletion is an admin  
    if (!(await authorizeRequest(req, res, "admin"))) {
        res.status(401).send("Access Denied");
    }

    else {
        const { email } = req.query;
        // normalize email
        const emailNormalized = email.toLowerCase();
        console.log(`Attempting to delete user: ${emailNormalized}`);

        // 1. Check that User has no existing SPs
        const userInfoQuery = `SELECT COUNT(sp.id) AS service_providers_count, u.id AS u_id, u.auth0_id as a_id
        FROM users u
        LEFT JOIN service_providers sp ON u.id = sp.owner_id
        WHERE u.email = ?
        GROUP BY u.id, u.auth0_id`;
        const userInfo = JSON.parse(await executeQuery({ query: userInfoQuery, values: [emailNormalized] }));

        console.log(userInfo);
        if (userInfo[0].service_providers_count > 0) {
            console.log(`User has ${userInfo[0].service_providers_count} existing Service Providers, please delete those first`);
            res.status(400).send(`User has ${userInfo[0].service_providers_count} existing Service Providers, please delete those first.`);
        }
        else {
            // 2. Delete user from auth0
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
            };

            console.log(`Sending delete request to auth0 URL: ${process.env.AUTH0_ISSUER}/api/v2/users/${userInfo[0].a_id}`)
            const auth0DeleteUserAccountRequest = await fetch(`${process.env.AUTH0_ISSUER}/api/v2/users/${userInfo[0].a_id}`, auth0DeleteUserRequest);

            if (auth0DeleteUserAccountRequest.status == 204) {
                console.log(`Successfully deleted user in Auth0`);
                const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
                const activityLogValues = [(await getAuthUserID(req, res)), `Deleted Auth0 user ID: ${userInfo[0].a_id}`];
                const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });
            }
            else {
                console.error(`Error deleting user in Auth0:`);
                console.error(auth0DeleteUserAccountRequest);

                res.status(500).send("Unable to delete user account. The system received an error from Auth0 when attempting to delete the account.");
            }

            // 3. Delete user from database
            const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
            const deletionInfo = JSON.parse(await executeQuery({ query: deleteUserQuery, values: [userInfo[0].u_id] }));

            res.send(`Deleted ${emailNormalized}`);

        }

    }
}

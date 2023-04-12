import { getServerSession } from "next-auth/next";
import getAuthUser from './get-auth-user';

// this function takes in 4 parameters: the request & res, and the "auth level" and target org
// Auth Level has 3 options: "admin", "sp", "open"
// "admin" means the function can only be accessed by admin users
// "sp" means the function can be accessed admins or the owner of the sp in which the function is interacting with
// "open" means the function can be accessed by any logged-in users

// This function returns a boolean, true if the request should be authorized, false otherwise
function checkSP(user, targetOrgID) {
    let didMatch = false;
    for (let i = 0; i < user.Organizations.length; i++) {
        console.log(`Checking org id ${user.Organizations[i].id} vs target ID: ${targetOrgID}`)
        if (user.Organizations[i].id == targetOrgID) didMatch = true;
    }
    return didMatch;
}


export default async function authorizeRequest(req, res, authLevel, targetOrg) {
    const authLevels = ["admin", "sp", "open"];
    const debug = false;

    try {
        // first check if a session exists
        const session = await getServerSession(req, res);
        if (!session) {
            if (debug) console.log(`Rejecting request because no session`);
            return false;
        } 


        // get current auth user
        const user = await getAuthUser(session.user);

        if (!authLevels.includes(authLevel)) {
            console.error(`Invalid authLevel provided in authorize-request: ${authLevel}\nRejecting API request.`);
            return false;
        }

        switch(authLevel) {
            case "open":
                if (debug) console.log(`Accepting request because valid user and authLevel = "open"`);
                return true;
            case "sp":
                return checkSP(user, targetOrg);
            case "admin":
                const isAdmin = Boolean(user.is_admin);
                if (debug) console.log(`Allowing request based on determined admin status: ${isAdmin}`);
                return isAdmin;
        }

    }
    catch (error) {
        console.error("An error occurred when authorizing an API request:");
        console.error(error);
        console.log("Rejecting API request due to erorr.")
        return false;
    }

}
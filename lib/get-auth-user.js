import executeQuery from './db';

export default async function getAuthUser(user) {
    const debug = false;
    // Need to get user account and associated orgs from database based off user email
    // should return: user_email: string, user_image: string, is_admin: boolean, [orgs]: [Organization]. Organization = {name: string, id: int (ADD LATER logo_url: string, slug: string)}
    // make the database query in this function, easier than securing an api endpoint
    const values = [user.email];
    
    const authUser = {
        user_email : values[0],
        user_img: user.image,  //provided by Auth0
        is_admin: false,
        Organizations: []
    }

    // Use email supplied by NextAuth session
    if (debug) console.log(`Attempting to get user profile with email: ${values[0]}`);
    
    // First see if the user has orgs attached to it (most common case)
    if (debug) console.log(`First trying User with Org search`);
    let query = `SELECT u.*, sp.name, sp.id FROM users u JOIN service_providers sp ON sp.login_email = u.email WHERE u.email = ?`;
    const userResults = await executeQuery({ query, values }, debug);

    // if result is empty, check to see that user exists in DB (could be admin with 0 orgs)
    if (debug) console.log(`User with orgs returned: ${userResults}`);
    
    if (userResults.length === 2) {
        if (debug) console.log(`User returned no associated orgs, checking to see if Admin.`);
        query = `SELECT u.* FROM users u WHERE u.email = ?`;
        const adminCheck = await executeQuery({ query, values }, debug);
        let is_admin = JSON.parse(adminCheck)[0]["is_admin"];

        if (debug) console.log(`User is_admin: ${is_admin}`);
        authUser.is_admin = is_admin;

    }
    else {
        let userResultsObj = JSON.parse(userResults);
        // console.log(userResultsObj);

        if (debug) console.log(`User is_admin: ${userResultsObj[0].is_admin}`);
        authUser.is_admin = userResultsObj[0].is_admin;

        // add organizations to authUser object
        for (let i = 0; i < userResultsObj.length; i++) {
            authUser.Organizations.push({name: userResultsObj[i].name, id: userResultsObj[i].id});
        }
    }

    if (debug) console.log(`Returning authUser object:`);
    if (debug) console.log(authUser)
    return authUser;

}

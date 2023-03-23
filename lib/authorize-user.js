import executeQuery from './db';

export default async function authorizeUser(user, targetOrg) {
    console.log(targetOrg + "This is the target org.");
    console.log(user);
    console.log("The text above is the user.");

    let isAuthorized = false; 
    console.log("Checking if user is admin...");
    if (user.is_admin){
        isAuthorized = true;
        console.log("User Authorized because admin.");
    }

   /* else{
        console.log("Checked if user is admin.");
        for (let i = 0; i < user.Organizations.length; i++){
            console.log(user.Organizations.length);
            console.log("Checking if user org matches org id.");
            if(user.Organizations[i].id == targetOrg){
                
                isAuthorized = true;
                console.log("User Authorized because organization is matched." + user.Organizations[i].id);
            }
        }
    }
*/
    console.log(isAuthorized + "Final is Authorized check.")
    return isAuthorized;

}

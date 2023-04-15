import executeQuery from '../../lib/db';
import getAuthUser from '../../lib/get-auth-user';
import authorizeUser from '../../lib/authorize-user';
import { getServerSession } from "next-auth/next";

export default async function addServiceProvider(req, res) {
 
    const session = await getServerSession(req, res)
    try{
    if (!session) {
      res.status(401).send("Access Denied")
    }
    
    const { id, name } = req.query;
    const user = await getAuthUser(session.user);
    const isAuthorized = await authorizeUser(user, 0);

    if (isAuthorized == false) {
      res.status(401).send("Access Denied")
    }

    else{
      
      
      const deleteSpServicesQuery = `DELETE sp_services FROM sp_services WHERE service_provider_id = ?`;
      const deleteSpCountiesQuery = `DELETE sp_counties FROM sp_counties WHERE service_provider_id = ?`;
      const deleteServiceProviderQuery = `DELETE FROM service_providers WHERE id = ?`;
      const spValues = [id];

      const deleteSpServices = await executeQuery({ query: deleteSpServicesQuery, values: spValues});
      Console.log("Deleting spServices");
      const deleteSpCounties = await executeQuery({ query: deleteSpCountiesQuery, values: spValues});
      Console.log("Deleting spCounties");
      const deleteServiceProvider = await executeQuery({ query: deleteServiceProviderQuery, values: spValues});
      Console.log("Deleting Service Provider");


      const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
      const activityLogValues = [user.id, `Deleted service provider: '${name}'`];

      const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });
      res.status(200).send("Successfully deleted service provider.");
    }

  }
  
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}
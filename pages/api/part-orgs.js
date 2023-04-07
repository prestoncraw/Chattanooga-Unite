import executeQuery from '../../lib/db';
import getAuthUser from '../../lib/get-auth-user';
import authorizeUser from '../../lib/authorize-user';
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {

  const session = await getServerSession(req, res)
  if (!session) {
    res.status(401).send("Access Denied")
  }
 
  const user = await getAuthUser(session.user);
  const isAuthorized = await authorizeUser(user, 0);

  if (isAuthorized == false) {
    res.status(401).send("Access Denied")
  }


  // const query = `SELECT * FROM service_providers`;
  const query = `SELECT sp.*, u.email FROM service_providers sp JOIN users u ON sp.owner_id = u.id`;
  
  if(isAuthorized == true){
    const serviceProviders = await executeQuery({ query });
    res.status(200).json(serviceProviders);
  }
}

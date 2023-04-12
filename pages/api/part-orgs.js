import executeQuery from '../../lib/db';
import getAuthUser from '../../lib/get-auth-user';
import authorizeUser from '../../lib/authorize-user';
import { getServerSession } from "next-auth/next";
import authorizeRequest from '../../lib/authorize-request';

export default async function handler(req, res) {

  // console.log(`Starting part-orgs function. \n getting auth session`);

  // const session = await getServerSession(req, res);

  // console.log(`retrieved auth session:`);

  // if (!session) {
  //   console.log("Access denied because no user present");
  //   res.status(401).send("Access Denied")
  // }

  // console.log(session);

 
  // const user = await getAuthUser(session.user);
  // const isAuthorized = await authorizeUser(user, 0);

  // if (isAuthorized == false) {
  //   console.log("Access denied to api/part-orgs user does not haver permission to access this route");
  //   res.status(401).send("Access Denied")
  // }
  // else {
  //   const query = `SELECT sp.*, u.email FROM service_providers sp JOIN users u ON sp.owner_id = u.id`;

  //   const serviceProviders = await executeQuery({ query });
  //   res.status(200).json(serviceProviders);

  // }

  if (!(await authorizeRequest(req, res, "admin"))) {
    console.log("Access denied to api/part-orgs user does not haver permission to access this route");
    res.status(401).send("Access Denied")
  }
  else {
    const query = `SELECT sp.*, u.email FROM service_providers sp JOIN users u ON sp.owner_id = u.id`;

    const serviceProviders = await executeQuery({ query });
    res.status(200).json(serviceProviders);

  }
}

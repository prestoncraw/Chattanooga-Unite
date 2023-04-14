import executeQuery from '../../lib/db';
import { authorizeRequest } from '../../lib/authorize-request';

export default async function handler(req, res) {
    const { service_id, county_id, sp_id } = req.query;

    if (!(await authorizeRequest(req, res, "admin"))) {
        console.log("Access denied to api/part-orgs user does not haver permission to access this route");
        res.status(401).send("Access Denied");
    } else {
        const testCounty = "11";
        const testService = "11";

        const countyIds = service_id.split(",");
        const serviceIds = county_id.split(",");

        const servicesResults = [];
        const countiesResults = [];

        for (const serviceId of serviceIds) {
            const existingService = await executeQuery({ query: `SELECT * FROM sp_services WHERE service_provider_id = ? AND service_id = ?`, values: [sp_id, serviceId] });
            console.log(existingService)
            if (existingService.length === 2) {
                const serv = await executeQuery({ query: `INSERT INTO sp_services VALUES (?, ?)`, values: [sp_id, serviceId] });
                servicesResults.push(serv);
                console.log(serv)
            }
        }

        for (const countyId of countyIds) {
            const existingCounty = await executeQuery({ query: `SELECT * FROM sp_counties WHERE service_provider_id  = ? AND county_id = ?`, values: [sp_id, countyId] });

            if (existingCounty.length === 2) {
                const count = await executeQuery({ query: `INSERT INTO sp_counties VALUES (?, ?)`, values: [sp_id, countyId] });
                countiesResults.push(count);
            }
        }

        res.status(200).json({ services: servicesResults, counties: countiesResults });
    }
}

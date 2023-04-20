import executeQuery from '../../lib/db';
import { authorizeRequest, getAuthUserID } from '../../lib/authorize-request';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!(await authorizeRequest(req, res, "sp", id))) {
    res.status(401).send("Access Denied")
  }

  else {
    const { logo_url, name, description, contact_phone_number, contact_email, website_url, address } = req.query;
    const spValues = [logo_url, name, description, contact_phone_number, contact_email, website_url, address, id];


    const logoQuery = `UPDATE service_providers SET logo_url = ?, updated_at = NOW() WHERE id = ?`;
    const logoValues = [logo_url, id];
    if(logo_url !== 'null'){
      const logoUpdate = await executeQuery({ query: logoQuery, values: logoValues });
    }

    const nameQuery = `UPDATE service_providers SET name = ?, updated_at = NOW() WHERE id = ?`;
    const nameValues = [name, id];
    if(name !== 'null'){
      const nameUpdate = await executeQuery({ query: nameQuery, values: nameValues });
    }

    const descriptionQuery = `UPDATE service_providers SET description = ?, updated_at = NOW() WHERE id = ?`;
    const descriptionValues = [description, id];
    if(description !== 'null'){
      const descriptionUpdate = await executeQuery({ query: descriptionQuery, values: descriptionValues });
    }

    const contactPhoneNumberQuery = `UPDATE service_providers SET contact_phone_number = ?, updated_at = NOW() WHERE id = ?`;
    const contactPhoneNumberValues = [contact_phone_number, id];
    if(contact_phone_number !== 'null'){
      const contactPhoneNumberUpdate = await executeQuery({ query: contactPhoneNumberQuery, values: contactPhoneNumberValues });
    }

    const contactEmailQuery = `UPDATE service_providers SET contact_email = ?, updated_at = NOW() WHERE id = ?`;
    const contactEmailValues = [contact_email, id];
    if(contact_email !== 'null'){
      const contactEmailUpdate = await executeQuery({ query: contactEmailQuery, values: contactEmailValues });
    }

    const websiteUrlQuery = `UPDATE service_providers SET website_url = ?, updated_at = NOW() WHERE id = ?`;
    const websiteUrlValues = [website_url, id];
    if(website_url !== 'null'){
      const websiteUrlUpdate = await executeQuery({ query: websiteUrlQuery, values: websiteUrlValues });
    }

    const addressQuery = `UPDATE service_providers SET address = ?, updated_at = NOW() WHERE id = ?`;
    const addressValues = [address, id];
    if(address !== 'null'){  
      const addressUpdate = await executeQuery({ query: addressQuery, values: addressValues });
    }

    //const update_sp_query = `UPDATE service_providers SET logo_url = ?, name = ?, description = ?, contact_phone_number = ?, contact_email = ?, website_url = ?, address = ?, updated_at = NOW() 
    //  WHERE id = ?`;

    //const serviceProviders = await executeQuery({ query: update_sp_query, values: spValues });
    console.log(`User ID: ${await getAuthUserID(req, res)}`);
    

    const activityLogQuery = "INSERT INTO activity_log (action_timestamp, user_id, action_description) VALUES(NOW(), ?, ?)";
    const activityLogValues = [(await getAuthUserID(req, res)), `Updated service provider: '${name}'`];

    const activityLog = await executeQuery({ query: activityLogQuery, values: activityLogValues });

    res.status(200).send("Successfully updated service provider");
  }
}

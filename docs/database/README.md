# Database Overview 
![database overview](/docs/database/Chattanooga%20Unite%20DB.png)
*Chattanooga Unite Database Overview*

Please find a description of the tables and their functions below.

## users
This table is used to information about the user accounts logging in to the dashboard section of the site. Note that there is no password column as those are stored in Auth0, this table simply provides additional context about those users. There should be a 1:1 relation of items in the ```users``` table and users in the Auth0 service. 

| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| id | int | Primary key; id for each user account | no |
| email | varchar | email address used to log in with account (does not have to match SP contact email) | no |
| name | varchar | name of user (first and last), optionally can be name of organization if not individual user | no |
| is_admin | bool | determines whether the account has admin permissions on site | no |
| created_at | datetime | when user account was created | no |
| last_login | datetime | when user last logged in to website | no |


## service_providers
This table stores all core information about a service provider. In general, this is all information that is intended to be displayed on the Chattanooga Unite website. **We envision this table growing as the capabilities of the org pages are potentially expanded.**

| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| id | int | Primary key; id for each Service Provider | no |
| logo_url | varchar | relative url retrieve logo from image serving function | yes |
| name | varchar | name of the service provider | no |
| description | text | SP owner provided description of their organization | yes |
| contact_phone_number | varchar | public phone number of organization | yes |
| contact_email | varchar | public email address of organization | yes |
| website_url | varchar | link to organization's separate website if they have one | yes |
| address | varchar | public address of organization | yes |
| owner_id | int | Foreign key (```users.id```); reference to the organization owner's ```users``` account | no |
| url_slug | varchar | slug used for paths to org on the site | no |
| created_at | datetime | when the organization was created, automatically populated | no |
| updated_at | datetime | the last time any properties of the service provider were changed | no |

## county
This table is used to act as the record for each county that Organizations within Chattanooga Unite service.
| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| id | int | Primary key; id used to reference each county | no |
| name | varchar | name of the county | no |

> In the future it may be useful to add a state column as some county names exist in multiple states that Chattanooga Unite serves.

## service
This table is used to act as the record for each service that Organizations within Chattanooga Unite offer.
| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| id | int | Primary key; id used to reference each service | no |
| title | varchar | title of the service | no |

## sp_counties
This table is used to link ```service_providers``` with the ```county```s they serve. 

| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| service_provider_id | int | Foreign key (```service_provider.id```); id of service provider that serves that county | no |
| county_id | int  | Foreign key (```county.id```); id of a county they servce | no |


## sp_services
This table is used to link ```service_providers``` with the ```service```s they offer. 

| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| service_provider_id | int | Foreign key (```service_provider.id```); id of service provider that offers that service | no |
| service_id | int  | Foreign key (```service.id```); id of a service they provide | no |


## sp_search_metrics
This table provides the basis for tracking metrics on the site. As detailed in the provided Next Steps document, we think this setup works for additional planned metrics, but may need to be expanded depending on everything that ends up being tracked. 
| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| search_id | int | Primary key; key used to track each individual search | no |
| search_timestamp | datetime | when the search was performed | no |
| county_id | int | Foreign key (```county.id```); What county was searched for. If all counties searched for result is **```NULL```** | no |
| service_id | int | Foreign key (```service.id```); What service was searched for. If all services searched for result is **```NULL```** | no |
| found_match | bool | Whether or not the search was able to match service providers with the query | no |

## sp_logos
This table is used to persist the service provider logo images in the database. We know this might not necessarily be best practice for storing web images, but given the constraints of the project, this avoids additional costs as opposed to using a more preferable method like S3.

| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| id  | int | Primary key; id of logo | no |
| sp_id | int | Foreign key (```service_providers.id```); Id of SP the logo belongs to | no |
| image | [blob](https://dev.mysql.com/doc/refman/8.0/en/blob.html) | Blob of image. Blob is converted to servable file in API | no |
| filename | varchar | name of file | no |
| upload_timestamp | datetime | when file was uploaded | no |

## activity_log
This table is used to track actions related to editing ```service_providers```.
| Column | Datatype| Description | Optional? |
| --- | --- | --- | --- |
| user_id | int | Foreign key (```users.id```); id of user who performed activity | no |
| user_is_admin | bool | whether or not user performed action as admin | no |
| action_type | varchar | What type of action was performed (e.g. "Edit SP", "Create SP", "Delete SP") | no |
| action_description | text | Full log of what was changed. (e.g. "Edited SP Aid and Assist (id: 12) description from 'old description' to 'new description') | no |
| action_timestamp | datetime | Timestamp of when the action was executed | no |

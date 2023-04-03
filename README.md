<p align="center">
    <picture>
      <img src="https://user-images.githubusercontent.com/43215443/229606976-a61ed091-b2d6-4a07-a22b-d5403034b629.jpg" height="128">
    </picture>
    <h1 align="center">Chattanooga Unite / Senior Capstone Project</h1>
</p>

This project is focused on rebranding the Chattanooga area Veterans Resource Center's [existing website](https://setnvets.org) as well as adding additional functionality to the website.

## Features

### Providing Vital Information to Veterans
- Find Help Page (```/find-help```) provides organizations that can help per county and need.
- Display helpful information veterans may need (```/dd214```, ```/key-numbers```, ```/contact```)
- Provide information about Chattanooga Unite and how to help out (```/```, ```/get-involved```)

### Designed with Accessiblility in Mind
- All public-facing pages (i.e. everything not ```/dashboard/...```) are designed to be able to be easily navigable for the average user (older, veteran)
- All public-facing pages are fully navigable with a keyboard <kbd>TAB</kbd> and thus should work with most screen readers
- Pages are designed to be fully mobile compatible

### Giving Veteran Servicing Organizations a Presence on the Web
- Organizations (also called Service Provider) are able to advertise their services and be matched with veterans in need (```/find-help```)
- Each organization signed up with Chattanooga Unite receives a custom (automatically generated) public page (```/org/[id]```) to provide additional information about what they do and how to get in contact with them.
- Organizations are able to update their own information through the dashboard (```/dashboard```)

### Admin Suite of Functionality to support website operations
- Admin users are able to have full control over Organizations through the website (```/dashboard```)
    - Create new organizations. (```/dashboard/admin/orgs/create```)
    - Edit information about existing organizations. (```/dashboard/org/[id]```)
    - Change the owner of existing organizations. (```/dashboard/org/[id]```)
    - View all organizations in table format. (```/dashboard/admin/orgs/create```)
    - Delete organizations. (```/dashboard/admin/orgs```)
- View various metrics about searches from the find-help page (```/dashboard/admin/metrics```)
- View log of organization and admin activity (```/dashboard/admin/activity```)

## Technologies
This application utilizes a number of technologies to achieve its functions.
- [NextJS](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/) - User Authorization
- MySQL
- [Auth0](https://auth0.com/) - User Authentication; Login System 


## Developing
### Environment Setup

First install the most recent LTS version of [Node.JS](https://nodejs.org/en) and npm. Clone this repo to your development environment. 

Run ```npm install``` in the root directory of the repository to install required dependencies.

Create a ```.env``` file in the root directory using the provided example file. 
> _NOTE:_  If this is the first setup, please see [database setup](#database-setup) to populate information in the database before proceeding.

Then run ```npm run dev``` to start the dev server (Do not use this for the production deployment, see [deploying](#deploying)). Navigate to http://localhost:3000 to browse the contents of the site.

### Database Setup
The database schema and initial contents are able to be easily replicated via a provided script.

To run the script, simply run ```npm run gen-sql``` in the terminal. This script will install the necessary dependencies and create the directories for the script's output. After the script completes, two files will be output: ```./utils/out/schema.sql``` and ```.utils/out/rejected.csv```

The ```schema.sql``` file can be run in the database to replicate its expected contents, while ```rejected.csv``` lists all the service providers that will not be added to the database with the schema file because they did not have all the required information.

**Need way to create admin users in setup** // TBD


## Deploying
A couple steps differ when deploying this application to production from the development deployment. They are listed below:
- Use ```npm run build``` and then ```npm run start``` to start the production server instead of ```npm run dev```.
- An Auth0 account owned by Chattanoga Unite will need to be created and its credentials supplied in the ```.env``` file.  

## Missing Features
There a few features that we think may be required later, but not often enough to dedicate time to build it into the core website. 

### Adding new admin users
### Adding service categories and counties
### Updating static information on the site
To do this, code will have to manually be edited in its respective file (```pages/[path].js```) and the site [redeployed](#deploying).

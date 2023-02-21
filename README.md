# Chattanooga Unite / Senior Capstone Project

This project is focused on rebranding the Chattanooga area Veterans Resource Center's [existing website](https://setnvets.org) as well adding additional functionality to the website.



### Developing
#### Next.JS Setup
To run the application, simply run ```npm install ``` in the root directory of the repository.  

Then run ```npm run dev``` to start the dev server.

Navigate to http://localhost:3000 to browse the contents of the site.

#### Database Schema
The database schema and initial contents are able to be easily replicated via code.

To run the script, simply run ```npm run gen-sql``` in the terminal. This script will install the necessary dependencies and create the directories for the script's output. After the script completes, two files will be output: ```./utils/out/schema.sql``` and ```.utils/out/rejected.csv```

The ```schema.sql``` file can be run in the database to replicate its expected contents, while ```rejected.csv``` lists all the service providers that will not be added to the database with the schema file because they did not have all the required information.

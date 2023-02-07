# Chattanooga Unite / Senior Capstone Project!

This project is focused on rebranding the Chattanooga area Veterans Resource Center's [existing website](https://setnvets.org) as well adding additional functionality to the website.



### Developing
#### Next.JS Setup
To run the application, simply run ```npm install ``` in the root directory of repo.  

Then run ```npm run dev```

Navigate to http://localhost:3000

#### Database Schema
The database schema and initial contents are able to be easily replicated via code.

First install the dev dependency ```npm i -D csv``` and then run ```node utils/gen-sql.js``` and two files will be output: ```./utils/out/schema.sql``` and ```.utils/out/rejected.csv```

The ```schema.sql``` file can be run in the database to replicate its expected contents, while ```rejected.csv``` lists all the service providers that will not be added to the database with the schema file because they did not have all the required information.

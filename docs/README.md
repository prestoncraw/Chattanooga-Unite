# Chattanooga Unite Senior Capstone Project Documentation

This directory is intended to serve as the primary record for all project documents/information being passed to the next group inheriting this project. 

## Project background
link to project document

This project was originally inherited from a previous group, but as they ran into many issues and we weren't particularly satisfied with how the project was left to us, we decided to start this project from stract. The documents from the first group are available under [Fall 2022 Documents](/docs/Fall%202022%20Documents/), but you will notice that we do not rely on any of their work for the project.

## Project Architecture Overview 

### Website Overview
The website consists of two parts: the public "front-end" part, and the admin dashboard.

#### Front end
~~talk about individual components, accessibility, etc~~

#### Admin dashboard

### Database
Please see [database](/docs/database/README.md) for an in-depth explanation of the database.

### Auth0
Rather than worrying about developing, securing, and hosting our own login provider, we decided that it would be best to use a reliable third-party solution. We decided that [Auth0](https://auth0.com) fit the projects needs and budget (free). Please see [Auth0.md](/docs/Auth0.md) for the entire setup instructions for this service.


## Next Steps
While we believe the project is in a production-usable state, as is the nature with web applications, there is always room for improvements and new features. Below we list some potential next steps based on our understanding of the needs of the project.

### Find-help / Organization Page improvements
- Allow more information to be stored on organizations and displayed on their public page. Rich text editor, maps, etc.
- Implement some algorithm so that all SPs are fairly shown (random?). Currently its always tied to org id.

### Enhanced metric tracking
- Overall site traffic is not tracked 
- using ```sp_search_metrics.search_id``` to persist a users traffic, i.e. how many orgs do they click on from an individual search

### Site maintainability improvements
- Ability to add new admin users
- Ability to add new counties and service categories (will need to change DB and parts of code)
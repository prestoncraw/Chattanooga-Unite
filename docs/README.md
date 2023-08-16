# Chattanooga Unite Senior Capstone Project Documentation
This directory is intended to serve as a primary record for all project documents/information being passed to the next group inheriting this project. 

## Project background
This project was originally inherited from a previous group, but as they ran into many issues and we weren't particularly satisfied with how the project was left to us, we decided to start this project from scratch.

## Project Architecture Overview 

### Website Overview
The website consists of two parts: the public "front-end" part, and the admin dashboard.

### Front end
Most pages on the public side of this site are fairly simple, static pages, however there is one page in particular that is worth noting. The **Find Help page** (```/find-help```) allows users to input a few parameters and locate service providers



### Admin dashboard

### Database
Please see [database documentation](/docs/database/README.md) for an in-depth explanation of the database.

### Auth0
Rather than worrying about developing, securing, and hosting our own login system, we decided that it would be best to use a reliable third-party solution. We decided that [Auth0](https://auth0.com) fit the projects needs and budget (free). Please see [Auth0.md](/docs/Auth0.md) for the entire setup instructions for this service.


## Initial Project Setup
### Git Repository
This directory (```/Chattanooga-Unite```) is a git repository with our entire contribution history. Using git is optional for this project, but we would recommend you take this repository and upload it to Github as that method worked well for us.

### Environment Setup

First install the most recent LTS version of [Node.JS](https://nodejs.org/en) and npm. Clone this repo to your development environment. 

Run ```npm install``` in the root directory of the repository to install required dependencies.

Create a ```.env``` file in the root directory using the provided example file. 
> _NOTE:_  You will have to be connected to the school's VPN to access the development database

Then run ```npm run dev``` to start the dev server (Do not use this for the production deployment, see [deploying](#deploying)). Navigate to http://localhost:3000 to browse the contents of the site.

### .env file

### Project Credentials
- Database
- Urls


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

### API Endpoint improvements
- Performance (passive logging)
- SQL Injection threats from query parameters
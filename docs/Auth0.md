# Auth0 Integration Overview
Auth0 serves as the primary authentication service in this website. Auth0 is used for the log in functionality and connecting the log in email address to our user table in the database.

Authorization is done by our own custom code, taking the email given to us by Auth0 and checking roles in our database.

## Setup Instructions

First create a free Auth0 account on [Auth0's website](auth0.com).

Once logged in with your account, create a new tenant. 

> Keep in mind the tenant domain cannot be changed and will be visible to the end user. 

Select **Applications** on the left side menu. And then select the **Create Application** button. You will need to create two applications using this process.

First create the application that will deal with the website's log in authenication. Occasionally the name of the application will be visible to the user in things like emails from Auth0. We used the name "Chattanooga Unite Dashboard" but feel free to name it whatever you would like.

Select **Regular Web Application** for the application type and create the application. You may skip the featured quickstart and jump to the **settings** tab.

There's a number of customization options on this screen which we recommend you utilize, but for now we will skip those.

Here you will need to copy a number of important variables. Find the **Domain**, **Client ID**, and **Client Secret**. You will need to copy these values to a ```.env``` file at the root of the project directory. 

```
AUTH0_CLIENT_ID=<your client id>
AUTH0_CLIENT_SECRET=<your client secret>
AUTH0_ISSUER=<your auth0 issuer>
```
Your ```.env``` file should now look similiar, but with the brackets replaced with your actual values.

Scroll down to the **Application URIs** section. You will need to specify **Allowed Callback URLs**. 

If you are setting this environment up for development, you may give a localhost value (```http://localhost/api/auth/callback/auth0```). If this environment is for production, supply the actual domain name using the secure protocol (```https://<domain.tld>/api/auth/callback/auth0```). 


Now go back to the **Applications** tab and create another application which will deal with creating and deleting user accounts in Auth0. We called this application "Chattanooga Unite User Service". This application will need to be a **Machine to Machine Application**

This will prompt you to select an API, select **Auth0 Management API**. You will need to grant this API the following permissions: ```read:client_grants, read:users, update:users, delete:users, create:users```.

Again you will need to copy the **Client ID** and **Client Secret**. Store these in the same ```.env``` file.
```
AUTH0_MANAGEMENT_CLIENT_ID=<your client id>
AUTH0_MANAGEMENT_CLIENT_SECRET=<your client secret>
```
> Since the domain remains the same, we don't have to copy it again. 

## Application Interactions



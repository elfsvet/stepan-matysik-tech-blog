# Stepan Matysik's Tech Blog
GIVEN a CMS-style blog site

WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

WHEN I click on the homepage option
THEN I am taken to the homepage

WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in

WHEN I choose to sign up
THEN I am prompted to create a username and password

WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site

WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password

WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out

WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post

WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard

WHEN I click on the logout option in the navigation
THEN I am signed out of the site

WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments


first steps: 
- npm init -y
add .gitignore with node_modules and .DS_Store and .env
Write "start": "node server.js"
check "main" : "server.js"
create server.js
create  folders models,routes and config and db.
- run : npm install express sequelize mysql2
<!-- we installing multiple libraries in one step. -->
after creating of the database
run : mysql -u root -p
and : source db/schema.sql

to check if all went right run in mysql: show databases;
and quit mysql: quit;

- create the database connection create file connection in config folder. We would need to call Sequelize connection constructor.

- protect sensitive information by installing dotenv package.
npm i dotenv

- create .env file and add  credentials(name of database, username,password)

we need to load them into the connection.js file.

- create the user model
- create the index.js in models
- create CRUD api routes
give the user some REST(Representational State Transfer) RESTful APIs
create 5 routes to perform CRUD operations.

- Hook up the server
create index.js in routes/api folder
- create index.js in the routes folder.

- set up the server.js file
- Test and Refine the User Routes

in insomnia try to crud requests.

 - protect the passwords
In user-routes.js, update the .findAll() method in the GET to exclude the password column
attribute: {
    exclude: ['password']
}

The steps we followed in this lesson are the same ones developers take regularly:

Model the data.

Set up API routes to work with that data.

Test the routes to make sure everything works as intended.

Repeat with new model.

Now, we haven't completed that last step yet, but we will!

To recap, we accomplished the following in this lesson:

Set up the application to use Sequelize to manage SQL data.

Used environment variables to protect the sensitive data.

Created a user table using Sequelize models.

Created all of the server endpoints using RESTful API standards to work with the user model’s data.


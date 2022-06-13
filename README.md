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

- use bcrypt package in node js
bcrypt is an adaptive hash function based on a cryptographic algorithm that provides additional security measures like a salt to protect against certain attack strategies. To learn what a salt is and how bcrypt works, refer to
- npm i bcrypt

Can you think of a reason why it is recommended to run the password hashing step as an async function although a sync version is also available?

The hashing done by bcrypt is CPU intensive, so the sync version will block other functions from running, effectively stalling the application until the hashing process has been completed.

- use the hooks to hash the password
Thankfully, we can use special Sequelize functions called "hooks" in the model. Also known as "lifecycle events", hooks are functions that are called before or after calls in Sequelize.

Good thing there is another method to handle async functions that will make the code more concise and legible. We will use the async/await syntax to replace the Promise.

Let's replace the function above using Promises with the new version of the exact same functionality with the async/await syntax,

- Hash the Password During the Update
- we will need to add the option { individualHooks: true }.
- Create the Login Route for Authentication
we need to usee post for login not get.

In this case, a login route could've used the GET method since it doesn't actually create or insert anything into the database. But there is a reason why a POST is the standard for the login that's in process.

A GET method carries the request parameter appended in the URL string, whereas a POST method carries the request parameter in req.body, which makes it a more secure way of transferring data from the client to the server. Remember, the password is still in plaintext, which makes this transmission process a vulnerable link in the chain.

post new(/login)

http://localhost:3001/api/users/login with body 
{
	"email":"stepan@gmail.com",
	"password":"stepan1234"
}

- Compare the Hashed Password
Why is async mode recommended over sync mode?

If you are using bcrypt on a simple script, using the sync mode is perfectly fine. However, if you are using bcrypt on a server, the async mode is recommended. This is because the hashing done by bcrypt is CPU intensive, so the sync version will block the event loop and prevent your application from servicing any other inbound requests or events. The async version uses a thread pool which does not block the main event loop.

In Object Oriented Programming, an instance method returns or makes use of information (i.e., properties) specific to that particular object. (Remember that objects generated from classes are instances of the class.)

As we can see, the response from the application has verified the user's credentials and logged in to the application successfully.

In this lesson, you learned how to do the following tasks:

- Incorporate a password hashing algorithm package to encode stored user passwords.

- Intervene during the create and update operations using hooks in the model.

- Use instance methods to compare user passwords in the login process.

- Create a login route for authentication.



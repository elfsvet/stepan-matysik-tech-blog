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


- Create the Post Model

- models/sometimes know as schemas/ orm - speed up : reduce mistakes, reduce amount of code and protect database from vulnerabilities.
benefits of models 
auto-building of tables
data validation and restriction
create relationships among data
it's all written in JS
models many-to-many relationships, migrations, hooks, instance methods, static methods
- create post model
- require post model in index.js inside the models folder
auto generated columns created at and updated_at not null.

- Define Model Associations

First, think about how the relationship between the User and the Post model will work. A user can make many posts. But a post only belongs to a single user, and never many users. By this relationship definition, we know we have a one-to-many relationship.

in models folder in index.js

Previously, we created the associations between models on the database layer in the schema using SQL. In that case, we had to drop the table and then create it again so the associations would be implemented.

Do we have to do the same drop/create process to the tables because we created the associations on the application layer this time?

Yes, we do. These association changes will not take affect in the User table, because there isn't a way to make changes to the table dynamically. We will need to drop the table and create a new one in order for the associations to take affect. But Sequelize does have a way to dynamically drop the table and create a new one to overwrite existing tables and establish the new associations.

Now we are ready to test our Post model. The next step will be to build our post routes.

- Create API routes for the Post Model

Are you starting to notice a pattern in how we're building application?

This is great for instructional learning, so we can demonstrate and test the application iteratively. However, this isn't necessarily the most efficient way to develop a web app. Many seasoned developers would argue that it makes more sense to build each section of the app at a time to lessen the cognitive jumping around. For instance, creating all the models at once could help inform the data associations and relationships better. This makes a degree of sense due to the fact that much of the code between these files is quite similar. The same goes for the routes.

- Get All the Posts
Why did we include the User model for the post-routes?

In a query to the post table, we would like to retrieve not only information about each post, but also the user that posted it. With the foreign key, user_id, we can form a JOIN, an essential characteristic of the relational data model.

Why do we get created_at and username columns in this query since they are not in the Post model?

The created_at column is auto-generated at the time a post is created with the current date and time, thanks to Sequelize. We do not need to specify this column or the updated_at column in the model definition, because Sequelize will timestamp these fields by default unless we configure Sequelize not to.

One more step is needed to ensure that the post routes have been properly set up. What must we do with the routes we create in post-routes.js so they are exposed properly with the correct URL path? That's right—we need to assign the postRoutes to the Express.js router.

mysql -u root -p
After that, type your MySQL password to access the mysql shell.

Once the mysql shell is connected to the mysql server, we need to connect to the correct database. Type in the following command into the mysql command prompt:

mysql> use just_tech_news_db;
The following message will confirm this command was successful:

Database changed
Into the mysql prompt, type the following statements to insert an entry into the post table:

INSERT INTO post (title, post_url, user_id, created_at, updated_at)
VALUES ("Taskmaster goes public!", "https://taskmaster/press", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

- GET a Single Post

In the Promise, we included an error message in case the id wasn't found. The 404 status message relays what error type to the client?

The 404 status code identifies a user error and will need a different request for a successful response.

get http://localhost:3001/api/posts/1

- Create a Post

Do you notice any key distinctions between the request made above and the SQL INSERT INTO query that we made in the MySQL shell?

We did not assign the created_at or updated_at fields in req.body.

Can you reason why this is the case? In the SQL shell when we made our first seed, we were making a query directly to the MySQL database. Therefore if any constraints on any field are not fulfilled, an error will occur. Remember, the created_at and updated_at constraints stated that these fields cannot be empty or NOT NULL.

Then why does this constraint error not occur in the request made through Insomnia?

This is because of what Sequelize does for our application under the hood. The values for these fields are assigned automatically with CURRENT_TIMESTAMP values, which allows us to not include it on the request.

We are almost finished with this lesson and we only have two more routes to go!

- Update a Post's Title

- Delete a Post

In this lesson, we accomplished the following:

We used an ORM to translate the object model into a relational data model using associations.

When defining the Post model, we included references to the primary key and then defined the foreign key relationship with the model associations.

When defining the routes for the post table, we used key properties like include in the database requests, to add fields from associated tables like the post's username.

- Create the Comment Model

- Create the API Routes

- Update the Routes to Include Comments
in POST api

- deploy to the heroku (we will do it at the end )

In this lesson alone, you accomplished the following:

Created a new Comment model that stored user id's and post id's.

Established multiple belongsTo and hasMany relationships.

Created routes that allow for getting, creating, and deleting comments.

Updated existing routes to include additional models.

Deployed a MySQL app to Heroku using the JawsDB add-on.

Looking back on the module as a whole, you also achieved the following:

Learned what an ORM is and how ORMs like Sequelize help manage tricky SQL queries.

Modeled data in JavaScript.

Created associations to connect multiple types of data.

Built on your existing knowledge of Express.js to create a robust REST API with multiple endpoints.

Used ES6 async/await functionality to handle asynchronous code.

Protected user passwords by hashing with the bcrypt package.

Set up the groundwork for user authentication.

Performed raw SQL queries using Sequelize literals.

- We need MVC paradigm Model-View-Controller
separation of concerns 
constroller(requests/DATA/ Express.js will tie it all together and handle the functionality)|model(business objects/MySQL database through Sequelize)|view(UI and interaction/ Handlebars.js will dynamically generate HTML)

Structure your application following the Model-View-Controller (MVC) paradigm.

Modularize your code into separate folders for your Models, View, and Controllers to enforce separation of concerns.

Render dynamic HTML for your views using the Handlebars.js template engine.

Implement user authentication.

Configure Heroku so that you can deploy your application using a MySQL database.

Render dynamic HTML using the Handlebars.js template engine.

Explain and implement MVC modularization in a full-stack web application.

Configure Heroku for deployment of an application using MySQL.

Explain the interaction between the Model, View, and Controller.

Explain separation of concerns and its benefits.

Implement user authentication.

- Set Up the Template Engine
There are many template engines available, and their concepts and syntax are all pretty similar. To learn more, see the list of Express.js-compliant template engines that the Express.js team maintains (https://github.com/expressjs/express/wiki#template-engines).

- Set Up the Handlebars Template Engine

npm install express-handlebars


- Introducing the Model-View-Controller Paradigm

Why does Handlebars.js require a views folder? Why can't this be named something else? The reason for this is that Handlebars.js is meant to fit into an existing architectural paradigm called Model-View-Controller, or MVC.

MVC is a popular software-design pattern that organizes your app into the three following separate concerns:
MVC - architectural design pattern

Models: the core data of your app

Views: the UI components, such as your HTML layouts

Controllers: the link between your models and views

- Set Up MVC

Previously, we used res.send() or res.sendFile() for the response. Because we've hooked up a template engine, we can now use res.render() and specify which template we want to use. In this case, we want to render the homepage.handlebars template (the .handlebars extension is implied). This template was light on content; it only included a single <div>. Handlebars.js will automatically feed that into the main.handlebars template, however, and respond with a complete HTML file.

- View the Homepage

- Create the Homepage Template
the template engine allows us to empower htmp with JS power.

- use serialize get method
- use helpers like {{#each}}{{/each}}

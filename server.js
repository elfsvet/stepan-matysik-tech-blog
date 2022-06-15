const express = require('express');
// collected everything for us and packaged them up for server.js to use.
// routes now in different folder, we renamed it to controllers.
const routes = require('./controllers');
// Also, note we're importing the connection to Sequelize from config/connection.js
const sequelize = require('./config/connection');
const path = require('path');
// express-handlebars
const exphbs = require('express-handlebars');
// handlebars
// const hbs = exphbs.create({});

// To implement the helper, we need to start telling Handlebars.js about the helpers file. Open server.js and import the helper functions with the following line:
const helpers = require('./utils/helpers');

// Then pass the helpers to the existing exphbs.create() statement as the following code shows:

const hbs = exphbs.create({ helpers });
// set up express.js session and connect the session to our Sequelize database.
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    // Super secret secret" should be replaced by an actual secret and stored in the .env file.
    secret: 'Super secret secret',
    // cookie object empty
    // !If we wanted to set additional options on the cookie, like a maximum age, we would add the options to that object.
    // sets a idle timeout for the session to logout after the time
    cookie: {maxAge: 1 * 60 * 60 * 1000 }, // 1 hours
    // resave set false forses back to be save int the session store
    resave: false,
    // save unitialialized true
    saveUninitialized: true,
    // store new SequelizeStore
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.

app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
// if we change the force  from false to true it will DROP TABLE IF EXISTS This allows the table to be overwritten and re-created.
// but we don't need to drop it every time so we will change it back to false if we don't need to erase the tables

// we use the sequelize.sync() method to establish the connection to the database. The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it for you!

// The other thing to notice is the use of {force: false} in the .sync() method. This doesn't have to be included, but if it were set to true, it would drop and re-create all of the database tables on startup. This is great for when we make changes to the Sequelize models, as the database would need a way to understand that something has changed. We'll have to do that a few times throughout this project, so it's best to keep the {force: false} there for now.

sequelize.sync({ force: false })
.then(() => {
    app.listen(PORT, ()=>console.log(`Now listening on port: 🌎 http://localhost:${PORT} 🌎`))});
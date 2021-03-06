// When we learned about JavaScript constructors and classes, we also learned how to make the application's dataflow consistent when we create a blueprint of how certain data should look and be interacted with. When we create a SQL table, we perform a similar action. We provide names for what columns the data will go into and what types of data we expect for that column.

// Sequelize goes a step further by taking object-oriented JavaScript concepts and applying them to how we set up the SQL tables. This is done by using Sequelize's model class where, essentially, we create our own JavaScript class and define the columns, data types, and any other rules we need the data to adhere to.

// This class will serve as a layer between the API and the database and will handle all transactions of data between the two. As we'll see, it'll provide a lot more flexibility and functionality that we would otherwise have to create on our own! Let's jump in.
//  API | MODELS is in between | DATABASES

// https://sequelize.org/v5/manual/models-definition.html
// imported the model CLASS and datatypes OBJECT from sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Next, import bcrypt into the User.js file by adding the require expression at the top of the file, as shown in the following code:
const bcrypt = require('bcrypt');

// create our User model
// This Model class is what we create our own models from using the extends keyword so User inherits all of the functionality the Model class has.
// create our User model
class User extends Model {
    // set up method to run on "instance" data (per user) to check password 13.2
    //! need to write async functions here to use on server
    // async in the same time. not stopping another processes
    async checkPassword(loginPw) {
      const response = await bcrypt.compare(loginPw, this.password);
      return response;
    }
  }

// define table columns and configuration
// Once we create the User class, we use the .init() method to initialize the model's data and configuration, passing in two objects as arguments. The first object will define the columns and data types for those columns. The second object it accepts configures certain options for the table. 
User.init(
    // TABLE COLUMN DEFINITIONS GO HERE
    {
        // define an id column
        // Now we've set up the User model to have four columns. If we didn't define the model to have a primaryKey option set up anywhere, Sequelize would create one for us, but it's best we explicitly define all of the data. You never know who else is going to look at your code and try to understand your work!

        // Each column's definition gets its own type definition, in which we use the imported Sequelize DataTypes object to define what type of data it will be. We can also apply other options found in SQL, such as allowNull, which is NOT NULL in SQL, and autoIncrement, which is AUTO INCREMENT in MySQL.
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                // Sequelize's built-in validators are another great feature. We can use them to ensure any email data follows the pattern of an email address (i.e., <string>@<string>.<string>) so no one can give us incorrect data. There are a lot of prebuilt validators we can use from Sequelize, but you can also make your own, so it's worth reading through the documentation to see what's available to you.
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least four characters long
                len: [4]
            }
        },

    },

    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    {
        //   According to the Sequelize documents, to use hooks, we must pass in another object labelled hooks to the User.init() function.
        //   The nested level of the object inserted is very important. Notice that the hooks property was added to the second object in User.init().
        // the hooks have semantic names that declare when they can be called. In our case, we need a hook that will fire just before a new instance of User is created. The beforeCreate() hook is the correct choice.
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            //  before we create a user
            async beforeCreate(newUserData) {

                //The async keyword is used as a prefix to the function that contains the asynchronous function. await can be used to prefix the async function, which will then gracefully assign the value from the response to the newUserData's password property. The newUserData is then returned to the application with the hashed password.

                // Comparing these two functions side by side, we can see that the async/await version is much easier to read with only a single newUserData variable that is input and output after the password hashing modification. Now the async function looks like a plain old JavaScript expression.
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            // before update a user
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;
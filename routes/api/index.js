// serve as a means to collect all of the API routes and package them up for us

// While this is a small file, we're keeping the API endpoints nice and organized while allowing the API to be scalable. At some point, we'll add more API endpoints and use this file to collect them and give them their prefixed name. Remember how in user-routes.js we didn't use the word users in any routes? That's because in this file we take those routes and implement them to another router instance, prefixing them with the path /users at that time.

// Now let's create another file to collect the packaged API routes. This may seem like a lot of files that do very little, but the ultimate idea is that if we were to scale this application, staying organized from the outset is a lot easier than reorganizing later on when there's more code to move around.

const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;
const router = require('express').Router();

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// gets the homepage with all posts and comments
router.get('/', (req, res) => {
  console.log(req.session);
  // Previously, we used res.send() or res.sendFile() for the response. Because we've hooked up a template engine, we can now use res.render() and specify which template we want to use. In this case, we want to render the homepage.handlebars template (the .handlebars extension is implied). This template was light on content; it only included a single <div>. Handlebars.js will automatically feed that into the main.handlebars template, however, and respond with a complete HTML file.
  // The res.render() method can accept a second argument, an object, which includes all of the data you want to pass to your template. In home-routes.js, update the homepage route to look like the following code:
  Post.findAll({
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // pass a single post object into the homepage template
      // get method in sequelize does serialize the data like res.json did automatically in API routes.
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
         //  variables that are passed to view templates are automatically passed to the main layout. and to homepage template
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get the login page open
// logic route
router.get('/login', (req, res) => {
  // check for a session and redirect to the homepage if one exists by adding the following code:
  // if in object session loggedIn assign to true.
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // the difference here. we don't need to pass in any variables. that's why we don't use the second argument like we did in Post.findAll
  res.render('login');
});


router.get('/signup', (req, res) => {
  // check for a session and redirect to the homepage if one exists by adding the following code:
  // if in object session loggedIn assign to true.
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // the difference here. we don't need to pass in any variables. that's why we don't use the second argument like we did in Post.findAll
  res.render('signup');
});

// to get a single post 
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      // update it in 14.3.6 with helpers
      res.render('single-post', {
        post,
        //  variables that are passed to view templates are automatically passed to the main layout. 
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
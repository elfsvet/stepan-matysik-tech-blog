const router = require('express').Router();

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  // Previously, we used res.send() or res.sendFile() for the response. Because we've hooked up a template engine, we can now use res.render() and specify which template we want to use. In this case, we want to render the homepage.handlebars template (the .handlebars extension is implied). This template was light on content; it only included a single <div>. Handlebars.js will automatically feed that into the main.handlebars template, however, and respond with a complete HTML file.
  // The res.render() method can accept a second argument, an object, which includes all of the data you want to pass to your template. In home-routes.js, update the homepage route to look like the following code:
  Post.findAll({
    attributes: [
      'id',
      'post_url',
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
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
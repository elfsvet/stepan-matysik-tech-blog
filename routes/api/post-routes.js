const router = require('express').Router();
const { Post, User } = require('../../models');

// GET all posts
router.get('/', (req, res) => {
    console.log('=================')
    Post.findAll({
        // query configuration
        attributes: ['id', 'post_url', 'title', 'created_at'],
        // to show the last post first
        order: [['created_at', 'DESC']], 
        // Notice that the include property is expressed as an array of objects. To define this object, we need a reference to the model and attributes. 
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one post
router.get('/:id', (req, res) => {
    // Notice that there are only differences, namely the use of the findOne method and the use of the req.params to retrieve the id property from the route. We used the where property to set the value of the id using req.params.id. We are requesting the same attributes, including the username which requires a reference to the User model using the include property.
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
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
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST create one post 
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT update one post title. not the text to update text we would need to use individualHooks: true or add post_url: req.body.post_url after title.
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
            // , post_url: req.body.post_url
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json({ trueOrFalse: dbPostData, message: 'Post title updated' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE destroy post
router.delete('/:id', (req, res) => {
    Post.destroy(
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            // The response from the request in Insomnia displays the number of rows or entries that were affected by this query. As we expected, a single entry was deleted from the database
            res.json({ numberOfRowsAffected: dbPostData, message: 'Post was deleted' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// In order to test this route, we need to expose the changes to the router by using the following Express.js command:
module.exports = router;
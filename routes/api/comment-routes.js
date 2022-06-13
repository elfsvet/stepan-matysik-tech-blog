const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get('/', (req, res) => {
    console.log('==================');
    Comment.findAll(
        {
            attributes: ['id', 'comment_text', 'created_at', 'post_id', 'user_id'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Post,
                    attributes: ['id', 'post_url', 'title', 'created_at'],
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Comment.destroy(
        {
            where: { id: req.params.id }
        })
        .then(dbCommentData => {
            if (!dbCommentData){
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
                    // The response from the request in Insomnia displays the number of rows or entries that were affected by this query. As we expected, a single entry was deleted from the database
                    res.json({ numberOfRowsAffected: dbCommentData, message: 'Comment was deleted' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
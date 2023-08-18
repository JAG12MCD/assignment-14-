const router = require('express').Router();
const { getAllPosts, getPostById, addComment, createPost, updatePost, deletePost } = require('../controllers/postController');

router.get('/', async (req, res) => {
    const posts = await getAllPosts();
    res.render('index', { posts });
});

router.get('/:id', async (req, res) => {
    const post = await getPostById(req.params.id);
    res.render('postDetails', { post });
});

router.post('/:id/comment', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    await addComment(req.body.content, req.session.user.id, req.params.id);
    res.redirect('/' + req.params.id);
});

router.post('/new', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const newPost = await createPost({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user.id
    });
    res.redirect('/dashboard');
});

// Route to update a post
router.post('/edit/:id', async (req, res) => {
    await updatePost(req.params.id, {
        title: req.body.title,
        content: req.body.content,
    });
    res.redirect('/dashboard');
});

// Route to delete a post
router.post('/delete/:id', async (req, res) => {
    await deletePost(req.params.id);
    res.redirect('/dashboard');
});

module.exports = router;

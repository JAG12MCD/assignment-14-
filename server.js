require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const sequelize = require('./config/connection');
const { Post } = require('./models/index');
const { getAllPosts, getUserPosts, getPostById } = require('./controllers/postController');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const sess = {
	secret: 'secretsecretsecret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
};

app.use(session(sess));

app.engine(
	'handlebars',
	exphbs.engine({ defaultLayout: 'main', partialsDir: ['views/partials'] })
);

app.set('view engine', 'handlebars');

app.use('/apis', routes);

app.get('/', async (req, res) => {
	const allPosts = await Post.findAll();
	const refinedPosts = allPosts.map(post=>post.dataValues);

	res.render('index', { posts: refinedPosts, loggedIn: !!req.session.user });
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/signup', (req, res) => {
	res.render('signup');
});

app.get('/dashboard', async (req, res) => {
	if (!req.session.user) {
		return res.redirect('/login');
	}
	const userPosts = await getUserPosts(req.session.user.id);
	const refinedPosts = userPosts.map(post=>post.dataValues);
    res.render('dashboard', { posts: refinedPosts });
});

app.get('/post/new', (req, res) => {
    res.render('newPost');
});

// Route to show the edit form for a post
app.get('/post/edit/:id', async (req, res) => {
    const post = await getPostById(req.params.id);
    res.render('editPost', { post });
});

app.get('/logout', (req, res) => {
    // If you're using something like express-session to handle sessions:
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/'); // or wherever you'd like
        }

        res.clearCookie('sid');  // 'sid' should be whatever you've named your session cookie
        res.redirect('/');  // Redirect to the homepage or login page
    });
});


sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});

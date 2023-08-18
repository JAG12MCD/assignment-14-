const router = require('express').Router();
const { loginUser, registerUser } = require('../controllers/userController');


router.post('/login', async (req, res) => {
    const user = await loginUser(req.body.username, req.body.password);
    if (user) {
        req.session.user = user; 
        res.redirect('/');  
    } else {
        res.send('Invalid username or password');
    }
});

router.post('/signup', async (req, res) => {
    const user = await registerUser(req.body.username, req.body.password);
    if (user) {
        res.redirect('/login');
    } else {
        res.send('Error registering user');
    }
});

module.exports = router;

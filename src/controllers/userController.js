const router = require('express').Router();
const userManager = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelper');
const Course = require('../models/Course');
const { isLoggedIn } = require('../middlewares/authMiddleware')


router.get('/login', isLoggedIn, (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.render('users/login', { error: getErrorMessage(err), email });
    }

});

router.get('/register', isLoggedIn, (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('users/register', { error: 'Passwords do not match!', username, email });
    }

    try {
        const token = await userManager.register({ username, email, password, repeatPassword });

        res.cookie('token', token)
        res.redirect('/');
    } catch (err) {
        res.render('users/register', { error: getErrorMessage(err), username, email, password, repeatPassword })
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

router.get('/profile',  async (req, res) => {
    const courses = await Course.find()
    const { user } = req;
    const owner = req.user?.email;

    try {
        const createdCourses = await Course.find({ owner: user._id }).lean();

        const signedUpCourses = await Course.find({ signUpList: user._id }).lean();

        
        const createdCoursesCount = createdCourses.length;
        const signedUpCoursesCount = signedUpCourses.length;

        res.render('users/profile', { user, owner, createdCourses, createdCoursesCount, signedUpCourses, signedUpCoursesCount });
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }

})

module.exports = router
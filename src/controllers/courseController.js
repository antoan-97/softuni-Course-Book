const { getErrorMessage } = require('../utils/errorHelper');
const courseManager = require('../managers/courseManager');

const router = require('express').Router();


router.get('/', async (req,res) =>{
    const courses = await courseManager.getAll().lean();
    res.render('courses' , { courses })
})


router.get('/create', (req,res) =>{
  res.render('courses/create');
});

router.post('/create',async (req,res) =>{
    const courseData = {
        ...req.body,
        owner:req.user._id,
    };

    try {
        await courseManager.create(courseData);
        res.redirect('/courses')
    } catch (err) {
        res.render('courses/create', { error: getErrorMessage(err) });
    }
});


router.get('/:courseId/details', async (req,res) =>{
    const courseId = req.params.courseId;
    const { user } = req;
    const owner = req.user?.email;
    

    const course = await courseManager.getOne(courseId).populate('signUpList', 'username').lean();
    const isOwner = req.user?._id == course.owner?._id
    const signedUsernames = course.signUpList.map(user => user.username).join(', ');
    const hasSigned = course.signUpList?.some((v) => v?._id.toString() === user?._id.toString());
    
    res.render('courses/details', { course, user, isOwner, owner,hasSigned,signedUsernames });
})

router.get('/:courseId/signUp', async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    try {
        await courseManager.signUp(courseId, userId);
        res.redirect(`/courses/${courseId}/details`);
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

module.exports = router;
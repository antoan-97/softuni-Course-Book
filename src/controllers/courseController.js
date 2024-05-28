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

module.exports = router;
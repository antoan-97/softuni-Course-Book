const router = require('express').Router();


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
    } catch (error) {
        res.render('courses/create');
    }
});

module.exports = router;
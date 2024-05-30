const Course = require('../models/Course');

const router = require('express').Router();

router.get('/', async (req,res) =>{
    const courses = await Course.find().sort({ _id: -1 }).limit(3);
    res.render('home', { courses });
});

router.get('/404', (req,res) =>{
    res.render('404')
})

module.exports = router;
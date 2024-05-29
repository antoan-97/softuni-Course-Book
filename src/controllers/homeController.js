const Course = require('../models/Course');

const router = require('express').Router();

router.get('/', async (req,res) =>{
    const courses = await Course.find()
    res.render('home', { courses });
});

router.get('/404', (req,res) =>{
    res.render('404')
})

module.exports = router;
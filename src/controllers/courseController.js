const router = require('express').Router();


router.get('/create', (req,res) =>{
  res.render('courses/create');
});

module.exports = router;
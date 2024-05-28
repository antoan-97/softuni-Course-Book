const Course = require('../models/Course');


exports.create = (courseData) => Course.create(courseData);

exports.getAll = () =>Course.find().populate('owner');
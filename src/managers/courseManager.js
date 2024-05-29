const Course = require('../models/Course');


exports.create = (courseData) => Course.create(courseData);

exports.getAll = () => Course.find().populate('owner');

exports.getOne = (courseId) => Course.findById(courseId).populate('owner');

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.signUp = async (courseId, userId) => {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error('Stone not found');
    }

    // Check if the user has already voted
    if (course.signUpList.includes(userId)) {
        return;
    }

    course.signUpList.push(userId);
    return course.save();
};
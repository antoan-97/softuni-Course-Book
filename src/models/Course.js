const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, 'Title should be at least 5 characters!']
    },
    type: {
        type: String,
        required: true,
        minLength: [3, 'Type should be at least 3 characters!']

    },
    certificate: {
        type: String,
        required: true,
        minLength: [2, 'Certificate should be at least 2 characters!']
    },
    image: {
        type: String,
        required: true,
        match:[/^https?:\/\//, 'Invalid URL!']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at least 10 characters!']
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0; // Ensure price is a positive number
            },
            message: props => `${props.value} is not a valid price. Price must be a positive number.`,
        },
    },
    signUpList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;
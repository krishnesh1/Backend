const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    empid: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    deptid: {
        type: Number,
        required: true
    }
});

const Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;

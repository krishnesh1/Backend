const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
   
    deptid:{
        type:Number,
        required:true,
        unique:true
    },
    deptname:{
        type:String,
        required:true
    }

})

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
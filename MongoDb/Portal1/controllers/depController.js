const Department = require("../model/depModel.js");

const seeDepartments = async (req, res) => {
  const sampleDepartments = [
    { deptid: 101, deptname: "Human Resources" },
    { deptid: 102, deptname: "Finance" },
    { deptid: 103, deptname: "Engineering" },
  ];
    const count = await Department.countDocuments();
    if(count>0){
        return res.send({message:"Departments already seeded!"});
    }

    await Department.insertMany(sampleDepartments);
    res.send({message:"Seeded Successfully"});

};
const viewDepartments = async (req, res) => {

    const departments = await Department.find();
    res.send(departments);
};
const addDepartment = async (req, res) => {
    const {id,name} = req.params;
    let data = await Department.create({deptid:id,deptname:name}); // never forget to use await to show data immediately
    res.send({message:"Department added successfully",data});
};
const deleteDepartment = async (req, res) => {
    const {id} = req.params;
    let data = await Department.findOneAndDelete({deptid:id});
    if(!data){
        res.send({message:"Department not found"});
        return;
    }
    res.send({message:"Department deleted successfully",data});
};
const updateDepartment = async (req, res) => {
    const {id,newname} = req.params;
    let data = await Department.findOneAndUpdate({deptid:id},{deptname:newname})
    res.send({message:"Department updated successfully",data});
};

module.exports = {
  seeDepartments,
  viewDepartments,
  addDepartment,
  deleteDepartment,
  updateDepartment,
};

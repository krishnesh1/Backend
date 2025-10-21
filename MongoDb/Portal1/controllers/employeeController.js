const Employee = require("../model/empModel.js");

const seedEmployees = async (req, res) => {
  try {
    const count = await Employee.countDocuments();

    if (count > 0) {
      return res.send({ message: "Employees already seeded!" });
    }

    const sampleEmployees = [
      { empid: 1, name: "John Doe", salary: 50000, deptid: 101 },
      { empid: 2, name: "Jane Smith", salary: 60000, deptid: 102 },
      { empid: 3, name: "Mike Johnson", salary: 55000, deptid: 101 },
      { empid: 4, name: "Emily Davis", salary: 70000, deptid: 103 },
      { empid: 5, name: "David Wilson", salary: 45000, deptid: 104 },
      { empid: 6, name: "Sophia Brown", salary: 80000, deptid: 102 },
    ];

    await Employee.insertMany(sampleEmployees);
    res.send({ message: "Seeded Successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const viewEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const addEmployee = async (req, res) => {
  const { id, name, salary, deptid } = req.params;
  try {
    let data = await Employee.create({ empid: id, name, salary, deptid }); // never forget to use await to show data immediately
    res.send({ message: "Employee added successfully", data });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await Employee.findOneAndDelete({ empid: id });
    if (data) {
      res.send({ message: "Employee deleted successfully", data });
    } else {
      res.send({ message: "Employee not found" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};
const deleteEmployeeLT = async (req, res) => {
  const { id } = req.params;
  const deleted = await Employee.deleteMany({ empid: { $lt: Number(id) } });
  
  res.send({ message: "Employees deleted successfully", deleted });
};
const updateSalary = async (req, res) => {
  const { id, amount } = req.params;
  const updated = await Employee.findOneAndUpdate(
    { empid: id },
    { salary: amount },
    { new: true }
  );
  res.send({ message: "Salary updated successfully", updated });
};
const updateSalaryRange = async (req, res) => {
  const { id, amount } = req.params;
  const updated = await Employee.updateMany(
    { empid: { $gte: Number(id) } },
    { salary: amount }
  );
  res.send({ message: "Salaries updated successfully", updated });
};
const searchEmployee = async (req, res) => {
  const { name } = req.params;
  const allEmployees = await Employee.find(); // get all employees
  // console.log(allEmployees);
  const employees = allEmployees.filter(
    (emp) => emp.name.toLowerCase() === name.toLowerCase()
  );

  res.send(employees);
};

module.exports = {
  seedEmployees,
  viewEmployees,
  addEmployee,
  deleteEmployee,
  deleteEmployeeLT,
  updateSalary,
  updateSalaryRange,
  searchEmployee,
};

// | Operator | Meaning                          |
// | -------- | -------------------------------- |
// | `$lt`    | **Less than** (`<`)              |
// | `$lte`   | **Less than or equal** (`<=`)    |
// | `$gt`    | **Greater than** (`>`)           |
// | `$gte`   | **Greater than or equal** (`>=`) |
// | `$ne`    | **Not equal** (`!=`)             |

const express = require("express");
const router = express.Router();
const empController = require("../controllers/employeeController.js");

router.get("/seed-employees", empController.seedEmployees);
router.get("/view-employees", empController.viewEmployees);
router.get("/add-employee/:id/:name/:salary/:deptid", empController.addEmployee);
router.get("/delete-employee/:id", empController.deleteEmployee);
router.get("/delete-employee-lt/:id", empController.deleteEmployeeLT);
router.get("/update-salary/:id/:amount", empController.updateSalary);
router.get("/update-salary-range/:id/:amount", empController.updateSalaryRange);
router.get("/search-employee/:name", empController.searchEmployee);

module.exports = router;

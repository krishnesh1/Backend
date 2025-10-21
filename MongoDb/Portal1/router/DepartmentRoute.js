const express = require("express");
const router = express.Router();
const depController = require("../controllers/depController");


router.get("/seed-departments",depController.seeDepartments);
router.get("/view-departments",depController.viewDepartments);
router.get("/add-department/:id/:name",depController.addDepartment);
router.get("/delete-department/:id",depController.deleteDepartment);
router.get("/update-department/:id/:newname",depController.updateDepartment);


module.exports = router;
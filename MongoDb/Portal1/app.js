const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const jwt =require("jsonwebtoken");
const connectDB = require("./model/db.js");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
const  EmpRouter = require("./router/EmployeerRoute");
const  DeptRouter = require("./router/DepartmentRoute");

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

app.use("/emp",EmpRouter);
app.use("/dep",DeptRouter);


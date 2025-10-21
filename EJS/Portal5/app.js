const express = require("express");
const app = express();

app.set("view engine","ejs");
app.listen(3000,()=>{
    console.log("server started at 3000");
})

app.get("/dashboard",(req,res)=>{
    res.render("dashboard", {
  student: {
    name: "John Doe",
    email: "John@example.com",
    role: "admin"
  },
  courses: [
    { title: "Web Development", grade: "A" },
    { title: "Database Systems", grade: "B" },
    { title: "Operating Systems", grade: "D" }
  ],
  notice: "<b>Important Notice</b>"
});
})
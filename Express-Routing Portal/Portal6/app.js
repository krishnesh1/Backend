const express = require("express")
const app = express();

const users = [
  { id: '101', name: 'Alice', age: 25 },
  { id: '102', name: 'Bob', age: 30 },
  { id: '103', name: 'Charlie', age: 22 }
];

app.listen(3000,()=>{
    console.log("Server Started at http://localhost:3000/")
})

app.get("/",(req,res)=>{
    res.send("This is Home Page.")
})

app.get("/user/:id",(req,res)=>{
    const {id}= req.params;
    let user = users.find(x=>x.id==id)
    if(user){
        res.json(user)
    }else{
        return res.status(400).send("User not found");
    }
})
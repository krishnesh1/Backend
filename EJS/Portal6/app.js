const express = require("express");
const app = express();
const products = require("./data.json");

app.set("view engine","ejs");
app.listen(3000,()=>{
    console.log("server started at 3000");
})

app.get("/",async (req,res)=>{

    const limit = Number(req.query.limit) || 5
    const page = Number(req.query.page) || 1

    const startedIndex = (page-1)*limit;
    const endIndex = (page*limit)
    const data = products.slice(startedIndex,endIndex);
    const totalproduct = await products.length;


    res.render("index",({
        data,
        currentPage:page,
        totalPages:Math.ceil(totalproduct/limit),
    }))
})